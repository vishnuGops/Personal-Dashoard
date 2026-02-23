import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import styles from "./page.module.scss"

export default async function AdminPage() {
  const session = await auth()

  if (!session || session.user.role !== "ADMIN") {
    redirect("/")
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      createdAt: true,
      _count: { select: { authLogs: true } },
    },
  })

  const recentLogs = await prisma.authLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      user: { select: { name: true, email: true } },
    },
  })

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Admin Dashboard</h1>

      <section className={styles.section}>
        <h2 className={styles.subheading}>Users ({users.length})</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Logins</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className={styles.userCell}>
                      {user.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={user.image} alt="" className={styles.avatar} />
                      )}
                      <span>{user.name ?? "—"}</span>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span className={user.role === "ADMIN" ? styles.badgeAdmin : styles.badgeUser}>
                      {user.role}
                    </span>
                  </td>
                  <td>{user._count.authLogs}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subheading}>Recent Login History</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>User</th>
                <th>Action</th>
                <th>Provider</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {recentLogs.map((log) => {
                let metadata: { provider?: string; email?: string } = {}
                try {
                  metadata = log.metadata ? JSON.parse(log.metadata) : {}
                } catch {
                  // ignore malformed metadata
                }
                return (
                  <tr key={log.id}>
                    <td>{log.user?.name ?? log.user?.email ?? "Unknown"}</td>
                    <td>{log.action}</td>
                    <td>{metadata.provider ?? "—"}</td>
                    <td>{new Date(log.createdAt).toLocaleString()}</td>
                  </tr>
                )
              })}
              {recentLogs.length === 0 && (
                <tr>
                  <td colSpan={4} className={styles.empty}>No login events yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

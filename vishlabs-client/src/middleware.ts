import { auth } from "@/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const role = req.auth?.user?.role;

  // ADMIN-only routes: /admin, /anu
  const adminRoutes = ["/admin", "/anu"];
  if (adminRoutes.some((p) => pathname.startsWith(p))) {
    if (!req.auth || role !== "ADMIN") {
      return Response.redirect(new URL("/", req.nextUrl.origin));
    }
  }

  // Auth-required routes: /projects
  if (pathname.startsWith("/projects") && !req.auth) {
    return Response.redirect(new URL("/", req.nextUrl.origin));
  }
});

export const config = {
  matcher: ["/admin/:path*", "/anu/:path*", "/projects/:path*"],
};

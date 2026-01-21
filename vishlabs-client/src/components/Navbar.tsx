import Link from 'next/link';
import styles from './Navbar.module.scss';

export default function Navbar() {
  return (
    <div className={styles['custom-toolbar']}>
      <div className={styles['navbar-logo']}>
        <Link href="/">
          <img src="/images/VG_logo.png" alt="Logo" className={styles.logo} />
        </Link>
      </div>
      <span className={styles.spacer}></span>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </div>
  );
}

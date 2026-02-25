import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles["custom-footer"]}>
      <div className={styles["footer-logo"]}>
        <Link href="/">
          <Image src="/images/VG_logo.png" alt="Logo" width={50} height={50} className={styles.logo} />
        </Link>
      </div>
      <div className={styles["footer-text"]}>
        <p>© 2026 VG. All rights reserved.</p>
      </div>
      <div className={styles["footer-icons"]}>
        <a
          href="https://linkedin.com/in/vishnugops"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <i className="fab fa-linkedin"></i>
        </a>
        <a
          href="https://github.com/vishnuGops"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Github"
        >
          <i className="fab fa-github"></i>
        </a>
        <a
          href="https://instagram.com/vishnugops"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://www.youtube.com/channel/UCqRp3VPHZ_sW4Rxkd2Rx51A"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
        >
          <i className="fab fa-youtube"></i>
        </a>
      </div>
    </footer>
  );
}

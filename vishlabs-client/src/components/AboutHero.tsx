import Link from 'next/link';
import styles from './AboutHero.module.scss';

export default function AboutHero() {
  return (
    <div className={styles['hero-container']}>
      <div className={styles['hero-content']}>
        <h1>About me</h1>
        <p>I am Vishnu</p>
        <p>Senior Software Engineer</p>
        <Link href="/contact" className={styles['hero-btn']}>
          Get in touch with me
        </Link>
      </div>
    </div>
  );
}

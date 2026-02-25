import Link from 'next/link';
import styles from './LandingHero.module.scss';

export default function LandingHero() {
  return (
    <div className={styles['hero-container']}>
      <div className={styles['hero-bg']}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className={styles['background-video']}
          preload="metadata"
          poster="/images/video-poster.jpg"
        >
          <source src="/videos/LandingVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className={styles['hero-content']}>
        <h1>Welcome to My World</h1>
        <p>I am Vishnu</p>
        <Link href="/about" className={styles['hero-btn']}>
          More about me
        </Link>
      </div>
    </div>
  );
}

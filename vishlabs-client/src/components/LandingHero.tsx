import Link from 'next/link';
import styles from './LandingHero.module.scss';
import Balatro from './ui/Balatro';

export default function LandingHero() {
  return (
    <div className={styles['hero-container']}>
      <div className={styles['hero-bg']}>
        <Balatro
          isRotate={false}
          mouseInteraction
          pixelFilter={2000}
          color1="#01bf71"
          color3="#050a0e"
          color2="#112d2b"
        />
      </div>

      <div className={styles['hero-content']}>
        <h1>Welcome to my world</h1>
        <p>I am Vishnu</p>
        <Link href="/about" className={styles['hero-btn']}>
          More about me
        </Link>
      </div>
    </div>
  );
}

import styles from './ContactHero.module.scss';

export default function ContactHero() {
  return (
    <div className={styles['hero-container']}>
      <div className={styles['hero-bg']}>
        <video
          autoPlay
          muted
          loop
          className={styles['background-video']}
          preload="auto"
        >
          <source src="/videos/ContactLandingVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className={styles['hero-content']}>
        <h1>Get in touch with me</h1>
      </div>
    </div>
  );
}

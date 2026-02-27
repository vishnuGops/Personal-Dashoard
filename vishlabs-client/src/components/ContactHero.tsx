import styles from './ContactHero.module.scss';

export default function ContactHero() {
  return (
    <div className={styles['hero-container']}>
      <div className={styles['hero-content']}>
        <h1>Get in touch with me</h1>
      </div>
    </div>
  );
}

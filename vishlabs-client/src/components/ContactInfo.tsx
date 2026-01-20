import styles from './ContactInfo.module.scss';
import { contactLinks } from '../data/contact';

export default function ContactInfo() {
  // Helper to group data into pairs
  const pairs = [];
  for (let i = 0; i < contactLinks.length; i += 2) {
    pairs.push({
      first: contactLinks[i],
      second: contactLinks[i + 1],
    });
  }

  return (
    <div className={styles['info-container']}>
      <h1>Find Me Here</h1>
      {pairs.map((pair, index) => (
        <div key={index} className={styles['contact-row']}>
          <a
            href={pair.first.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={pair.first.label}
          >
            <div className={styles['contact-content']}>
              <i className={`${pair.first.icon} ${styles.logo}`}></i>
              <h2>{pair.first.text}</h2>
            </div>
          </a>
          {pair.second && (
            <a
              href={pair.second.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={pair.second.label}
            >
              <div className={styles['contact-content']}>
                <i className={`${pair.second.icon} ${styles.logo}`}></i>
                <h2>{pair.second.text}</h2>
              </div>
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

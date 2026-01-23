import styles from './ContactInfo.module.scss';
import { contactLinks, ContactLink } from '../data/contact';

const ContactCard = ({ link }: { link: ContactLink }) => (
  <a
    href={link.url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={link.label}
  >
    <div className={styles['contact-content']}>
      <i className={`${link.icon} ${styles.logo}`} aria-hidden="true" />
      <h2>{link.text}</h2>
    </div>
  </a>
);

export default function ContactInfo() {
  // Group links into pairs for the layout
  const rows: ContactLink[][] = [];
  for (let i = 0; i < contactLinks.length; i += 2) {
    rows.push(contactLinks.slice(i, i + 2));
  }

  return (
    <div className={styles['info-container']}>
      <h1>Find Me Here</h1>
      {rows.map((row, index) => (
        <div key={index} className={styles['contact-row']}>
          {row.map((link) => (
            <ContactCard key={link.label} link={link} />
          ))}
        </div>
      ))}
    </div>
  );
}

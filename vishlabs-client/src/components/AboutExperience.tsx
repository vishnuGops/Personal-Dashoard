import styles from './AboutExperience.module.scss';
import { experienceData } from '../data/experience';

export default function AboutExperience() {
  // Helper to group data into rows of 2
  const rows = [];
  for (let i = 0; i < experienceData.length; i += 2) {
    rows.push(experienceData.slice(i, i + 2));
  }

  return (
    <div className={styles['info-container']}>
      <h1>Experience</h1>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={styles['experience-row']}>
          {row.map((exp, index) => (
            <div key={index} className={styles['experience-content']}>
              <div className={styles['navbar-logo']}>
                <a href={exp.url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={exp.logo}
                    alt={exp.company + ' Logo'}
                    className={styles.logo}
                  />
                </a>
              </div>
              <h1>{exp.company}</h1>
              <h2>{exp.position}</h2>
              <h3>{exp.location}</h3>
              <h4>{exp.period}</h4>
              <ul>
                {exp.responsibilities.map((resp, i) => (
                  <li key={i}>{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

'use client';
import styles from './AboutEducation.module.scss';
import { educationData } from '../data/education';

export default function AboutEducation() {
  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/pdf/Vishnu_Resume.pdf';
    link.download = 'Vishnu_Resume.pdf';
    link.click();
  };

  return (
    <div className={styles['info-container']}>
      <h1>Education</h1>
      <div className={styles['experience-row']}>
        {educationData.map((edu, index) => (
          <div key={index} className={styles['experience-content']}>
            <div className={styles['navbar-logo']}>
              <a href={edu.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={edu.logo}
                  alt={edu.institution + ' Logo'}
                  className={styles.logo}
                />
              </a>
            </div>
            <h1>{edu.institution}</h1>
            <h2>{edu.period}</h2>
            <h3>{edu.location}</h3>
            <h4>Relevant Courses</h4>
            <ul>
              {edu.courses.map((course, i) => (
                <li key={i}>{course}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles['resume-download']}>
        <button
          className={`${styles['button-element']} ${styles.big} ${styles.fontBig}`}
          onClick={downloadResume}
        >
          Download My Resume
        </button>
      </div>
    </div>
  );
}

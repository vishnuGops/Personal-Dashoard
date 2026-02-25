import Image from 'next/image';
import styles from './ProjectsInfo.module.scss';
import { projectsData } from '../data/projects';

export default function ProjectsInfo() {
  // Helper to group data into rows of 3
  const rows = [];
  for (let i = 0; i < projectsData.length; i += 3) {
    rows.push(projectsData.slice(i, i + 3));
  }

  return (
    <div className={styles['info-container']}>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={styles['projects-row']}>
          {row.map((project, index) => (
            <div key={index} className={styles['experience-content']}>
              <div className={styles['navbar-logo']}>
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={project.image}
                    alt={project.name + ' Logo'}
                    width={300}
                    height={240}
                    className={styles.logo}
                  />
                </a>
              </div>
              <h1>{project.name}</h1>
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <i className={`fab fa-github ${styles['git-icon']}`}></i>
              </a>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

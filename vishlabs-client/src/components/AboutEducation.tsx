import styles from "./AboutEducation.module.scss";
import { educationData } from "../data/education";
import LoginPlaceholder from "./LoginPlaceholder";
import { auth } from "@/auth";
import ContactResumeDownload from "./ContactResumeDownload";

export default async function AboutEducation() {
  const session = await auth();

  return (
    <div className={styles["info-container"]}>
      <h1>Education</h1>
      <div className={styles["experience-row"]}>
        {educationData.map((edu, index) => (
          <div key={index} className={styles["experience-content"]}>
            <div className={styles["navbar-logo"]}>
              <a href={edu.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={edu.logo}
                  alt={edu.institution + " Logo"}
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
      <h1>Resume</h1>
      {session ? (
        <div className={styles["resume-download"]}>
          <ContactResumeDownload
            className={`${styles["button-element"]} ${styles.big} ${styles.fontBig}`}
          />
        </div>
      ) : (
        <LoginPlaceholder
          title="Access Restricted"
          message="Please sign in to view or download my resume."
        />
      )}
    </div>
  );
}

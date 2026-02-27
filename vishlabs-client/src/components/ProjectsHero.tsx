import styles from "./ProjectsHero.module.scss";

export default function ProjectsHero() {
  return (
    <div className={styles["hero-container"]}>
      <div className={styles["hero-content"]}>
        <h1>My Projects</h1>
        <a
          href="https://github.com/vishnuGops"
          className={styles["hero-btn"]}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit my Github
        </a>
      </div>
    </div>
  );
}

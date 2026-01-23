import styles from "./ProjectsHero.module.scss";

export default function ProjectsHero() {
  return (
    <div className={styles["hero-container"]}>
      <div className={styles["hero-bg"]}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className={styles['background-video']}
          preload="auto"
          poster="/images/about-poster.jpg"
        >
          <source src="/videos/AboutLandingVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

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

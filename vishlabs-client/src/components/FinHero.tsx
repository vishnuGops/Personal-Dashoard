"use client";

import { useState, useEffect } from "react";
import styles from "./FinHero.module.scss";
import ASCIIText from "./ASCIIText";

const FinHero = () => {
  const [fontSize, setFontSize] = useState(30);
  const [asciiSize, setAsciiSize] = useState(8);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setFontSize(10);
        setAsciiSize(4);
      } else {
        setFontSize(30);
        setAsciiSize(8);
      }
    };

    // Set initial size
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles["hero-container"]}>
      <ASCIIText
        text="HEDGE FUND 101"
        enableWaves
        asciiFontSize={asciiSize}
        textFontSize={fontSize}
      />
    </div>
  );
};

export default FinHero;

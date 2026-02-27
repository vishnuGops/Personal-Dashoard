"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./AnuValentine.module.scss";
import Grainient from "./ui/Grainient";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function AnuValentine() {
  const [noBtnOffset, setNoBtnOffset] = useState({ x: 0, y: 0 });
  const [showSuccess, setShowSuccess] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  const moveNoButton = () => {
    if (!containerRef.current || !noBtnRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const btnRect = noBtnRef.current.getBoundingClientRect();

    // We need to calculate the limits for x and y offset
    // relative to the button's *current* layout position (which is static).
    // The button's current visual position might be different due to transform,
    // but we want to calculate a NEW transform relative to the original layout position.

    // To do this, we need the button's initial position (layout position).
    // Since the button is moving, btnRect is the *current* visual position.
    // We can approximate the layout position by subtracting the current offset.

    const currentXOffset = noBtnOffset.x;
    const currentYOffset = noBtnOffset.y;

    const layoutLeft = btnRect.left - currentXOffset;
    const layoutTop = btnRect.top - currentYOffset;

    const padding = 50;

    // Available space to move (relative to layout position)
    const minX = -layoutLeft + padding;
    const maxX = containerRect.width - (layoutLeft + btnRect.width) - padding;

    const minY = -layoutTop + padding;
    const maxY = containerRect.height - (layoutTop + btnRect.height) - padding;

    const newX = Math.random() * (maxX - minX) + minX;
    const newY = Math.random() * (maxY - minY) + minY;

    setNoBtnOffset({ x: newX, y: newY });
  };

  const handleYesClick = () => {
    setShowSuccess(true);
    triggerCelebration();
  };

  const triggerCelebration = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 60 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      zIndex: 60,
    });
  };

  return (
    <div className={styles["main-container"]} ref={containerRef}>
      <div className={styles["grainient-bg"]}>
        <Grainient
          color1="#FF9FFC"
          color2="#5227FF"
          color3="#B19EEF"
          timeSpeed={0.25}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>

      <div className={styles["content-overlay"]}>
        <motion.h1
          className={styles["valentine-text"]}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          ❤️Anu❤️ <br />
          I choose you! <br />
          Will you be my valentine?
        </motion.h1>

        <div className={styles["buttons-container"]}>
          <motion.button
            className={`${styles["btn"]} ${styles["btn-yes"]}`}
            onClick={handleYesClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Yes, always!
          </motion.button>

          <motion.button
            ref={noBtnRef} // Use ref to calculate position
            className={`${styles["btn"]} ${styles["btn-no"]}`}
            onMouseEnter={moveNoButton}
            onClick={moveNoButton}
            animate={{
              x: noBtnOffset.x,
              y: noBtnOffset.y,
              opacity: 1,
              scale: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            // We combine the initial animate with the dynamic animate?
            // Framer motion handles this by merging or overriding.
            // To be safe, we can put the initial entry animation in a wrapper or handle it carefully.
            // But 'animate' prop overrides 'initial'.
            // Ideally we want it to enter (fade in) AND be at x:0, y:0.
            // Then move to x:new, y:new.
          >
            Hell no!
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className={styles["modal-overlay"]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles["modal-content"]}
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <h2 className={styles["modal-title"]}>Congratulations! 🎉</h2>
              <p className={styles["modal-text"]}>
                You've made the best choice! 💖 <br />
                Can't wait to celebrate with you!
              </p>
              <motion.button
                className={`${styles["btn"]} ${styles["btn-yes"]}`}
                style={{ marginTop: "2rem" }}
                onClick={() => setShowSuccess(false)}
                whileHover={{ scale: 1.05 }}
              >
                Yay!
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

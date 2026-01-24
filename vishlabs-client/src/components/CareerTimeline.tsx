"use client";

import React, { useRef, useState, useMemo } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { TIMELINE_EVENTS } from "@/data/timeline";
import styles from "./CareerTimeline.module.scss";

const ROW_HEIGHT = 200;
const DESKTOP_AMP = 300; // Wider zig-zag for desktop
const CENTER = 500;

const CareerTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });
  const selectedEvent = TIMELINE_EVENTS.find((e) => e.id === selectedId);

  // Calculate coordinates where nodes and lines will live
  const { pathString, nodePositions } = useMemo(() => {
    let d = "";
    const positions: { x: number; y: number }[] = [];

    TIMELINE_EVENTS.forEach((_, i) => {
      const isEven = i % 2 === 0;
      const x = CENTER + (isEven ? -DESKTOP_AMP : DESKTOP_AMP);
      const y = i * ROW_HEIGHT + 100;
      positions.push({ x, y });

      if (i === 0) {
        d += `M ${x} ${y} `;
      } else {
        const prevX = positions[i - 1].x;
        const prevY = positions[i - 1].y;
        const midY = prevY + (y - prevY) / 2;
        // Geometric "Stepped" path to connect icons
        d += `L ${prevX} ${midY} L ${x} ${midY} L ${x} ${y} `;
      }
    });

    return { pathString: d, nodePositions: positions };
  }, []);

  return (
    <section className={styles.timelineSection}>
      <div
        className={styles.timelineContainer}
        ref={containerRef}
        style={{ height: `${TIMELINE_EVENTS.length * ROW_HEIGHT + 150}px` }}
      >
        {/* Desktop SVG Line */}
        <div className={styles.desktopOnly}>
          <svg
            viewBox={`0 0 1000 ${TIMELINE_EVENTS.length * ROW_HEIGHT + 150}`}
            className={styles.svgPath}
          >
            <path
              d={pathString}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
              fill="none"
            />
            <motion.path
              d={pathString}
              stroke="cyan"
              strokeWidth="2"
              fill="none"
              style={{ pathLength }}
            />
          </svg>
        </div>

        {/* Timeline Content */}
        {TIMELINE_EVENTS.map((event, index) => {
          const pos = nodePositions[index];
          const isEven = index % 2 === 0;

          return (
            <div
              key={event.id}
              className={`${styles.eventRow} ${isEven ? styles.leftAlign : styles.rightAlign}`}
              style={{ top: `${pos.y}px` }}
            >
              {/* Icon Node - Shared LayoutID for smooth expansion */}
              <motion.div
                layoutId={`node-${event.id}`}
                className={styles.nodeIconWrapper}
                style={{ left: `${pos.x / 10}%` }}
                onClick={() => setSelectedId(event.id)}
              >
                <event.icon size={20} color="cyan" />
                <span className={styles.yearLabel}>{event.year}</span>
              </motion.div>

              {/* Text Card */}
              <motion.div
                className={styles.contentCard}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                onClick={() => setSelectedId(event.id)}
              >
                <h3>{event.title}</h3>
                <p>{event.company}</p>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Popover Logic: Absolute Center with Layout Transition */}
      <AnimatePresence>
        {selectedId && selectedEvent && (
          <div className={styles.modalOverlay}>
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
            />
            <motion.div
              layoutId={`node-${selectedId}`}
              className={styles.expandedModal}
            >
              <button
                className={styles.closeBtn}
                onClick={() => setSelectedId(null)}
              >
                <X />
              </button>
              <div className={styles.modalHero}>
                <img src={selectedEvent.imageUrl} alt={selectedEvent.title} />
              </div>
              <div className={styles.modalBody}>
                <span className={styles.modalMeta}>
                  {selectedEvent.month} {selectedEvent.year}
                </span>
                <h2>{selectedEvent.title}</h2>
                <h4>{selectedEvent.company}</h4>
                <p>{selectedEvent.description}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CareerTimeline;

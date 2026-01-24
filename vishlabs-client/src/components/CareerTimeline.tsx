"use client";

import React, { useRef, useState, useMemo } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { TIMELINE_EVENTS } from "@/data/timeline";
import styles from "./CareerTimeline.module.scss";

const ROW_HEIGHT = 280;

const CareerTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 45, damping: 20 });
  const selectedEvent = TIMELINE_EVENTS.find((e) => e.id === selectedId);

  const pathString = useMemo(() => {
    const totalHeight = TIMELINE_EVENTS.length * ROW_HEIGHT;
    return `M 500 0 L 500 ${totalHeight}`;
  }, []);

  return (
    <section className={styles.timelineSection}>
      <AnimatePresence>
        {selectedId && selectedEvent && (
          <div className={styles.fixedOverlay}>
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

      <div>
        <h2 className={styles.sectionTitle}>Timeline</h2>
        <div className={styles.timelineContainer} ref={containerRef}>
          <div className={styles.lineLayer}>
            <svg
              viewBox={`0 0 1000 ${TIMELINE_EVENTS.length * ROW_HEIGHT}`}
              preserveAspectRatio="none"
            >
              <path
                d={pathString}
                stroke="rgba(255, 255, 255, 0.25)"
                strokeWidth="3"
                fill="none"
              />
              <motion.path
                d={pathString}
                stroke="#01bf71"
                strokeWidth="2"
                fill="none"
                style={{ pathLength }}
              />
            </svg>
          </div>

          {TIMELINE_EVENTS.map((event, index) => {
            const isEven = index % 2 === 0;

            return (
              <div key={event.id} className={styles.eventRowWrapper}>
                <div
                  className={`${styles.eventGrid} ${isEven ? styles.evenRow : styles.oddRow}`}
                >
                  {/* Column 1: Card on Even, Spacer on Odd */}
                  {isEven ? (
                    <div className={styles.cardColumn}>
                      <motion.div
                        className={styles.contentCard}
                        whileHover={{ y: -5 }}
                        onClick={() => setSelectedId(event.id)}
                      >
                        <span className={styles.cardYear}>{event.year}</span>
                        <h3>{event.title}</h3>
                        <p>{event.company}</p>
                      </motion.div>
                    </div>
                  ) : (
                    <div className={styles.spacerColumn} />
                  )}

                  {/* Column 2: The Icon (Always centered) */}
                  <div className={styles.nodeColumn}>
                    <motion.div
                      layoutId={`node-${event.id}`}
                      className={styles.nodeIcon}
                      onClick={() => setSelectedId(event.id)}
                    >
                      <event.icon size={22} color="#01bf71" />
                    </motion.div>
                  </div>

                  {/* Column 3: Card on Odd, Spacer on Even */}
                  {!isEven ? (
                    <div className={styles.cardColumn}>
                      <motion.div
                        className={styles.contentCard}
                        whileHover={{ y: -5 }}
                        onClick={() => setSelectedId(event.id)}
                      >
                        <span className={styles.cardYear}>{event.year}</span>
                        <h3>{event.title}</h3>
                        <p>{event.company}</p>
                      </motion.div>
                    </div>
                  ) : (
                    <div className={styles.spacerColumn} />
                  )}
                </div>

                {index < TIMELINE_EVENTS.length - 1 && (
                  <div className={styles.timeScale}>
                    <div className={styles.scaleLine} />
                    <div className={styles.scaleLabel}>
                      <span>{event.month}</span>
                      <span className={styles.divider}>—</span>
                      <span>{event.year}</span>
                    </div>
                    <div className={styles.scaleLine} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CareerTimeline;

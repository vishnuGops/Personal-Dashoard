"use client";

import React, { useRef, useState, useLayoutEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { X } from "lucide-react";
import { TIMELINE_EVENTS } from "@/data/timeline";
import styles from "./CareerTimeline.module.scss";

const CareerTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useLayoutEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (scrollContentRef.current) {
        // Range = Total content width - what's visible on screen
        setScrollRange(
          scrollContentRef.current.scrollWidth - window.innerWidth,
        );
      }
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scrollSpring = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });
  const x = useTransform(scrollSpring, [0, 1], [0, -scrollRange]);

  const selectedEvent = TIMELINE_EVENTS.find((e) => e.id === selectedId);

  return (
    <section
      ref={containerRef}
      className={isMobile ? styles.mobileSection : styles.timelineSection}
    >
      <div
        className={isMobile ? styles.mobileContainer : styles.stickyContainer}
      >
        {!isMobile && <h2 className={styles.sectionTitle}>Timeline</h2>}

        <div className={styles.horizontalScrollTrackWrapper}>
          <motion.div
            ref={scrollContentRef}
            style={{ x: isMobile ? 0 : x }}
            className={
              isMobile ? styles.verticalTrack : styles.horizontalScrollTrack
            }
          >
            {/* Desktop Center Line */}
            {!isMobile && (
              <div className={styles.lineLayer}>
                <svg className={styles.lineSvg}>
                  <line
                    x1="0"
                    y1="50%"
                    x2="100%"
                    y2="50%"
                    stroke="#01bf71"
                    strokeWidth="4"
                  />
                </svg>
              </div>
            )}

            {TIMELINE_EVENTS.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={event.id} className={styles.eventColumn}>
                  <div className={styles.topSlot}>
                    {(isEven || isMobile) && (
                      <div className={styles.cardContainer}>
                        <motion.div
                          className={styles.contentCard}
                          whileHover={{ scale: 1.03 }}
                          onClick={() => setSelectedId(event.id)}
                        >
                          <span className={styles.cardYear}>{event.year}</span>
                          <h3>{event.title}</h3>
                          <h4>{event.company}</h4>
                        </motion.div>
                        {!isMobile && <div className={styles.connectorLine} />}
                      </div>
                    )}
                  </div>

                  <motion.div
                    className={styles.centerNode}
                    onClick={() => setSelectedId(event.id)}
                    whileHover={{ scale: 1.1 }}
                  >
                    <event.icon size={24} color="#01bf71" />
                  </motion.div>

                  <div className={styles.bottomSlot}>
                    {!isEven && !isMobile && (
                      <div className={styles.cardContainer}>
                        <div className={styles.connectorLine} />
                        <motion.div
                          className={styles.contentCard}
                          whileHover={{ scale: 1.03 }}
                          onClick={() => setSelectedId(event.id)}
                        >
                          <span className={styles.cardYear}>{event.year}</span>
                          <h3>{event.title}</h3>
                          <h4>{event.company}</h4>
                        </motion.div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

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
                <X size={24} />
              </button>
              <div className={styles.modalHero}>
                <img src={selectedEvent.imageUrl} alt="" />
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

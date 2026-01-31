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
      if (scrollContentRef.current && !mobile) {
        const range = +scrollContentRef.current.scrollWidth - window.innerWidth;
        +setScrollRange(Math.max(0, range));
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
  const x = useTransform(
    scrollSpring,
    [0, 1],
    [0, isMobile ? 0 : -scrollRange],
  );

  const selectedEvent = TIMELINE_EVENTS.find((e) => e.id === selectedId);

  return (
    <section
      ref={containerRef}
      className={isMobile ? styles.mobileSection : styles.timelineSection}
    >
      <div
        className={isMobile ? styles.mobileStickyReset : styles.stickyContainer}
      >
        <h2 className={styles.sectionTitle}>Timeline</h2>

        <div className={styles.horizontalScrollTrackWrapper}>
          <motion.div
            ref={scrollContentRef}
            style={{ x }}
            className={
              isMobile ? styles.verticalTrack : styles.horizontalScrollTrack
            }
          >
            {/* GLOWING LINE */}
            <div
              className={isMobile ? styles.verticalLineLayer : styles.lineLayer}
            >
              <svg className={styles.lineSvg} preserveAspectRatio="none">
                <line
                  x1={isMobile ? "50%" : "0"}
                  y1={isMobile ? "0" : "50%"}
                  x2={isMobile ? "50%" : "100%"}
                  y2={isMobile ? "100%" : "50%"}
                  className={styles.baseLine}
                />
                <motion.line
                  x1={isMobile ? "50%" : "0"}
                  y1={isMobile ? "0" : "50%"}
                  x2={isMobile ? "50%" : "100%"}
                  y2={isMobile ? "100%" : "50%"}
                  className={styles.progressLine}
                  style={{ pathLength: scrollSpring }}
                />
              </svg>
            </div>

            {TIMELINE_EVENTS.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={event.id} className={styles.eventColumn}>
                  {/* TOP / MOBILE SLOT */}
                  <div className={styles.topSlot}>
                    {(isEven || isMobile) && (
                      <div className={styles.cardWrapper}>
                        <motion.button
                          type="button"
                          className={styles.contentCard}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: false, amount: 0.1 }}
                          onClick={() => setSelectedId(event.id)}
                        >
                          <span className={styles.cardYear}>{event.year}</span>
                          <h3>{event.title}</h3>
                          <h4>{event.company}</h4>
                        </motion.button>
                        {!isMobile && <div className={styles.connectorLine} />}
                      </div>
                    )}
                  </div>

                  {/* CENTER NODE */}
                  <div className={styles.nodeContainer}>
                    <motion.button
                      type="button"
                      className={styles.centerNode}
                      onClick={() => setSelectedId(event.id)}
                      whileHover={{ scale: 1.1 }}
                    >
                      <event.icon size={22} color="#01bf71" />
                    </motion.button>
                  </div>

                  {/* BOTTOM SLOT */}
                  <div className={styles.bottomSlot}>
                    {!isEven && !isMobile && (
                      <div className={styles.cardWrapper}>
                        <div className={styles.connectorLine} />
                        <motion.div
                          className={styles.contentCard}
                          initial={{ opacity: 0, y: -10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: false, amount: 0.1 }}
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
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className={styles.expandedModal}
            >
              <button
                aria-label="Close timeline details"
                className={styles.closeBtn}
                onClick={() => setSelectedId(null)}
              >
                <X size={24} />
              </button>
              <div className={styles.modalHero}>
                <img src={selectedEvent.imageUrl} alt={selectedEvent.title} />
              </div>
              <div className={styles.modalBody}>
                <span className={styles.p1}>
                  {selectedEvent.month} {selectedEvent.year}
                </span>
                <h2>{selectedEvent.title}</h2>
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

'use client';

import React, { useRef, useState, useMemo, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence, useTransform } from 'framer-motion';
import { 
  Briefcase, 
  GraduationCap, 
  Code, 
  Award, 
  Globe, 
  Cpu, 
  Zap,
  Terminal,
  Database,
  Cloud,
  X
} from 'lucide-react';
import styles from './CareerTimeline.module.scss';

// --- Types ---
type TimelineEvent = {
  id: number;
  year: string;
  month: string;
  title: string;
  company: string;
  description: string;
  icon: React.ElementType;
  imageUrl: string;
};

// --- Data ---
const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 1,
    year: "1997",
    month: "Jun",
    title: "Hello World",
    company: "Early Beginnings",
    description: "First introduction to computers and the digital world. Sparked a lifelong curiosity for technology.",
    icon: Globe,
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    year: "2012",
    month: "Sep",
    title: "Secondary Education",
    company: "High School",
    description: "Built first static websites using HTML & CSS. Discovered the joy of creating things from scratch.",
    icon: Code,
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    year: "2014",
    month: "Aug",
    title: "CS Degree",
    company: "University",
    description: "Enrolled in Computer Science. Deep dived into algorithms, data structures, and C++.",
    icon: GraduationCap,
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 4,
    year: "2016",
    month: "May",
    title: "First Internship",
    company: "Tech Start-up",
    description: "Worked as a Junior Web Developer. Gained hands-on experience with JavaScript and PHP.",
    icon: Briefcase,
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 5,
    year: "2017",
    month: "Mar",
    title: "Hackathon Winner",
    company: "National Tech Fest",
    description: "Won 1st place for an innovative IoT solution for smart agriculture using Arduino and Python.",
    icon: Award,
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c54be3852f33?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 6,
    year: "2018",
    month: "Jul",
    title: "Graduation",
    company: "University",
    description: "Graduated with Honors. Capstone project involved machine learning for image recognition.",
    icon: GraduationCap,
    imageUrl: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 7,
    year: "2018",
    month: "Aug",
    title: "Junior Developer",
    company: "Enterprise Solutions Inc.",
    description: "Joined a large corporate team. Focused on backend services and database optimization (SQL).",
    icon: Database,
    imageUrl: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 8,
    year: "2019",
    month: "Nov",
    title: "Full Stack",
    company: "Enterprise Solutions Inc.",
    description: "Moved to a full-stack role. Started using React for frontend and Node.js for microservices.",
    icon: Cpu,
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 9,
    year: "2020",
    month: "Jan",
    title: "Senior Engineer",
    company: "FinTech Corp",
    description: "Led the migration of a legacy monolith to a cloud-native architecture on AWS.",
    icon: Cloud,
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 10,
    year: "2021",
    month: "Apr",
    title: "Open Source",
    company: "Community",
    description: "Active contributions to major React UI libraries. Released 2 popular NPM packages.",
    icon: Terminal,
    imageUrl: "https://images.unsplash.com/photo-1607799275518-d58665d099db?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 11,
    year: "2022",
    month: "Feb",
    title: "Tech Lead",
    company: "InnovateX",
    description: "Managing a team of 8 engineers. Establishing code quality standards and CI/CD pipelines.",
    icon: Zap,
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 12,
    year: "2023",
    month: "Sep",
    title: "AI Specialist",
    company: "Future Labs",
    description: "Spearheading the integration of LLMs into consumer-facing applications.",
    icon: Cpu,
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 13,
    year: "Present",
    month: "",
    title: "Freelance",
    company: "Self-Employed",
    description: "Helping startups scale their engineering teams and architecture. Building the next big thing.",
    icon: Globe,
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
  },
];

// Constants for Desktop Geometry
const ROW_HEIGHT = 200; // Matches approx height including margins
const AMP = 60; // Amplitude of the curve (distance from center)
const CENTER = 500; // SVG ViewBox center X

const CareerTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const selectedEvent = TIMELINE_EVENTS.find(e => e.id === selectedId);

  // --- Calculate SVG Path ---
  // We construct a path that snakes through the nodes.
  // Node i Position: 
  //   X = CENTER + (isEven ? -AMP : AMP)
  //   Y = i * ROW_HEIGHT + (ROW_HEIGHT / 2)  <-- approximate vertical center of row
  const { pathString, nodePositions } = useMemo(() => {
    let d = "";
    const positions: { x: number, y: number }[] = [];

    // Start slightly above the first node
    const startX = CENTER + (0 % 2 === 0 ? -AMP : AMP);
    const startY = 0;
    d += `M ${startX} ${startY} `;

    TIMELINE_EVENTS.forEach((_, i) => {
      const isEven = i % 2 === 0;
      const x = CENTER + (isEven ? -AMP : AMP);
      const y = i * ROW_HEIGHT + (ROW_HEIGHT / 2); // Center of the visual row
      positions.push({ x, y });

      if (i === 0) {
        // Line from top to first node
        d += `L ${x} ${y} `;
      } else {
        // Curve from prev node to current node
        const prevX = positions[i-1].x;
        const prevY = positions[i-1].y;
        
        // Control points for S-curve
        // CP1: Vertical out from prev
        // CP2: Vertical in to current
        const cp1x = prevX;
        const cp1y = prevY + (ROW_HEIGHT / 2);
        const cp2x = x;
        const cp2y = y - (ROW_HEIGHT / 2);
        
        d += `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y} `;
      }
    });

    // Extend line slightly past last node
    const lastPos = positions[positions.length - 1];
    d += `L ${lastPos.x} ${lastPos.y + 100}`;

    return { pathString: d, nodePositions: positions };
  }, []);

  return (
    <section className={styles.timelineSection}>
      <div 
        className={styles.timelineContainer} 
        ref={containerRef}
        style={{ 
          ['--desktop-total-height' as any]: `${TIMELINE_EVENTS.length * ROW_HEIGHT + 100}px`
        }}
      >
        
        {/* Mobile Progress Line (Straight) */}
        <div className={styles.mobileLineContainer}>
          <motion.div 
            className={styles.mobileProgressBar}
            style={{ scaleY: pathLength }}
          />
        </div>

        {/* Desktop Progress Line (Curved SVG) */}
        <div className={styles.desktopSvgContainer}>
           <svg 
            viewBox={`0 0 1000 ${TIMELINE_EVENTS.length * ROW_HEIGHT + 100}`} 
            preserveAspectRatio="xMidYMin meet"
            style={{ width: '100%', height: '100%', overflow: 'visible' }}
          >
            {/* Background Track */}
            <path 
              d={pathString} 
              stroke="rgba(255,255,255,0.1)" 
              strokeWidth="4" 
              fill="none" 
            />
            {/* Active Fill Track */}
            <motion.path 
              d={pathString}
              stroke="url(#gradient)" 
              strokeWidth="4" 
              fill="none"
              style={{ pathLength: pathLength }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="cyan" />
                <stop offset="100%" stopColor="white" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Events */}
        {TIMELINE_EVENTS.map((event, index) => {
          const isEven = index % 2 === 0;
          // Desktop specific positioning from SVG calc
          const desktopStyle = {
            position: 'absolute' as const,
            top: `${nodePositions[index].y}px`,
            left: `${(nodePositions[index].x / 1000) * 100}%`,
            // transform is handled by CSS (translate -50, -50)
          };

          return (
            <div 
              key={event.id} 
              className={`${styles.eventRow} ${isEven ? styles.leftSide : styles.rightSide}`}
              style={{ minHeight: '120px' }} // ensure consistent height for mapping
            >
              {/* Node on the Line (Desktop uses absolute position calculated above) */}
              {/* We render a separate node for desktop vs mobile to handle the layout shift strictly? 
                  Or we just override styles via media query?
                  The DOM structure in 'row' is good for mobile. 
                  For Desktop, we can make the node 'absolute' relative to container if we want, 
                  but here it is inside 'eventRow'. 
                  'eventRow' is flex centered. 
                  Actually, if we use the calculated SVG positions, the node needs to be 
                  positioned relative to the MAIN container, not the row.
              */}
              
              {/* REMOVED REDUNDANT INTERNAL NODE */}
            </div>
          );
        })}
        
        {/* Desktop Nodes Layer (Outside the rows, relative to Container) */}
        <div className={`${styles.desktopOnly} absolute inset-0 pointer-events-none`}>
           {TIMELINE_EVENTS.map((event, index) => (
             <React.Fragment key={`desktop-node-${event.id}`}>
                <motion.div
                  className={styles.eventNode}
                  style={{
                    position: 'absolute',
                    top: `${nodePositions[index].y}px`,
                    left: `${(nodePositions[index].x / 1000) * 100}%`,
                    pointerEvents: 'auto', // Enable clicks
                    zIndex: 20
                  }}
                  // Force display block for desktop
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedId(event.id)}
                  whileHover={{ scale: 1.2, zIndex: 30 }}
                >
                  <event.icon className={styles.nodeIcon} />
                </motion.div>

                {/* Date Marker for Desktop */}
                <div 
                  className={styles.dateMarker}
                  style={{
                    position: 'absolute',
                    top: `${nodePositions[index].y}px`,
                    left: `${((nodePositions[index].x + (index % 2 === 0 ? -80 : 80)) / 1000) * 100}%`, 
                    pointerEvents: 'none', // Text shouldn't block clicks if unnecessary
                    transform: 'translateY(-50%)'
                  }}
                >
                  <span className={styles.yearMarker}>{event.year}</span>
                  <span className={styles.monthMarker}>{event.month}</span>
                </div>
             </React.Fragment>
           ))}
        </div>


        {/* Content Rows (Visual Cards) */}
        {TIMELINE_EVENTS.map((event, index) => {
           const isEven = index % 2 === 0;
           return (
            <div 
              key={`row-${event.id}`} 
              className={`${styles.eventRow} ${isEven ? styles.leftSide : styles.rightSide}`}
              style={{ ['--row-top' as any]: `${index * ROW_HEIGHT}px` }}
            >
              {/* Mobile Node (Inside flow) */}
              <div className={styles.mobileOnly}> 
                 {/* Re-use eventNode style but it is positioned absolute left:6px in SCSS */}
                 <motion.div 
                    className={styles.eventNode}
                    onClick={() => setSelectedId(event.id)}
                 >
                    <event.icon className={styles.nodeIcon} />
                 </motion.div>
                 
                 {/* Mobile Date Marker */}
                 <div className={styles.dateMarker}>
                    <span className={styles.yearMarker}>{event.year}</span>
                    <span className={styles.monthMarker}>{event.month}</span>
                 </div>
              </div>

              {/* Card */}
              <motion.div 
                className={styles.eventCard}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                onClick={() => setSelectedId(event.id)}
              >
                <h3 className={styles.titleText} style={{ fontSize: '1.25rem', marginBottom: 0 }}>{event.title}</h3>
                <h4 className={styles.companyText} style={{ marginBottom: 0 }}>{event.company}</h4>
              </motion.div>
            </div>
           );
        })}

      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {selectedId && selectedEvent && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div 
              className={styles.modalContent}
              layoutId={`node-${selectedId}`} // Optional: might break with separate nodes
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <button className={styles.closeButton} onClick={() => setSelectedId(null)}>
                <X size={20} />
              </button>
              
              <div className={styles.modalImageContainer}>
                 <img src={selectedEvent.imageUrl} alt={selectedEvent.title} />
              </div>

              <div className={styles.modalBody}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h2 className={styles.titleText}>{selectedEvent.title}</h2>
                  <span className={styles.yearText} style={{ color: '#888' }}>
                    {selectedEvent.month} {selectedEvent.year}
                  </span>
                </div>

                <h3 className={styles.companyText}>{selectedEvent.company}</h3>
                <p className={styles.descriptionText}>{selectedEvent.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CareerTimeline;
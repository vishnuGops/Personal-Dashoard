"use client";

import React, { useEffect, useState, useRef, useCallback, memo } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Loader2, X } from "lucide-react";
import styles from "./LandingPhotoWall.module.scss";
import { galleryImages } from "../data/gallery-images";

interface Photo {
  id: string;
  src: StaticImageData;
  alt: string;
  width: number;
  height: number;
}

const BATCH_SIZE = 30;

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Optimized data generation: No duplicates, clean IDs
const generatePhotos = (): Photo[] => {
  return galleryImages.map((img, idx) => ({
    id: `photo-${idx}`,
    src: img,
    alt: `Project Photo ${idx + 1}`,
    width: img.width,
    height: img.height,
  }));
};

// Memoized Photo Item Component for performance optimization
const PhotoItem = memo(
  ({
    photo,
    index,
    onClick,
  }: {
    photo: Photo;
    index: number;
    onClick: (photo: Photo) => void;
  }) => {
    return (
      <motion.div
        layoutId={photo.id}
        className={styles.photoItem}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: (index % BATCH_SIZE) * 0.05 }}
        onClick={() => onClick(photo)}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading="lazy"
          placeholder="blur"
          sizes="(max-width: 340px) 100vw, (max-width: 640px) 33vw, (max-width: 1536px) 25vw, 20vw"
        />
        <div className={styles.overlay}>
          <Maximize2 color="white" size={24} />
        </div>
      </motion.div>
    );
  },
);

PhotoItem.displayName = "PhotoItem";

const LandingPhotoWall: React.FC = () => {
  const [allPhotos, setAllPhotos] = useState<Photo[]>([]);
  const [visiblePhotos, setVisiblePhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [numColumns, setNumColumns] = useState(1);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial load and shuffle
    const photos = generatePhotos();
    const shuffled = shuffleArray(photos);
    setAllPhotos(shuffled);
    setVisiblePhotos(shuffled.slice(0, BATCH_SIZE));

    // Determine initial columns
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 340) setNumColumns(1);
      else if (width < 640) setNumColumns(3);
      else if (width < 1536) setNumColumns(4);
      else setNumColumns(5);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const loadMorePhotos = useCallback(() => {
    if (loading || visiblePhotos.length >= allPhotos.length) return;

    setLoading(true);
    // Simulate network delay for effect
    setTimeout(() => {
      const nextBatch = allPhotos.slice(
        visiblePhotos.length,
        visiblePhotos.length + BATCH_SIZE,
      );
      setVisiblePhotos((prev) => [...prev, ...nextBatch]);
      setLoading(false);
    }, 500);
  }, [allPhotos, visiblePhotos.length, loading]);

  // Distribute photos into columns
  const columns = React.useMemo(() => {
    const cols: Photo[][] = Array.from({ length: numColumns }, () => []);
    visiblePhotos.forEach((photo, index) => {
      cols[index % numColumns].push(photo);
    });
    return cols;
  }, [visiblePhotos, numColumns]);

  useEffect(() => {
    const target = observerTarget.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePhotos();
        }
      },
      { threshold: 0.1 },
    );

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [loadMorePhotos]);

  // Stable handler for memoized child
  const handlePhotoClick = useCallback((photo: Photo) => {
    setSelectedPhoto(photo);
  }, []);

  if (allPhotos.length === 0) {
    return (
      <div className={styles.loader}>
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  return (
    <>
      <div className={styles.photoWallContainer}>
        <h2 className={styles.sectionTitle}>Moments through my life...</h2>
        <div className={styles.photoWall}>
          <AnimatePresence>
            {columns.map((colPhotos, colIndex) => (
              <div key={colIndex} className={styles.masonryColumn}>
                {colPhotos.map((photo, index) => (
                  <PhotoItem
                    key={photo.id}
                    photo={photo}
                    index={index} // Note: This index is local to the column now, might need adjustment for delay calc if strictly desired
                    onClick={handlePhotoClick}
                  />
                ))}
              </div>
            ))}
          </AnimatePresence>
        </div>
        {/* Causing issue with the UI on the right side of the screen */}
        {/* Infinite Scroll Loader
        <div ref={observerTarget} className={styles.loader}>
          {visiblePhotos.length < allPhotos.length && (
            <Loader2 className="animate-spin" size={32} />
          )}
        </div> */}
      </div>

      {/* Modal / Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              layoutId={selectedPhoto.id}
            >
              <button
                className={styles.closeButton}
                onClick={() => setSelectedPhoto(null)}
              >
                <X size={24} />
              </button>
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                width={selectedPhoto.width}
                height={selectedPhoto.height}
                sizes="90vw"
                priority
                placeholder="blur"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LandingPhotoWall;

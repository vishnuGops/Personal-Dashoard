"use client";

import React, { useEffect, useState, useRef, useCallback, memo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Loader2, X } from "lucide-react";
import styles from "./LandingPhotoWall.module.scss";

interface Photo {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
}

const BATCH_SIZE = 10;

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
  const basePhotos = [
    { url: "/gallery/001.JPG", width: 600, height: 400 },
    { url: "/gallery/002.JPG", width: 500, height: 700 },
    { url: "/gallery/003.JPG", width: 600, height: 600 },
    { url: "/gallery/004.jpeg", width: 800, height: 500 },
    { url: "/gallery/005.jpg", width: 500, height: 500 },
    { url: "/gallery/006.jpg", width: 700, height: 500 },
    { url: "/gallery/007.jpg", width: 600, height: 800 },
    { url: "/gallery/008.jpg", width: 500, height: 300 },
    { url: "/gallery/009.jpg", width: 600, height: 400 },
    { url: "/gallery/010.jpg", width: 400, height: 400 },
    { url: "/gallery/011.jpg", width: 300, height: 500 },
    { url: "/gallery/012.jpeg", width: 400, height: 300 },
    { url: "/gallery/013.jpg", width: 500, height: 500 },
    { url: "/gallery/014.jpg", width: 400, height: 600 },
    { url: "/gallery/015.jpg", width: 400, height: 200 },
    { url: "/gallery/016.jpg", width: 300, height: 300 },
    { url: "/gallery/017.jpg", width: 300, height: 300 },
    { url: "/gallery/018.jpg", width: 600, height: 400 },
    { url: "/gallery/019.jpg", width: 500, height: 700 },
    { url: "/gallery/020.jpg", width: 600, height: 600 },
    { url: "/gallery/021.jpg", width: 800, height: 500 },
    { url: "/gallery/022.jpg", width: 500, height: 500 },
    { url: "/gallery/023.jpg", width: 700, height: 500 },
    { url: "/gallery/024.jpg", width: 600, height: 800 },
    { url: "/gallery/025.jpg", width: 500, height: 300 },
    { url: "/gallery/026.jpg", width: 600, height: 400 },
    { url: "/gallery/027.jpg", width: 400, height: 400 },
    { url: "/gallery/028.jpg", width: 300, height: 500 },
    { url: "/gallery/029.jpg", width: 400, height: 300 },
  ];

  return basePhotos.map((p, idx) => ({
    ...p,
    id: `photo-${idx}`,
    alt: `Project Photo ${idx + 1}`,
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
          src={photo.url}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial load and shuffle
    const photos = generatePhotos();
    const shuffled = shuffleArray(photos);
    setAllPhotos(shuffled);
    setVisiblePhotos(shuffled.slice(0, BATCH_SIZE));
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
            {visiblePhotos.map((photo, index) => (
              <PhotoItem
                key={photo.id}
                photo={photo}
                index={index}
                onClick={handlePhotoClick}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Infinite Scroll Loader */}
        <div ref={observerTarget} className={styles.loader}>
          {visiblePhotos.length < allPhotos.length && (
            <Loader2 className="animate-spin" size={32} />
          )}
        </div>
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
                src={selectedPhoto.url}
                alt={selectedPhoto.alt}
                width={selectedPhoto.width}
                height={selectedPhoto.height}
                sizes="90vw"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LandingPhotoWall;

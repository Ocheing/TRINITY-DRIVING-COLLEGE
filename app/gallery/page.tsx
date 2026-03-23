'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Video, ChevronDown, Images } from 'lucide-react';
import type { GalleryItem } from '@/types';

const INITIAL_LIMIT = 8;
const LOAD_MORE_COUNT = 8;

/* ─── Gallery Card ─────────────────────────────────────────────────────────── */
function GalleryCard({
  image,
  isHero = false,
}: {
  image: GalleryItem;
  isHero?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      layout
      // 1. The middle hero is taller. 2. Other images are shorter and more square/landscape.
      className={`gallery-card group relative overflow-hidden rounded-xl bg-gray-100 shadow hover:shadow-xl transition-all duration-500 cursor-pointer w-full ${
        isHero ? 'aspect-[3/4] sm:aspect-[2/3]' : 'aspect-[4/3] sm:aspect-[5/4]'
      }`}
    >
      {image.type === 'video' ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-full bg-gray-900 hidden-overflow">
          <Video className="h-10 w-10 text-white/50 mb-3" />
          <a
            href={image.image_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-semibold backdrop-blur-sm transition-all shadow-sm z-10"
            onClick={(e) => e.stopPropagation()}
          >
            Watch Video
          </a>
        </div>
      ) : (
        <img
          src={image.image_url}
          alt={image.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
      )}

      {/* Glassmorphism hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end">
        <div className="p-4 w-full translate-y-3 group-hover:translate-y-0 transition-transform duration-400">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3 rounded-xl">
            <h3 className="text-white font-bold text-sm leading-snug mb-1">{image.title}</h3>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-brand/80 text-white">
              {image.category}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────────── */
export default function GalleryPage() {
  const supabase = createClient();
  const [allImages, setAllImages] = useState<GalleryItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_LIMIT);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await supabase
          .from('gallery')
          .select('*')
          .order('created_at', { ascending: false });
        if (data) setAllImages(data);
      } catch (err) {
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const visibleImages = allImages.slice(0, visibleCount);
  const hasMore = visibleCount < allImages.length;

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + LOAD_MORE_COUNT);
      setLoadingMore(false);
    }, 500);
  };



  // ─── Masonry Distribution Logic ─────────────────────────────────────────────
  
  // For explicitly 3 columns (Desktop)
  const col3_1: GalleryItem[] = [];
  const col3_2: GalleryItem[] = [];
  const col3_3: GalleryItem[] = [];
  // For 2 columns (Tablet)
  const col2_1: GalleryItem[] = [];
  const col2_2: GalleryItem[] = [];

  visibleImages.forEach((img, i) => {
    // Distribute for 3 columns (matches the 8-item block pattern precisely)
    const pos = i % 8;
    if (pos === 0 || pos === 3 || pos === 5) col3_1.push(img);
    else if (pos === 1 || pos === 6) col3_2.push(img);
    else col3_3.push(img);

    // Distribute for 2 columns (alternating)
    if (i % 2 === 0) col2_1.push(img);
    else col2_2.push(img);
  });

  return (
    <div className="gallery-page bg-white min-h-screen">
      {/* ── Hero ────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative bg-brand py-24 sm:py-32"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-brand mix-blend-multiply" />
          <div className="absolute inset-0 bg-dot-pattern opacity-10" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Our Gallery
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
            A glimpse into life at Trinity Driving School.
          </p>
        </div>
      </motion.div>

      {/* ── Gallery Content ─────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-10 w-10 animate-spin text-brand" />
          </div>
        ) : allImages.length > 0 ? (
          <>
            <div className="gallery-container">
              {/* DESKTOP (3 Columns) */}
              <div className="hidden lg:grid grid-cols-3 gap-4 xl:gap-6">
                <div className="flex flex-col gap-4 xl:gap-6">
                  {col3_1.map((img) => (
                    <GalleryCard key={img.id} image={img} />
                  ))}
                </div>
                <div className="flex flex-col gap-4 xl:gap-6">
                  {col3_2.map((img, idx) => (
                    // The first item in the middle column of each block is the "hero" tall image.
                    // By nature of our sorting, the hero image will be the even indexes in col3_2
                    <GalleryCard 
                      key={img.id} 
                      image={img} 
                      isHero={idx % 2 === 0} 
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-4 xl:gap-6">
                  {col3_3.map((img) => (
                    <GalleryCard key={img.id} image={img} />
                  ))}
                </div>
              </div>

              {/* TABLET (2 Columns) */}
              <div className="hidden md:grid lg:hidden grid-cols-2 gap-4">
                <div className="flex flex-col gap-4">
                  {col2_1.map((img, i) => (
                    <GalleryCard key={img.id} image={img} isHero={i % 4 === 0} />
                  ))}
                </div>
                <div className="flex flex-col gap-4">
                  {col2_2.map((img, i) => (
                    <GalleryCard key={img.id} image={img} isHero={i % 4 === 3} />
                  ))}
                </div>
              </div>

              {/* MOBILE (1 Column) */}
              <div className="grid md:hidden grid-cols-1 gap-4">
                <div className="flex flex-col gap-4">
                  {visibleImages.map((img, i) => (
                    <GalleryCard key={img.id} image={img} isHero={i % 8 === 1} />
                  ))}
                </div>
              </div>
            </div>

            {/* ── Load More ──────────────────────────────────────── */}
            {hasMore && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-14 flex flex-col items-center gap-4"
              >
                <p className="text-sm text-gray-500 font-medium tracking-wide">
                  Showing <span className="text-gray-900">{visibleCount}</span> of{' '}
                  <span className="text-gray-900">{allImages.length}</span> photos
                </p>
                <button
                  id="gallery-load-more-btn"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="gallery-load-more-btn group inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-semibold text-sm transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading…
                    </>
                  ) : (
                    <>
                      <Images className="h-4 w-4" />
                      View More Photos
                      <ChevronDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform duration-200" />
                    </>
                  )}
                </button>
              </motion.div>
            )}

            {/* All loaded */}
            {!hasMore && allImages.length > INITIAL_LIMIT && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-12 text-center text-sm font-medium text-gray-400"
              >
                ✓ All {allImages.length} photos loaded
              </motion.p>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="text-xl font-medium text-gray-500">Gallery is being updated. Check back soon!</p>
          </motion.div>
        )}
      </div>

      {/* ── Styles ──────────────────────────────────────────────── */}
      <style jsx>{`
        .gallery-load-more-btn {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          box-shadow: 0 4px 20px -4px rgba(37, 99, 235, 0.55);
        }
        .gallery-load-more-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px -4px rgba(37, 99, 235, 0.65);
        }
        .gallery-load-more-btn:active:not(:disabled) {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

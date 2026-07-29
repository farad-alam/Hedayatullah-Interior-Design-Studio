'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Play, X, Video } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface VideoReelsProps {
  videos: any[]
  isAr?: boolean
  title?: string
}

export function VideoReels({ videos, isAr, title = 'Our Work in Action' }: VideoReelsProps) {
  const [activeVideo, setActiveVideo] = useState<any | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('ALL')

  if (!videos || videos.length === 0) return null

  // Category translation mapping
  const categoryMap: Record<string, string> = {
    WORKING: isAr ? 'قيد العمل' : 'Working',
    COMPLETED: isAr ? 'مكتمل' : 'Completed',
    TRANSFORMATION: isAr ? 'تحول' : 'Transformation',
    INSTALLATION: isAr ? 'تركيب' : 'Installation',
    OTHER: isAr ? 'أخرى' : 'Other'
  }

  const categoryColor: Record<string, string> = {
    WORKING: 'bg-blue-500',
    COMPLETED: 'bg-emerald-600',
    TRANSFORMATION: 'bg-purple-500',
    INSTALLATION: 'bg-orange-500',
    OTHER: 'bg-gray-500'
  }

  // Get unique categories for the filter
  const availableCategories = useMemo(() => {
    const cats = new Set(videos.map(v => v.category))
    return Array.from(cats)
  }, [videos])

  // Filter videos
  const filteredVideos = useMemo(() => {
    if (activeCategory === 'ALL') return videos
    return videos.filter(v => v.category === activeCategory)
  }, [videos, activeCategory])

  return (
    <section className="py-32 relative overflow-hidden" style={{ background: 'var(--sf-charcoal)' }}>
      {/* Ambient background glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full opacity-10 blur-[120px]" style={{ background: 'var(--sf-tan)' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full opacity-10 blur-[120px]" style={{ background: 'var(--sf-brown)' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Premium Header */}
        <div className={cn("mb-16", isAr ? "text-right" : "text-center")}>
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] mb-4 block" style={{ color: 'var(--sf-tan)' }}>
            {isAr ? 'أعمالنا في الميدان' : 'OUR WORK IN ACTION'}
          </span>
          <h2 className="sf-section-heading mb-6 max-w-3xl mx-auto" style={{ color: '#F7F3EC' }}>
            {title}
          </h2>
        </div>

        {/* Category Filters (only show if >1 category) */}
        {availableCategories.length > 1 && (
          <div className={cn("flex gap-3 mb-12 overflow-x-auto hide-scrollbar pb-2 justify-center", isAr ? "flex-row-reverse" : "")}>
            <button
              onClick={() => setActiveCategory('ALL')}
              className={cn(
                "px-6 py-2.5 rounded-full text-[0.75rem] font-bold tracking-widest transition-all duration-300 whitespace-nowrap uppercase border",
                activeCategory === 'ALL' 
                  ? "bg-[var(--sf-tan)] text-white border-[var(--sf-tan)]" 
                  : "bg-transparent text-white/50 border-white/20 hover:border-white/50 hover:text-white"
              )}
            >
              {isAr ? 'الكل' : 'ALL REELS'}
            </button>
            {availableCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-[0.75rem] font-bold tracking-widest transition-all duration-300 whitespace-nowrap uppercase border",
                  activeCategory === cat 
                    ? "bg-[var(--sf-tan)] text-white border-[var(--sf-tan)]" 
                    : "bg-transparent text-white/50 border-white/20 hover:border-white/50 hover:text-white"
                )}
              >
                {categoryMap[cat] || cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative z-10 w-full pl-6 md:pl-auto">
        <div 
          className="flex overflow-x-auto gap-8 px-6 pb-12 snap-x snap-mandatory hide-scrollbar pt-4" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <AnimatePresence mode="popLayout">
            {filteredVideos.map((video) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={video.id} 
                className="relative flex-none w-[280px] md:w-[340px] h-[500px] md:h-[600px] rounded-3xl overflow-hidden cursor-pointer group snap-center shadow-2xl bg-black transition-all duration-500 hover:-translate-y-2 border border-white/10 hover:border-[var(--sf-tan)]/50"
                onClick={() => setActiveVideo(video)}
              >
                {/* Thumbnail */}
                <Image
                  src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                  alt={video.title}
                  fill
                  className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />

                {/* Multiple Gradient Overlays for rich depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div className={cn("flex items-start", isAr ? "flex-row-reverse justify-between" : "justify-between")}>
                    {/* Shorts/Video Icon */}
                    <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <Video className="w-5 h-5 text-[var(--sf-tan)]" />
                    </div>
                    
                    <Badge className={cn(
                      "text-white border-none shadow-md bg-opacity-90 backdrop-blur-sm px-3 py-1 text-xs",
                      categoryColor[video.category] || 'bg-gray-500'
                    )}>
                      {categoryMap[video.category] || video.category}
                    </Badge>
                  </div>

                  <div className={cn("space-y-4", isAr ? "text-right" : "text-left")}>
                    {/* Play Button - pulsing ring */}
                    <div className={cn("relative w-16 h-16 flex items-center justify-center", isAr ? "ml-auto" : "")}>
                      <div className="absolute inset-0 rounded-full border-2 border-[var(--sf-tan)] opacity-0 group-hover:animate-ping" />
                      <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-[var(--sf-tan)] transition-all duration-300 shadow-xl border border-white/30 group-hover:border-transparent group-hover:scale-110">
                        <Play className={cn("w-6 h-6 text-white fill-white/20 group-hover:fill-white", isAr ? "mr-1" : "ml-1")} />
                      </div>
                    </div>
                    
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-white font-bold text-2xl line-clamp-2 leading-tight drop-shadow-lg font-playfair">
                        {isAr && video.titleAr ? video.titleAr : video.title}
                      </h3>
                      {(video.caption || video.captionAr) && (
                        <p className="text-white/70 text-sm mt-3 line-clamp-2 drop-shadow-md font-light leading-relaxed">
                          {isAr && video.captionAr ? video.captionAr : video.caption}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Full-screen Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
            onClick={() => setActiveVideo(null)}
          >
            <button 
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-[110] border border-white/10"
              onClick={() => setActiveVideo(null)}
            >
              <X className="w-6 h-6" />
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-[420px] aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(212,184,150,0.15)] border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-none"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

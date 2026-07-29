'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

interface AboutSectionProps {
  isAr?: boolean
}

export function AboutSection({ isAr }: AboutSectionProps) {
  return (
    <section className="py-28 relative overflow-hidden" style={{ background: '#fff' }}>
      
      {/* Organic background accent blobs (css only) */}
      <div 
        className="absolute top-10 left-[-10%] w-[40%] h-[60%] rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: 'var(--sf-green)', filter: 'blur(80px)' }}
      />
      <div 
        className="absolute bottom-10 right-[-10%] w-[30%] h-[50%] rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: 'var(--sf-brown)', filter: 'blur(80px)' }}
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        <div className={cn("flex flex-col md:flex-row items-center gap-12 lg:gap-20", isAr ? "md:flex-row-reverse" : "")}>
          
          {/* Main Architectural Image - Left Side */}
          <div className="w-full md:w-1/2 relative">
            {/* Decorative leaf/branch SVG accent behind image */}
            <div className={`absolute -top-12 ${isAr ? '-right-12' : '-left-12'} text-[var(--sf-tan)] opacity-50 z-0`}>
              <svg width="120" height="180" viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M60 180C60 180 60 100 10 50C10 50 40 40 60 80C60 80 80 40 110 50C110 50 60 100 60 180Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M60 130C60 130 90 90 100 60C100 60 70 70 60 100" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <div className="relative aspect-[4/5] w-full rounded-full rounded-tl-none overflow-hidden z-10">
              <Image
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80"
                alt="Interior Design"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Small circular badge overlay */}
            <div 
              className={`absolute bottom-8 ${isAr ? '-right-6' : '-left-6'} w-24 h-24 rounded-full flex items-center justify-center z-20 shadow-lg`}
              style={{ background: 'var(--sf-brown)', color: '#F7F3EC' }}
            >
              <div className="text-center">
                <span className="block font-playfair font-bold text-2xl leading-none">10</span>
                <span className="block text-[0.55rem] tracking-[0.2em] uppercase mt-1 opacity-90">
                  {isAr ? 'سنوات' : 'YEARS'}
                </span>
              </div>
            </div>
          </div>

          {/* Text Content - Right Side */}
          <div className={cn("w-full md:w-1/2 flex flex-col justify-center", isAr ? "text-right" : "text-left")}>
            <span className="sf-label block mb-6">
              {isAr ? 'تعرف على المؤسس' : 'MEET THE FOUNDER'}
            </span>
            
            <h2 className="sf-section-heading mb-8">
              {isAr ? 'تصميم بنية صادقة.' : 'Designing with intention.'} <br/>
              <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--sf-brown)' }}>
                {isAr ? 'مستوحى من الطبيعة.' : 'Rooted in nature.'}
              </em>
            </h2>
            
            <div className="space-y-6 mb-10 text-[0.95rem] font-light" style={{ color: 'var(--sf-charcoal)', lineHeight: 1.8 }}>
               <p>
                {isAr 
                  ? 'منذ تأسيسنا، التزمنا بإعادة تعريف مفهوم الفخامة العملية. نجمع بين الحرفية الدقيقة والجماليات العصرية لنقدم تصاميم داخلية ومطابخ ألمنيوم ترتقي بأسلوب حياتك.'
                  : 'Since our founding, we have been committed to redefining practical luxury. We merge meticulous craftsmanship with modern aesthetics to deliver interior designs and aluminum kitchens that elevate your lifestyle.'
                }
              </p>
              <p>
                {isAr
                  ? 'كل مشروع هو رحلة تعاونية فريدة. يدرس فريقنا أدق التفاصيل لضمان أن كل زاوية تنبض بالحياة، والجودة تتحدث عن نفسها، دون الحاجة إلى تكاليف باهظة أو هدر للوقت.'
                  : 'Every project is a unique collaborative journey. I take the time to understand your story, your needs, and your lifestyle to create spaces that are as beautiful as they are meaningful.'
                }
              </p>
            </div>
            
            <div>
              <a 
                href="#contact" 
                className={cn("sf-learn-more", isAr ? "flex-row-reverse" : "")} 
              >
                {isAr ? 'المزيد عنا' : 'MORE ABOUT US'}
                <ArrowRight className={cn("h-3.5 w-3.5", isAr ? "rotate-180" : "")} />
              </a>
            </div>
          </div>

        </div>
        
      </div>
    </section>
  )
}

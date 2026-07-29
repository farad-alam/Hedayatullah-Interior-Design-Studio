import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/core/db/client'
import { getLanguage } from '@/core/actions/language.actions'
import { getSiteSettings } from '@/core/services/settings.service'
import { MessageCircle, ArrowRight, Star, ChevronDown } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { ClientGallery } from '@/components/storefront/ClientGallery'
import { VideoReels } from '@/components/storefront/VideoReels'
import { BrandMarquee } from '@/components/storefront/BrandMarquee'
import { AboutSection } from '@/components/storefront/AboutSection'
import { HeroSlider } from '@/components/storefront/HeroSlider'

export const dynamic = 'force-dynamic'

const DynamicIcon = ({ name, className, style }: { name: string; className?: string; style?: React.CSSProperties }) => {
  const Icon = (LucideIcons as any)[name] || LucideIcons.CheckCircle
  return <Icon className={className} style={style} />
}

export default async function StorefrontPage() {
  const lang = await getLanguage()
  const settings = await getSiteSettings()

  const [services, trustFeatures, stats, faqs, testimonials, galleryItems, videoReels, brandLogos] = await Promise.all([
    prisma.service.findMany({ where: { status: 'PUBLISHED' }, orderBy: { createdAt: 'asc' } }),
    prisma.trustFeature.findMany({ orderBy: { order: 'asc' } }),
    prisma.statCounter.findMany({ orderBy: { order: 'asc' } }),
    prisma.fAQ.findMany({ where: { status: 'PUBLISHED' }, orderBy: { createdAt: 'asc' } }),
    prisma.testimonial.findMany({ where: { status: 'PUBLISHED', featured: true }, orderBy: { createdAt: 'desc' } }),
    prisma.galleryItem.findMany({ where: { status: 'PUBLISHED' }, orderBy: { createdAt: 'desc' } }),
    prisma.videoReel.findMany({ where: { status: 'PUBLISHED' }, orderBy: [{ order: 'asc' }, { createdAt: 'desc' }] }),
    prisma.brandLogo.findMany({ where: { status: 'PUBLISHED' }, orderBy: [{ order: 'asc' }, { createdAt: 'desc' }] }),
  ])

  const isAr = lang === 'ar'
  const heroHeadline = isAr ? settings?.heroHeadlineAr : settings?.heroHeadline
  const heroSub = isAr ? settings?.heroSubheadlineAr : settings?.heroSubheadline
  const wpNumber = settings?.whatsapp || ''
  const wpClean = wpNumber.replace(/\D/g, '')

  const defaultHeadline = isAr
    ? 'خبراء صيانة وتركيب مطابخ الألمنيوم'
    : 'Expert Aluminum Kitchen Services'
  const defaultSub = isAr
    ? 'خدمات احترافية في جميع أنحاء الرياض. جودة مضمونة وسرعة في التنفيذ.'
    : 'Professional maintenance, dismantling & installation across all Riyadh neighborhoods.'

  // Split headline for italic last word (design inspiration)
  const headline = heroHeadline || defaultHeadline
  const words = headline.split(' ')
  const lastWord = words.pop()
  const restWords = words.join(' ')
  
  // Use heroImages array, falling back to legacy single heroImage if present
  const heroImages = settings?.heroImages?.length 
    ? settings.heroImages 
    : (settings as any)?.heroImage 
      ? [(settings as any).heroImage] 
      : []

  // Build Schema.org LocalBusiness JSON-LD
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: settings?.brandName || 'Interior Platform Core',
    image: heroImages[0] || 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop',
    '@id': process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || 'https://www.yourdomain.com',
    url: process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || 'https://www.yourdomain.com',
    telephone: settings?.phone || settings?.whatsapp || '',
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings?.address || '',
      addressLocality: 'Riyadh',
      addressRegion: 'Riyadh Province',
      addressCountry: 'SA'
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Saturday',
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday'
      ],
      opens: '07:00',
      closes: '22:00'
    }
  }

  return (
    <div className="flex flex-col w-full" style={{ background: 'var(--sf-cream)' }}>
      {/* JSON-LD Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* 1. HERO */}
      <section className="relative min-h-[90vh] lg:min-h-screen w-full flex items-center overflow-hidden">
        <HeroSlider images={heroImages} />
        <div 
          className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-${isAr ? 'l' : 'r'} from-black/80 via-black/40 to-transparent`} 
        />
        <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col justify-center mt-20 md:mt-0 h-full">
          <div className={`max-w-2xl ${isAr ? 'ml-auto text-right' : 'mr-auto text-left'} animate-fade-up`}>
            <div className={`flex items-center gap-3 mb-8 ${isAr ? 'justify-end' : 'justify-start'}`}>
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--sf-tan)' }}>
                {isAr ? 'حياة عضوية. معيشة مستوحاة.' : 'ORGANIC SPACES. INSPIRED LIVING.'}
              </span>
            </div>
            <h1
              className="font-playfair font-bold leading-tight mb-6"
              style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', color: '#F7F3EC', lineHeight: 1.1 }}
            >
              {restWords}{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--sf-tan)', fontWeight: 400 }}>{lastWord}</em>
            </h1>
            <p
              className="mb-10 leading-relaxed"
              style={{ fontSize: '1.05rem', color: 'rgba(247,243,236,0.85)', lineHeight: 1.7 }}
            >
              {heroSub || defaultSub}
            </p>
            <div className={`flex flex-col sm:flex-row items-center gap-4 ${isAr ? 'sm:flex-row-reverse' : ''}`}>
              <a href="#gallery" className="sf-btn-primary">
                {isAr ? 'استكشف أعمالنا' : 'EXPLORE OUR WORK'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST FEATURES */}
      {trustFeatures.length > 0 && (
        <section className="px-6 relative z-20 -mt-16 pb-16" style={{ background: 'transparent' }}>
          <div className="container mx-auto max-w-6xl animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="sf-card p-8 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
              {trustFeatures.slice(0, 4).map(feature => (
                <div key={feature.id} className="flex flex-col items-center text-center gap-4">
                  <div className="sf-icon-wrap">
                    <DynamicIcon name={feature.icon || 'CheckCircle'} className="h-6 w-6" />
                  </div>
                  <div>
                    <h3
                      className="text-[0.7rem] font-bold uppercase tracking-wider mb-2"
                      style={{ color: 'var(--sf-charcoal)', letterSpacing: '0.12em' }}
                    >
                      {isAr ? (feature.titleAr || feature.title) : feature.title}
                    </h3>
                    <p className="text-[0.8rem] leading-relaxed" style={{ color: 'var(--sf-warm-gray)' }}>
                      {isAr ? (feature.descriptionAr || feature.description) : feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. BRANDS MARQUEE */}
      {brandLogos && brandLogos.length > 0 && (
        <div className="relative z-10 py-16 bg-white border-y border-[#EDE8DC]">
          <div className="text-center mb-10">
             <span className="sf-label">{isAr ? 'موثوقون من قبل العلامات التجارية' : 'TRUSTED BY LEADING BRANDS'}</span>
          </div>
          <BrandMarquee brands={brandLogos} isAr={isAr} />
        </div>
      )}

      {/* 4. PORTFOLIO GALLERY */}
      {galleryItems.length > 0 && (
        <section id="gallery" className="py-28 px-6" style={{ background: '#fff' }}>
          <div className="container mx-auto max-w-[90rem]">
            <div className={`flex items-end justify-between mb-16 flex-wrap gap-6 ${isAr ? 'flex-row-reverse' : ''}`}>
              <div className={isAr ? 'text-right' : 'text-left'}>
                <span className="sf-label block mb-4">
                  {isAr ? 'مشاريعنا' : 'OUR PROJECTS'}
                </span>
                <h2 className="sf-section-heading">
                  {isAr ? 'مساحات تشعرك وكأنك في المنزل.' : 'Spaces that feel like home.'}
                </h2>
              </div>
              <Link href="#gallery" className="sf-learn-more">
                {isAr ? 'عرض جميع المشاريع' : 'VIEW ALL PROJECTS'}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <ClientGallery items={galleryItems} isAr={isAr} />
          </div>
        </section>
      )}

      {/* 5. VIDEO REELS */}
      <VideoReels 
        videos={videoReels} 
        isAr={isAr} 
        title={isAr ? 'أعمالنا في الميدان' : 'Our Work in Action'} 
      />

      {/* 6. SERVICES */}
      <section id="services" className="py-28 px-6 relative" style={{ background: 'var(--sf-cream)' }}>
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="sf-label block mb-4">
              {isAr ? 'ماذا نقدم' : 'WHAT WE DO'}
            </span>
            <h2 className="sf-section-heading max-w-2xl mx-auto">
              {isAr ? 'تصميم مدروس لطريقة' : 'Thoughtful design for'} <br/>
              <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--sf-brown)' }}>
                {isAr ? 'حياتك' : 'how you live.'}
              </em>
            </h2>
          </div>
          <div className={`grid md:grid-cols-2 lg:grid-cols-${Math.min(services.length || 3, 4)} gap-6`}>
            {services.map((service, idx) => {
              const sTitle = isAr ? (service.titleAr || service.title) : service.title
              const sDesc = isAr ? (service.descriptionAr || service.description) : service.description
              return (
                <div key={service.id} className="sf-card group flex flex-col overflow-hidden">
                  <div className="relative h-64 w-full overflow-hidden p-3 pb-0">
                    <div className="relative w-full h-full rounded-t-xl overflow-hidden">
                      {service.image ? (
                        <Image src={service.image} alt={sTitle} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full" style={{ background: 'var(--sf-cream-dark)' }} />
                      )}
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-10 sf-icon-wrap" style={{ width: '3rem', height: '3rem' }}>
                        <DynamicIcon name={service.icon || 'Wrench'} className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-8 pt-10 flex-1 flex flex-col text-center">
                    <h3 className="font-playfair font-bold text-xl mb-3" style={{ color: 'var(--sf-charcoal)' }}>
                      {sTitle}
                    </h3>
                    <p className="text-[0.85rem] leading-relaxed mb-6 flex-1" style={{ color: 'var(--sf-warm-gray)' }}>
                      {sDesc}
                    </p>
                    <Link href={`#contact`} className="sf-learn-more mx-auto mt-auto">
                      {isAr ? 'اعرف المزيد' : 'LEARN MORE'}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 7. ABOUT US SECTION */}
      <AboutSection isAr={isAr} />

      {/* 8. STATS STRIP */}
      {stats.length > 0 && (
        <section className="px-6 relative z-30 -mt-16 mb-28">
          <div className="container mx-auto max-w-5xl">
            <div 
              className="rounded-3xl grid grid-cols-2 md:grid-cols-4 shadow-2xl overflow-hidden"
              style={{ background: 'var(--sf-charcoal)' }}
            >
              {stats.map((stat, idx) => (
                <div 
                  key={stat.id} 
                  className={`py-12 px-6 flex flex-col items-center justify-center text-center relative ${idx !== stats.length - 1 ? 'border-b md:border-b-0 md:border-r border-white/10' : ''}`}
                >
                  <div
                    className="font-playfair font-bold mb-3"
                    style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#fff', lineHeight: 1 }}
                  >
                    {isAr ? (stat.valueAr || stat.value) : stat.value}
                  </div>
                  <div 
                    className="text-[0.65rem] font-bold tracking-[0.2em] uppercase" 
                    style={{ color: 'var(--sf-tan)' }}
                  >
                    {isAr ? (stat.labelAr || stat.label) : stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="py-32 px-6" style={{ background: 'var(--sf-cream)' }}>
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-20">
              <span className="sf-label block mb-4">
                {isAr ? 'كلمات طيبة' : 'KIND WORDS'}
              </span>
              <h2 className="sf-section-heading">
                {isAr ? 'قصص من عملائنا.' : 'Stories from our clients.'}
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((t, idx) => (
                <div
                  key={t.id}
                  className={`flex flex-col p-8 rounded-3xl ${idx === 1 ? 'shadow-xl' : 'shadow-sm'}`}
                  style={{ 
                    background: idx === 1 ? '#fff' : 'transparent',
                    border: idx === 1 ? 'none' : '1px solid rgba(212,184,150,0.3)' 
                  }}
                >
                  <span className="sf-quote-mark">“</span>
                  <p
                    className="text-[0.95rem] leading-relaxed mb-8 flex-1"
                    style={{ color: 'var(--sf-charcoal)', fontWeight: 500 }}
                  >
                    {isAr ? (t.contentAr || t.content) : t.content}
                  </p>
                  <div className={`flex items-center gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <div className="w-12 h-12 rounded-full bg-[#E5DCD0] flex-shrink-0" /> {/* Placeholder avatar */}
                    <div className={isAr ? 'text-right' : 'text-left'}>
                      <div className="text-[0.75rem] font-bold uppercase tracking-wider" style={{ color: 'var(--sf-charcoal)' }}>
                        — {isAr ? (t.clientNameAr || t.clientName) : t.clientName}
                      </div>
                      <div className="text-[0.75rem] mt-1" style={{ color: 'var(--sf-warm-gray)' }}>
                        {isAr ? (t.clientLocationAr || t.clientLocation) : t.clientLocation}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. WHATSAPP FREE QUOTE CTA */}
      {wpClean && (
        <section className="py-24 px-6 relative" style={{ background: 'var(--sf-cream)' }}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--sf-tan)] opacity-10 rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--sf-green)] opacity-5 rounded-tr-full pointer-events-none" />
          <div className="container mx-auto max-w-6xl rounded-3xl overflow-hidden relative shadow-2xl" style={{ background: 'var(--sf-green-dark)' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent pointer-events-none" />
            <div className={`py-20 px-10 md:px-20 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10 ${isAr ? 'md:flex-row-reverse text-right' : 'text-left'}`}>
              <div className="max-w-xl">
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] mb-4 block" style={{ color: 'var(--sf-tan)' }}>
                  {isAr ? 'جاهز للبدء؟' : 'READY TO BEGIN?'}
                </span>
                <h2 className="font-playfair font-bold mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#F7F3EC', lineHeight: 1.15 }}>
                  {isAr ? 'دعنا نبتكر مساحة تشعرك بأنها' : "Let's create a space that feels like"}{' '}
                  <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--sf-tan)' }}>{isAr ? 'لك.' : 'you.'}</em>
                </h2>
                <p style={{ color: 'rgba(247,243,236,0.8)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {isAr
                    ? 'أرسل لنا صورة لمطبخك أو مساحتك وسنقدم لك استشارة وعرض سعر.'
                    : "Send us a photo of your space and we'll provide a consultation and quote."}
                </p>
              </div>
              <a
                href={`https://wa.me/${wpClean}?text=${encodeURIComponent(isAr ? 'مرحباً، أريد الاستفسار والحصول على استشارة.' : 'Hello, I would like to book a consultation.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 sf-btn-primary"
                style={{
                  background: '#F7F3EC',
                  color: 'var(--sf-green-dark)',
                  padding: '1.25rem 2.5rem',
                }}
              >
                {isAr ? 'احجز استشارتك' : 'BOOK YOUR CONSULTATION'}
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 11. FAQ */}
      {faqs.length > 0 && (
        <section id="faq" className="py-28 px-6" style={{ background: '#fff' }}>
          <div className="container mx-auto max-w-4xl">
            <div className={`mb-16 text-center`}>
              <span className="sf-label block mb-4">
                {isAr ? 'الأسئلة الشائعة' : 'FAQ'}
              </span>
              <h2 className="sf-section-heading">
                {isAr ? 'أسئلة يطرحها عملاؤنا' : 'Questions We Get Asked'}
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.id}
                  className="group [&_summary::-webkit-details-marker]:hidden rounded-xl overflow-hidden transition-all"
                  style={{ background: 'var(--sf-cream)' }}
                >
                  <summary
                    className={`flex items-center justify-between p-6 md:p-8 cursor-pointer font-playfair font-bold text-lg md:text-xl ${isAr ? 'flex-row-reverse text-right' : ''}`}
                    style={{ color: 'var(--sf-charcoal)' }}
                  >
                    <span>{isAr ? (faq.questionAr || faq.question) : faq.question}</span>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full border border-[var(--sf-brown)] flex items-center justify-center ml-4 relative">
                      <span className="absolute w-3 h-px bg-[var(--sf-brown)]" />
                      <span className="absolute w-px h-3 bg-[var(--sf-brown)] transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                    </div>
                  </summary>
                  <div
                    className={`px-6 md:px-8 pb-8 text-[0.95rem] leading-relaxed ${isAr ? 'text-right' : ''}`}
                    style={{ color: 'var(--sf-warm-gray)' }}
                  >
                    {isAr ? (faq.answerAr || faq.answer) : faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

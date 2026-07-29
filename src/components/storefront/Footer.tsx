import Link from 'next/link'
import { prisma } from '@/core/db/client'
import { getLanguage } from '@/core/actions/language.actions'
import { Phone, MapPin, Clock, MessageCircle, ArrowRight } from 'lucide-react'

// Custom SVGs for Snapchat and TikTok if Lucide doesn't have them
function SnapchatIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M11.69 2.52a.5.5 0 0 1 .62 0 8.04 8.04 0 0 1 2.82 2.6c1.13 1.7 1.83 3.66 2.05 5.67.06.5.48.91 1 .91h1.16a.44.44 0 0 1 .37.69l-.75 1.09a.4.4 0 0 0-.07.41c.21.57.8 1.01 1.43 1.13a.42.42 0 0 1 .31.64 6.7 6.7 0 0 1-2.92 2.67.65.65 0 0 0-.41.61c.01.27.09.52.23.75a1.27 1.27 0 0 1-.22 1.48 2.37 2.37 0 0 1-1.63.7c-.55 0-1.12-.23-1.63-.58a.4.4 0 0 0-.46 0 6.64 6.64 0 0 1-3.08.75 6.64 6.64 0 0 1-3.08-.75.4.4 0 0 0-.46 0c-.51.35-1.08.58-1.63.58a2.37 2.37 0 0 1-1.63-.7 1.27 1.27 0 0 1-.22-1.48c.14-.23.22-.48.23-.75a.65.65 0 0 0-.41-.61 6.7 6.7 0 0 1-2.92-2.67.42.42 0 0 1 .31-.64c.63-.12 1.22-.56 1.43-1.13a.4.4 0 0 0-.07-.41l-.75-1.09a.44.44 0 0 1 .37-.69h1.16c.52 0 .94-.41 1-.91.22-2.01.92-3.97 2.05-5.67a8.04 8.04 0 0 1 2.82-2.6Z" />
    </svg>
  )
}

function TikTokIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  )
}

function XIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 4l16 16M4 20L20 4" />
    </svg>
  )
}

function InstagramIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

export async function Footer() {
  const [settings, lang] = await Promise.all([
    prisma.siteSettings.findFirst(),
    getLanguage(),
  ])

  const isAr = lang === 'ar'
  const brandName = isAr ? (settings?.brandNameAr || settings?.brandName) : settings?.brandName
  const displayBrand = brandName || (isAr ? 'هدايت الله' : 'HEDAYATULLAH')
  
  const tagline = isAr ? (settings?.footerTaglineAr || settings?.footerTagline) : settings?.footerTagline
  const address = isAr ? (settings?.addressAr || settings?.address) : settings?.address
  const workingHours = isAr ? (settings?.workingHoursAr || settings?.workingHours) : settings?.workingHours
  const serviceAreas = isAr ? (settings?.serviceAreasAr || settings?.serviceAreas) : settings?.serviceAreas
  const wp = settings?.whatsapp || ''
  const wpClean = wp.replace(/\D/g, '')

  return (
    <>
      {/* ══════════════════════════════════════════
          MAP SECTION (Full Width Before Footer)
      ══════════════════════════════════════════ */}
      {settings?.mapEmbedUrl && (
        <section className="relative w-full h-[400px] bg-[var(--sf-cream-dark)]">
          <iframe
            src={settings.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(100%) contrast(1.1) opacity(0.8)' }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient overlay to blend the map into the footer */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[var(--sf-green-dark)] to-transparent opacity-90" />
        </section>
      )}

      <footer style={{ background: 'var(--sf-green-dark)', color: '#F7F3EC' }}>
        
        {/* ══════════════════════════════════════════
            FOOTER GRID
        ══════════════════════════════════════════ */}
        <div className={`container mx-auto px-6 pt-24 pb-16 grid md:grid-cols-12 gap-12 lg:gap-16 ${isAr ? 'text-right' : 'text-left'}`}>
          
          {/* Brand Info (takes up 4 cols) */}
          <div className="md:col-span-5">
            {/* Two-line wordmark */}
            <Link href="/" className="flex flex-col leading-none group mb-8">
              <span
                className="font-playfair font-bold tracking-wide"
                style={{ fontSize: '1.75rem', color: '#F7F3EC', lineHeight: 1.1 }}
              >
                {displayBrand}
              </span>
              <span
                className="tracking-[0.25em] uppercase font-semibold"
                style={{ fontSize: '0.65rem', color: 'var(--sf-tan)', lineHeight: 1 }}
              >
                {isAr ? 'للديكور الداخلي' : 'INTERIORS'}
              </span>
            </Link>

            <p className="text-[0.95rem] leading-relaxed mb-8 max-w-sm" style={{ color: 'rgba(247,243,236,0.7)' }}>
              {tagline || (isAr ? 'تصاميم داخلية مستوحاة من العافية لتجلب الجمال والتوازن والمعنى لحياتك اليومية.' : 'Wellness-inspired interiors designed to bring beauty, balance, and meaning to your everyday.')}
            </p>
            
            {/* Social Media Links - Outlined circles style */}
            <div className={`flex gap-4 ${isAr ? 'justify-end md:justify-start flex-row-reverse' : ''}`}>
              {settings?.snapchat && (
                <a href={settings.snapchat} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-[var(--sf-tan)] hover:text-[var(--sf-green-dark)]" style={{ border: '1px solid rgba(212,184,150,0.5)', color: 'var(--sf-tan)' }}>
                  <SnapchatIcon className="h-4 w-4" />
                </a>
              )}
              {settings?.tiktok && (
                <a href={settings.tiktok} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-[var(--sf-tan)] hover:text-[var(--sf-green-dark)]" style={{ border: '1px solid rgba(212,184,150,0.5)', color: 'var(--sf-tan)' }}>
                  <TikTokIcon className="h-4 w-4" />
                </a>
              )}
              {settings?.instagram && (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-[var(--sf-tan)] hover:text-[var(--sf-green-dark)]" style={{ border: '1px solid rgba(212,184,150,0.5)', color: 'var(--sf-tan)' }}>
                  <InstagramIcon className="h-4 w-4" />
                </a>
              )}
              {settings?.twitter && (
                <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-[var(--sf-tan)] hover:text-[var(--sf-green-dark)]" style={{ border: '1px solid rgba(212,184,150,0.5)', color: 'var(--sf-tan)' }}>
                  <XIcon className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links / Areas (takes up 3 cols) */}
          <div className="md:col-span-3 pt-2">
            <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.2em] mb-6" style={{ color: 'var(--sf-tan)' }}>
              {isAr ? 'روابط سريعة' : 'QUICK LINKS'}
            </h3>
            <ul className="space-y-4 text-[0.85rem]" style={{ color: 'rgba(247,243,236,0.85)' }}>
              <li><Link href="#services" className="hover:text-white transition-colors">{isAr ? 'الخدمات' : 'Services'}</Link></li>
              <li><Link href="#gallery" className="hover:text-white transition-colors">{isAr ? 'المشاريع' : 'Projects'}</Link></li>
              <li><Link href="#faq" className="hover:text-white transition-colors">{isAr ? 'الأسئلة الشائعة' : 'FAQ'}</Link></li>
            </ul>
          </div>

          {/* Contact Info (takes up 4 cols) */}
          <div className="md:col-span-4 pt-2">
            <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.2em] mb-6" style={{ color: 'var(--sf-tan)' }}>
              {isAr ? 'لنتواصل' : "LET'S CONNECT"}
            </h3>
            <ul className="space-y-4 text-[0.85rem]" style={{ color: 'rgba(247,243,236,0.85)' }}>
              {settings?.email && (
                <li>
                  <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                    {settings.email}
                  </a>
                </li>
              )}
              {settings?.phone && (
                <li>
                  <a href={`tel:${settings?.phone}`} className="hover:text-white transition-colors">
                    {settings.phone}
                  </a>
                </li>
              )}
              {address && (
                <li>
                  <span style={{ color: 'rgba(247,243,236,0.7)' }}>{address}</span>
                </li>
              )}
              {/* Optional botanical icon from reference */}
              <li className="pt-4">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C12 22 17 18 17 12C17 6 12 2 12 2C12 2 7 6 7 12C7 18 12 22 12 22Z" stroke="var(--sf-tan)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 22V12" stroke="var(--sf-tan)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
              </li>
            </ul>
          </div>

        </div>

        {/* ══════════════════════════════════════════
            BOTTOM BAR
        ══════════════════════════════════════════ */}
        <div style={{ borderTop: '1px solid rgba(247, 243, 236, 0.1)' }}>
          <div className={`container mx-auto px-6 py-6 flex flex-col items-center justify-center text-[0.7rem]`} style={{ color: 'rgba(247,243,236,0.5)' }}>
            <p>
              &copy; {new Date().getFullYear()} {displayBrand}. {isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
            </p>
          </div>
        </div>

      </footer>
    </>
  )
}

'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { LanguageToggle } from './LanguageToggle'
import { MessageCircle, Menu, X } from 'lucide-react'

export function Navbar({ brandName, brandNameAr, lang, whatsapp }: {
  brandName?: string
  brandNameAr?: string | null
  lang: 'en' | 'ar'
  whatsapp?: string | null
}) {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const displayBrand = lang === 'ar'
    ? (brandNameAr || brandName || 'هدايت الله')
    : (brandName || 'HEDAYATULLAH')

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious()
    if (previous !== undefined && latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    setIsScrolled(latest > 50)
  })

  const navLinks = [
    { href: '#services', en: 'Services', ar: 'خدماتنا' },
    { href: '#gallery', en: 'Gallery', ar: 'أعمالنا' },
    { href: '#faq', en: 'FAQ', ar: 'الأسئلة' },
  ]

  const wpClean = (whatsapp || '').replace(/\D/g, '')
  const wpMsg = lang === 'ar' ? 'مرحباً، أود الاستفسار عن خدماتكم.' : 'Hello, I would like to inquire about your services.'

  return (
    <>
      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F7F3EC]/96 backdrop-blur-md border-b border-[#D4B896]/40 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 h-[4.5rem] flex items-center justify-between">
          {/* Brand — two-line wordmark like Terra Interiors */}
          <Link href="/" className="flex flex-col leading-none group">
            <span
              className="font-playfair font-bold tracking-wide transition-colors"
              style={{ fontSize: '1.25rem', color: isScrolled ? '#2C2C2C' : '#F7F3EC', lineHeight: 1.1 }}
            >
              {displayBrand}
            </span>
            <span
              className="tracking-[0.25em] uppercase font-semibold transition-colors"
              style={{ fontSize: '0.52rem', color: isScrolled ? 'var(--sf-brown)' : 'rgba(212,184,150,0.85)', lineHeight: 1 }}
            >
              {lang === 'ar' ? 'للديكور الداخلي' : 'INTERIOR DESIGN'}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[0.7rem] uppercase tracking-[0.18em] font-semibold transition-colors duration-200"
                style={{ color: isScrolled ? 'var(--sf-warm-gray)' : 'rgba(245,240,232,0.75)' }}
              >
                {lang === 'ar' ? link.ar : link.en}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <LanguageToggle currentLang={lang} />
            {wpClean && (
              <a
                href={`https://wa.me/${wpClean}?text=${encodeURIComponent(wpMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  background: 'var(--sf-green)',
                  color: '#F7F3EC',
                  padding: '0.55rem 1.25rem',
                  fontSize: '0.75rem',
                  letterSpacing: '0.04em',
                }}
              >
                <MessageCircle className="h-3.5 w-3.5" />
                {lang === 'ar' ? 'تواصل معنا' : 'Book Consultation'}
              </a>
            )}
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2"
              style={{ color: isScrolled ? '#2C2C2C' : '#F7F3EC' }}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed top-[4.5rem] inset-x-0 z-40 border-b border-[#D4B896]/40 shadow-lg md:hidden px-6 py-6 flex flex-col gap-4"
          style={{ background: '#F7F3EC' }}
        >
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm uppercase tracking-[0.18em] font-semibold py-2 border-b border-[#D4B896]/30"
              style={{ color: 'var(--sf-charcoal)' }}
            >
              {lang === 'ar' ? link.ar : link.en}
            </Link>
          ))}
          {wpClean && (
            <a
              href={`https://wa.me/${wpClean}?text=${encodeURIComponent(wpMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 mt-2 py-3 rounded-full text-sm font-semibold"
              style={{ background: 'var(--sf-green)', color: '#F7F3EC' }}
            >
              <MessageCircle className="h-4 w-4" />
              {lang === 'ar' ? 'تواصل معنا عبر واتساب' : 'Book a Consultation'}
            </a>
          )}
        </motion.div>
      )}
    </>
  )
}

import {Menu, X} from 'lucide-react';
import {useEffect, useState} from 'react';
import {SITE_CONFIG} from '../data/siteConfig';
import {AlphaTriangleMark} from './BrandMark';

interface NavbarProps {
  onRequestConsultation: () => void;
}

const NAV_LINKS = [
  {label: 'About', href: '#about'},
  {label: 'Services', href: '#services'},
  {label: 'Projects', href: '#projects'},
  {label: 'Process', href: '#process'},
  {label: 'Contact', href: '#contact'},
];

export function Navbar({onRequestConsultation}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({behavior: 'smooth'});
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#E5DFD2] shadow-xs'
          : 'bg-[#FAF8F4]/95 backdrop-blur-sm border-b border-[#E5DFD2]/80'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Title with geometric triangular A */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8] rounded-sm"
        >
          <AlphaTriangleMark className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" />
          <span className="font-display text-xs sm:text-sm md:text-base font-bold tracking-tight text-[#0B1B3B] whitespace-nowrap">
            {SITE_CONFIG.brand.name}
          </span>
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="relative py-1 text-sm font-medium text-[#0B1B3B]/80 hover:text-[#1D4ED8] transition-colors whitespace-nowrap shrink-0 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#1D4ED8] after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onRequestConsultation();
            }}
            className="hidden sm:inline-flex items-center justify-center rounded-md bg-[#0B1B3B] px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] whitespace-nowrap shrink-0 min-h-[40px] cursor-pointer"
          >
            Request Consultation
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex lg:hidden items-center justify-center rounded-md border border-[#E5DFD2] bg-white text-[#0B1B3B] hover:bg-[#F3EFE6] transition-colors min-h-[44px] min-w-[44px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden border-t border-[#E5DFD2] bg-white px-4 py-4 shadow-md"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="flex items-center rounded-md px-3 py-3 text-base font-medium text-[#0B1B3B] hover:bg-[#FAF8F4] hover:text-[#1D4ED8] transition-colors min-h-[44px]"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-[#E5DFD2] sm:hidden space-y-2">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onRequestConsultation();
                }}
                className="w-full rounded-md bg-[#0B1B3B] px-4 py-3 text-sm font-semibold text-white hover:bg-[#1D4ED8] transition-colors min-h-[44px] cursor-pointer"
              >
                Request Consultation
              </button>
            </div>

            <div className="pt-3 border-t border-[#E5DFD2] flex flex-wrap items-center justify-between gap-2 text-xs text-[#475569]">
              <a
                href={SITE_CONFIG.contact.phoneHref}
                className="font-semibold text-[#0B1B3B] hover:text-[#1D4ED8] tabular-nums py-1.5"
              >
                {SITE_CONFIG.contact.phoneDisplay}
              </a>
              <a
                href={SITE_CONFIG.contact.emailHref}
                className="font-semibold text-[#1D4ED8] hover:text-[#0B1B3B] py-1.5"
              >
                {SITE_CONFIG.contact.email}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

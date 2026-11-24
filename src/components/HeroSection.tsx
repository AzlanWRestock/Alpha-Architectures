import {ArrowRight, Building2} from 'lucide-react';
import {useState} from 'react';
import {SITE_CONFIG} from '../data/siteConfig';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onRequestConsultation: () => void;
}

export function HeroSection({
  onExploreProjects,
  onRequestConsultation,
}: HeroSectionProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section id="home" className="relative bg-[#0B1B3B]">
      {/* Full-Width Architectural Hero Canvas */}
      <div className="relative min-h-[540px] sm:min-h-[600px] lg:min-h-[660px] flex items-center overflow-hidden">
        {!imageError ? (
          <img
            src={SITE_CONFIG.hero.image}
            alt={SITE_CONFIG.hero.imageAlt}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#071228] via-[#0B1B3B] to-[#1E40AF] flex items-center justify-end p-12">
            <Building2 className="h-32 w-32 text-white/15" aria-hidden="true" />
          </div>
        )}

        {/* Measured Deep Navy Contrast Scrim for WCAG AA Legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#071228]/92 via-[#0B1B3B]/75 to-[#0B1B3B]/35"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#071228]/65 via-transparent to-[#071228]/25"
        />

        {/* Hero Copy & Primary Actions */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-medium tracking-wide text-[#BFDBFE] mb-4">
              {SITE_CONFIG.hero.kicker}
            </p>

            <h1 className="font-display text-[clamp(2.25rem,4.4vw,3.85rem)] font-bold leading-[1.08] tracking-tight text-white [text-wrap:balance]">
              {SITE_CONFIG.hero.headline}
            </h1>

            <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-[#E2E8F0]">
              {SITE_CONFIG.hero.supportingText}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onExploreProjects}
                className="inline-flex items-center gap-2 rounded-md bg-[#1D4ED8] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-[#2563EB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white whitespace-nowrap shrink-0 min-h-[44px] cursor-pointer"
              >
                <span>{SITE_CONFIG.hero.primaryCta}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onRequestConsultation}
                className="inline-flex items-center justify-center rounded-md border border-white/40 bg-white/10 backdrop-blur-xs px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-white hover:text-[#0B1B3B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white whitespace-nowrap shrink-0 min-h-[44px] cursor-pointer"
              >
                {SITE_CONFIG.hero.secondaryCta}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width Architectural Trust Strip Below Hero */}
      <div className="border-y border-[#E5DFD2] bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E5DFD2]">
            {SITE_CONFIG.hero.trustStrip.map((item) => (
              <div key={item.label} className="py-5 sm:px-6 first:sm:pl-0 last:sm:pr-0">
                <p className="text-xs font-medium text-[#475569]">{item.label}</p>
                <p className="mt-1 font-display text-sm sm:text-base font-semibold text-[#0B1B3B]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

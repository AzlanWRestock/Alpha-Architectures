import {Compass} from 'lucide-react';
import {useState} from 'react';
import {LeadershipMember, SITE_CONFIG} from '../data/siteConfig';
import {OfficialLogoFrame} from './BrandMark';

export function AboutSection() {
  const [studioImgError, setStudioImgError] = useState(false);
  const leadership: readonly LeadershipMember[] = SITE_CONFIG.about.leadership;

  return (
    <section id="about" className="bg-[#FAF8F4] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left Column: Narrative + Official Brand Identity Frame */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <p className="text-sm font-semibold text-[#1D4ED8] tracking-wide">
                {SITE_CONFIG.about.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1B3B] [text-wrap:balance]">
                {SITE_CONFIG.about.headline}
              </h2>

              <div className="mt-6 space-y-4 text-base leading-relaxed text-[#334155] max-w-[65ch]">
                {SITE_CONFIG.about.paragraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Official Uploaded Logo Presentation */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center rounded-xl border border-[#E5DFD2] bg-white p-5">
              <div className="sm:col-span-5">
                <OfficialLogoFrame className="p-3 bg-[#FAF8F4]" />
              </div>
              <div className="sm:col-span-7">
                <p className="text-xs font-medium text-[#64748B]">
                  Official Brand Identity
                </p>
                <p className="mt-1 font-display text-base font-bold text-[#0B1B3B]">
                  {SITE_CONFIG.brand.name}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                  Our geometric triangular A emblem represents structural balance,
                  upward vision, and enduring architectural form across every build.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Studio Image + Core Commitments */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-8">
            <div className="relative overflow-hidden rounded-xl border border-[#E5DFD2] bg-white aspect-[4/3]">
              {!studioImgError ? (
                <img
                  src={SITE_CONFIG.about.studioImage}
                  alt={SITE_CONFIG.about.studioImageAlt}
                  referrerPolicy="no-referrer"
                  onError={() => setStudioImgError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-[#F3EFE6] to-[#E5DFD2] flex flex-col items-center justify-center p-8 text-center">
                  <Compass className="h-10 w-10 text-[#1D4ED8] mb-3" aria-hidden="true" />
                  <p className="font-display text-base font-semibold text-[#0B1B3B]">
                    Architectural Studio &amp; Material Craft
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 border-t border-[#E5DFD2]">
              {SITE_CONFIG.about.commitments.map((item) => (
                <div key={item.title} className="pt-4">
                  <h3 className="font-display text-sm font-bold text-[#0B1B3B]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#475569]">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company Leadership Subsection */}
        <div
          id="leadership"
          className="mt-16 pt-12 border-t border-[#E5DFD2]"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#1D4ED8] tracking-wide">
              {SITE_CONFIG.about.leadershipEyebrow}
            </p>
            <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1B3B] [text-wrap:balance]">
              {SITE_CONFIG.about.leadershipHeadline}
            </h3>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {leadership.map((leader) => (
              <article
                key={leader.id}
                className="flex items-center gap-5 rounded-xl border border-[#E5DFD2] bg-white p-6 transition-colors duration-150 hover:border-[#1D4ED8]/50"
              >
                {leader.photoUrl ? (
                  <img
                    src={leader.photoUrl}
                    alt={`${leader.name}, ${leader.role}`}
                    loading="lazy"
                    decoding="async"
                    className="h-16 w-16 shrink-0 rounded-lg object-cover border border-[#E5DFD2]"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#0B1B3B] font-display text-lg font-bold tracking-wider text-white border border-[#1D4ED8]/30"
                  >
                    {leader.initials}
                  </div>
                )}

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#1D4ED8]">
                    {leader.role}
                  </p>
                  <h4 className="mt-1 font-display text-xl font-bold text-[#0B1B3B]">
                    {leader.name}
                  </h4>
                  <p className="mt-0.5 text-xs text-[#64748B]">
                    {SITE_CONFIG.brand.name}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

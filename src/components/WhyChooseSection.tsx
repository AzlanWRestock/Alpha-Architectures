import {SITE_CONFIG} from '../data/siteConfig';

export function WhyChooseSection() {
  return (
    <section id="why-choose-us" className="bg-[#0B1B3B] text-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Framing Column */}
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-[#93C5FD] tracking-wide">
              {SITE_CONFIG.whyChooseUs.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
              {SITE_CONFIG.whyChooseUs.headline}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#CBD5E1] max-w-[52ch]">
              {SITE_CONFIG.whyChooseUs.subtext}
            </p>
          </div>

          {/* Right 2x2 Architectural Differentiators Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SITE_CONFIG.whyChooseUs.pillars.map((pillar) => (
              <div
                key={pillar.number}
                className="rounded-xl border border-white/15 bg-[#10244D] p-7"
              >
                <span className="font-display text-xs font-semibold tabular-nums text-[#93C5FD]">
                  {pillar.number}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-white tracking-wide">
                  {pillar.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#CBD5E1]">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

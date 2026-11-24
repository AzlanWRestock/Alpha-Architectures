import {SITE_CONFIG} from '../data/siteConfig';

export function ProcessSection() {
  return (
    <section id="process" className="bg-white py-20 lg:py-28 border-b border-[#E5DFD2]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl pb-12 border-b border-[#E5DFD2]">
          <p className="text-sm font-semibold text-[#1D4ED8] tracking-wide">
            {SITE_CONFIG.process.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1B3B] [text-wrap:balance]">
            {SITE_CONFIG.process.headline}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#475569]">
            {SITE_CONFIG.process.subtext}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {SITE_CONFIG.process.steps.map((item) => (
            <div
              key={item.step}
              className="flex flex-col justify-between rounded-xl border border-[#E5DFD2] bg-[#FAF8F4] p-6"
            >
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-display text-lg font-bold tabular-nums text-[#1D4ED8]">
                    {item.step}
                  </span>
                  <span className="text-[#64748B]">{item.durationHint}</span>
                </div>

                <h3 className="mt-4 font-display text-lg font-bold text-[#0B1B3B]">
                  {item.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-[#334155]">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E5DFD2]">
                <p className="text-xs font-medium text-[#64748B]">Key Deliverable</p>
                <p className="mt-1 text-xs sm:text-sm font-semibold text-[#0B1B3B]">
                  {item.deliverable}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

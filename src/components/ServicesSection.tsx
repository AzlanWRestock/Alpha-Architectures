import {ArrowUpRight} from 'lucide-react';
import {SITE_CONFIG} from '../data/siteConfig';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export function ServicesSection({onSelectService}: ServicesSectionProps) {
  return (
    <section id="services" className="bg-white py-20 lg:py-28 border-y border-[#E5DFD2]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-[#E5DFD2]">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#1D4ED8] tracking-wide">
              Services &amp; Capabilities
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1B3B] [text-wrap:balance]">
              Comprehensive design, construction, and development expertise.
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base leading-relaxed text-[#475569]">
            Select any discipline below to pre-fill a project consultation enquiry
            tailored to your scope.
          </p>
        </div>

        {/* Editable Service Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SITE_CONFIG.services.map((service) => (
            <article
              key={service.id}
              className="group flex flex-col justify-between rounded-xl border border-[#E5DFD2] bg-[#FAF8F4] p-7 transition-colors duration-150 hover:border-[#1D4ED8]/50 hover:bg-white"
            >
              <div>
                {/* Clean unboxed editorial metadata */}
                <div className="flex items-center justify-between gap-4 text-xs text-[#64748B]">
                  <span className="font-display font-semibold tabular-nums text-[#1D4ED8]">
                    {service.number}
                  </span>
                  <span>{service.shortTag}</span>
                </div>

                <h3 className="mt-4 font-display text-xl font-bold text-[#0B1B3B]">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#334155]">
                  {service.summary}
                </p>

                <ul className="mt-5 space-y-2 border-t border-[#E5DFD2] pt-4">
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#475569]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 shrink-0 bg-[#1D4ED8]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 pt-4 border-t border-[#E5DFD2]/80">
                <button
                  type="button"
                  onClick={() => onSelectService(service.title)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B1B3B] transition-colors group-hover:text-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8] rounded-sm min-h-[40px] cursor-pointer whitespace-nowrap"
                >
                  <span>Request This Service</span>
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

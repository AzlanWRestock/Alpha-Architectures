import {Facebook, Instagram} from 'lucide-react';
import {SITE_CONFIG} from '../data/siteConfig';
import {AlphaTriangleMark} from './BrandMark';

export function Footer() {
  const establishedYear = 2018;
  const currentYear = new Date().getFullYear();
  const copyrightYear =
    currentYear <= establishedYear
      ? `${establishedYear}`
      : `${establishedYear}\u2013${currentYear}`;

  return (
    <footer className="bg-[#071228] text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <AlphaTriangleMark className="w-9 h-9 shrink-0" variant="light" />
              <div>
                <p className="font-display text-base font-bold tracking-tight text-white">
                  {SITE_CONFIG.brand.name}
                </p>
                <p className="text-xs text-[#93C5FD]">
                  {SITE_CONFIG.brand.establishedNote}
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#CBD5E1]">
              {SITE_CONFIG.hero.supportingText}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <p className="font-display text-sm font-semibold text-white">
              Navigation
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-[#CBD5E1]">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About the Company
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Projects Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#why-choose-us"
                  className="hover:text-white transition-colors"
                >
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">
                  Our Construction Process
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social Summary */}
          <div className="md:col-span-4">
            <p className="font-display text-sm font-semibold text-white">
              Direct Contact
            </p>
            <ul className="mt-4 space-y-3 text-sm text-[#CBD5E1]">
              <li>
                <a
                  href={SITE_CONFIG.contact.emailHref}
                  className="hover:text-white transition-colors break-all"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </li>
              {SITE_CONFIG.contact.phones.map((item) => (
                <li key={item.id} className="space-y-1">
                  <p className="text-xs text-[#94A3B8]">{item.label}</p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 tabular-nums">
                    <a
                      href={item.phoneHref}
                      className="text-white hover:text-[#93C5FD] transition-colors font-medium"
                    >
                      {item.display}
                    </a>
                    <span aria-hidden="true" className="text-white/30">
                      ·
                    </span>
                    <a
                      href={item.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-[#93C5FD] hover:text-white transition-colors"
                    >
                      WhatsApp
                    </a>
                  </div>
                </li>
              ))}
              <li className="text-xs text-[#94A3B8] pt-1">
                {SITE_CONFIG.contact.consultationMode}
              </li>
              <li className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={SITE_CONFIG.contact.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Alpha Architecture and Developers on Facebook (opens in a new tab)"
                  className="inline-flex items-center gap-1.5 py-1.5 text-xs font-medium text-[#93C5FD] hover:text-white transition-colors"
                >
                  <Facebook className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Facebook</span>
                </a>
                <span aria-hidden="true" className="text-white/30">
                  ·
                </span>
                {SITE_CONFIG.contact.instagramUrl ? (
                  <a
                    href={SITE_CONFIG.contact.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Alpha Architecture and Developers on Instagram (opens in a new tab)"
                    className="inline-flex items-center gap-1.5 py-1.5 text-xs font-medium text-[#93C5FD] hover:text-white transition-colors"
                  >
                    <Instagram className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Instagram</span>
                  </a>
                ) : (
                  <span className="text-xs text-[#94A3B8]">
                    {SITE_CONFIG.contact.instagramLabel}
                  </span>
                )}
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <p>
            &copy; {copyrightYear} {SITE_CONFIG.brand.name}. All rights reserved.
          </p>
          <p>Building with Purpose. Creating for the Future.</p>
        </div>
      </div>
    </footer>
  );
}

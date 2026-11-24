import {useState} from 'react';
import {SITE_CONFIG} from '../data/siteConfig';

interface AlphaTriangleMarkProps {
  className?: string;
  variant?: 'default' | 'light';
}

/**
 * Crisp geometric faceted triangular "A" symbol preserving the exact 3D
 * triangular blue geometry of the uploaded Alpha Architecture & Developers logo.
 */
export function AlphaTriangleMark({
  className = 'w-9 h-9',
  variant = 'default',
}: AlphaTriangleMarkProps) {
  const strokeAccent = variant === 'light' ? '#93C5FD' : '#3B82F6';

  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="alpha-left-outer"
          x1="20"
          y1="108"
          x2="62"
          y2="12"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#0B1B3B" />
          <stop offset="55%" stopColor="#1E40AF" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient
          id="alpha-right-facet"
          x1="62"
          y1="12"
          x2="104"
          y2="108"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#09152E" />
          <stop offset="50%" stopColor="#17347A" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient
          id="alpha-crossbar"
          x1="20"
          y1="90"
          x2="102"
          y2="98"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#0D224D" />
          <stop offset="55%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#0B1B3B" />
        </linearGradient>
      </defs>

      {/* Left ascending ribbon */}
      <polygon
        points="62,10 14,106 31,95 62,33"
        fill="url(#alpha-left-outer)"
      />
      <polygon
        points="62,10 62,33 74,38 69,24"
        fill="#1E3A8A"
      />

      {/* Right descending architectural leg */}
      <polygon
        points="69,24 74,38 89,96 106,106"
        fill="url(#alpha-right-facet)"
      />
      <polygon
        points="74,38 65,42 74,84 89,96"
        fill="#0A1836"
      />

      {/* Interlocking lower triangular crossbar */}
      <polygon
        points="31,95 45,82 74,84 56,92"
        fill="#1E40AF"
      />
      <polygon
        points="14,106 31,95 56,92 106,106 89,96 74,84 56,92"
        fill="url(#alpha-crossbar)"
      />

      {/* Subtle architectural highlight edges */}
      <polyline
        points="14,106 62,10 106,106"
        stroke={strokeAccent}
        strokeWidth="1.25"
        strokeOpacity="0.45"
        fill="none"
      />
    </svg>
  );
}

interface OfficialLogoFrameProps {
  className?: string;
}

/**
 * Displays the user's uploaded company logo asset cleanly framed on warm ivory.
 */
export function OfficialLogoFrame({className = ''}: OfficialLogoFrameProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center rounded-xl bg-[#FAF8F4] border border-[#E5DFD2] p-8 text-center ${className}`}
      >
        <AlphaTriangleMark className="w-20 h-20 mb-4" />
        <p className="font-display text-lg font-bold tracking-wide text-[#0B1B3B]">
          {SITE_CONFIG.brand.name}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-xl bg-[#FAF8F4] border border-[#E5DFD2] p-6 flex items-center justify-center ${className}`}
    >
      <img
        src={SITE_CONFIG.brand.officialLogoPath}
        alt={SITE_CONFIG.brand.officialLogoAlt}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="max-h-60 w-auto object-contain mix-blend-multiply select-none"
      />
    </div>
  );
}

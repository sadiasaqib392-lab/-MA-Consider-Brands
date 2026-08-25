import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'compact' | 'badge-only' | 'stacked';
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'full',
  className = '',
  onClick
}) => {
  // Dimensions based on size
  const badgeSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };

  const titleSizes = {
    sm: 'text-sm sm:text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl'
  };

  const subSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
    xl: 'text-sm'
  };

  const badgeTagSizes = {
    sm: 'text-[9px] px-1 py-0.2',
    md: 'text-[10px] px-1.5 py-0.5',
    lg: 'text-xs px-2 py-0.5',
    xl: 'text-sm px-2.5 py-1'
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${
        onClick ? 'cursor-pointer group' : ''
      } ${variant === 'stacked' ? 'flex-col text-center' : ''} ${className}`}
      id="aesthetic-brand-logo"
    >
      {/* Aesthetic Geometric Industrial Hex Shield Emblem */}
      <div
        className={`relative ${badgeSizes[size]} shrink-0 flex items-center justify-center rounded-xl overflow-hidden transition-transform duration-300 ${
          onClick ? 'group-hover:scale-105 group-hover:rotate-1' : ''
        }`}
        style={{
          boxShadow: '0 4px 20px -2px rgba(245, 158, 11, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4)'
        }}
      >
        {/* Custom SVG Industrial Geometric Shield Badge */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Rich Amber Gold Gradient */}
            <linearGradient id="maAmberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="35%" stopColor="#fbbf24" />
              <stop offset="70%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            {/* Dark Metallic Inner Border */}
            <linearGradient id="maDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#27272a" />
              <stop offset="100%" stopColor="#09090b" />
            </linearGradient>

            {/* Bevel Highlight */}
            <linearGradient id="maBevel" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Background Solid Shield Hexagon */}
          <polygon
            points="50,4 92,26 92,74 50,96 8,74 8,26"
            fill="url(#maAmberGradient)"
            stroke="#fef08a"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Inner Inset Hexagon */}
          <polygon
            points="50,11 85,30 85,70 50,89 15,70 15,30"
            fill="url(#maDarkGrad)"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Subtle Industrial Grid Lines / Precision Crosshairs */}
          <line x1="50" y1="12" x2="50" y2="88" stroke="#3f3f46" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          <line x1="16" y1="50" x2="84" y2="50" stroke="#3f3f46" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

          {/* Golden Corner Accents */}
          <polygon points="50,11 54,19 46,19" fill="#fbbf24" />
          <polygon points="50,89 54,81 46,81" fill="#f59e0b" />

          {/* Bold Modern "MA" Monogram Vector Glyphs */}
          <g id="ma-letters">
            {/* Letter 'M' Left Wing & Center V */}
            <path
              d="M 28 68 L 28 32 L 35 32 L 43 51 L 51 32 L 58 32 L 58 68 L 51 68 L 51 45 L 45 59 L 41 59 L 35 45 L 35 68 Z"
              fill="url(#maAmberGradient)"
              filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.8))"
            />
            {/* Letter 'A' Stylized Right Peak & Crossbar */}
            <path
              d="M 59 68 L 68 32 L 74 32 L 83 68 L 76.5 68 L 74.5 59 L 67.5 59 L 65.5 68 Z M 69 53 L 73 53 L 71 42 Z"
              fill="#ffffff"
              filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.8))"
            />
          </g>

          {/* Top Bevel Sheen */}
          <polygon
            points="50,4 92,26 80,32 50,15 20,32 8,26"
            fill="url(#maBevel)"
            opacity="0.7"
          />

          {/* Mini Gold Diamond Core Bottom */}
          <polygon points="50,68 53,73 50,78 47,73" fill="#fbbf24" />
        </svg>
      </div>

      {/* Typography Label */}
      {variant !== 'badge-only' && (
        <div className={`flex flex-col ${variant === 'stacked' ? 'items-center' : 'text-left'}`}>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`font-black tracking-tight text-zinc-100 uppercase font-display leading-tight transition-colors ${
                titleSizes[size]
              } ${onClick ? 'group-hover:text-amber-400' : ''}`}
            >
              MA CONSIDER
            </span>
            <span
              className={`bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 font-black rounded tracking-wider shadow-sm uppercase font-display ${
                badgeTagSizes[size]
              }`}
            >
              BRANDS
            </span>
          </div>

          {variant !== 'compact' && (
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className={`font-bold tracking-widest text-amber-400/90 uppercase font-mono ${
                  subSizes[size]
                }`}
              >
                PRO TOOLS • USA
              </span>
              <span className="w-1 h-1 rounded-full bg-zinc-600 hidden sm:inline-block" />
              <span
                className={`text-zinc-400 font-medium tracking-wide hidden sm:inline-block ${
                  subSizes[size]
                }`}
              >
                Contractor Grade
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

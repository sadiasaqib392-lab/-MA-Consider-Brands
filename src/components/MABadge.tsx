import React from 'react';

interface MABadgeProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'amber' | 'dark' | 'glass';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'inline' | 'none';
  className?: string;
  showText?: boolean;
}

export const MABadge: React.FC<MABadgeProps> = ({
  size = 'sm',
  variant = 'amber',
  position = 'top-left',
  className = '',
  showText = true
}) => {
  const positionClasses = {
    'top-left': 'absolute top-2.5 left-2.5 z-10',
    'top-right': 'absolute top-2.5 right-2.5 z-10',
    'bottom-left': 'absolute bottom-2.5 left-2.5 z-10',
    'bottom-right': 'absolute bottom-2.5 right-2.5 z-10',
    'inline': 'inline-flex',
    'none': ''
  }[position];

  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-[9px] gap-1',
    sm: 'px-2 py-0.5 text-[10px] gap-1.5',
    md: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3.5 py-1.5 text-sm gap-2'
  }[size];

  const iconSizes = {
    xs: 'w-2.5 h-2.5 text-[8px]',
    sm: 'w-3.5 h-3.5 text-[9px]',
    md: 'w-4 h-4 text-[10px]',
    lg: 'w-5 h-5 text-xs'
  }[size];

  const variantClasses = {
    amber: 'bg-amber-400 text-zinc-950 shadow-md shadow-amber-400/20 border border-amber-300/60 font-black',
    dark: 'bg-zinc-950/90 text-amber-400 backdrop-blur-md shadow-md border border-amber-400/40 font-bold',
    glass: 'bg-black/75 text-zinc-100 backdrop-blur-md border border-zinc-700/60 font-bold'
  }[variant];

  return (
    <div
      className={`select-none pointer-events-none rounded flex items-center font-display uppercase tracking-wider ${positionClasses} ${sizeClasses} ${variantClasses} ${className}`}
    >
      <span className={`inline-flex items-center justify-center font-black rounded-sm bg-zinc-950 text-amber-400 ${iconSizes}`}>
        MA
      </span>
      {showText && (
        <span className="font-extrabold tracking-tight">
          CONSIDER
        </span>
      )}
    </div>
  );
};

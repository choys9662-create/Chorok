interface MonumentCharacterProps {
  size?: 'small' | 'medium' | 'large';
  isReading?: boolean;
  level?: number;
  variant?: 'ida' | 'redhood';
}

export function MonumentCharacter({ size = 'medium', isReading = false, level = 1, variant = 'redhood' }: MonumentCharacterProps) {
  const sizeMap = {
    small: { width: 40, height: 60, scale: 0.6 },
    medium: { width: 60, height: 90, scale: 1 },
    large: { width: 80, height: 120, scale: 1.4 },
  };

  const dims = sizeMap[size];
  
  return (
    <svg 
      width={dims.width} 
      height={dims.height} 
      viewBox={`0 0 60 90`} 
      className="drop-shadow-md overflow-visible"
    >
      <g transform="translate(30, 75)">
        {/* Shadow underneath */}
        <ellipse cx="0" cy="5" rx="12" ry="4" fill="rgba(0,0,0,0.2)" />

        {variant === 'ida' ? (
          <>
            {/* Ida Style (White Cone) */}
            <path d="M -8 -35 L -12 0 L 12 0 L 8 -35 Z" fill="#FFFFFF" />
            <path d="M 8 -35 L 12 0 L 0 0 Z" fill="#E0E0E0" opacity="0.5" />
            <circle cx="0" cy="-42" r="8" fill="#FFFFFF" />
            <path d="M -9 -42 L 0 -65 L 9 -42 Z" fill="#FFFFFF" />
            <path d="M 0 -65 L 9 -42 L 0 -42 Z" fill="#E0E0E0" opacity="0.5" />
            <path d="M -4 0 L -4 8" stroke="#333" strokeWidth="2" strokeLinecap="round" />
            <path d="M 4 0 L 4 8" stroke="#333" strokeWidth="2" strokeLinecap="round" />
          </>
        ) : (
          <>
            {/* Red Hood Style */}
            {/* Legs */}
            <path d="M -3 0 L -3 6" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 3 0 L 3 6" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />
            
            {/* Dress/Body (Dark Purple/Blue) */}
            <path d="M -6 -25 L -9 0 L 9 0 L 6 -25 Z" fill="#37474F" />
            
            {/* Red Cape - Main Body */}
            <path d="M 0 -45 L -10 -15 L 10 -15 Z" fill="#D32F2F" />
            <path d="M -10 -15 Q 0 -10 10 -15 L 10 -5 L -10 -5 Z" fill="#C62828" /> {/* Hem */}
            
            {/* Hood (Head) */}
            <circle cx="0" cy="-42" r="10" fill="#D32F2F" />
            
            {/* Hood Point */}
            <path d="M -8 -45 Q 0 -60 8 -45" fill="#D32F2F" />
            
            {/* Face (Tiny visible part) */}
            <ellipse cx="0" cy="-40" rx="5" ry="4" fill="#FFCCBC" />
            <path d="M -5 -42 Q 0 -48 5 -42 Z" fill="#D32F2F" /> {/* Hood covering forehead */}
          </>
        )}

        {/* Reading State - Holding a book */}
        {isReading && (
          <g transform="translate(8, -25)">
             <rect x="0" y="0" width="10" height="12" rx="1" fill="#FFD54F" transform="rotate(-15)" />
             <rect x="2" y="2" width="8" height="10" rx="0.5" fill="white" transform="rotate(-15)" />
          </g>
        )}
      </g>
    </svg>
  );
}
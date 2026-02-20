interface IsometricPlatformProps {
  width?: number;
  height?: number;
  depth?: number;
  className?: string;
  elevation?: number;
}

export function IsometricPlatform({ 
  width = 100, 
  height = 20, 
  depth = 100,
  elevation = 0,
  className = '' 
}: IsometricPlatformProps) {
  // Isometric angle: 30 degrees
  const iso = {
    x: Math.cos(Math.PI / 6),
    y: Math.sin(Math.PI / 6),
  };

  // Calculate isometric coordinates
  const topLeft = { x: 0, y: elevation };
  const topRight = { x: width * iso.x, y: elevation - width * iso.y };
  const bottomRight = { x: width * iso.x + depth * iso.x, y: elevation - width * iso.y + depth * iso.y };
  const bottomLeft = { x: depth * iso.x, y: elevation + depth * iso.y };

  const topLeftBottom = { x: topLeft.x, y: topLeft.y + height };
  const topRightBottom = { x: topRight.x, y: topRight.y + height };
  const bottomRightBottom = { x: bottomRight.x, y: bottomRight.y + height };
  const bottomLeftBottom = { x: bottomLeft.x, y: bottomLeft.y + height };

  const viewBoxWidth = bottomRight.x + 20;
  const viewBoxHeight = bottomLeft.y + height + 20;

  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox={`-10 ${elevation - 10} ${viewBoxWidth} ${viewBoxHeight}`}
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Top surface */}
      <path
        d={`
          M ${topLeft.x} ${topLeft.y}
          L ${topRight.x} ${topRight.y}
          L ${bottomRight.x} ${bottomRight.y}
          L ${bottomLeft.x} ${bottomLeft.y}
          Z
        `}
        fill="#d1fae5"
        stroke="#10b981"
        strokeWidth="2"
        opacity="0.3"
      />

      {/* Right surface */}
      <path
        d={`
          M ${topRight.x} ${topRight.y}
          L ${topRightBottom.x} ${topRightBottom.y}
          L ${bottomRightBottom.x} ${bottomRightBottom.y}
          L ${bottomRight.x} ${bottomRight.y}
          Z
        `}
        fill="#a7f3d0"
        stroke="#10b981"
        strokeWidth="1.5"
        opacity="0.2"
      />

      {/* Left surface */}
      <path
        d={`
          M ${topLeft.x} ${topLeft.y}
          L ${topLeftBottom.x} ${topLeftBottom.y}
          L ${bottomLeftBottom.x} ${bottomLeftBottom.y}
          L ${bottomLeft.x} ${bottomLeft.y}
          Z
        `}
        fill="#6ee7b7"
        stroke="#10b981"
        strokeWidth="1.5"
        opacity="0.2"
      />

      {/* Grid pattern on top */}
      <defs>
        <pattern id="platform-grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#10b981" strokeWidth="0.5" opacity="0.3"/>
        </pattern>
      </defs>
      <path
        d={`
          M ${topLeft.x} ${topLeft.y}
          L ${topRight.x} ${topRight.y}
          L ${bottomRight.x} ${bottomRight.y}
          L ${bottomLeft.x} ${bottomLeft.y}
          Z
        `}
        fill="url(#platform-grid)"
      />
    </svg>
  );
}

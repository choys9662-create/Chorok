import { Eye, Users, Zap, Star } from 'lucide-react';
import { ExceptionalType } from './ExceptionalChoseoToast';

interface ExceptionalBadgeProps {
  type: ExceptionalType;
  count?: number;
  size?: 'small' | 'medium';
}

export function ExceptionalBadge({ type, count, size = 'small' }: ExceptionalBadgeProps) {
  const getConfig = () => {
    switch (type) {
      case 'hidden-sentence':
        return {
          icon: Eye,
          label: '숨겨진 문장',
          bg: 'rgba(168, 85, 247, 0.12)',
          text: '#a855f7',
          border: 'rgba(168, 85, 247, 0.3)'
        };
      case 'chorus-highlight':
        return {
          icon: Users,
          label: count ? `${count}명 공감` : '인기 문장',
          bg: 'rgba(251, 146, 60, 0.12)',
          text: '#fb923c',
          border: 'rgba(251, 146, 60, 0.3)'
        };
      case 'aligned-reflection':
        return {
          icon: Zap,
          label: '생각 일치',
          bg: 'rgba(0, 255, 0, 0.1)',
          text: '#00FF00',
          border: 'rgba(0, 255, 0, 0.3)'
        };
      case 'unique-perspective':
        return {
          icon: Star,
          label: '독특한 시선',
          bg: 'rgba(99, 102, 241, 0.12)',
          text: '#818cf8',
          border: 'rgba(99, 102, 241, 0.3)'
        };
    }
  };

  const config = getConfig();
  const IconComponent = config.icon;
  const isSmall = size === 'small';

  return (
    <div 
      className={`inline-flex items-center gap-1.5 rounded-full ${
        isSmall ? 'px-2 py-0.5' : 'px-3 py-1'
      }`}
      style={{
        background: config.bg,
        color: config.text,
        border: `1px solid ${config.border}`
      }}
    >
      <IconComponent className={isSmall ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      <span className={`${isSmall ? 'text-caption' : 'text-caption'} font-bold`}>
        {config.label}
      </span>
    </div>
  );
}

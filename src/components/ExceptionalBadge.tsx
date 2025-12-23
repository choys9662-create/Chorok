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
          label: 'Rare pick',
          bg: 'rgba(0, 255, 0, 0.1)',
          text: '#00FF00',
          border: 'rgba(0, 255, 0, 0.3)'
        };
      case 'chorus-highlight':
        return {
          icon: Users,
          label: count ? `${count} readers` : 'Popular line',
          bg: 'rgba(0, 255, 0, 0.1)',
          text: '#00FF00',
          border: 'rgba(0, 255, 0, 0.3)'
        };
      case 'aligned-reflection':
        return {
          icon: Zap,
          label: 'Similar minds',
          bg: 'rgba(0, 255, 0, 0.1)',
          text: '#00FF00',
          border: 'rgba(0, 255, 0, 0.3)'
        };
      case 'unique-perspective':
        return {
          icon: Star,
          label: 'Unique perspective',
          bg: 'rgba(0, 255, 0, 0.1)',
          text: '#00FF00',
          border: 'rgba(0, 255, 0, 0.3)'
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

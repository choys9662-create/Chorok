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
          bg: 'bg-purple-50',
          text: 'text-purple-700',
          border: 'border-purple-200',
          iconColor: 'text-purple-600'
        };
      case 'chorus-highlight':
        return {
          icon: Users,
          label: count ? `${count} readers` : 'Popular line',
          bg: 'bg-orange-50',
          text: 'text-orange-700',
          border: 'border-orange-200',
          iconColor: 'text-orange-600'
        };
      case 'aligned-reflection':
        return {
          icon: Zap,
          label: 'Similar minds',
          bg: 'bg-teal-50',
          text: 'text-teal-700',
          border: 'border-teal-200',
          iconColor: 'text-teal-600'
        };
      case 'unique-perspective':
        return {
          icon: Star,
          label: 'Unique perspective',
          bg: 'bg-indigo-50',
          text: 'text-indigo-700',
          border: 'border-indigo-200',
          iconColor: 'text-indigo-600'
        };
    }
  };

  const config = getConfig();
  const IconComponent = config.icon;
  const isSmall = size === 'small';

  return (
    <div 
      className={`inline-flex items-center gap-1.5 ${config.bg} ${config.text} border ${config.border} rounded-full ${
        isSmall ? 'px-2 py-0.5' : 'px-3 py-1'
      }`}
    >
      <IconComponent className={`${isSmall ? 'w-3 h-3' : 'w-3.5 h-3.5'} ${config.iconColor}`} />
      <span className={`${isSmall ? 'text-[10px]' : 'text-xs'} font-bold`}>
        {config.label}
      </span>
    </div>
  );
}

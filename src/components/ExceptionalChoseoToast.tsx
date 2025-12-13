import { useEffect, useState } from 'react';
import { Sparkles, Users, Zap, Eye, Star } from 'lucide-react';

export type ExceptionalType = 'hidden-sentence' | 'chorus-highlight' | 'aligned-reflection' | 'unique-perspective';

interface ExceptionalChoseoToastProps {
  type: ExceptionalType;
  count?: number;
  onClose?: () => void;
  autoHideDuration?: number;
}

export function ExceptionalChoseoToast({ 
  type, 
  count, 
  onClose,
  autoHideDuration = 4000 
}: ExceptionalChoseoToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimatingOut(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 300);
    }, autoHideDuration);

    return () => clearTimeout(timer);
  }, [autoHideDuration, onClose]);

  if (!isVisible) return null;

  const getConfig = () => {
    switch (type) {
      case 'hidden-sentence':
        return {
          icon: Eye,
          iconBg: 'bg-purple-100',
          iconColor: 'text-purple-600',
          gradient: 'from-purple-50 via-blue-50 to-indigo-50',
          border: 'border-purple-200/50',
          glow: 'shadow-purple-200/50',
          title: 'Hidden sentence',
          message: "No one else has highlighted this line yet. You're the first to notice it.",
          accent: '✨'
        };
      case 'chorus-highlight':
        return {
          icon: Users,
          iconBg: 'bg-orange-100',
          iconColor: 'text-orange-600',
          gradient: 'from-orange-50 via-amber-50 to-yellow-50',
          border: 'border-orange-200/50',
          glow: 'shadow-orange-200/50',
          title: 'You joined a chorus',
          message: count ? `${count} readers paused here too. This line resonates with the crowd.` : 'Many readers paused here too.',
          accent: '🎭'
        };
      case 'aligned-reflection':
        return {
          icon: Zap,
          iconBg: 'bg-teal-100',
          iconColor: 'text-teal-600',
          gradient: 'from-teal-50 via-emerald-50 to-green-50',
          border: 'border-teal-200/50',
          glow: 'shadow-teal-200/50',
          title: 'Your thoughts are in sync',
          message: "You're seeing this passage in a similar way to others.",
          accent: '🌊'
        };
      case 'unique-perspective':
        return {
          icon: Star,
          iconBg: 'bg-indigo-100',
          iconColor: 'text-indigo-600',
          gradient: 'from-indigo-50 via-violet-50 to-purple-50',
          border: 'border-indigo-200/50',
          glow: 'shadow-indigo-200/50',
          title: 'Unique perspective',
          message: "You're seeing something others missed.",
          accent: '💫'
        };
    }
  };

  const config = getConfig();
  const IconComponent = config.icon;

  return (
    <div
      className={`fixed bottom-24 left-4 right-4 max-w-md mx-auto z-[70] transition-all duration-300 ${
        isAnimatingOut 
          ? 'translate-y-4 opacity-0' 
          : 'translate-y-0 opacity-100'
      }`}
    >
      <div 
        className={`bg-gradient-to-r ${config.gradient} backdrop-blur-xl border ${config.border} rounded-2xl p-4 shadow-lg ${config.glow}`}
      >
        <div className="flex items-start gap-3">
          <div className={`${config.iconBg} rounded-xl p-2.5 flex-shrink-0`}>
            <IconComponent className={`w-5 h-5 ${config.iconColor}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              {config.title}
              <span className="text-sm">{config.accent}</span>
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              {config.message}
            </p>
          </div>
          <button
            onClick={() => {
              setIsAnimatingOut(true);
              setTimeout(() => {
                setIsVisible(false);
                onClose?.();
              }, 300);
            }}
            className="text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0 -mt-1"
          >
            <span className="text-lg leading-none">×</span>
          </button>
        </div>
      </div>
    </div>
  );
}
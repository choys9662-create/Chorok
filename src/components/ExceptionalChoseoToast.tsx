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
          iconBg: 'rgba(168, 85, 247, 0.15)',
          iconColor: '#a855f7',
          bg: 'rgba(168, 85, 247, 0.08)',
          border: 'rgba(168, 85, 247, 0.25)',
          glow: '0 0 20px rgba(168, 85, 247, 0.15)',
          title: '숨겨진 문장',
          message: '아직 아무도 이 문장을 발견하지 못했어요. 당신이 처음이에요.',
          accent: '✨'
        };
      case 'chorus-highlight':
        return {
          icon: Users,
          iconBg: 'rgba(251, 146, 60, 0.15)',
          iconColor: '#fb923c',
          bg: 'rgba(251, 146, 60, 0.08)',
          border: 'rgba(251, 146, 60, 0.25)',
          glow: '0 0 20px rgba(251, 146, 60, 0.15)',
          title: '합창에 참여했어요',
          message: count ? `${count}명의 독자가 같은 곳에서 멈췄어요.` : '많은 독자가 여기서 멈췄어요.',
          accent: '🎭'
        };
      case 'aligned-reflection':
        return {
          icon: Zap,
          iconBg: 'rgba(0, 255, 0, 0.15)',
          iconColor: '#00FF00',
          bg: 'rgba(0, 255, 0, 0.08)',
          border: 'rgba(0, 255, 0, 0.25)',
          glow: '0 0 20px rgba(0, 255, 0, 0.15)',
          title: '생각이 일치해요',
          message: '다른 독자들과 비슷한 시선으로 이 구절을 보고 있어요.',
          accent: '🌊'
        };
      case 'unique-perspective':
        return {
          icon: Star,
          iconBg: 'rgba(99, 102, 241, 0.15)',
          iconColor: '#818cf8',
          bg: 'rgba(99, 102, 241, 0.08)',
          border: 'rgba(99, 102, 241, 0.25)',
          glow: '0 0 20px rgba(99, 102, 241, 0.15)',
          title: '독특한 시선',
          message: '다른 사람들이 놓친 것을 발견했어요.',
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
        className="backdrop-blur-xl rounded-2xl p-4"
        style={{
          background: config.bg,
          border: `1px solid ${config.border}`,
          boxShadow: config.glow
        }}
      >
        <div className="flex items-start gap-3">
          <div
            className="rounded-xl p-2.5 flex-shrink-0"
            style={{ background: config.iconBg }}
          >
            <IconComponent className="w-5 h-5" style={{ color: config.iconColor }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-caption font-bold text-white mb-1 flex items-center gap-1.5">
              {config.title}
              <span className="text-sm">{config.accent}</span>
            </p>
            <p className="text-caption leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
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
            className="transition-colors flex-shrink-0 -mt-1"
            style={{ color: 'var(--text-tertiary)' }}
          >
            <span className="text-lg leading-none">×</span>
          </button>
        </div>
      </div>
    </div>
  );
}
import { useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';

interface ComingSoonToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export function ComingSoonToast({ message, onClose, duration = 3000 }: ComingSoonToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-slide-up px-4 w-full max-w-md">
      <div 
        className="rounded-2xl px-6 py-4 shadow-neon flex items-center gap-3 relative"
        style={{ 
          background: 'linear-gradient(to right, rgba(0, 255, 0, 0.15), rgba(0, 255, 255, 0.15))',
          border: '1px solid rgba(0, 255, 0, 0.3)',
          backdropFilter: 'blur(20px)'
        }}
      >
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(0, 255, 0, 0.2)' }}
        >
          <Sparkles className="w-5 h-5" style={{ color: '#00FF00' }} />
        </div>
        
        <div className="flex-1">
          <p className="text-body-s font-bold text-white mb-0.5">준비 중인 기능이에요</p>
          <p className="text-caption" style={{ color: 'var(--text-secondary)' }}>{message}</p>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
        >
          <X className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
        </button>
      </div>
    </div>
  );
}

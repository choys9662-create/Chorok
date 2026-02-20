import { Flame } from 'lucide-react';

export function StreakCard() {
  return (
    <div className="card-minimal rounded-3xl p-6 text-white relative overflow-hidden shadow-neon">
      <div className="bg-gradient-neon-radial absolute inset-0 opacity-30"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-1">
          <Flame className="w-5 h-5" style={{ color: '#FF00FF' }} />
          <span className="text-body-s font-medium" style={{ color: 'var(--text-secondary)' }}>연속 독서</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-display tracking-tight" style={{ color: '#FF00FF' }}>7</span>
          <span className="text-h2 font-medium text-white">일째</span>
        </div>
        <p className="text-body-s mt-2 font-medium inline-block px-3 py-1 rounded-full backdrop-blur-sm" style={{ color: '#FF00FF', background: 'rgba(255, 0, 255, 0.15)', border: '1px solid rgba(255, 0, 255, 0.3)' }}>
          상위 5%의 열정이에요! 🔥
        </p>
      </div>
      <div className="absolute -right-6 -bottom-6 text-9xl rotate-12" style={{ opacity: 0.1 }}>🔥</div>
    </div>
  );
}

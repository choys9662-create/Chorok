import { Plus, TrendingUp, Flame } from 'lucide-react';
import { Screen } from '../../App';

interface QuickActionsProps {
  onNavigate: (screen: Screen) => void;
}

export function QuickActions({ onNavigate }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <button
        onClick={() => onNavigate('search')}
        className="card-minimal aspect-square rounded-2xl flex flex-col items-center justify-center gap-3 hover:shadow-neon hover:-translate-y-1 transition-all duration-300 group"
      >
        <div className="w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-[rgba(0,255,0,0.15)] transition-colors" style={{ background: 'rgba(0, 255, 0, 0.1)' }}>
          <Plus className="w-6 h-6" style={{ color: '#00FF00' }} strokeWidth={2.5} />
        </div>
        <span className="text-caption font-bold" style={{ color: 'var(--text-secondary)' }}>새로 등록</span>
      </button>
      <button
        onClick={() => onNavigate('ranking')}
        className="card-minimal aspect-square rounded-2xl flex flex-col items-center justify-center gap-3 hover:shadow-neon hover:-translate-y-1 transition-all duration-300 group"
      >
        <div className="w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-[rgba(0,255,0,0.15)] transition-colors" style={{ background: 'rgba(0, 255, 0, 0.1)' }}>
          <TrendingUp className="w-6 h-6" style={{ color: '#00FF00' }} strokeWidth={2.5} />
        </div>
        <span className="text-caption font-bold" style={{ color: 'var(--text-secondary)' }}>트렌드</span>
      </button>
      <button
        onClick={() => onNavigate('forest')}
        className="card-minimal aspect-square rounded-2xl flex flex-col items-center justify-center gap-3 hover:shadow-neon hover:-translate-y-1 transition-all duration-300 group"
      >
        <div className="w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-[rgba(0,255,0,0.15)] transition-colors" style={{ background: 'rgba(0, 255, 0, 0.1)' }}>
          <Flame className="w-6 h-6" style={{ color: '#00FF00' }} strokeWidth={2.5} />
        </div>
        <span className="text-caption font-bold" style={{ color: 'var(--text-secondary)' }}>챌린지</span>
      </button>
    </div>
  );
}

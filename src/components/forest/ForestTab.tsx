import { TreePine, Target, Zap, Sparkles } from 'lucide-react';
import { NeonOrbs } from '../ui/neon-orbs';
import { Screen } from '../../App';
import { clanStats } from './data';

interface ForestTabProps {
  onNavigate: (screen: Screen) => void;
}

export function ForestTab({ onNavigate }: ForestTabProps) {
  const progressPercent = (clanStats.weeklyGoal.current / clanStats.weeklyGoal.target) * 100;

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Neon Orbs Background */}
      <div className="absolute inset-0">
        <NeonOrbs />
      </div>

      {/* Atmospheric overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-transparent to-emerald-950/30 pointer-events-none" />

      {/* Floating UI chips */}
      <div className="absolute top-20 right-6 z-40 animate-float">
        <button className="backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg border hover:scale-105 transition-transform active:scale-95 flex items-center gap-2" style={{ background: 'var(--surface-elevated)', borderColor: 'var(--border-subtle)', boxShadow: '0 0 20px rgba(0, 255, 0, 0.2)' }}>
          <div className="grid grid-cols-2 gap-0.5">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00FF00' }}></div>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(0, 255, 0, 0.5)' }}></div>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(0, 255, 0, 0.5)' }}></div>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00FF00', animationDelay: '0.3s' }}></div>
          </div>
          <span className="text-xs font-bold text-white">그룹 영역 보기</span>
        </button>
      </div>

      <div className="absolute top-48 left-6 z-40 animate-float" style={{ animationDelay: '1s' }}>
        <button className="backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border hover:scale-105 transition-transform active:scale-95 flex items-center gap-2" style={{ background: 'var(--surface-elevated)', borderColor: 'var(--border-subtle)', boxShadow: '0 0 15px rgba(255, 0, 255, 0.2)' }}>
          <Target className="w-4 h-4" style={{ color: '#FF00FF' }} />
          <div className="text-left">
            <div className="text-[10px] font-medium" style={{ color: 'var(--text-secondary)' }}>이번 주 목표</div>
            <div className="text-xs font-bold" style={{ color: '#FF00FF' }}>{progressPercent.toFixed(0)}%</div>
          </div>
        </button>
      </div>

      <div className="absolute bottom-40 right-8 z-40 animate-float" style={{ animationDelay: '0.5s' }}>
        <button
          className="px-5 py-2.5 rounded-full shadow-lg border hover:scale-105 transition-transform active:scale-95 font-bold text-sm flex items-center gap-2 text-white"
          onClick={() => onNavigate('timer')}
          style={{ background: 'linear-gradient(to right, #00FF00, #00FFFF)', borderColor: 'rgba(0, 255, 0, 0.3)', boxShadow: '0 0 20px rgba(0, 255, 0, 0.4)' }}
        >
          <Zap className="w-4 h-4" />
          바로 초록
        </button>
      </div>

      {/* Firefly indicators (reading members) */}
      <div className="absolute top-32 left-1/4 z-30">
        <div className="relative">
          <div className="w-3 h-3 rounded-full animate-ping opacity-75" style={{ background: '#FFFF00' }}></div>
          <div className="absolute top-0 left-0 w-3 h-3 rounded-full blur-sm" style={{ background: '#FFFF00' }}></div>
        </div>
      </div>
      <div className="absolute top-60 right-1/3 z-30 animate-float" style={{ animationDelay: '1.5s' }}>
        <div className="relative">
          <div className="w-2.5 h-2.5 rounded-full animate-ping opacity-75" style={{ background: '#FFFF00', animationDelay: '0.5s' }}></div>
          <div className="absolute top-0 left-0 w-2.5 h-2.5 rounded-full blur-sm" style={{ background: '#FFFF00' }}></div>
        </div>
      </div>
      <div className="absolute bottom-52 left-1/2 z-30 animate-float" style={{ animationDelay: '2s' }}>
        <div className="relative">
          <div className="w-2 h-2 rounded-full animate-ping opacity-75" style={{ background: '#FFFF00' }}></div>
          <div className="absolute top-0 left-0 w-2 h-2 rounded-full blur-sm" style={{ background: '#FFFF00' }}></div>
        </div>
      </div>

      {/* Clan stats overlay card */}
      <div className="absolute top-20 left-4 right-4 z-40">
        <div className="backdrop-blur-md rounded-2xl p-4 shadow-lg border card-minimal" style={{ borderColor: 'var(--border-subtle)', boxShadow: '0 0 20px rgba(0, 255, 0, 0.15)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md" style={{ background: 'linear-gradient(to bottom right, #00FF00, #00FFFF)' }}>
              <TreePine className="w-5 h-5 text-black" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white text-sm">책벌레 클랜</h3>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Lv.{clanStats.level} • {clanStats.activeMembers}명 독서중</p>
            </div>
            <button className="p-1.5 rounded-full transition-colors hover:bg-white/5">
              <Sparkles className="w-4 h-4" style={{ color: '#FFFF00' }} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="text-center p-2 rounded-xl border" style={{ background: 'rgba(0, 255, 0, 0.1)', borderColor: 'rgba(0, 255, 0, 0.3)' }}>
              <div className="text-xs mb-0.5" style={{ color: 'var(--text-secondary)' }}>레벨</div>
              <div className="text-lg font-bold" style={{ color: '#00FF00' }}>{clanStats.level}</div>
              <div className="text-[9px]" style={{ color: '#00FF00' }}>시간</div>
            </div>
            <div className="text-center p-2 rounded-xl border" style={{ background: 'rgba(0, 255, 255, 0.1)', borderColor: 'rgba(0, 255, 255, 0.3)' }}>
              <div className="text-xs mb-0.5" style={{ color: 'var(--text-secondary)' }}>영역</div>
              <div className="text-lg font-bold" style={{ color: '#00FFFF' }}>{clanStats.area}</div>
              <div className="text-[9px]" style={{ color: '#00FFFF' }}>완독</div>
            </div>
            <div className="text-center p-2 rounded-xl border" style={{ background: 'rgba(255, 0, 255, 0.1)', borderColor: 'rgba(255, 0, 255, 0.3)' }}>
              <div className="text-xs mb-0.5" style={{ color: 'var(--text-secondary)' }}>밀도</div>
              <div className="text-lg font-bold" style={{ color: '#FF00FF' }}>{clanStats.density}</div>
              <div className="text-[9px]" style={{ color: '#FF00FF' }}>초서</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

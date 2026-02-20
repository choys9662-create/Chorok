import { Target } from 'lucide-react';

interface GoalCardProps {
  timeRange: '7' | '30' | 'all';
}

export function GoalCard({ timeRange }: GoalCardProps) {
  if (timeRange === 'all') return null;

  return (
    <div className="card-minimal rounded-3xl p-6 shadow-neon relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at bottom right, rgba(255, 255, 0, 0.1), transparent)' }}></div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-5">
          <Target className="w-5 h-5" style={{ color: '#FFFF00' }} />
          <h2 className="text-h2 text-white">
            {timeRange === '7' ? '이번 주 목표' : '이번 달 목표'}
          </h2>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl p-4" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}>
            <div className="flex items-center justify-between text-body-s mb-2">
              <span className="text-white font-medium">
                {timeRange === '7' ? '3권 읽기' : '10권 읽기'}
              </span>
              <span className="font-bold" style={{ color: '#FFFF00' }}>40%</span>
            </div>
            <div className="w-full rounded-full h-2.5" style={{ background: 'var(--surface-elevated)' }}>
              <div
                className="h-2.5 rounded-full"
                style={{
                  width: '40%',
                  background: 'linear-gradient(to right, #FFFF00, #FFD700)',
                  boxShadow: '0 0 8px rgba(255, 255, 0, 0.4)'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Target, BookOpen, Quote, Users, CheckCircle2, Circle, Sparkles, Gift } from 'lucide-react';

interface Mission {
  id: string;
  title: string;
  description: string;
  progress: number;
  goal: number;
  completed: boolean;
  reward: string;
  icon: any;
}

interface DailyMissionsProps {
  onClose: () => void;
}

export function DailyMissions({ onClose }: DailyMissionsProps) {
  // Mock missions
  const missions: Mission[] = [
    {
      id: '1',
      title: '책 펼치기',
      description: '오늘 10페이지 이상 읽기',
      progress: 7,
      goal: 10,
      completed: false,
      reward: '나이테 +5',
      icon: BookOpen,
    },
    {
      id: '2',
      title: '마음에 담기',
      description: '초서 1개 남기기',
      progress: 1,
      goal: 1,
      completed: true,
      reward: '나이테 +10',
      icon: Quote,
    },
    {
      id: '3',
      title: '뿌리 얽힘',
      description: '독서러의 초서에 좋아요 3개 남기기',
      progress: 1,
      goal: 3,
      completed: false,
      reward: '나이테 +3',
      icon: Users,
    },
  ];

  const completedCount = missions.filter(m => m.completed).length;
  const totalMissions = missions.length;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center max-w-md mx-auto">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden animate-slide-up" style={{ background: 'var(--surface-1)' }}>
        {/* Header */}
        <div className="text-white p-6 pb-8 relative overflow-hidden" style={{ background: 'var(--surface-2)' }}>
          <div className="bg-gradient-neon-radial absolute inset-0"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 backdrop-blur-sm rounded-xl flex items-center justify-center" style={{ background: 'rgba(0, 255, 0, 0.15)', border: '1px solid rgba(0, 255, 0, 0.3)' }}>
                  <Target className="w-7 h-7" style={{ color: '#00FF00' }} />
                </div>
                <div>
                  <h2 className="text-h2 text-white">오늘의 미션</h2>
                  <p className="text-body-s" style={{ color: 'var(--text-secondary)' }}>매일 작은 목표를 달성해보세요</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-2xl leading-none hover:opacity-70 transition-opacity"
                style={{ color: 'var(--text-secondary)' }}
              >
                ×
              </button>
            </div>

            {/* Progress */}
            <div className="backdrop-blur-sm rounded-xl p-4" style={{ background: 'rgba(0, 255, 0, 0.08)', border: '1px solid rgba(0, 255, 0, 0.15)' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-body-s" style={{ color: 'var(--text-secondary)' }}>오늘의 진행률</span>
                <span className="font-bold text-h3 text-white">{completedCount}/{totalMissions}</span>
              </div>
              <div className="w-full rounded-full h-2 overflow-hidden" style={{ background: 'var(--surface-elevated)' }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${(completedCount / totalMissions) * 100}%`,
                    background: 'linear-gradient(to right, #00FF00, #00cc00)',
                    boxShadow: '0 0 8px rgba(0, 255, 0, 0.4)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Missions List */}
        <div className="p-6 space-y-4 overflow-y-auto max-h-[50vh]">
          {missions.map((mission) => {
            const Icon = mission.icon;
            const progressPercent = Math.min((mission.progress / mission.goal) * 100, 100);

            return (
              <div
                key={mission.id}
                className="rounded-2xl p-4 transition-all"
                style={{
                  background: mission.completed ? 'rgba(0, 255, 0, 0.08)' : 'var(--surface-2)',
                  border: mission.completed ? '2px solid rgba(0, 255, 0, 0.3)' : '2px solid var(--border-subtle)'
                }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: mission.completed ? '#00FF00' : 'var(--surface-elevated)',
                      color: mission.completed ? '#000000' : 'var(--text-secondary)'
                    }}
                  >
                    {mission.completed ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-h3 text-white mb-1">{mission.title}</h3>
                    <p className="text-caption" style={{ color: 'var(--text-secondary)' }}>{mission.description}</p>
                  </div>
                  <div className="flex items-center gap-1 text-caption font-bold px-2 py-1 rounded-full badge-neon">
                    <Gift className="w-3 h-3" />
                    {mission.reward}
                  </div>
                </div>

                {/* Progress Bar */}
                {!mission.completed && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-caption">
                      <span style={{ color: 'var(--text-secondary)' }}>진행도</span>
                      <span className="font-bold text-white">
                        {mission.progress}/{mission.goal}
                      </span>
                    </div>
                    <div className="w-full rounded-full h-2 overflow-hidden" style={{ background: 'var(--surface-elevated)' }}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${progressPercent}%`,
                          background: 'linear-gradient(to right, #00FF00, #00cc00)',
                          boxShadow: '0 0 8px rgba(0, 255, 0, 0.4)'
                        }}
                      />
                    </div>
                  </div>
                )}

                {mission.completed && (
                  <div className="flex items-center gap-2 text-body-s font-bold" style={{ color: '#00FF00' }}>
                    <Sparkles className="w-4 h-4" />
                    <span>완료!</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer - All Complete Bonus */}
        {completedCount === totalMissions && (
          <div className="p-6 pt-0">
            <div className="text-black rounded-2xl p-4 text-center shadow-neon-lg" style={{ background: '#00FF00' }}>
              <Sparkles className="w-8 h-8 mx-auto mb-2" />
              <h3 className="text-h3 mb-1">모든 미션 완료! 🎉</h3>
              <p className="text-body-s mb-2">보너스 나이테 +20 획득!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
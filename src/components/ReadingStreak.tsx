import { Flame, Trophy, Target, CheckCircle2, Circle } from 'lucide-react';

interface ReadingStreakProps {
  currentStreak: number;
  longestStreak: number;
  onNavigateToMissions?: () => void;
}

export function ReadingStreak({ currentStreak, longestStreak, onNavigateToMissions }: ReadingStreakProps) {
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (6 - i));
    return date;
  });

  // Mock data - replace with real data
  const readingDays = ['2025-12-15', '2025-12-16', '2025-12-17', '2025-12-19', '2025-12-20', '2025-12-21'];
  
  const hasReadOn = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return readingDays.includes(dateStr);
  };

  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="card-minimal p-5 shadow-neon relative overflow-hidden">
      <div className="bg-gradient-neon-radial absolute inset-0"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 backdrop-blur-sm rounded-xl flex items-center justify-center" style={{ background: 'rgba(0, 255, 0, 0.15)', border: '1px solid rgba(0, 255, 0, 0.3)' }}>
              <Flame className="w-6 h-6" style={{ color: '#00FF00' }} />
            </div>
            <div>
              <h3 className="text-h3 text-white">연속 독서</h3>
              <p className="text-caption" style={{ color: 'var(--text-secondary)' }}>Reading Streak</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-display" style={{ color: '#00FF00' }}>{currentStreak}</div>
            <div className="text-caption" style={{ color: 'var(--text-secondary)' }}>일 연속</div>
          </div>
        </div>

        {/* 7-Day Calendar */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {last7Days.map((date, i) => {
            const hasRead = hasReadOn(date);
            const isToday = date.toDateString() === today.toDateString();
            return (
              <div key={i} className="text-center">
                <div className="text-caption mb-1" style={{ color: 'var(--text-tertiary)' }}>{dayNames[date.getDay()]}</div>
                <div
                  className={`w-full aspect-square rounded-lg flex items-center justify-center text-caption transition-all`}
                  style={{
                    background: hasRead 
                      ? 'rgba(0, 255, 0, 0.2)' 
                      : isToday 
                      ? 'rgba(0, 255, 0, 0.05)' 
                      : 'var(--surface-2)',
                    border: hasRead 
                      ? '2px solid rgba(0, 255, 0, 0.4)' 
                      : isToday 
                      ? '2px dashed rgba(0, 255, 0, 0.3)' 
                      : '1px solid var(--border-subtle)',
                    color: hasRead ? '#00FF00' : 'var(--text-tertiary)'
                  }}
                >
                  {hasRead ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isToday ? (
                    <Circle className="w-3 h-3" />
                  ) : (
                    <span>{date.getDate()}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between backdrop-blur-sm rounded-lg p-3" style={{ background: 'rgba(0, 255, 0, 0.08)', border: '1px solid rgba(0, 255, 0, 0.15)' }}>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4" style={{ color: '#00FF00' }} />
            <div>
              <div className="text-caption" style={{ color: 'var(--text-secondary)' }}>최고 기록</div>
              <div className="text-body-s font-bold text-white">{longestStreak}일</div>
            </div>
          </div>
          {onNavigateToMissions && (
            <button
              onClick={onNavigateToMissions}
              className="text-caption font-bold px-3 py-1.5 rounded-lg transition-colors"
              style={{ 
                background: 'rgba(0, 255, 0, 0.15)',
                color: '#00FF00',
                border: '1px solid rgba(0, 255, 0, 0.3)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 255, 0, 0.25)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0, 255, 0, 0.15)'}
            >
              오늘의 미션
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

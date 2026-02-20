import { Calendar, TrendingUp, BookOpen, Clock, Sparkles, BarChart3, Heart } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ExceptionalBadge } from '../ExceptionalBadge';
import { monthlyWeeklyData, monthlyCompletedBooks, monthlyTimeData, COLORS } from './data';

interface MonthlyViewProps {
  calendarDays: Array<{
    date: number;
    fullDate: string;
    hasReading: boolean;
    minutes: number;
    bookCover: string | null;
  }>;
}

export function MonthlyView({ calendarDays }: MonthlyViewProps) {
  return (
    <>
      {/* Calendar */}
      <div className="card-minimal rounded-3xl p-6 shadow-neon animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" style={{ color: '#00FF00' }} />
            <h2 className="text-h2 text-white">독서 캘린더</h2>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {['일', '월', '화', '수', '목', '금', '토'].map(day => (
            <div key={day} className="text-caption text-center font-medium mb-2" style={{ color: 'var(--text-tertiary)' }}>
              {day}
            </div>
          ))}
          {calendarDays.map((day, idx) => (
            <div
              key={idx}
              className="aspect-square rounded-xl flex items-center justify-center text-caption relative overflow-hidden group transition-all"
              style={{
                background: day.hasReading ? 'rgba(0, 255, 0, 0.15)' : 'var(--surface-2)',
                border: day.hasReading ? '1px solid rgba(0, 255, 0, 0.3)' : '1px solid var(--border-subtle)'
              }}
            >
              {day.bookCover ? (
                <>
                  <img
                    src={day.bookCover}
                    alt="book cover"
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    {day.date}
                  </div>
                </>
              ) : (
                <span className="font-medium" style={{ color: day.hasReading ? '#00FF00' : 'var(--text-tertiary)' }}>
                  {day.date}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Comparison */}
      <div className="card-minimal rounded-3xl p-6 shadow-neon">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5" style={{ color: '#00FFFF' }} />
          <h2 className="text-h2 text-white">주차별 비교</h2>
        </div>

        <div className="h-48 w-full" style={{ minHeight: '192px' }}>
          <ResponsiveContainer width="100%" height={192}>
            <BarChart data={monthlyWeeklyData}>
              <XAxis
                dataKey="week"
                tick={{ fontSize: 12, fill: 'var(--text-secondary)' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--surface-2)',
                  color: 'white'
                }}
                cursor={{ fill: 'var(--surface-elevated)' }}
              />
              <Bar dataKey="minutes" fill="#00FFFF" radius={[4, 4, 0, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(0, 255, 255, 0.1)' }}>
            <div className="text-caption mb-1" style={{ color: 'var(--text-secondary)' }}>평균</div>
            <div className="text-h3 font-bold" style={{ color: '#00FFFF' }}>364분</div>
          </div>
          <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(0, 255, 0, 0.1)' }}>
            <div className="text-caption mb-1" style={{ color: 'var(--text-secondary)' }}>최고</div>
            <div className="text-h3 font-bold" style={{ color: '#00FF00' }}>3주차</div>
          </div>
          <div className="text-center p-3 rounded-xl" style={{ background: 'var(--surface-2)' }}>
            <div className="text-caption mb-1" style={{ color: 'var(--text-secondary)' }}>총 세션</div>
            <div className="text-h3 font-bold text-white">28회</div>
          </div>
        </div>
      </div>

      {/* Monthly Completed Books */}
      <div className="card-minimal rounded-3xl p-6 shadow-neon">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5" style={{ color: '#00FF00' }} />
          <h2 className="text-h2 text-white">이번 달 완독한 책</h2>
        </div>
        <div className="space-y-3">
          {monthlyCompletedBooks.map((book, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-4 rounded-2xl"
              style={{ background: 'rgba(0, 255, 0, 0.1)', border: '1px solid rgba(0, 255, 0, 0.2)' }}
            >
              <div className="w-12 h-16 rounded-lg flex items-center justify-center text-2xl" style={{ background: 'rgba(255, 0, 255, 0.2)' }}>
                📚
              </div>
              <div className="flex-1">
                <div className="text-body font-bold text-white mb-1">{book.title}</div>
                <div className="text-caption" style={{ color: 'var(--text-secondary)' }}>{book.author}</div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-caption" style={{ color: '#00FFFF' }}>{book.pages}페이지</span>
                  <span className="text-caption" style={{ color: '#FFFF00' }}>완독 {book.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 rounded-xl text-center" style={{ background: 'rgba(255, 0, 255, 0.1)' }}>
          <div className="text-body-s" style={{ color: '#FF00FF' }}>
            🎉 이번 달 2권 완독! 목표까지 8권 남았어요
          </div>
        </div>
      </div>

      {/* Monthly Time Distribution */}
      <div className="card-minimal rounded-3xl p-6 shadow-neon">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5" style={{ color: '#FF00FF' }} />
          <h2 className="text-h2 text-white">이번 달 독서 시간대</h2>
        </div>

        <div className="h-40 w-full" style={{ minHeight: '160px' }}>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={monthlyTimeData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={4}
                dataKey="value"
              >
                {monthlyTimeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  color: 'white'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          {monthlyTimeData.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-body-s">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              <span style={{ color: 'var(--text-secondary)' }}>{entry.name}</span>
              <span className="ml-auto font-bold" style={{ color: COLORS[index % COLORS.length] }}>{entry.percent}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Best Choseo */}
      <div className="card-minimal rounded-3xl p-6 shadow-neon relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at top right, rgba(255, 0, 255, 0.1), transparent)' }}></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5" style={{ color: '#FF00FF' }} />
            <h2 className="text-h2 text-white">이번 달 인기 초서</h2>
          </div>
          <div className="space-y-3">
            <div className="rounded-2xl p-4" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}>
              <div className="text-body-s italic font-serif mb-2 text-white">
                "감정이란 결국 나를 지키기 위한 도구일 뿐이다."
              </div>
              <div className="flex items-center justify-between">
                <div className="text-caption" style={{ color: 'var(--text-secondary)' }}>아몬드 · 11/24</div>
                <div className="flex items-center gap-2">
                  <ExceptionalBadge type="aligned-reflection" size="sm" />
                  <div className="flex items-center gap-1" style={{ color: '#FF00FF' }}>
                    <Heart className="w-3 h-3" />
                    <span className="text-caption font-bold">18</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-4" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}>
              <div className="text-body-s italic font-serif mb-2 text-white">
                "우리는 자신의 안에서 싹트려는 것, 그것만을 경험해야 한다."
              </div>
              <div className="flex items-center justify-between">
                <div className="text-caption" style={{ color: 'var(--text-secondary)' }}>데미안 · 11/23</div>
                <div className="flex items-center gap-2">
                  <ExceptionalBadge type="unique-perspective" size="sm" />
                  <div className="flex items-center gap-1" style={{ color: '#FF00FF' }}>
                    <Heart className="w-3 h-3" />
                    <span className="text-caption font-bold">15</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Stats Summary */}
      <div className="card-minimal rounded-3xl p-6 shadow-neon">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5" style={{ color: '#FFFF00' }} />
          <h2 className="text-h2 text-white">이번 달 통계</h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl" style={{ background: 'rgba(0, 255, 0, 0.1)', border: '1px solid rgba(0, 255, 0, 0.2)' }}>
            <div className="text-caption mb-1" style={{ color: 'var(--text-secondary)' }}>총 독서 일수</div>
            <div className="text-display" style={{ color: '#00FF00' }}>22일</div>
          </div>
          <div className="p-4 rounded-2xl" style={{ background: 'rgba(0, 255, 255, 0.1)', border: '1px solid rgba(0, 255, 255, 0.2)' }}>
            <div className="text-caption mb-1" style={{ color: 'var(--text-secondary)' }}>평균 집중도</div>
            <div className="text-display" style={{ color: '#00FFFF' }}>87%</div>
          </div>
          <div className="p-4 rounded-2xl" style={{ background: 'rgba(255, 0, 255, 0.1)', border: '1px solid rgba(255, 0, 255, 0.2)' }}>
            <div className="text-caption mb-1" style={{ color: 'var(--text-secondary)' }}>작성한 초서</div>
            <div className="text-display" style={{ color: '#FF00FF' }}>34개</div>
          </div>
          <div className="p-4 rounded-2xl" style={{ background: 'rgba(255, 255, 0, 0.1)', border: '1px solid rgba(255, 255, 0, 0.2)' }}>
            <div className="text-caption mb-1" style={{ color: 'var(--text-secondary)' }}>읽은 장르</div>
            <div className="text-display" style={{ color: '#FFFF00' }}>3개</div>
          </div>
        </div>
      </div>
    </>
  );
}

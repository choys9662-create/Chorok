import { PieChart as PieChartIcon, Sparkles, BookOpen, TrendingUp, BarChart3, Users, Heart, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { mockChosus, mockBooks } from '../../data/mockData';
import { mockExceptionalChoseos, COLORS, timeOfDayData, dayOfWeekData, monthlyTrendData } from './data';

interface AllTimeViewProps {
  genreData: Array<{ name: string; value: number }>;
}

export function AllTimeView({ genreData }: AllTimeViewProps) {
  return (
    <>
      {/* Genre Distribution Pie Chart */}
      <div className="card-minimal rounded-3xl p-6 shadow-neon animate-slide-up">
        <div className="flex items-center gap-2 mb-6">
          <PieChartIcon className="w-5 h-5" style={{ color: '#00FF00' }} />
          <h2 className="text-h2 text-white">독서 취향</h2>
        </div>

        <div className="h-56 w-full flex items-center justify-center" style={{ minHeight: '224px' }}>
          <ResponsiveContainer width="100%" height={224}>
            <PieChart>
              <Pie
                data={genreData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {genreData.map((entry, index) => (
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
          {genreData.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-body-s">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              <span style={{ color: 'var(--text-secondary)' }}>{entry.name}</span>
              <span className="ml-auto" style={{ color: 'var(--text-tertiary)' }}>{entry.value}권</span>
            </div>
          ))}
        </div>
      </div>

      {/* Choseo Statistics */}
      <div className="card-minimal rounded-3xl p-6 shadow-neon relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at top right, rgba(255, 0, 255, 0.1), transparent)' }}></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5" style={{ color: '#FF00FF' }} />
            <h2 className="text-h2 text-white">초서 통계</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="rounded-2xl p-4" style={{ background: 'rgba(255, 0, 255, 0.1)', border: '1px solid rgba(255, 0, 255, 0.2)' }}>
              <div className="text-display mb-1" style={{ color: '#FF00FF' }}>{mockChosus.length + mockExceptionalChoseos.length}</div>
              <div className="text-caption" style={{ color: 'var(--text-secondary)' }}>총 초서 개수</div>
            </div>
            <div className="rounded-2xl p-4" style={{ background: 'rgba(0, 255, 255, 0.1)', border: '1px solid rgba(0, 255, 255, 0.2)' }}>
              <div className="text-display mb-1" style={{ color: '#00FFFF' }}>{mockExceptionalChoseos.length}</div>
              <div className="text-caption" style={{ color: 'var(--text-secondary)' }}>Exceptional 초서</div>
            </div>
          </div>

          <div className="rounded-2xl p-4 mb-4" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}>
            <div className="text-body-s font-medium text-white mb-3">가장 많이 초서한 책</div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-16 rounded-lg flex items-center justify-center text-2xl" style={{ background: 'rgba(255, 0, 255, 0.15)' }}>
                📖
              </div>
              <div className="flex-1">
                <div className="text-body-s font-bold text-white">데미안</div>
                <div className="text-caption" style={{ color: 'var(--text-secondary)' }}>12개의 초서</div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-caption font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Exceptional 타입별</div>
            {[
              { type: '합창 하이라이트', count: 1, emoji: '👥' },
              { type: '정렬된 성찰', count: 1, emoji: '🎯' },
              { type: '독특한 관점', count: 1, emoji: '💡' },
              { type: '숨은 문장', count: 1, emoji: '🔍' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-body-s rounded-xl p-3" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}>
                <div className="flex items-center gap-2">
                  <span>{item.emoji}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.type}</span>
                </div>
                <span className="font-bold" style={{ color: '#FF00FF' }}>{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Book Completion Stats */}
      <div className="card-minimal rounded-3xl p-6 shadow-neon">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="w-5 h-5" style={{ color: '#00FF00' }} />
          <h2 className="text-h2 text-white">완독률 & 진행</h2>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="text-center p-4 rounded-2xl" style={{ background: 'rgba(0, 255, 0, 0.1)', border: '1px solid rgba(0, 255, 0, 0.2)' }}>
            <div className="text-display" style={{ color: '#00FF00' }}>1</div>
            <div className="text-caption mt-1" style={{ color: 'var(--text-secondary)' }}>완독</div>
          </div>
          <div className="text-center p-4 rounded-2xl" style={{ background: 'rgba(0, 255, 255, 0.1)', border: '1px solid rgba(0, 255, 255, 0.2)' }}>
            <div className="text-display" style={{ color: '#00FFFF' }}>2</div>
            <div className="text-caption mt-1" style={{ color: 'var(--text-secondary)' }}>읽는 중</div>
          </div>
          <div className="text-center p-4 rounded-2xl" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}>
            <div className="text-display" style={{ color: 'var(--text-secondary)' }}>1</div>
            <div className="text-caption mt-1" style={{ color: 'var(--text-tertiary)' }}>읽고 싶은</div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-body-s">
            <span style={{ color: 'var(--text-secondary)' }}>평균 완독 소요 일수</span>
            <span className="font-bold text-white">10일</span>
          </div>
          <div className="flex items-center justify-between text-body-s">
            <span style={{ color: 'var(--text-secondary)' }}>현재 책 평균 진행률</span>
            <span className="font-bold" style={{ color: '#00FF00' }}>54%</span>
          </div>
        </div>
      </div>

      {/* Reading Growth Trend */}
      <div className="card-minimal rounded-3xl p-6 shadow-neon">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5" style={{ color: '#00FF00' }} />
          <h2 className="text-h2 text-white">독서 성장 추이</h2>
        </div>

        <div className="h-48 w-full" style={{ minHeight: '192px' }}>
          <ResponsiveContainer width="100%" height={192}>
            <LineChart data={monthlyTrendData}>
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: 'var(--text-secondary)' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
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
              />
              <Line
                type="monotone"
                dataKey="minutes"
                stroke="#00FF00"
                strokeWidth={3}
                dot={{ fill: '#00FF00', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(0, 255, 0, 0.1)' }}>
            <div className="text-caption mb-1" style={{ color: 'var(--text-secondary)' }}>이번 달</div>
            <div className="text-h2 font-bold" style={{ color: '#00FF00' }}>1,450분</div>
          </div>
          <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(255, 0, 255, 0.1)' }}>
            <div className="text-caption mb-1" style={{ color: 'var(--text-secondary)' }}>최장 스트릭</div>
            <div className="text-h2 font-bold" style={{ color: '#FF00FF' }}>14일</div>
          </div>
        </div>
      </div>

      {/* Reading Pattern Analysis */}
      <div className="card-minimal rounded-3xl p-6 shadow-neon">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5" style={{ color: '#00FF00' }} />
          <h2 className="text-h2 text-white">독서 패턴</h2>
        </div>

        {/* Time of Day */}
        <div className="mb-6">
          <div className="text-body-s font-medium text-white mb-4">선호 독서 시간대</div>
          <div className="h-40 w-full" style={{ minHeight: '160px' }}>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={timeOfDayData}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: 'var(--text-secondary)' }}
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
                <Bar dataKey="value" fill="#00FFFF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-caption text-center mt-2" style={{ color: 'var(--text-tertiary)' }}>
            저녁 시간에 가장 활발히 읽으시네요! 🌙
          </p>
        </div>

        {/* Day of Week */}
        <div>
          <div className="text-body-s font-medium text-white mb-4">요일별 독서 패턴</div>
          <div className="h-40 w-full" style={{ minHeight: '160px' }}>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={dayOfWeekData}>
                <XAxis
                  dataKey="name"
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
                <Bar dataKey="value" fill="#00FF00" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-caption text-center mt-2" style={{ color: 'var(--text-tertiary)' }}>
            주말에 가장 많이 읽으시네요! 📚
          </p>
        </div>
      </div>

      {/* Social & Community Stats */}
      <div className="card-minimal rounded-3xl p-6 shadow-neon relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at top left, rgba(0, 255, 255, 0.1), transparent)' }}></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-5 h-5" style={{ color: '#00FFFF' }} />
            <h2 className="text-h2 text-white">소셜 & 커뮤니티</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="rounded-2xl p-4 text-center" style={{ background: 'rgba(255, 0, 255, 0.1)', border: '1px solid rgba(255, 0, 255, 0.2)' }}>
              <div className="flex justify-center mb-2">
                <Heart className="w-6 h-6" style={{ color: '#FF00FF' }} />
              </div>
              <div className="text-display" style={{ color: '#FF00FF' }}>73</div>
              <div className="text-caption mt-1" style={{ color: 'var(--text-secondary)' }}>받은 좋아요</div>
            </div>
            <div className="rounded-2xl p-4 text-center" style={{ background: 'rgba(255, 255, 0, 0.1)', border: '1px solid rgba(255, 255, 0, 0.2)' }}>
              <div className="flex justify-center mb-2">
                <Award className="w-6 h-6" style={{ color: '#FFFF00' }} />
              </div>
              <div className="text-display" style={{ color: '#FFFF00' }}>3</div>
              <div className="text-caption mt-1" style={{ color: 'var(--text-secondary)' }}>공통 도서</div>
            </div>
          </div>

          <div className="rounded-2xl p-4" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}>
            <div className="text-body-s font-medium text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" style={{ color: '#00FFFF' }} />
              <span>가장 인기있는 초서</span>
            </div>
            <div className="text-caption mb-2 italic font-serif" style={{ color: 'var(--text-secondary)' }}>
              "새는 알에서 나오려고 투쟁한다..."
            </div>
            <div className="flex items-center justify-between text-caption">
              <span style={{ color: 'var(--text-tertiary)' }}>데미안</span>
              <div className="flex items-center gap-1" style={{ color: '#FF00FF' }}>
                <Heart className="w-3 h-3 fill-current" />
                <span className="font-bold">24</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

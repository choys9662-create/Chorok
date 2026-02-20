import { TrendingUp, Book, Trees, Calendar, Sparkles } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, LineChart, Line, YAxis } from 'recharts';
import { ExceptionalBadge } from '../ExceptionalBadge';
import { weeklyDetailData } from './data';

export function WeeklyView() {
  return (
    <>
      {/* Daily Reading Chart */}
      <div className="card-minimal rounded-3xl p-6 shadow-neon animate-slide-up">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5" style={{ color: '#00FF00' }} />
          <h2 className="text-h2 text-white">주간 독서 시간</h2>
        </div>

        <div className="h-48 w-full" style={{ minHeight: '192px' }}>
          <ResponsiveContainer width="100%" height={192}>
            <BarChart data={weeklyDetailData}>
              <XAxis
                dataKey="day"
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
              <Bar dataKey="minutes" fill="#00FF00" radius={[4, 4, 0, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-center text-caption mt-4" style={{ color: 'var(--text-tertiary)' }}>
          최근 7일간의 독서 시간 추이
        </p>
      </div>

      {/* Weekly Best Book */}
      <div className="card-minimal rounded-3xl p-6 shadow-neon">
        <div className="flex items-center gap-2 mb-4">
          <Book className="w-5 h-5" style={{ color: '#FF00FF' }} />
          <h2 className="text-h2 text-white">이번 주 가장 집중한 책</h2>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: 'rgba(255, 0, 255, 0.1)', border: '1px solid rgba(255, 0, 255, 0.2)' }}>
          <div className="w-16 h-20 rounded-lg flex items-center justify-center text-3xl" style={{ background: 'rgba(0, 255, 0, 0.2)' }}>
            📖
          </div>
          <div className="flex-1">
            <div className="text-body font-bold text-white mb-1">데미안</div>
            <div className="text-caption" style={{ color: 'var(--text-secondary)' }}>헤르만 헤세</div>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-caption" style={{ color: '#00FF00' }}>5회 독서</span>
              <span className="text-caption" style={{ color: '#00FFFF' }}>315분</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reading Depth */}
      <div className="card-minimal rounded-3xl p-6 shadow-neon">
        <div className="flex items-center gap-2 mb-4">
          <Trees className="w-5 h-5" style={{ color: '#00FF00' }} />
          <h2 className="text-h2 text-white">독서의 뿌리 깊이</h2>
        </div>
        <div className="h-40 w-full" style={{ minHeight: '160px' }}>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={weeklyDetailData}>
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: 'var(--text-secondary)' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis domain={[0, 100]} hide />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--surface-2)',
                  color: 'white'
                }}
                formatter={(value: number) => {
                  if (value >= 95) return ['완전한 몰입 🌊', '깊이'];
                  if (value >= 85) return ['깊은 뿌리 🌲', '깊이'];
                  if (value >= 75) return ['뿌리 성장 중 🌱', '깊이'];
                  return ['가벼운 독서 ☁️', '깊이'];
                }}
              />
              <Line
                type="monotone"
                dataKey="focus"
                stroke="#00FF00"
                strokeWidth={3}
                dot={{ fill: '#00FF00', r: 4, strokeWidth: 2, stroke: '#000' }}
                activeDot={{ r: 6, strokeWidth: 2, stroke: '#00FF00' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(0, 255, 0, 0.1)' }}>
            <div className="text-caption mb-1" style={{ color: 'var(--text-secondary)' }}>이번 주</div>
            <div className="text-h3 font-bold" style={{ color: '#00FF00' }}>깊은 뿌리</div>
            <div className="text-caption mt-0.5" style={{ color: '#00FF00', opacity: 0.7 }}>🌲</div>
          </div>
          <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(0, 255, 255, 0.1)' }}>
            <div className="text-caption mb-1" style={{ color: 'var(--text-secondary)' }}>가장 깊은 날</div>
            <div className="text-h3 font-bold" style={{ color: '#00FFFF' }}>11/25</div>
            <div className="text-caption mt-0.5" style={{ color: '#00FFFF', opacity: 0.7 }}>완전한 몰입</div>
          </div>
          <div className="text-center p-3 rounded-xl" style={{ background: 'var(--surface-2)' }}>
            <div className="text-caption mb-1" style={{ color: 'var(--text-secondary)' }}>나이테 밀도</div>
            <div className="text-h3 font-bold text-white">6/7</div>
            <div className="text-caption mt-0.5" style={{ color: 'var(--text-tertiary)' }}>단단한 링</div>
          </div>
        </div>
      </div>

      {/* Weekly Best Choseo */}
      <div className="card-minimal rounded-3xl p-6 shadow-neon relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at top right, rgba(255, 0, 255, 0.1), transparent)' }}></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5" style={{ color: '#FF00FF' }} />
            <h2 className="text-h2 text-white">이번 주 베스트 초서</h2>
          </div>
          <div className="rounded-2xl p-4" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}>
            <div className="text-body-s italic font-serif mb-3 text-white leading-relaxed">
              "새는 알에서 나오려고 투쟁한다. 알은 세계이다."
            </div>
            <div className="flex items-center justify-between">
              <div className="text-caption" style={{ color: 'var(--text-secondary)' }}>데미안 · 11/26</div>
              <ExceptionalBadge type="chorus-highlight" size="sm" count={47} />
            </div>
          </div>
        </div>
      </div>

      {/* Daily Reading List */}
      <div className="card-minimal rounded-3xl p-6 shadow-neon">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5" style={{ color: '#FFFF00' }} />
          <h2 className="text-h2 text-white">일별 독서 기록</h2>
        </div>
        <div className="space-y-3">
          {weeklyDetailData.slice().reverse().map((day, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 rounded-xl"
              style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}
            >
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-caption" style={{ color: 'var(--text-tertiary)' }}>{day.day}</div>
                  <div className="text-body font-bold text-white mt-1">{day.minutes}분</div>
                </div>
                <div className="h-10 w-px" style={{ background: 'var(--border-subtle)' }}></div>
                <div>
                  <div className="text-body-s text-white">{day.book}</div>
                  <div className="text-caption" style={{ color: 'var(--text-secondary)' }}>{day.pages}페이지</div>
                </div>
              </div>
              <div className="text-caption px-2 py-1 rounded-lg" style={{
                background: day.focus >= 90 ? 'rgba(0, 255, 0, 0.15)' : 'rgba(0, 255, 255, 0.15)',
                color: day.focus >= 90 ? '#00FF00' : '#00FFFF'
              }}>
                집중 {day.focus}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

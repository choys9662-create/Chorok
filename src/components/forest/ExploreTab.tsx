import { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { competitionData } from './data';

type MetricKey = 'time' | 'completion' | 'quality' | 'diversity' | 'streak' | 'activity';

export function ExploreTab() {
  const [competitionMetric, setCompetitionMetric] = useState<MetricKey>('time');

  const metrics = [
    { key: 'time' as MetricKey, label: '시간', icon: '⏱️' },
    { key: 'completion' as MetricKey, label: '완독', icon: '📚' },
    { key: 'quality' as MetricKey, label: '품질', icon: '✨' },
    { key: 'diversity' as MetricKey, label: '다양성', icon: '🌈' },
    { key: 'streak' as MetricKey, label: '연속성', icon: '🔥' },
    { key: 'activity' as MetricKey, label: '활성도', icon: '⚡' }
  ];

  const currentData = competitionData[competitionMetric];

  return (
    <div className="p-6 pb-32 space-y-6">
      <h2 className="text-xl font-bold text-white">탐험</h2>

      {/* Leaderboard */}
      <div className="card-minimal rounded-3xl p-6 border shadow-lg" style={{ borderColor: 'rgba(0, 255, 0, 0.3)', boxShadow: '0 0 30px rgba(0, 255, 0, 0.1)' }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" style={{ color: '#00FF00' }} />
            <h3 className="font-bold text-white">이번 주 클랜 순위</h3>
          </div>
          <div className="text-xs font-medium" style={{ color: '#00FF00' }}>매주 월요일 초기화</div>
        </div>

        {/* Competition Metric Tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-3 mb-4 hide-scrollbar">
          {metrics.map((metric) => (
            <button
              key={metric.key}
              onClick={() => setCompetitionMetric(metric.key)}
              className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all"
              style={{
                background: competitionMetric === metric.key ? '#00FF00' : 'var(--surface-2)',
                color: competitionMetric === metric.key ? '#000' : 'var(--text-secondary)',
                boxShadow: competitionMetric === metric.key ? '0 0 10px rgba(0, 255, 0, 0.4)' : 'none'
              }}
            >
              <span className="mr-1">{metric.icon}</span>
              {metric.label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {currentData.map((clan: any) => (
            <div key={clan.rank} className="p-4 rounded-2xl border shadow-md" style={{
              background: clan.isMe ? 'rgba(0, 255, 0, 0.1)' : 'var(--surface-2)',
              borderColor: clan.isMe ? 'rgba(0, 255, 0, 0.3)' : 'var(--border-subtle)'
            }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" style={{
                  background: clan.rank === 1 ? '#00FF00' : clan.rank === 2 ? '#C0C0C0' : '#CD7F32',
                  color: '#000'
                }}>
                  {clan.rank}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-white flex items-center gap-2 mb-0.5 flex-wrap">
                    {clan.name}
                    {clan.isMe && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(0, 255, 0, 0.2)', color: '#00FF00', border: '1px solid rgba(0, 255, 0, 0.3)' }}>우리</span>}
                    <span className="text-xs" style={{ color: clan.trend?.startsWith('↑') ? '#00FF00' : clan.trend?.startsWith('↓') ? '#FF0077' : 'var(--text-tertiary)' }}>{clan.trend}</span>
                    <span className="text-xs" style={{ color: '#00FF00' }}>{clan.level}</span>
                    {clan.badges?.map((badge: string, idx: number) => <span key={idx} className="text-xs">{badge}</span>)}
                  </div>
                  <div className="text-sm font-bold flex items-center gap-2 flex-wrap" style={{ color: '#00FF00' }}>
                    {clan.score}
                    {clan.growth && <span className="text-xs font-medium" style={{ color: '#00FF00' }}>{clan.growth}</span>}
                    {clan.gap && <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>(1위 {clan.gap})</span>}
                  </div>
                  <div className="text-[10px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>{clan.extra}</div>
                  {clan.mvp && (
                    <div className="text-[10px] mt-1 font-medium" style={{ color: '#00FF00' }}>MVP: {clan.mvp} ({clan.mvpTime}) • 평균 {clan.speed}</div>
                  )}
                  {clan.discussion && (
                    <div className="text-[10px] mt-1 font-medium" style={{ color: '#00FF00' }}>
                      {clan.choseoQuality && `초서당 ♥${clan.choseoQuality}개 • `}토론 참여율 {clan.discussion}
                    </div>
                  )}
                  {clan.exploration && (
                    <div className="text-[10px] mt-1 font-medium" style={{ color: '#00FF00' }}>
                      {clan.newGenres?.length > 0 ? `신규: ${clan.newGenres.join(', ')} • ` : ''}탐험도 {clan.exploration}
                    </div>
                  )}
                  {clan.maxStreak && (
                    <div className="text-[10px] mt-1 font-medium" style={{ color: '#00FF00' }}>최장 {clan.maxStreak} • 달성률 {clan.achievement} • 오늘 {clan.todayReaders}</div>
                  )}
                  {clan.dailyActive && (
                    <div className="text-[10px] mt-1 font-medium" style={{ color: '#00FF00' }}>토론 {clan.discussion} • ♥{clan.likes} • 일일 활성 {clan.dailyActive}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Other clans */}
      <div>
        <h3 className="font-bold text-white mb-3">다른 클랜 둘러보기</h3>
        <div className="space-y-3">
          <button className="w-full card-minimal backdrop-blur-md p-4 rounded-2xl border shadow-sm hover:shadow-md transition-shadow" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{ background: 'linear-gradient(to bottom right, #FF00FF, #FF77FF)' }}>🌸</div>
              <div className="flex-1 text-left">
                <div className="font-bold text-white">시와 산문 클랜</div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>24명 • Lv.35 • 문학 중심</div>
              </div>
              <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>→</div>
            </div>
          </button>
          <button className="w-full card-minimal backdrop-blur-md p-4 rounded-2xl border shadow-sm hover:shadow-md transition-shadow" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{ background: 'linear-gradient(to bottom right, #00FFFF, #0088FF)' }}>🔬</div>
              <div className="flex-1 text-left">
                <div className="font-bold text-white">과학독서 클랜</div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>18명 • Lv.29 • 과학 중심</div>
              </div>
              <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>→</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

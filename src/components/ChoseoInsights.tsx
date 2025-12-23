import { Brain, TrendingUp, Heart, Lightbulb, Clock, ArrowLeft } from 'lucide-react';
import { Screen } from '../App';

interface ChoseoInsightsProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}

export function ChoseoInsights({ onBack, onNavigate }: ChoseoInsightsProps) {
  // Mock data - replace with real analysis
  const insights = {
    topThemes: [
      { theme: '성장과 변화', count: 23, percentage: 35, color: 'emerald' },
      { theme: '관계와 공감', count: 18, percentage: 27, color: 'blue' },
      { theme: '시간과 기억', count: 15, percentage: 23, color: 'purple' },
      { theme: '자유와 선택', count: 10, percentage: 15, color: 'orange' },
    ],
    emotionalTone: [
      { emotion: '희망적', percentage: 40, color: 'yellow' },
      { emotion: '성찰적', percentage: 35, color: 'indigo' },
      { emotion: '우울', percentage: 15, color: 'slate' },
      { emotion: '기쁨', percentage: 10, color: 'pink' },
    ],
    timeOfDay: [
      { time: '새벽 (00-06)', count: 5, icon: '🌙' },
      { time: '오전 (06-12)', count: 12, icon: '🌅' },
      { time: '오후 (12-18)', count: 8, icon: '☀️' },
      { time: '저녁 (18-24)', count: 41, icon: '🌆' },
    ],
    topWords: ['삶', '시간', '마음', '사람', '세계', '자신', '기억', '순간', '관계', '변화'],
    totalChoseos: 66,
    averageLength: 47,
  };

  const maxCount = Math.max(...insights.timeOfDay.map(t => t.count));

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDFDFD]">
      {/* Header */}
      <header className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">초서 인사이트</h1>
          <div className="w-10" />
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Brain className="w-7 h-7" />
            </div>
            <div>
              <h2 className="font-bold text-lg">당신의 독서 성향</h2>
              <p className="text-sm text-white/80">초서로 보는 마음의 지도</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 backdrop-blur rounded-lg p-2 text-center">
              <div className="text-2xl font-bold">{insights.totalChoseos}</div>
              <div className="text-xs text-white/70">총 초서</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-2 text-center">
              <div className="text-2xl font-bold">{insights.averageLength}</div>
              <div className="text-xs text-white/70">평균 길이</div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6 pb-24">
        {/* Top Themes */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-800">주요 주제</h3>
          </div>
          <p className="text-sm text-slate-500 mb-4">
            당신은 <span className="font-bold text-emerald-600">'성장과 변화'</span>에 관한 문장에 가장 끌려요
          </p>
          <div className="space-y-3">
            {insights.topThemes.map((theme, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-slate-700">{theme.theme}</span>
                  <span className="text-xs font-bold text-slate-500">{theme.count}개</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`bg-gradient-to-r from-${theme.color}-400 to-${theme.color}-600 h-full rounded-full transition-all duration-500`}
                    style={{ width: `${theme.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Emotional Tone */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-rose-600" />
            <h3 className="font-bold text-slate-800">감정 톤</h3>
          </div>
          <p className="text-sm text-slate-500 mb-4">
            주로 <span className="font-bold text-yellow-600">'희망적'</span>이고 <span className="font-bold text-indigo-600">'성찰적'</span>인 문장을 수집해요
          </p>
          <div className="grid grid-cols-2 gap-3">
            {insights.emotionalTone.map((tone, i) => {
              const colorClasses = {
                yellow: 'from-yellow-400 to-amber-500',
                indigo: 'from-indigo-400 to-purple-500',
                slate: 'from-slate-400 to-slate-500',
                pink: 'from-pink-400 to-rose-500',
              }[tone.color];

              return (
                <div
                  key={i}
                  className={`bg-gradient-to-br ${colorClasses} text-white rounded-xl p-4 text-center`}
                >
                  <div className="text-2xl font-bold mb-1">{tone.percentage}%</div>
                  <div className="text-xs text-white/90">{tone.emotion}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Time of Day */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-800">초서 시간대</h3>
          </div>
          <p className="text-sm text-slate-500 mb-4">
            주로 <span className="font-bold text-blue-600">저녁 시간</span>에 마음에 드는 문장을 수집하시네요
          </p>
          <div className="space-y-3">
            {insights.timeOfDay.map((time, i) => {
              const barWidth = (time.count / maxCount) * 100;
              return (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-2xl">{time.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-700">{time.time}</span>
                      <span className="text-xs font-bold text-slate-500">{time.count}개</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-400 to-indigo-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Word Cloud */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <h3 className="font-bold text-slate-800">자주 등장하는 단어</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {insights.topWords.map((word, i) => {
              const sizes = ['text-2xl', 'text-xl', 'text-lg', 'text-base', 'text-sm'];
              const colors = [
                'text-purple-600 bg-purple-50',
                'text-emerald-600 bg-emerald-50',
                'text-blue-600 bg-blue-50',
                'text-orange-600 bg-orange-50',
                'text-pink-600 bg-pink-50',
              ];
              const sizeClass = sizes[Math.floor(i / 2)] || 'text-sm';
              const colorClass = colors[i % colors.length];

              return (
                <span
                  key={i}
                  className={`${sizeClass} ${colorClass} font-bold px-3 py-1.5 rounded-full`}
                >
                  {word}
                </span>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
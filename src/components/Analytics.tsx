import { useState } from 'react';
import { ArrowLeft, Calendar, TrendingUp, Book, Clock, Flame, Target, ChevronRight } from 'lucide-react';
import { mockSessions, mockBooks } from '../data/mockData';

interface AnalyticsProps {
  onBack: () => void;
}

export function Analytics({ onBack }: AnalyticsProps) {
  const [timeRange, setTimeRange] = useState<'7' | '30' | 'all'>('7');

  // Calculate stats
  const totalMinutes = mockSessions.reduce((acc, s) => acc + s.minutes, 0);
  const totalPages = mockSessions.reduce((acc, s) => acc + s.pages, 0);
  const avgMinutesPerDay = Math.round(totalMinutes / 7);
  const avgPagesPerDay = Math.round(totalPages / 7);

  // Calendar data with Book Covers
  const today = new Date();
  const calendarDays = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (29 - i));
    const dateStr = date.toISOString().split('T')[0];
    const session = mockSessions.find(s => s.date === dateStr);
    
    let bookCover = null;
    if (session) {
      const book = mockBooks.find(b => b.id === session.bookId);
      bookCover = book?.cover;
    }

    return {
      date: date.getDate(),
      hasReading: !!session,
      minutes: session?.minutes || 0,
      bookCover,
    };
  });

  return (
    <div className="max-w-md mx-auto min-h-screen bg-stone-50 text-slate-800">
      {/* Header - Clean & Minimal */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-stone-200/60">
        <div className="p-4 flex items-center justify-between">
          <button onClick={onBack} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-slate-600" />
          </button>
          <h1 className="text-lg font-bold text-slate-800">독서 분석</h1>
          <div className="w-10" />
        </div>

        {/* Time Range Tabs */}
        <div className="px-4 pb-4">
          <div className="flex p-1 bg-stone-100 rounded-xl">
            {(['7', '30', 'all'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${
                  timeRange === range
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-stone-500 hover:text-stone-700'
                }`}
              >
                {range === '7' ? '주간' : range === '30' ? '월간' : '전체'}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-6 space-y-6 pb-20">
        {/* Streak Card */}
        <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg shadow-orange-200">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1 opacity-90">
              <Flame className="w-5 h-5" />
              <span className="text-sm font-medium">연속 독서</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold tracking-tight">7</span>
              <span className="text-xl font-medium opacity-90">일째</span>
            </div>
            <p className="text-sm text-orange-50 mt-2 font-medium bg-white/20 inline-block px-3 py-1 rounded-full backdrop-blur-sm">
              상위 5%의 열정이에요! 🔥
            </p>
          </div>
          <div className="absolute -right-6 -bottom-6 text-9xl opacity-10 rotate-12">🔥</div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-stone-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800 mb-0.5">{totalMinutes}분</div>
            <div className="text-xs text-stone-500 font-medium">일평균 {avgMinutesPerDay}분</div>
          </div>
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-stone-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                <Book className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800 mb-0.5">{totalPages}p</div>
            <div className="text-xs text-stone-500 font-medium">일평균 {avgPagesPerDay}p</div>
          </div>
        </div>

        {/* Calendar with Book Covers */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-slate-800">독서 캘린더</h2>
            </div>
            <button className="text-xs font-medium text-stone-400 flex items-center hover:text-emerald-600 transition-colors">
              전체보기 <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {['일', '월', '화', '수', '목', '금', '토'].map(day => (
              <div key={day} className="text-xs text-center text-stone-400 font-medium mb-2">
                {day}
              </div>
            ))}
            {calendarDays.map((day, idx) => (
              <div
                key={idx}
                className={`aspect-square rounded-xl flex items-center justify-center text-xs relative overflow-hidden group transition-all ${
                  day.hasReading
                    ? 'bg-emerald-50 border border-emerald-100'
                    : 'bg-stone-50'
                }`}
              >
                {day.bookCover ? (
                  <>
                    <img 
                      src={day.bookCover} 
                      alt="book cover" 
                      className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
                    />
                    {/* Date Overlay on Cover */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      {day.date}
                    </div>
                  </>
                ) : (
                  <span className={`font-medium ${day.hasReading ? 'text-emerald-600' : 'text-stone-300'}`}>
                    {day.date}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Reading Trends */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-slate-800">주간 리포트</h2>
          </div>
          
          <div className="space-y-5">
            {mockSessions.slice(0, 5).map((session, idx) => {
              const maxMinutes = 60; // Assuming 60 is max for vis
              const width = Math.min(100, (session.minutes / maxMinutes) * 100);
              return (
                <div key={idx}>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-stone-500 font-medium">{session.date.slice(5)}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-800 font-bold">{session.minutes}분</span>
                      <span className="text-stone-300">|</span>
                      <span className="text-stone-500">{session.pages}p</span>
                    </div>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full rounded-full opacity-80"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Goals */}
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-3xl p-6 border border-amber-100/50">
          <div className="flex items-center gap-2 mb-5">
            <Target className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-bold text-amber-900">이번 달 목표</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white/60 rounded-2xl p-4 border border-amber-100">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-amber-900 font-medium">10권 읽기</span>
                <span className="text-amber-600 font-bold">40%</span>
              </div>
              <div className="w-full bg-amber-100 rounded-full h-2.5">
                <div className="bg-amber-500 h-2.5 rounded-full shadow-sm shadow-amber-200" style={{ width: '40%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
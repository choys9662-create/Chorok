import { useState, useMemo, useEffect, useRef } from 'react';
import { ArrowLeft, Calendar, TrendingUp, Book, Clock, Flame, Target, ChevronRight, Sparkles, PieChart as PieChartIcon, Heart, Award, Users, BookOpen, BarChart3, Sunrise, Sunset, Moon, Trees } from 'lucide-react';
import { mockSessions, mockBooks, mockChosus } from '../data/mockData';
import { ExceptionalBadge } from './ExceptionalBadge';
import { ExceptionalType } from './ExceptionalChoseoToast';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface AnalyticsProps {
  onBack: () => void;
}

// Mock exceptional choseos for analytics display
const mockExceptionalChoseos = [
  {
    id: 'exc1',
    bookTitle: '데미안',
    text: '새는 알에서 나오려고 투쟁한다. 알은 세계이다.',
    thought: '성장통 없이는 새로운 세계로 나아갈 수 없다. 지금의 힘듦도 결국 알을 깨는 과정이겠지.',
    exceptional: {
      type: 'chorus-highlight' as ExceptionalType,
      count: 47
    },
    date: '2025-11-26'
  },
  {
    id: 'exc2',
    bookTitle: '아몬드',
    text: '감정이란 결국 나를 지키기 위한 도구일 뿐이다.',
    thought: '감정에 휘둘리지 말자. 그것은 도구일 뿐, 내 주인이 아니다.',
    exceptional: {
      type: 'aligned-reflection' as ExceptionalType
    },
    date: '2025-11-24'
  },
  {
    id: 'exc3',
    bookTitle: '데미안',
    text: '우리는 자신의 안에서 싹트려는 것, 그것만을 경험해야 한다.',
    thought: '내면의 목소리에 더 귀 기울여야겠다. 외부의 소음이 너무 크다.',
    exceptional: {
      type: 'unique-perspective' as ExceptionalType
    },
    date: '2025-11-23'
  },
  {
    id: 'exc4',
    bookTitle: '데미안',
    text: '진정한 직무는 자기 자신에게로 가는 길을 찾는 것이다.',
    thought: '',
    exceptional: {
      type: 'hidden-sentence' as ExceptionalType
    },
    date: '2025-11-22'
  }
];

const COLORS = ['#00FF00', '#FF00FF', '#00FFFF', '#FFFF00', '#FF0077'];

// Weekly specific data (last 7 days in detail)
const weeklyDetailData = [
  { day: '11/20', minutes: 45, pages: 35, focus: 85, book: '데미안' },
  { day: '11/21', minutes: 60, pages: 48, focus: 92, book: '데미안' },
  { day: '11/22', minutes: 30, pages: 22, focus: 78, book: '아몬드' },
  { day: '11/23', minutes: 75, pages: 60, focus: 95, book: '데미안' },
  { day: '11/24', minutes: 50, pages: 40, focus: 88, book: '아몬드' },
  { day: '11/25', minutes: 90, pages: 72, focus: 98, book: '데미안' },
  { day: '11/26', minutes: 55, pages: 45, focus: 90, book: '데미안' }
];

// Monthly specific data (4 weeks comparison)
const monthlyWeeklyData = [
  { week: '1주차', minutes: 280, books: 1, sessions: 6 },
  { week: '2주차', minutes: 350, books: 2, sessions: 7 },
  { week: '3주차', minutes: 420, books: 2, sessions: 8 },
  { week: '4주차', minutes: 405, books: 2, sessions: 7 }
];

const monthlyCompletedBooks = [
  { title: '데미안', author: '헤르만 헤세', pages: 248, date: '11/15' },
  { title: '아몬드', author: '손원평', pages: 267, date: '11/22' }
];

// Time-of-day data for monthly view (different from all view)
const monthlyTimeData = [
  { name: '새벽', value: 8, percent: 8 },
  { name: '오전', value: 22, percent: 22 },
  { name: '오후', value: 35, percent: 35 },
  { name: '저녁', value: 35, percent: 35 }
];

// Time-of-day data (mock distribution based on typical reading patterns)
const timeOfDayData = [
  { name: '새벽\n(00-06)', value: 5, icon: Moon },
  { name: '오전\n(06-12)', value: 25, icon: Sunrise },
  { name: '오후\n(12-18)', value: 30, icon: '☀️' },
  { name: '저녁\n(18-24)', value: 40, icon: Sunset }
];

// Day of week data
const dayOfWeekData = [
  { name: '월', value: 35 },
  { name: '화', value: 42 },
  { name: '수', value: 28 },
  { name: '목', value: 45 },
  { name: '금', value: 38 },
  { name: '토', value: 60 },
  { name: '일', value: 55 }
];

// Monthly trend data (last 6 months)
const monthlyTrendData = [
  { month: '6월', minutes: 780, books: 2 },
  { month: '7월', minutes: 920, books: 3 },
  { month: '8월', minutes: 850, books: 2 },
  { month: '9월', minutes: 1050, books: 4 },
  { month: '10월', minutes: 1200, books: 3 },
  { month: '11월', minutes: 1450, books: 5 }
];

export function Analytics({ onBack }: AnalyticsProps) {
  const [timeRange, setTimeRange] = useState<'7' | '30' | 'all'>('7');
  const contentRef = useRef<HTMLDivElement>(null);

  // Filter sessions based on timeRange
  const filteredSessions = useMemo(() => {
    const mockToday = new Date('2025-11-26');
    
    return mockSessions.filter(session => {
      if (timeRange === 'all') return true;
      
      const sessionDate = new Date(session.date);
      const diffTime = Math.abs(mockToday.getTime() - sessionDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return diffDays <= parseInt(timeRange);
    });
  }, [timeRange]);

  // Calculate stats based on timeRange
  const { totalMinutes, totalPages, displayAvgMinutes } = useMemo(() => {
    if (timeRange === '7') {
      // Weekly: use weeklyDetailData
      const minutes = weeklyDetailData.reduce((acc, d) => acc + d.minutes, 0);
      const pages = weeklyDetailData.reduce((acc, d) => acc + d.pages, 0);
      return {
        totalMinutes: minutes,
        totalPages: pages,
        displayAvgMinutes: Math.round(minutes / 7)
      };
    } else if (timeRange === '30') {
      // Monthly: use monthlyWeeklyData
      const minutes = monthlyWeeklyData.reduce((acc, w) => acc + w.minutes, 0);
      const pages = 650; // Approximate based on completed books
      return {
        totalMinutes: minutes,
        totalPages: pages,
        displayAvgMinutes: Math.round(minutes / 30)
      };
    } else {
      // All: use total accumulated data
      const minutes = 6250; // Total accumulated reading time
      const pages = 2340; // Total accumulated pages
      return {
        totalMinutes: minutes,
        totalPages: pages,
        displayAvgMinutes: Math.round(minutes / 180) // Over ~6 months
      };
    }
  }, [timeRange]);

  // Prepare data for Weekly Chart
  const weeklyData = useMemo(() => {
    return filteredSessions.slice(0, 7).reverse().map(s => ({
      name: s.date.slice(5),
      minutes: s.minutes,
      pages: s.pages
    }));
  }, [filteredSessions]);

  // Prepare data for Genre Pie Chart (All view)
  const genreData = useMemo(() => {
    const genres: Record<string, number> = {};
    mockBooks.forEach(book => {
      if (book.status === 'completed' || book.status === 'reading') {
        genres[book.genre] = (genres[book.genre] || 0) + 1;
      }
    });
    return Object.entries(genres).map(([name, value]) => ({ name, value }));
  }, []);

  // Calendar data with Book Covers (Monthly view)
  const calendarDays = useMemo(() => {
    const today = new Date('2025-11-26');
    return Array.from({ length: 30 }, (_, i) => {
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
        fullDate: dateStr,
        hasReading: !!session,
        minutes: session?.minutes || 0,
        bookCover,
      };
    });
  }, []);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-black text-white flex flex-col">
      {/* Header - Dark Theme */}
      <header className="sticky top-0 z-30 bg-black/90 backdrop-blur-md flex-shrink-0" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="p-4 flex items-center justify-between">
          <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" style={{ color: '#00FF00' }} />
          </button>
          <h1 className="text-h2 text-white">독서 분석</h1>
          <div className="w-10" />
        </div>

        {/* Time Range Tabs */}
        <div className="px-4 pb-4">
          <div className="flex p-1 rounded-xl relative" style={{ background: 'var(--surface-2)' }}>
            {(['7', '30', 'all'] as const).map((range) => (
              <button
                key={range}
                onClick={() => {
                  setTimeRange(range);
                  window.scrollTo(0, 0);
                  if (contentRef.current) {
                    contentRef.current.scrollTop = 0;
                  }
                }}
                className={`flex-1 py-1.5 text-body-s font-medium rounded-lg transition-all z-10`}
                style={{
                  background: timeRange === range ? 'var(--surface-elevated)' : 'transparent',
                  color: timeRange === range ? '#00FF00' : 'var(--text-secondary)',
                  boxShadow: timeRange === range ? '0 0 10px rgba(0, 255, 0, 0.2)' : 'none'
                }}
              >
                {range === '7' ? '주간' : range === '30' ? '월간' : '전체'}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content - Scrollable */}
      <div key={timeRange} className="flex-1 overflow-y-auto p-6 space-y-6 pb-20" ref={contentRef} style={{ animation: 'fadeSlideUp 0.4s ease-out' }}>
        {/* Streak Card - Always Visible */}
        <div className="card-minimal rounded-3xl p-6 text-white relative overflow-hidden shadow-neon">
          <div className="bg-gradient-neon-radial absolute inset-0 opacity-30"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-5 h-5" style={{ color: '#FF00FF' }} />
              <span className="text-body-s font-medium" style={{ color: 'var(--text-secondary)' }}>연속 독서</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-display tracking-tight" style={{ color: '#FF00FF' }}>7</span>
              <span className="text-h2 font-medium text-white">일째</span>
            </div>
            <p className="text-body-s mt-2 font-medium inline-block px-3 py-1 rounded-full backdrop-blur-sm" style={{ color: '#FF00FF', background: 'rgba(255, 0, 255, 0.15)', border: '1px solid rgba(255, 0, 255, 0.3)' }}>
              상위 5%의 열정이에요! 🔥
            </p>
          </div>
          <div className="absolute -right-6 -bottom-6 text-9xl rotate-12" style={{ opacity: 0.1 }}>🔥</div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="card-minimal rounded-3xl p-5 shadow-neon">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl" style={{ background: 'rgba(0, 255, 255, 0.15)' }}>
                <Clock className="w-5 h-5" style={{ color: '#00FFFF' }} />
              </div>
            </div>
            <div className="text-display text-white mb-0.5">{totalMinutes}분</div>
            <div className="text-caption font-medium" style={{ color: 'var(--text-secondary)' }}>
              {timeRange === 'all' ? '총 누적 시간' : `일평균 ${displayAvgMinutes}분`}
            </div>
          </div>
          <div className="card-minimal rounded-3xl p-5 shadow-neon">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl" style={{ background: 'rgba(0, 255, 0, 0.15)' }}>
                <Book className="w-5 h-5" style={{ color: '#00FF00' }} />
              </div>
            </div>
            <div className="text-display text-white mb-0.5">{totalPages}p</div>
            <div className="text-caption font-medium" style={{ color: 'var(--text-secondary)' }}>
              {timeRange === 'all' ? '총 누적 페이지' : '읽은 페이지'}
            </div>
          </div>
        </div>

        {/* WEEKLY VIEW: Bar Chart */}
        {timeRange === '7' && (
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

            {/* Daily Focus Score → Reading Depth */}
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
                    <YAxis 
                      domain={[0, 100]}
                      tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} 
                      axisLine={false} 
                      tickLine={false} 
                      hide
                    />
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
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent" style={{ background: 'radial-gradient(circle at top right, rgba(255, 0, 255, 0.1), transparent)' }}></div>
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
                    <div>
                      <div className="text-caption" style={{ color: 'var(--text-secondary)' }}>데미안 · 11/26</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <ExceptionalBadge type="chorus-highlight" size="sm" count={47} />
                    </div>
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
        )}

        {/* MONTHLY VIEW: Calendar */}
        {timeRange === '30' && (
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
                    className={`aspect-square rounded-xl flex items-center justify-center text-caption relative overflow-hidden group transition-all`}
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
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent" style={{ background: 'radial-gradient(circle at top right, rgba(255, 0, 255, 0.1), transparent)' }}></div>
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
        )}

        {/* ALL VIEW: Genre Distribution */}
        {timeRange === 'all' && (
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
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent" style={{ background: 'radial-gradient(circle at top right, rgba(255, 0, 255, 0.1), transparent)' }}></div>
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
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent" style={{ background: 'radial-gradient(circle at top left, rgba(0, 255, 255, 0.1), transparent)' }}></div>
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
        )}

        {/* Goals - Only for Monthly/Weekly */}
        {timeRange !== 'all' && (
          <div className="card-minimal rounded-3xl p-6 shadow-neon relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent" style={{ background: 'radial-gradient(circle at bottom right, rgba(255, 255, 0, 0.1), transparent)' }}></div>
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
        )}
      </div>
    </div>
  );
}
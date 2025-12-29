import { useState, useMemo } from 'react';
import { ArrowLeft, Calendar, TrendingUp, Book, Clock, Flame, Target, ChevronRight, Sparkles, PieChart as PieChartIcon, Heart, Award, Users, BookOpen, BarChart3, Sunrise, Sunset, Moon } from 'lucide-react';
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

  // Filter sessions based on timeRange
  const filteredSessions = useMemo(() => {
    const today = new Date();
    const mockToday = new Date('2025-11-26');
    
    return mockSessions.filter(session => {
      if (timeRange === 'all') return true;
      
      const sessionDate = new Date(session.date);
      const diffTime = Math.abs(mockToday.getTime() - sessionDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return diffDays <= parseInt(timeRange);
    });
  }, [timeRange]);

  // Calculate stats
  const totalMinutes = filteredSessions.reduce((acc, s) => acc + s.minutes, 0);
  const totalPages = filteredSessions.reduce((acc, s) => acc + s.pages, 0);
  
  const displayAvgMinutes = Math.round(totalMinutes / (timeRange === '7' ? 7 : timeRange === '30' ? 30 : 30));

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
    <div className="max-w-md mx-auto min-h-screen bg-black text-white">
      {/* Header - Dark Theme */}
      <header className="sticky top-0 z-30 bg-black/90 backdrop-blur-md" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
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
                onClick={() => setTimeRange(range)}
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

      {/* Content */}
      <div className="p-6 space-y-6 pb-20 animate-fade-in">
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
          <div className="card-minimal rounded-3xl p-6 shadow-neon animate-slide-up">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5" style={{ color: '#00FF00' }} />
              <h2 className="text-h2 text-white">주간 리포트</h2>
            </div>
            
            <div className="h-48 w-full" style={{ minHeight: '192px' }}>
              <ResponsiveContainer width="100%" height={192}>
                <BarChart data={weeklyData}>
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
                  <Bar dataKey="minutes" fill="#00FF00" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-caption mt-4" style={{ color: 'var(--text-tertiary)' }}>
              최근 7일간의 독서 시간 추이
            </p>
          </div>
        )}

        {/* MONTHLY VIEW: Calendar */}
        {timeRange === '30' && (
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
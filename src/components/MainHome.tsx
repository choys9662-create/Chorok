import { useState } from 'react';
import { Book, Screen } from '../App';
import { mockBooks, mockChosus, mockNeighbors, mockSessions } from '../data/mockData';
import { overlappingChoseos } from '../data/choseoOverlapData';
import { BookOpen, Plus, TrendingUp, Flame, Heart, Search, ArrowRight, Sparkles, Calendar, Coffee, Users, Bell, X, Star, Quote, PenLine, Bookmark } from 'lucide-react';
import { ExceptionalBadge } from './ExceptionalBadge';
import { ExceptionalType } from './ExceptionalChoseoToast';
import { ReadingStreak } from './ReadingStreak';
import { DailyMissions } from './DailyMissions';
import { ChoseoTimeCapsule } from './ChoseoTimeCapsule';
import { ReadingBuddyMatch } from './ReadingBuddyMatch';

interface MainHomeProps {
  onStartTimer: (book: Book) => void;
  onNavigate: (screen: Screen) => void;
}

// Mock exceptional choseos
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

// Mock Notifications
const mockNotifications = [
  {
    id: 'n1',
    type: 'choseo',
    user: mockNeighbors[0],
    book: mockBooks[0],
    content: '새는 알에서 나오려고 투쟁한다.',
    timestamp: '방금 전',
    isRead: false
  },
  {
    id: 'n2',
    type: 'rating',
    user: mockNeighbors[1],
    book: mockBooks[3],
    rating: 4.5,
    timestamp: '1시간 전',
    isRead: false
  },
  {
    id: 'n3',
    type: 'thought',
    user: mockNeighbors[2],
    book: mockBooks[0],
    content: '이 구절은 언제 읽어도 가슴이 뛴다. 나도 나의 알을 깨고 있는 걸까?',
    timestamp: '3시간 전',
    isRead: true
  },
  {
    id: 'n4',
    type: 'wishlist',
    user: mockNeighbors[1],
    book: mockBooks[2],
    timestamp: '어제',
    isRead: true
  }
];

export function MainHome({ onStartTimer, onNavigate }: MainHomeProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMissions, setShowMissions] = useState(false);
  const [showTimeCapsule, setShowTimeCapsule] = useState(false);
  const [showBuddyMatch, setShowBuddyMatch] = useState(false);

  const readingBooks = mockBooks.filter(b => b.status === 'reading');
  const primaryBook = readingBooks[0];

  const getProgressMessage = (book: Book) => {
    const progress = (book.currentPage / book.totalPages) * 100;
    const pagesPerMinute = book.totalMinutes ? book.currentPage / book.totalMinutes : 0;
    
    if (progress > 90) return '오늘만 읽으면 완독!';
    if (pagesPerMinute > 0.5) return '재밌는 책인가 봐요';
    if (pagesPerMinute < 0.2) return '조금 어려운 책인가요?';
    if (book.chosuCount && book.chosuCount > 10) return '인상 깊은 책이네요';
    return '편하게 읽기 좋은 책';
  };

  const getReadingAlert = (book: Book) => {
    if (!book.lastReadDate) return null;
    const lastRead = new Date(book.lastReadDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastRead.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 3) {
      return {
        type: 'warning',
        message: '독서 흐름이 끊기고 있어요',
        subMessage: `${diffDays}일 동안 책을 펼치지 않았어요. 다시 시작해볼까요?`
      };
    }
    return null;
  };

  const alert = primaryBook ? getReadingAlert(primaryBook) : null;

  const socialFeed = mockChosus.map(chosu => {
    const neighbor = mockNeighbors.find(n => n.id === chosu.userId) || mockNeighbors[0]; 
    const book = mockBooks.find(b => b.id === chosu.bookId) || mockBooks[0];
    return { ...chosu, neighbor, book };
  });

  const getReadingTrend = () => {
    const today = new Date('2025-11-26');
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentSessions = mockSessions.filter(session => {
      const sessionDate = new Date(session.date);
      return sessionDate >= sevenDaysAgo && sessionDate <= today;
    });

    const totalMinutes = recentSessions.reduce((sum, s) => sum + s.minutes, 0);
    const totalPages = recentSessions.reduce((sum, s) => sum + s.pages, 0);
    const totalDays = recentSessions.length;
    
    const avgMinutesPerDay = Math.round(totalMinutes / 7);
    const avgPagesPerDay = Math.round(totalPages / 7);

    let message = '';
    let subMessage = '';
    let icon = Sparkles;

    if (totalDays === 0) {
      message = '요즘 많이 바쁘신가봐요?';
      subMessage = '잠깐의 여유도 좋은 독서의 시작이에요';
      icon = Coffee;
    } else if (totalDays <= 2) {
      message = '가끔씩 책을 펼치고 계시네요';
      subMessage = '조금씩이라도 꾸준히 읽으면 더 좋아요';
      icon = Calendar;
    } else if (totalDays <= 4) {
      message = '좋은 리듬으로 읽고 계세요';
      subMessage = `이번 주 ${totalDays}일 동안 ${totalPages}페이지를 읽었어요`;
      icon = TrendingUp;
    } else {
      message = '정말 멋진 독서 습관이에요!';
      subMessage = `이번 주 ${totalDays}일 연속 독서 중! ${totalPages}페이지 완료`;
      icon = Sparkles;
    }

    return {
      message,
      subMessage,
      icon,
      totalMinutes,
      totalPages,
      totalDays,
      avgMinutesPerDay,
      avgPagesPerDay
    };
  };

  const readingTrend = getReadingTrend();
  const TrendIcon = readingTrend.icon;

  return (
    <div className="max-w-md mx-auto min-h-screen bg-black relative">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 max-w-md mx-auto px-6 pt-8 pb-4 flex items-center justify-between bg-black/90 backdrop-blur-md z-40">
        <div>
          <h1 className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-neon" style={{ background: 'rgba(0, 255, 0, 0.2)', border: '1px solid rgba(0, 255, 0, 0.3)' }}>
              <BookOpen className="w-5 h-5" style={{ color: '#00FF00' }} strokeWidth={2.5} />
            </div>
            <span className="text-h3 text-white">CHO_LOCK</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowNotifications(true)}
            className="relative p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5" style={{ color: '#00FF00' }} />
            {mockNotifications.filter(n => !n.isRead).length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full animate-pulse" style={{ background: '#00FF00' }}></span>
            )}
          </button>
          <button
            onClick={() => onNavigate('search')}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <Search className="w-5 h-5" style={{ color: '#00FF00' }} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-6 pb-24 pt-28">
        
        {/* Reading Trend Recap */}
        <div className="mb-10">
          <div className="card-minimal relative overflow-hidden shadow-neon">
            <div className="bg-gradient-neon-radial absolute inset-0"></div>
            
            <div className="relative z-10 p-6">
              <div className="flex items-start gap-4">
                {readingTrend.totalDays > 0 && (
                  <div className="backdrop-blur-sm rounded-lg px-3 py-2.5 flex-shrink-0" style={{ background: 'rgba(0, 255, 0, 0.1)', border: '1px solid rgba(0, 255, 0, 0.2)' }}>
                    <p className="text-display leading-none mb-1" style={{ color: '#00FF00' }}>{readingTrend.totalDays}</p>
                    <p className="text-caption" style={{ color: '#00FF00', opacity: 0.7 }}>일</p>
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-h3 text-white mb-2">{readingTrend.message}</h3>
                  <p className="text-body-s" style={{ color: 'var(--text-secondary)' }}>{readingTrend.subMessage}</p>
                </div>
              </div>

              {readingTrend.totalDays === 0 && (
                <button 
                  onClick={() => primaryBook && onStartTimer(primaryBook)}
                  className="w-full mt-4 btn-primary-neon text-body-s flex items-center justify-center gap-2"
                >
                  <span>지금 독서 시작하기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Reading Streak */}
        <div className="mb-10">
          <ReadingStreak
            currentStreak={6}
            longestStreak={12}
            onNavigateToMissions={() => setShowMissions(true)}
          />
        </div>
        
        {/* Current Reading Section */}
        {primaryBook ? (
          <div className="mb-12">
            <div className="card-minimal overflow-hidden hover:border-accent transition-all duration-500 shadow-neon">
              <div className="flex gap-6 p-7">
                <img
                  src={primaryBook.cover}
                  alt={primaryBook.title}
                  className="w-28 h-40 object-cover rounded-xl flex-shrink-0"
                  style={{ boxShadow: '0 0 20px rgba(0, 255, 0, 0.15)' }}
                />
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-h3 text-white line-clamp-1">{primaryBook.title}</h3>
                    </div>
                    <p className="text-body-s mb-4 line-clamp-1" style={{ color: 'var(--text-secondary)' }}>{primaryBook.author}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="badge-neon">
                          {getProgressMessage(primaryBook)}
                        </span>
                      </div>
                      <div className="w-full rounded-full h-2.5 overflow-hidden" style={{ background: 'var(--surface-elevated)' }}>
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ 
                            width: `${(primaryBook.currentPage / primaryBook.totalPages) * 100}%`,
                            background: 'linear-gradient(to right, #00FF00, #00cc00)',
                            boxShadow: '0 0 10px rgba(0, 255, 0, 0.4)'
                          }}
                        />
                      </div>
                      <div className="flex justify-between items-end text-[16px]">
                        <span className="text-display text-white">
                          {Math.round((primaryBook.currentPage / primaryBook.totalPages) * 100)}
                          <span className="text-body-s font-normal ml-0.5" style={{ color: 'var(--text-tertiary)' }}>%</span>
                        </span>
                        <span className="text-caption mb-1" style={{ color: 'var(--text-tertiary)' }}>
                          {primaryBook.totalPages - primaryBook.currentPage}페이지 남음
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Start Reading Button */}
                  <button
                    onClick={() => onStartTimer(primaryBook)}
                    className="w-full text-black py-3 rounded-xl font-bold shadow-neon hover:shadow-neon-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-3 text-body-s"
                    style={{ background: '#00FF00' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#33FF33';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#00FF00';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>계속 읽기</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-12">
            <h2 className="text-h2 text-white mb-4 px-1">지금 읽는 책</h2>
            <div className="card-minimal p-8 text-center py-12 shadow-neon">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--surface-2)' }}>
                <BookOpen className="w-8 h-8" style={{ color: 'var(--text-tertiary)' }} strokeWidth={1.5} />
              </div>
              <h3 className="text-h3 text-white mb-2">읽고 있는 책이 없어요</h3>
              <p className="text-body-s mb-8" style={{ color: 'var(--text-secondary)' }}>새로운 책을 서재에 추가해보세요</p>
              <button
                onClick={() => onNavigate('search')}
                className="btn-primary-neon"
              >
                책 추가하기
              </button>
            </div>
          </div>
        )}

        {/* Choseo Time Capsule */}
        <ChoseoTimeCapsule onViewDetail={(id) => console.log('View choseo:', id)} />
        
        {/* Reading Buddy Match */}
        <ReadingBuddyMatch
          currentBook={primaryBook ? { id: primaryBook.id, title: primaryBook.title, cover: primaryBook.cover } : undefined}
          onViewNeighbor={(id) => console.log('View neighbor:', id)}
        />

        {/* Social Feed (Neighbors' Chosu) */}
        <div className="mb-12">
          <div className="space-y-6">
            {socialFeed.slice(0, 1).map((feed) => (
              <div key={feed.id} className="card-minimal p-6 hover:scale-[1.01] transition-all duration-300 shadow-neon">
                {/* Overlap Indicator */}
                <div className="flex items-center justify-between mb-4 pb-3" style={{ borderBottom: '1px solid var(--border-accent)' }}>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" style={{ color: '#00FF00' }} />
                    <span className="text-caption font-bold" style={{ color: '#00FF00' }}>{overlappingChoseos.length}명이 이 구절을 선택했어요</span>
                  </div>
                  <div className="flex -space-x-2">
                    {overlappingChoseos.slice(0, 3).map((overlap, i) => (
                      <div key={i} className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ background: 'var(--surface-2)', border: '2px solid var(--surface-1)' }}>
                        {overlap.user.avatar}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Quote Card */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(0, 255, 0, 0.1)', border: '1px solid rgba(0, 255, 0, 0.2)' }}>
                      {feed.neighbor.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-caption font-bold text-white">{feed.neighbor.name}</span>
                        <span className="badge-neon">Lv.{feed.neighbor.level}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl p-5 mb-3 relative" style={{ background: 'var(--surface-2)' }}>
                    <div className="absolute top-3 left-3 text-4xl font-serif leading-none select-none" style={{ color: 'var(--text-disabled)' }}>\"</div>
                    <p className="text-body-s leading-loose font-serif italic relative z-10 pt-2 px-1" style={{ color: 'var(--text-secondary)' }}>
                      {feed.text}
                    </p>
                  </div>

                  <div className="pl-4 py-1 mb-3" style={{ borderLeft: '3px solid rgba(0, 255, 0, 0.3)' }}>
                    <p className="text-caption leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {feed.thought}
                    </p>
                  </div>
                </div>

                {/* Other Readers' Thoughts Preview */}
                <div className="space-y-3 mb-4">
                  <div className="text-caption font-bold uppercase tracking-wide px-1" style={{ color: 'var(--text-tertiary)' }}>다른 독자들의 생각</div>
                  {overlappingChoseos.slice(0, 2).map((overlap, i) => (
                    <div key={overlap.id} className="rounded-xl p-3" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ background: 'var(--surface-elevated)', border: '1px solid var(--border-default)' }}>
                          {overlap.user.avatar}
                        </div>
                        <span className="text-caption font-bold text-white">{overlap.user.name}</span>
                        <span className="text-caption px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(0, 255, 0, 0.1)', color: '#00FF00', border: '1px solid rgba(0, 255, 0, 0.2)' }}>
                          {Math.round((overlap.text.length / feed.text.length) * 100)}% 겹침
                        </span>
                      </div>
                      <p className="text-caption leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                        {overlap.thought}
                      </p>
                    </div>
                  ))}
                </div>

                {/* View All Button */}
                <button
                  onClick={() => onNavigate('choseo-detail')}
                  className="w-full rounded-xl py-3 flex items-center justify-center gap-2 transition-all group hover:shadow-sm btn-secondary-neon"
                >
                  <span className="font-bold text-body-s" style={{ color: '#00FF00' }}>모든 생각 보기 ({overlappingChoseos.length})</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ color: '#00FF00' }} />
                </button>

                {/* Book Reference */}
                <div className="mt-4 pt-4 flex items-center gap-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                  <img src={feed.book.cover} alt={feed.book.title} className="w-8 h-11 object-cover rounded shadow-sm" />
                  <div className="flex-1">
                    <span className="text-caption font-bold text-white">{feed.book.title}</span>
                    <span className="text-caption block" style={{ color: 'var(--text-tertiary)' }}>{feed.book.author} · p.{feed.page}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-1 hover:text-rose-500 transition-colors" style={{ color: 'var(--text-tertiary)' }}>
                      <Heart className="w-4 h-4" />
                      <span className="text-caption">{feed.likes + overlappingChoseos.reduce((sum, o) => sum + o.likes, 0)}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exceptional Choseos Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" style={{ color: '#00FF00' }} />
              <h2 className="text-h2 text-white">특별한 순간들</h2>
            </div>
            <span className="text-caption" style={{ color: 'var(--text-tertiary)' }}>{mockExceptionalChoseos.length}개</span>
          </div>
          
          <div className="space-y-4">
            {mockExceptionalChoseos.map((choseo) => (
              <div 
                key={choseo.id}
                className="card-minimal p-6 hover:scale-[1.01] transition-all duration-300 relative group shadow-neon"
              >
                <div className="absolute top-6 right-6 z-10">
                  <ExceptionalBadge type={choseo.exceptional.type} count={choseo.exceptional.count} />
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="badge-neon">
                    {choseo.bookTitle}
                  </span>
                  <span className="text-caption" style={{ color: 'var(--text-tertiary)' }}>{choseo.date}</span>
                </div>

                <div className="rounded-2xl p-5 mb-4 relative" style={{ background: 'var(--surface-2)' }}>
                  <div className="absolute top-3 left-3 text-4xl font-serif leading-none select-none" style={{ color: 'var(--text-disabled)' }}>\"</div>
                  <p className="text-body-s leading-loose font-serif italic relative z-10 pt-2 px-1" style={{ color: 'var(--text-secondary)' }}>
                    {choseo.text}
                  </p>
                </div>

                {choseo.thought && (
                  <div className="pl-4 py-1" style={{ borderLeft: '3px solid rgba(0, 255, 0, 0.3)' }}>
                    <p className="text-caption leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {choseo.thought}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions - Grid */}
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => onNavigate('search')}
            className="card-minimal aspect-square rounded-2xl flex flex-col items-center justify-center gap-3 hover:shadow-neon hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-[rgba(0,255,0,0.15)] transition-colors" style={{ background: 'rgba(0, 255, 0, 0.1)' }}>
              <Plus className="w-6 h-6" style={{ color: '#00FF00' }} strokeWidth={2.5} />
            </div>
            <span className="text-caption font-bold" style={{ color: 'var(--text-secondary)' }}>새로 등록</span>
          </button>
          <button
            onClick={() => onNavigate('ranking')}
            className="card-minimal aspect-square rounded-2xl flex flex-col items-center justify-center gap-3 hover:shadow-neon hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-[rgba(0,255,0,0.15)] transition-colors" style={{ background: 'rgba(0, 255, 0, 0.1)' }}>
              <TrendingUp className="w-6 h-6" style={{ color: '#00FF00' }} strokeWidth={2.5} />
            </div>
            <span className="text-caption font-bold" style={{ color: 'var(--text-secondary)' }}>트렌드</span>
          </button>
          <button
            onClick={() => onNavigate('forest')}
            className="card-minimal aspect-square rounded-2xl flex flex-col items-center justify-center gap-3 hover:shadow-neon hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-[rgba(0,255,0,0.15)] transition-colors" style={{ background: 'rgba(0, 255, 0, 0.1)' }}>
              <Flame className="w-6 h-6" style={{ color: '#00FF00' }} strokeWidth={2.5} />
            </div>
            <span className="text-caption font-bold" style={{ color: 'var(--text-secondary)' }}>챌린지</span>
          </button>
        </div>
      </div>

      {/* Notifications Drawer */}
      {showNotifications && (
        <div className="absolute inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setShowNotifications(false)} />
          <div className="relative w-full max-w-[85%] h-full shadow-2xl animate-slide-left flex flex-col z-50" style={{ background: 'var(--surface-1)' }}>
            {/* Header */}
            <div className="p-5 flex items-center justify-between backdrop-blur z-10 pt-12" style={{ borderBottom: '1px solid var(--border-subtle)', background: 'var(--surface-1)' }}>
              <h2 className="text-h2 text-white">알림</h2>
              <button 
                onClick={() => setShowNotifications(false)}
                className="p-2 rounded-full transition-colors hover:bg-white/5"
                style={{ color: 'var(--text-tertiary)' }}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Notification List */}
            <div className="flex-1 overflow-y-auto space-y-1">
              {mockNotifications.map((notif) => (
                <div 
                  key={notif.id}
                  className={`p-4 rounded-xl transition-colors relative group flex gap-4`}
                  style={{ background: !notif.isRead ? 'rgba(0, 255, 0, 0.05)' : 'transparent' }}
                  onMouseEnter={(e) => !notif.isRead && (e.currentTarget.style.background = 'rgba(0, 255, 0, 0.08)')}
                  onMouseLeave={(e) => !notif.isRead && (e.currentTarget.style.background = 'rgba(0, 255, 0, 0.05)')}
                >
                  {/* User Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-sm" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}>
                      {notif.user.avatar}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="mb-1">
                      <span className="font-bold text-body-s text-white mr-1">{notif.user.name}</span>
                      <span className="text-caption" style={{ color: 'var(--text-secondary)' }}>
                        {notif.type === 'rating' && '님이 책을 평가했습니다.'}
                        {notif.type === 'choseo' && '님이 문장을 수집했습니다.'}
                        {notif.type === 'thought' && '님이 문장에 생각을 남겼습니다.'}
                        {notif.type === 'wishlist' && '님이 읽고 싶은 책으로 담았습니다.'}
                      </span>
                    </div>

                    {/* Dynamic Content based on Type */}
                    <div className="mb-2">
                      {notif.type === 'rating' && (
                        <div className="flex items-center gap-1">
                          <div className="flex" style={{ color: '#00FF00' }}>
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 ${i < Math.floor(notif.rating || 0) ? 'fill-current' : ''}`}
                                style={{ color: i < Math.floor(notif.rating || 0) ? '#00FF00' : 'var(--text-disabled)' }}
                              />
                            ))}
                          </div>
                          <span className="text-caption font-bold text-white">{notif.rating}</span>
                        </div>
                      )}

                      {notif.type === 'choseo' && (
                        <div className="flex gap-2 rounded-lg p-2 mt-1" style={{ background: 'var(--surface-2)' }}>
                          <Quote className="w-4 h-4 flex-shrink-0" style={{ color: '#00FF00' }} />
                          <p className="text-caption line-clamp-2 font-serif italic" style={{ color: 'var(--text-secondary)' }}>{notif.content}</p>
                        </div>
                      )}

                      {notif.type === 'thought' && (
                        <div className="flex gap-2 rounded-lg p-2 mt-1" style={{ background: 'var(--surface-2)' }}>
                          <PenLine className="w-4 h-4 flex-shrink-0" style={{ color: '#00FF00' }} />
                          <p className="text-caption line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{notif.content}</p>
                        </div>
                      )}
                      
                      {notif.type === 'wishlist' && (
                        <div className="flex gap-2 items-center mt-1 text-caption" style={{ color: 'var(--text-secondary)' }}>
                          <Bookmark className="w-3 h-3" style={{ color: '#00FF00' }} />
                          <span>서재에 담김</span>
                        </div>
                      )}
                    </div>
                    
                    <span className="text-caption" style={{ color: 'var(--text-tertiary)' }}>{notif.timestamp}</span>
                  </div>

                  {/* Book Thumbnail */}
                  <div className="flex-shrink-0 w-10">
                     <img src={notif.book.cover} alt="" className="w-full aspect-[2/3] object-cover rounded shadow-sm" />
                  </div>

                  {/* Unread Indicator */}
                  {!notif.isRead && (
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full" style={{ background: '#00FF00' }} />
                  )}
                </div>
              ))}
              
              <div className="p-8 text-center">
                <p className="text-caption" style={{ color: 'var(--text-tertiary)' }}>최근 30일 동안의 알림만 표시됩니다.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Daily Missions Modal */}
      {showMissions && (
        <DailyMissions onClose={() => setShowMissions(false)} />
      )}
    </div>
  );
}
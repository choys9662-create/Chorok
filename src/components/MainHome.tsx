import { Book, Screen } from '../App';
import { mockBooks, mockChosus, mockNeighbors, mockSessions } from '../data/mockData';
import { overlappingChoseos } from '../data/choseoOverlapData';
import { BookOpen, Plus, TrendingUp, Award, Flame, MessageCircle, Heart, Share2, Bell, Search, AlertCircle, ArrowRight, Sparkles, Calendar, Coffee, Users } from 'lucide-react';

interface MainHomeProps {
  onStartTimer: (book: Book) => void;
  onNavigate: (screen: Screen) => void;
}

export function MainHome({ onStartTimer, onNavigate }: MainHomeProps) {
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

  // Determine alert state based on last read date
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

  // Prepare social feed data
  const socialFeed = mockChosus.map(chosu => {
    const neighbor = mockNeighbors.find(n => n.id === chosu.userId) || mockNeighbors[0]; 
    const book = mockBooks.find(b => b.id === chosu.bookId) || mockBooks[0];
    return { ...chosu, neighbor, book };
  });

  // Analyze recent reading trend (last 7 days)
  const getReadingTrend = () => {
    const today = new Date('2025-11-26'); // Mock today's date
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentSessions = mockSessions.filter(session => {
      const sessionDate = new Date(session.date);
      return sessionDate >= sevenDaysAgo && sessionDate <= today;
    });

    const totalMinutes = recentSessions.reduce((sum, s) => sum + s.minutes, 0);
    const totalPages = recentSessions.reduce((sum, s) => sum + s.pages, 0);
    const totalDays = recentSessions.length;
    
    // Calculate average per day
    const avgMinutesPerDay = Math.round(totalMinutes / 7);
    const avgPagesPerDay = Math.round(totalPages / 7);

    // Determine trend message based on activity level
    let message = '';
    let subMessage = '';
    let icon = Sparkles;
    let bgGradient = 'from-emerald-500 to-teal-600';
    let iconBg = 'bg-white/20';

    if (totalDays === 0) {
      // No reading activity
      message = '요즘 많이 바쁘신가봐요?';
      subMessage = '잠깐의 여유도 좋은 독서의 시작이에요';
      icon = Coffee;
      bgGradient = 'from-slate-400 to-slate-500';
    } else if (totalDays <= 2) {
      // Low activity (1-2 days in a week)
      message = '가끔씩 책을 펼치고 계시네요';
      subMessage = '조금씩이라도 꾸준히 읽으면 더 좋아요';
      icon = Calendar;
      bgGradient = 'from-amber-500 to-orange-600';
    } else if (totalDays <= 4) {
      // Moderate activity (3-4 days)
      message = '좋은 리듬으로 읽고 계세요';
      subMessage = `이번 주 ${totalDays}일 동안 ${totalPages}페이지를 읽었어요`;
      icon = TrendingUp;
      bgGradient = 'from-blue-500 to-cyan-600';
    } else {
      // High activity (5+ days)
      message = '정말 멋진 독서 습관이에요!';
      subMessage = `이번 주 ${totalDays}일 연속 독서 중! ${totalPages}페이지 완료`;
      icon = Sparkles;
      bgGradient = 'from-emerald-500 to-teal-600';
    }

    return {
      message,
      subMessage,
      icon,
      bgGradient,
      iconBg,
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
    <div className="max-w-md mx-auto min-h-screen bg-[#FDFDFD]">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 max-w-md mx-auto px-6 pt-8 pb-4 flex items-center justify-between bg-[#FDFDFD]/90 backdrop-blur-md z-40">
        <div>
          <h1 className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600 relative">
            <Bell className="w-6 h-6" strokeWidth={2} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>
          <button onClick={() => onNavigate('search')} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600">
            <Search className="w-6 h-6" strokeWidth={2} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-6 pb-24 pt-28">
        
        {/* Reading Trend Recap - First Section */}
        <div className="mb-10">
          <div className={`bg-gradient-to-br ${readingTrend.bgGradient} rounded-2xl p-4 shadow-md text-white relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10">
              <div className="flex items-start gap-3">
                {readingTrend.totalDays > 0 && (
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2.5 py-2 flex-shrink-0">
                    <p className="text-xl font-bold leading-none mb-0.5">{readingTrend.totalDays}</p>
                    <p className="text-[10px] opacity-80">일</p>
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-bold mb-0.5">{readingTrend.message}</h3>
                  <p className="text-xs opacity-90">{readingTrend.subMessage}</p>
                </div>
              </div>

              {readingTrend.totalDays === 0 && (
                <button 
                  onClick={() => primaryBook && onStartTimer(primaryBook)}
                  className="w-full mt-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 py-2.5 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <span>지금 독서 시작하기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Current Reading Section */}
        {primaryBook ? (
          <div className="mb-12">
            
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden hover:shadow-[0_8px_30px_rgb(16,185,129,0.1)] transition-shadow duration-500">
              <div className="flex gap-6 p-7 p-[28px]">
                <img
                  src={primaryBook.cover}
                  alt={primaryBook.title}
                  className="w-28 h-40 object-cover rounded-xl shadow-lg shadow-slate-200 flex-shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{primaryBook.title}</h3>
                    </div>
                    <p className="text-slate-500 text-sm mb-4 line-clamp-1">{primaryBook.author}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                          {getProgressMessage(primaryBook)}
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full rounded-full"
                          style={{ width: `${(primaryBook.currentPage / primaryBook.totalPages) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="text-2xl font-bold text-slate-800">
                          {Math.round((primaryBook.currentPage / primaryBook.totalPages) * 100)}
                          <span className="text-sm text-slate-400 font-normal ml-0.5">%</span>
                        </span>
                        <span className="text-xs text-slate-400 mb-1">
                          {primaryBook.totalPages - primaryBook.currentPage}페이지 남음
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Start Reading Button */}
                  <button
                    onClick={() => onStartTimer(primaryBook)}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-3"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>계속 읽기</span>
                  </button>
                </div>
              </div>

              {/* Action Button */}
              
            </div>

            {/* Other Reading Books */}
            {readingBooks.length > 1 && (
              <div className="mt-6">
                
                
              </div>
            )}
          </div>
        ) : (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-slate-800 mb-4 px-1">지금 읽는 책</h2>
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 text-center py-12">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-slate-300" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">읽고 있는 책이 없어요</h3>
              <p className="text-slate-500 text-sm mb-8">새로운 책을 서재에 추가해보세요</p>
              <button
                onClick={() => onNavigate('search')}
                className="bg-emerald-600 text-white px-8 py-3.5 rounded-xl hover:bg-emerald-700 transition-all active:scale-[0.98] font-bold shadow-lg shadow-emerald-200"
              >
                책 추가하기
              </button>
            </div>
          </div>
        )}

        {/* Social Feed (Neighbors' Chosu) */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4 px-1">
            
            
          </div>
          
          <div className="space-y-6">
            {socialFeed.slice(0, 1).map((feed) => (
              <div key={feed.id} className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 hover:scale-[1.01] transition-all duration-300">
                {/* Overlap Indicator */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-emerald-100">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-emerald-700">{overlappingChoseos.length}명이 이 구절을 선택했어요</span>
                  </div>
                  <div className="flex -space-x-2">
                    {overlappingChoseos.slice(0, 3).map((overlap, i) => (
                      <div key={i} className="w-6 h-6 bg-emerald-50 rounded-full border-2 border-white flex items-center justify-center text-xs">
                        {overlap.user.avatar}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Quote Card */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100">
                      {feed.neighbor.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800">{feed.neighbor.name}</span>
                        <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">Lv.{feed.neighbor.level}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#F8F7F5] rounded-2xl p-5 mb-3 relative">
                    <div className="absolute top-3 left-3 text-[#E5E0D8] text-4xl font-serif leading-none select-none">"</div>
                    <p className="text-slate-700 text-sm leading-loose font-serif italic relative z-10 pt-2 px-1">
                      {feed.text}
                    </p>
                  </div>

                  <div className="pl-4 border-l-[3px] border-emerald-200 py-1 mb-3">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {feed.thought}
                    </p>
                  </div>
                </div>

                {/* Other Readers' Thoughts Preview */}
                <div className="space-y-3 mb-4">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide px-1">다른 독자들의 생각</div>
                  {overlappingChoseos.slice(0, 2).map((overlap, i) => (
                    <div key={overlap.id} className="bg-gradient-to-br from-stone-50 to-stone-100/50 rounded-xl p-3 border border-stone-200/50">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs border border-stone-200">
                          {overlap.user.avatar}
                        </div>
                        <span className="text-xs font-bold text-slate-700">{overlap.user.name}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                          {Math.round((overlap.text.length / feed.text.length) * 100)}% 겹침
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {overlap.thought}
                      </p>
                    </div>
                  ))}
                </div>

                {/* View All Button */}
                <button
                  onClick={() => onNavigate('choseo-detail')}
                  className="w-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 hover:border-emerald-300 rounded-xl py-3 flex items-center justify-center gap-2 transition-all group hover:shadow-sm"
                >
                  <span className="font-bold text-sm text-emerald-700">모든 생각 보기 ({overlappingChoseos.length})</span>
                  <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Book Reference */}
                <div className="mt-4 pt-4 border-t border-stone-200/50 flex items-center gap-3">
                  <img src={feed.book.cover} alt={feed.book.title} className="w-8 h-11 object-cover rounded shadow-sm" />
                  <div className="flex-1">
                    <span className="text-xs font-bold text-slate-700">{feed.book.title}</span>
                    <span className="text-[10px] text-slate-500 block">{feed.book.author} · p.{feed.page}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-1 text-slate-400 hover:text-rose-500 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span className="text-xs">{feed.likes + overlappingChoseos.reduce((sum, o) => sum + o.likes, 0)}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions - Grid */}
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => onNavigate('search')}
            className="bg-white aspect-square rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <Plus className="w-6 h-6 text-blue-600" strokeWidth={2.5} />
            </div>
            <span className="text-xs font-bold text-slate-600">새로 등록</span>
          </button>
          <button
            onClick={() => onNavigate('ranking')}
            className="bg-white aspect-square rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center group-hover:bg-purple-100 transition-colors">
              <TrendingUp className="w-6 h-6 text-purple-600" strokeWidth={2.5} />
            </div>
            <span className="text-xs font-bold text-slate-600">트렌드</span>
          </button>
          <button
            onClick={() => onNavigate('forest-my')}
            className="bg-white aspect-square rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center group-hover:bg-orange-100 transition-colors">
              <Flame className="w-6 h-6 text-orange-600" strokeWidth={2.5} />
            </div>
            <span className="text-xs font-bold text-slate-600">챌린지</span>
          </button>
        </div>
      </div>
    </div>
  );
}
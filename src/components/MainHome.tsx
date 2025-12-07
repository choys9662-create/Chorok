import { Book, Screen } from '../App';
import { mockBooks, mockChosus, mockNeighbors } from '../data/mockData';
import { BookOpen, Plus, TrendingUp, Award, Flame, MessageCircle, Heart, Share2, Bell, Search, AlertCircle, ArrowRight } from 'lucide-react';

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

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDFDFD]">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 max-w-md mx-auto px-6 pt-8 pb-4 flex items-center justify-between bg-[#FDFDFD]/90 backdrop-blur-md z-40">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">CHO_LOCK</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('search')} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600">
            <Search className="w-6 h-6" strokeWidth={2} />
          </button>
          <button onClick={() => onNavigate('ranking')} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600">
            <Award className="w-6 h-6" strokeWidth={2} />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600 relative">
            <Bell className="w-6 h-6" strokeWidth={2} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-6 pb-24 pt-28">
        
        {/* Social Feed (Neighbors' Chosu) */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-xl font-bold text-slate-800">이웃의 서재</h2>
            <button className="text-xs text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full hover:bg-slate-200 transition-colors">
              더보기
            </button>
          </div>
          
          <div className="space-y-6">
            {socialFeed.slice(0, 2).map((feed) => (
              <div key={feed.id} className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 hover:scale-[1.01] transition-all duration-300">
                {/* Feed Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-lg border border-emerald-100">
                    {feed.neighbor.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-800">{feed.neighbor.name}</span>
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Lv.{feed.neighbor.level}</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {feed.date} · 팔로잉
                    </div>
                  </div>
                </div>

                {/* Quote Card - Distinct Styling */}
                <div className="bg-[#F8F7F5] rounded-2xl p-6 mb-5 relative">
                  <div className="absolute top-4 left-4 text-[#E5E0D8] text-5xl font-serif leading-none select-none">"</div>
                  <p className="text-slate-700 text-sm leading-loose font-serif italic relative z-10 pt-2 px-1">
                    {feed.text}
                  </p>
                  <div className="mt-5 pt-4 border-t border-stone-200/50 flex items-center gap-3">
                    <img src={feed.book.cover} alt={feed.book.title} className="w-8 h-11 object-cover rounded shadow-sm" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-700">{feed.book.title}</span>
                      <span className="text-[10px] text-slate-500">{feed.book.author} · p.{feed.page}</span>
                    </div>
                  </div>
                </div>

                {/* User's Thought */}
                {feed.thought && (
                  <div className="mb-5 pl-4 border-l-[3px] border-emerald-200 py-1">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {feed.thought}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-1.5 text-slate-400 hover:text-rose-500 transition-colors group">
                      <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-medium">{feed.likes}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-slate-400 hover:text-emerald-600 transition-colors group">
                      <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-medium">댓글</span>
                    </button>
                  </div>
                  <button className="text-slate-400 hover:text-emerald-600 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Reading Section */}
        {primaryBook ? (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-slate-800 mb-4 px-1">지금 읽는 책</h2>
            
            {/* Alert Card - Only shows if falling behind */}
            {alert && (
              <div className="bg-amber-50 rounded-2xl p-4 mb-4 border border-amber-100 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2">
                <div className="bg-amber-100 p-2 rounded-full text-amber-600 shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-amber-900 mb-0.5">{alert.message}</h3>
                  <p className="text-xs text-amber-700">{alert.subMessage}</p>
                </div>
                <button className="text-xs font-medium text-amber-700 bg-amber-100 px-3 py-1.5 rounded-lg hover:bg-amber-200 transition-colors">
                  지금 읽기
                </button>
              </div>
            )}

            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden hover:shadow-[0_8px_30px_rgb(16,185,129,0.1)] transition-shadow duration-500">
              <div className="flex gap-6 p-7">
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
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onStartTimer(primaryBook)}
                className="w-full bg-[#F8F9FA] border-t border-slate-100 py-4 flex items-center justify-center gap-2 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-100 transition-all group"
              >
                <span className="font-semibold text-sm">타이머 시작하기</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Other Reading Books */}
            {readingBooks.length > 1 && (
              <div className="mt-6">
                <p className="text-xs font-bold text-slate-400 mb-3 ml-1 uppercase tracking-wider">함께 읽고 있는 책</p>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-1">
                  {readingBooks.slice(1).map(book => (
                    <button
                      key={book.id}
                      onClick={() => onStartTimer(book)}
                      className="flex-shrink-0 w-20 group"
                    >
                      <div className="relative mb-2 transition-transform group-hover:-translate-y-1 duration-300">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-20 h-28 object-cover rounded-xl shadow-sm group-hover:shadow-md"
                        />
                      </div>
                    </button>
                  ))}
                </div>
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
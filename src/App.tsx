import { useState } from 'react';
import { MainHome } from './components/MainHome';
import { TimerScreen } from './components/TimerScreen';
import { BookDetail } from './components/BookDetail';
import { Forest } from './components/Forest';
import { Search } from './components/Search';
import { MyPage } from './components/MyPage';
import { Analytics } from './components/Analytics';
import { Ranking } from './components/Ranking';
import { Home, TreePine, Search as SearchIcon, User, BarChart3, ArrowLeft, MapPin, Users, TrendingUp, Compass, Timer } from 'lucide-react';

export type Screen = 'main' | 'timer' | 'book-detail' | 'forest-my' | 'forest-neighbors' | 'forest-growth' | 'forest-explore' | 'search' | 'mypage' | 'analytics' | 'ranking';

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  currentPage: number;
  totalPages: number;
  status: 'reading' | 'want-to-read' | 'completed';
  genre: string;
  startDate?: string;
  lastReadDate?: string;
  totalMinutes?: number;
  chosuCount?: number;
  rating?: number;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('main');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const navigateToTimer = (book: Book) => {
    setSelectedBook(book);
    setCurrentScreen('timer');
  };

  const navigateToBookDetail = (book: Book) => {
    setSelectedBook(book);
    setCurrentScreen('book-detail');
  };

  // Check if we're in the Forest section
  const isInForestSection = currentScreen === 'forest-my' || currentScreen === 'forest-neighbors' || currentScreen === 'forest-growth' || currentScreen === 'forest-explore';

  const renderScreen = () => {
    switch (currentScreen) {
      case 'main':
        return <MainHome onStartTimer={navigateToTimer} onNavigate={setCurrentScreen} />;
      case 'timer':
        return <TimerScreen book={selectedBook} onComplete={() => setCurrentScreen('analytics')} onBack={() => setCurrentScreen('main')} onBookSelect={setSelectedBook} />;
      case 'book-detail':
        return <BookDetail book={selectedBook} onStartReading={navigateToTimer} onBack={() => setCurrentScreen('main')} />;
      case 'forest-my':
      case 'forest-neighbors':
      case 'forest-growth':
      case 'forest-explore':
        return <Forest onBack={() => setCurrentScreen('main')} onNavigate={setCurrentScreen} activeTab={currentScreen} />;
      case 'search':
        return <Search onBookSelect={navigateToBookDetail} onBack={() => setCurrentScreen('main')} />;
      case 'mypage':
        return <MyPage onBookSelect={navigateToBookDetail} onNavigate={setCurrentScreen} onBack={() => setCurrentScreen('main')} />;
      case 'analytics':
        return <Analytics onBack={() => setCurrentScreen('main')} />;
      case 'ranking':
        return <Ranking onBookSelect={navigateToBookDetail} onBack={() => setCurrentScreen('main')} />;
      default:
        return <MainHome onStartTimer={navigateToTimer} onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50">
      {/* Top Search Button - Show only when not in Forest section and not in Main (Main has its own header) */}
      {!isInForestSection && currentScreen !== 'search' && currentScreen !== 'main' && (
        <div className="fixed top-6 right-6 z-40">
          <button
            onClick={() => setCurrentScreen('search')}
            className="w-12 h-12 bg-white rounded-full shadow-monument flex items-center justify-center text-slate-600 hover:text-emerald-600 hover:shadow-monument-lg transition-all active:scale-95"
          >
            <SearchIcon className="w-6 h-6" strokeWidth={2} />
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="pb-20">
        {renderScreen()}
      </div>

      {/* Bottom Navigation - Changes based on section */}
      {currentScreen !== 'timer' && (isInForestSection ? (
        /* Forest Section Navigation - Floating pill shape */
        <nav className="fixed bottom-6 left-0 right-0 z-50 px-4">
          <div className="max-w-md mx-auto bg-white/90 backdrop-blur-md rounded-full shadow-monument-lg border border-emerald-200/50">
            <div className="flex justify-around items-center h-16 px-3">
              <button
                onClick={() => setCurrentScreen('main')}
                className="flex flex-col items-center gap-0.5 text-slate-600 hover:text-emerald-600 transition-colors px-2"
              >
                <ArrowLeft className="w-5 h-5" strokeWidth={2} />
                <span className="text-[9px]">나가기</span>
              </button>
              <button
                onClick={() => setCurrentScreen('forest-my')}
                className={`flex flex-col items-center gap-0.5 transition-colors px-2 ${
                  currentScreen === 'forest-my' ? 'text-emerald-600' : 'text-slate-400 hover:text-emerald-600'
                }`}
              >
                <MapPin className="w-5 h-5" strokeWidth={2} />
                <span className="text-[9px]">나의 영역</span>
              </button>
              <button
                onClick={() => setCurrentScreen('forest-neighbors')}
                className={`flex flex-col items-center gap-0.5 transition-colors px-2 ${
                  currentScreen === 'forest-neighbors' ? 'text-emerald-600' : 'text-slate-400 hover:text-emerald-600'
                }`}
              >
                <Users className="w-5 h-5" strokeWidth={2} />
                <span className="text-[9px]">이웃 영역</span>
              </button>
              <button
                onClick={() => setCurrentScreen('forest-growth')}
                className={`flex flex-col items-center gap-0.5 transition-colors px-2 ${
                  currentScreen === 'forest-growth' ? 'text-emerald-600' : 'text-slate-400 hover:text-emerald-600'
                }`}
              >
                <TrendingUp className="w-5 h-5" strokeWidth={2} />
                <span className="text-[9px]">성장</span>
              </button>
              <button
                onClick={() => setCurrentScreen('forest-explore')}
                className={`flex flex-col items-center gap-0.5 transition-colors px-2 ${
                  currentScreen === 'forest-explore' ? 'text-emerald-600' : 'text-slate-400 hover:text-emerald-600'
                }`}
              >
                <Compass className="w-5 h-5" strokeWidth={2} />
                <span className="text-[9px]">탐험</span>
              </button>
            </div>
          </div>
        </nav>
      ) : (
        /* Main Navigation - Floating Oval Design */
        <nav className="fixed bottom-6 left-0 right-0 z-50 px-4">
          <div className="max-w-md mx-auto bg-white/90 backdrop-blur-md rounded-full shadow-monument-lg border border-emerald-100">
            <div className="grid grid-cols-5 items-center h-16 relative px-2">
              <button
                onClick={() => setCurrentScreen('main')}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  currentScreen === 'main' ? 'text-emerald-600' : 'text-gray-400 hover:text-emerald-600'
                }`}
              >
                <Home className="w-6 h-6" strokeWidth={2} />
                <span className="text-[10px] font-medium">홈</span>
              </button>
              <button
                onClick={() => setCurrentScreen('forest-my')}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  isInForestSection ? 'text-emerald-600' : 'text-gray-400 hover:text-emerald-600'
                }`}
              >
                <TreePine className="w-6 h-6" strokeWidth={2} />
                <span className="text-[10px] font-medium">숲</span>
              </button>
              
              {/* Center placeholder for CHOLOCK button */}
              <div className="flex justify-center relative">
                {/* CHOLOCK - Protruding circular button */}
                <div className="absolute -top-8 bg-white rounded-full p-1.5 shadow-[0_-4px_10px_-2px_rgba(0,0,0,0.05)]">
                  <button
                    onClick={() => setCurrentScreen('timer')}
                    className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl hover:scale-105 transition-all active:scale-95"
                  >
                    <Timer className="w-7 h-7" strokeWidth={2.5} />
                  </button>
                </div>
                <span className="text-[10px] font-medium text-emerald-700 mt-8 opacity-0">.</span>
              </div>
              
              <button
                onClick={() => setCurrentScreen('analytics')}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  currentScreen === 'analytics' ? 'text-emerald-600' : 'text-gray-400 hover:text-emerald-600'
                }`}
              >
                <BarChart3 className="w-6 h-6" strokeWidth={2} />
                <span className="text-[10px] font-medium">분석</span>
              </button>
              <button
                onClick={() => setCurrentScreen('mypage')}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  currentScreen === 'mypage' ? 'text-emerald-600' : 'text-gray-400 hover:text-emerald-600'
                }`}
              >
                <User className="w-6 h-6" strokeWidth={2} />
                <span className="text-[10px] font-medium">MY</span>
              </button>
            </div>
          </div>
        </nav>
      ))}
    </div>
  );
}
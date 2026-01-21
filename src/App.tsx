import { useState, lazy, Suspense, useEffect } from 'react';
import { MainHome } from './components/MainHome';
import { TimerScreen } from './components/TimerScreen';
import { BookDetail } from './components/BookDetail';
const Forest = lazy(() => import('./components/Forest').then(m => ({ default: m.Forest })));
import { Search } from './components/Search';
import { MyPage } from './components/MyPage';
import { Analytics } from './components/Analytics';
import { Ranking } from './components/Ranking';
import { ChoseoDetail } from './components/ChoseoDetail';
import { ChoseoOverlap } from './components/ChoseoOverlap';
import { ChoseoCluster } from './components/ChoseoCluster';
import { SessionChoseoSummary } from './components/SessionChoseoSummary';
import { ChoseoInsights } from './components/ChoseoInsights';
import { Home, TreePine, Search as SearchIcon, User, BarChart3, ArrowLeft, MapPin, Users, TrendingUp, Compass, Timer } from 'lucide-react';
import { ExceptionalType } from './components/ExceptionalChoseoToast';
import { loadThree } from './components/ui/three-loader';

export type Screen = 'main' | 'timer' | 'book-detail' | 'forest' | 'search' | 'mypage' | 'analytics' | 'ranking' | 'choseo-detail' | 'choseo-overlap' | 'choseo-cluster' | 'session-summary' | 'choseo-insights';

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

export interface SessionChoseo {
  id: string;
  text: string;
  thought: string;
  timestamp: Date;
  exceptional?: {
    type: ExceptionalType;
    count?: number;
  };
}

export interface SessionData {
  book: Book;
  choseos: SessionChoseo[];
  sessionTime: number;
  pagesRead: number;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('main');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  // Scroll to top when screen changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  const navigateToTimer = (book: Book) => {
    setSelectedBook(book);
    setCurrentScreen('timer');
  };

  const navigateToBookDetail = (book: Book) => {
    setSelectedBook(book);
    setCurrentScreen('book-detail');
  };

  // Check if we're in the Forest section
  const isInForestSection = currentScreen === 'forest';

  const renderScreen = () => {
    switch (currentScreen) {
      case 'main':
        return <MainHome onStartTimer={navigateToTimer} onNavigate={setCurrentScreen} />;
      case 'timer':
        return (
          <TimerScreen 
            book={selectedBook} 
            onComplete={(data) => {
              setSessionData(data);
              setCurrentScreen('session-summary');
            }} 
            onBack={() => setCurrentScreen('main')} 
            onBookSelect={setSelectedBook} 
          />
        );
      case 'book-detail':
        return <BookDetail book={selectedBook} onStartReading={navigateToTimer} onBack={() => setCurrentScreen('main')} />;
      case 'forest':
        return <Suspense fallback={<div>Loading...</div>}>
          <Forest onBack={() => setCurrentScreen('main')} onNavigate={setCurrentScreen} />
        </Suspense>;
      case 'search':
        return <Search onBookSelect={navigateToBookDetail} onBack={() => setCurrentScreen('main')} />;
      case 'mypage':
        return <MyPage onBookSelect={navigateToBookDetail} onNavigate={setCurrentScreen} onBack={() => setCurrentScreen('main')} />;
      case 'analytics':
        return <Analytics onBack={() => setCurrentScreen('main')} />;
      case 'ranking':
        return <Ranking onBookSelect={navigateToBookDetail} onBack={() => setCurrentScreen('main')} />;
      case 'choseo-detail':
        return <ChoseoDetail onBack={() => setCurrentScreen('main')} onViewOverlaps={() => setCurrentScreen('choseo-overlap')} />;
      case 'choseo-overlap':
        return <ChoseoOverlap onBack={() => setCurrentScreen('choseo-detail')} onViewCluster={() => setCurrentScreen('choseo-cluster')} />;
      case 'choseo-cluster':
        return <ChoseoCluster onBack={() => setCurrentScreen('choseo-detail')} onSelectChoseo={(index) => setCurrentScreen('choseo-overlap')} />;
      case 'session-summary':
        return sessionData ? (
          <SessionChoseoSummary 
            book={sessionData.book}
            choseos={sessionData.choseos}
            sessionTime={sessionData.sessionTime}
            pagesRead={sessionData.pagesRead}
            onComplete={() => setCurrentScreen('main')} 
          />
        ) : (
          <MainHome onStartTimer={navigateToTimer} onNavigate={setCurrentScreen} />
        );
      case 'choseo-insights':
        return <ChoseoInsights onBack={() => setCurrentScreen('main')} />;
      default:
        return <MainHome onStartTimer={navigateToTimer} onNavigate={setCurrentScreen} />;
    }
  };

  useEffect(() => {
    // Preload Three.js early to ensure singleton pattern
    loadThree().catch(err => {
      console.error('[App] Failed to preload Three.js:', err);
    });
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Main Content */}
      <div className="pb-20">
        {renderScreen()}
      </div>

      {/* Bottom Navigation - Changes based on section */}
      {currentScreen !== 'timer' && currentScreen !== 'forest' && (
        /* Main Navigation - Neon Black Theme */
        <nav className="fixed bottom-0 left-0 right-0 z-50">
          <div className="max-w-md mx-auto backdrop-blur-lg shadow-neon" style={{ background: 'rgba(10, 10, 10, 0.9)', borderTop: '1px solid rgba(0, 255, 0, 0.2)' }}>
            <div className="grid grid-cols-5 items-center h-16 relative px-2">
              <button
                onClick={() => setCurrentScreen('main')}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  currentScreen === 'main' ? 'text-[#00FF00]' : 'text-neutral-600 hover:text-[#00FF00]'
                }`}
              >
                <Home className="w-6 h-6" strokeWidth={2} />
                <span className="text-caption">홈</span>
              </button>
              <button
                onClick={() => setCurrentScreen('forest')}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  currentScreen === 'forest' ? 'text-[#00FF00]' : 'text-neutral-600 hover:text-[#00FF00]'
                }`}
              >
                <TreePine className="w-6 h-6" strokeWidth={2} />
                <span className="text-caption">숲</span>
              </button>
              
              {/* Center placeholder for CHOLOCK button */}
              <div className="flex justify-center relative">
                {/* CHOLOCK - Protruding circular button */}
                <div className="absolute -top-8 rounded-full p-1.5 shadow-neon-lg" style={{ background: '#0a0a0a', border: '2px solid rgba(0, 255, 0, 0.3)' }}>
                  <button
                    onClick={() => setCurrentScreen('timer')}
                    className="w-14 h-14 rounded-full shadow-neon-lg flex items-center justify-center text-black hover:shadow-neon-lg hover:scale-105 transition-all active:scale-95"
                    style={{ background: '#00FF00' }}
                  >
                    <Timer className="w-7 h-7" strokeWidth={2.5} />
                  </button>
                </div>
                <span className="text-caption text-[#00FF00] mt-8 opacity-0">.</span>
              </div>
              
              <button
                onClick={() => setCurrentScreen('analytics')}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  currentScreen === 'analytics' ? 'text-[#00FF00]' : 'text-neutral-600 hover:text-[#00FF00]'
                }`}
              >
                <BarChart3 className="w-6 h-6" strokeWidth={2} />
                <span className="text-caption">분석</span>
              </button>
              <button
                onClick={() => setCurrentScreen('mypage')}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  currentScreen === 'mypage' ? 'text-[#00FF00]' : 'text-neutral-600 hover:text-[#00FF00]'
                }`}
              >
                <User className="w-6 h-6" strokeWidth={2} />
                <span className="text-caption">서재</span>
              </button>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}
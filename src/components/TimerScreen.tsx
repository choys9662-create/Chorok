import { useState, useEffect } from 'react';
import { Book, SessionChoseo, SessionData } from '../App';
import { mockBooks } from '../data/mockData';
import { Camera, PenTool, FileText, Pause, Play, Lock, ArrowLeft, Plus, Check, Trees, Sparkles, Users } from 'lucide-react';
import { ExceptionalType } from './ExceptionalChoseoToast';

// Live reading activity data
interface LiveReader {
  id: string;
  name: string;
  book: string;
  position: { x: number; y: number };
  delay: number;
}

const generateLiveReaders = (): LiveReader[] => {
  const clanMembers = [
    { name: '민수', book: '코스모스' },
    { name: '수지', book: '사피엔스' },
    { name: '지수', book: '1984' }
  ];
  
  return clanMembers.map((member, idx) => ({
    id: `reader-${idx}`,
    name: member.name,
    book: member.book,
    position: {
      x: 20 + Math.random() * 60,
      y: 30 + Math.random() * 40
    },
    delay: idx * 0.5
  }));
};

interface TimerScreenProps {
  book: Book | null;
  onComplete: (data: SessionData) => void;
  onBack: () => void;
  onBookSelect: (book: Book) => void;
}

export function TimerScreen({ book, onComplete, onBack, onBookSelect }: TimerScreenProps) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [showChosuModal, setShowChosuModal] = useState(false);
  const [chosuText, setChosuText] = useState('');
  const [chosuThought, setChosuThought] = useState('');
  const [sliderPosition, setSliderPosition] = useState(0);
  
  // Session Summary State
  const [showSummary, setShowSummary] = useState(false);
  const [pagesRead, setPagesRead] = useState(0);
  const [sessionChoseos, setSessionChoseos] = useState<SessionChoseo[]>([]);
  
  // Exceptional Choseo Toast State
  const [exceptionalToast, setExceptionalToast] = useState<{
    show: boolean;
    type: ExceptionalType;
    count?: number;
  } | null>(null);

  // Live activity state
  const [liveReaders] = useState<LiveReader[]>(generateLiveReaders());
  const [showLiveActivity, setShowLiveActivity] = useState(false);
  const [selectedFirefly, setSelectedFirefly] = useState<LiveReader | null>(null);
  const totalReaders = 127; // Total readers nationwide

  useEffect(() => {
    let interval: number;
    if (book && isRunning && !isPaused && !showSummary) {
      interval = window.setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [book, isRunning, isPaused, showSummary]);

  // If no book is selected, show the book selection screen
  if (!book) {
    const readingBooks = mockBooks.filter(b => b.status === 'reading');

    return (
      <div className="max-w-md mx-auto min-h-screen h-screen flex flex-col bg-[#0a0a0a] text-white relative overflow-hidden">
        {/* Ambient background effects */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{ background: 'rgba(0, 255, 0, 0.2)' }}></div>
          <div className="absolute bottom-40 right-10 w-80 h-80 rounded-full blur-3xl animate-pulse" style={{ background: 'rgba(0, 255, 0, 0.1)', animationDelay: '1s' }}></div>
        </div>

        {/* Header */}
        <header className="p-6 flex items-center relative z-10">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6 text-neutral-200" />
          </button>
          <div className="flex-1 text-center -ml-10">
            <h1 className="text-h2 text-white mb-1">CHO_LOCK 시작</h1>
            <p className="text-caption text-neutral-400">집중 독서 모드</p>
          </div>
        </header>

        {/* Selection Content */}
        <div className="flex-1 px-6 overflow-y-auto pb-10 relative z-10">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-[#1a1a1a] border rounded-full flex items-center justify-center mx-auto mb-4 shadow-neon" style={{ borderColor: 'rgba(0, 255, 0, 0.3)' }}>
              <Lock className="w-10 h-10" style={{ color: '#00FF00' }} />
            </div>
            <p className="text-body-s text-neutral-300 leading-relaxed">
              집중 모드를 시작할 책을 선택해주세요<br/>
              <span className="text-caption text-neutral-500">방해 요소 없이 오롯이 독서에만 집중할 수 있어요</span>
            </p>
          </div>

          {/* Current Reading List */}
          <div className="space-y-4 mb-6">
            <h2 className="text-body-s font-medium text-neutral-400 mb-3">읽고 있는 책</h2>
            {readingBooks.map((b) => (
              <button
                key={b.id}
                onClick={() => onBookSelect(b)}
                className="w-full flex items-center gap-4 bg-[#1a1a1a] border border-neutral-800 rounded-xl p-4 hover:bg-[#222222] transition-all active:scale-[0.98]"
                style={{
                  borderColor: 'rgb(38, 38, 38)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(0, 255, 0, 0.5)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgb(38, 38, 38)'}
              >
                <img
                  src={b.cover}
                  alt={b.title}
                  className="w-16 h-24 object-cover rounded-lg shadow-lg"
                />
                <div className="flex-1 text-left">
                  <h3 className="text-body-s font-bold text-white mb-1">{b.title}</h3>
                  <p className="text-caption text-neutral-400 mb-2">{b.author}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-neutral-800 rounded-full h-1.5">
                      <div 
                        className="h-1.5 rounded-full" 
                        style={{ 
                          width: `${(b.currentPage / b.totalPages) * 100}%`,
                          background: '#00FF00'
                        }}
                      />
                    </div>
                    <span className="text-caption text-neutral-500">{Math.round((b.currentPage / b.totalPages) * 100)}%</span>
                  </div>
                </div>
                <div style={{ color: '#00FF00' }}>→</div>
              </button>
            ))}
            
            {/* Add New Book Placeholder */}
            <button
              className="w-full flex items-center justify-center gap-3 bg-[#1a1a1a] border border-neutral-800 border-dashed rounded-xl p-6 hover:bg-[#222222] transition-all"
              style={{ borderColor: 'rgb(38, 38, 38)' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(0, 255, 0, 0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgb(38, 38, 38)'}
            >
              <div className="w-12 h-12 rounded-full bg-[#121212] border border-neutral-700 flex items-center justify-center">
                <Plus className="w-6 h-6 text-neutral-400" />
              </div>
              <span className="text-body-s text-neutral-400">새 책 추가하기</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Lock Mode (Timer Running) ---

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSliderComplete = () => {
    if (sliderPosition >= 85) {
      setIsRunning(false);
      // 바로 SessionChoseoSummary로 이동
      onComplete({ 
        book, 
        choseos: sessionChoseos, 
        sessionTime: seconds, 
        pagesRead 
      });
    } else {
      setSliderPosition(0);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  const handleChosuSubmit = () => {
    if (chosuText.trim()) {
      // Simulate exceptional moment detection (in real app, this would be backend logic)
      const randomValue = Math.random();
      let exceptionalType: ExceptionalType | null = null;
      let exceptionalCount: number | undefined = undefined;
      
      if (randomValue < 0.25) {
        // 25% chance: Hidden sentence
        exceptionalType = 'hidden-sentence';
      } else if (randomValue < 0.50) {
        // 25% chance: Chorus highlight
        exceptionalType = 'chorus-highlight';
        exceptionalCount = Math.floor(Math.random() * 50) + 10; // Random count 10-60
      } else if (randomValue < 0.70 && chosuThought.trim()) {
        // 20% chance: Aligned reflection (only if thought exists)
        exceptionalType = 'aligned-reflection';
      } else if (randomValue < 0.85 && chosuThought.trim()) {
        // 15% chance: Unique perspective (only if thought exists)
        exceptionalType = 'unique-perspective';
      }
      
      const newChoseo: SessionChoseo = {
        id: `choseo-${Date.now()}`,
        text: chosuText,
        thought: chosuThought,
        timestamp: new Date(),
        ...(exceptionalType && {
          exceptional: {
            type: exceptionalType,
            count: exceptionalCount
          }
        })
      };
      
      setSessionChoseos(prev => [...prev, newChoseo]);
      setChosuText('');
      setChosuThought('');
      setShowChosuModal(false);
      
      // 토스트는 타이머 종료 시 SessionChoseoSummary에서 표시되므로 여기서는 표시하지 않음
    }
  };

  // --- Summary View ---
  if (showSummary) {
    return (
      <div className="max-w-md mx-auto min-h-screen flex flex-col bg-stone-50 text-slate-800 p-6 animate-fade-in">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 animate-bounce-gentle">
            <Trees className="w-12 h-12 text-emerald-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-800 mb-2">독서 완료!</h2>
          <p className="text-slate-500 mb-10">오늘도 숲이 조금 더 무성해졌어요</p>

          <div className="w-full bg-white rounded-2xl shadow-sm border border-stone-100 p-6 mb-6 space-y-6">
            <div className="flex justify-between items-center border-b border-stone-100 pb-4">
              <span className="text-slate-500">총 독서 시간</span>
              <span className="text-2xl font-mono font-medium text-emerald-600">{formatTime(seconds)}</span>
            </div>
            
            <div className="flex justify-between items-center border-b border-stone-100 pb-4">
              <span className="text-slate-500">기록한 초서</span>
              <span className="text-xl font-medium text-slate-800 flex items-center gap-2">
                {sessionChoseos.length} <span className="text-xs text-slate-400 font-normal">개</span>
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500">읽은 페이지</span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setPagesRead(Math.max(0, pagesRead - 1))}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
                >
                  -
                </button>
                <span className="text-xl font-medium text-slate-800 w-12 text-center">{pagesRead}</span>
                <button 
                  onClick={() => setPagesRead(pagesRead + 1)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full mb-8">
            <Sparkles className="w-4 h-4" />
            <span>새로운 나무가 자라나고 있어요</span>
          </div>
        </div>

        <button
          onClick={() => onComplete({ 
            book, 
            choseos: sessionChoseos, 
            sessionTime: seconds, 
            pagesRead 
          })}
          className="w-full bg-emerald-600 text-white py-4 rounded-xl font-medium shadow-lg shadow-emerald-200 active:scale-[0.98] transition-all"
        >
          확인
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen h-screen flex flex-col bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Fireflies - Live Readers */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {liveReaders.map((reader) => (
          <div
            key={reader.id}
            className="absolute pointer-events-auto cursor-pointer"
            style={{
              left: `${reader.position.x}%`,
              top: `${reader.position.y}%`,
              animation: `float ${3 + reader.delay}s ease-in-out infinite`,
              animationDelay: `${reader.delay}s`
            }}
            onClick={() => setSelectedFirefly(reader)}
          >
            {/* Firefly glow */}
            <div className="relative">
              <div className="w-3 h-3 rounded-full animate-ping opacity-75" style={{ background: '#00FF00' }}></div>
              <div className="absolute top-0 left-0 w-3 h-3 rounded-full blur-sm shadow-lg" style={{ background: '#00FF00', boxShadow: '0 0 20px rgba(0, 255, 0, 0.5)' }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Activity Info Panel */}
      {selectedFirefly && (
        <div 
          className="absolute top-24 left-6 right-6 z-30 bg-[#1a1a1a]/90 backdrop-blur-lg rounded-2xl p-4 border shadow-neon animate-fade-in"
          style={{ borderColor: 'rgba(0, 255, 0, 0.3)' }}
          onClick={() => setSelectedFirefly(null)}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold shadow-lg" style={{ background: 'linear-gradient(to bottom right, #00FF00, #00cc00)' }}>
              {selectedFirefly.name[0]}
            </div>
            <div className="flex-1">
              <div className="text-body-s font-medium text-white">{selectedFirefly.name}님</div>
              <div className="text-caption" style={{ color: '#00FF00' }}>📖 {selectedFirefly.book} 읽는 중</div>
            </div>
            <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#00FF00' }}></div>
          </div>
          <div className="text-caption text-neutral-400 mt-2">탭하여 닫기</div>
        </div>
      )}

      {/* Bottom Live Activity Summary */}
      <button
        onClick={() => setShowLiveActivity(!showLiveActivity)}
        className="absolute bottom-40 left-6 right-6 z-30 bg-[#1a1a1a]/80 backdrop-blur-md border rounded-2xl p-3 transition-all hover:bg-[#222222]/80"
        style={{ borderColor: 'rgba(0, 255, 0, 0.2)' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(0, 255, 0, 0.2)' }}>
              <Users className="w-4 h-4" style={{ color: '#00FF00' }} />
            </div>
            <div className="text-left">
              <div className="text-caption text-white font-medium">
                지금 클랜원 {liveReaders.length}명이 함께 읽고 있어요
              </div>
              <div className="text-caption text-neutral-500">
                전국 {totalReaders}명 독서 중
              </div>
            </div>
          </div>
          <div style={{ color: '#00FF00' }}>
            {showLiveActivity ? '▼' : '▲'}
          </div>
        </div>

        {showLiveActivity && (
          <div className="mt-3 pt-3 border-t space-y-2" style={{ borderColor: 'rgba(0, 255, 0, 0.2)' }}>
            {liveReaders.map((reader) => (
              <div key={reader.id} className="flex items-center gap-2 text-left">
                <div className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ background: '#00FF00' }}></div>
                <div className="flex-1">
                  <span className="text-caption text-white">{reader.name}님</span>
                  <span className="text-caption text-neutral-400 ml-1.5">· {reader.book}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </button>

      {/* Lock Status Header */}
      <header className="pt-8 pb-4 flex flex-col items-center justify-center animate-pulse">
        <div className="p-2 rounded-full mb-2 border" style={{ background: 'rgba(0, 255, 0, 0.1)', borderColor: 'rgba(0, 255, 0, 0.2)' }}>
          <Lock className="w-6 h-6" style={{ color: '#00FF00' }} />
        </div>
        <span className="text-caption tracking-widest uppercase" style={{ color: '#00FF00' }}>CHO_LOCK Mode</span>
      </header>

      {/* Main Content Area - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-10">
        {/* Book Cover (Dimmed) */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-black/40 rounded-lg z-10" />
          <img
            src={book.cover}
            alt={book.title}
            className="w-28 h-40 object-cover rounded-lg shadow-2xl opacity-80"
          />
        </div>

        {/* Timer Display */}
        <div className="text-center mb-12">
          <div className="text-7xl font-mono tracking-wider font-light mb-2 drop-shadow-lg text-neon-glow" style={{ color: '#00FF00', textShadow: '0 0 20px rgba(0, 255, 0, 0.8), 0 0 40px rgba(0, 255, 0, 0.5)' }}>
            {formatTime(seconds)}
          </div>
          <p className="text-body-s text-neutral-400">{book.title} 읽는 중...</p>
        </div>

        {/* Allowed Actions - The ONLY things you can do */}
        <div className="flex justify-center w-full max-w-xs">
          <button
            onClick={() => setShowChosuModal(true)}
            className="flex flex-col items-center gap-3 group"
          >
            <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border backdrop-blur flex items-center justify-center group-active:bg-[#222222] transition-all shadow-neon" style={{ borderColor: 'rgba(0, 255, 0, 0.3)' }}>
              <PenTool className="w-7 h-7" style={{ color: '#00FF00' }} />
            </div>
            <span className="text-caption text-neutral-400">초서</span>
          </button>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="p-8 pb-12 bg-gradient-to-t from-black/20 to-transparent">
        {/* Pause Button (Subtle) */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="text-body-s flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/5 transition-colors"
            style={{ color: 'rgb(115, 115, 115)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#00FF00'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(115, 115, 115)'}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            <span>{isPaused ? '독서 재개' : '잠시 멈춤'}</span>
          </button>
        </div>

        {/* Slide to Unlock - Always visible at bottom */}
        <div className="relative w-full max-w-xs mx-auto h-14 bg-[#1a1a1a] border rounded-full overflow-hidden shadow-inner" style={{ borderColor: 'rgba(0, 255, 0, 0.2)' }}>
          <div 
            className="absolute left-0 top-0 h-full transition-all duration-100"
            style={{ 
              width: `${Math.max(15, sliderPosition)}%`,
              background: 'linear-gradient(to right, rgba(0, 255, 0, 0.8), rgba(0, 255, 0, 0.6))'
            }}
          />
          
          {/* Slider Handle Icon */}
          <div 
            className="absolute top-1 bottom-1 w-12 rounded-full shadow-neon flex items-center justify-center transition-all duration-100 pointer-events-none z-10"
            style={{ 
              left: `calc(${sliderPosition}% - ${sliderPosition * 0.5}px)`,
              background: '#00FF00'
            }}
          >
            <span className="text-black font-bold">››</span>
          </div>

          <div className="text-body-s absolute inset-0 flex items-center justify-center text-neutral-500 font-medium pointer-events-none pl-8">
            밀어서 독서 완료
          </div>
          
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={handleSliderChange}
            onMouseUp={handleSliderComplete}
            onTouchEnd={handleSliderComplete}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
          />
        </div>
      </div>

      {/* Chosu Modal */}
      {showChosuModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-end justify-center z-50">
          <div className="bg-[#1a1a1a] text-white rounded-t-3xl w-full max-w-md p-6 animate-slide-up shadow-2xl border-t" style={{ borderColor: 'rgba(0, 255, 0, 0.2)' }}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-h2" style={{ color: '#00FF00' }}>초서 남기기</h3>
              <button onClick={() => setShowChosuModal(false)} className="text-neutral-500 hover:text-white">✕</button>
            </div>
            <textarea
              value={chosuText}
              onChange={(e) => setChosuText(e.target.value)}
              placeholder="책 속의 문장을 기록하세요..."
              className="text-body-m w-full bg-[#121212] border border-neutral-800 rounded-xl p-4 mb-6 min-h-40 resize-none leading-relaxed focus:outline-none focus:ring-0 text-neutral-200 placeholder:text-neutral-600"
              style={{}}
              onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(0, 255, 0, 0.5)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'rgb(38, 38, 38)'}
            />
            <textarea
              value={chosuThought}
              onChange={(e) => setChosuThought(e.target.value)}
              placeholder="이해한 내용을 간단히 적어보세요..."
              className="text-body-m w-full bg-[#121212] border border-neutral-800 rounded-xl p-4 mb-6 min-h-40 resize-none leading-relaxed focus:outline-none focus:ring-0 text-neutral-200 placeholder:text-neutral-600"
              onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(0, 255, 0, 0.5)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'rgb(38, 38, 38)'}
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowChosuModal(false);
                  setChosuText('');
                  setChosuThought('');
                }}
                className="text-body-s flex-1 py-4 bg-[#121212] border border-neutral-800 text-neutral-400 rounded-xl font-medium hover:bg-[#222222] transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleChosuSubmit}
                className="text-body-s flex-1 py-4 text-black rounded-xl font-medium transition-colors shadow-neon"
                style={{ background: '#00FF00' }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#33FF33'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#00FF00'}
              >
                기록하기
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Exceptional Choseo Toast */}
      {exceptionalToast?.show && (
        <ExceptionalChoseoToast
          type={exceptionalToast.type}
          count={exceptionalToast.count}
          onClose={() => setExceptionalToast(null)}
        />
      )}
    </div>
  );
}
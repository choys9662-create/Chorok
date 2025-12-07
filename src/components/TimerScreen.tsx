import { useState, useEffect } from 'react';
import { Book } from '../App';
import { mockBooks } from '../data/mockData';
import { Camera, PenTool, FileText, Pause, Play, Lock, ArrowLeft, Plus, Check, Trees, Sparkles } from 'lucide-react';

interface TimerScreenProps {
  book: Book | null;
  onComplete: () => void;
  onBack: () => void;
  onBookSelect: (book: Book) => void;
}

export function TimerScreen({ book, onComplete, onBack, onBookSelect }: TimerScreenProps) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [showChosuModal, setShowChosuModal] = useState(false);
  const [chosuText, setChosuText] = useState('');
  const [sliderPosition, setSliderPosition] = useState(0);
  
  // Session Summary State
  const [showSummary, setShowSummary] = useState(false);
  const [pagesRead, setPagesRead] = useState(0);
  const [chosuCount, setChosuCount] = useState(0);

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
      <div className="max-w-md mx-auto min-h-screen h-screen flex flex-col bg-gradient-to-b from-green-900 to-emerald-950 text-white relative overflow-hidden">
        {/* Header */}
        <header className="p-6 flex items-center">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6 text-green-100" />
          </button>
          <h1 className="text-lg font-medium ml-4">읽을 책 선택</h1>
        </header>

        {/* Selection Content */}
        <div className="flex-1 px-6 overflow-y-auto pb-10">
          <p className="text-green-200/70 text-sm mb-6 text-center">
            집중 모드를 시작할 책을 선택해주세요
          </p>

          {/* Current Reading List */}
          <div className="grid grid-cols-2 gap-4">
            {readingBooks.map((b) => (
              <button
                key={b.id}
                onClick={() => onBookSelect(b)}
                className="flex flex-col items-center bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-emerald-500/50 transition-all active:scale-95"
              >
                <img
                  src={b.cover}
                  alt={b.title}
                  className="w-24 h-36 object-cover rounded-lg shadow-lg mb-3"
                />
                <h3 className="text-sm font-medium text-center truncate w-full">{b.title}</h3>
                <p className="text-xs text-green-200/60 text-center truncate w-full">{b.author}</p>
                <div className="mt-2 w-full bg-white/10 rounded-full h-1">
                  <div 
                    className="bg-emerald-500 h-1 rounded-full" 
                    style={{ width: `${(b.currentPage / b.totalPages) * 100}%` }}
                  />
                </div>
              </button>
            ))}
            
            {/* Add New Book Placeholder */}
            <button
              className="flex flex-col items-center justify-center bg-white/5 border border-white/10 border-dashed rounded-xl p-4 hover:bg-white/10 transition-all min-h-[200px]"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-2">
                <Plus className="w-6 h-6 text-green-200" />
              </div>
              <span className="text-sm text-green-200/80">새 책 읽기</span>
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

  const handleSliderEnd = () => {
    if (sliderPosition > 80) {
      setShowSummary(true); // Show summary instead of completing immediately
    } else {
      setSliderPosition(0);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  const handleChosuSubmit = () => {
    if (chosuText.trim()) {
      setChosuCount(prev => prev + 1);
      setChosuText('');
      setShowChosuModal(false);
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
                {chosuCount} <span className="text-xs text-slate-400 font-normal">개</span>
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
          onClick={onComplete}
          className="w-full bg-emerald-600 text-white py-4 rounded-xl font-medium shadow-lg shadow-emerald-200 active:scale-[0.98] transition-all"
        >
          확인
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen h-screen flex flex-col bg-gradient-to-b from-green-900 to-emerald-950 text-white relative overflow-hidden">
      {/* Lock Status Header */}
      <header className="pt-8 pb-4 flex flex-col items-center justify-center animate-pulse">
        <div className="bg-white/10 p-2 rounded-full mb-2">
          <Lock className="w-6 h-6 text-green-300" />
        </div>
        <span className="text-xs text-green-300 tracking-widest uppercase">CHO_LOCK Mode</span>
      </header>

      {/* Main Content Area - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-10">
        {/* Book Cover (Dimmed) */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-green-900/40 rounded-lg z-10" />
          <img
            src={book.cover}
            alt={book.title}
            className="w-28 h-40 object-cover rounded-lg shadow-2xl opacity-80"
          />
        </div>

        {/* Timer Display */}
        <div className="text-center mb-12">
          <div className="text-7xl font-mono tracking-wider font-light mb-2 text-white drop-shadow-lg">
            {formatTime(seconds)}
          </div>
          <p className="text-green-200/70 text-sm">{book.title} 읽는 중...</p>
        </div>

        {/* Allowed Actions - The ONLY things you can do */}
        <div className="grid grid-cols-3 gap-6 w-full max-w-xs">
          <button
            onClick={() => setShowChosuModal(true)}
            className="flex flex-col items-center gap-3 group"
          >
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur flex items-center justify-center group-active:bg-white/20 transition-all border border-white/10">
              <PenTool className="w-7 h-7 text-white" />
            </div>
            <span className="text-xs text-green-100/80">초서</span>
          </button>
          
          <button
            className="flex flex-col items-center gap-3 group"
          >
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur flex items-center justify-center group-active:bg-white/20 transition-all border border-white/10">
              <Camera className="w-7 h-7 text-white" />
            </div>
            <span className="text-xs text-green-100/80">사진</span>
          </button>

          <button
            className="flex flex-col items-center gap-3 group"
          >
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur flex items-center justify-center group-active:bg-white/20 transition-all border border-white/10">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <span className="text-xs text-green-100/80">글쓰기</span>
          </button>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="p-8 pb-12 bg-gradient-to-t from-black/20 to-transparent">
        {/* Pause Button (Subtle) */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-2 text-green-200/60 hover:text-white text-sm px-4 py-2 rounded-full hover:bg-white/5 transition-colors"
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            <span>{isPaused ? '독서 재개' : '잠시 멈춤'}</span>
          </button>
        </div>

        {/* Slide to Unlock - Always visible at bottom */}
        <div className="relative w-full max-w-xs mx-auto h-14 bg-white/10 backdrop-blur-md rounded-full overflow-hidden border border-white/10 shadow-inner">
          <div 
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500/80 to-emerald-500/80 transition-all duration-100"
            style={{ width: `${Math.max(15, sliderPosition)}%` }} // Min width for handle visibility
          />
          
          {/* Slider Handle Icon */}
          <div 
            className="absolute top-1 bottom-1 w-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-100 pointer-events-none z-10"
            style={{ left: `calc(${sliderPosition}% - ${sliderPosition * 0.5}px)` }} // Approximate centering adjustment
          >
            <span className="text-emerald-600">››</span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center text-white/40 text-sm font-medium pointer-events-none pl-8">
            밀어서 독서 완료
          </div>
          
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={handleSliderChange}
            onMouseUp={handleSliderEnd}
            onTouchEnd={handleSliderEnd}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
          />
        </div>
      </div>

      {/* Chosu Modal */}
      {showChosuModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-end justify-center z-50">
          <div className="bg-stone-100 text-gray-900 rounded-t-3xl w-full max-w-md p-6 animate-slide-up shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-serif">초서 남기기</h3>
              <button onClick={() => setShowChosuModal(false)} className="text-gray-500">✕</button>
            </div>
            <textarea
              value={chosuText}
              onChange={(e) => setChosuText(e.target.value)}
              placeholder="책 속의 문장을 기록하세요..."
              className="w-full bg-white border border-stone-200 rounded-xl p-4 mb-6 min-h-40 resize-none text-lg font-serif leading-relaxed focus:outline-none focus:border-stone-400 focus:ring-0"
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowChosuModal(false);
                  setChosuText('');
                }}
                className="flex-1 py-4 bg-stone-200 text-stone-600 rounded-xl font-medium"
              >
                취소
              </button>
              <button
                onClick={handleChosuSubmit}
                className="flex-1 py-4 bg-emerald-700 text-white rounded-xl font-medium hover:bg-emerald-800 transition-colors"
              >
                기록하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
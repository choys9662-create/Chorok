import { Book } from '../App';
import { BookOpen, ArrowRight, Heart, Share2, Edit3, Sparkles, MessageCircle, Leaf, Star, TrendingUp } from 'lucide-react';
import { ExceptionalBadge } from './ExceptionalBadge';
import { ExceptionalChoseoToast, ExceptionalType } from './ExceptionalChoseoToast';
import { useState, useEffect } from 'react';

interface Choseo {
  id: string;
  text: string;
  thought: string;
  timestamp: Date;
  exceptional?: {
    type: ExceptionalType;
    count?: number;
  };
}

interface SessionChoseoSummaryProps {
  book: Book;
  choseos: Choseo[];
  sessionTime: number;
  pagesRead: number;
  onComplete: () => void;
}

export function SessionChoseoSummary({ book, choseos, sessionTime, pagesRead, onComplete }: SessionChoseoSummaryProps) {
  const [currentToastIndex, setCurrentToastIndex] = useState<number | null>(null);
  
  // Extract exceptional choseos for toasts
  const exceptionalChoseos = choseos
    .filter(c => c.exceptional)
    .map(c => c.exceptional!);
  
  // Show toasts sequentially on mount
  useEffect(() => {
    if (exceptionalChoseos.length === 0) return;
    
    // Start with first toast after a short delay
    const initialTimer = setTimeout(() => {
      setCurrentToastIndex(0);
    }, 800); // Delay to let screen settle
    
    return () => clearTimeout(initialTimer);
  }, []);
  
  // Handle toast closing and showing next one
  const handleToastClose = () => {
    if (currentToastIndex === null) return;
    
    const nextIndex = currentToastIndex + 1;
    if (nextIndex < exceptionalChoseos.length) {
      // Show next toast after a brief pause
      setTimeout(() => {
        setCurrentToastIndex(nextIndex);
      }, 500);
    } else {
      // All toasts shown
      setCurrentToastIndex(null);
    }
  };
  
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Generate qualitative insights based on session data
  const generateInsights = () => {
    const insights = [];
    const minutes = Math.floor(sessionTime / 60);
    const choseoDensity = pagesRead > 0 ? choseos.length / pagesRead : 0;

    // Always show at least one motivational message
    if (minutes >= 30) {
      insights.push({
        icon: TrendingUp,
        title: '집중력',
        message: '오늘은 집중이 잘 됐나 봐요! 긴 호흡으로 깊이 읽으셨어요 👏',
        gradient: 'from-violet-100 to-purple-50',
        iconColor: 'text-violet-600',
        iconBg: 'bg-violet-100'
      });
    } else if (minutes >= 15) {
      insights.push({
        icon: Sparkles,
        title: '꾸준함',
        message: '오늘도 책과 함께하셨네요! 매일 조금씩, 멋져요 ✨',
        gradient: 'from-emerald-100 to-teal-50',
        iconColor: 'text-emerald-600',
        iconBg: 'bg-emerald-100'
      });
    } else if (minutes >= 5) {
      insights.push({
        icon: Star,
        title: '시작',
        message: '짧아도 괜찮아요. 시작했다는 게 중요해요! 🌟',
        gradient: 'from-amber-100 to-yellow-50',
        iconColor: 'text-amber-600',
        iconBg: 'bg-amber-100'
      });
    } else {
      insights.push({
        icon: Heart,
        title: '응원',
        message: '책을 펼쳤다는 것만으로도 대단해요! 💚',
        gradient: 'from-rose-100 to-pink-50',
        iconColor: 'text-rose-600',
        iconBg: 'bg-rose-100'
      });
    }

    // Choseo-based insights
    if (choseos.length >= 5) {
      insights.push({
        icon: Sparkles,
        title: '초서왕',
        message: `${choseos.length}개의 문장에 마음이 갔네요! 감성이 풍부하신 분 ✍️`,
        gradient: 'from-rose-100 to-pink-50',
        iconColor: 'text-rose-600',
        iconBg: 'bg-rose-100'
      });
    } else if (choseos.length >= 3) {
      insights.push({
        icon: MessageCircle,
        title: '발견',
        message: '여러 문장을 발견하셨네요! 이 책과 잘 맞으시는 것 같아요 💬',
        gradient: 'from-blue-100 to-cyan-50',
        iconColor: 'text-blue-600',
        iconBg: 'bg-blue-100'
      });
    } else if (choseos.length >= 1) {
      insights.push({
        icon: Heart,
        title: '공감',
        message: '마음에 와닿는 문장을 찾으셨군요! 소중한 기록이에요 📝',
        gradient: 'from-fuchsia-100 to-pink-50',
        iconColor: 'text-fuchsia-600',
        iconBg: 'bg-fuchsia-100'
      });
    }

    // Reading style insight
    if (pagesRead >= 10) {
      insights.push({
        icon: TrendingUp,
        title: '독서량',
        message: `${pagesRead}페이지나! 오늘 독서 페이스가 빠르네요 🚀`,
        gradient: 'from-indigo-100 to-blue-50',
        iconColor: 'text-indigo-600',
        iconBg: 'bg-indigo-100'
      });
    } else if (pagesRead >= 1 && choseoDensity >= 0.5) {
      insights.push({
        icon: Leaf,
        title: '정독',
        message: '한 페이지 한 페이지 곱씹으며 읽고 계시네요. 정독형 독자! 🌿',
        gradient: 'from-teal-100 to-emerald-50',
        iconColor: 'text-teal-600',
        iconBg: 'bg-teal-100'
      });
    }

    return insights;
  };

  const insights = generateInsights();

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDFDFD] pb-36">
      {/* Header */}
      <header className="px-6 pt-8 pb-6 bg-gradient-to-b from-emerald-50 to-transparent">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">독서 완료!</h1>
          <p className="text-slate-500 text-sm">오늘의 독서 기록을 확인해보세요</p>
        </div>

        {/* Session Stats */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-100">
            <img 
              src={book.cover} 
              alt={book.title}
              className="w-16 h-24 object-cover rounded-lg shadow-md"
            />
            <div className="flex-1">
              <h3 className="font-bold text-slate-800 mb-1">{book.title}</h3>
              <p className="text-xs text-slate-500">{book.author}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-emerald-600">{formatTime(sessionTime)}</p>
              <p className="text-xs text-slate-500 mt-1">독서 시간</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{pagesRead}</p>
              <p className="text-xs text-slate-500 mt-1">읽은 페이지</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{choseos.length}</p>
              <p className="text-xs text-slate-500 mt-1">초서 개수</p>
            </div>
          </div>
        </div>
      </header>

      {/* Qualitative Insights - Horizontal Scrollable Cards */}
      <div className="px-6 mb-8 -mt-2">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory">
          {insights.map((insight, index) => {
            const IconComponent = insight.icon;
            return (
              <div
                key={index}
                className={`flex-shrink-0 w-[85%] bg-gradient-to-br ${insight.gradient} rounded-2xl p-5 shadow-sm border border-white/60 snap-center`}
              >
                <div className="flex items-start gap-3">
                  <div className={`${insight.iconBg} rounded-xl p-2.5 flex-shrink-0`}>
                    <IconComponent className={`w-5 h-5 ${insight.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-600 mb-1.5">{insight.title}</p>
                    <p className="text-sm text-slate-800 leading-relaxed">
                      {insight.message}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Choseos List */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800">이번 세션 초서</h2>
          <span className="text-sm text-slate-500">{choseos.length}개</span>
        </div>

        {choseos.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Edit3 className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-slate-500 text-sm">이번 세션에 작성한 초서가 없어요</p>
          </div>
        ) : (
          <div className="space-y-4">
            {choseos.map((choseo, index) => (
              <div 
                key={choseo.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow relative"
              >
                {/* Exceptional Badge */}
                {choseo.exceptional && (
                  <div className="absolute top-3 right-3">
                    <ExceptionalBadge type={choseo.exceptional.type} count={choseo.exceptional.count} />
                  </div>
                )}

                {/* Choseo Number Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    초서 #{index + 1}
                  </span>
                  <span className="text-xs text-slate-400">
                    {choseo.timestamp.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {/* Quote */}
                <div className="bg-stone-50 rounded-xl p-4 mb-3 relative">
                  <div className="absolute top-2 left-2 text-stone-200 text-3xl font-serif leading-none select-none">"</div>
                  <p className="text-slate-700 text-sm leading-relaxed font-serif italic relative z-10 pt-2 px-1">
                    {choseo.text}
                  </p>
                </div>

                {/* Thought */}
                {choseo.thought && (
                  <div className="pl-4 border-l-[3px] border-emerald-200 py-1">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {choseo.thought}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-100">
                  <button className="flex items-center gap-1 text-slate-400 hover:text-rose-500 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span className="text-xs">0</span>
                  </button>
                  <button className="flex items-center gap-1 text-slate-400 hover:text-blue-500 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Complete Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-gradient-to-t from-white via-white to-transparent z-[60] pb-28">
        <button
          onClick={onComplete}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span>홈으로 돌아가기</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
      
      {/* Exceptional Choseo Toasts - Show sequentially */}
      {currentToastIndex !== null && exceptionalChoseos[currentToastIndex] && (
        <ExceptionalChoseoToast
          type={exceptionalChoseos[currentToastIndex].type}
          count={exceptionalChoseos[currentToastIndex].count}
          onClose={handleToastClose}
          autoHideDuration={4000}
        />
      )}
    </div>
  );
}
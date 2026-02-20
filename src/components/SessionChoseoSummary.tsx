import { Book } from '../App';
import { BookOpen, ArrowRight, Heart, Share2, Edit3, Sparkles, MessageCircle, Leaf, Star, TrendingUp, Award, Zap, Clock, FileText, Users, Target, ArrowLeft } from 'lucide-react';
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
  const [showStats, setShowStats] = useState(false);
  
  // Extract exceptional choseos for toasts
  const exceptionalChoseos = choseos
    .filter(c => c.exceptional)
    .map(c => c.exceptional!);
  
  // Show toasts sequentially on mount
  useEffect(() => {
    if (exceptionalChoseos.length === 0) return;
    
    const initialTimer = setTimeout(() => {
      setCurrentToastIndex(0);
    }, 800);
    
    return () => clearTimeout(initialTimer);
  }, []);

  // Show stats with delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStats(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  
  // Handle toast closing and showing next one
  const handleToastClose = () => {
    if (currentToastIndex === null) return;
    
    const nextIndex = currentToastIndex + 1;
    if (nextIndex < exceptionalChoseos.length) {
      setTimeout(() => {
        setCurrentToastIndex(nextIndex);
      }, 500);
    } else {
      setCurrentToastIndex(null);
    }
  };
  
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    if (hours > 0) {
      return `${hours}시간 ${minutes}분`;
    }
    return `${minutes}분 ${secs}초`;
  };

  // Calculate session quality score (0-100)
  const calculateQualityScore = () => {
    let score = 0;
    const minutes = Math.floor(sessionTime / 60);
    
    score += Math.min(40, minutes * 1.3);
    score += Math.min(40, choseos.length * 8);
    score += Math.min(20, pagesRead * 2);
    
    return Math.min(100, Math.round(score));
  };

  const qualityScore = calculateQualityScore();
  const minutes = Math.floor(sessionTime / 60);
  const sunPoints = Math.floor(sessionTime / 60) * 10 + choseos.length * 25 + pagesRead * 5;

  // Get quality message based on score
  const getQualityMessage = () => {
    if (qualityScore >= 90) return { text: '완벽한 독서 세션!', emoji: '🏆', color: 'text-lime-400' };
    if (qualityScore >= 75) return { text: '훌륭한 독서였어요', emoji: '⭐', color: 'text-lime-400' };
    if (qualityScore >= 50) return { text: '좋은 시작이에요', emoji: '✨', color: 'text-lime-400' };
    return { text: '책과 만난 시간', emoji: '📖', color: 'text-lime-400' };
  };

  const qualityMessage = getQualityMessage();

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#0a0a0a] text-white pb-32 relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{ background: 'rgba(0, 255, 0, 0.2)' }}></div>
        <div className="absolute bottom-40 right-10 w-80 h-80 rounded-full blur-3xl animate-pulse" style={{ background: 'rgba(0, 255, 0, 0.1)', animationDelay: '1s' }}></div>
      </div>

      {/* Header with quality score */}
      <header className="px-6 pt-10 pb-8 relative z-10">
        <div className="text-center mb-8">
          {/* Quality score circle */}
          <div className={`w-32 h-32 mx-auto mb-6 rounded-full bg-[#121212] border-4 flex items-center justify-center backdrop-blur-sm transition-all duration-1000 shadow-neon ${showStats ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} style={{ borderColor: 'rgba(0, 255, 0, 0.4)' }}>
            <div className="text-center">
              <div className="text-display mb-1" style={{ color: '#00FF00' }}>{qualityScore}</div>
              <div className="text-caption uppercase tracking-wider" style={{ color: '#00FF00' }}>점수</div>
            </div>
          </div>
          
          <h1 className={`text-h1 text-white mb-2 transition-all duration-700 delay-200 ${showStats ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            {qualityMessage.emoji} {qualityMessage.text}
          </h1>
          <p className={`text-body-s text-neutral-400 transition-all duration-700 delay-300 ${showStats ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            {book.title}와 함께한 시간
          </p>
        </div>

        {/* Main stats grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className={`bg-[#1a1a1a] border border-neutral-800 rounded-2xl p-4 text-center transition-all duration-500 delay-400 ${showStats ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <Clock className="w-6 h-6 mx-auto mb-2" style={{ color: '#00FF00' }} />
            <div className="text-h2 text-white mb-1">{minutes}<span className="text-body-s">분</span></div>
            <div className="text-caption text-neutral-500">독서 시간</div>
          </div>
          
          <div className={`bg-[#1a1a1a] border border-neutral-800 rounded-2xl p-4 text-center transition-all duration-500 delay-500 ${showStats ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <FileText className="w-6 h-6 mx-auto mb-2" style={{ color: '#00FF00' }} />
            <div className="text-h2 text-white mb-1">{pagesRead}<span className="text-body-s">p</span></div>
            <div className="text-caption text-neutral-500">읽은 페이지</div>
          </div>
          
          <div className={`bg-[#1a1a1a] border border-neutral-800 rounded-2xl p-4 text-center transition-all duration-500 delay-600 ${showStats ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <Sparkles className="w-6 h-6 mx-auto mb-2" style={{ color: '#00FF00' }} />
            <div className="text-h2 text-white mb-1">{choseos.length}<span className="text-body-s">개</span></div>
            <div className="text-caption text-neutral-500">초서</div>
          </div>
        </div>

        {/* Rewards section */}
        <div className={`bg-[#1a1a1a] border rounded-2xl p-5 transition-all duration-700 delay-700 ${showStats ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ borderColor: 'rgba(0, 255, 0, 0.3)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(0, 255, 0, 0.2)' }}>
                <Zap className="w-6 h-6" style={{ color: '#00FF00' }} />
              </div>
              <div>
                <div className="text-caption text-neutral-400 mb-1">획득 햇살</div>
                <div className="text-h2" style={{ color: '#00FF00' }}>+{sunPoints} ☀️</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-caption text-neutral-400 mb-1">클랜 기여</div>
              <div className="text-h3" style={{ color: '#00FF00' }}>+{minutes}분</div>
            </div>
          </div>
        </div>
      </header>

      {/* Session insights */}
      <div className="px-6 mb-8 relative z-10">
        <h2 className="text-h3 text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5" style={{ color: '#00FF00' }} />
          이번 세션 하이라이트
        </h2>
        
        <div className="space-y-3">
          {minutes >= 25 && (
            <div className="bg-[#1a1a1a] border rounded-xl p-4 flex items-start gap-3" style={{ borderColor: 'rgba(0, 255, 0, 0.2)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0, 255, 0, 0.1)' }}>
                <TrendingUp className="w-5 h-5" style={{ color: '#00FF00' }} />
              </div>
              <div className="flex-1">
                <div className="text-body-s font-medium text-white mb-1">깊은 집중</div>
                <div className="text-caption text-neutral-400 leading-relaxed">
                  25분 이상 집중하셨어요! 오늘은 몰입도가 높았네요 🎯
                </div>
              </div>
            </div>
          )}

          {choseos.length >= 3 && (
            <div className="bg-[#1a1a1a] border rounded-xl p-4 flex items-start gap-3" style={{ borderColor: 'rgba(0, 255, 0, 0.2)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0, 255, 0, 0.1)' }}>
                <Sparkles className="w-5 h-5" style={{ color: '#00FF00' }} />
              </div>
              <div className="flex-1">
                <div className="text-body-s font-medium text-white mb-1">사색의 흔적</div>
                <div className="text-caption text-neutral-400 leading-relaxed">
                  {choseos.length}개의 문���이 마음에 닿았네요. 감성이 풍부하신 분 ✨
                </div>
              </div>
            </div>
          )}

          {pagesRead >= 10 && (
            <div className="bg-[#1a1a1a] border rounded-xl p-4 flex items-start gap-3" style={{ borderColor: 'rgba(0, 255, 0, 0.2)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0, 255, 0, 0.1)' }}>
                <Award className="w-5 h-5" style={{ color: '#00FF00' }} />
              </div>
              <div className="flex-1">
                <div className="text-body-s font-medium text-white mb-1">빠른 페이스</div>
                <div className="text-caption text-neutral-400 leading-relaxed">
                  {pagesRead}페이지! 오늘은 독서 속도가 빨랐어요 🚀
                </div>
              </div>
            </div>
          )}

          {exceptionalChoseos.length > 0 && (
            <div className="bg-[#1a1a1a] border rounded-xl p-4 flex items-start gap-3" style={{ borderColor: 'rgba(0, 255, 0, 0.3)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0, 255, 0, 0.2)' }}>
                <Star className="w-5 h-5" style={{ color: '#00FF00' }} />
              </div>
              <div className="flex-1">
                <div className="text-body-s font-medium mb-1" style={{ color: '#00FF00' }}>특별한 순간 발견!</div>
                <div className="text-caption text-neutral-400 leading-relaxed">
                  Exceptional 초서 {exceptionalChoseos.length}개를 작성했어요 🌟
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Choseos List */}
      {choseos.length > 0 && (
        <div className="px-6 mb-8 relative z-10">
          <h2 className="text-h3 text-white mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Edit3 className="w-5 h-5" style={{ color: '#00FF00' }} />
              기록한 초서
            </span>
            <span className="text-body-s text-neutral-500">{choseos.length}개</span>
          </h2>
          
          <div className="space-y-4">
            {choseos.map((choseo, index) => (
              <div 
                key={choseo.id}
                className="bg-[#1a1a1a] border border-neutral-800 rounded-2xl p-5 transition-all relative hover:border-[rgba(0,255,0,0.3)]"
              >
                {/* Exceptional Badge */}
                {choseo.exceptional && (
                  <div className="absolute top-3 right-3 z-10">
                    <ExceptionalBadge type={choseo.exceptional.type} count={choseo.exceptional.count} />
                  </div>
                )}

                {/* Choseo Number */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-caption font-bold px-3 py-1 rounded-full border" style={{ color: '#00FF00', background: 'rgba(0, 255, 0, 0.1)', borderColor: 'rgba(0, 255, 0, 0.2)' }}>
                    #{index + 1}
                  </span>
                  <span className="text-caption text-neutral-600">
                    {choseo.timestamp.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {/* Quote */}
                <div className="bg-[#121212] border border-neutral-800 rounded-xl p-4 mb-3">
                  <p className="text-body-s text-neutral-200 leading-relaxed">
                    "{choseo.text}"
                  </p>
                </div>

                {/* Thought */}
                {choseo.thought && (
                  <div className="pl-4 border-l-2" style={{ borderColor: 'rgba(0, 255, 0, 0.3)' }}>
                    <p className="text-caption text-neutral-400 leading-relaxed">
                      💭 {choseo.thought}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-4 mt-4 pt-3 border-t border-neutral-800">
                  <button className="flex items-center gap-1.5 text-neutral-500 transition-colors hover:text-[#00FF00]">
                    <Heart className="w-4 h-4" />
                    <span className="text-caption">좋아요</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-neutral-500 transition-colors hover:text-[#00FF00]">
                    <Share2 className="w-4 h-4" />
                    <span className="text-caption">공유</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {choseos.length === 0 && (
        <div className="px-6 mb-8 relative z-10">
          <div className="bg-[#1a1a1a] border border-neutral-800 rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-[#121212] rounded-full flex items-center justify-center mx-auto mb-4">
              <Edit3 className="w-8 h-8 text-neutral-700" />
            </div>
            <p className="text-body-s text-neutral-400">이번 세션에 작성한 초서가 없어요</p>
            <p className="text-caption text-neutral-600 mt-2">다음엔 마음에 드는 문장을 기록해보세요</p>
          </div>
        </div>
      )}

      {/* Complete Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent z-[60] pb-28">
        <button
          onClick={onComplete}
          className="text-body-s w-full text-black py-4 rounded-xl font-bold shadow-neon hover:shadow-neon-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          style={{ background: '#00FF00' }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#33FF33'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#00FF00'}
        >
          <span>홈으로 돌아가기</span>
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>
      
      {/* Exceptional Choseo Toasts */}
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
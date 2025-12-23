import { useState } from 'react';
import { Book } from '../App';
import { Sparkles, BookMarked, Heart, Star, ArrowRight, X } from 'lucide-react';

interface BookReflectionProps {
  book: Book;
  onComplete: (reflection: ReflectionData) => void;
  onSkip: () => void;
}

export interface ReflectionData {
  favoriteSentence: string;
  memorableScene: string;
  beforeAfter: string;
  rating: number;
  recommendation: string;
}

export function BookReflection({ book, onComplete, onSkip }: BookReflectionProps) {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [reflection, setReflection] = useState<Partial<ReflectionData>>({
    rating: 0,
  });

  const handleComplete = () => {
    if (reflection.favoriteSentence && reflection.memorableScene && rating > 0) {
      onComplete({
        ...reflection,
        rating,
      } as ReflectionData);
    }
  };

  const totalSteps = 4;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center max-w-md mx-auto">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onSkip} />
      <div className="relative w-full bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-6 pb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">완독 회고</h2>
                  <p className="text-sm text-white/80">책과의 여정을 기록해보세요</p>
                </div>
              </div>
              <button onClick={onSkip} className="text-white/80 hover:text-white text-2xl leading-none">
                ×
              </button>
            </div>

            {/* Progress */}
            <div className="flex gap-1">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-1 rounded-full transition-all ${
                    i < step ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Book Info */}
        <div className="p-6 pb-4 border-b border-slate-100">
          <div className="flex gap-4">
            <img
              src={book.cover}
              alt={book.title}
              className="w-16 h-24 object-cover rounded-lg shadow-md"
            />
            <div className="flex-1">
              <h3 className="font-bold text-slate-800 mb-1">{book.title}</h3>
              <p className="text-sm text-slate-500 mb-2">{book.author}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-bold">
                  완독
                </span>
                <span className="text-xs text-slate-400">
                  {book.totalPages}페이지 · {Math.round((book.totalMinutes || 0) / 60)}시간
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {/* Step 1: Rating */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-800 mb-2">이 책을 평가해주세요</h3>
                <p className="text-sm text-slate-500 mb-4">솔직한 별점을 남겨주세요</p>
              </div>
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => {
                      setRating(star);
                      setReflection({ ...reflection, rating: star });
                    }}
                    className="transition-transform hover:scale-110 active:scale-95"
                  >
                    <Star
                      className={`w-12 h-12 ${
                        star <= rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-center text-sm text-slate-600 font-bold">
                  {rating === 5 && '최고의 책이에요! ⭐'}
                  {rating === 4 && '정말 좋았어요!'}
                  {rating === 3 && '괜찮았어요'}
                  {rating === 2 && '아쉬웠어요'}
                  {rating === 1 && '별로였어요'}
                </p>
              )}
            </div>
          )}

          {/* Step 2: Favorite Sentence */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-800 mb-2">가장 기억에 남는 문장은?</h3>
                <p className="text-sm text-slate-500 mb-4">마음에 새긴 한 문장을 적어주세요</p>
              </div>
              <textarea
                value={reflection.favoriteSentence || ''}
                onChange={(e) =>
                  setReflection({ ...reflection, favoriteSentence: e.target.value })
                }
                placeholder="예: 새는 알에서 나오려고 투쟁한다..."
                className="w-full h-32 p-4 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none text-sm"
              />
            </div>
          )}

          {/* Step 3: Memorable Scene */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-800 mb-2">가장 인상 깊었던 장면은?</h3>
                <p className="text-sm text-slate-500 mb-4">떠올리면 선명한 그 순간</p>
              </div>
              <textarea
                value={reflection.memorableScene || ''}
                onChange={(e) =>
                  setReflection({ ...reflection, memorableScene: e.target.value })
                }
                placeholder="어떤 장면이 가장 기억에 남나요?"
                className="w-full h-32 p-4 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none text-sm"
              />
            </div>
          )}

          {/* Step 4: Before & After */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-800 mb-2">이 책이 당신에게 남긴 것은?</h3>
                <p className="text-sm text-slate-500 mb-4">책을 읽기 전과 후, 무엇이 달라졌나요?</p>
              </div>
              <textarea
                value={reflection.beforeAfter || ''}
                onChange={(e) =>
                  setReflection({ ...reflection, beforeAfter: e.target.value })
                }
                placeholder="이 책은 나에게..."
                className="w-full h-32 p-4 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none text-sm"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 pt-4 border-t border-slate-100 space-y-3">
          <button
            onClick={() => {
              if (step < totalSteps) {
                setStep(step + 1);
              } else {
                handleComplete();
              }
            }}
            disabled={
              (step === 1 && rating === 0) ||
              (step === 2 && !reflection.favoriteSentence) ||
              (step === 3 && !reflection.memorableScene)
            }
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
          >
            {step < totalSteps ? '다음' : '회고 완료'}
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={onSkip}
            className="w-full text-slate-500 text-sm py-2 hover:text-slate-700 transition-colors"
          >
            나중에 하기
          </button>
        </div>
      </div>
    </div>
  );
}

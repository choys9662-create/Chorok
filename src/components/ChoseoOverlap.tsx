import { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Heart, Bookmark, Sparkles, TrendingUp, Lightbulb, MessageCircle } from 'lucide-react';
import { sortedOverlaps, calculateOverlap } from '../data/choseoOverlapData';
import { mockBooks } from '../data/mockData';
import { ExceptionalBadge } from './ExceptionalBadge';

interface ChoseoOverlapProps {
  onBack: () => void;
  onViewCluster: () => void;
}

export function ChoseoOverlap({ onBack, onViewCluster }: ChoseoOverlapProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentOverlap = sortedOverlaps[currentIndex];
  const book = mockBooks.find(b => b.id === currentOverlap.myChoseo.bookId);

  const goNext = () => {
    if (currentIndex < sortedOverlaps.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Calculate overlap for current pair
  const myOverlap = calculateOverlap(currentOverlap.myChoseo.text, currentOverlap.otherChoseo.text);
  const theirOverlap = calculateOverlap(currentOverlap.otherChoseo.text, currentOverlap.myChoseo.text);

  const overlapPercentage = Math.round(currentOverlap.overlapScore * 100);
  
  // Determine if reflection is similar (for demo, we'll check if overlap is high)
  const isReflectionSimilar = overlapPercentage >= 70;
  const isReflectionUnique = overlapPercentage < 30;

  // Vibe tag styling
  const getVibeStyle = (vibe?: string) => {
    switch (vibe) {
      case 'analytical':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'reflective':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'emotional':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'transformative':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'hopeful':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'minimalist':
        return 'bg-slate-50 text-slate-700 border-slate-200';
      case 'philosophical':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default:
        return 'bg-stone-50 text-stone-700 border-stone-200';
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 backdrop-blur-md z-40" style={{ background: 'rgba(0, 0, 0, 0.95)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={onBack}
              className="p-2 -ml-2 hover:bg-stone-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-700" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                {overlapPercentage}% 겹침
              </span>
              <button
                onClick={onViewCluster}
                className="text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors"
              >
                전체보기
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={goPrevious}
              disabled={currentIndex === 0}
              className="p-2 hover:bg-stone-100 rounded-full transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>

            <div className="text-center">
              <p className="text-xs text-slate-500 mb-1">다른 독자의 초서</p>
              <p className="font-bold text-slate-800">
                {currentIndex + 1} / {sortedOverlaps.length}
              </p>
            </div>

            <button
              onClick={goNext}
              disabled={currentIndex === sortedOverlaps.length - 1}
              className="p-2 hover:bg-stone-100 rounded-full transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronRight className="w-5 h-5 text-slate-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-6 py-6 pb-24">
        {/* Book Reference */}
        {book && (
          <div className="flex items-center gap-2 mb-6 px-2">
            <img src={book.cover} alt={book.title} className="w-8 h-11 object-cover rounded shadow-sm" />
            <div>
              <p className="text-xs font-bold text-slate-700">{book.title}</p>
              <p className="text-[10px] text-slate-500">p.{currentOverlap.myChoseo.page}</p>
            </div>
          </div>
        )}

        {/* My Quote Card */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2 px-1">
            <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-xs">🌿</span>
            </div>
            <span className="text-xs font-bold text-slate-600">내가 선택한 구절</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border-2 border-emerald-200 shadow-sm">
            <p className="text-sm leading-loose text-slate-800">
              {myOverlap.segments.map((segment, i) => (
                <span
                  key={i}
                  className={segment.isOverlap ? 'bg-emerald-100 px-1 rounded' : ''}
                >
                  {segment.text}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* Overlap Indicator */}
        <div className="flex justify-center my-4">
          <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full px-4 py-2 border border-emerald-200">
            <p className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              {overlapPercentage}% 일치
            </p>
          </div>
        </div>

        {/* Other User's Quote Card */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2 px-1">
            <div className="w-6 h-6 bg-stone-100 rounded-full flex items-center justify-center text-sm">
              {currentOverlap.otherChoseo.user.avatar}
            </div>
            <span className="text-xs font-bold text-slate-600">
              {currentOverlap.otherChoseo.user.name}
            </span>
            {currentOverlap.otherChoseo.user.vibe && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getVibeStyle(currentOverlap.otherChoseo.user.vibe)}`}>
                {currentOverlap.otherChoseo.user.vibe}
              </span>
            )}
          </div>

          <div className="bg-white rounded-2xl p-5 border-2 border-stone-200 shadow-sm">
            <p className="text-sm leading-loose text-slate-800">
              {theirOverlap.segments.map((segment, i) => (
                <span
                  key={i}
                  className={segment.isOverlap ? 'bg-teal-100 px-1 rounded' : 'text-slate-500'}
                >
                  {segment.text}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* Other User's Reflection */}
        <div className="bg-gradient-to-br from-stone-50 to-stone-100/50 rounded-2xl p-5 border border-stone-200/50 relative">
          {/* Similarity Badge */}
          {isReflectionSimilar && (
            <div className="absolute top-3 right-3">
              <ExceptionalBadge type="aligned-reflection" size="small" />
            </div>
          )}
          {isReflectionUnique && (
            <div className="absolute top-3 right-3">
              <ExceptionalBadge type="unique-perspective" size="small" />
            </div>
          )}
          
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-bold text-slate-700">
              {currentOverlap.otherChoseo.user.name}의 생각
            </span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            {currentOverlap.otherChoseo.thought}
          </p>

          {/* User Metadata */}
          <div className="flex items-center justify-between pt-3 border-t border-stone-200/50">
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                Lv.{currentOverlap.otherChoseo.user.level}
              </span>
              <span>{currentOverlap.otherChoseo.date}</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1 text-slate-400 hover:text-rose-500 transition-colors">
                <Heart className="w-4 h-4" />
                <span className="text-xs">{currentOverlap.otherChoseo.likes}</span>
              </button>
              <button className="text-slate-400 hover:text-amber-500 transition-colors">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Similar Minds Cluster - shown when reflection is similar */}
        {isReflectionSimilar && (
          <div className="mt-6 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-5 border border-teal-200/50">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-teal-100 rounded-full p-2">
                <MessageCircle className="w-4 h-4 text-teal-600" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-teal-900">Similar minds</h4>
                <p className="text-xs text-teal-700">Your thoughts are in sync with other readers</p>
              </div>
            </div>
            <p className="text-xs text-teal-800 leading-relaxed">
              You and {currentOverlap.otherChoseo.user.name} are seeing this passage in a similar way. {sortedOverlaps.length - 1} other readers also share similar reflections.
            </p>
          </div>
        )}

        {/* Light Reaction Buttons */}
        <div className="mt-6 flex gap-3">
          <button className="flex-1 bg-white border border-stone-200 rounded-xl py-3 flex items-center justify-center gap-2 hover:border-amber-300 hover:bg-amber-50 transition-all group">
            <span className="text-lg group-hover:scale-110 transition-transform">☀️</span>
            <span className="text-xs font-bold text-slate-700 group-hover:text-amber-700">공감해요</span>
          </button>
          <button className="flex-1 bg-white border border-stone-200 rounded-xl py-3 flex items-center justify-center gap-2 hover:border-emerald-300 hover:bg-emerald-50 transition-all group">
            <span className="text-lg group-hover:scale-110 transition-transform">🌱</span>
            <span className="text-xs font-bold text-slate-700 group-hover:text-emerald-700">새로워요</span>
          </button>
          <button className="flex-1 bg-white border border-stone-200 rounded-xl py-3 flex items-center justify-center gap-2 hover:border-blue-300 hover:bg-blue-50 transition-all group">
            <span className="text-lg group-hover:scale-110 transition-transform">💭</span>
            <span className="text-xs font-bold text-slate-700 group-hover:text-blue-700">생각중</span>
          </button>
        </div>

        {/* Insight Tip */}
        <div className="mt-6 p-4 bg-blue-50/50 rounded-xl border border-blue-200/30 flex gap-3">
          <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-blue-900 mb-1">다양한 관점을 만나보세요</p>
            <p className="text-xs text-blue-700 leading-relaxed">
              같은 구절도 독자마다 다르게 해석할 수 있어요. 좌우로 넘기며 여러 생각을 읽어보세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
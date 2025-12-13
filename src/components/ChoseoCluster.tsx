import { useState } from 'react';
import { ArrowLeft, Heart, Bookmark, TrendingUp, Shuffle, Flame, Search } from 'lucide-react';
import { sortedOverlaps } from '../data/choseoOverlapData';
import { mockBooks } from '../data/mockData';

interface ChoseoClusterProps {
  onBack: () => void;
  onSelectChoseo: (index: number) => void;
}

type FilterType = 'similar' | 'different' | 'popular';

export function ChoseoCluster({ onBack, onSelectChoseo }: ChoseoClusterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('similar');
  const book = mockBooks.find(b => b.id === sortedOverlaps[0].myChoseo.bookId);

  // Sort based on active filter
  const getSortedChoseos = () => {
    switch (activeFilter) {
      case 'similar':
        // Already sorted by overlap score (highest first)
        return sortedOverlaps;
      case 'different':
        // Reverse sort - lowest overlap first (most different perspectives)
        return [...sortedOverlaps].reverse();
      case 'popular':
        // Sort by likes
        return [...sortedOverlaps].sort((a, b) => b.otherChoseo.likes - a.otherChoseo.likes);
      default:
        return sortedOverlaps;
    }
  };

  const displayedChoseos = getSortedChoseos();

  // Get tag style based on overlap score
  const getOverlapTag = (score: number) => {
    const percentage = Math.round(score * 100);
    if (percentage >= 80) {
      return { label: '거의 동일', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
    } else if (percentage >= 50) {
      return { label: '많이 겹침', color: 'bg-teal-100 text-teal-700 border-teal-200' };
    } else if (percentage >= 30) {
      return { label: '부분 겹침', color: 'bg-blue-100 text-blue-700 border-blue-200' };
    } else {
      return { label: '조금 겹침', color: 'bg-stone-100 text-stone-700 border-stone-200' };
    }
  };

  // Get vibe icon
  const getVibeIcon = (vibe?: string) => {
    switch (vibe) {
      case 'analytical': return '🔍';
      case 'reflective': return '🤔';
      case 'emotional': return '💕';
      case 'transformative': return '🦋';
      case 'hopeful': return '🌅';
      case 'minimalist': return '✨';
      case 'philosophical': return '🧠';
      default: return '💭';
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDFCFA]">
      {/* Header */}
      <header className="sticky top-0 bg-[#FDFCFA]/95 backdrop-blur-md z-40 border-b border-stone-200/50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="p-2 -ml-2 hover:bg-stone-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-700" />
            </button>
            <h1 className="font-bold text-slate-800">비슷한 초서들</h1>
            <button className="p-2 -mr-2 hover:bg-stone-100 rounded-full transition-colors">
              <Search className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          {/* Book Reference */}
          {book && (
            <div className="flex items-center gap-3 mb-4 px-1">
              <img src={book.cover} alt={book.title} className="w-10 h-14 object-cover rounded-lg shadow-sm" />
              <div>
                <p className="text-sm font-bold text-slate-800">{book.title}</p>
                <p className="text-xs text-slate-500">{book.author} · p.{sortedOverlaps[0].myChoseo.page}</p>
                <p className="text-[10px] text-emerald-600 font-bold mt-1">
                  {sortedOverlaps.length}명의 독자가 비슷한 구절을 선택했어요
                </p>
              </div>
            </div>
          )}

          {/* Filter Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveFilter('similar')}
              className={`flex-1 py-2 px-3 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                activeFilter === 'similar'
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                  : 'bg-white text-slate-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              비슷한 생각
            </button>
            <button
              onClick={() => setActiveFilter('different')}
              className={`flex-1 py-2 px-3 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                activeFilter === 'different'
                  ? 'bg-purple-100 text-purple-700 border border-purple-200'
                  : 'bg-white text-slate-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              <Shuffle className="w-3.5 h-3.5" />
              다른 관점
            </button>
            <button
              onClick={() => setActiveFilter('popular')}
              className={`flex-1 py-2 px-3 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                activeFilter === 'popular'
                  ? 'bg-rose-100 text-rose-700 border border-rose-200'
                  : 'bg-white text-slate-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              인기 생각
            </button>
          </div>
        </div>
      </header>

      {/* Choseo List */}
      <div className="px-6 py-6 pb-24 space-y-4">
        {displayedChoseos.map((overlap, index) => {
          const overlapTag = getOverlapTag(overlap.overlapScore);
          const overlapPercentage = Math.round(overlap.overlapScore * 100);

          return (
            <button
              key={overlap.id}
              onClick={() => onSelectChoseo(index)}
              className="w-full bg-white rounded-2xl p-4 border border-stone-200 hover:border-emerald-300 hover:shadow-md transition-all text-left group"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-stone-50 rounded-full flex items-center justify-center border border-stone-200">
                    <span className="text-sm">{overlap.otherChoseo.user.avatar}</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{overlap.otherChoseo.user.name}</p>
                    <p className="text-[10px] text-slate-500">Lv.{overlap.otherChoseo.user.level}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{getVibeIcon(overlap.otherChoseo.user.vibe)}</span>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${overlapTag.color}`}>
                    {overlapPercentage}%
                  </span>
                </div>
              </div>

              {/* Quote Preview - Highlighted snippet */}
              <div className="bg-stone-50 rounded-xl p-3 mb-3">
                <p className="text-xs text-slate-700 leading-relaxed line-clamp-2">
                  "{overlap.otherChoseo.text}"
                </p>
              </div>

              {/* Thought Preview */}
              <div className="mb-3">
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {overlap.otherChoseo.thought}
                </p>
              </div>

              {/* Tags & Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-stone-200/50">
                <div className="flex items-center gap-2">
                  {overlap.otherChoseo.user.vibe && (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                      {overlap.otherChoseo.user.vibe}
                    </span>
                  )}
                  <span className="text-[10px] text-slate-400">{overlap.otherChoseo.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Heart className="w-3.5 h-3.5" />
                    <span className="text-[10px]">{overlap.otherChoseo.likes}</span>
                  </span>
                  <Bookmark className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-500 transition-colors" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Summary Footer */}
      <div className="fixed bottom-6 left-0 right-0 px-6 z-40">
        <div className="max-w-md mx-auto bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-4 shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-90 mb-0.5">이 구절을 선택한 독자</p>
              <p className="font-bold text-lg">{sortedOverlaps.length}명</p>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-90 mb-0.5">평균 겹침률</p>
              <p className="font-bold text-lg">
                {Math.round(sortedOverlaps.reduce((sum, o) => sum + o.overlapScore, 0) / sortedOverlaps.length * 100)}%
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-90 mb-0.5">총 공감</p>
              <p className="font-bold text-lg">
                {sortedOverlaps.reduce((sum, o) => sum + o.otherChoseo.likes, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

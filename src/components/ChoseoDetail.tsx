import { ArrowLeft, Bookmark, Heart, Share2, Users, Sparkles, TrendingUp } from 'lucide-react';
import { overlappingChoseos } from '../data/choseoOverlapData';
import { mockBooks } from '../data/mockData';
import { ExceptionalBadge } from './ExceptionalBadge';

interface ChoseoDetailProps {
  onBack: () => void;
  onViewOverlaps: () => void;
}

export function ChoseoDetail({ onBack, onViewOverlaps }: ChoseoDetailProps) {
  // Use the first choseo as the base (the one from MainHome)
  const mainChoseo = overlappingChoseos[0];
  const book = mockBooks.find(b => b.id === '1'); // 데미안

  return (
    <div className="max-w-md mx-auto min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 backdrop-blur-md z-40" style={{ background: 'rgba(0, 0, 0, 0.95)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-stone-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-bold text-slate-800">{overlappingChoseos.length}명의 생각</span>
          </div>
          <button className="p-2 -mr-2 hover:bg-stone-100 rounded-full transition-colors">
            <Share2 className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="px-6 py-6 pb-24">
        {/* Book Info */}
        <div className="flex items-center gap-3 mb-6">
          {book && (
            <>
              <img
                src={book.cover}
                alt={book.title}
                className="w-10 h-14 object-cover rounded-lg shadow-sm"
              />
              <div>
                <h2 className="font-bold text-slate-800 text-sm">{book.title}</h2>
                <p className="text-xs text-slate-500">{book.author} · p.127</p>
              </div>
            </>
          )}
        </div>

        {/* Shared Quote - Only Once */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 mb-4 border border-emerald-100 relative">
          {/* Chorus Highlight Badge */}
          <div className="absolute top-3 right-3">
            <ExceptionalBadge type="chorus-highlight" count={overlappingChoseos.length} size="medium" />
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-700">모두가 선택한 구절</span>
          </div>
          <div className="relative">
            <div className="absolute -top-1 -left-1 text-emerald-200 text-5xl font-serif leading-none select-none opacity-40">"</div>
            <p className="text-slate-800 leading-loose font-serif relative z-10 pt-3 px-1">
              {mainChoseo.text}
            </p>
          </div>
        </div>

        {/* CTA to see other reflections */}
        <button
          onClick={onViewOverlaps}
          className="w-full mb-6 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl py-3 px-4 flex items-center justify-between hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-bold text-orange-800">다른 독자들의 성찰 보기</span>
          </div>
          <div className="text-orange-400 group-hover:translate-x-1 transition-transform">
            →
          </div>
        </button>

        {/* Readers' Thoughts List */}
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-4 px-1">
            {overlappingChoseos.length}가지 서로 다른 생각
          </h3>
          
          <div className="space-y-4">
            {overlappingChoseos.map((choseo) => (
              <div key={choseo.id} className="bg-white rounded-2xl p-5 border border-stone-200 hover:border-emerald-200 hover:shadow-md transition-all">
                {/* User Info */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center text-sm border border-stone-200">
                    {choseo.user.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800">{choseo.user.name}</span>
                      <span className="text-[10px] text-slate-500">Lv.{choseo.user.level}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400">{choseo.date}</span>
                </div>

                {/* Thought */}
                <p className="text-sm text-slate-700 leading-relaxed mb-3">
                  {choseo.thought}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-3 border-t border-stone-100">
                  <button className="flex items-center gap-1.5 text-slate-400 hover:text-rose-500 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span className="text-xs">{choseo.likes}</span>
                  </button>
                  <button className="text-slate-400 hover:text-amber-500 transition-colors">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tip */}
        <div className="mt-8 p-4 bg-blue-50/50 rounded-xl border border-blue-200/30">
          <p className="text-xs text-blue-800">
            <span className="font-bold">💡 알고 계셨나요?</span><br />
            같은 구절도 독자마다 이렇게 다르게 해석할 수 있어요
          </p>
        </div>
      </div>
    </div>
  );
}
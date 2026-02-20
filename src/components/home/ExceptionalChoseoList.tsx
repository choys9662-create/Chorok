import { Sparkles } from 'lucide-react';
import { ExceptionalBadge } from '../ExceptionalBadge';
import { mockExceptionalChoseos } from './data';

export function ExceptionalChoseoList() {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" style={{ color: '#00FF00' }} />
          <h2 className="text-h2 text-white">특별한 순간들</h2>
        </div>
        <span className="text-caption" style={{ color: 'var(--text-tertiary)' }}>{mockExceptionalChoseos.length}개</span>
      </div>

      <div className="space-y-4">
        {mockExceptionalChoseos.map((choseo) => (
          <div
            key={choseo.id}
            className="card-minimal p-6 hover:scale-[1.01] transition-all duration-300 relative group shadow-neon"
          >
            <div className="absolute top-6 right-6 z-10">
              <ExceptionalBadge type={choseo.exceptional.type} count={choseo.exceptional.count} />
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="badge-neon">
                {choseo.bookTitle}
              </span>
              <span className="text-caption" style={{ color: 'var(--text-tertiary)' }}>{choseo.date}</span>
            </div>

            <div className="rounded-2xl p-5 mb-4 relative" style={{ background: 'var(--surface-2)' }}>
              <div className="absolute top-3 left-3 text-4xl font-serif leading-none select-none" style={{ color: 'var(--text-disabled)' }}>\"</div>
              <p className="text-body-s leading-loose font-serif italic relative z-10 pt-2 px-1" style={{ color: 'var(--text-secondary)' }}>
                {choseo.text}
              </p>
            </div>

            {choseo.thought && (
              <div className="pl-4 py-1" style={{ borderLeft: '3px solid rgba(0, 255, 0, 0.3)' }}>
                <p className="text-caption leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {choseo.thought}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

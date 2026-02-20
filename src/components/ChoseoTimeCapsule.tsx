import { Calendar, Quote, Sparkles, ArrowRight } from 'lucide-react';

interface TimeCapsuleChoseo {
  id: string;
  text: string;
  thought: string;
  bookTitle: string;
  date: string;
  yearsAgo: number;
}

interface ChoseoTimeCapsuleProps {
  onViewDetail?: (choseoId: string) => void;
}

export function ChoseoTimeCapsule({ onViewDetail }: ChoseoTimeCapsuleProps) {
  // Mock data - in real app, this would be fetched based on today's date from past years
  const timeCapsuleChoseos: TimeCapsuleChoseo[] = [
    {
      id: '1',
      text: '진정한 직무는 자기 자신에게로 가는 길을 찾는 것이다.',
      thought: '당시엔 이 문장의 의미를 잘 몰랐는데, 지금은 조금 알 것 같다.',
      bookTitle: '데미안',
      date: '2024-12-21',
      yearsAgo: 1,
    },
  ];

  if (timeCapsuleChoseos.length === 0) {
    return null;
  }

  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-4 px-1">
        <Calendar className="w-5 h-5" style={{ color: '#00FF00' }} />
        <h2 className="text-h2 text-white">초서 타임캡슐</h2>
        <Sparkles className="w-4 h-4" style={{ color: '#00FF00' }} />
      </div>
      
      <div className="space-y-4">
        {timeCapsuleChoseos.map((choseo) => (
          <div
            key={choseo.id}
            className="card-minimal p-6 shadow-neon relative overflow-hidden group hover:shadow-neon-lg transition-all"
          >
            {/* Decorative elements */}
            <div className="bg-gradient-neon-radial absolute inset-0" />
            
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="px-3 py-1.5 rounded-full text-caption font-bold flex items-center gap-1.5 shadow-sm" style={{ background: '#00FF00', color: '#000000' }}>
                  <Calendar className="w-3.5 h-3.5" />
                  {choseo.yearsAgo}년 전 오늘
                </div>
                <span className="text-caption" style={{ color: 'var(--text-tertiary)' }}>{choseo.date}</span>
              </div>

              {/* Book Title */}
              <div className="mb-3">
                <span className="badge-neon">
                  {choseo.bookTitle}
                </span>
              </div>

              {/* Quote */}
              <div className="backdrop-blur-sm rounded-2xl p-5 mb-4 relative" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}>
                <div className="absolute top-3 left-3 text-4xl font-serif leading-none select-none" style={{ color: 'var(--text-disabled)' }}>
                  "
                </div>
                <p className="text-body-s leading-loose font-serif italic relative z-10 pt-2 px-1" style={{ color: 'var(--text-secondary)' }}>
                  {choseo.text}
                </p>
              </div>

              {/* Past Thought */}
              {choseo.thought && (
                <div className="pl-4 py-1 mb-4" style={{ borderLeft: '3px solid rgba(0, 255, 0, 0.3)' }}>
                  <p className="text-caption mb-1 font-bold uppercase tracking-wide" style={{ color: '#00FF00' }}>
                    그때의 생각
                  </p>
                  <p className="text-caption leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {choseo.thought}
                  </p>
                </div>
              )}

              {/* Reflection Prompt */}
              <div className="rounded-xl p-3 mt-4" style={{ background: 'rgba(0, 255, 0, 0.08)', border: '1px solid rgba(0, 255, 0, 0.2)' }}>
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#00FF00' }} />
                  <div className="flex-1">
                    <p className="text-caption font-bold mb-1" style={{ color: '#00FF00' }}>
                      지금의 당신은 어떤 생각이 드나요?
                    </p>
                    <p className="text-caption" style={{ color: 'var(--text-secondary)' }}>
                      {choseo.yearsAgo}년이 지난 지금, 이 문장이 다르게 다가올 수도 있어요
                    </p>
                  </div>
                </div>
              </div>

              {/* View Detail Button */}
              {onViewDetail && (
                <button
                  onClick={() => onViewDetail(choseo.id)}
                  className="w-full mt-4 btn-secondary-neon rounded-xl py-3 flex items-center justify-center gap-2 transition-all group/btn"
                >
                  <span className="font-bold text-body-s">지금의 생각 남기기</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

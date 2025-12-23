import { Users, BookOpen, Heart, TrendingUp, ArrowRight } from 'lucide-react';
import { mockNeighbors } from '../data/mockData';

interface ReadingBuddy {
  neighbor: any;
  book: {
    id: string;
    title: string;
    cover: string;
  };
  matchScore: number;
  currentPage: number;
  totalPages: number;
}

interface ReadingBuddyMatchProps {
  currentBook?: {
    id: string;
    title: string;
    cover: string;
  };
  onViewNeighbor?: (neighborId: string) => void;
}

export function ReadingBuddyMatch({ currentBook, onViewNeighbor }: ReadingBuddyMatchProps) {
  // Mock data - in real app, this would be fetched based on current reading
  const readingBuddies: ReadingBuddy[] = [
    {
      neighbor: mockNeighbors[0],
      book: {
        id: '1',
        title: '데미안',
        cover: 'https://images.unsplash.com/photo-1763768861268-cb6b54173dbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBjbGFzc2ljJTIwbGl0ZXJhdHVyZXxlbnwxfHx8fDE3NjQwNjU0OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      matchScore: 92,
      currentPage: 142,
      totalPages: 248,
    },
    {
      neighbor: mockNeighbors[2],
      book: {
        id: '1',
        title: '데미안',
        cover: 'https://images.unsplash.com/photo-1763768861268-cb6b54173dbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBjbGFzc2ljJTIwbGl0ZXJhdHVyZXxlbnwxfHx8fDE3NjQwNjU0OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      matchScore: 87,
      currentPage: 201,
      totalPages: 248,
    },
  ];

  if (readingBuddies.length === 0) {
    return null;
  }

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5" style={{ color: '#00FF00' }} />
          <h2 className="text-h2 text-white">함께 읽는 이웃</h2>
        </div>
        <span className="text-caption" style={{ color: 'var(--text-tertiary)' }}>{readingBuddies.length}명</span>
      </div>

      <div className="card-minimal p-5 shadow-neon">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5" style={{ color: '#00FF00' }} />
          <p className="text-body-s" style={{ color: 'var(--text-secondary)' }}>
            <span className="font-bold" style={{ color: '#00FF00' }}>{readingBuddies.length}명의 이웃</span>이 같은 책을 읽고 있어요
          </p>
        </div>

        <div className="space-y-3">
          {readingBuddies.map((buddy, i) => {
            const progress = Math.round((buddy.currentPage / buddy.totalPages) * 100);
            const isAhead = buddy.currentPage > (currentBook ? 156 : 0); // mock current page

            return (
              <div
                key={i}
                className="rounded-2xl p-4 transition-all hover:shadow-sm group cursor-pointer"
                style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}
                onClick={() => onViewNeighbor && onViewNeighbor(buddy.neighbor.id)}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-accent)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-sm" style={{ background: 'rgba(0, 255, 0, 0.15)', border: '2px solid rgba(0, 255, 0, 0.3)' }}>
                    {buddy.neighbor.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-body-s text-white">{buddy.neighbor.name}</span>
                      <span className="badge-neon">
                        Lv.{buddy.neighbor.level}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-caption" style={{ color: 'var(--text-secondary)' }}>
                        {buddy.currentPage}/{buddy.totalPages}p ({progress}%)
                      </span>
                      {isAhead ? (
                        <span className="text-caption px-1.5 py-0.5 rounded-full font-bold" style={{ background: 'rgba(0, 255, 0, 0.1)', color: '#00FF00' }}>
                          앞서 읽는 중
                        </span>
                      ) : (
                        <span className="text-caption px-1.5 py-0.5 rounded-full font-bold" style={{ background: 'rgba(0, 255, 0, 0.1)', color: '#00FF00' }}>
                          비슷한 진도
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1 text-caption">
                      <Heart className="w-3 h-3 fill-current" style={{ color: '#00FF00' }} />
                      <span className="font-bold" style={{ color: '#00FF00' }}>{buddy.matchScore}%</span>
                    </div>
                    <span className="text-caption" style={{ color: 'var(--text-tertiary)' }}>취향 유사도</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="w-full rounded-full h-1.5 overflow-hidden" style={{ background: 'var(--surface-elevated)' }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: `${progress}%`,
                        background: 'linear-gradient(to right, #00FF00, #00cc00)',
                        boxShadow: '0 0 8px rgba(0, 255, 0, 0.4)'
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <button
          className="w-full mt-4 btn-secondary-neon rounded-xl py-3 flex items-center justify-center gap-2 transition-all group"
          onClick={() => {
            // Navigate to neighbors reading the same book
          }}
        >
          <span className="font-bold text-body-s">모든 독서 친구 보기</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

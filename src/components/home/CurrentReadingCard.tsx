import { BookOpen } from 'lucide-react';
import { Book, Screen } from '../../App';

interface CurrentReadingCardProps {
  book: Book | null;
  onStartTimer: (book: Book) => void;
  onNavigate: (screen: Screen) => void;
}

export function CurrentReadingCard({ book, onStartTimer, onNavigate }: CurrentReadingCardProps) {
  const getProgressMessage = (b: Book) => {
    const progress = (b.currentPage / b.totalPages) * 100;
    const pagesPerMinute = b.totalMinutes ? b.currentPage / b.totalMinutes : 0;

    if (progress > 90) return '오늘만 읽으면 완독!';
    if (pagesPerMinute > 0.5) return '재밌는 책인가 봐요';
    if (pagesPerMinute < 0.2) return '조금 어려운 책인가요?';
    if (b.chosuCount && b.chosuCount > 10) return '인상 깊은 책이네요';
    return '편하게 읽기 좋은 책';
  };

  if (!book) {
    return (
      <div className="mb-8">
        <h2 className="text-h2 text-white mb-4 px-1">지금 읽는 책</h2>
        <div className="card-minimal p-8 text-center py-12 shadow-neon">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--surface-2)' }}>
            <BookOpen className="w-8 h-8" style={{ color: 'var(--text-tertiary)' }} strokeWidth={1.5} />
          </div>
          <h3 className="text-h3 text-white mb-2">읽고 있는 책이 없어요</h3>
          <p className="text-body-s mb-8" style={{ color: 'var(--text-secondary)' }}>새로운 책을 서재에 추가해보세요</p>
          <button
            onClick={() => onNavigate('search')}
            className="btn-primary-neon"
          >
            책 추가하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="card-minimal overflow-hidden hover:border-accent transition-all duration-500 shadow-neon">
        <div className="flex gap-6 p-7">
          <img
            src={book.cover}
            alt={book.title}
            className="w-28 h-40 object-cover rounded-xl flex-shrink-0"
            style={{ boxShadow: '0 0 20px rgba(0, 255, 0, 0.15)' }}
          />
          <div className="flex-1 flex flex-col justify-between py-1">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-h3 text-white line-clamp-1">{book.title}</h3>
              </div>
              <p className="text-body-s mb-4 line-clamp-1" style={{ color: 'var(--text-secondary)' }}>{book.author}</p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="badge-neon">
                    {getProgressMessage(book)}
                  </span>
                </div>
                <div className="w-full rounded-full h-2.5 overflow-hidden" style={{ background: 'var(--surface-elevated)' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(book.currentPage / book.totalPages) * 100}%`,
                      background: 'linear-gradient(to right, #00FF00, #00cc00)',
                      boxShadow: '0 0 10px rgba(0, 255, 0, 0.4)'
                    }}
                  />
                </div>
                <div className="flex justify-between items-end text-[16px]">
                  <span className="text-display text-white">
                    {Math.round((book.currentPage / book.totalPages) * 100)}
                    <span className="text-body-s font-normal ml-0.5" style={{ color: 'var(--text-tertiary)' }}>%</span>
                  </span>
                  <span className="text-caption mb-1" style={{ color: 'var(--text-tertiary)' }}>
                    {book.totalPages - book.currentPage}페이지 남음
                  </span>
                </div>
              </div>
            </div>

            {/* Start Reading Button */}
            <button
              onClick={() => onStartTimer(book)}
              className="w-full text-black py-3 rounded-xl font-bold shadow-neon hover:shadow-neon-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-3 text-body-s"
              style={{ background: '#00FF00' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#33FF33';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#00FF00';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <BookOpen className="w-4 h-4" />
              <span>계속 읽기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Book } from '../App';
import { ArrowLeft, BookOpen, Star, Heart, Share2, TrendingUp, Users } from 'lucide-react';

interface BookDetailProps {
  book: Book | null;
  onStartReading: (book: Book) => void;
  onBack: () => void;
}

export function BookDetail({ book, onStartReading, onBack }: BookDetailProps) {
  if (!book) return null;

  const progress = (book.currentPage / book.totalPages) * 100;
  const isReading = book.status === 'reading';
  const isCompleted = book.status === 'completed';

  return (
    <div className="max-w-md mx-auto min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-lg" style={{ background: 'rgba(0, 0, 0, 0.8)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="flex items-center justify-between p-4">
          <button onClick={onBack} className="p-2 rounded-lg transition-colors hover:bg-white/5">
            <ArrowLeft className="w-6 h-6" style={{ color: '#00FF00' }} />
          </button>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg transition-colors hover:bg-white/5">
              <Share2 className="w-5 h-5" style={{ color: '#00FF00' }} />
            </button>
            <button className="p-2 rounded-lg transition-colors hover:bg-white/5">
              <Heart className="w-5 h-5" style={{ color: '#FF00FF' }} />
            </button>
          </div>
        </div>
      </header>

      {/* Book Cover & Info */}
      <div className="p-6">
        <div className="flex gap-6 mb-6">
          <img
            src={book.cover}
            alt={book.title}
            className="w-32 h-44 object-cover rounded-xl shadow-lg flex-shrink-0"
            style={{ boxShadow: '0 4px 20px rgba(0, 255, 0, 0.2)' }}
          />
          <div className="flex-1">
            <h1 className="text-2xl mb-2 text-white">{book.title}</h1>
            <button className="text-sm mb-4 hover:underline" style={{ color: '#00FF00' }}>
              {book.author}
            </button>
            
            <div className="flex items-center gap-4 mb-4">
              {book.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-white">{book.rating}</span>
                </div>
              )}
              <div className="flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
                <Users className="w-4 h-4" />
                <span className="text-sm">1,247명 읽음</span>
              </div>
            </div>

            <div className="inline-block px-3 py-1 rounded-full text-sm" style={{ background: 'rgba(0, 255, 0, 0.15)', color: '#00FF00', border: '1px solid rgba(0, 255, 0, 0.3)' }}>
              {book.genre}
            </div>
          </div>
        </div>

        {/* Progress (if reading) */}
        {isReading && (
          <div className="rounded-2xl p-6 mb-6" style={{ background: 'var(--surface-2)', border: '1px solid rgba(0, 255, 0, 0.3)' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-white">현재 진행률</span>
              <span style={{ color: '#00FF00' }}>{Math.round(progress)}%</span>
            </div>
            <div className="w-full rounded-full h-3 mb-3" style={{ background: 'var(--surface-elevated)' }}>
              <div
                className="h-3 rounded-full transition-all"
                style={{ 
                  width: `${progress}%`,
                  background: 'linear-gradient(to right, #00FF00, #00cc00)',
                  boxShadow: '0 0 8px rgba(0, 255, 0, 0.4)'
                }}
              />
            </div>
            <div className="flex justify-between text-sm" style={{ color: 'var(--text-secondary)' }}>
              <span>{book.currentPage} / {book.totalPages} 페이지</span>
              <span>{book.totalPages - book.currentPage}p 남음</span>
            </div>
            
            {/* Reading insights */}
            <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl mb-1" style={{ color: '#00FF00' }}>{book.totalMinutes}분</div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>총 독서 시간</div>
                </div>
                <div>
                  <div className="text-2xl mb-1" style={{ color: '#00FF00' }}>{book.chosuCount}개</div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>남긴 초서</div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg" style={{ background: 'var(--surface-elevated)', border: '1px solid var(--border-subtle)' }}>
              <p className="text-sm flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                <TrendingUp className="w-4 h-4" style={{ color: '#00FF00' }} />
                <span>이틀이면 다 읽을 수 있어요</span>
              </p>
            </div>
          </div>
        )}

        {/* Completed badge */}
        {isCompleted && (
          <div className="rounded-2xl p-6 mb-6" style={{ background: 'var(--surface-2)', border: '1px solid rgba(255, 0, 255, 0.3)' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, #FF00FF, #FF00AA)' }}>
                <Star className="w-6 h-6 text-black fill-black" />
              </div>
              <div>
                <h3 className="text-lg text-white">완독 축하합니다!</h3>
                <p className="text-sm" style={{ color: '#FF00FF' }}>2025년 11월 10일 완독</p>
              </div>
            </div>
            {book.rating && (
              <div className="flex items-center gap-2">
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>내 평점:</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(book.rating!) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        {isReading && (
          <button
            onClick={() => onStartReading(book)}
            className="w-full text-black py-4 rounded-xl flex items-center justify-center gap-2 mb-6 transition-all font-bold"
            style={{ 
              background: 'linear-gradient(to right, #00FF00, #00cc00)',
              boxShadow: '0 4px 20px rgba(0, 255, 0, 0.3)'
            }}
          >
            <BookOpen className="w-5 h-5" />
            <span>독서 재개하기</span>
          </button>
        )}

        {book.status === 'want-to-read' && (
          <button
            onClick={() => onStartReading({ ...book, status: 'reading', currentPage: 0, startDate: new Date().toISOString().split('T')[0] })}
            className="w-full text-black py-4 rounded-xl flex items-center justify-center gap-2 mb-6 transition-all font-bold"
            style={{ 
              background: 'linear-gradient(to right, #00FF00, #00cc00)',
              boxShadow: '0 4px 20px rgba(0, 255, 0, 0.3)'
            }}
          >
            <BookOpen className="w-5 h-5" />
            <span>읽기 시작하기</span>
          </button>
        )}

        {/* About Book */}
        <div className="mb-6">
          <h2 className="text-lg mb-3 text-white">책 소개</h2>
          <p className="leading-relaxed text-sm" style={{ color: 'var(--text-secondary)' }}>
            {book.title}은(는) {book.author}의 대표작으로, {book.genre} 장르의 필독서입니다. 
            깊이 있는 통찰과 감동적인 이야기로 많은 독자들의 사랑을 받고 있습니다.
          </p>
        </div>

        {/* Author's other books */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg text-white">저자의 다른 책</h2>
            <button className="text-sm hover:underline" style={{ color: '#00FF00' }}>전체보기</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex-shrink-0 w-24">
                <div className="w-24 h-32 rounded-lg mb-2" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }} />
                <p className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>책 제목 {i}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Neighbors reading */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg text-white">뿌리가 닿은 독서러</h2>
          </div>
          <div className="rounded-xl p-4" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2" style={{ background: '#00FF00', borderColor: '#000' }} />
                <div className="w-8 h-8 rounded-full border-2" style={{ background: '#00FFFF', borderColor: '#000' }} />
                <div className="w-8 h-8 rounded-full border-2" style={{ background: '#FF00FF', borderColor: '#000' }} />
              </div>
              <span className="text-sm text-white">책벌레민수 외 23명과 뿌리가 얽혔어요</span>
            </div>
          </div>
        </div>

        {/* Chain Lightning */}
        <div className="rounded-xl p-4" style={{ background: 'var(--surface-2)', border: '1px solid rgba(255, 255, 0, 0.3)' }}>
          <h3 className="text-sm mb-2 flex items-center gap-2 text-white">
            <span className="text-xl">⚡</span>
            <span>체인 라이트닝</span>
          </h3>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            이 책을 읽은 초록 이용자들이 많이 읽는 책을 확인해보세요
          </p>
        </div>
      </div>
    </div>
  );
}
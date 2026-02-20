import { ArrowLeft, TrendingUp, TrendingDown, Minus, Crown, Award, Users } from 'lucide-react';
import { mockRanking } from '../data/mockData';
import { Book } from '../App';

interface RankingProps {
  onBookSelect: (book: Book) => void;
  onBack: () => void;
}

export function Ranking({ onBookSelect, onBack }: RankingProps) {
  const getTrendIcon = (trend: 'up' | 'down' | 'same') => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-red-500" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-blue-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-black text-white">
      {/* Header */}
      <header className="p-6 text-white" style={{ background: 'linear-gradient(to right, rgba(255, 255, 0, 0.15), rgba(255, 200, 0, 0.15))' }}>
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" style={{ color: '#FFFF00' }} />
          </button>
          <h1 className="text-xl flex items-center gap-2">
            <Crown className="w-6 h-6" style={{ color: '#FFFF00' }} />
            <span>CHO_LOCK 랭킹</span>
          </h1>
          <div className="w-10" />
        </div>

        <div className="rounded-xl p-4" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}>
          <p className="text-sm mb-2" style={{ color: '#FFFF00' }}>실시간 인기</p>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            CHO_LOCK 독서러들이 지금 가장 많이 읽는 책을 확인하세요
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="p-6">
        {/* Top 3 Highlight */}
        <div className="mb-6">
          <h2 className="text-lg mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>TOP 3</span>
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {mockRanking.slice(0, 3).map(book => (
              <button
                key={book.rank}
                onClick={() => onBookSelect({
                  id: book.rank.toString(),
                  title: book.bookTitle,
                  author: book.author,
                  cover: book.cover,
                  currentPage: 0,
                  totalPages: 300,
                  status: 'want-to-read',
                  genre: '문학',
                })}
                className="text-center"
              >
                <div className="relative mb-2">
                  <img
                    src={book.cover}
                    alt={book.bookTitle}
                    className="w-full aspect-[3/4] object-cover rounded-lg shadow-lg"
                  />
                  <div className="absolute -top-2 -right-2 text-3xl">
                    {getRankBadge(book.rank)}
                  </div>
                </div>
                <p className="text-sm truncate mb-1">{book.bookTitle}</p>
                <p className="text-xs text-neutral-400 truncate mb-1">{book.author}</p>
                <div className="flex items-center justify-center gap-1 text-xs text-emerald-400">
                  <Users className="w-3 h-3" />
                  <span>{book.readers.toLocaleString()}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Full Ranking List */}
        <div className="mb-6">
          <h2 className="text-lg mb-4">전체 랭킹</h2>
          <div className="space-y-3">
            {mockRanking.map((book, idx) => (
              <button
                key={book.rank}
                onClick={() => onBookSelect({
                  id: book.rank.toString(),
                  title: book.bookTitle,
                  author: book.author,
                  cover: book.cover,
                  currentPage: 0,
                  totalPages: 300,
                  status: 'want-to-read',
                  genre: '문학',
                })}
                className="w-full rounded-xl p-4 flex items-center gap-4 transition-all border hover:shadow-md"
                style={{ background: 'var(--surface-2)', borderColor: 'var(--border-subtle)' }}
              >
                {/* Rank */}
                <div className="flex-shrink-0 w-12 text-center">
                  {getRankBadge(book.rank) ? (
                    <span className="text-3xl">{getRankBadge(book.rank)}</span>
                  ) : (
                    <span className="text-xl text-neutral-400">{book.rank}</span>
                  )}
                </div>

                {/* Trend */}
                <div className="flex-shrink-0">
                  {getTrendIcon(book.trend)}
                </div>

                {/* Book Cover */}
                <img
                  src={book.cover}
                  alt={book.bookTitle}
                  className="w-12 h-16 object-cover rounded shadow flex-shrink-0"
                />

                {/* Book Info */}
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm mb-1 truncate">{book.bookTitle}</p>
                  <p className="text-xs text-neutral-400 truncate mb-2">{book.author}</p>
                  <div className="flex items-center gap-1 text-xs text-emerald-400">
                    <Users className="w-3 h-3" />
                    <span>{book.readers.toLocaleString()}명 읽는 중</span>
                  </div>
                </div>

                {/* Action */}
                <div className="flex-shrink-0">
                  <div className="text-xs px-3 py-1 rounded-full border text-emerald-300" style={{ background: 'rgba(0, 255, 0, 0.08)', borderColor: 'rgba(0, 255, 0, 0.22)' }}>
                    읽기
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Top Rankers Section */}
        <div className="mb-6">
          <h2 className="text-lg mb-4">상위 랭커가 읽는 책</h2>
          <p className="text-sm text-neutral-400 mb-4">
            독서 레벨이 높은 사용자들이 선택한 책을 만나보세요
          </p>
          <div className="rounded-2xl p-6 border" style={{ background: 'linear-gradient(135deg, rgba(34, 40, 52, 0.92), rgba(28, 34, 46, 0.92))', borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white">
                👑
              </div>
              <div>
                <div className="text-sm mb-1">상위 1% 독서러버</div>
                <div className="text-xs text-gray-600">레벨 80+ 사용자</div>
              </div>
            </div>
            <div className="space-y-2">
              {['코스모스', '사피엔스', '총, 균, 쇠'].map((title, idx) => (
                <div key={title} className="rounded-lg p-3 flex items-center justify-between border" style={{ background: 'rgba(17, 22, 30, 0.88)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-300">{idx + 1}</span>
                    <span className="text-sm">{title}</span>
                  </div>
                  <button className="text-xs text-purple-600 hover:underline">보기</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Genre Rankings */}
        <div>
          <h2 className="text-lg mb-4">장르별 인기</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { genre: '문학', count: '1,247명', color: 'from-green-400 to-emerald-400' },
              { genre: '소설', count: '1,103명', color: 'from-blue-400 to-cyan-400' },
              { genre: '인문', count: '987명', color: 'from-purple-400 to-pink-400' },
              { genre: '과학', count: '856명', color: 'from-yellow-400 to-orange-400' },
            ].map(item => (
              <button
                key={item.genre}
                className={`bg-gradient-to-br ${item.color} text-white rounded-xl p-6 text-left hover:shadow-lg transition-shadow`}
              >
                <div className="text-xl mb-2">{item.genre}</div>
                <div className="text-sm opacity-90">{item.count}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Info Note */}
        <div className="mt-6 rounded-xl p-4 border" style={{ background: 'var(--surface-2)', borderColor: 'var(--border-subtle)' }}>
          <p className="text-xs text-neutral-400 text-center">
            💡 랭킹은 매 시간 업데이트됩니다
          </p>
        </div>
      </div>
    </div>
  );
}

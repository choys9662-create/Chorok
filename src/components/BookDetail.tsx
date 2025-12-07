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
    <div className="max-w-md mx-auto min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-lg border-b border-gray-200 z-10">
        <div className="flex items-center justify-between p-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Heart className="w-5 h-5" />
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
          />
          <div className="flex-1">
            <h1 className="text-2xl mb-2">{book.title}</h1>
            <button className="text-green-600 text-sm mb-4 hover:underline">
              {book.author}
            </button>
            
            <div className="flex items-center gap-4 mb-4">
              {book.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{book.rating}</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-gray-600">
                <Users className="w-4 h-4" />
                <span className="text-sm">1,247명 읽음</span>
              </div>
            </div>

            <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              {book.genre}
            </div>
          </div>
        </div>

        {/* Progress (if reading) */}
        {isReading && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-6 border border-green-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-green-800">현재 진행률</span>
              <span className="text-green-600">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-green-200 rounded-full h-3 mb-3">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <span>{book.currentPage} / {book.totalPages} 페이지</span>
              <span>{book.totalPages - book.currentPage}p 남음</span>
            </div>
            
            {/* Reading insights */}
            <div className="mt-4 pt-4 border-t border-green-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl text-green-700 mb-1">{book.totalMinutes}분</div>
                  <div className="text-xs text-gray-600">총 독서 시간</div>
                </div>
                <div>
                  <div className="text-2xl text-green-700 mb-1">{book.chosuCount}개</div>
                  <div className="text-xs text-gray-600">남긴 초서</div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-700 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span>이틀이면 다 읽을 수 있어요</span>
              </p>
            </div>
          </div>
        )}

        {/* Completed badge */}
        {isCompleted && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-6 border border-purple-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <h3 className="text-lg text-purple-900">완독 축하합니다!</h3>
                <p className="text-sm text-purple-600">2025년 11월 10일 완독</p>
              </div>
            </div>
            {book.rating && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">내 평점:</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(book.rating!) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
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
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl flex items-center justify-center gap-2 mb-6 hover:shadow-lg transition-shadow"
          >
            <BookOpen className="w-5 h-5" />
            <span>독서 재개하기</span>
          </button>
        )}

        {book.status === 'want-to-read' && (
          <button
            onClick={() => onStartReading({ ...book, status: 'reading', currentPage: 0, startDate: new Date().toISOString().split('T')[0] })}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl flex items-center justify-center gap-2 mb-6 hover:shadow-lg transition-shadow"
          >
            <BookOpen className="w-5 h-5" />
            <span>읽기 시작하기</span>
          </button>
        )}

        {/* About Book */}
        <div className="mb-6">
          <h2 className="text-lg mb-3">책 소개</h2>
          <p className="text-gray-700 leading-relaxed text-sm">
            {book.title}은(는) {book.author}의 대표작으로, {book.genre} 장르의 필독서입니다. 
            깊이 있는 통찰과 감동적인 이야기로 많은 독자들의 사랑을 받고 있습니다.
          </p>
        </div>

        {/* Author's other books */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg">저자의 다른 책</h2>
            <button className="text-sm text-green-600 hover:underline">전체보기</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex-shrink-0 w-24">
                <div className="w-24 h-32 bg-gray-200 rounded-lg mb-2" />
                <p className="text-xs text-gray-700 truncate">책 제목 {i}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Neighbors reading */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg">이웃들의 독서</h2>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-green-400 rounded-full border-2 border-white" />
                <div className="w-8 h-8 bg-blue-400 rounded-full border-2 border-white" />
                <div className="w-8 h-8 bg-purple-400 rounded-full border-2 border-white" />
              </div>
              <span className="text-sm text-gray-700">책벌레민수 외 23명이 읽었어요</span>
            </div>
          </div>
        </div>

        {/* Chain Lightning */}
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-200">
          <h3 className="text-sm mb-2 flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <span>체인 라이트닝</span>
          </h3>
          <p className="text-sm text-gray-700">
            이 책을 읽은 초록 이용자들이 많이 읽는 책을 확인해보세요
          </p>
        </div>
      </div>
    </div>
  );
}

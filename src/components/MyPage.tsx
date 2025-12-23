import { useState } from 'react';
import { ArrowLeft, BookMarked, Star, Heart, Settings, Share2, Award, Brain } from 'lucide-react';
import { Book, Screen } from '../App';
import { mockBooks } from '../data/mockData';

interface MyPageProps {
  onBookSelect: (book: Book) => void;
  onNavigate: (screen: Screen) => void;
  onBack: () => void;
}

export function MyPage({ onBookSelect, onNavigate, onBack }: MyPageProps) {
  const [activeTab, setActiveTab] = useState<'reading' | 'want' | 'completed'>('reading');

  const readingBooks = mockBooks.filter(b => b.status === 'reading');
  const wantToReadBooks = mockBooks.filter(b => b.status === 'want-to-read');
  const completedBooks = mockBooks.filter(b => b.status === 'completed');

  const displayBooks = activeTab === 'reading' ? readingBooks : 
                        activeTab === 'want' ? wantToReadBooks : 
                        completedBooks;

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Settings className="w-6 h-6" />
            </button>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-300 to-emerald-400 rounded-full flex items-center justify-center text-3xl">
              🌳
            </div>
            <div className="flex-1">
              <h2 className="text-2xl mb-1">독서러버</h2>
              <p className="text-green-100 text-sm mb-2">레벨 42 · 나이테 89개</p>
              <button className="text-sm bg-white/20 backdrop-blur px-3 py-1 rounded-full">
                프로필 수정
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
              <div className="text-xl mb-1">{readingBooks.length}</div>
              <div className="text-xs text-green-100">읽는 중</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
              <div className="text-xl mb-1">{wantToReadBooks.length}</div>
              <div className="text-xs text-green-100">읽을 책</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
              <div className="text-xl mb-1">{completedBooks.length}</div>
              <div className="text-xs text-green-100">완독</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
              <div className="text-xl mb-1">12</div>
              <div className="text-xs text-green-100">이번 달</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-white/10 backdrop-blur">
          <button
            onClick={() => setActiveTab('reading')}
            className={`flex-1 py-3 text-sm transition-colors ${
              activeTab === 'reading' ? 'bg-white text-green-600' : 'text-white'
            }`}
          >
            읽는 책 ({readingBooks.length})
          </button>
          <button
            onClick={() => setActiveTab('want')}
            className={`flex-1 py-3 text-sm transition-colors ${
              activeTab === 'want' ? 'bg-white text-green-600' : 'text-white'
            }`}
          >
            읽을 책 ({wantToReadBooks.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-3 text-sm transition-colors ${
              activeTab === 'completed' ? 'bg-white text-green-600' : 'text-white'
            }`}
          >
            완독 ({completedBooks.length})
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="p-6">
        {/* Books Grid */}
        {displayBooks.length > 0 ? (
          <div className="space-y-4 mb-6">
            {displayBooks.map(book => (
              <button
                key={book.id}
                onClick={() => onBookSelect(book)}
                className="w-full bg-white border border-gray-200 rounded-xl p-4 flex gap-4 hover:shadow-md transition-shadow text-left"
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-20 h-28 object-cover rounded-lg shadow flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm mb-1 truncate">{book.title}</h3>
                  <p className="text-xs text-gray-600 mb-3">{book.author}</p>
                  
                  {book.status === 'reading' && (
                    <>
                      <div className="mb-2">
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                          <span>{book.currentPage} / {book.totalPages}p</span>
                          <span>{Math.round((book.currentPage / book.totalPages) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-1.5 rounded-full"
                            style={{ width: `${(book.currentPage / book.totalPages) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        <span>📖 {book.totalMinutes}분</span>
                        <span>✍️ {book.chosuCount}개</span>
                      </div>
                    </>
                  )}

                  {book.status === 'completed' && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(book.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <div className="text-xs text-gray-600">
                        {book.lastReadDate}에 완독
                      </div>
                    </div>
                  )}

                  {book.status === 'want-to-read' && (
                    <div className="flex gap-2">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        읽고 싶어요
                      </span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookMarked className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">아직 책이 없어요</p>
            <button
              onClick={() => onNavigate('search')}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-shadow"
            >
              책 찾아보기
            </button>
          </div>
        )}

        {/* Reading Preferences */}
        <div className="mb-6">
          <h3 className="text-lg mb-4">독서 취향</h3>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-xs text-gray-600 mb-1">선호 장르</div>
                <div className="text-lg text-purple-900">문학</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">평균 속도</div>
                <div className="text-lg text-purple-900">23p/시간</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {['문학', '소설', '인문', '철학'].map(genre => (
                <span key={genre} className="text-xs bg-white text-purple-700 px-3 py-1 rounded-full">
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg">업적</h3>
            <button 
              onClick={() => onNavigate('analytics')}
              className="text-sm text-green-600 hover:underline"
            >
              전체보기
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-xl p-4 text-center border border-yellow-300">
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-xs text-gray-700">7일 연속</div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl p-4 text-center border border-blue-300">
              <div className="text-3xl mb-2">📚</div>
              <div className="text-xs text-gray-700">100권 완독</div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-4 text-center border border-green-300">
              <div className="text-3xl mb-2">⚡</div>
              <div className="text-xs text-gray-700">챌린지 왕</div>
            </div>
          </div>
        </div>

        {/* Similar Taste Users */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg">나와 취향이 비슷한 유저</h3>
          </div>
          <div className="space-y-3">
            {['책덕후김씨', '문학소녀이씨', '독서광박씨'].map((name, idx) => (
              <div key={name} className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-300 to-emerald-400 rounded-full flex items-center justify-center text-xl">
                  🌲
                </div>
                <div className="flex-1">
                  <div className="text-sm mb-1">{name}</div>
                  <div className="text-xs text-gray-600">레벨 {35 + idx * 5} · 취향 일치 {85 + idx}%</div>
                </div>
                <button className="text-sm text-green-600 hover:underline">팔로우</button>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button 
            onClick={() => onNavigate('choseo-insights')}
            className="w-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-xl p-4 flex items-center justify-between hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3">
              <Brain className="w-5 h-5" />
              <span className="text-sm font-bold">초서 인사이트 보기 ✨</span>
            </div>
            <span className="text-white/80">›</span>
          </button>
          <button className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-gray-600" />
              <span className="text-sm">내가 좋아요 한 초서</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>
          <button className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <Share2 className="w-5 h-5 text-gray-600" />
              <span className="text-sm">내가 쓴 글</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>
          <button 
            onClick={() => onNavigate('analytics')}
            className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-gray-600" />
              <span className="text-sm">독서 통계</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>
        </div>
      </div>
    </div>
  );
}
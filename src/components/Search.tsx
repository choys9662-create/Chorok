import { useState } from 'react';
import { ArrowLeft, Search as SearchIcon, TrendingUp, Clock, MessageCircle, Sparkles } from 'lucide-react';
import { Book } from '../App';
import { mockBooks, mockChosus, mockNeighbors } from '../data/mockData';

interface SearchProps {
  onBookSelect: (book: Book) => void;
  onBack: () => void;
}

export function Search({ onBookSelect, onBack }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'trend' | 'social' | 'search'>('trend');

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="책, 저자, 문장 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('trend')}
              className={`flex-1 py-2 rounded-lg text-sm transition-colors ${
                activeTab === 'trend' ? 'bg-green-100 text-green-700' : 'text-gray-600'
              }`}
            >
              트렌드
            </button>
            <button
              onClick={() => setActiveTab('social')}
              className={`flex-1 py-2 rounded-lg text-sm transition-colors ${
                activeTab === 'social' ? 'bg-green-100 text-green-700' : 'text-gray-600'
              }`}
            >
              이웃 소식
            </button>
            <button
              onClick={() => setActiveTab('search')}
              className={`flex-1 py-2 rounded-lg text-sm transition-colors ${
                activeTab === 'search' ? 'bg-green-100 text-green-700' : 'text-gray-600'
              }`}
            >
              검색
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'trend' && (
          <div>
            {/* Featured Banner */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white mb-6 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm">11월 기획전</span>
                </div>
                <h2 className="text-xl mb-2">겨울을 위한 책</h2>
                <p className="text-sm text-purple-100 mb-4">
                  따뜻한 감성이 필요한 계절
                </p>
                <button className="bg-white text-purple-600 px-4 py-2 rounded-lg text-sm hover:shadow-lg transition-shadow">
                  둘러보기
                </button>
              </div>
              <div className="absolute right-4 bottom-4 text-6xl opacity-20">📚</div>
            </div>

            {/* New Releases */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg">신작 & 화제의 책</h3>
                <button className="text-sm text-green-600 hover:underline">전체보기</button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {mockBooks.slice(0, 3).map(book => (
                  <button
                    key={book.id}
                    onClick={() => onBookSelect(book)}
                    className="text-left"
                  >
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full aspect-[3/4] object-cover rounded-lg shadow mb-2"
                    />
                    <p className="text-sm truncate text-[15px]">{book.title}</p>
                    <p className="text-xs text-gray-600 truncate">{book.author}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Reading Trend */}
            <div className="mb-6">
              <h3 className="text-lg mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span>독서 추세</span>
              </h3>
              <div className="space-y-3">
                {mockBooks.map((book, idx) => (
                  <button
                    key={book.id}
                    onClick={() => onBookSelect(book)}
                    className="w-full bg-gray-50 rounded-xl p-4 flex items-center gap-4 hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-xl text-green-600">{idx + 1}</span>
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded shadow"
                    />
                    <div className="flex-1 text-left">
                      <p className="text-sm mb-1 truncate">{book.title}</p>
                      <p className="text-xs text-gray-600 truncate">{book.author}</p>
                      <p className="text-xs text-green-600 mt-1">↑ 247명 읽는 중</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Challenges */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200">
              <h3 className="text-lg mb-3 flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <span>진행 중인 챌린지</span>
              </h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">30일 연속 독서</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      7일째
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '23%' }} />
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">이번 달 10권 읽기</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      4/10
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '40%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <div>
            {/* Recent Chosu */}
            <div className="mb-6">
              <h3 className="text-lg mb-4">이웃 초서</h3>
              <div className="space-y-4">
                {mockChosus.map(chosu => {
                  const book = mockBooks.find(b => b.id === chosu.bookId);
                  const neighbor = mockNeighbors[Math.floor(Math.random() * mockNeighbors.length)];
                  return (
                    <div key={chosu.id} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-2xl">{neighbor.avatar}</div>
                        <div className="flex-1">
                          <div className="text-sm">{neighbor.name}</div>
                          <div className="text-xs text-gray-500">{chosu.date}</div>
                        </div>
                      </div>
                      <p className="text-gray-800 mb-3 leading-relaxed">
                        "{chosu.text}"
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span>{book?.title}</span>
                          <span>·</span>
                          <span>p.{chosu.page}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors">
                            <span className="text-lg">♥</span>
                            <span className="text-xs">{chosu.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 text-gray-600 hover:text-green-600 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Neighbor Activity */}
            <div className="mb-6">
              <h3 className="text-lg mb-4">이웃 활동</h3>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm mb-2">
                    <span className="text-green-600">책벌레민수</span>님이 <span className="text-gray-900">코스모스</span>를 완독했어요
                  </p>
                  <p className="text-xs text-gray-500">2시간 전</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm mb-2">
                    <span className="text-green-600">독서왕지수</span>님이 30일 챌린지를 완료했어요
                  </p>
                  <p className="text-xs text-gray-500">4시간 전</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm mb-2">
                    <span className="text-green-600">책사랑수지</span>님이 당신의 초서에 좋아요를 눌렀어요
                  </p>
                  <p className="text-xs text-gray-500">어제</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'search' && (
          <div>
            {/* Recent Searches */}
            <div className="mb-6">
              <h3 className="text-lg mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-400" />
                <span>최근 검색</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {['데미안', '헤르만 헤세', '고전 문학', '자기계발'].map(term => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Searches */}
            <div className="mb-6">
              <h3 className="text-lg mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span>인기 검색어</span>
              </h3>
              <div className="space-y-2">
                {['데미안', '아몬드', '생각에 관한 생각', '82년생 김지영', '코스모스'].map((term, idx) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span className="text-green-600 w-6">{idx + 1}</span>
                    <span className="flex-1 text-left">{term}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Search by Category */}
            <div>
              <h3 className="text-lg mb-4">카테고리별 검색</h3>
              <div className="grid grid-cols-2 gap-3">
                {['문학', '소설', '인문', '과학', '역사', '철학', '자기계발', '경제'].map(category => (
                  <button
                    key={category}
                    className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl text-center border border-green-200 hover:shadow-md transition-shadow"
                  >
                    <span className="text-sm text-gray-800">{category}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

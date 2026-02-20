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
    <div className="max-w-md mx-auto min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 bg-black/90 backdrop-blur-md z-10" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6" style={{ color: '#00FF00' }} />
            </button>
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
              <input
                type="text"
                placeholder="책, 저자, 문장 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl focus:outline-none text-white"
                style={{ 
                  background: 'var(--surface-2)', 
                  border: '1px solid var(--border-subtle)',
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#00FF00'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('trend')}
              className={`flex-1 py-2 rounded-lg text-sm transition-all ${
                activeTab === 'trend' ? 'text-black' : 'text-white'
              }`}
              style={activeTab === 'trend' ? { background: '#00FF00', boxShadow: '0 0 15px rgba(0, 255, 0, 0.4)' } : { background: 'var(--surface-2)' }}
            >
              트렌드
            </button>
            <button
              onClick={() => setActiveTab('social')}
              className={`flex-1 py-2 rounded-lg text-sm transition-all ${
                activeTab === 'social' ? 'text-black' : 'text-white'
              }`}
              style={activeTab === 'social' ? { background: '#00FF00', boxShadow: '0 0 15px rgba(0, 255, 0, 0.4)' } : { background: 'var(--surface-2)' }}
            >
              이웃 소식
            </button>
            <button
              onClick={() => setActiveTab('search')}
              className={`flex-1 py-2 rounded-lg text-sm transition-all ${
                activeTab === 'search' ? 'text-black' : 'text-white'
              }`}
              style={activeTab === 'search' ? { background: '#00FF00', boxShadow: '0 0 15px rgba(0, 255, 0, 0.4)' } : { background: 'var(--surface-2)' }}
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
            <div className="rounded-2xl p-6 text-white mb-6 relative overflow-hidden card-minimal" style={{ background: 'linear-gradient(to bottom right, rgba(255, 0, 255, 0.3), rgba(255, 0, 127, 0.3))', borderColor: 'rgba(255, 0, 255, 0.3)' }}>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm">11월 기획전</span>
                </div>
                <h2 className="text-xl mb-2">겨울을 위한 책</h2>
                <p className="text-sm mb-4" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  따뜻한 감성이 필요한 계절
                </p>
                <button className="text-black px-4 py-2 rounded-lg text-sm hover:shadow-lg transition-all" style={{ background: '#00FF00' }}>
                  둘러보기
                </button>
              </div>
              <div className="absolute right-4 bottom-4 text-6xl opacity-20">📚</div>
            </div>

            {/* New Releases */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg text-white">신작 & 화제의 책</h3>
                <button className="text-sm hover:underline" style={{ color: '#00FF00' }}>전체보기</button>
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
                      style={{ boxShadow: '0 0 10px rgba(0, 255, 0, 0.1)' }}
                    />
                    <p className="text-sm truncate text-[15px] text-white">{book.title}</p>
                    <p className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>{book.author}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Reading Trend */}
            <div className="mb-6">
              <h3 className="text-lg mb-4 flex items-center gap-2 text-white">
                <TrendingUp className="w-5 h-5" style={{ color: '#00FF00' }} />
                <span>독서 추세</span>
              </h3>
              <div className="space-y-3">
                {mockBooks.map((book, idx) => (
                  <button
                    key={book.id}
                    onClick={() => onBookSelect(book)}
                    className="w-full rounded-xl p-4 flex items-center gap-4 hover:shadow-sm transition-all card-minimal"
                    style={{ borderColor: 'var(--border-subtle)' }}
                  >
                    <span className="text-xl font-bold" style={{ color: '#00FF00' }}>{idx + 1}</span>
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded shadow"
                    />
                    <div className="flex-1 text-left">
                      <p className="text-sm mb-1 truncate text-white">{book.title}</p>
                      <p className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>{book.author}</p>
                      <p className="text-xs mt-1" style={{ color: '#00FF00' }}>↑ 247명 읽는 중</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Challenges */}
            
          </div>
        )}

        {activeTab === 'social' && (
          <div>
            {/* Recent Chosu */}
            <div className="mb-6">
              <h3 className="text-lg mb-4 text-white">이웃 초서</h3>
              <div className="space-y-4">
                {mockChosus.map(chosu => {
                  const book = mockBooks.find(b => b.id === chosu.bookId);
                  const neighbor = mockNeighbors[Math.floor(Math.random() * mockNeighbors.length)];
                  return (
                    <div key={chosu.id} className="rounded-xl p-4 shadow-sm card-minimal" style={{ borderColor: 'var(--border-subtle)' }}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-2xl">{neighbor.avatar}</div>
                        <div className="flex-1">
                          <div className="text-sm text-white">{neighbor.name}</div>
                          <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{chosu.date}</div>
                        </div>
                      </div>
                      <p className="mb-3 leading-relaxed text-sm" style={{ color: 'var(--text-secondary)' }}>
                        "{chosu.text}"
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                          <span>{book?.title}</span>
                          <span>·</span>
                          <span>p.{chosu.page}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 hover:text-rose-500 transition-colors" style={{ color: 'var(--text-tertiary)' }}>
                            <span className="text-lg">♥</span>
                            <span className="text-xs">{chosu.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 transition-colors" style={{ color: 'var(--text-tertiary)' }} onMouseEnter={(e) => e.currentTarget.style.color = '#00FF00'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-tertiary)'}>
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
              <h3 className="text-lg mb-4 text-white">이웃 활동</h3>
              <div className="space-y-3">
                <div className="rounded-xl p-4 card-minimal" style={{ borderColor: 'var(--border-subtle)' }}>
                  <p className="text-sm mb-2">
                    <span style={{ color: '#00FF00' }}>책벌레민수</span>님이 <span className="text-white">코스모스</span>를 완독했어요
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>2시간 전</p>
                </div>
                <div className="rounded-xl p-4 card-minimal" style={{ borderColor: 'var(--border-subtle)' }}>
                  <p className="text-sm mb-2">
                    <span style={{ color: '#00FF00' }}>독서왕지수</span>님이 30일 챌린지를 완료했어요
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>4시간 전</p>
                </div>
                <div className="rounded-xl p-4 card-minimal" style={{ borderColor: 'var(--border-subtle)' }}>
                  <p className="text-sm mb-2">
                    <span style={{ color: '#00FF00' }}>책사랑수지</span>님이 당신의 초서에 좋아요를 눌렀어요
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>어제</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'search' && (
          <div>
            {/* Recent Searches */}
            <div className="mb-6">
              <h3 className="text-lg mb-4 flex items-center gap-2 text-white">
                <Clock className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
                <span>최근 검색</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {['데미안', '헤르만 헤세', '고전 문학', '자기계발'].map(term => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-4 py-2 rounded-full text-sm transition-all"
                    style={{ background: 'var(--surface-2)', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 255, 0, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(0, 255, 0, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--surface-2)';
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Searches */}
            <div className="mb-6">
              <h3 className="text-lg mb-4 flex items-center gap-2 text-white">
                <TrendingUp className="w-5 h-5" style={{ color: '#00FF00' }} />
                <span>인기 검색어</span>
              </h3>
              <div className="space-y-2">
                {['데미안', '아몬드', '생각에 관한 생각', '82년생 김지영', '코스모스'].map((term, idx) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface-2)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <span className="w-6" style={{ color: '#00FF00' }}>{idx + 1}</span>
                    <span className="flex-1 text-left text-white">{term}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Search by Category */}
            <div>
              <h3 className="text-lg mb-4 text-white">카테고리별 검색</h3>
              <div className="grid grid-cols-2 gap-3">
                {['문학', '소설', '인문', '과학', '역사', '철학', '자기계발', '경제'].map(category => (
                  <button
                    key={category}
                    className="p-4 rounded-xl text-center border transition-all hover:shadow-neon"
                    style={{ background: 'rgba(0, 255, 0, 0.1)', borderColor: 'rgba(0, 255, 0, 0.3)' }}
                  >
                    <span className="text-sm" style={{ color: '#00FF00' }}>{category}</span>
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

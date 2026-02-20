import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, BookMarked, Star, Heart, Settings, Share2, Award, Brain, Zap } from 'lucide-react';
import { Book, Screen } from '../App';
import { mockBooks } from '../data/mockData';
import { ComingSoonToast } from './ComingSoonToast';

interface MyPageProps {
  onBookSelect: (book: Book) => void;
  onNavigate: (screen: Screen) => void;
  onBack: () => void;
}

export function MyPage({ onBookSelect, onNavigate, onBack }: MyPageProps) {
  const [activeTab, setActiveTab] = useState<'reading' | 'want' | 'completed'>('reading');
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonMessage, setComingSoonMessage] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  const showComingSoonToast = (message: string) => {
    setComingSoonMessage(message);
    setShowComingSoon(true);
  };

  const readingBooks = mockBooks.filter(b => b.status === 'reading');
  const wantToReadBooks = mockBooks.filter(b => b.status === 'want-to-read');
  const completedBooks = mockBooks.filter(b => b.status === 'completed');

  const displayBooks = activeTab === 'reading' ? readingBooks : 
                        activeTab === 'want' ? wantToReadBooks : 
                        completedBooks;

  // Level progress calculation (current XP / next level XP)
  const currentLevel = 42;
  const currentXP = 8750;
  const nextLevelXP = 10000;
  const levelProgress = (currentXP / nextLevelXP) * 100;

  // Scroll to top when tab changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  // Handle tab change with scroll reset
  const handleTabChange = (tab: 'reading' | 'want' | 'completed') => {
    setActiveTab(tab);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="text-white" style={{ background: 'linear-gradient(to right, rgba(0, 255, 0, 0.2), rgba(0, 255, 255, 0.2))' }}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6" style={{ color: '#00FF00' }} />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors" onClick={() => showComingSoonToast('설정 기능을 열심히 만들고 있어요!')}>
              <Settings className="w-6 h-6" style={{ color: '#00FF00' }} />
            </button>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-neon" style={{ background: 'linear-gradient(to bottom right, #00FF00, #00FFFF)' }}>
              🌳
            </div>
            <div className="flex-1">
              <h2 className="text-2xl mb-1 text-white">독서러버</h2>
              <p className="text-sm mb-2" style={{ color: 'rgba(0, 255, 0, 0.7)' }}>레벨 {currentLevel} · 나이테 89개</p>
              <button className="text-sm px-3 py-1 rounded-full hover:scale-105 transition-transform" style={{ background: 'rgba(0, 255, 0, 0.2)', border: '1px solid rgba(0, 255, 0, 0.3)', color: '#00FF00' }} onClick={() => showComingSoonToast('프로필 수정 기능을 준비하고 있어요!')}>
                프로필 수정
              </button>
            </div>
          </div>

          {/* Level Progress Bar - NEW */}
          <div className="mb-6 rounded-xl p-4" style={{ background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(0, 255, 0, 0.2)' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" style={{ color: '#00FF00' }} />
                <span className="text-xs font-bold" style={{ color: '#00FF00' }}>다음 레벨까지</span>
              </div>
              <span className="text-xs font-bold text-white">{nextLevelXP - currentXP} XP</span>
            </div>
            <div className="w-full rounded-full h-2.5 overflow-hidden mb-1" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div
                className="h-2.5 rounded-full transition-all duration-500"
                style={{ 
                  width: `${levelProgress}%`,
                  background: 'linear-gradient(to right, #00FF00, #00FFFF)',
                  boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)'
                }}
              />
            </div>
            <div className="flex justify-between text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              <span>{currentXP.toLocaleString()} XP</span>
              <span>{nextLevelXP.toLocaleString()} XP</span>
            </div>
          </div>

          {/* Stats - NOW CLICKABLE */}
          <div className="grid grid-cols-4 gap-3">
            <button 
              onClick={() => handleTabChange('reading')}
              className="rounded-lg p-3 text-center transition-all hover:scale-105 active:scale-95" 
              style={{ background: 'rgba(0, 255, 0, 0.15)', border: '1px solid rgba(0, 255, 0, 0.3)' }}
            >
              <div className="text-xl mb-1 text-white">{readingBooks.length}</div>
              <div className="text-xs" style={{ color: 'rgba(0, 255, 0, 0.7)' }}>읽는 중</div>
            </button>
            <button 
              onClick={() => handleTabChange('want')}
              className="rounded-lg p-3 text-center transition-all hover:scale-105 active:scale-95" 
              style={{ background: 'rgba(0, 255, 255, 0.15)', border: '1px solid rgba(0, 255, 255, 0.3)' }}
            >
              <div className="text-xl mb-1 text-white">{wantToReadBooks.length}</div>
              <div className="text-xs" style={{ color: 'rgba(0, 255, 255, 0.7)' }}>읽을 책</div>
            </button>
            <button 
              onClick={() => handleTabChange('completed')}
              className="rounded-lg p-3 text-center transition-all hover:scale-105 active:scale-95" 
              style={{ background: 'rgba(255, 0, 255, 0.15)', border: '1px solid rgba(255, 0, 255, 0.3)' }}
            >
              <div className="text-xl mb-1 text-white">{completedBooks.length}</div>
              <div className="text-xs" style={{ color: 'rgba(255, 0, 255, 0.7)' }}>완독</div>
            </button>
            <div className="rounded-lg p-3 text-center" style={{ background: 'rgba(255, 255, 0, 0.15)', border: '1px solid rgba(255, 255, 0, 0.3)' }}>
              <div className="text-xl mb-1 text-white">12</div>
              <div className="text-xs" style={{ color: 'rgba(255, 255, 0, 0.7)' }}>이번 달</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex" style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
          <button
            onClick={() => handleTabChange('reading')}
            className={`flex-1 py-3 text-sm transition-colors ${
              activeTab === 'reading' ? 'text-black' : 'text-white'
            }`}
            style={activeTab === 'reading' ? { background: '#00FF00' } : {}}
          >
            읽는 책 ({readingBooks.length})
          </button>
          <button
            onClick={() => handleTabChange('want')}
            className={`flex-1 py-3 text-sm transition-colors ${
              activeTab === 'want' ? 'text-black' : 'text-white'
            }`}
            style={activeTab === 'want' ? { background: '#00FF00' } : {}}
          >
            읽을 책 ({wantToReadBooks.length})
          </button>
          <button
            onClick={() => handleTabChange('completed')}
            className={`flex-1 py-3 text-sm transition-colors ${
              activeTab === 'completed' ? 'text-black' : 'text-white'
            }`}
            style={activeTab === 'completed' ? { background: '#00FF00' } : {}}
          >
            완독 ({completedBooks.length})
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="p-6" ref={contentRef}>
        {/* Books Grid */}
        {displayBooks.length > 0 ? (
          <div className="space-y-4 mb-6">
            {displayBooks.map(book => (
              <button
                key={book.id}
                onClick={() => onBookSelect(book)}
                className="w-full rounded-xl p-4 flex gap-4 hover:shadow-neon transition-all text-left card-minimal"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-20 h-28 object-cover rounded-lg shadow flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm mb-1 truncate text-white">{book.title}</h3>
                  <p className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>{book.author}</p>
                  
                  {book.status === 'reading' && (
                    <>
                      <div className="mb-2">
                        <div className="flex items-center justify-between text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>
                          <span>{book.currentPage} / {book.totalPages}p</span>
                          <span style={{ color: '#00FF00' }}>{Math.round((book.currentPage / book.totalPages) * 100)}%</span>
                        </div>
                        <div className="w-full rounded-full h-1.5" style={{ background: 'var(--surface-elevated)' }}>
                          <div
                            className="h-1.5 rounded-full"
                            style={{ width: `${(book.currentPage / book.totalPages) * 100}%`, background: 'linear-gradient(to right, #00FF00, #00FFFF)' }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
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
                            className={`w-4 h-4 ${i < Math.floor(book.rating || 0) ? 'fill-current' : ''}`}
                            style={{ color: i < Math.floor(book.rating || 0) ? '#FFFF00' : 'var(--text-disabled)' }}
                          />
                        ))}
                      </div>
                      <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        {book.lastReadDate}에 완독
                      </div>
                    </div>
                  )}

                  {book.status === 'want-to-read' && (
                    <div className="flex gap-2">
                      <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(0, 255, 255, 0.15)', color: '#00FFFF', border: '1px solid rgba(0, 255, 255, 0.3)' }}>
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
            <BookMarked className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--text-disabled)' }} />
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>아직 책이 없어요</p>
            <button
              onClick={() => onNavigate('search')}
              className="px-6 py-3 rounded-xl hover:shadow-neon transition-all text-black"
              style={{ background: '#00FF00' }}
            >
              책 찾아보기
            </button>
          </div>
        )}

        {/* Reading Preferences */}
        <div className="mb-6">
          <h3 className="text-lg mb-4 text-white">독서 취향</h3>
          <div className="rounded-2xl p-6 card-minimal" style={{ background: 'rgba(255, 0, 255, 0.1)', borderColor: 'rgba(255, 0, 255, 0.3)' }}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>선호 장르</div>
                <div className="text-lg" style={{ color: '#FF00FF' }}>문학</div>
              </div>
              <div>
                <div className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>평균 속도</div>
                <div className="text-lg" style={{ color: '#FF00FF' }}>23p/시간</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {['문학', '소설', '인문', '철학'].map(genre => (
                <span key={genre} className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(255, 0, 255, 0.2)', color: '#FF00FF', border: '1px solid rgba(255, 0, 255, 0.3)' }}>
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-white">업적</h3>
            <button 
              onClick={() => onNavigate('analytics')}
              className="text-sm hover:underline"
              style={{ color: '#00FF00' }}
            >
              전체보기
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <button className="rounded-xl p-4 text-center card-minimal group hover:scale-110 hover:shadow-neon transition-all duration-300 active:scale-95" style={{ background: 'rgba(255, 255, 0, 0.1)', borderColor: 'rgba(255, 255, 0, 0.3)' }}>
              <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">🏆</div>
              <div className="text-xs group-hover:font-bold transition-all" style={{ color: '#FFFF00' }}>7일 연속</div>
            </button>
            <button className="rounded-xl p-4 text-center card-minimal group hover:scale-110 hover:shadow-neon transition-all duration-300 active:scale-95" style={{ background: 'rgba(0, 255, 255, 0.1)', borderColor: 'rgba(0, 255, 255, 0.3)' }}>
              <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">📚</div>
              <div className="text-xs group-hover:font-bold transition-all" style={{ color: '#00FFFF' }}>100권 완독</div>
            </button>
            <button className="rounded-xl p-4 text-center card-minimal group hover:scale-110 hover:shadow-neon transition-all duration-300 active:scale-95" style={{ background: 'rgba(0, 255, 0, 0.1)', borderColor: 'rgba(0, 255, 0, 0.3)' }}>
              <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">⚡</div>
              <div className="text-xs group-hover:font-bold transition-all" style={{ color: '#00FF00' }}>챌린지 왕</div>
            </button>
          </div>
        </div>

        {/* Similar Taste Users - ENHANCED with "뿌리 얽힘" visualization */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-white">뿌리가 얽힌 독서 친구</h3>
            <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(0, 255, 0, 0.15)', color: '#00FF00', border: '1px solid rgba(0, 255, 0, 0.3)' }}>3명</span>
          </div>
          <div className="space-y-3">
            {[
              { name: '책덕후김씨', level: 35, overlap: 87, books: 3, color: '#00FF00' },
              { name: '문학소녀이씨', level: 40, overlap: 86, books: 5, color: '#00FFFF' },
              { name: '독서광박씨', level: 45, overlap: 85, books: 2, color: '#FF00FF' }
            ].map((user, idx) => (
              <div key={user.name} className="rounded-xl p-4 card-minimal hover:shadow-neon transition-all group" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-md" style={{ background: 'linear-gradient(to bottom right, #00FF00, #00FFFF)' }}>
                    🌲
                  </div>
                  <div className="flex-1">
                    <div className="text-sm mb-1 text-white font-bold">{user.name}</div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>레벨 {user.level} · {user.books}권의 책이 얽힘</div>
                  </div>
                  <button 
                    className="text-sm hover:underline px-3 py-1.5 rounded-full transition-all hover:scale-105" 
                    style={{ color: '#00FF00', background: 'rgba(0, 255, 0, 0.1)', border: '1px solid rgba(0, 255, 0, 0.2)' }} 
                    onClick={() => showComingSoonToast('팔로우 기능 곧 찾아올게요!')}
                  >
                    팔로우
                  </button>
                </div>
                
                {/* Root Overlap Visualization */}
                <div className="rounded-lg p-3" style={{ background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(0, 255, 0, 0.2)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>뿌리 얽힘 강도</span>
                    <span className="text-xs font-bold" style={{ color: user.color }}>{user.overlap}%</span>
                  </div>
                  <div className="w-full rounded-full h-2 overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                    <div
                      className="h-2 rounded-full transition-all duration-500 group-hover:animate-pulse"
                      style={{ 
                        width: `${user.overlap}%`,
                        background: `linear-gradient(to right, ${user.color}, rgba(255, 255, 255, 0.3))`,
                        boxShadow: `0 0 8px ${user.color}50`
                      }}
                    />
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <div className="flex -space-x-1">
                      {Array.from({ length: Math.min(user.books, 3) }).map((_, i) => (
                        <div 
                          key={i} 
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] shadow-sm" 
                          style={{ background: 'var(--surface-2)', border: '2px solid var(--surface-1)' }}
                        >
                          📖
                        </div>
                      ))}
                    </div>
                    <span className="text-[10px] ml-1" style={{ color: 'var(--text-tertiary)' }}>같이 읽은 책</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button 
            onClick={() => onNavigate('choseo-insights')}
            className="w-full rounded-xl p-4 flex items-center justify-between hover:shadow-neon transition-all text-white"
            style={{ background: 'linear-gradient(to bottom right, rgba(255, 0, 255, 0.3), rgba(138, 43, 226, 0.3))', border: '1px solid rgba(255, 0, 255, 0.3)' }}
          >
            <div className="flex items-center gap-3">
              <Brain className="w-5 h-5" />
              <span className="text-sm font-bold">초서 인사이트 보기 ✨</span>
            </div>
            <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>›</span>
          </button>
          <button className="w-full rounded-xl p-4 flex items-center justify-between hover:shadow-sm transition-all card-minimal" style={{ borderColor: 'var(--border-subtle)' }} onClick={() => showComingSoonToast('내가 좋아요 한 초서를 곧 볼 수 있어요!')}>
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5" style={{ color: '#FF00FF' }} />
              <span className="text-sm text-white">내가 좋아요 한 초서</span>
            </div>
            <span style={{ color: 'var(--text-tertiary)' }}>›</span>
          </button>
          <button className="w-full rounded-xl p-4 flex items-center justify-between hover:shadow-sm transition-all card-minimal" style={{ borderColor: 'var(--border-subtle)' }} onClick={() => showComingSoonToast('내가 쓴 글 모아보기 기능 준비 중!')}>
            <div className="flex items-center gap-3">
              <Share2 className="w-5 h-5" style={{ color: '#00FFFF' }} />
              <span className="text-sm text-white">내가 쓴 글</span>
            </div>
            <span style={{ color: 'var(--text-tertiary)' }}>›</span>
          </button>
          <button 
            onClick={() => onNavigate('analytics')}
            className="w-full rounded-xl p-4 flex items-center justify-between hover:shadow-sm transition-all card-minimal"
            style={{ borderColor: 'var(--border-subtle)' }}
          >
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5" style={{ color: '#FFFF00' }} />
              <span className="text-sm text-white">독서 통계</span>
            </div>
            <span style={{ color: 'var(--text-tertiary)' }}>›</span>
          </button>
        </div>
      </div>

      {/* Coming Soon Toast */}
      {showComingSoon && (
        <ComingSoonToast
          message={comingSoonMessage}
          onClose={() => setShowComingSoon(false)}
        />
      )}
    </div>
  );
}
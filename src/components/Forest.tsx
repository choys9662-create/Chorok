import { useState, Suspense, lazy } from 'react';
import { ArrowLeft, Users, Library, Compass, TreePine, Target, Zap, BookOpen, Sparkles, TrendingUp, UserPlus, Heart, Award } from 'lucide-react';
import { Screen } from '../App';
const GenerativeMountainScene = lazy(() => import('./ui/mountain-scene'));
import { NeonOrbs } from './ui/neon-orbs';
import BookShelfHero, { Book } from './ui/book-shelf-hero';
import { BookDiscussionChat } from './BookDiscussionChat';

interface ForestProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}

// Clan stats
const clanStats = {
  level: 42,
  area: 15,
  density: 127,
  activeMembers: 3,
  weeklyGoal: {
    target: 1000,
    current: 720,
    title: '이번 주 목표: 1000분 달성'
  }
};

// Books data for 서고
const clanBooks: Book[] = [
  {
    id: '1',
    title: '코스모스',
    author: '칼 세이건',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&q=80',
    participants: 2,
    recentActivity: '5분 전'
  },
  {
    id: '2',
    title: '사피엔스',
    author: '유발 하라리',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&q=80',
    participants: 1,
    recentActivity: '1시간 전'
  },
  {
    id: '3',
    title: '1984',
    author: '조지 오웰',
    cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&q=80',
    participants: 1,
    recentActivity: '2시간 전'
  },
  {
    id: '4',
    title: '총, 균, 쇠',
    author: '재레드 다이아몬드',
    cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&q=80',
    participants: 3,
    recentActivity: '방금 전'
  },
  {
    id: '5',
    title: '이기적 유전자',
    author: '리처드 도킨스',
    cover: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=300&q=80',
    participants: 2,
    recentActivity: '10분 전'
  },
  {
    id: '6',
    title: '노인과 바다',
    author: '어니스트 헤밍웨이',
    cover: 'https://images.unsplash.com/photo-1476362555312-ab9e108a0b7e?w=300&q=80',
    participants: 1,
    recentActivity: '30분 전'
  },
  {
    id: '7',
    title: '데미안',
    author: '헤르만 헤세',
    cover: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=300&q=80',
    participants: 2,
    recentActivity: '15분 전'
  },
  {
    id: '8',
    title: '멋진 신세계',
    author: '올더스 헉슬리',
    cover: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=300&q=80',
    participants: 1,
    recentActivity: '1시간 전'
  }
];

export function Forest({ onBack, onNavigate }: ForestProps) {
  const [selectedTab, setSelectedTab] = useState<'forest' | 'members' | 'explore' | 'archive'>('forest');
  const [competitionMetric, setCompetitionMetric] = useState<'time' | 'completion' | 'quality' | 'diversity' | 'streak' | 'activity'>('time');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const progressPercent = (clanStats.weeklyGoal.current / clanStats.weeklyGoal.target) * 100;

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
  };

  const handleBackToShelf = () => {
    setSelectedBook(null);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-black relative overflow-hidden">
      
      {/* === 숲 TAB (Main 3D Mountain Scene) === */}
      {selectedTab === 'forest' && (
        <div className="absolute inset-0 w-full h-full">
          {/* Neon Orbs Background */}
          <div className="absolute inset-0">
            <NeonOrbs />
          </div>

          {/* Atmospheric overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-transparent to-emerald-950/30 pointer-events-none" />
          
          {/* Floating UI chips */}
          <div className="absolute top-20 right-6 z-40 animate-float">
            <button className="backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg border hover:scale-105 transition-transform active:scale-95 flex items-center gap-2" style={{ background: 'var(--surface-elevated)', borderColor: 'var(--border-subtle)', boxShadow: '0 0 20px rgba(0, 255, 0, 0.2)' }}>
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00FF00' }}></div>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(0, 255, 0, 0.5)' }}></div>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(0, 255, 0, 0.5)' }}></div>
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00FF00', animationDelay: '0.3s' }}></div>
              </div>
              <span className="text-xs font-bold text-white">그룹 영역 보기</span>
            </button>
          </div>

          <div className="absolute top-48 left-6 z-40 animate-float" style={{ animationDelay: '1s' }}>
            <button className="backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border hover:scale-105 transition-transform active:scale-95 flex items-center gap-2" style={{ background: 'var(--surface-elevated)', borderColor: 'var(--border-subtle)', boxShadow: '0 0 15px rgba(255, 0, 255, 0.2)' }}>
              <Target className="w-4 h-4" style={{ color: '#FF00FF' }} />
              <div className="text-left">
                <div className="text-[10px] font-medium" style={{ color: 'var(--text-secondary)' }}>이번 주 목표</div>
                <div className="text-xs font-bold" style={{ color: '#FF00FF' }}>{progressPercent.toFixed(0)}%</div>
              </div>
            </button>
          </div>

          <div className="absolute bottom-40 right-8 z-40 animate-float" style={{ animationDelay: '0.5s' }}>
            <button 
              className="px-5 py-2.5 rounded-full shadow-lg border hover:scale-105 transition-transform active:scale-95 font-bold text-sm flex items-center gap-2 text-white"
              onClick={() => onNavigate('timer')}
              style={{ background: 'linear-gradient(to right, #00FF00, #00FFFF)', borderColor: 'rgba(0, 255, 0, 0.3)', boxShadow: '0 0 20px rgba(0, 255, 0, 0.4)' }}
            >
              <Zap className="w-4 h-4" />
              바로 초록
            </button>
          </div>

          {/* Firefly indicators (reading members) */}
          <div className="absolute top-32 left-1/4 z-30">
            <div className="relative">
              <div className="w-3 h-3 rounded-full animate-ping opacity-75" style={{ background: '#FFFF00' }}></div>
              <div className="absolute top-0 left-0 w-3 h-3 rounded-full blur-sm" style={{ background: '#FFFF00' }}></div>
            </div>
          </div>
          <div className="absolute top-60 right-1/3 z-30 animate-float" style={{ animationDelay: '1.5s' }}>
            <div className="relative">
              <div className="w-2.5 h-2.5 rounded-full animate-ping opacity-75" style={{ background: '#FFFF00', animationDelay: '0.5s' }}></div>
              <div className="absolute top-0 left-0 w-2.5 h-2.5 rounded-full blur-sm" style={{ background: '#FFFF00' }}></div>
            </div>
          </div>
          <div className="absolute bottom-52 left-1/2 z-30 animate-float" style={{ animationDelay: '2s' }}>
            <div className="relative">
              <div className="w-2 h-2 rounded-full animate-ping opacity-75" style={{ background: '#FFFF00' }}></div>
              <div className="absolute top-0 left-0 w-2 h-2 rounded-full blur-sm" style={{ background: '#FFFF00' }}></div>
            </div>
          </div>

          {/* Clan stats overlay card */}
          <div className="absolute bottom-32 left-6 right-6 z-40">
            <div className="backdrop-blur-md rounded-3xl p-5 shadow-xl border card-minimal" style={{ borderColor: 'var(--border-subtle)', boxShadow: '0 0 30px rgba(0, 255, 0, 0.2)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(to bottom right, #00FF00, #00FFFF)' }}>
                  <TreePine className="w-6 h-6 text-black" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white">책벌레 클랜</h3>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Lv.{clanStats.level} • {clanStats.activeMembers}명 독서중</p>
                </div>
                <button className="p-2 rounded-full transition-colors hover:bg-white/5">
                  <Sparkles className="w-5 h-5" style={{ color: '#FFFF00' }} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-2xl border" style={{ background: 'rgba(0, 255, 0, 0.1)', borderColor: 'rgba(0, 255, 0, 0.3)' }}>
                  <div className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>레벨</div>
                  <div className="text-xl font-bold" style={{ color: '#00FF00' }}>{clanStats.level}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: '#00FF00' }}>시간</div>
                </div>
                <div className="text-center p-3 rounded-2xl border" style={{ background: 'rgba(0, 255, 255, 0.1)', borderColor: 'rgba(0, 255, 255, 0.3)' }}>
                  <div className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>영역</div>
                  <div className="text-xl font-bold" style={{ color: '#00FFFF' }}>{clanStats.area}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: '#00FFFF' }}>완독</div>
                </div>
                <div className="text-center p-3 rounded-2xl border" style={{ background: 'rgba(255, 0, 255, 0.1)', borderColor: 'rgba(255, 0, 255, 0.3)' }}>
                  <div className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>밀도</div>
                  <div className="text-xl font-bold" style={{ color: '#FF00FF' }}>{clanStats.density}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: '#FF00FF' }}>초서</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* === 숲지기 TAB (Members) === */}
      {selectedTab === 'members' && (
        <div className="p-6 pb-32 space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">숲지기</h2>
            <button className="px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:scale-105 transition-transform active:scale-95 text-black" style={{ background: '#00FF00', boxShadow: '0 0 15px rgba(0, 255, 0, 0.4)' }}>
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                초대하기
              </div>
            </button>
          </div>

          {/* Clan Introduction */}
          <div className="card-minimal rounded-2xl p-4 border shadow-sm" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4" style={{ color: '#00FF00' }} />
              <h3 className="text-sm font-bold text-white">클랜 소개</h3>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              "책을 사랑하는 사람들이 모여 함께 성장하는 공간입니다. 매주 다양한 분야의 책을 읽고 생각을 나눕니다."
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-medium" style={{ background: 'rgba(0, 255, 0, 0.15)', color: '#00FF00', border: '1px solid rgba(0, 255, 0, 0.3)' }}>주 3회 이상 독서</span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-medium" style={{ background: 'rgba(0, 255, 0, 0.15)', color: '#00FF00', border: '1px solid rgba(0, 255, 0, 0.3)' }}>장르 다양성</span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-medium" style={{ background: 'rgba(0, 255, 0, 0.15)', color: '#00FF00', border: '1px solid rgba(0, 255, 0, 0.3)' }}>서로 존중</span>
            </div>
          </div>

          {/* Weekly Stats Summary */}
          <div className="card-minimal rounded-2xl p-4 border shadow-sm" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4" style={{ color: '#FF00FF' }} />
              <h3 className="text-sm font-bold text-white">이번 주 클랜 통계</h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl p-3 text-center" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}>
                <div className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>총 독서</div>
                <div className="text-lg font-bold" style={{ color: '#FF00FF' }}>720분</div>
                <div className="text-[10px] mt-0.5" style={{ color: '#00FF00' }}>목표 72%</div>
              </div>
              <div className="rounded-xl p-3 text-center" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}>
                <div className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>완독</div>
                <div className="text-lg font-bold" style={{ color: '#00FFFF' }}>12권</div>
                <div className="text-[10px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>평균 4권/인</div>
              </div>
              <div className="rounded-xl p-3 text-center" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}>
                <div className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>초서</div>
                <div className="text-lg font-bold" style={{ color: '#FFFF00' }}>89개</div>
                <div className="text-[10px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>☀️ 2,234</div>
              </div>
            </div>
          </div>

          {/* MVP of the Week */}
          <div className="card-minimal rounded-2xl p-4 border shadow-lg" style={{ borderColor: 'rgba(255, 255, 0, 0.3)', boxShadow: '0 0 20px rgba(255, 255, 0, 0.1)' }}>
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5" style={{ color: '#FFFF00' }} />
              <h3 className="text-sm font-bold text-white">이번 주 MVP</h3>
            </div>
            <div className="rounded-xl p-3" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md relative" style={{ background: 'linear-gradient(to bottom right, #FFFF00, #FFD700)' }}>
                  👑
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs" style={{ background: '#FFFF00' }}>
                    🌟
                  </div>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-white">책벌레민수</div>
                  <div className="text-xs font-medium" style={{ color: '#FFFF00' }}>가장 많은 시간을 독서했어요!</div>
                </div>
              </div>
              <div className="text-[10px] rounded-lg p-2 mt-2" style={{ color: 'var(--text-secondary)', background: 'var(--surface-elevated)' }}>
                340분 독서 • 12개 초서 작성 • 🔥7일 연속
              </div>
            </div>
          </div>

          {/* Members */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              클랜원 ({3}명)
            </h3>
            <div className="space-y-3">
              {/* Leader */}
              <div className="card-minimal backdrop-blur-md rounded-2xl p-4 shadow-lg border" style={{ borderColor: 'rgba(0, 255, 0, 0.3)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-lg" style={{ background: 'linear-gradient(to bottom right, #FFFF00, #FFD700)', color: '#000' }}>
                    👑
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white">책벌레민수</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(255, 255, 0, 0.2)', color: '#FFFF00', border: '1px solid rgba(255, 255, 0, 0.3)' }}>숲지기</span>
                    </div>
                    <p className="text-xs font-medium flex items-center gap-1" style={{ color: '#00FF00' }}>
                      <BookOpen className="w-3 h-3" />
                      코스모스 읽는 중
                    </p>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#00FF00' }}></div>
                </div>
                <div className="mt-3 pt-3 flex items-center justify-between text-xs" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>이번 주 기여</span>
                  <span className="font-bold" style={{ color: '#00FF00' }}>340분 • 12초서</span>
                </div>
              </div>

              {/* Members */}
              {[
                { name: '독서왕지수', book: '1984', reading: false, contribution: '180분 • 8초서', level: 38 },
                { name: '책사랑수지', book: '사피엔스', reading: true, contribution: '200분 • 15초서', level: 51 }
              ].map((member, idx) => (
                <div key={idx} className="card-minimal backdrop-blur-md rounded-2xl p-4 shadow-sm border" style={{ borderColor: 'var(--border-subtle)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-md text-black" style={{ background: 'linear-gradient(to bottom right, #00FF00, #00FFFF)' }}>
                      {member.name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-white">{member.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--surface-elevated)', color: 'var(--text-secondary)' }}>Lv.{member.level}</span>
                      </div>
                      <p className={`text-xs font-medium flex items-center gap-1`} style={{ color: member.reading ? '#00FF00' : 'var(--text-tertiary)' }}>
                        <BookOpen className="w-3 h-3" />
                        {member.book} {member.reading ? '읽는 중' : ''}
                      </p>
                    </div>
                    {member.reading && (
                      <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#00FF00' }}></div>
                    )}
                  </div>
                  <div className="mt-3 pt-3 flex items-center justify-between text-xs" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>이번 주 기여</span>
                    <span className="font-bold text-white">{member.contribution}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Books Being Read Together */}
          <div className="card-minimal rounded-2xl p-4 border shadow-sm" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4" style={{ color: '#00FFFF' }} />
              <h3 className="text-sm font-bold text-white">뿌리가 얽힌 책</h3>
            </div>
            <div className="space-y-2">
              {[
                { title: '코스모스', readers: 2, color: '#FF00FF' },
                { title: '사피엔스', readers: 1, color: '#00FFFF' },
                { title: '1984', readers: 1, color: '#FFFF00' }
              ].map((book, idx) => (
                <div key={idx} className="rounded-xl p-3 flex items-center gap-3" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}>
                  <div className="w-8 h-10 rounded-md shadow-sm flex items-center justify-center text-xs font-bold" style={{ background: book.color, color: '#000' }}>
                    📖
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white text-sm">{book.title}</div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{book.readers}명의 뿌리가 얽힘</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Completions */}
          <div className="card-minimal rounded-2xl p-4 border shadow-sm" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4" style={{ color: '#00FF00' }} />
              <h3 className="text-sm font-bold text-white">최근 완독 책들</h3>
            </div>
            <div className="space-y-2">
              {[
                { user: '책사랑수지', book: '총, 균, 쇠', time: '2시간 전', pages: 634 },
                { user: '책벌레민수', book: '코스모스', time: '5시간 전', pages: 512 },
                { user: '독서왕지수', book: '이기적 유전자', time: '어제', pages: 478 }
              ].map((item, idx) => (
                <div key={idx} className="rounded-xl p-3" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-white">{item.user}</span>
                    <span className="text-xs" style={{ color: '#00FF00' }}>님이 완독했어요! 🎉</span>
                  </div>
                  <div className="text-sm font-bold text-white">{item.book}</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{item.pages}페이지</span>
                    <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Clan Achievements */}
          <div className="card-minimal rounded-2xl p-4 border shadow-sm" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-4 h-4" style={{ color: '#FF00FF' }} />
              <h3 className="text-sm font-bold text-white">클랜 업적</h3>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { emoji: '📚', label: '완독 100권', unlocked: true },
                { emoji: '🔥', label: '30일 연속', unlocked: true },
                { emoji: '🌟', label: '레벨 40', unlocked: true },
                { emoji: '👥', label: '멤버 10명', unlocked: false },
                { emoji: '✨', label: '초서 500개', unlocked: true },
                { emoji: '🏆', label: '순위 1위', unlocked: true },
                { emoji: '🌈', label: '모든 장르', unlocked: false },
                { emoji: '💎', label: '레벨 50', unlocked: false }
              ].map((badge, idx) => (
                <div key={idx} className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-1 ${
                  badge.unlocked 
                    ? 'border' 
                    : 'border opacity-40'
                }`} style={{ 
                  background: badge.unlocked ? 'rgba(255, 0, 255, 0.1)' : 'var(--surface-2)', 
                  borderColor: badge.unlocked ? 'rgba(255, 0, 255, 0.3)' : 'var(--border-subtle)' 
                }}>
                  <div className="text-2xl">{badge.emoji}</div>
                  <div className="text-[9px] text-center font-medium px-1" style={{ color: 'var(--text-secondary)' }}>{badge.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="card-minimal backdrop-blur-md rounded-2xl p-4 border shadow-sm" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4" style={{ color: '#00FFFF' }} />
              <h3 className="text-sm font-bold text-white">최근 활동</h3>
            </div>
            <div className="space-y-3">
              {[
                { user: '책사랑수지', action: '초서를 작성', time: '30분 전', icon: '✍️', color: '#FF00FF' },
                { user: '책벌레민수', action: '독서 시작', time: '1시간 전', icon: '📖', color: '#00FF00' },
                { user: '독서왕지수', action: '햇살 5개 받음', time: '2시간 전', icon: '☀️', color: '#FFFF00' },
                { user: '책사랑수지', action: '완독 달성', time: '2시간 전', icon: '🎉', color: '#00FFFF' },
                { user: '책벌레민수', action: '서고에 메시지', time: '3시간 전', icon: '💬', color: 'var(--text-secondary)' }
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0" style={{ background: 'var(--surface-2)' }}>
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs">
                      <span className="font-bold text-white">{activity.user}</span>
                      <span className="font-medium ml-1" style={{ color: activity.color }}>님이 {activity.action}했어요</span>
                    </div>
                    <div className="text-[10px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* === 탐험 TAB (Explore/Competition) === */}
      {selectedTab === 'explore' && (
        <div className="p-6 pb-32 space-y-6">
          <h2 className="text-xl font-bold text-white">탐험</h2>

          {/* Leaderboard */}
          <div className="card-minimal rounded-3xl p-6 border shadow-lg" style={{ borderColor: 'rgba(0, 255, 0, 0.3)', boxShadow: '0 0 30px rgba(0, 255, 0, 0.1)' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" style={{ color: '#00FF00' }} />
                <h3 className="font-bold text-white">이번 주 클랜 순위</h3>
              </div>
              <div className="text-xs font-medium" style={{ color: '#00FF00' }}>매주 월요일 초기화</div>
            </div>
            
            {/* Competition Metric Tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-3 mb-4 hide-scrollbar">
              {[
                { key: 'time', label: '시간', icon: '⏱️' },
                { key: 'completion', label: '완독', icon: '📚' },
                { key: 'quality', label: '품질', icon: '✨' },
                { key: 'diversity', label: '다양성', icon: '🌈' },
                { key: 'streak', label: '연속성', icon: '🔥' },
                { key: 'activity', label: '활성도', icon: '⚡' }
              ].map((metric) => (
                <button
                  key={metric.key}
                  onClick={() => setCompetitionMetric(metric.key as any)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all`}
                  style={{
                    background: competitionMetric === metric.key ? '#00FF00' : 'var(--surface-2)',
                    color: competitionMetric === metric.key ? '#000' : 'var(--text-secondary)',
                    boxShadow: competitionMetric === metric.key ? '0 0 10px rgba(0, 255, 0, 0.4)' : 'none'
                  }}
                >
                  <span className="mr-1">{metric.icon}</span>
                  {metric.label}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {competitionMetric === 'time' && [
                { rank: 1, name: '책벌레 클랜', score: '1,450분', extra: '완독 12권 • 🔥7일', isMe: true, trend: '↑2', growth: '+18%', mvp: '책사랑민수', mvpTime: '450분', level: 'Lv.12', speed: '1.8p/분' },
                { rank: 2, name: '고전 독서회', score: '1,380분', extra: '완독 15권 • 🔥12일', isMe: false, trend: '↓1', growth: '+12%', mvp: '철학자영희', mvpTime: '420분', level: 'Lv.14', speed: '2.1p/분', gap: '-70분' },
                { rank: 3, name: '과학 읽기 모임', score: '1,220분', extra: '완독 9권 • 🔥5일', isMe: false, trend: '↑1', growth: '+25%', mvp: '과학덕후', mvpTime: '380분', level: 'Lv.9', speed: '1.6p/분', gap: '-230분' }
              ].map((clan) => (
                <div key={clan.rank} className={`p-4 rounded-2xl border shadow-md`} style={{ 
                  background: clan.isMe ? 'rgba(0, 255, 0, 0.1)' : 'var(--surface-2)', 
                  borderColor: clan.isMe ? 'rgba(0, 255, 0, 0.3)' : 'var(--border-subtle)' 
                }}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm`} style={{
                      background: clan.rank === 1 ? '#00FF00' : clan.rank === 2 ? '#C0C0C0' : '#CD7F32',
                      color: '#000'
                    }}>
                      {clan.rank}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-white flex items-center gap-2 mb-0.5">
                        {clan.name}
                        {clan.isMe && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(0, 255, 0, 0.2)', color: '#00FF00', border: '1px solid rgba(0, 255, 0, 0.3)' }}>우리</span>}
                        <span className={`text-xs`} style={{ color: clan.trend.startsWith('↑') ? '#00FF00' : '#FF0077' }}>{clan.trend}</span>
                        <span className="text-xs" style={{ color: '#00FF00' }}>{clan.level}</span>
                      </div>
                      <div className="text-sm font-bold flex items-center gap-2" style={{ color: '#00FF00' }}>
                        {clan.score}
                        <span className="text-xs font-medium" style={{ color: '#00FF00' }}>{clan.growth}</span>
                        {clan.gap && <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>(1위 {clan.gap})</span>}
                      </div>
                      <div className="text-[10px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>{clan.extra}</div>
                      <div className="text-[10px] mt-1 font-medium" style={{ color: '#00FF00' }}>MVP: {clan.mvp} ({clan.mvpTime}) • 평균 {clan.speed}</div>
                    </div>
                  </div>
                </div>
              ))}

              {competitionMetric === 'completion' && [
                { rank: 1, name: '고전 독서회', score: '15권', extra: '1,380분 • 평균 453p', isMe: false, trend: '→', avgPages: '453p', speed: '2.1p/분', level: 'Lv.14', fastest: '92분' },
                { rank: 2, name: '책벌레 클랜', score: '12권', extra: '1,450분 • 평균 521p', isMe: true, trend: '↑1', avgPages: '521p', speed: '1.8p/분', level: 'Lv.12', fastest: '85분', gap: '-3권' },
                { rank: 3, name: '과학 읽기 모임', score: '9권', extra: '1,220분 • 평균 398p', isMe: false, trend: '↓1', avgPages: '398p', speed: '1.6p/분', level: 'Lv.9', fastest: '102분', gap: '-6권' }
              ].map((clan) => (
                <div key={clan.rank} className={`p-4 rounded-2xl border shadow-md`} style={{ 
                  background: clan.isMe ? 'rgba(0, 255, 0, 0.1)' : 'var(--surface-2)', 
                  borderColor: clan.isMe ? 'rgba(0, 255, 0, 0.3)' : 'var(--border-subtle)' 
                }}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm`} style={{
                      background: clan.rank === 1 ? '#00FF00' : clan.rank === 2 ? '#C0C0C0' : '#CD7F32',
                      color: '#000'
                    }}>
                      {clan.rank}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-white flex items-center gap-2 mb-0.5">
                        {clan.name}
                        {clan.isMe && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(0, 255, 0, 0.2)', color: '#00FF00', border: '1px solid rgba(0, 255, 0, 0.3)' }}>우리</span>}
                        <span className={`text-xs`} style={{ color: clan.trend === '↑1' ? '#00FF00' : clan.trend === '↓1' ? '#FF0077' : 'var(--text-tertiary)' }}>{clan.trend}</span>
                        <span className="text-xs" style={{ color: '#00FF00' }}>{clan.level}</span>
                      </div>
                      <div className="text-sm font-bold flex items-center gap-2" style={{ color: '#00FF00' }}>
                        {clan.score}
                        {clan.gap && <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>(1위까지 {clan.gap})</span>}
                      </div>
                      <div className="text-[10px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>{clan.extra}</div>
                      <div className="text-[10px] mt-1 font-medium" style={{ color: '#00FF00' }}>평균 속도 {clan.speed} • 최단 완독 {clan.fastest}</div>
                    </div>
                  </div>
                </div>
              ))}

              {competitionMetric === 'quality' && [
                { rank: 1, name: '책벌레 클랜', score: '2,850점', extra: '127초서 • ☀️햇살 2,234', isMe: true, trend: '↑1', level: 'Lv.12', choseoQuality: '17.6', badges: ['🔥', '💎', '🏆'], discussion: '94%' },
                { rank: 2, name: '시와 산문 클랜', score: '2,640점', extra: '156초서 • ☀️햇살 1,892', isMe: false, trend: '↓1', level: 'Lv.11', choseoQuality: '12.1', badges: ['✨', '📖'], discussion: '87%', gap: '-210점' },
                { rank: 3, name: '고전 독서회', score: '2,420점', extra: '98초서 • ☀️햇살 1,988', isMe: false, trend: '→', level: 'Lv.14', choseoQuality: '20.3', badges: ['🎯', '💡'], discussion: '91%', gap: '-430점' }
              ].map((clan) => (
                <div key={clan.rank} className={`p-4 rounded-2xl border shadow-md`} style={{ 
                  background: clan.isMe ? 'rgba(0, 255, 0, 0.1)' : 'var(--surface-2)', 
                  borderColor: clan.isMe ? 'rgba(0, 255, 0, 0.3)' : 'var(--border-subtle)' 
                }}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm`} style={{
                      background: clan.rank === 1 ? '#00FF00' : clan.rank === 2 ? '#C0C0C0' : '#CD7F32',
                      color: '#000'
                    }}>
                      {clan.rank}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-white flex items-center gap-2 mb-0.5">
                        {clan.name}
                        {clan.isMe && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(0, 255, 0, 0.2)', color: '#00FF00', border: '1px solid rgba(0, 255, 0, 0.3)' }}>우리</span>}
                        <span className={`text-xs`} style={{ color: clan.trend === '↑1' ? '#00FF00' : clan.trend === '↓1' ? '#FF0077' : 'var(--text-tertiary)' }}>{clan.trend}</span>
                        <span className="text-xs" style={{ color: '#00FF00' }}>{clan.level}</span>
                        {clan.badges.map((badge, idx) => <span key={idx} className="text-xs">{badge}</span>)}
                      </div>
                      <div className="text-sm font-bold flex items-center gap-2" style={{ color: '#00FF00' }}>
                        {clan.score}
                        {clan.gap && <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>({clan.gap})</span>}
                      </div>
                      <div className="text-[10px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>{clan.extra}</div>
                      <div className="text-[10px] mt-1 font-medium" style={{ color: '#00FF00' }}>초서당 ♥{clan.choseoQuality}개 • 토론 참여율 {clan.discussion}</div>
                    </div>
                  </div>
                </div>
              ))}

              {competitionMetric === 'diversity' && [
                { rank: 1, name: '과학 읽기 모임', score: '8 장르', extra: '과학•역사•철학•예술•소설...', isMe: false, trend: '→', level: 'Lv.9', growth: '+2 장르', newGenres: ['예술', '경제'], exploration: '89%' },
                { rank: 2, name: '책벌레 클랜', score: '7 장르', extra: '과학•역사•소설•에세이•경제...', isMe: true, trend: '↑1', level: 'Lv.12', growth: '+1 장르', newGenres: ['경제'], exploration: '78%', gap: '-1 장르' },
                { rank: 3, name: '고전 독서회', score: '5 장르', extra: '문학•철학•역사•예술•시', isMe: false, trend: '↓1', level: 'Lv.14', growth: '→', newGenres: [], exploration: '56%', gap: '-3 장르' }
              ].map((clan) => (
                <div key={clan.rank} className={`p-4 rounded-2xl border shadow-md`} style={{ 
                  background: clan.isMe ? 'rgba(0, 255, 0, 0.1)' : 'var(--surface-2)', 
                  borderColor: clan.isMe ? 'rgba(0, 255, 0, 0.3)' : 'var(--border-subtle)' 
                }}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm`} style={{
                      background: clan.rank === 1 ? '#00FF00' : clan.rank === 2 ? '#C0C0C0' : '#CD7F32',
                      color: '#000'
                    }}>
                      {clan.rank}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-white flex items-center gap-2 mb-0.5">
                        {clan.name}
                        {clan.isMe && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(0, 255, 0, 0.2)', color: '#00FF00', border: '1px solid rgba(0, 255, 0, 0.3)' }}>우리</span>}
                        <span className={`text-xs`} style={{ color: clan.trend === '↑1' ? '#00FF00' : clan.trend === '↓1' ? '#FF0077' : 'var(--text-tertiary)' }}>{clan.trend}</span>
                        <span className="text-xs" style={{ color: '#00FF00' }}>{clan.level}</span>
                      </div>
                      <div className="text-sm font-bold flex items-center gap-2" style={{ color: '#00FF00' }}>
                        {clan.score}
                        <span className="text-xs font-medium" style={{ color: '#00FF00' }}>{clan.growth}</span>
                        {clan.gap && <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>({clan.gap})</span>}
                      </div>
                      <div className="text-[10px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>{clan.extra}</div>
                      <div className="text-[10px] mt-1 font-medium" style={{ color: '#00FF00' }}>
                        {clan.newGenres.length > 0 ? `신규: ${clan.newGenres.join(', ')} • ` : ''}탐험도 {clan.exploration}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {competitionMetric === 'streak' && [
                { rank: 1, name: '고전 독서회', score: '🔥 12일 연속', extra: '평균 독서시간 92분/일', isMe: false, trend: '↑1', level: 'Lv.14', maxStreak: '18일', achievement: '87%', todayReaders: '8/12명' },
                { rank: 2, name: '과학 읽기 모임', score: '🔥 8일 연속', extra: '평균 독서시간 78분/일', isMe: false, trend: '↓1', level: 'Lv.9', maxStreak: '10일', achievement: '78%', todayReaders: '6/9명', gap: '-4일' },
                { rank: 3, name: '책벌레 클랜', score: '🔥 7일 연속', extra: '평균 독서시간 103분/일', isMe: true, trend: '→', level: 'Lv.12', maxStreak: '14일', achievement: '92%', todayReaders: '11/15명', gap: '-5일' }
              ].map((clan) => (
                <div key={clan.rank} className={`p-4 rounded-2xl border shadow-md`} style={{ 
                  background: clan.isMe ? 'rgba(0, 255, 0, 0.1)' : 'var(--surface-2)', 
                  borderColor: clan.isMe ? 'rgba(0, 255, 0, 0.3)' : 'var(--border-subtle)' 
                }}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm`} style={{
                      background: clan.rank === 1 ? '#00FF00' : clan.rank === 2 ? '#C0C0C0' : '#CD7F32',
                      color: '#000'
                    }}>
                      {clan.rank}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-white flex items-center gap-2 mb-0.5">
                        {clan.name}
                        {clan.isMe && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(0, 255, 0, 0.2)', color: '#00FF00', border: '1px solid rgba(0, 255, 0, 0.3)' }}>우리</span>}
                        <span className={`text-xs`} style={{ color: clan.trend === '↑1' ? '#00FF00' : clan.trend === '↓1' ? '#FF0077' : 'var(--text-tertiary)' }}>{clan.trend}</span>
                        <span className="text-xs" style={{ color: '#00FF00' }}>{clan.level}</span>
                      </div>
                      <div className="text-sm font-bold flex items-center gap-2" style={{ color: '#00FF00' }}>
                        {clan.score}
                        {clan.gap && <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>({clan.gap})</span>}
                      </div>
                      <div className="text-[10px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>{clan.extra}</div>
                      <div className="text-[10px] mt-1 font-medium" style={{ color: '#00FF00' }}>최장 {clan.maxStreak} • 달성률 {clan.achievement} • 오늘 {clan.todayReaders}</div>
                    </div>
                  </div>
                </div>
              ))}

              {competitionMetric === 'activity' && [
                { rank: 1, name: '책벌레 클랜', score: '985점', extra: '독서 720분 • 채팅 127 • 초서 89', isMe: true, trend: '↑2', level: 'Lv.12', discussion: '94%', likes: '234개', newMembers: '+3명', dailyActive: '12/15명' },
                { rank: 2, name: '시와 산문 클랜', score: '892점', extra: '독서 680분 • 채팅 156 • 초서 92', isMe: false, trend: '↓1', level: 'Lv.11', discussion: '87%', likes: '198개', newMembers: '+1명', dailyActive: '9/14명', gap: '-93점' },
                { rank: 3, name: '고전 독서회', score: '856점', extra: '독서 750분 • 채팅 78 • 초서 76', isMe: false, trend: '↑1', level: 'Lv.14', discussion: '91%', likes: '267개', newMembers: '+2명', dailyActive: '10/12명', gap: '-129점' }
              ].map((clan) => (
                <div key={clan.rank} className={`p-4 rounded-2xl border shadow-md`} style={{ 
                  background: clan.isMe ? 'rgba(0, 255, 0, 0.1)' : 'var(--surface-2)', 
                  borderColor: clan.isMe ? 'rgba(0, 255, 0, 0.3)' : 'var(--border-subtle)' 
                }}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm`} style={{
                      background: clan.rank === 1 ? '#00FF00' : clan.rank === 2 ? '#C0C0C0' : '#CD7F32',
                      color: '#000'
                    }}>
                      {clan.rank}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-white flex items-center gap-2 mb-0.5">
                        {clan.name}
                        {clan.isMe && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(0, 255, 0, 0.2)', color: '#00FF00', border: '1px solid rgba(0, 255, 0, 0.3)' }}>우리</span>}
                        <span className={`text-xs`} style={{ color: clan.trend.startsWith('↑') ? '#00FF00' : '#FF0077' }}>{clan.trend}</span>
                        <span className="text-xs" style={{ color: '#00FF00' }}>{clan.level}</span>
                        {clan.newMembers !== '+0명' && <span className="text-xs" style={{ color: '#00FF00' }}>{clan.newMembers}</span>}
                      </div>
                      <div className="text-sm font-bold flex items-center gap-2" style={{ color: '#00FF00' }}>
                        {clan.score}
                        {clan.gap && <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>({clan.gap})</span>}
                      </div>
                      <div className="text-[10px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>{clan.extra}</div>
                      <div className="text-[10px] mt-1 font-medium" style={{ color: '#00FF00' }}>토론 {clan.discussion} • ♥{clan.likes} • 일일 활성 {clan.dailyActive}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Other clans */}
          <div>
            <h3 className="font-bold text-white mb-3">다른 클랜 둘러보기</h3>
            <div className="space-y-3">
              <button className="w-full card-minimal backdrop-blur-md p-4 rounded-2xl border shadow-sm hover:shadow-md transition-shadow" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{ background: 'linear-gradient(to bottom right, #FF00FF, #FF77FF)' }}>
                    🌸
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-bold text-white">시와 산문 클랜</div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>24명 • Lv.35 • 문학 중심</div>
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>→</div>
                </div>
              </button>
              <button className="w-full card-minimal backdrop-blur-md p-4 rounded-2xl border shadow-sm hover:shadow-md transition-shadow" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{ background: 'linear-gradient(to bottom right, #00FFFF, #0088FF)' }}>
                    🔬
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-bold text-white">과학독서 클랜</div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>18명 • Lv.29 • 과학 중심</div>
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>→</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === 서고 TAB (Archive/Messenger) === */}
      {selectedTab === 'archive' && (
        <div className="absolute inset-0 w-full h-full">
          {!selectedBook ? (
            <BookShelfHero books={clanBooks} onBookSelect={handleBookSelect} />
          ) : (
            <BookDiscussionChat book={selectedBook} onBack={handleBackToShelf} />
          )}
        </div>
      )}

      {/* Bottom Navigation - 5 Tabs */}
      <nav className="fixed bottom-6 left-0 right-0 z-50 px-4">
        <div className="max-w-md mx-auto backdrop-blur-lg rounded-full shadow-neon" style={{ background: 'rgba(10, 10, 10, 0.9)', border: '1px solid rgba(0, 255, 0, 0.2)' }}>
          <div className="flex justify-between items-center h-16 px-2">
            <button 
              onClick={onBack}
              className="flex flex-col items-center gap-1 transition-colors px-2"
              style={{ color: 'var(--text-tertiary)' }}
            >
              <ArrowLeft className="w-6 h-6" />
              <span className="text-[10px] font-medium">나가기</span>
            </button>
            
            <button 
              onClick={() => setSelectedTab('forest')}
              className={`flex flex-col items-center gap-1 transition-colors px-2`}
              style={{ color: selectedTab === 'forest' ? '#00FF00' : 'var(--text-tertiary)' }}
            >
              <TreePine className="w-6 h-6" />
              <span className="text-[10px] font-medium">숲</span>
            </button>
            
            <button 
              onClick={() => setSelectedTab('members')}
              className={`flex flex-col items-center gap-1 transition-colors px-2`}
              style={{ color: selectedTab === 'members' ? '#00FF00' : 'var(--text-tertiary)' }}
            >
              <Users className="w-6 h-6" />
              <span className="text-[10px] font-medium">숲지기</span>
            </button>
            
            <button 
              onClick={() => setSelectedTab('explore')}
              className={`flex flex-col items-center gap-1 transition-colors px-2`}
              style={{ color: selectedTab === 'explore' ? '#00FF00' : 'var(--text-tertiary)' }}
            >
              <Compass className="w-6 h-6" />
              <span className="text-[10px] font-medium">탐험</span>
            </button>
            
            <button 
              onClick={() => setSelectedTab('archive')}
              className={`flex flex-col items-center gap-1 transition-colors px-2`}
              style={{ color: selectedTab === 'archive' ? '#00FF00' : 'var(--text-tertiary)' }}
            >
              <Library className="w-6 h-6" />
              <span className="text-[10px] font-medium">서고</span>
            </button>
          </div>
        </div>
      </nav>

    </div>
  );
}

export default Forest;
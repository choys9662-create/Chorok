import { Users, UserPlus, Sparkles, Target, Award, BookOpen, Zap } from 'lucide-react';

export function MembersTab() {
  return (
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
          {['주 3회 이상 독서', '장르 다양성', '서로 존중'].map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-full text-[10px] font-medium" style={{ background: 'rgba(0, 255, 0, 0.15)', color: '#00FF00', border: '1px solid rgba(0, 255, 0, 0.3)' }}>{tag}</span>
          ))}
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
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs" style={{ background: '#FFFF00' }}>🌟</div>
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
          클랜원 (3명)
        </h3>
        <div className="space-y-3">
          {/* Leader */}
          <div className="card-minimal backdrop-blur-md rounded-2xl p-4 shadow-lg border" style={{ borderColor: 'rgba(0, 255, 0, 0.3)' }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-lg" style={{ background: 'linear-gradient(to bottom right, #FFFF00, #FFD700)', color: '#000' }}>👑</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-white">책벌레민수</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(255, 255, 0, 0.2)', color: '#FFFF00', border: '1px solid rgba(255, 255, 0, 0.3)' }}>숲지기</span>
                </div>
                <p className="text-xs font-medium flex items-center gap-1" style={{ color: '#00FF00' }}>
                  <BookOpen className="w-3 h-3" />코스모스 읽는 중
                </p>
              </div>
              <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#00FF00' }}></div>
            </div>
            <div className="mt-3 pt-3 flex items-center justify-between text-xs" style={{ borderTop: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>이번 주 기여</span>
              <span className="font-bold" style={{ color: '#00FF00' }}>340분 • 12초서</span>
            </div>
          </div>

          {/* Other Members */}
          {[
            { name: '독서왕지수', book: '1984', reading: false, contribution: '180분 • 8초서', level: 38 },
            { name: '책사랑수지', book: '사피엔스', reading: true, contribution: '200분 • 15초서', level: 51 }
          ].map((member, idx) => (
            <div key={idx} className="card-minimal backdrop-blur-md rounded-2xl p-4 shadow-sm border" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-md text-black" style={{ background: 'linear-gradient(to bottom right, #00FF00, #00FFFF)' }}>{member.name[0]}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white">{member.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--surface-elevated)', color: 'var(--text-secondary)' }}>Lv.{member.level}</span>
                  </div>
                  <p className="text-xs font-medium flex items-center gap-1" style={{ color: member.reading ? '#00FF00' : 'var(--text-tertiary)' }}>
                    <BookOpen className="w-3 h-3" />{member.book} {member.reading ? '읽는 중' : ''}
                  </p>
                </div>
                {member.reading && <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#00FF00' }}></div>}
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
              <div className="w-8 h-10 rounded-md shadow-sm flex items-center justify-center text-xs font-bold" style={{ background: book.color, color: '#000' }}>📖</div>
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
            <div key={idx} className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-1 border ${badge.unlocked ? '' : 'opacity-40'}`} style={{
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
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0" style={{ background: 'var(--surface-2)' }}>{activity.icon}</div>
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
  );
}

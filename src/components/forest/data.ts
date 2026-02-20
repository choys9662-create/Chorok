import { Book } from '../ui/book-shelf-hero';

// Clan stats
export const clanStats = {
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
export const clanBooks: Book[] = [
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

// Competition leaderboard data
export const competitionData = {
  time: [
    { rank: 1, name: '책벌레 클랜', score: '1,450분', extra: '완독 12권 • 🔥7일', isMe: true, trend: '↑2', growth: '+18%', mvp: '책사랑민수', mvpTime: '450분', level: 'Lv.12', speed: '1.8p/분' },
    { rank: 2, name: '고전 독서회', score: '1,380분', extra: '완독 15권 • 🔥12일', isMe: false, trend: '↓1', growth: '+12%', mvp: '철학자영희', mvpTime: '420분', level: 'Lv.14', speed: '2.1p/분', gap: '-70분' },
    { rank: 3, name: '과학 읽기 모임', score: '1,220분', extra: '완독 9권 • 🔥5일', isMe: false, trend: '↑1', growth: '+25%', mvp: '과학덕후', mvpTime: '380분', level: 'Lv.9', speed: '1.6p/분', gap: '-230분' }
  ],
  completion: [
    { rank: 1, name: '고전 독서회', score: '15권', extra: '1,380분 • 평균 453p', isMe: false, trend: '→', avgPages: '453p', speed: '2.1p/분', level: 'Lv.14', fastest: '92분' },
    { rank: 2, name: '책벌레 클랜', score: '12권', extra: '1,450분 • 평균 521p', isMe: true, trend: '↑1', avgPages: '521p', speed: '1.8p/분', level: 'Lv.12', fastest: '85분', gap: '-3권' },
    { rank: 3, name: '과학 읽기 모임', score: '9권', extra: '1,220분 • 평균 398p', isMe: false, trend: '↓1', avgPages: '398p', speed: '1.6p/분', level: 'Lv.9', fastest: '102분', gap: '-6권' }
  ],
  quality: [
    { rank: 1, name: '책벌레 클랜', score: '2,850점', extra: '127초서 • ☀️햇살 2,234', isMe: true, trend: '↑1', level: 'Lv.12', choseoQuality: '17.6', badges: ['🔥', '💎', '🏆'], discussion: '94%' },
    { rank: 2, name: '시와 산문 클랜', score: '2,640점', extra: '156초서 • ☀️햇살 1,892', isMe: false, trend: '↓1', level: 'Lv.11', choseoQuality: '12.1', badges: ['✨', '📖'], discussion: '87%', gap: '-210점' },
    { rank: 3, name: '고전 독서회', score: '2,420점', extra: '98초서 • ☀️햇살 1,988', isMe: false, trend: '→', level: 'Lv.14', choseoQuality: '20.3', badges: ['🎯', '💡'], discussion: '91%', gap: '-430점' }
  ],
  diversity: [
    { rank: 1, name: '과학 읽기 모임', score: '8 장르', extra: '과학•역사•철학•예술•소설...', isMe: false, trend: '→', level: 'Lv.9', growth: '+2 장르', newGenres: ['예술', '경제'], exploration: '89%' },
    { rank: 2, name: '책벌레 클랜', score: '7 장르', extra: '과학•역사•소설•에세이•경제...', isMe: true, trend: '↑1', level: 'Lv.12', growth: '+1 장르', newGenres: ['경제'], exploration: '78%', gap: '-1 장르' },
    { rank: 3, name: '고전 독서회', score: '5 장르', extra: '문학•철학•역사•예술•시', isMe: false, trend: '↓1', level: 'Lv.14', growth: '→', newGenres: [], exploration: '56%', gap: '-3 장르' }
  ],
  streak: [
    { rank: 1, name: '고전 독서회', score: '🔥 12일 연속', extra: '평균 독서시간 92분/일', isMe: false, trend: '↑1', level: 'Lv.14', maxStreak: '18일', achievement: '87%', todayReaders: '8/12명' },
    { rank: 2, name: '과학 읽기 모임', score: '🔥 8일 연속', extra: '평균 독서시간 78분/일', isMe: false, trend: '↓1', level: 'Lv.9', maxStreak: '10일', achievement: '78%', todayReaders: '6/9명', gap: '-4일' },
    { rank: 3, name: '책벌레 클랜', score: '🔥 7일 연속', extra: '평균 독서시간 103분/일', isMe: true, trend: '→', level: 'Lv.12', maxStreak: '14일', achievement: '92%', todayReaders: '11/15명', gap: '-5일' }
  ],
  activity: [
    { rank: 1, name: '책벌레 클랜', score: '985점', extra: '독서 720분 • 채팅 127 • 초서 89', isMe: true, trend: '↑2', level: 'Lv.12', discussion: '94%', likes: '234개', newMembers: '+3명', dailyActive: '12/15명' },
    { rank: 2, name: '시와 산문 클랜', score: '892점', extra: '독서 680분 • 채팅 156 • 초서 92', isMe: false, trend: '↓1', level: 'Lv.11', discussion: '87%', likes: '198개', newMembers: '+1명', dailyActive: '9/14명', gap: '-93점' },
    { rank: 3, name: '고전 독서회', score: '856점', extra: '독서 750분 • 채팅 78 • 초서 76', isMe: false, trend: '↑1', level: 'Lv.14', discussion: '91%', likes: '267개', newMembers: '+2명', dailyActive: '10/12명', gap: '-129점' }
  ]
};

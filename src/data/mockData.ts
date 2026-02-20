import { Book } from '../App';

export const mockBooks: Book[] = [
  {
    id: '1',
    title: '데미안',
    author: '헤르만 헤세',
    cover: 'https://images.unsplash.com/photo-1763768861268-cb6b54173dbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBjbGFzc2ljJTIwbGl0ZXJhdHVyZXxlbnwxfHx8fDE3NjQwNjU0OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    currentPage: 156,
    totalPages: 248,
    status: 'reading',
    genre: '문학',
    startDate: '2025-11-15',
    lastReadDate: '2025-11-26',
    totalMinutes: 420,
    chosuCount: 12,
  },
  {
    id: '2',
    title: '아몬드',
    author: '손원평',
    cover: 'https://images.unsplash.com/photo-1758803184789-a5dd872fe82e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBib29rJTIwY292ZXIlMjBkZXNpZ258ZW58MXx8fHwxNzY0MTI3NzAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    currentPage: 87,
    totalPages: 267,
    status: 'reading',
    genre: '소설',
    startDate: '2025-11-20',
    lastReadDate: '2025-11-24',
    totalMinutes: 180,
    chosuCount: 5,
  },
  {
    id: '3',
    title: '생각에 관한 생각',
    author: '대니얼 카너먼',
    cover: 'https://images.unsplash.com/photo-1619878473858-ace2b236897c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGlsb3NvcGh5JTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc2NDEyNzcwMHww&ixlib=rb-4.1.0&q=80&w=1080',
    currentPage: 0,
    totalPages: 638,
    status: 'want-to-read',
    genre: '인문',
    chosuCount: 0,
  },
  {
    id: '4',
    title: '82년생 김지영',
    author: '조남주',
    cover: 'https://images.unsplash.com/photo-1752243731865-c2fa851af7ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWN0aW9uJTIwbm92ZWwlMjBjb3ZlcnxlbnwxfHx8fDE3NjQxMjc3MDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    currentPage: 192,
    totalPages: 192,
    status: 'completed',
    genre: '소설',
    startDate: '2025-11-01',
    lastReadDate: '2025-11-10',
    totalMinutes: 300,
    chosuCount: 8,
    rating: 4.5,
  },
];

export interface Neighbor {
  id: string;
  name: string;
  avatar: string;
  currentBook?: string;
  isReading: boolean;
  treeType: string;
  level: number;
  favoriteGenres: string[];
}

export const mockNeighbors: Neighbor[] = [
  {
    id: 'n1',
    name: '책벌레민수',
    avatar: '🌳',
    currentBook: '코스모스',
    isReading: true,
    treeType: 'oak',
    level: 42,
    favoriteGenres: ['과학', '인문'],
  },
  {
    id: 'n2',
    name: '독서왕지수',
    avatar: '🌲',
    currentBook: '1984',
    isReading: false,
    treeType: 'pine',
    level: 38,
    favoriteGenres: ['문학', '소설'],
  },
  {
    id: 'n3',
    name: '책사랑수지',
    avatar: '🌴',
    currentBook: '사피엔스',
    isReading: true,
    treeType: 'palm',
    level: 51,
    favoriteGenres: ['역사', '철학'],
  },
];

export interface ReadingSession {
  date: string;
  minutes: number;
  pages: number;
  bookId: string;
}

export const mockSessions: ReadingSession[] = [
  { date: '2025-11-26', minutes: 45, pages: 23, bookId: '1' },
  { date: '2025-11-25', minutes: 30, pages: 15, bookId: '1' },
  { date: '2025-11-24', minutes: 60, pages: 32, bookId: '2' },
  { date: '2025-11-23', minutes: 40, pages: 20, bookId: '1' },
  { date: '2025-11-22', minutes: 50, pages: 25, bookId: '1' },
  { date: '2025-11-21', minutes: 35, pages: 18, bookId: '2' },
  { date: '2025-11-20', minutes: 45, pages: 22, bookId: '1' },
];

export interface Chosu {
  id: string;
  bookId: string;
  text: string;
  page: number;
  date: string;
  likes: number;
  thought?: string; // User's personal thought/writing
  userId?: string; // Link to neighbor
}

export const mockChosus: Chosu[] = [
  {
    id: 'c1',
    bookId: '1',
    userId: 'n1',
    text: '새는 알에서 나오려고 투쟁한다. 알은 세계이다.',
    thought: '성장통 없이는 새로운 세계로 나아갈 수 없다. 지금의 힘듦도 결국 알을 깨는 과정이겠지.',
    page: 156,
    date: '2025-11-26',
    likes: 24,
  },
  {
    id: 'c2',
    bookId: '2',
    userId: 'n2',
    text: '감정이란 결국 나를 지키기 위한 도구일 뿐이다.',
    thought: '감정에 휘둘리지 말자. 그것은 도구일 뿐, 내 주인이 아니다.',
    page: 87,
    date: '2025-11-24',
    likes: 18,
  },
  {
    id: 'c3',
    bookId: '1',
    userId: 'n3',
    text: '우리는 자신의 안에서 싹트려는 것, 그것만을 경험해야 한다.',
    thought: '내면의 목소리에 더 귀 기울여야겠다. 외부의 소음이 너무 크다.',
    page: 142,
    date: '2025-11-23',
    likes: 31,
  },
];

export interface RankingBook {
  rank: number;
  bookTitle: string;
  author: string;
  cover: string;
  readers: number;
  trend: 'up' | 'down' | 'same';
}

export const mockRanking: RankingBook[] = [
  {
    rank: 1,
    bookTitle: '데미안',
    author: '헤르만 헤세',
    cover: 'https://images.unsplash.com/photo-1763768861268-cb6b54173dbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBjbGFzc2ljJTIwbGl0ZXJhdHVyZXxlbnwxfHx8fDE3NjQwNjU0OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    readers: 1247,
    trend: 'up',
  },
  {
    rank: 2,
    bookTitle: '아몬드',
    author: '손원평',
    cover: 'https://images.unsplash.com/photo-1758803184789-a5dd872fe82e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBib29rJTIwY292ZXIlMjBkZXNpZ258ZW58MXx8fHwxNzY0MTI3NzAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    readers: 1103,
    trend: 'same',
  },
  {
    rank: 3,
    bookTitle: '생각에 관한 생각',
    author: '대니얼 카너먼',
    cover: 'https://images.unsplash.com/photo-1619878473858-ace2b236897c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGlsb3NvcGh5JTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc2NDEyNzcwMHww&ixlib=rb-4.1.0&q=80&w=1080',
    readers: 987,
    trend: 'up',
  },
];

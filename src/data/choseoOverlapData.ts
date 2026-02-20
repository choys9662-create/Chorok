import { Chosu, Neighbor } from './mockData';

export interface ChoseoWithUser extends Chosu {
  user: Neighbor & { vibe?: string };
}

// Extended Chosu interface for overlap analysis
export interface ChoseoOverlap {
  id: string;
  myChoseo: Chosu;
  otherChoseo: ChoseoWithUser;
  overlapScore: number; // 0-1, how much text overlaps
  overlapSegments: Array<{
    text: string;
    isOverlap: boolean;
  }>;
}

// Mock data for a specific Choseo showing who else highlighted similar passages
export const myChoseo: Chosu = {
  id: 'my1',
  bookId: '1',
  text: '새는 알에서 나오려고 투쟁한다. 알은 세계이다. 태어나려는 자는 하나의 세계를 깨뜨려야 한다.',
  thought: '성장통 없이는 새로운 세계로 나아갈 수 없다. 지금의 힘듦도 결국 알을 깨는 과정이라고 생각하니 조금 위안이 된다.',
  page: 156,
  date: '2025-11-26',
  likes: 0,
};

// Other users who highlighted overlapping passages
export const overlappingChoseos: ChoseoWithUser[] = [
  {
    id: 'o1',
    bookId: '1',
    userId: 'n1',
    text: '새는 알에서 나오려고 투쟁한다. 알은 세계이다.',
    thought: '편안한 곳에 머물기는 쉽지만, 그것은 성장이 아니라 정체다. 불편함을 감수할 때 비로소 진짜 나를 만날 수 있다.',
    page: 156,
    date: '2025-11-25',
    likes: 24,
    user: {
      id: 'n1',
      name: '책벌레민수',
      avatar: '🌳',
      currentBook: '코스모스',
      isReading: true,
      treeType: 'oak',
      level: 42,
      favoriteGenres: ['과학', '인문'],
      vibe: 'analytical',
    },
  },
  {
    id: 'o2',
    bookId: '1',
    userId: 'n2',
    text: '알은 세계이다. 태어나려는 자는 하나의 세계를 깨뜨려야 한다.',
    thought: '오늘도 나는 내 세계의 껍질을 깨고 있을까? 아니면 그저 안전한 알 속에 숨어 있는 걸까?',
    page: 156,
    date: '2025-11-24',
    likes: 18,
    user: {
      id: 'n2',
      name: '독서왕지수',
      avatar: '🌲',
      currentBook: '1984',
      isReading: false,
      treeType: 'pine',
      level: 38,
      favoriteGenres: ['문학', '소설'],
      vibe: 'reflective',
    },
  },
  {
    id: 'o3',
    bookId: '1',
    userId: 'n3',
    text: '새는 알에서 나오려고 투쟁한다. 태어나려는 자는 하나의 세계를 깨뜨려야 한다.',
    thought: '변화는 언제나 두렵다. 하지만 두려움 너머에 진짜 자유가 있다는 걸 믿어야 한다.',
    page: 156,
    date: '2025-11-23',
    likes: 31,
    user: {
      id: 'n3',
      name: '책사랑수지',
      avatar: '🌴',
      currentBook: '사피엔스',
      isReading: true,
      treeType: 'palm',
      level: 51,
      favoriteGenres: ['역사', '철학'],
      vibe: 'emotional',
    },
  },
  {
    id: 'o4',
    bookId: '1',
    userId: 'n4',
    text: '새는 알에서 나오려고 투쟁한다. 알은 세계이다. 태어나려는 자는 하나의 세계를 깨뜨려야 한다.',
    thought: '완전히 같은 구절을 골랐네요. 이 문장을 읽고 회사를 그만두기로 결심했습니다. 내 알을 깨뜨릴 시간입니다.',
    page: 156,
    date: '2025-11-22',
    likes: 45,
    user: {
      id: 'n4',
      name: '자유로운영혼',
      avatar: '🍃',
      currentBook: '데미안',
      isReading: true,
      treeType: 'willow',
      level: 28,
      favoriteGenres: ['자기계발', '문학'],
      vibe: 'transformative',
    },
  },
  {
    id: 'o5',
    bookId: '1',
    userId: 'n5',
    text: '태어나려는 자는 하나의 세계를 깨뜨려야 한다.',
    thought: '파괴 없이는 창조도 없다. 때로는 모든 것을 버리고 처음부터 다시 시작해야 할 때가 있다.',
    page: 156,
    date: '2025-11-21',
    likes: 12,
    user: {
      id: 'n5',
      name: '새로운시작',
      avatar: '🌱',
      currentBook: '데미안',
      isReading: true,
      treeType: 'sprout',
      level: 15,
      favoriteGenres: ['소설', '에세이'],
      vibe: 'hopeful',
    },
  },
  {
    id: 'o6',
    bookId: '1',
    userId: 'n6',
    text: '새는 알에서 나오려고 투쟁한다.',
    thought: '짧지만 강렬한 문장. 투쟁 없이는 탄생도 없다.',
    page: 156,
    date: '2025-11-20',
    likes: 8,
    user: {
      id: 'n6',
      name: '간결미학',
      avatar: '✨',
      currentBook: '데미안',
      isReading: false,
      treeType: 'bonsai',
      level: 33,
      favoriteGenres: ['철학', '시'],
      vibe: 'minimalist',
    },
  },
  {
    id: 'o7',
    bookId: '1',
    userId: 'n7',
    text: '알은 세계이다. 태어나려는 자는 하나의 세계를 깨뜨려야 한다. 새는 알에서 나오려고 투쟁한다.',
    thought: '순서는 다르지만 같은 의미를 담고 있어요. 우리는 모두 각자의 알을 깨고 나아가는 중입니다.',
    page: 156,
    date: '2025-11-19',
    likes: 22,
    user: {
      id: 'n7',
      name: '순서무관',
      avatar: '🔄',
      currentBook: '데미안',
      isReading: true,
      treeType: 'birch',
      level: 40,
      favoriteGenres: ['문학', '철학'],
      vibe: 'philosophical',
    },
  },
];

// Function to calculate overlap between two text strings
export function calculateOverlap(text1: string, text2: string): {
  score: number;
  segments: Array<{ text: string; isOverlap: boolean }>;
} {
  // Simple word-based overlap for demo purposes
  const words1 = text1.split(/\s+/);
  const words2Set = new Set(text2.split(/\s+/));
  
  const segments: Array<{ text: string; isOverlap: boolean }> = [];
  let currentSegment = '';
  let currentIsOverlap = false;
  
  words1.forEach((word, index) => {
    const isOverlap = words2Set.has(word);
    
    if (index === 0) {
      currentSegment = word;
      currentIsOverlap = isOverlap;
    } else if (isOverlap === currentIsOverlap) {
      currentSegment += ' ' + word;
    } else {
      segments.push({ text: currentSegment, isOverlap: currentIsOverlap });
      currentSegment = word;
      currentIsOverlap = isOverlap;
    }
  });
  
  if (currentSegment) {
    segments.push({ text: currentSegment, isOverlap: currentIsOverlap });
  }
  
  const overlapCount = words1.filter(w => words2Set.has(w)).length;
  const score = overlapCount / Math.max(words1.length, 1);
  
  return { score, segments };
}

// Generate overlap analysis for all overlapping choseos
export const choseoOverlaps: ChoseoOverlap[] = overlappingChoseos.map(other => {
  const overlap = calculateOverlap(myChoseo.text, other.text);
  return {
    id: `overlap-${other.id}`,
    myChoseo,
    otherChoseo: other,
    overlapScore: overlap.score,
    overlapSegments: overlap.segments,
  };
});

// Sort by overlap score (highest first)
export const sortedOverlaps = [...choseoOverlaps].sort((a, b) => b.overlapScore - a.overlapScore);

// Get total number of readers who highlighted similar passages
export const totalOverlappingReaders = overlappingChoseos.length;

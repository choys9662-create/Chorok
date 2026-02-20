import { mockNeighbors, mockBooks } from '../../data/mockData';
import { ExceptionalType } from '../ExceptionalChoseoToast';

// Mock exceptional choseos
export const mockExceptionalChoseos = [
  {
    id: 'exc1',
    bookTitle: '데미안',
    text: '새는 알에서 나오려고 투쟁한다. 알은 세계이다.',
    thought: '성장통 없이는 새로운 세계로 나아갈 수 없다. 지금의 힘듦도 결국 알을 깨는 과정이겠지.',
    exceptional: {
      type: 'chorus-highlight' as ExceptionalType,
      count: 47
    },
    date: '2025-11-26'
  },
  {
    id: 'exc2',
    bookTitle: '아몬드',
    text: '감정이란 결국 나를 지키기 위한 도구일 뿐이다.',
    thought: '감정에 휘둘리지 말자. 그것은 도구일 뿐, 내 주인이 아니다.',
    exceptional: {
      type: 'aligned-reflection' as ExceptionalType
    },
    date: '2025-11-24'
  },
  {
    id: 'exc3',
    bookTitle: '데미안',
    text: '우리는 자신의 안에서 싹트려는 것, 그것만을 경험해야 한다.',
    thought: '내면의 목소리에 더 귀 기울여야겠다. 외부의 소음이 너무 크다.',
    exceptional: {
      type: 'unique-perspective' as ExceptionalType
    },
    date: '2025-11-23'
  },
  {
    id: 'exc4',
    bookTitle: '데미안',
    text: '진정한 직무는 자기 자신에게로 가는 길을 찾는 것이다.',
    thought: '',
    exceptional: {
      type: 'hidden-sentence' as ExceptionalType
    },
    date: '2025-11-22'
  }
];

// Mock Notifications
export const mockNotifications = [
  {
    id: 'n1',
    type: 'choseo' as const,
    user: mockNeighbors[0],
    book: mockBooks[0],
    content: '새는 알에서 나오려고 투쟁한다.',
    timestamp: '방금 전',
    isRead: false
  },
  {
    id: 'n2',
    type: 'rating' as const,
    user: mockNeighbors[1],
    book: mockBooks[3],
    rating: 4.5,
    timestamp: '1시간 전',
    isRead: false
  },
  {
    id: 'n3',
    type: 'thought' as const,
    user: mockNeighbors[2],
    book: mockBooks[0],
    content: '이 구절은 언제 읽어도 가슴이 뛴다. 나도 나의 알을 깨고 있는 걸까?',
    timestamp: '3시간 전',
    isRead: true
  },
  {
    id: 'n4',
    type: 'wishlist' as const,
    user: mockNeighbors[1],
    book: mockBooks[2],
    timestamp: '어제',
    isRead: true
  }
];

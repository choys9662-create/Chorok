import { ExceptionalType } from '../ExceptionalChoseoToast';
import { Moon, Sunrise, Sunset } from 'lucide-react';

// Mock exceptional choseos for analytics display
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

export const COLORS = ['#00FF00', '#FF00FF', '#00FFFF', '#FFFF00', '#FF0077'];

// Weekly specific data (last 7 days in detail)
export const weeklyDetailData = [
  { day: '11/20', minutes: 45, pages: 35, focus: 85, book: '데미안' },
  { day: '11/21', minutes: 60, pages: 48, focus: 92, book: '데미안' },
  { day: '11/22', minutes: 30, pages: 22, focus: 78, book: '아몬드' },
  { day: '11/23', minutes: 75, pages: 60, focus: 95, book: '데미안' },
  { day: '11/24', minutes: 50, pages: 40, focus: 88, book: '아몬드' },
  { day: '11/25', minutes: 90, pages: 72, focus: 98, book: '데미안' },
  { day: '11/26', minutes: 55, pages: 45, focus: 90, book: '데미안' }
];

// Monthly specific data (4 weeks comparison)
export const monthlyWeeklyData = [
  { week: '1주차', minutes: 280, books: 1, sessions: 6 },
  { week: '2주차', minutes: 350, books: 2, sessions: 7 },
  { week: '3주차', minutes: 420, books: 2, sessions: 8 },
  { week: '4주차', minutes: 405, books: 2, sessions: 7 }
];

export const monthlyCompletedBooks = [
  { title: '데미안', author: '헤르만 헤세', pages: 248, date: '11/15' },
  { title: '아몬드', author: '손원평', pages: 267, date: '11/22' }
];

// Time-of-day data for monthly view
export const monthlyTimeData = [
  { name: '새벽', value: 8, percent: 8 },
  { name: '오전', value: 22, percent: 22 },
  { name: '오후', value: 35, percent: 35 },
  { name: '저녁', value: 35, percent: 35 }
];

// Time-of-day data (mock distribution)
export const timeOfDayData = [
  { name: '새벽\n(00-06)', value: 5, icon: Moon },
  { name: '오전\n(06-12)', value: 25, icon: Sunrise },
  { name: '오후\n(12-18)', value: 30, icon: '☀️' },
  { name: '저녁\n(18-24)', value: 40, icon: Sunset }
];

// Day of week data
export const dayOfWeekData = [
  { name: '월', value: 35 },
  { name: '화', value: 42 },
  { name: '수', value: 28 },
  { name: '목', value: 45 },
  { name: '금', value: 38 },
  { name: '토', value: 60 },
  { name: '일', value: 55 }
];

// Monthly trend data (last 6 months)
export const monthlyTrendData = [
  { month: '6월', minutes: 780, books: 2 },
  { month: '7월', minutes: 920, books: 3 },
  { month: '8월', minutes: 850, books: 2 },
  { month: '9월', minutes: 1050, books: 4 },
  { month: '10월', minutes: 1200, books: 3 },
  { month: '11월', minutes: 1450, books: 5 }
];

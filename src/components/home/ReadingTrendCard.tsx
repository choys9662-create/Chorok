import { ArrowRight, Sparkles, Calendar, TrendingUp, Coffee } from 'lucide-react';
import { mockSessions } from '../../data/mockData';
import { Book } from '../../App';

interface ReadingTrendCardProps {
  primaryBook: Book | null;
  onStartTimer: (book: Book) => void;
}

export function ReadingTrendCard({ primaryBook, onStartTimer }: ReadingTrendCardProps) {
  const getReadingTrend = () => {
    const today = new Date('2025-11-26');
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentSessions = mockSessions.filter(session => {
      const sessionDate = new Date(session.date);
      return sessionDate >= sevenDaysAgo && sessionDate <= today;
    });

    const totalMinutes = recentSessions.reduce((sum, s) => sum + s.minutes, 0);
    const totalPages = recentSessions.reduce((sum, s) => sum + s.pages, 0);
    const totalDays = recentSessions.length;

    let message = '';
    let subMessage = '';
    let icon = Sparkles;

    if (totalDays === 0) {
      message = '요즘 많이 바쁘신가봐요?';
      subMessage = '잠깐의 여유도 좋은 독서의 시작이에요';
      icon = Coffee;
    } else if (totalDays <= 2) {
      message = '가끔씩 책을 펼치고 계시네요';
      subMessage = '조금씩이라도 꾸준히 읽으면 더 좋아요';
      icon = Calendar;
    } else if (totalDays <= 4) {
      message = '좋은 리듬으로 읽고 계세요';
      subMessage = `이번 주 ${totalDays}일 동안 ${totalPages}페이지를 읽었어요`;
      icon = TrendingUp;
    } else {
      message = '정말 멋진 독서 습관이에요!';
      subMessage = `이번 주 ${totalDays}일 연속 독서 중! ${totalPages}페이지 완료`;
      icon = Sparkles;
    }

    return { message, subMessage, icon, totalDays };
  };

  const readingTrend = getReadingTrend();

  return (
    <div className="mb-6">
      <div className="card-minimal relative overflow-hidden shadow-neon">
        <div className="bg-gradient-neon-radial absolute inset-0"></div>

        <div className="relative z-10 p-6">
          <div className="flex items-start gap-4">
            {readingTrend.totalDays > 0 && (
              <div className="backdrop-blur-sm rounded-lg px-3 py-2.5 flex-shrink-0" style={{ background: 'rgba(0, 255, 0, 0.1)', border: '1px solid rgba(0, 255, 0, 0.2)' }}>
                <p className="text-display leading-none mb-1" style={{ color: '#00FF00' }}>{readingTrend.totalDays}</p>
                <p className="text-caption" style={{ color: '#00FF00', opacity: 0.7 }}>일</p>
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-h3 text-white mb-2">{readingTrend.message}</h3>
              <p className="text-body-s" style={{ color: 'var(--text-secondary)' }}>{readingTrend.subMessage}</p>
            </div>
          </div>

          {readingTrend.totalDays === 0 && (
            <button
              onClick={() => primaryBook && onStartTimer(primaryBook)}
              className="w-full mt-4 btn-primary-neon text-body-s flex items-center justify-center gap-2"
            >
              <span>지금 독서 시작하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

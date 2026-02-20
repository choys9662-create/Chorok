import { Clock, Book } from 'lucide-react';

interface KeyMetricsProps {
  totalMinutes: number;
  totalPages: number;
  displayAvgMinutes: number;
  timeRange: '7' | '30' | 'all';
}

export function KeyMetrics({ totalMinutes, totalPages, displayAvgMinutes, timeRange }: KeyMetricsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="card-minimal rounded-3xl p-5 shadow-neon">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 rounded-xl" style={{ background: 'rgba(0, 255, 255, 0.15)' }}>
            <Clock className="w-5 h-5" style={{ color: '#00FFFF' }} />
          </div>
        </div>
        <div className="text-display text-white mb-0.5">{totalMinutes}분</div>
        <div className="text-caption font-medium" style={{ color: 'var(--text-secondary)' }}>
          {timeRange === 'all' ? '총 누적 시간' : `일평균 ${displayAvgMinutes}분`}
        </div>
      </div>
      <div className="card-minimal rounded-3xl p-5 shadow-neon">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 rounded-xl" style={{ background: 'rgba(0, 255, 0, 0.15)' }}>
            <Book className="w-5 h-5" style={{ color: '#00FF00' }} />
          </div>
        </div>
        <div className="text-display text-white mb-0.5">{totalPages}p</div>
        <div className="text-caption font-medium" style={{ color: 'var(--text-secondary)' }}>
          {timeRange === 'all' ? '총 누적 페이지' : '읽은 페이지'}
        </div>
      </div>
    </div>
  );
}

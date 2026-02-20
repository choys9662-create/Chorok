import { X, Star, Quote, PenLine, Bookmark } from 'lucide-react';
import { mockNotifications } from './data';

interface NotificationDrawerProps {
  onClose: () => void;
}

export function NotificationDrawer({ onClose }: NotificationDrawerProps) {
  return (
    <div className="absolute inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-[85%] h-full shadow-2xl animate-slide-left flex flex-col z-50" style={{ background: 'var(--surface-1)' }}>
        {/* Header */}
        <div className="p-5 flex items-center justify-between backdrop-blur z-10 pt-12" style={{ borderBottom: '1px solid var(--border-subtle)', background: 'var(--surface-1)' }}>
          <h2 className="text-h2 text-white">알림</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full transition-colors hover:bg-white/5"
            style={{ color: 'var(--text-tertiary)' }}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto space-y-1">
          {mockNotifications.map((notif) => (
            <div
              key={notif.id}
              className="p-4 rounded-xl transition-colors relative group flex gap-4"
              style={{ background: !notif.isRead ? 'rgba(0, 255, 0, 0.05)' : 'transparent' }}
              onMouseEnter={(e) => !notif.isRead && (e.currentTarget.style.background = 'rgba(0, 255, 0, 0.08)')}
              onMouseLeave={(e) => !notif.isRead && (e.currentTarget.style.background = 'rgba(0, 255, 0, 0.05)')}
            >
              {/* User Avatar */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-sm" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}>
                  {notif.user.avatar}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="mb-1">
                  <span className="font-bold text-body-s text-white mr-1">{notif.user.name}</span>
                  <span className="text-caption" style={{ color: 'var(--text-secondary)' }}>
                    {notif.type === 'rating' && '님이 책을 평가했습니다.'}
                    {notif.type === 'choseo' && '님이 문장을 수집했습니다.'}
                    {notif.type === 'thought' && '님이 문장에 생각을 남겼습니다.'}
                    {notif.type === 'wishlist' && '님이 읽고 싶은 책으로 담았습니다.'}
                  </span>
                </div>

                {/* Dynamic Content based on Type */}
                <div className="mb-2">
                  {notif.type === 'rating' && (
                    <div className="flex items-center gap-1">
                      <div className="flex" style={{ color: '#00FF00' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < Math.floor(notif.rating || 0) ? 'fill-current' : ''}`}
                            style={{ color: i < Math.floor(notif.rating || 0) ? '#00FF00' : 'var(--text-disabled)' }}
                          />
                        ))}
                      </div>
                      <span className="text-caption font-bold text-white">{notif.rating}</span>
                    </div>
                  )}

                  {notif.type === 'choseo' && (
                    <div className="flex gap-2 rounded-lg p-2 mt-1" style={{ background: 'var(--surface-2)' }}>
                      <Quote className="w-4 h-4 flex-shrink-0" style={{ color: '#00FF00' }} />
                      <p className="text-caption line-clamp-2 font-serif italic" style={{ color: 'var(--text-secondary)' }}>{notif.content}</p>
                    </div>
                  )}

                  {notif.type === 'thought' && (
                    <div className="flex gap-2 rounded-lg p-2 mt-1" style={{ background: 'var(--surface-2)' }}>
                      <PenLine className="w-4 h-4 flex-shrink-0" style={{ color: '#00FF00' }} />
                      <p className="text-caption line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{notif.content}</p>
                    </div>
                  )}

                  {notif.type === 'wishlist' && (
                    <div className="flex gap-2 items-center mt-1 text-caption" style={{ color: 'var(--text-secondary)' }}>
                      <Bookmark className="w-3 h-3" style={{ color: '#00FF00' }} />
                      <span>서재에 담김</span>
                    </div>
                  )}
                </div>

                <span className="text-caption" style={{ color: 'var(--text-tertiary)' }}>{notif.timestamp}</span>
              </div>

              {/* Book Thumbnail */}
              <div className="flex-shrink-0 w-10">
                <img src={notif.book.cover} alt="" className="w-full aspect-[2/3] object-cover rounded shadow-sm" />
              </div>

              {/* Unread Indicator */}
              {!notif.isRead && (
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full" style={{ background: '#00FF00' }} />
              )}
            </div>
          ))}

          <div className="p-8 text-center">
            <p className="text-caption" style={{ color: 'var(--text-tertiary)' }}>최근 30일 동안의 알림만 표시됩니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { ArrowLeft } from 'lucide-react';
import { Book } from './ui/book-shelf-hero';

interface BookDiscussionChatProps {
  book: Book;
  onBack: () => void;
}

export function BookDiscussionChat({ book, onBack }: BookDiscussionChatProps) {
  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur-md p-4" style={{ background: 'rgba(0, 0, 0, 0.95)', borderBottom: '1px solid rgba(0, 255, 0, 0.2)' }}>
        <div className="flex items-center gap-3 mb-3">
          <button 
            onClick={onBack}
            className="p-2 rounded-full transition-all hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5 text-neutral-200" />
          </button>
          <div className="flex-1">
            <h2 className="font-bold text-white">{book.title}</h2>
            <p className="text-xs text-neutral-400">{book.author} • {book.participants}명 참여중</p>
          </div>
          <img 
            src={book.cover} 
            alt={book.title}
            className="w-12 h-16 rounded-lg object-cover shadow-neon"
            style={{ border: '1px solid rgba(0, 255, 0, 0.3)' }}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['전체', '독서 토론', '질문', '잡담'].map((channel) => (
            <button 
              key={channel} 
              className="px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap hover:shadow-neon transition-all"
              style={{ background: 'rgba(0, 255, 0, 0.1)', border: '1px solid rgba(0, 255, 0, 0.3)', color: '#00FF00' }}
            >
              {channel}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-28">
        {/* Other's message */}
        <div className="flex gap-2 items-start">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-black text-sm font-bold flex-shrink-0 shadow-neon" style={{ background: '#FFFF00' }}>
            민
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-white">책벌레민수</span>
              <span className="text-[10px] text-neutral-500">오전 10:32</span>
            </div>
            <div className="rounded-2xl rounded-tl-md p-3 shadow-neon max-w-[80%]" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <p className="text-sm text-neutral-200">{book.title} 정말 흥미진진하네요!</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 items-start">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-black text-sm font-bold flex-shrink-0 shadow-neon" style={{ background: '#00FFFF' }}>
            수
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-white">책사랑수지</span>
              <span className="text-[10px] text-neutral-500">오전 10:35</span>
            </div>
            <div className="rounded-2xl rounded-tl-md p-3 shadow-neon max-w-[80%]" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <p className="text-sm text-neutral-200">저도 그 부분 너무 좋았어요! 작가의 통찰이 대단해요</p>
            </div>
          </div>
        </div>

        {/* My message (right aligned) */}
        <div className="flex gap-2 items-start justify-end">
          <div className="flex-1 flex flex-col items-end">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] text-neutral-500">오전 10:38</span>
              <span className="text-xs font-bold text-white">나</span>
            </div>
            <div className="rounded-2xl rounded-tr-md p-3 shadow-neon-lg max-w-[80%]" style={{ background: '#00FF00' }}>
              <p className="text-sm text-black font-medium">저도 이 책 너무 좋아요! 함께 읽으니 더 재밌네요 ✨</p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-black text-sm font-bold flex-shrink-0 shadow-neon" style={{ background: '#FF00FF' }}>
            나
          </div>
        </div>

        <div className="flex gap-2 items-start">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-black text-sm font-bold flex-shrink-0 shadow-neon" style={{ background: '#00FF00' }}>
            지
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-white">독서왕지수</span>
              <span className="text-[10px] text-neutral-500">오전 10:40</span>
            </div>
            <div className="rounded-2xl rounded-tl-md p-3 shadow-neon max-w-[80%]" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <p className="text-sm text-neutral-200">다들 어디까지 읽으셨어요? 저는 5장까지 읽었습니다!</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 items-start">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-black text-sm font-bold flex-shrink-0 shadow-neon" style={{ background: '#FFFF00' }}>
            민
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-white">책벌레민수</span>
              <span className="text-[10px] text-neutral-500">오전 10:42</span>
            </div>
            <div className="rounded-2xl rounded-tl-md p-3 shadow-neon max-w-[80%]" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <p className="text-sm text-neutral-200">저는 이미 완독했어요! 천천히 읽으셔도 됩니다 😊</p>
            </div>
          </div>
        </div>

        {/* Typing indicator */}
        <div className="flex gap-2 items-start">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-black text-sm font-bold flex-shrink-0 shadow-neon" style={{ background: '#00FFFF' }}>
            수
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-white">책사랑수지</span>
              <span className="text-[10px]" style={{ color: '#00FF00' }}>입력 중...</span>
            </div>
            <div className="rounded-2xl rounded-tl-md p-3 shadow-neon w-16" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div className="flex gap-1 items-center">
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#00FF00' }}></div>
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#00FF00', animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#00FF00', animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Input Area */}
      <div className="fixed bottom-24 left-0 right-0 max-w-md mx-auto p-4" style={{ background: 'rgba(0, 0, 0, 0.95)', borderTop: '1px solid rgba(0, 255, 0, 0.2)' }}>
        <div className="flex items-end gap-2">
          <div className="flex-1 rounded-2xl p-3 transition-all" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(0, 255, 0, 0.3)' }}>
            <textarea
              placeholder={`${book.title}에 대해 이야기해보세요...`}
              rows={1}
              className="w-full bg-transparent text-sm text-neutral-200 placeholder:text-neutral-500 resize-none focus:outline-none"
              style={{ minHeight: '24px', maxHeight: '120px' }}
            />
          </div>
          <button className="w-12 h-12 rounded-full shadow-neon-lg flex items-center justify-center text-black hover:shadow-neon-lg hover:scale-105 transition-all active:scale-95 flex-shrink-0" style={{ background: '#00FF00' }}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
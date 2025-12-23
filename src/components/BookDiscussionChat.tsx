import { ArrowLeft } from 'lucide-react';
import { Book } from './ui/book-shelf-hero';

interface BookDiscussionChatProps {
  book: Book;
  onBack: () => void;
}

export function BookDiscussionChat({ book, onBack }: BookDiscussionChatProps) {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA]">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md p-4 border-b border-slate-100">
        <div className="flex items-center gap-3 mb-3">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
          <div className="flex-1">
            <h2 className="font-bold text-slate-800">{book.title}</h2>
            <p className="text-xs text-slate-500">{book.author} • {book.participants}명 참여중</p>
          </div>
          <img 
            src={book.cover} 
            alt={book.title}
            className="w-12 h-16 rounded-lg object-cover shadow-md"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['전체', '독서 토론', '질문', '잡담'].map((channel) => (
            <button key={channel} className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium whitespace-nowrap hover:bg-emerald-100 transition-colors">
              {channel}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-28">
        {/* Other's message */}
        <div className="flex gap-2 items-start">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            민
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-slate-800">책벌레민수</span>
              <span className="text-[10px] text-slate-400">오전 10:32</span>
            </div>
            <div className="bg-white rounded-2xl rounded-tl-md p-3 shadow-sm border border-slate-100 max-w-[80%]">
              <p className="text-sm text-slate-700">{book.title} 정말 흥미진진하네요!</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 items-start">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            수
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-slate-800">책사랑수지</span>
              <span className="text-[10px] text-slate-400">오전 10:35</span>
            </div>
            <div className="bg-white rounded-2xl rounded-tl-md p-3 shadow-sm border border-slate-100 max-w-[80%]">
              <p className="text-sm text-slate-700">저도 그 부분 너무 좋았어요! 작가의 통찰이 대단해요</p>
            </div>
          </div>
        </div>

        {/* My message (right aligned) */}
        <div className="flex gap-2 items-start justify-end">
          <div className="flex-1 flex flex-col items-end">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] text-slate-400">오전 10:38</span>
              <span className="text-xs font-bold text-slate-800">나</span>
            </div>
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl rounded-tr-md p-3 shadow-sm max-w-[80%]">
              <p className="text-sm text-white">저도 이 책 너무 좋아요! 함께 읽으니 더 재밌네요 ✨</p>
            </div>
          </div>
          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            나
          </div>
        </div>

        <div className="flex gap-2 items-start">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            지
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-slate-800">독서왕지수</span>
              <span className="text-[10px] text-slate-400">오전 10:40</span>
            </div>
            <div className="bg-white rounded-2xl rounded-tl-md p-3 shadow-sm border border-slate-100 max-w-[80%]">
              <p className="text-sm text-slate-700">다들 어디까지 읽으셨어요? 저는 5장까지 읽었습니다!</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 items-start">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            민
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-slate-800">책벌레민수</span>
              <span className="text-[10px] text-slate-400">오전 10:42</span>
            </div>
            <div className="bg-white rounded-2xl rounded-tl-md p-3 shadow-sm border border-slate-100 max-w-[80%]">
              <p className="text-sm text-slate-700">저는 이미 완독했어요! 천천히 읽으셔도 됩니다 😊</p>
            </div>
          </div>
        </div>

        {/* Typing indicator */}
        <div className="flex gap-2 items-start">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            수
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-slate-800">책사랑수지</span>
              <span className="text-[10px] text-emerald-500">입력 중...</span>
            </div>
            <div className="bg-white rounded-2xl rounded-tl-md p-3 shadow-sm border border-slate-100 w-16">
              <div className="flex gap-1 items-center">
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Input Area */}
      <div className="fixed bottom-24 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-100 p-4 shadow-lg">
        <div className="flex items-end gap-2">
          <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-200 p-3 focus-within:border-emerald-300 transition-colors">
            <textarea
              placeholder={`${book.title}에 대해 이야기해보세요...`}
              rows={1}
              className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 resize-none focus:outline-none"
              style={{ minHeight: '24px', maxHeight: '120px' }}
            />
          </div>
          <button className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl hover:scale-105 transition-all active:scale-95 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
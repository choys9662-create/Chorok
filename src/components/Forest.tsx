import { useState } from 'react';
import { ArrowLeft, Users, UserPlus, Send, Compass, Sprout, Home, ArrowRight } from 'lucide-react';
import { mockNeighbors } from '../data/mockData';
import { MonumentCharacter } from './MonumentCharacter';
import { Screen } from '../App';

interface ForestProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
  activeTab: Screen;
}

export function Forest({ onBack, onNavigate, activeTab }: ForestProps) {
  const [viewMode, setViewMode] = useState<'my' | 'group' | 'all'>('all');
  const [selectedNeighbor, setSelectedNeighbor] = useState<string | null>(null);

  // Determine which content to show based on activeTab
  const isMyArea = activeTab === 'forest-my';
  const isNeighborsArea = activeTab === 'forest-neighbors';
  const isGrowth = activeTab === 'forest-growth';
  const isExplore = activeTab === 'forest-explore';

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#F0F9FF] relative overflow-hidden">
      
      {/* --- MY FOREST (Main Visualization) --- */}
      {isMyArea && (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA]">
          {/* Background Mist/Light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
          <div className="absolute top-20 right-10 w-32 h-32 bg-yellow-100/30 rounded-full blur-3xl" />

          {/* Floating UI Elements (Overlays from image) */}
          <div className="absolute top-24 right-8 z-40 animate-float">
            <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg shadow-emerald-100 border border-white/60 flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform">
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
              </div>
              <span className="text-xs font-bold text-slate-700">그룹 영역 보기</span>
            </div>
          </div>

          <div className="absolute top-[40%] right-[25%] z-40 animate-float" style={{ animationDelay: '1.2s' }}>
            <div className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-white/60 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
               <UserPlus className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
          </div>

          <div className="absolute bottom-[35%] left-[20%] z-40 animate-float" style={{ animationDelay: '0.5s' }}>
            <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg border border-white/60 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform">
              <span className="text-[10px] font-bold text-slate-600">이웃 취향</span>
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
          </div>

          {/* Main Isometric Scene */}
          <div className="absolute inset-0 flex items-center justify-center overflow-visible pointer-events-none">
            <svg 
              viewBox="0 0 400 800" 
              className="w-full h-full overflow-visible"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <linearGradient id="water-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#A7F3D0" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#6EE7B7" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="stone-light" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F1F5F9" />
                  <stop offset="100%" stopColor="#E2E8F0" />
                </linearGradient>
                <linearGradient id="stone-dark" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#94A3B8" />
                  <stop offset="100%" stopColor="#64748B" />
                </linearGradient>
                 <filter id="glow">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              <g transform="translate(200, 350) scale(1.2)">
                
                {/* --- BACKGROUND ELEMENTS --- */}
                
                {/* Tall Background Trees */}
                <g transform="translate(-120, -250)">
                   <rect x="0" y="0" width="15" height="300" rx="2" fill="#475569" />
                   <circle cx="7" cy="0" r="35" fill="#10B981" />
                   <circle cx="-15" cy="20" r="25" fill="#059669" />
                   <circle cx="25" cy="10" r="28" fill="#34D399" />
                </g>
                <g transform="translate(80, -280) scale(0.8)">
                   <rect x="0" y="0" width="20" height="350" rx="2" fill="#475569" />
                   <circle cx="10" cy="0" r="40" fill="#059669" />
                   <circle cx="-20" cy="30" r="30" fill="#047857" />
                   <circle cx="35" cy="20" r="32" fill="#10B981" />
                </g>
                <g transform="translate(0, -200) scale(0.6)">
                   <rect x="0" y="0" width="15" height="200" rx="2" fill="#475569" />
                   <circle cx="7" cy="0" r="35" fill="#34D399" />
                </g>


                {/* --- CONNECTING STREAMS (Roots/Magic) --- */}
                <g className="animate-pulse" style={{ animationDuration: '3s' }}>
                  {/* Stream to Left Island */}
                  <path d="M -50 50 Q -100 150 -120 220" stroke="#6EE7B7" strokeWidth="3" fill="none" filter="url(#glow)" opacity="0.6" />
                  <path d="M -40 50 Q -90 150 -110 220" stroke="#A7F3D0" strokeWidth="2" fill="none" opacity="0.4" />
                  
                  {/* Stream to Right Island */}
                  <path d="M 50 50 Q 100 150 120 220" stroke="#6EE7B7" strokeWidth="3" fill="none" filter="url(#glow)" opacity="0.6" />
                  <path d="M 60 50 Q 110 150 130 220" stroke="#A7F3D0" strokeWidth="2" fill="none" opacity="0.4" />

                  {/* Stream to Center Bottom */}
                  <path d="M 0 60 Q 0 150 0 250" stroke="#6EE7B7" strokeWidth="4" fill="none" filter="url(#glow)" opacity="0.5" />
                </g>


                {/* --- LOWER FLOATING ISLANDS --- */}
                
                {/* Bottom Left Island */}
                <g transform="translate(-120, 220)">
                   <path d="M 0 0 L 30 15 L 0 30 L -30 15 Z" fill="#86EFAC" />
                   <path d="M -30 15 L 0 30 L 0 60 L -30 40 Z" fill="#4ADE80" />
                   <path d="M 0 30 L 30 15 L 30 45 L 0 60 Z" fill="#22C55E" />
                   {/* Tiny Tree */}
                   <g transform="translate(0, -10)">
                      <rect x="-2" y="0" width="4" height="10" fill="#5D4037" />
                      <circle cx="0" cy="-2" r="12" fill="#15803D" />
                   </g>
                </g>

                {/* Bottom Right Island */}
                <g transform="translate(120, 220)">
                   <path d="M 0 0 L 35 18 L 0 36 L -35 18 Z" fill="#86EFAC" />
                   <path d="M -35 18 L 0 36 L 0 70 L -35 50 Z" fill="#4ADE80" />
                   <path d="M 0 36 L 35 18 L 35 55 L 0 70 Z" fill="#22C55E" />
                   {/* Tiny Tree */}
                   <g transform="translate(5, -15)">
                      <rect x="-3" y="0" width="6" height="15" fill="#5D4037" />
                      <circle cx="0" cy="-5" r="15" fill="#166534" />
                   </g>
                </g>

                {/* Bottom Center Island */}
                <g transform="translate(0, 250)">
                   <path d="M 0 0 L 25 12 L 0 24 L -25 12 Z" fill="#86EFAC" />
                   <path d="M -25 12 L 0 24 L 0 50 L -25 35 Z" fill="#4ADE80" />
                   <path d="M 0 24 L 25 12 L 25 40 L 0 50 Z" fill="#22C55E" />
                   {/* Tiny Ruin */}
                   <path d="M -8 -10 L 8 -10 L 8 0 L -8 0 Z" fill="#E2E8F0" />
                </g>


                {/* --- MAIN CENTRAL PLATFORM --- */}
                <g transform="translate(0, 0)">
                  {/* Water Pool underneath */}
                  <path d="M -80 0 L 0 40 L 80 0 L 0 -40 Z" fill="#BAE6FD" opacity="0.8" />
                  
                  {/* Main Floor Block */}
                  <g transform="translate(0, 10)">
                    <path d="M -100 0 L 0 50 L 100 0 L 0 -50 Z" fill="url(#stone-light)" />
                    <path d="M -100 0 L 0 50 L 0 100 L -100 50 Z" fill="#CBD5E1" />
                    <path d="M 0 50 L 100 0 L 100 50 L 0 100 Z" fill="#94A3B8" />
                  </g>

                  {/* Waterfalls */}
                  <path d="M -90 10 L -70 20 L -70 180 L -90 160 Z" fill="url(#water-grad)" opacity="0.6" />
                  <path d="M 90 10 L 70 20 L 70 180 L 90 160 Z" fill="url(#water-grad)" opacity="0.6" />
                  <path d="M -10 45 L 10 45 L 10 200 L -10 200 Z" fill="url(#water-grad)" opacity="0.8" />

                  {/* Stone Arches / Ruins (Left) */}
                  <g transform="translate(-60, -40)">
                    {/* Pillar 1 */}
                    <path d="M -10 0 L 10 0 L 10 60 L -10 60 Z" fill="#E2E8F0" />
                    <path d="M -10 60 L 10 60 L 0 70 L -20 70 Z" fill="#94A3B8" transform="translate(0, -10) skewX(30)" /> {/* Fake 3D side */}
                    
                    {/* Pillar 2 */}
                    <g transform="translate(30, 15)">
                       <path d="M -10 0 L 10 0 L 10 50 L -10 50 Z" fill="#E2E8F0" />
                    </g>

                    {/* Arch Top */}
                    <path d="M -10 0 L 40 15 L 40 5 L -10 -10 Z" fill="#F1F5F9" />
                  </g>

                  {/* Stone Bridge/Walkway */}
                  <g transform="translate(0, -10)">
                     <path d="M -40 20 L 0 40 L 40 20 L 0 0 Z" fill="#F8FAFC" />
                     <path d="M -40 20 L 0 40 L 0 45 L -40 25 Z" fill="#CBD5E1" />
                     <path d="M 0 40 L 40 20 L 40 25 L 0 45 Z" fill="#94A3B8" />
                  </g>

                  {/* Grass Patches */}
                  <path d="M 30 15 L 50 25 L 70 15 L 50 5 Z" fill="#4ADE80" opacity="0.9" />
                  <path d="M -70 5 L -50 15 L -30 5 L -50 -5 Z" fill="#4ADE80" opacity="0.9" />

                  {/* The Character (Red Cloak) */}
                  <g transform="translate(0, 15)">
                     <circle cx="0" cy="0" r="8" fill="rgba(0,0,0,0.2)" />
                     <g className="animate-bounce-gentle">
                        <path d="M -6 -15 L 0 -25 L 6 -15 L 8 0 L -8 0 Z" fill="#EF4444" /> {/* Cloak Body */}
                        <circle cx="0" cy="-22" r="5" fill="#EF4444" /> {/* Hood Head */}
                        <path d="M -3 0 L -3 6" stroke="#333" strokeWidth="2" /> {/* Leg */}
                        <path d="M 3 0 L 3 6" stroke="#333" strokeWidth="2" /> {/* Leg */}
                     </g>
                  </g>
                </g>

              </g>
            </svg>
          </div>
        </div>
      )}

      {/* Header for other views */}
      {!isMyArea && (
        <header className="p-6 bg-white border-b border-slate-100 sticky top-0 z-50">
          <div className="flex items-center justify-between mb-4">
            <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6 text-slate-600" />
            </button>
            <span className="font-bold text-lg text-slate-800">숲</span>
            <div className="w-8" /> {/* Spacer */}
          </div>
          
          {/* View Mode Toggle */}
          <div className="bg-slate-100 p-1 rounded-xl flex">
            <button
              onClick={() => setViewMode('my')}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                viewMode === 'my' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              내 영역
            </button>
            <button
              onClick={() => setViewMode('group')}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                viewMode === 'group' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              그룹
            </button>
            <button
              onClick={() => setViewMode('all')}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                viewMode === 'all' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              전체
            </button>
          </div>
        </header>
      )}

      {/* Content for other tabs (Group/All) */}
      {!isMyArea && (
        <div className="p-6 pb-24">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
              <span className="text-emerald-600 font-bold text-xl mb-1">42</span>
              <span className="text-xs text-slate-500">레벨</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
              <span className="text-emerald-600 font-bold text-xl mb-1">89</span>
              <span className="text-xs text-slate-500">나이테</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
              <span className="text-emerald-600 font-bold text-xl mb-1">24</span>
              <span className="text-xs text-slate-500">이웃</span>
            </div>
          </div>

          {/* Neighbors List */}
          {isNeighborsArea && (
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                 <h3 className="font-bold text-slate-800">서로이웃</h3>
                 <button className="text-xs text-emerald-600 font-medium">전체보기</button>
               </div>
               <div className="space-y-3">
                 {mockNeighbors.map(neighbor => (
                   <div key={neighbor.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                     <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-xl border border-emerald-100">
                        {neighbor.avatar}
                     </div>
                     <div className="flex-1">
                       <div className="flex items-center gap-2 mb-0.5">
                         <span className="font-bold text-slate-800 text-sm">{neighbor.name}</span>
                         <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">Lv.{neighbor.level}</span>
                       </div>
                       <p className="text-xs text-slate-500 line-clamp-1">{neighbor.currentBook || '휴식 중'}</p>
                     </div>
                     {neighbor.isReading && (
                       <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                     )}
                   </div>
                 ))}
               </div>
            </div>
          )}

          {/* Guild/Explore */}
          {isExplore && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 border border-amber-100">
                 <div className="flex items-center gap-3 mb-4">
                   <div className="bg-white p-2 rounded-full shadow-sm">
                     <Compass className="w-6 h-6 text-amber-500" />
                   </div>
                   <div>
                     <h3 className="font-bold text-slate-800">길드 탐험</h3>
                     <p className="text-xs text-slate-500">새로운 독서 모임 찾기</p>
                   </div>
                 </div>
                 <div className="space-y-3">
                   <button className="w-full bg-white p-4 rounded-2xl shadow-sm border border-amber-100/50 flex items-center justify-between group">
                     <div className="text-left">
                       <p className="font-bold text-slate-800 text-sm">📚 고전 문학 길드</p>
                       <p className="text-xs text-slate-500 mt-1">248명 참여중</p>
                     </div>
                     <ArrowRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                   </button>
                   <button className="w-full bg-white p-4 rounded-2xl shadow-sm border border-amber-100/50 flex items-center justify-between group">
                     <div className="text-left">
                       <p className="font-bold text-slate-800 text-sm">🔬 과학 읽기 길드</p>
                       <p className="text-xs text-slate-500 mt-1">156명 참여중</p>
                     </div>
                     <ArrowRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                   </button>
                 </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Bottom Navigation Tabs - Only show when in Forest context */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 pb-8 pt-4 px-6 max-w-md mx-auto z-50">
        <div className="flex justify-between items-center">
          <button onClick={onBack} className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600">
            <ArrowLeft className="w-6 h-6" />
            <span className="text-[10px] font-medium">뒤로</span>
          </button>
          <button onClick={() => onNavigate('forest-my')} className={`flex flex-col items-center gap-1 ${isMyArea ? 'text-emerald-600' : 'text-slate-400'}`}>
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-medium">내 숲</span>
          </button>
          <button onClick={() => onNavigate('forest-neighbors')} className={`flex flex-col items-center gap-1 ${isNeighborsArea ? 'text-emerald-600' : 'text-slate-400'}`}>
            <Users className="w-6 h-6" />
            <span className="text-[10px] font-medium">친구</span>
          </button>
          <button onClick={() => onNavigate('forest-explore')} className={`flex flex-col items-center gap-1 ${isExplore ? 'text-emerald-600' : 'text-slate-400'}`}>
            <Compass className="w-6 h-6" />
            <span className="text-[10px] font-medium">탐험</span>
          </button>
          <button onClick={() => onNavigate('forest-growth')} className={`flex flex-col items-center gap-1 ${isGrowth ? 'text-emerald-600' : 'text-slate-400'}`}>
            <Sprout className="w-6 h-6" />
            <span className="text-[10px] font-medium">성장</span>
          </button>
        </div>
      </div>

    </div>
  );
}
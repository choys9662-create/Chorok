"use client"

import { useEffect, useState } from "react"

export function NeonOrbs() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Inject global styles
    const styleId = 'neon-orbs-styles'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = `
        .beam-container {
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          will-change: transform;
        }
        
        .beam-light {
          position: absolute;
          top: 0;
          left: 50%;
          width: 60px;
          height: 4px;
          margin-left: -30px;
          border-radius: 2px;
          transform: translateY(-50%);
          transition: all 0.5s;
          background: linear-gradient(90deg, transparent 0%, rgba(0, 255, 0, 0.5) 30%, rgba(0, 255, 0, 0.9) 70%, rgba(0, 255, 0, 1) 100%);
          box-shadow: 0 0 20px 4px rgba(0, 255, 0, 0.6), 0 0 40px 8px rgba(0, 255, 0, 0.3);
        }
        
        .orb-light {
          background: radial-gradient(circle at 50% 50%, rgba(0, 255, 0, 0.15) 0%, rgba(0, 255, 0, 0.08) 40%, rgba(0, 40, 0, 0.3) 70%, transparent 100%);
          box-shadow: 
            0 0 80px 8px rgba(0, 255, 0, 0.5),
            0 0 150px 15px rgba(0, 255, 0, 0.3),
            inset 0 0 80px 8px rgba(0, 255, 0, 0.2);
          border: 1px solid rgba(0, 255, 0, 0.4);
        }
        
        .beam-spin-6 {
          animation: spin 6s linear infinite;
        }
        
        .beam-spin-7-reverse {
          animation: spin-reverse 7s linear infinite;
        }
        
        .beam-spin-8 {
          animation: spin 8s linear infinite;
        }
        
        .beam-spin-10-reverse {
          animation: spin-reverse 10s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `
      document.head.appendChild(style)
    }
    
    return () => {
      // Cleanup on unmount
      const style = document.getElementById(styleId)
      if (style) {
        style.remove()
      }
    }
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-[#000000] transition-colors duration-500">
      {/* Top-left orb - 화면 밖으로 나간 큰 영역 */}
      <div
        className={`absolute transition-all duration-1000 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        }`}
        style={{
          top: "-15%",
          left: "-10%",
          width: "90vw",
          height: "90vw",
          maxWidth: "700px",
          maxHeight: "700px",
          mixBlendMode: "screen",
          opacity: 0.9,
        }}
      >
        <div className="w-full h-full rounded-full relative orb-light transition-all duration-500">
          <div className="beam-container beam-spin-8">
            <div className="beam-light" />
          </div>
        </div>
      </div>

      {/* Bottom-center orb - 가장 밝고 중심적인 영역 */}
      <div
        className={`absolute transition-all duration-1000 ease-out delay-300 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{
          bottom: "-5%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100vw",
          height: "100vw",
          maxWidth: "800px",
          maxHeight: "800px",
          mixBlendMode: "screen",
          opacity: 1,
        }}
      >
        <div className="w-full h-full rounded-full relative orb-light transition-all duration-500">
          <div className="beam-container beam-spin-10-reverse">
            <div className="beam-light" />
          </div>
        </div>
      </div>

      {/* Top-right orb - 화면 밖 작은 개인 영역 */}
      <div
        className={`absolute transition-all duration-1000 ease-out delay-500 ${
          mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
        }`}
        style={{
          top: "-20%",
          right: "-15%",
          width: "70vw",
          height: "70vw",
          maxWidth: "550px",
          maxHeight: "550px",
          mixBlendMode: "screen",
          opacity: 0.75,
        }}
      >
        <div className="w-full h-full rounded-full relative orb-light transition-all duration-500">
          <div className="beam-container beam-spin-6">
            <div className="beam-light" />
          </div>
        </div>
      </div>

      {/* Bottom-right orb - 경계에 걸친 중간 영역 */}
      <div
        className={`absolute transition-all duration-1000 ease-out delay-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{
          bottom: "-10%",
          right: "-5%",
          width: "75vw",
          height: "75vw",
          maxWidth: "600px",
          maxHeight: "600px",
          mixBlendMode: "screen",
          opacity: 0.85,
        }}
      >
        <div className="w-full h-full rounded-full relative orb-light transition-all duration-500">
          <div className="beam-container beam-spin-7-reverse">
            <div className="beam-light" />
          </div>
        </div>
      </div>

      {/* Center orb - 중심 개인 영역 */}
      <div
        className={`absolute transition-all duration-1000 ease-out delay-200 ${
          mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
        style={{
          top: "35%",
          left: "45%",
          transform: "translate(-50%, -50%)",
          width: "65vw",
          height: "65vw",
          maxWidth: "520px",
          maxHeight: "520px",
          mixBlendMode: "screen",
          opacity: 0.95,
        }}
      >
        <div className="w-full h-full rounded-full relative orb-light transition-all duration-500">
          <div className="beam-container beam-spin-8">
            <div className="beam-light" />
          </div>
        </div>
      </div>

      {/* Left-center orb - 왼쪽 경계 영역 */}
      <div
        className={`absolute transition-all duration-1000 ease-out delay-400 ${
          mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
        }`}
        style={{
          top: "50%",
          left: "-20%",
          transform: "translateY(-50%)",
          width: "80vw",
          height: "80vw",
          maxWidth: "630px",
          maxHeight: "630px",
          mixBlendMode: "screen",
          opacity: 0.8,
        }}
      >
        <div className="w-full h-full rounded-full relative orb-light transition-all duration-500">
          <div className="beam-container beam-spin-10-reverse">
            <div className="beam-light" />
          </div>
        </div>
      </div>

      {/* Top-center orb - 위쪽 경계 작은 영역 */}
      <div
        className={`absolute transition-all duration-1000 ease-out delay-600 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        }`}
        style={{
          top: "-25%",
          left: "60%",
          transform: "translateX(-50%)",
          width: "60vw",
          height: "60vw",
          maxWidth: "480px",
          maxHeight: "480px",
          mixBlendMode: "screen",
          opacity: 0.7,
        }}
      >
        <div className="w-full h-full rounded-full relative orb-light transition-all duration-500">
          <div className="beam-container beam-spin-6">
            <div className="beam-light" />
          </div>
        </div>
      </div>

      {/* Right-center orb - 오른쪽 경계 중간 영역 */}
      <div
        className={`absolute transition-all duration-1000 ease-out delay-800 ${
          mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
        }`}
        style={{
          top: "25%",
          right: "-25%",
          width: "85vw",
          height: "85vw",
          maxWidth: "680px",
          maxHeight: "680px",
          mixBlendMode: "screen",
          opacity: 0.78,
        }}
      >
        <div className="w-full h-full rounded-full relative orb-light transition-all duration-500">
          <div className="beam-container beam-spin-7-reverse">
            <div className="beam-light" />
          </div>
        </div>
      </div>
    </div>
  )
}
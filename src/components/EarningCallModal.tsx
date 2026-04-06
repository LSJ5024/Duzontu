import React, { useEffect, useState } from 'react';
import { EarningData } from '@/lib/mockData';

interface EarningCallModalProps {
  data: EarningData;
  onClose: () => void;
}

export default function EarningCallModal({ data, onClose }: EarningCallModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // fade-out time
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300 ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      
      {/* 백그라운드 오버레이 (Toss 스타일 투명 딤 처리) */}
      <div 
        className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={handleClose} 
      />

      {/* 모달 컨텐츠 (바닥에서 올라오는 애니메이션) */}
      <div className={`relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-white dark:bg-zinc-900 shadow-2xl rounded-[2rem] mx-4 sm:mx-auto transition-transform duration-300 transform ${isVisible ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'}`}>
        
        {/* 헤더 파트 */}
        <div className="flex-shrink-0 px-6 py-5 md:px-8 md:py-7 border-b border-gray-100 dark:border-white/10 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-bold text-xs rounded-md">
                {data.sector}
              </span>
              <span className="text-gray-400 dark:text-gray-500 text-[13px] font-bold">{data.date}</span>
            </div>
            <h2 className="text-[1.75rem] md:text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-none">
              {data.company} <span className="text-gray-400 dark:text-gray-500 font-bold text-xl md:text-2xl ml-1">{data.ticker}</span>
            </h2>
            <p className="text-[15px] font-bold text-gray-400 dark:text-gray-500 mt-2 tracking-tight">시가총액 {data.marketCapRank}위 · 어닝콜 심층 리포트</p>
          </div>
          
          <button 
            onClick={handleClose}
            className="p-2 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-500 dark:text-gray-400 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* 본문 파트 (스크롤 영역) */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-10 hide-scrollbar">
          
          {/* 3줄 리마인드 박스 */}
          <div className="bg-gray-50 dark:bg-zinc-800/50 p-6 rounded-2xl">
            <h3 className="flex items-center text-sm font-black text-gray-900 dark:text-white mb-4 tracking-tight">
              <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mr-2">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
              </div>
              핵심 요약 리마인드
            </h3>
            <ul className="space-y-3">
              {data.summary_3_lines.map((line, idx) => (
                <li key={idx} className="flex text-gray-700 dark:text-gray-300 font-semibold text-[15px] tracking-tight">
                  <span className="mr-2.5 opacity-50 dark:opacity-40">•</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 심층 리포트 섹션들 (토스 특징: 섹션별 굵고 큰 제목) */}
          <div className="space-y-8">
            <section>
              <h4 className="text-xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">📈 성장성 및 가이던스</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-[1.65] text-[16px] font-medium tracking-tight break-keep">{data.detailed_summary.growth_outlook}</p>
            </section>
            
            <section>
              <h4 className="text-xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">🌍 거시경제 영향</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-[1.65] text-[16px] font-medium tracking-tight break-keep">{data.detailed_summary.macro_impact}</p>
            </section>
            
            <section>
              <h4 className="text-xl font-black text-red-500 dark:text-red-400 mb-3 tracking-tight">⚠️ 주의할 점 (리스크)</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-[1.65] text-[16px] font-medium tracking-tight break-keep">{data.detailed_summary.risk_factors}</p>
            </section>
            
            <section>
              <h4 className="text-xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">🎙️ 경영진 주요 답변</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-[1.65] text-[16px] font-medium tracking-tight break-keep">{data.detailed_summary.management_qa}</p>
            </section>
          </div>
          
        </div>
      </div>
    </div>
  );
}

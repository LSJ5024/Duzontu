import React from 'react';
import { EarningData } from '@/lib/mockData';

interface EarningCardProps {
  data: EarningData;
  onClick: () => void;
}

export default function EarningCard({ data, onClick }: EarningCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white dark:bg-zinc-900 rounded-[2rem] shadow-[0_2px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100/50 dark:border-white/5 group cursor-pointer"
    >
      <div className="p-7 md:p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3.5 py-1.5 rounded-full text-[13px] font-bold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400">
                시총 {data.marketCapRank}위
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-[13px] font-semibold bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300">
                {data.sector}
              </span>
            </div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              {data.company} <span className="text-base font-bold tracking-wide text-gray-400 dark:text-gray-500">{data.ticker}</span>
            </h3>
          </div>
          <span className="text-sm font-bold text-gray-400 dark:text-gray-500">{data.date}</span>
        </div>
        
        {/* 3줄 요약 목록 */}
        <div className="space-y-4 pt-2">
          {data.summary_3_lines.map((line, idx) => (
            <div key={idx} className="flex items-start text-gray-700 dark:text-gray-300">
              <div className="flex-shrink-0 mt-0.5 mr-3">
                <div className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <p className="text-[15px] leading-relaxed font-semibold tracking-tight">{line}</p>
            </div>
          ))}
        </div>
        
        {/* 자세히 보기 힌트 버튼 */}
        <div className="mt-8 pt-5 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
           <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
             자세히 알아보기
           </span>
           <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/20 transition-colors">
            <svg className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transform transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path>
            </svg>
           </div>
        </div>
      </div>
    </div>
  );
}

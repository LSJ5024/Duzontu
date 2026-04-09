"use client";

import { useState } from 'react';
import EarningCard from '@/components/EarningCard';
import EarningCallModal from '@/components/EarningCallModal';
import ProUpgradeModal from '@/components/ProUpgradeModal';
import { MOCK_DATA, EarningData } from '@/lib/mockData';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [selectedEarning, setSelectedEarning] = useState<EarningData | null>(null);
  const [isProModalOpen, setIsProModalOpen] = useState(false);

  const categories = ['전체', '반도체', '테크/하드웨어', '소프트웨어', '데이터', '의료 AI', '금융', '에너지'];

  const filteredData = selectedCategory === '전체' 
    ? MOCK_DATA 
    : MOCK_DATA.filter(item => item.sector === selectedCategory);

  return (
    <div className="min-h-screen transition-colors duration-300">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        
        {/* 헤더 파트 (토스증권 스타일의 크고 굵직한 타이포그래피) */}
        <header className="mb-12 md:mb-16 text-left">
          <h1 className="text-4xl md:text-[3.5rem] font-black text-gray-900 dark:text-white tracking-tight leading-[1.15] mb-5">
            가장 빠른 어닝콜 요약,<br />
            <span className="text-indigo-600 dark:text-indigo-400">핵심만 짚어드릴게요</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-medium tracking-tight">
            월스트리트 상위 100개 기업의 실적을 AI가 실시간으로 분석합니다.
          </p>
        </header>

        {/* 둥글고 두꺼운 필터 칩 (Toss 스타일) */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2.5 mb-10 pb-2">
          {categories.map((category) => (
            <button 
              key={category} 
              onClick={() => setSelectedCategory(category)}
              className={`flex-shrink-0 px-6 py-3.5 rounded-full text-[15px] font-bold transition-all duration-200 ${
                selectedCategory === category 
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-950 shadow-md' 
                  : 'bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 shadow-sm border border-transparent dark:border-white/5'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 카드 그리드 피드 */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {filteredData.map((data) => (
            <EarningCard 
              key={data.id} 
              data={data} 
              onClick={() => setSelectedEarning(data)}
            />
          ))}
          {filteredData.length === 0 && (
            <div className="col-span-full py-24 text-center">
              <p className="text-gray-400 dark:text-gray-500 font-bold text-lg">해당 카테고리의 리포트가 아직 없습니다.</p>
            </div>
          )}
        </div>
      </main>

      {/* 동적 모달 렌더링 */}
      {selectedEarning && (
        <EarningCallModal 
          data={selectedEarning} 
          onClose={() => setSelectedEarning(null)} 
          onUpgradeClick={() => setIsProModalOpen(true)}
        />
      )}

      {/* PRO 업그레이드 모달 */}
      {isProModalOpen && (
        <ProUpgradeModal onClose={() => setIsProModalOpen(false)} />
      )}
    </div>
  );
}

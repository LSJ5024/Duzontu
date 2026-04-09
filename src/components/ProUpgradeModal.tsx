"use client";

import React, { useEffect, useState } from 'react';

interface ProUpgradeModalProps {
  onClose: () => void;
}

export default function ProUpgradeModal({ onClose }: ProUpgradeModalProps) {
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
    setTimeout(onClose, 300);
  };

  return (
    <div className={`fixed inset-0 z-[110] flex items-center justify-center transition-all duration-300 ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      <div 
        className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={handleClose} 
      />
      
      <div className={`relative w-full max-w-md bg-white dark:bg-[#1a1c23] shadow-2xl rounded-[2.5rem] mx-4 max-h-[90vh] flex flex-col transition-all duration-500 transform ${isVisible ? 'translate-y-0 scale-100 rotate-0' : 'translate-y-20 scale-90 rotate-2'}`}>
        
        {/* 상단 포인트 디자인 */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-10" />
        
        {/* 닫기 버튼 (고정) */}
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors z-20"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        {/* 스크롤 가능한 본문 */}
        <div className="flex-1 overflow-y-auto p-8 pb-10 hide-scrollbar">
          {/* 헤더 */}
          <div className="text-center mb-10 pt-4">
            <div className="inline-block px-4 py-1.5 mb-6 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full font-bold text-sm tracking-tight">
              Premium Upgrade
            </div>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tighter leading-tight">
              두쫀투 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">PRO</span>
            </h2>
            <div className="flex items-center justify-center gap-1.5 text-gray-400 dark:text-gray-500 font-bold">
              <span className="text-lg line-through opacity-50">$19.99</span>
              <span className="text-3xl text-gray-900 dark:text-white">$9.99</span>
              <span className="text-sm">/ mo</span>
            </div>
          </div>

          {/* 혜택 리스트 */}
          <div className="space-y-6 mb-10">
            <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl transition-all hover:scale-[1.02]">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"></path></svg>
              </div>
              <div>
                <h4 className="font-black text-[17px] text-gray-900 dark:text-white tracking-tight">기업 피드 전체 해제</h4>
                <p className="text-[14px] font-semibold text-gray-500 dark:text-gray-400 tracking-tight leading-snug">
                  나스닥 및 다우존스 전 종목 리포트 제공<br/>
                  <span className="text-indigo-500 dark:text-indigo-400 text-xs">(기존 상위 100개 제한 없음)</span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl transition-all hover:scale-[1.02]">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"></path></svg>
              </div>
              <div>
                <h4 className="font-black text-[17px] text-gray-900 dark:text-white tracking-tight">AI 심층 분석 & 전략</h4>
                <p className="text-[14px] font-semibold text-gray-500 dark:text-gray-400 tracking-tight leading-snug">
                  종목별 상세 투자 비중(%) 제안<br/>
                  개인 맞춤형 디테일 투자 전략 리포트
                </p>
              </div>
            </div>
          </div>

          {/* 액션 버튼 */}
          <button 
            onClick={() => alert('PRO 모드는 현재 준비 중입니다!')}
            className="w-full py-5 bg-gray-900 dark:bg-indigo-600 text-white font-black text-lg rounded-2xl transition-all active:scale-[0.98] hover:shadow-xl hover:shadow-indigo-500/20 tracking-tight mb-4"
          >
            지금 업그레이드하기
          </button>
          
          <button 
            onClick={handleClose}
            className="w-full py-4 text-gray-400 dark:text-gray-500 font-bold text-sm hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            이미 프로 멤버인가요? <span className="underline ml-1">로그인</span>
          </button>
        </div>
      </div>
    </div>
  );
}

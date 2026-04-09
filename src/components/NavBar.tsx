"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';
import ProUpgradeModal from '@/components/ProUpgradeModal';
import { useState } from 'react';

export default function NavBar() {
  const pathname = usePathname();
  const [isProModalOpen, setIsProModalOpen] = useState(false);

  return (
    <>
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#0b0f19]/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-tighter">두쫀투</span>
            </Link>
            <div className="ml-5 flex space-x-4 sm:ml-10 sm:space-x-8">
              <Link 
                href="/" 
                className={`${
                  pathname === '/' 
                    ? 'border-indigo-600 dark:border-indigo-400 text-gray-900 dark:text-white' 
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                } inline-flex items-center px-1 pt-1 border-b-[3px] text-[15px] font-bold transition-colors`}
              >
                어닝 피드
              </Link>
              <Link 
                href="/rebalance" 
                className={`${
                  pathname === '/rebalance' 
                    ? 'border-indigo-600 dark:border-indigo-400 text-gray-900 dark:text-white' 
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                } inline-flex items-center px-1 pt-1 border-b-[3px] text-[15px] font-semibold transition-colors`}
              >
                AI 리밸런싱
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsProModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-sm border border-indigo-100 dark:border-indigo-500/20 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all active:scale-95"
            >
              <span className="text-[15px]">👑</span>
              <span className="hidden xs:inline">PRO</span>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
    {isProModalOpen && <ProUpgradeModal onClose={() => setIsProModalOpen(false)} />}
    </>
  );
}

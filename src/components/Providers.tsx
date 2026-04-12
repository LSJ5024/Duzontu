"use client";

import { ThemeProvider } from "next-themes";
import * as React from "react";

// React 19 / Next.js 15+ 에서 발생하는 next-themes 스크립트 태그 경고 억제 (flicker 방지용 스크립트 오인 방지)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const orig = console.error;
  console.error = (...args: any[]) => {
    if (typeof args[0] === 'string' && args[0].includes('Encountered a script tag')) return;
    orig.apply(console, args);
  };
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem 
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}

import type { Metadata } from 'next';
import './globals.css';
import NavBar from '@/components/NavBar';

export const metadata: Metadata = {
  title: '두쫀투 - AI 기반 어닝콜 요약 및 리밸런싱',
  description: '미국 주식 상위 100개 기업 어닝콜 요약과 포트폴리오 맞춤 조언',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased bg-[#F8FAFC]">
        <NavBar />
        {children}
      </body>
    </html>
  );
}

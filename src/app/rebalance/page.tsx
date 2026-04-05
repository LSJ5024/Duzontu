import ImageUploader from '@/components/ImageUploader';

export default function RebalancePage() {
  return (
    <div className="min-h-screen">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-6">
            AI 포트폴리오 <span className="text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl inline-block mt-2">리밸런싱</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
            보유 주식 화면을 영수증처럼 캡처해서 올려주세요.<br className="hidden sm:block"/>Vision AI가 인식하여 성향에 맞는 투자 전략을 즉시 제안합니다.
          </p>
        </header>

        <ImageUploader />
      </main>
    </div>
  );
}

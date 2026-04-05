import EarningCard from '@/components/EarningCard';

const MOCK_DATA = [
  { id: 1, company: 'NVIDIA', ticker: 'NVDA', sector: '반도체', marketCapRank: 1, date: '2026-04-01', summary: 'AI 칩셋 수요 폭증으로 기록적인 분기 매출을 달성했습니다.', growth: '데이터센터 부문 성장세가 다음 분기에도 150% 이상 유지될 전망입니다.', risk: '대중국 수출 규제 강화 가능성이 유일한 변수입니다.' },
  { id: 2, company: 'Microsoft', ticker: 'MSFT', sector: '소프트웨어', marketCapRank: 2, date: '2026-03-25', summary: 'Copilot 도입 구독자가 5천만 명을 돌파하며 클라우드 매출을 견인했습니다.', growth: 'Azure AI 서비스의 통합으로 엔터프라이즈 도입이 가속화되고 있습니다.', risk: 'AI 인프라 구축 연간 CAPEX(자본지출) 급증에 대한 시장의 우려.' },
  { id: 3, company: 'Apple', ticker: 'AAPL', sector: '하드웨어', marketCapRank: 3, date: '2026-03-20', summary: 'iPhone 17의 AI 기능 탑재 사이클이 예상보다 강하게 나타났습니다.', growth: 'Apple Intelligence의 다국어 서비스 확대로 서비스 부문 마진율이 75%에 도달.', risk: '중국 시장 내 화웨이 등 로컬 브랜드와의 점유율 경쟁 심화.' },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="mb-14 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-6xl mb-6">
            어닝콜의 핵심만 짚어주는<br/>
            <span className="text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl mt-2 inline-block">스마트 피드</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
            시가총액 상위 100개 기업의 실적 발표를 AI가 실시간으로 분석합니다.<br className="hidden sm:block"/>성장 전망과 리스크를 3줄 요약으로 직관적으로 파악하세요.
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {['전체', '반도체', '의료 AI', '소프트웨어', '금융', '에너지'].map((category) => (
            <button key={category} className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${category === '전체' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 -translate-y-0.5' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900 shadow-sm'}`}>
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {MOCK_DATA.map((data) => (
            <EarningCard key={data.id} {...data} />
          ))}
        </div>
      </main>
    </div>
  );
}

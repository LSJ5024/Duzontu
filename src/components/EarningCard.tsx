export interface EarningCardProps {
  company: string;
  ticker: string;
  sector: string;
  marketCapRank: number;
  growth: string;
  risk: string;
  summary: string;
  date: string;
}

export default function EarningCard({ company, ticker, sector, marketCapRank, growth, risk, summary, date }: EarningCardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      <div className="p-6">
        <div className="flex justify-between items-start mb-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                시총 {marketCapRank}위
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                {sector}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              {company} <span className="text-sm font-semibold tracking-wide text-gray-400">{ticker}</span>
            </h3>
          </div>
          <span className="text-sm font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full">{date}</span>
        </div>
        
        <p className="text-gray-700 mb-6 text-[15px] leading-relaxed font-medium">{summary}</p>
        
        <div className="space-y-3">
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50/30 rounded-2xl border border-green-100/50">
            <h4 className="text-sm font-bold text-emerald-800 mb-1.5 flex items-center gap-1.5">
              🚀 성장 전망
            </h4>
            <p className="text-sm text-emerald-900/80 leading-snug font-medium">{growth}</p>
          </div>
          <div className="p-4 bg-gradient-to-r from-red-50 to-rose-50/30 rounded-2xl border border-red-100/50">
            <h4 className="text-sm font-bold text-rose-800 mb-1.5 flex items-center gap-1.5">
              ⚠️ 리스크 요인
            </h4>
            <p className="text-sm text-rose-900/80 leading-snug font-medium">{risk}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

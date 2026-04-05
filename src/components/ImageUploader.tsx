"use client";

import { useState } from 'react';

export default function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [style, setStyle] = useState<string>('stable');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<null | any>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleProcess = async () => {
    if (!file) return;
    setAnalyzing(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('style', style);

      const res = await fetch('/api/rebalance', {
        method: 'POST',
        body: formData
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        alert(data.error || '분석 중 오류가 발생했습니다.');
      } else {
        setResult(data);
      }
    } catch (error) {
      console.error(error);
      alert('네트워크 또는 서버 통신 오류가 발생했습니다.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Left: Upload Area */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-5">1. 스크린샷 업로드</h3>
          <div 
            className={`border-2 border-dashed rounded-3xl p-10 text-center transition-colors cursor-pointer group ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:bg-gray-50 hover:border-indigo-300'}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                setFile(e.dataTransfer.files[0]);
                setResult(null);
              }
            }}
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.onchange = (e: any) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFile(e.target.files[0]);
                  setResult(null);
                }
              };
              input.click();
            }}
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📸</div>
            {file ? (
              <p className="font-bold text-indigo-600 flex items-center justify-center gap-2">
                ✅ {file.name} (업로드 완료)
              </p>
            ) : (
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                이곳을 클릭하여 증권사 앱 화변 캡처 이미지를 업로드하세요.<br/>(또는 파일 드래그 앤 드롭)
              </p>
            )}
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-10 mb-5">2. 투자 성향 선택</h3>
          <div className="space-y-4">
            {[
              { id: 'aggressive', label: '공격적인 (개별 투자 위주)', desc: '하이 리스크 하이 리턴 종목을 우선적으로 편입합니다.' },
              { id: 'stable', label: '안정적인 (배당성장 위주)', desc: '현금 흐름이 좋고 배당이 확실한 기업 위주로 조정합니다.' },
              { id: 'futuristic', label: '미래 지향적인 (ETF 위주)', desc: '시장 지수를 추종하며 장기 우상향에 베팅합니다.' },
            ].map((opt) => (
              <div key={opt.id} className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${style === opt.id ? 'border-indigo-600 bg-indigo-50/50 shadow-sm' : 'border-gray-100 hover:border-gray-200 bg-white'}`} onClick={() => setStyle(opt.id)}>
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${style === opt.id ? 'border-indigo-600' : 'border-gray-300'}`}>
                    {style === opt.id && <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full"></div>}
                  </div>
                  <span className="font-bold text-gray-900 text-lg">{opt.label}</span>
                </div>
                <p className="text-sm text-gray-500 mt-2 pl-8 font-medium">{opt.desc}</p>
              </div>
            ))}
          </div>

          <button 
            disabled={!file || analyzing}
            onClick={handleProcess}
            className="w-full mt-10 bg-gray-900 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold text-lg py-5 rounded-2xl hover:bg-black transition shadow-xl"
          >
            {analyzing ? 'Vision AI가 분석하는 중... 🤖' : 'AI에게 맞춤 조언 받기 ✨'}
          </button>
        </div>

        {/* Right: Result Area */}
        <div className="bg-[#F8FAFC] rounded-3xl p-8 border border-gray-100 h-full min-h-[500px] flex flex-col relative overflow-hidden">
          <h3 className="text-xl font-bold text-gray-900 mb-6">AI 분석 결과 레포트</h3>
          
          {!result && !analyzing && (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400 pb-10">
              <span className="text-7xl mb-6 opacity-30 blur-[1px]">✨</span>
              <p className="font-semibold text-lg">스크린샷을 업로드하시면<br/>AI 맞춤 조언이 이곳에 생성됩니다.</p>
            </div>
          )}

          {analyzing && (
            <div className="flex-1 flex flex-col items-center justify-center space-y-6 pb-10">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
              </div>
              <p className="text-base font-bold text-indigo-700 animate-pulse">이미지 속 자산 현황을 OCR로 판독 중입니다...</p>
            </div>
          )}

          {result && !analyzing && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 mb-6 flex justify-between items-center shadow-sm">
                <span className="text-sm font-bold text-gray-500">📸 인식된 총 자산 규모</span>
                <span className="text-3xl font-black text-gray-900 tracking-tight">{result.total}</span>
              </div>
              
              <div className="space-y-4">
                {result.suggestions.map((sug: any, idx: number) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-indigo-100 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-black text-xl text-gray-900">{sug.ticker}</span>
                      <span className={`px-3 py-1.5 rounded-lg text-sm font-bold ${sug.action.includes('매수') ? 'bg-red-50 text-red-600 border border-red-100' : sug.action.includes('매도') ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
                        {sug.action}
                      </span>
                    </div>
                    <p className="text-[15px] text-gray-600 font-medium leading-relaxed">{sug.reason}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-5 bg-indigo-50/80 rounded-2xl border border-indigo-100">
                <p className="text-sm text-indigo-800 font-medium leading-snug">
                  💡 위 조언은 선택하신 <b>{style === 'aggressive' ? '공격적' : style === 'stable' ? '안정적' : '미래지향적'}</b> 투자 성향 및 최신 글로벌 거시경제 어닝콜 분석 결과를 종합하여 Vision AI가 작성한 의견입니다.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

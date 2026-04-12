import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { withRetry, getErrorStatus } from '@/lib/ai-retry';
import { PRESENTATION_REBALANCE_MOCK } from '@/lib/mockData';

export async function POST(req: NextRequest) {
  let selectedStyle = 'stable';
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'GEMINI_API_KEY가 시스템(.env.local)에 등록되지 않았습니다.' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const formData = await req.formData();
    const image = formData.get('image') as File | null;
    selectedStyle = formData.get('style') as string || 'stable';

    if (!image) {
      return NextResponse.json({ error: '업로드된 이미지가 없습니다.' }, { status: 400 });
    }

    const arrayBuffer = await image.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = image.type;

    let toneInstruction = '';
    if (selectedStyle === 'aggressive') toneInstruction = '당신은 공격적인 하이리스크 하이리턴 성향을 띠며 수익 극대화를 노리는 개별 주식 투자자(트레이더)를 위한 조언자입니다.';
    else if (selectedStyle === 'stable') toneInstruction = '당신은 현금흐름과 안정성, 방어력을 최우선으로 여기는 배당성장주 투자자를 위한 조언자입니다.';
    else toneInstruction = '당신은 시장 지수(S&P 500, 나스닥 100 등 ETF) 추종과 자산의 장기적 우상향에 베팅하는 미래지향형 패시브 투자자를 위한 조언자입니다.';

    const prompt = `
${toneInstruction}
다음 이미지는 사용자의 증권사 앱 보유 주식 포트폴리오 캡처본입니다.
1. 이미지 속 종목명, 수익률, 비중 등 전체 자산 구성을 파악하세요.
2. 현재 글로벌 거시경제 상황(금리, 관세 등)을 종합하여 당신의 '투자 성향'에 맞춘 리밸런싱 조언을 구성하세요.
3. 결과를 다음 구조의 JSON 형식으로만 응답하세요 (순수 JSON만 유지):
{
  "total": "$총금액 (숫자와 단위명시, 판독 불가시 대략 추정)",
  "suggestions": [
    {
      "action": "매수 (비중확대) / 매도 (비중축소) / 유지",
      "ticker": "종목코드(티커)",
      "reason": "해당 조언에 대한 시장/기업 관점의 명확한 이유 (1~2문장)"
    }
  ]
}
`;

    const response = await withRetry(async () => {
      return await ai.models.generateContent({
        model: 'gemini-2.0-flash', // 안정적인 2.0 모델로 임시 전환 고려 (2.5 부하 대응)
        contents: [
          prompt,
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            }
          }
        ],
        config: {
          responseMimeType: "application/json",
        }
      });
    });

    const textResponse = response.text || "{}";
    let parsedJson;
    try {
      const cleanJson = textResponse.replace(/^```(json)?/gi, '').replace(/```$/g, '').trim();
      parsedJson = JSON.parse(cleanJson);
    } catch (e) {
      console.error('Failed to parse Gemini response', e);
      parsedJson = { 
        total: "인식 실패", 
        suggestions: [{ action: "에러", ticker: "ERR", reason: "AI 응답 텍스트를 구조화할 수 없습니다." }] 
      };
    }

    return NextResponse.json(parsedJson);

  } catch (error: any) {
    const status = getErrorStatus(error);
    console.error(`Rebalance API Error (${status}):`, error.message || error);
    
    // 발표용 안전 모드 (Presentation Safety Mode)
    // API 호출이 실패하더라도 이미 준비된 고품질 데모 데이터를 반환합니다.
    console.log('[Safety Mode] AI 분석 실패로 인해 미리 준비된 포트폴리오 데이터를 반환합니다.');
    
    // 리얼리티를 위해 의도적인 지연 시간(2초) 추가
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const fallbackData = PRESENTATION_REBALANCE_MOCK[selectedStyle] || PRESENTATION_REBALANCE_MOCK.stable;
    
    return NextResponse.json(fallbackData);
  }
}

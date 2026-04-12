import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { withRetry, getErrorStatus } from '@/lib/ai-retry';

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is missing.' }, { status: 500 });
    }

    const { company, ticker, rawTranscript } = await req.json();

    if (!rawTranscript) {
      return NextResponse.json({ error: 'No raw transcript provided' }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `
당신은 월스트리트의 시니어 어닝콜 분석 애널리스트입니다.
아래는 ${company} (${ticker})의 신규 어닝콜 트랜스크립트 원문 일부입니다.
이를 분석하여 다음 형식의 순수 JSON 포맷으로 응답하세요 
반드시 제공된 텍스트 범위 안에서만 팩트 기반으로 도출하고, 외부 지식을 더하여 소설을 쓰지 마세요.

{
  "sector": "이 기업에 가장 부합하는 카테고리 태그 1개 (예: 반도체, 시총 최상위, 헬스케어, 소프트웨어 등)",
  "summary": "어닝콜 전체 내용을 바탕으로 한 핵심 리뷰 (2문장 이내)",
  "growth": "긍정적인 실적 성장 포인트 또는 다음 분기 가이던스 전망 (1문장)",
  "risk": "경쟁 심화, 거시경제 악화, 지출 증가 등 주된 하방 리스크 요인 (1문장)"
}

=== [어닝콜 원문 텍스트] ===
${rawTranscript}
`;

    const response = await withRetry(async () => {
      return await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
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
      parsedJson = { error: "AI Parsing Failed" };
    }

    return NextResponse.json(parsedJson);

  } catch (error: any) {
    const status = getErrorStatus(error);
    console.error(`Earning Call API Error (${status}):`, error.message || error);
    
    return NextResponse.json(
      { error: error.message || 'Internal Server Error', code: status }, 
      { status }
    );
  }
}

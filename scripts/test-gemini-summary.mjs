import fs from 'fs';
import path from 'path';

// Parse .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^#\s=]+)=(.*)$/);
    if (match) {
      process.env[match[1]] = match[2].trim();
    }
  });
}

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY || API_KEY.startsWith('your_')) {
  console.error("❌ 에러: GEMINI_API_KEY가 없습니다.");
  process.exit(1);
}

// 가상의 어닝콜 원문 리포트 일부분 (Mock Transcript)
const MOCK_TRANSCRIPT = `
Apple Inc. (AAPL) Q1 2026 Earnings Call Transcript
Management Remarks:
Tim Cook, CEO: Welcome everyone. Today, I'm thrilled to share that Apple achieved record-breaking revenue of $125 billion for the first quarter of 2026, marking a 5% increase year-over-year. This growth was fueled by the unprecedented demand for the iPhone 17 family, featuring our groundbreaking Apple Intelligence capabilities, and an all-time high in our Services sector, which crossed $25 billion. 
Our gross margin expanded to 46.2%, reflecting strong cost discipline and a highly favorable product mix. However, we do recognize the broader macroeconomic volatility. Rising component costs due to recent semiconductor constraints and fierce competition in the domestic Chinese market remain our primary headwinds. 
Looking ahead, we expect Q2 revenue to be relatively flat compared to last year's record quarter, largely due to foreign exchange pressures. We remain highly optimistic about our investments in AI infrastructure and the upcoming spatial computing rollouts...
`;

async function testGeminiSummary() {
  console.log("⏳ Gemini API를 호출하여 프롬프트의 JSON 결과물을 생성합니다...\n");

  const prompt = `
당신은 월스트리트의 시니어 금융 애널리스트입니다. 아래 제공된 [Earnings Call Transcript]를 분석하여 지정된 JSON 포맷으로 "3줄 핵심 요약"과 "1페이지 상세 분량 요약"을 반환하세요.

[요구사항]
1. 반드시 JSON 포맷으로 응답해야 합니다 (마크다운 백틱 없이 순수 JSON만 반환).
2. "summary_3_lines" 배열에는 가장 중요한 핵심 내용 3가지를 각각 짧은 문장(한국어)으로 요약하세요.
3. "detailed_summary" 객체에는 "growth_outlook", "macro_impact", "risk_factors", "management_qa" 항목을 작성하세요 (각 항목당 2~3문장 분량의 한국어 친절한 요약).
4. "category" 항목에는 해당 기업에 어울리는 산업 태그 1개를 한국어로 할당하세요.

[Earnings Call Transcript]
${MOCK_TRANSCRIPT}

[출력 JSON 포맷 엄수]
{
  "ticker": "AAPL",
  "category": "테크/하드웨어",
  "summary_3_lines": [
    "첫 번째 문장",
    "두 번째 문장",
    "세 번째 문장"
  ],
  "detailed_summary": {
    "growth_outlook": "...",
    "macro_impact": "...",
    "risk_factors": "...",
    "management_qa": "..."
  }
}
`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.2
        }
      })
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(`API 에러: ${data.error.message}`);
    }

    const aiOutput = data.candidates[0].content.parts[0].text;
    console.log("✅ [성공] AI 모델이 생성한 JSON 결과물:");
    console.log(JSON.parse(aiOutput)); 

    console.log("\n💡 위 스키마를 바탕으로 UI의 Mock 데이터를 구성합니다.");

  } catch (error) {
    console.error("❌ 테스트 실패:", error.message);
  }
}

testGeminiSummary();

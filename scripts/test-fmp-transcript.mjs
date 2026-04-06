import fs from 'fs';
import path from 'path';

// .env.local 파일 파싱
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

const FMP_API_KEY = process.env.FMP_API_KEY;

if (!FMP_API_KEY) {
  console.error('❌ 에러: .env.local 파일에 유효한 FMP_API_KEY가 설정되지 않았습니다.');
  console.log('\n💡 [테스트 방법]');
  console.log('1. https://site.financialmodelingprep.com/developer/docs 에 가입하여 무료 API 키를 받습니다.');
  console.log('2. .env.local 파일에 FMP_API_KEY=당신의_발급된_키 형태로 기입하세요.');
  console.log('3. 다시 이 스크립트를 실행하세요: node scripts/test-fmp-transcript.mjs');
  process.exit(1);
}

const SYMBOL = 'AAPL'; // 테스트용 종목 (애플)

async function testFMPTranscript() {
  try {
    console.log(`\n⏳ ${SYMBOL}의 어닝콜 트랜스크립트(FMP API)를 조회합니다...`);
    
    // FMP는 배열로 반환하며 가장 첫 번째 객체가 최신 어닝콜입니다.
    const url = `https://financialmodelingprep.com/api/v3/earning_call_transcript/${SYMBOL}?apikey=${FMP_API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API 통신 실패: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data || data.length === 0) {
      console.log('⚠️ 트랜스크립트 목록을 찾을 수 없습니다.');
      return;
    }

    // 최신 트랜스크립트 객체 가져오기
    const latestTranscript = data[0];
    console.log(`✅ 수집 성공! [${latestTranscript.year}년 Q${latestTranscript.quarter}] - 날짜: ${latestTranscript.date}`);

    const content = latestTranscript.content;

    if (!content) {
      console.log('⚠️ 원문 내용이 비어있습니다.');
      return;
    }

    console.log('\n✅ 원문 수집 완료! (앞부분 500자 미리보기)');
    console.log('--------------------------------------------------');
    console.log(content.substring(0, 500) + '...\n');
    console.log('--------------------------------------------------');
    console.log(`원문 총 길이: ${content.length}자`);
    
  } catch (error) {
    console.error('\n❌ 테스트 중 오류가 발생했습니다:', error.message);
  }
}

testFMPTranscript();

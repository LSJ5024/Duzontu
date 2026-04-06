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

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

if (!RAPIDAPI_KEY || RAPIDAPI_KEY === 'your_rapidapi_key_here') {
  console.error('❌ 에러: .env.local 파일에 유효한 RAPIDAPI_KEY가 설정되지 않았습니다.');
  console.log('\n💡 [테스트 방법]');
  console.log('1. https://rapidapi.com 에 가입/로그인합니다.');
  console.log('2. "Seeking Alpha API" (by apidojo) 등의 API를 찾아 Subscribe(무료 플랜) 합니다.');
  console.log('3. 발급받은 X-RapidAPI-Key를 .env.local 파일의 RAPIDAPI_KEY 항목에 기입하세요.');
  console.log('4. 다시 이 스크립트를 실행하세요: node scripts/test-transcript-api.mjs');
  process.exit(1);
}

const SYMBOL = 'AAPL'; // 테스트용 종목 (애플)

async function testRapidAPITranscript() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': RAPIDAPI_KEY,
      // 아래 호스트는 Seeking Alpha API (by apidojo) 기준입니다.
      // 다른 API를 사용할 경우 호스트를 변경해야 합니다.
      'X-RapidAPI-Host': 'seeking-alpha.p.rapidapi.com'
    }
  };

  try {
    console.log(`\n⏳ [1단계] ${SYMBOL}의 어닝콜 트랜스크립트 목록을 조회합니다...`);
    // get list of transcripts for the symbol
    const listResponse = await fetch(`https://seeking-alpha.p.rapidapi.com/transcripts/v2/list?id=${SYMBOL.toLowerCase()}`, options);
    
    if (!listResponse.ok) {
      throw new Error(`목록 조회 실패: ${listResponse.status} ${listResponse.statusText}`);
    }

    const listData = await listResponse.json();
    
    if (!listData.data || listData.data.length === 0) {
      console.log('⚠️ 트랜스크립트 목록을 찾을 수 없습니다.');
      return;
    }

    // 최신 트랜스크립트 ID 가져오기
    const latestTranscript = listData.data[0];
    const transcriptId = latestTranscript.id;
    const transcriptTitle = latestTranscript.attributes.title;
    
    console.log(`✅ 최신 트랜스크립트 발견: [ID: ${transcriptId}] ${transcriptTitle}`);

    console.log(`\n⏳ [2단계] 트랜스크립트(ID: ${transcriptId})의 상세 원문을 가져옵니다...`);
    // get actual transcript text
    const detailResponse = await fetch(`https://seeking-alpha.p.rapidapi.com/transcripts/v2/get-details?id=${transcriptId}`, options);
    
    if (!detailResponse.ok) {
      throw new Error(`원문 조회 실패: ${detailResponse.status} ${detailResponse.statusText}`);
    }

    const detailData = await detailResponse.json();
    const content = detailData.data?.attributes?.content;

    if (!content) {
      console.log('⚠️ 원문 내용이 비어있습니다.');
      return;
    }

    console.log('\n✅ 원문 수집 성공! (앞부분 500자 미리보기)');
    console.log('--------------------------------------------------');
    // HTML 태그 제거 후 텍스트만 추출 (간단한 정규식 사용)
    const plainText = content.replace(/<[^>]*>?/gm, '');
    console.log(plainText.substring(0, 500) + '...\n');
    console.log('--------------------------------------------------');
    console.log(`원문 총 길이: ${plainText.length}자`);
    
  } catch (error) {
    console.error('\n❌ 테스트 중 오류가 발생했습니다:', error.message);
  }
}

testRapidAPITranscript();

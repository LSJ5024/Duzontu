# 두쫀투(Duzontu) 기능 구현 및 발표 자료 요약

이 문서는 두쫀투 앱의 핵심 기능인 **어닝콜 피드**와 **AI 리밸런싱**의 구현 로직, 기술 스택 및 발표용 슬라이드 내용을 정리한 것입니다.

---

## 1. 주요 기능 구현 로직 및 기술 요약

### **기능 1: 어닝콜 피드 (Earnings Call Feed)**
*   **핵심 로직**: 방대한 양의 영문 어닝콜 트랜스크립트(Transcript)를 수집하여, AI가 투자자에게 필요한 핵심 정보(섹터, 요약, 성장성, 리스크)만 추출해 정형화된 데이터로 변환합니다.
*   **기반 프로그램/기술**:
    *   **Data Pipeline**: `RapidAPI (Seeking Alpha API)`를 통해 미국 증시 상위 기업의 최신 어닝콜 원문을 실시간 수집.
    *   **AI Engine**: `Google Gemini 1.5/2.5 Flash` 모델 활용. 프롬프트 엔지니어링을 통해 비정형 텍스트를 JSON 포맷으로 강제 변환하여 데이터 무결성 확보.
    *   **Frontend**: `Next.js 15+`와 `Vanilla CSS`를 사용하여 섹터별 필터링 기능이 포함된 대시보드 UI 구현.

### **기능 2: AI 리밸런싱 (AI Rebalancing)**
*   **핵심 로직**: 복잡한 계좌 연동 과정 없이, 사용자가 올린 포트폴리오 스크린샷 1장과 본인의 투자 성향(공격적/안정적/지수추종)을 결합해 AI가 맞춤형 투자 전략을 제안합니다.
*   **기반 프로그램/기술**:
    *   **Vision AI**: `Gemini Multimodal API`를 활용하여 이미지 내 텍스트(종목명, 수익률, 비중 등)를 OCR 판독하고 문맥을 이해.
    *   **Strategy Matching**: 유저 인터페이스에서 선택된 3가지 투자 스타일(Aggressive, Stable, Passive)에 따라 AI 응답 톤과 추천 로직을 동적으로 조정.
    *   **Processing**: `Next.js API Routes`를 통해 이미지 데이터를 Base64로 처리하여 보안성 있게 백엔드-AI 모델 간 통신 수행.

---

## 2. 발표 슬라이드 내용 (Slide Content)

### **Slide 1: [기능 1] AI 어닝콜 피드 - "정보 과부하의 해소"**
> **"수백 페이지의 원문을 단 3줄로, 실시간 기업 인사이트 전달"**
>
> *   **구현 로직**
>     *   **Step 1. 실시간 수집**: 글로벌 금융 API(FMP)를 통해 최신 실적 발표 트랜스크립트 확보
>     *   **Step 2. AI 분석**: Gemini LLM이 'Wall Street Analyst' 페르소나를 기반으로 핵심 가이던스 추출
>     *   **Step 3. 데이터 구조화**: 요약/성장/리스크로 분류하여 투자자 의사결정 속도 10배 향상
> *   **기술 스택**
>     *   **Model**: Google Gemini 2.5 Flash (JSON Mode)
>     *   **Data Source**: FMP(Financial Modeling Prep) API
>     *   **UI/UX**: Next.js 기반 반응형 필터 보드

### **Slide 2: [기능 2] 맞춤형 AI 리밸런싱 - "스크린샷 1장으로 끝내는 분석"**
> **"나의 투자 성향과 AI의 시장 분석을 결합한 최적의 비중 조절"**
>
> *   **구현 로직**
>     *   **Multimodal OCR**: 포트폴리오 캡처 이미지에서 보유 종목 및 평가 손익 자동 인식
>     *   **Personalization**: 유저의 투자 성향(공격/안정/지수)을 반영한 맞춤형 가이드라인 생성
>     *   **Strategy Design**: 개별 종목의 '매수/매도/유지' 의견과 그에 따른 매크로 관점의 근거 제시
> *   **기술 스택**
>     *   **Vision**: Gemini 1.5/2.5 Pro (Multimodal Vision)
>     *   **Backend**: Serverless API Routes (Secure Key Handling)
>     *   **Interaction**: 사용자 성향 기반 동적 프롬프트 매핑 엔진

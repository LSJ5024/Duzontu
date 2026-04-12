/**
 * AI API 호출을 위한 재시도 유틸리티 (지수 백오프 적용)
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  retries: number = 2,
  delay: number = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    const isRetryable = 
      error.status === 503 || // Service Unavailable
      error.status === 429 || // Too Many Requests
      error.message?.includes('high demand') ||
      error.message?.includes('Resource exhausted');

    if (isRetryable && retries > 0) {
      console.log(`[AI Retry] 에러 발생 (${error.status || 'unknown'}), ${delay}ms 후 재시도... (남은 횟수: ${retries})`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return withRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
}

/**
 * Gemini 에러 객체에서 적절한 HTTP 상태 코드를 추출합니다.
 */
export function getErrorStatus(error: any): number {
  if (error.status) return error.status;
  if (error.message?.includes('Resource exhausted')) return 429;
  if (error.message?.includes('high demand')) return 503;
  return 500;
}

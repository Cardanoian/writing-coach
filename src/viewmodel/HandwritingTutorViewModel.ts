import { useState } from 'react';
import { analyzeHandwritingApi } from '@/lib/gemini';

export function useHandwritingTutorViewModel() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [genre, setGenre] = useState<string>('');
  const [additionalPrompt, setAdditionalPrompt] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 이전 분석 결과 초기화
    setAnalysisResult('');
    setError(null);
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
    } else {
      setImageFile(null);
    }
  };

  const analyzeHandwriting = async () => {
    if (!imageFile) {
      setError('분석할 이미지를 먼저 업로드해주세요.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult('');

    try {
      const result = await analyzeHandwritingApi(
        imageFile,
        genre,
        additionalPrompt
      );
      setAnalysisResult(result);
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.';
      setError(`분석 중 오류 발생: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    imageFile,
    setGenre,
    setAdditionalPrompt,
    analysisResult,
    isLoading,
    error,
    handleFileChange,
    analyzeHandwriting,
  };
}

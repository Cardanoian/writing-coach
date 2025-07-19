import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Label 컴포넌트 임포트
import { useHandwritingTutorViewModel } from '@/viewmodel/HandwritingTutorViewModel';
import { Loader2 } from 'lucide-react'; // Spinner 대신 Loader2 아이콘 임포트
import ReactMarkdown from 'react-markdown';

export function HandwritingTutorView() {
  const {
    imageFile,
    setGenre,
    setAdditionalPrompt,
    analysisResult,
    isLoading,
    error,
    handleFileChange,
    analyzeHandwriting,
  } = useHandwritingTutorViewModel();

  return (
    <div className='container mx-auto p-4 md:p-8'>
      <Card className='max-w-2xl mx-auto'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold text-center'>
            ✍️ 손글씨 분석 및 첨삭 AI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
              {' '}
              {/* 기존 grid w-full items-center gap-1.5 대신 flex flex-col gap-4로 변경 */}
              <div className='grid w-full items-center gap-1.5'>
                <Label htmlFor='genre'>글의 장르 (선택 사항)</Label>
                <Input
                  id='genre'
                  type='text'
                  onChange={(e) => {
                    e.preventDefault();
                    setGenre(e.target.value);
                  }}
                  placeholder='예: 설명문, 논설문, 일기, 시'
                />
                <p className='text-sm text-muted-foreground'>
                  손글씨의 장르를 입력하면 더 정확한 분석에 도움이 됩니다.
                </p>
              </div>
              <div className='grid w-full items-center gap-1.5'>
                <Label htmlFor='picture'>손글씨 이미지 업로드</Label>
                <Input
                  id='picture'
                  type='file'
                  accept='image/*'
                  onChange={handleFileChange}
                  disabled={isLoading}
                />
                <p className='text-sm text-muted-foreground'>
                  분석하고 싶은 손글씨 이미지를 업로드하세요.
                </p>
              </div>
              <div className='grid w-full items-center gap-1.5'>
                <Label htmlFor='additional-prompt'>
                  추가 프롬프트 (선택 사항)
                </Label>
                <textarea
                  id='additional-prompt'
                  rows={4} // 여러 줄 입력을 위해 rows 속성 추가
                  onChange={(e) => {
                    e.preventDefault();
                    setAdditionalPrompt(e.target.value);
                  }}
                  placeholder='예: 주장과 근거가 관련있는지 확인하기, 문단 구성 평가, 맞춤법 오류 검사'
                  className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                />
                <p className='text-sm text-muted-foreground'>
                  AI에게 특별히 요청하고 싶은 내용을 입력하세요.
                </p>
              </div>
            </div>

            <Button
              onClick={analyzeHandwriting}
              disabled={isLoading || !imageFile}
            >
              {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              {isLoading ? '분석 중...' : '분석하기'}
            </Button>

            {error && <p className='text-red-500 text-center'>{error}</p>}

            {imageFile && !isLoading && (
              <div className='border rounded-lg p-4'>
                <h3 className='font-semibold mb-2'>
                  업로드된 이미지 미리보기:
                </h3>
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt='Uploaded handwriting'
                  className='rounded-md mx-auto'
                />
              </div>
            )}

            {analysisResult && (
              <Card>
                <CardHeader>
                  <CardTitle>AI 첨삭 결과</CardTitle>
                </CardHeader>
                <CardContent className='prose dark:prose-invert max-w-none'>
                  <ReactMarkdown>{analysisResult}</ReactMarkdown>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

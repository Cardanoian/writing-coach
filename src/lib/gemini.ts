import { GoogleGenAI } from '@google/genai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
if (!API_KEY) {
  throw new Error('VITE_GEMINI_API_KEY is not defined in .env.local');
}
const ai = new GoogleGenAI({ apiKey: API_KEY });

async function fileToGenerativePart(file: File): Promise<imageDataType> {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return { data: await base64EncodedDataPromise, mimeType: file.type };
}

export async function analyzeHandwritingApi(
  imageFile: File,
  genre: string,
  additionalPrompt: string
): Promise<string> {
  const imagePart = await fileToGenerativePart(imageFile);

  const prompt = `
다음은 학생이 손글씨로 작성한 ${genre} 글을 찍은 사진입니다.

**분석 단계:**
1. 사진 속의 모든 텍스트를 정확하게 추출해주세요. 
   - 읽기 어려운 부분이 있다면 [불분명] 표시를 해주세요.
   - 줄바꿈과 문단 구분을 원본과 동일하게 유지해주세요.

2. 추출된 텍스트를 바탕으로 다음 항목들을 종합적으로 분석해주세요:
   - **언어 사용**: 맞춤법, 띄어쓰기, 문법
   - **내용 구성**: 주제 전개, 논리적 흐름, 구조
   - **표현력**: 어휘 선택, 문체, 창의성
   - **${genre} 특성**: 장르별 특징 반영 정도

3. 학습자의 수준을 고려하여 격려하는 어조로 피드백을 제공해주세요.
   - 구체적인 예시를 들어 설명해주세요.
   - 실천 가능한 개선 방법을 제안해주세요.

${additionalPrompt}

**결과 형식:** (마크다운 사용)

## 📝 글쓰기 점수
[여기에 이 글의 점수를 100점 만점에 몇 점인지 적어주세요]

## 🌟 잘한 점
[구체적인 예시와 함께 칭찬할 내용을 작성해주세요]

## 💡 개선 제안

### 언어 사용
- **맞춤법/띄어쓰기**: [구체적인 오류와 수정안]
- **문법**: [문법적 개선점]

### 내용 및 표현
- **구조**: [글의 전개나 구성 관련 제안]
- **표현**: [더 풍부한 표현을 위한 제안]

## 🎯 다음 글쓰기 팁
[학습자가 다음에 적용할 수 있는 실용적인 조언 2-3개]
`;

  const result = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    config: { thinkingConfig: { thinkingBudget: 0 } },
    contents: [{ inlineData: imagePart }, { text: prompt }],
  });
  return result.text ?? '';
}

interface imageDataType {
  data: string;
  mimeType: string;
}

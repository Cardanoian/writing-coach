# ✍️ 손글씨 분석 및 첨삭 AI

이 프로젝트는 사용자가 업로드한 손글씨 이미지를 분석하고, AI 기반으로 첨삭 피드백을 제공하는 웹 애플리케이션입니다. Gemini API를 활용하여 손글씨의 내용, 언어 사용, 구성, 표현력 등을 종합적으로 평가하고 개선 방안을 제시합니다.

## ✨ 주요 기능

- **손글씨 이미지 업로드**: 사용자의 손글씨 이미지를 업로드하여 분석을 요청합니다.
- **장르 및 추가 프롬프트 입력**: 글의 장르를 지정하거나 AI에게 특별히 요청하고 싶은 내용을 추가하여 더 정확하고 맞춤화된 분석을 유도할 수 있습니다.
- **AI 기반 분석 및 첨삭**: 업로드된 손글씨를 텍스트로 추출하고, 맞춤법, 띄어쓰기, 문법, 내용 구성, 표현력 등을 종합적으로 분석하여 상세한 피드백을 제공합니다.
- **마크다운 형식 결과**: 분석 결과는 가독성 높은 마크다운 형식으로 제공됩니다.
- **반응형 UI**: 다양한 기기에서 최적화된 사용자 경험을 제공합니다.
- **테마 토글**: 라이트/다크 모드를 지원하여 사용자의 시각적 선호도를 반영합니다.

## 🚀 기술 스택

- **프론트엔드**: React, TypeScript, Tailwind CSS
- **상태 관리**: React Hooks (useState)
- **UI 컴포넌트**: Shadcn/ui
- **AI 모델**: Google Gemini API (`gemini-2.5-flash`)
- **번들러**: Vite

## 🛠️ 설치 및 실행 방법

1. **저장소 클론**:

   ```bash
   git clone https://github.com/Cardanoian/writing-coach.git
   cd writing-coach
   ```

2. **의존성 설치**:

   ```bash
   npm install
   ```

3. **환경 변수 설정**:
   프로젝트 루트에 `.env` 파일을 생성하고, Gemini API 키를 다음과 같이 추가합니다.

   ```
   VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
   ```

   `YOUR_GEMINI_API_KEY`는 [Google AI Studio](https://aistudio.google.com/app/apikey)에서 발급받을 수 있습니다.

4. **애플리케이션 실행**:
   ```bash
   npm run dev
   ```
   애플리케이션이 개발 모드로 실행되며, 브라우저에서 `http://localhost:5173` (또는 다른 포트)으로 접속하여 확인할 수 있습니다.

## 📄 프로젝트 구조

```
.
├── public/                 # 정적 파일 (아이콘, 매니페스트 등)
├── src/
│   ├── App.tsx             # 메인 애플리케이션 컴포넌트
│   ├── main.tsx            # React 애플리케이션 엔트리 포인트
│   ├── index.css           # 전역 CSS 스타일
│   ├── components/         # 재사용 가능한 UI 컴포넌트
│   │   └── ui/             # Shadcn/ui 컴포넌트
│   ├── hooks/              # 커스텀 React Hooks
│   │   ├── useTheme.tsx
│   │   └── useThemeContext.ts
│   ├── lib/                # 유틸리티 함수 및 API 연동 로직
│   │   ├── gemini.ts       # Gemini API 연동 로직
│   │   └── utils.ts
│   ├── model/              # 데이터 모델 정의
│   │   └── HandwritingAnalysis.ts
│   ├── view/               # UI 뷰 컴포넌트
│   │   └── HandwritingTutorView.tsx # 손글씨 분석 메인 뷰
│   └── viewmodel/          # 뷰와 모델을 연결하는 ViewModel 로직
│       └── HandwritingTutorViewModel.ts
├── package.json            # 프로젝트 의존성 및 스크립트
├── README.md               # 프로젝트 설명
├── vite.config.ts          # Vite 설정 파일
└── tsconfig.json           # TypeScript 설정 파일
```

## 📝 라이선스

이 프로젝트는 MIT 라이선스에 따라 배포됩니다.

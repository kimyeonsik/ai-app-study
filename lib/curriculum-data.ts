export type Session = {
  number: number;
  title: string;
  content: string[];
  note?: string;
  assignment?: string;
  isMilestone?: boolean;
};

export type Phase = {
  id: number;
  name: string;
  sessions: string;
  color: string;
  items: Session[];
};

export const PHASE_COLORS: Record<number, string> = {
  1: "#4ADE80",
  2: "#60A5FA",
  3: "#F472B6",
  4: "#FB923C",
  5: "#A78BFA",
  6: "#FBBF24",
};

export const MILESTONE_SESSIONS = [6, 11, 17];

export const curriculum: Phase[] = [
  {
    id: 1,
    name: "시작 준비",
    sessions: "1~3회차",
    color: "#4ADE80",
    items: [
      {
        number: 1,
        title: "오리엔테이션 + 개발 세계 큰 그림",
        content: [
          "각자 만들고 싶은 앱 한줄소개",
          "앱 서비스의 구성요소",
          "각 직군의 역할",
          "전체 기술 스택의 이해",
          "프롬프팅 기초",
        ],
        note: "실습: 컨텍스트 기반 프롬프팅 실습",
        assignment: "만들고 싶은 앱을 AI에게 설명하고 피드백 받아보기",
      },
      {
        number: 2,
        title: "앱 기획 (AI와 함께)",
        content: [
          "PRD 작성 실습 (Claude로 초안)",
          "화면 목록/유저 플로우 설계",
          "바이브코딩 철학",
          "멀티에이전트 구조 개념",
        ],
        note: "AI가 초안을 만들고 본인이 편집하는 방식",
        assignment: "내 앱 PRD 초안 완성 (목적·타겟유저·핵심기능 3가지 이상)",
      },
      {
        number: 3,
        title: "기획 정리 + 개발 환경 세팅",
        content: [
          "Plane.so 프로젝트 개설 + PRD 기반 이슈 등록",
          "GitHub 계정/레포/첫 커밋",
          "Node.js/npm 환경",
          "Git 기초",
          "Supabase/Vercel/Expo 계정 세팅",
        ],
        assignment: "Plane.so에 기능 이슈 5개 이상 + GitHub 레포 첫 커밋",
      },
    ],
  },
  {
    id: 2,
    name: "AI 프롬프팅 + 바이브코딩",
    sessions: "4~6회차",
    color: "#60A5FA",
    items: [
      {
        number: 4,
        title: "AI로 기획·설계하기",
        content: [
          "프롬프트 기초 패턴 (역할/맥락/출력형식)",
          "AI로 PRD→유저스토리→이슈 분해 실습",
          "AI로 화면 플로우/DB 스키마 설계",
          "AI로 API 구조 초안",
          "좋은 기획 프롬프트 vs 나쁜 기획 프롬프트 비교",
        ],
        assignment:
          "내 앱 PRD를 AI로 유저스토리 5개로 분해 → Plane.so 이슈 등록",
      },
      {
        number: 5,
        title: "AI로 코드 생성 + 바이브코딩",
        content: [
          "기능 단위로 쪼개서 요청하기",
          "에러 메시지 그대로 붙여넣기 디버깅",
          "Cursor에서 AI 페어 프로그래밍",
          "바이브코딩 철학 심화 (설계가 먼저, 코드는 나중)",
          "컨텍스트 윈도우 관리 전략",
          "CLAUDE.md / .cursorrules 작성법",
        ],
        note: "실습: 각자 앱의 핵심 화면 1개를 AI로 생성해보기",
        assignment: "내 앱 메인 화면 AI로 생성하고 스크린샷 공유",
      },
      {
        number: 6,
        title: "🏁 마일스톤 1 — 프로토타입 발표",
        content: [
          "각자 프로토타입 5분 데모",
          "AI 활용 과정 공유 (잘 된 프롬프트, 막혔던 부분)",
          "코드 리뷰 & 피어 피드백",
          "다음 페이즈 목표 설정",
        ],
        note: "평가 기준: 동작하는 화면이 1개 이상 + PRD 대비 진행률",
        assignment: "피드백 반영해서 PRD 업데이트",
        isMilestone: true,
      },
    ],
  },
  {
    id: 3,
    name: "풀스택 개발 실전",
    sessions: "7~11회차",
    color: "#F472B6",
    items: [
      {
        number: 7,
        title: "프론트엔드 기초 — Next.js + Tailwind",
        content: [
          "App Router 구조 이해 (layout / page / loading / error)",
          "Server Component vs Client Component",
          "Tailwind CSS + shadcn/ui 컴포넌트 활용",
          "AI로 UI 컴포넌트 빠르게 생성하기",
          "상태 관리 기초 (useState, useEffect)",
        ],
        assignment: "메인 페이지 레이아웃 완성 (헤더+본문+푸터)",
      },
      {
        number: 8,
        title: "백엔드 & API — Supabase + Next.js Route Handlers",
        content: [
          "Supabase 테이블 생성 + RLS 정책 설정",
          "Next.js Route Handlers로 REST API 작성",
          "CRUD 구현 (Create / Read / Update / Delete)",
          "AI로 SQL 쿼리 생성 및 최적화",
          "API 테스트 (Thunder Client / Postman)",
        ],
        assignment: "핵심 데이터 테이블 1개 생성 + 조회 API 연결",
      },
      {
        number: 9,
        title: "인증 & 사용자 관리",
        content: [
          "Supabase Auth (이메일/소셜 로그인)",
          "세션 관리 & 미들웨어 설정",
          "로그인/회원가입 UI 구현",
          "사용자별 데이터 격리 (RLS)",
          "OAuth 소셜 로그인 (Google/GitHub)",
        ],
        assignment: "이메일 로그인 + 내 정보 보기 페이지 완성",
      },
      {
        number: 10,
        title: "실시간 기능 & 파일 업로드",
        content: [
          "Supabase Realtime으로 실시간 데이터 구독",
          "Supabase Storage 파일 업로드/다운로드",
          "이미지 최적화 (Next.js Image 컴포넌트)",
          "낙관적 UI 업데이트 패턴",
          "웹소켓 vs 폴링 vs SSE 비교",
        ],
        assignment: "이미지 업로드 기능 1개 추가",
      },
      {
        number: 11,
        title: "🏁 마일스톤 2 — MVP 완성 발표",
        content: [
          "각자 MVP 10분 데모",
          "핵심 기능 동작 확인",
          "기술 스택 선택 이유 발표",
          "코드 구조 리뷰",
          "사용자 피드백 시뮬레이션",
        ],
        note: "평가 기준: 로그인 + 핵심 기능 2개 이상 동작 + 배포 URL",
        assignment: "지인 3명에게 사용해달라고 부탁하고 피드백 수집",
        isMilestone: true,
      },
    ],
  },
  {
    id: 4,
    name: "배포 + 운영",
    sessions: "12~14회차",
    color: "#FB923C",
    items: [
      {
        number: 12,
        title: "Vercel 배포 + CI/CD",
        content: [
          "Vercel 프로젝트 연결 + 자동 배포 설정",
          "환경 변수 관리 (.env.local vs 프로덕션)",
          "GitHub Actions로 테스트 자동화",
          "Preview 배포로 PR 검증",
          "커스텀 도메인 연결",
        ],
        assignment: "Vercel에 앱 배포 + 친구에게 URL 공유",
      },
      {
        number: 13,
        title: "보안 + 성능 최적화",
        content: [
          "OWASP 기본 보안 체크리스트",
          "Next.js 성능 최적화 (Static/Dynamic Rendering)",
          "Lighthouse 점수 개선",
          "Rate Limiting + API 보안",
          "Sentry 에러 모니터링 설정",
        ],
        assignment: "Lighthouse 점수 70점 이상 달성",
      },
      {
        number: 14,
        title: "분석 + 모니터링",
        content: [
          "Vercel Analytics + Speed Insights",
          "Supabase 대시보드 활용",
          "사용자 행동 추적 (PostHog / Amplitude)",
          "에러 알림 설정 (Slack/이메일)",
          "데이터 기반 의사결정",
        ],
        assignment: "핵심 이벤트 3개 이상 추적 설정",
      },
    ],
  },
  {
    id: 5,
    name: "고도화 + AI 기능 통합",
    sessions: "15~17회차",
    color: "#A78BFA",
    items: [
      {
        number: 15,
        title: "UI/UX 개선 + 애니메이션",
        content: [
          "사용자 피드백 기반 UX 개선",
          "Framer Motion 또는 CSS 애니메이션",
          "반응형 디자인 완성 (모바일 퍼스트)",
          "접근성 (a11y) 기초",
          "Loading skeleton + Error boundary",
        ],
        assignment: "모바일에서 완전히 동작하는지 확인 + 수정",
      },
      {
        number: 16,
        title: "AI 기능 통합 (Claude API)",
        content: [
          "Claude API 연동 (Anthropic SDK)",
          "스트리밍 응답 처리 (AI SDK)",
          "프롬프트 엔지니어링 — 시스템 프롬프트 설계",
          "Tool Use (함수 호출) 패턴",
          "AI 기능 비용 최적화 (캐싱, 토큰 관리)",
        ],
        assignment: "앱에 AI 챗봇 또는 AI 추천 기능 1개 추가",
      },
      {
        number: 17,
        title: "🏁 마일스톤 3 — 완성도 높은 앱 발표",
        content: [
          "각자 완성 앱 15분 발표",
          "AI 기능 데모",
          "기술적 도전과 해결 과정 공유",
          "비즈니스 가능성 토론",
          "외부 게스트 피드백 (선택)",
        ],
        note: "평가 기준: AI 기능 포함 + 실제 사용 가능한 수준 + 발표 자료",
        assignment: "앱 랜딩 페이지 작성",
        isMilestone: true,
      },
    ],
  },
  {
    id: 6,
    name: "완성 + 마무리",
    sessions: "18~20회차",
    color: "#FBBF24",
    items: [
      {
        number: 18,
        title: "피드백 반영 + 버그 수정",
        content: [
          "마일스톤 3 피드백 분류 (must/should/nice)",
          "크리티컬 버그 집중 수정",
          "테스트 코드 작성 (Vitest / Playwright)",
          "코드 리팩터링 + 문서화",
          "README 완성",
        ],
        assignment: "GitHub README에 스크린샷 + 사용법 추가",
      },
      {
        number: 19,
        title: "포트폴리오 + 출시 준비",
        content: [
          "포트폴리오 페이지 작성 (앱 소개, 기술 스택, 성과)",
          "Product Hunt / 개발 커뮤니티 공유 준비",
          "SNS 마케팅 기초 (트위터/X, 링크드인)",
          "사용자 획득 전략",
          "수익화 모델 검토 (선택)",
        ],
        assignment: "앱 소개 트윗/게시물 초안 작성",
      },
      {
        number: 20,
        title: "최종 발표 & 회고",
        content: [
          "최종 데모 데이 (각자 20분)",
          "5개월 여정 회고 (Keep/Problem/Try)",
          "다음 스텝 계획 발표",
          "모임 마무리 파티 🎉",
          "수료증 수여",
        ],
        note: "외부 게스트 초청 추천 — 실제 사용자/투자자/개발자",
        assignment: "앱 정식 출시 + 첫 사용자 확보",
      },
    ],
  },
];

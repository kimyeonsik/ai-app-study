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

export const MILESTONE_SESSIONS: number[] = [];

export const curriculum: Phase[] = [
  {
    id: 1,
    name: "개념 & 철학",
    sessions: "1~4회차",
    color: "#4ADE80",
    items: [
      {
        number: 1,
        title: "오리엔테이션 — 개발 시스템 큰그림",
        content: [
          "각자 만들고 싶은 앱 한줄 소개",
          "앱 서비스의 구성요소",
          "앱 서비스가 나오기까지의 과정",
          "각 직군의 역할",
          "전체 기술 스택의 이해",
        ],
        note: "전체 흐름을 다이어그램 한 장으로 정리",
        assignment: "만들고 싶은 앱을 AI에게 설명하고 피드백 받아보기",
      },
      {
        number: 2,
        title: "개발 용어 이해 + 프롬프팅 기초",
        content: [
          "자주 쓰는 개발 용어 정리 (API, 프론트/백엔드, 배포 등)",
          "클라이언트 ↔ 서버 ↔ DB 흐름",
          "프롬프팅 기초 패턴 (역할 / 맥락 / 출력 형식)",
          "컨텍스트 기반 프롬프팅 실습",
          "좋은 프롬프트 vs 나쁜 프롬프트 비교",
        ],
        assignment: "AI에게 내 앱의 기능 하나를 설명하고 구현 방법 물어보기",
      },
      {
        number: 3,
        title: "바이브코딩 + 멀티에이전트 + 하네스 엔지니어링",
        content: [
          "바이브코딩 철학 — 설계가 코드보다 중요하다",
          "멀티에이전트 구조 개념 (PO / Dev / QA 역할 분리)",
          "하네스 엔지니어링 개요",
          "같은 기능을 세 포지션으로 각각 물어보기 실습",
          "시스템 프롬프트 설계 기초",
        ],
        assignment: "기능 1개를 PO / Dev / QA 관점으로 각각 질문 → 결과 비교 공유",
      },
      {
        number: 4,
        title: "자동 개발 시스템 구축",
        content: [
          "설계 → 개발 → 피드백 루프 → 자동 배포 전체 흐름",
          "CI/CD 개념 이해",
          "CLAUDE.md / .cursorrules 작성법",
          "컨텍스트 윈도우 관리 전략",
          "에러 메시지 그대로 붙여넣기 디버깅",
        ],
        assignment: "내 앱 전용 시스템 프롬프트(CLAUDE.md) 초안 작성",
      },
    ],
  },
  {
    id: 2,
    name: "설계 & 기획",
    sessions: "5~8회차",
    color: "#60A5FA",
    items: [
      {
        number: 5,
        title: "내 앱 설계 1 — PRD + 유저플로우",
        content: [
          "PRD 작성 실습 (Claude로 초안 생성)",
          "화면 목록 · 유저 플로우 설계",
          "AI로 PRD → 유저스토리 → 이슈 분해",
          "바이브코딩으로 PRD 고도화 실습",
        ],
        assignment: "내 앱 PRD 초안 완성 (목적 · 타겟유저 · 핵심기능 3가지 이상)",
      },
      {
        number: 6,
        title: "내 앱 설계 2 — DB 스키마 + API 구조",
        content: [
          "AI로 DB 테이블 구조 설계",
          "SQL vs NoSQL 기초 개념",
          "AI로 API 구조 초안 잡기",
          "화면 플로우와 데이터 구조 연결",
        ],
        assignment: "내 앱 DB 스키마 AI로 설계 후 다이어그램으로 정리",
      },
      {
        number: 7,
        title: "기술 스택 & 클라우드 서비스 상세",
        content: [
          "React Native / Expo / Next.js / Node.js",
          "Supabase / Firebase 비교 및 판단 기준",
          "Vercel / GitHub / Amplitude",
          "개발환경 확정 및 계정 세팅",
          "클라우드 vs Self-hosted 판단 기준",
        ],
        assignment: "Supabase · Vercel · Expo · GitHub 계정 모두 세팅 완료",
      },
      {
        number: 8,
        title: "기획 & 관리 — Plane.so + GitHub",
        content: [
          "Plane.so 프로젝트 개설 + PRD 기반 이슈 등록",
          "GitHub 레포 생성 · 첫 커밋 · 브랜치 전략",
          "Git 기초 (commit / push / pull / branch)",
          "이슈 → 개발 → PR → 머지 흐름",
        ],
        assignment: "Plane.so에 기능 이슈 5개 이상 등록 + GitHub 레포 첫 커밋",
      },
    ],
  },
  {
    id: 3,
    name: "개발 기초",
    sessions: "9~11회차",
    color: "#F472B6",
    items: [
      {
        number: 9,
        title: "프로젝트 생성 — Expo + 클린 아키텍처",
        content: [
          "Expo CLI로 프로젝트 생성",
          "폴더 구조 설계 — 클린 아키텍처 · Feature-based structure",
          "상태관리 기초 (Zustand / Redux 개념)",
          "시뮬레이터 · 실기기에서 실행",
          "AI로 첫 화면 컴포넌트 생성 실습",
        ],
        assignment: "Expo 앱 생성 후 실기기에서 실행 스크린샷 공유",
      },
      {
        number: 10,
        title: "디자인 시스템 — pencil.dev + NativeWind",
        content: [
          "디자인 토큰 개념 (컬러 · 타이포 · 간격)",
          "pencil.dev로 컴포넌트 스펙 정의",
          "NativeWind(Tailwind) 세팅 + 디자인 토큰 연동",
          "공통 컴포넌트 설계 — Button / Input / Card",
          "AI로 컴포넌트 스펙 → 코드 연결 흐름",
        ],
        assignment: "내 앱 컬러 · 타이포 시스템 정의 후 공통 컴포넌트 3개 완성",
      },
      {
        number: 11,
        title: "앱 개발 실전 + 티켓 관리",
        content: [
          "Expo Router — 파일 기반 라우팅 · 탭/스택 네비게이션",
          "Plane.so 티켓 기반으로 기능 개발",
          "AI 페어 프로그래밍 실습 (Cursor)",
          "로딩 · 에러 상태 처리",
          "UI 화면 2개 이상 완성 실습",
        ],
        assignment: "핵심 화면 2개 이상 완성 후 Plane.so 티켓 Done 처리",
      },
    ],
  },
  {
    id: 4,
    name: "백엔드 & 연동",
    sessions: "12~13회차",
    color: "#FB923C",
    items: [
      {
        number: 12,
        title: "백엔드 연동 — Supabase + 인증",
        content: [
          "Supabase 테이블 생성 + RLS 보안 정책 설정",
          "Supabase Auth — 이메일 · 소셜 로그인",
          "세션 관리 · 로그인 플로우 완성",
          "CRUD 구현 (Create / Read / Update / Delete)",
          "AI로 SQL 쿼리 생성 및 최적화",
        ],
        assignment: "로그인 기능 완성 + 핵심 데이터 테이블 1개 연동",
      },
      {
        number: 13,
        title: "실시간 기능 + 파일 업로드 + 푸시 알림",
        content: [
          "Supabase Realtime으로 실시간 데이터 구독",
          "Supabase Storage 파일 업로드 · 다운로드",
          "Expo Push Notification 세팅",
          "이메일 발송 — Resend 연동",
          "n8n으로 이벤트 자동화 기초",
        ],
        assignment: "이미지 업로드 기능 1개 추가 + 푸시 알림 테스트 성공",
      },
    ],
  },
  {
    id: 5,
    name: "배포",
    sessions: "14~15회차",
    color: "#A78BFA",
    items: [
      {
        number: 14,
        title: "CI/CD + EAS Build + Vercel 자동 배포",
        content: [
          "GitHub Actions 자동 배포 설정",
          "EAS Build로 앱 빌드 파일 생성 (.ipa / .apk)",
          "Vercel 프로젝트 연결 + 자동 배포",
          "환경 변수 관리 (.env.local vs 프로덕션)",
          "Preview 배포로 PR 검증",
        ],
        assignment: "GitHub Actions 설정 + EAS Build 빌드 파일 생성 성공",
      },
      {
        number: 15,
        title: "앱스토어 출시 — Play Store + App Store",
        content: [
          "App Store · Google Play 등록 절차",
          "screenshots.pro로 스토어 이미지 생성",
          "개인정보처리방침 · 이용약관 초안 작성",
          "심사 대응 체크리스트",
          "커스텀 도메인 연결",
        ],
        assignment: "스토어 등록용 스크린샷 5장 + 개인정보처리방침 완성",
      },
    ],
  },
  {
    id: 6,
    name: "운영 & 개선",
    sessions: "16~18회차",
    color: "#FBBF24",
    items: [
      {
        number: 16,
        title: "데이터 분석 + 사용자 획득",
        content: [
          "Amplitude 이벤트 설계 원칙",
          "핵심 지표 정의 및 대시보드 구성",
          "Sentry 에러 트래킹 설정",
          "사용자 획득 전략 (SNS · Product Hunt · 커뮤니티)",
          "데이터 기반 의사결정",
        ],
        assignment: "Amplitude 핵심 이벤트 3개 이상 설정 + 대시보드 구성",
      },
      {
        number: 17,
        title: "수익화 모델 + 결제 연동",
        content: [
          "수익화 모델 검토 (구독 / 단건 / 광고)",
          "Stripe 기초 세팅 · 단건 결제 구현",
          "토스페이먼츠 옵션 검토",
          "구독 플랜 설계 + Webhook으로 결제 상태 DB 반영",
        ],
        assignment: "Stripe 테스트 모드로 단건 결제 1회 성공",
      },
      {
        number: 18,
        title: "앱 개선 — 접근성 · 다크모드 · 다국어 + 최종 발표",
        content: [
          "접근성 (a11y) 지원",
          "다크모드 지원",
          "다국어(i18n) 지원",
          "최종 데모 발표 (각자 5분)",
          "회고 (Keep / Problem / Try) + 다음 스텝",
        ],
        assignment: "완성된 앱 5분 데모 발표 + 회고 작성",
      },
    ],
  },
];

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
  4: "#FBBF24",
};

export const MILESTONE_SESSIONS: number[] = [6, 10];

export const curriculum: Phase[] = [
  {
    id: 1,
    name: "이론 기초",
    sessions: "1~3회차",
    color: "#4ADE80",
    items: [
      {
        number: 1,
        title: "오리엔테이션 — 앱 서비스 큰 그림",
        content: [
          "각자 만들고 싶은 앱 한 줄 소개",
          "앱 서비스의 구성요소 (클라이언트 / 서버 / DB / 인프라)",
          "앱 서비스가 나오기까지의 과정",
          "각 직군의 역할 (PO / 디자이너 / 개발자 / QA)",
          "전체 기술 스택 조감",
        ],
        note: "전체 흐름을 다이어그램 한 장으로 정리",
        assignment: "만들고 싶은 앱을 AI에게 설명하고 피드백 받아보기",
      },
      {
        number: 2,
        title: "개발 용어 + 프롬프팅 기초",
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
        title: "바이브코딩 철학 + 멀티에이전트 구조",
        content: [
          "바이브코딩 철학 — 설계가 코드보다 중요하다",
          "멀티에이전트 구조 개념 (PO / Dev / QA 역할 분리)",
          "하네스 엔지니어링 개요",
          "같은 기능을 세 포지션으로 각각 질문해보기 실습",
          "AI 지시문 설계 기초",
        ],
        assignment: "기능 1개를 PO / Dev / QA 관점으로 각각 질문 → 결과 비교 공유",
      },
    ],
  },
  {
    id: 2,
    name: "시스템 구축",
    sessions: "4~6회차",
    color: "#60A5FA",
    items: [
      {
        number: 4,
        title: "개발 환경 세팅 — OpenClaw · GitHub · Vercel",
        content: [
          "OpenClaw 설치 및 AI 코딩 환경 세팅",
          "GitHub 레포 생성 · 첫 커밋 · 브랜치 전략",
          "Vercel 프로젝트 연결 + 자동 배포 파이프라인",
          "환경 변수 관리 (.env 개념)",
          "Preview 배포 체험 — PR 하나로 URL 생성",
        ],
        assignment: "GitHub 레포 생성 + Vercel 자동 배포 연결 성공",
      },
      {
        number: 5,
        title: "내 앱 기획 — PRD + AI 지시문 작성",
        content: [
          "PRD 작성 실습 (Claude로 초안 생성)",
          "화면 목록 · 유저 플로우 설계",
          "AI 지시문 작성법 — 내 앱 전용 AI 컨텍스트 설정",
          "AI로 PRD → 유저스토리 → 이슈 분해",
          "바이브코딩으로 PRD 고도화 실습",
        ],
        assignment: "PRD 초안 완성 + 내 앱 전용 AI 지시문 초안 작성",
      },
      {
        number: 6,
        title: "워크플로우 완성 — 티켓 관리 + 개발 루프",
        content: [
          "Plane.so 프로젝트 개설 + PRD 기반 이슈 등록",
          "이슈 → 개발 → PR → 머지 루프 체험",
          "CI/CD 개념 이해",
          "AI 지시문 고도화",
          "컨텍스트 윈도우 관리 전략 · 에러 디버깅 패턴",
        ],
        note: "🎯 마일스톤 — 이 시점부터 모임 포맷이 코워킹으로 전환됩니다",
        assignment: "Plane.so에 기능 이슈 5개 이상 등록 + 티켓 하나 직접 머지까지",
        isMilestone: true,
      },
    ],
  },
  {
    id: 3,
    name: "앱 개발",
    sessions: "7~10회차",
    color: "#F472B6",
    items: [
      {
        number: 7,
        title: "프로젝트 생성 — Expo + 클린 아키텍처",
        content: [
          "Expo CLI로 프로젝트 생성",
          "폴더 구조 설계 — Feature-based 클린 아키텍처",
          "Expo Router — 파일 기반 라우팅 기초",
          "시뮬레이터 · 실기기에서 실행",
          "AI로 첫 화면 컴포넌트 생성 실습",
        ],
        assignment: "Expo 앱 생성 후 실기기에서 실행 스크린샷 공유",
      },
      {
        number: 8,
        title: "디자인 시스템 1 — 토큰 설계",
        content: [
          "디자인 토큰 개념 (컬러 · 타이포 · 간격 · 반응형)",
          "내 앱 컬러 팔레트 · 타이포그래피 정의",
          "NativeWind(Tailwind) 세팅 + 디자인 토큰 연동",
          "다크모드 대응 구조 설계",
          "AI로 디자인 토큰 → 코드 연결 흐름",
        ],
        assignment: "내 앱 컬러 · 타이포 시스템 코드로 정의 완료",
      },
      {
        number: 9,
        title: "디자인 시스템 2 — 공통 컴포넌트",
        content: [
          "공통 컴포넌트 설계 원칙",
          "Button / Input / Card 컴포넌트 완성",
          "로딩 · 에러 · 빈 상태(Empty State) 처리",
          "AI 페어 프로그래밍으로 컴포넌트 빠르게 완성하기",
          "Storybook 없이 컴포넌트 검증하는 법",
        ],
        assignment: "공통 컴포넌트 3개 이상 완성 + 내 앱 화면에 적용",
      },
      {
        number: 10,
        title: "핵심 화면 개발 — 디자인 시스템 적용 검증",
        content: [
          "핵심 화면 2개 이상 완성 (디자인 시스템 100% 적용)",
          "탭 / 스택 네비게이션 설정",
          "Plane.so 티켓 기반 개발 루틴 정착",
          "AI에게 넘길 수 있는 작업 vs 직접 해야 하는 작업 구분",
          "이후 자율 개발을 위한 패턴 정리",
        ],
        note: "🎯 마일스톤 — 이 시점부터 AI로 혼자 개발할 수 있는 기반 완성",
        assignment: "핵심 화면 2개 이상 완성 후 Plane.so 티켓 Done 처리",
        isMilestone: true,
      },
    ],
  },
  {
    id: 4,
    name: "코워킹",
    sessions: "11~12회차",
    color: "#FBBF24",
    items: [
      {
        number: 11,
        title: "코워킹 1 — 개인 개발 + Q&A",
        content: [
          "지난주 과제 점검 및 공유 (10분)",
          "공통 막힌 부분 · 주제 설명 (20분)",
          "개인 개발 + 실시간 Q&A (1시간 30분)",
          "백엔드 연동 (Supabase / Firebase) 질문 대응",
          "배포 · 스토어 등록 질문 대응",
        ],
        assignment: "각자 이번 주 개발 목표 1가지 설정 후 다음 모임에 공유",
      },
      {
        number: 12,
        title: "코워킹 2 — 개인 개발 + 미니 데모",
        content: [
          "지난주 과제 점검 및 공유 (10분)",
          "공통 막힌 부분 · 주제 설명 (20분)",
          "개인 개발 + 실시간 Q&A (1시간)",
          "미니 데모 — 각자 현재 앱 상태 공유 (30분)",
          "회고 + 다음 스텝 논의",
        ],
        note: "코워킹 포맷이 잘 맞으면 이후에도 계속 연장 가능",
        assignment: "현재 앱 상태 스크린샷 or 영상으로 기록",
      },
    ],
  },
];

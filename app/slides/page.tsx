"use client";

import { useState, useEffect, useCallback } from "react";

const PHASE_COLORS: Record<string, string> = {
  p1: "#4ADE80",
  p2: "#60A5FA",
  p3: "#F472B6",
  p4: "#FB923C",
  p5: "#A78BFA",
  p6: "#FBBF24",
};

type SlideType =
  | "cover"
  | "phase-overview"
  | "session"
  | "ops";

interface Slide {
  id: number;
  type: SlideType;
  phase?: string;
  phaseLabel?: string;
  phaseNum?: number;
  sessionNum?: number;
  title?: string;
  tagline?: string;
  sessions?: { num: number; title: string }[];
  content?: string[];
  note?: string;
  assignment?: string;
}

const slides: Slide[] = [
  // SLIDE 1: Cover
  {
    id: 1,
    type: "cover",
  },
  // SLIDE 2: Phase 1 Overview
  {
    id: 2,
    type: "phase-overview",
    phase: "p1",
    phaseNum: 1,
    phaseLabel: "Phase 1 · 1~4회차",
    title: "개념 & 철학",
    tagline: '"왜 이렇게 만드는지 이해하는 단계"',
    sessions: [
      { num: 1, title: "오리엔테이션 — 개발 시스템 큰그림" },
      { num: 2, title: "개발 용어 이해 + 프롬프팅 기초" },
      { num: 3, title: "바이브코딩 + 멀티에이전트 + 하네스 엔지니어링" },
      { num: 4, title: "자동 개발 시스템 구축" },
    ],
  },
  // SLIDE 3: Session 1
  {
    id: 3,
    type: "session",
    phase: "p1",
    phaseLabel: "Phase 1 · 1회차",
    sessionNum: 1,
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
  // SLIDE 4: Session 2
  {
    id: 4,
    type: "session",
    phase: "p1",
    phaseLabel: "Phase 1 · 2회차",
    sessionNum: 2,
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
  // SLIDE 5: Session 3
  {
    id: 5,
    type: "session",
    phase: "p1",
    phaseLabel: "Phase 1 · 3회차",
    sessionNum: 3,
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
  // SLIDE 6: Session 4
  {
    id: 6,
    type: "session",
    phase: "p1",
    phaseLabel: "Phase 1 · 4회차",
    sessionNum: 4,
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
  // SLIDE 7: Phase 2 Overview
  {
    id: 7,
    type: "phase-overview",
    phase: "p2",
    phaseNum: 2,
    phaseLabel: "Phase 2 · 5~8회차",
    title: "설계 & 기획",
    tagline: '"만들기 전에 제대로 설계하는 단계"',
    sessions: [
      { num: 5, title: "내 앱 설계 1 — PRD + 유저플로우" },
      { num: 6, title: "내 앱 설계 2 — DB 스키마 + API 구조" },
      { num: 7, title: "기술 스택 & 클라우드 서비스 상세" },
      { num: 8, title: "기획 & 관리 — Plane.so + GitHub" },
    ],
  },
  // SLIDE 8: Session 5
  {
    id: 8,
    type: "session",
    phase: "p2",
    phaseLabel: "Phase 2 · 5회차",
    sessionNum: 5,
    title: "내 앱 설계 1 — PRD + 유저플로우",
    content: [
      "PRD 작성 실습 (Claude로 초안 생성)",
      "화면 목록 · 유저 플로우 설계",
      "AI로 PRD → 유저스토리 → 이슈 분해",
      "바이브코딩으로 PRD 고도화 실습",
    ],
    assignment: "내 앱 PRD 초안 완성 (목적 · 타겟유저 · 핵심기능 3가지 이상)",
  },
  // SLIDE 9: Session 6
  {
    id: 9,
    type: "session",
    phase: "p2",
    phaseLabel: "Phase 2 · 6회차",
    sessionNum: 6,
    title: "내 앱 설계 2 — DB 스키마 + API 구조",
    content: [
      "AI로 DB 테이블 구조 설계",
      "SQL vs NoSQL 기초 개념",
      "AI로 API 구조 초안 잡기",
      "화면 플로우와 데이터 구조 연결",
    ],
    assignment: "내 앱 DB 스키마 AI로 설계 후 다이어그램으로 정리",
  },
  // SLIDE 10: Session 7
  {
    id: 10,
    type: "session",
    phase: "p2",
    phaseLabel: "Phase 2 · 7회차",
    sessionNum: 7,
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
  // SLIDE 11: Session 8
  {
    id: 11,
    type: "session",
    phase: "p2",
    phaseLabel: "Phase 2 · 8회차",
    sessionNum: 8,
    title: "기획 & 관리 — Plane.so + GitHub",
    content: [
      "Plane.so 프로젝트 개설 + PRD 기반 이슈 등록",
      "GitHub 레포 생성 · 첫 커밋 · 브랜치 전략",
      "Git 기초 (commit / push / pull / branch)",
      "이슈 → 개발 → PR → 머지 흐름",
    ],
    assignment: "Plane.so에 기능 이슈 5개 이상 등록 + GitHub 레포 첫 커밋",
  },
  // SLIDE 12: Phase 3 Overview
  {
    id: 12,
    type: "phase-overview",
    phase: "p3",
    phaseNum: 3,
    phaseLabel: "Phase 3 · 9~11회차",
    title: "개발 기초",
    tagline: '"실제로 만들기 시작하는 단계"',
    sessions: [
      { num: 9, title: "프로젝트 생성 — Expo + 클린 아키텍처" },
      { num: 10, title: "디자인 시스템 — pencil.dev + NativeWind" },
      { num: 11, title: "앱 개발 실전 + 티켓 관리" },
    ],
  },
  // SLIDE 13: Session 9
  {
    id: 13,
    type: "session",
    phase: "p3",
    phaseLabel: "Phase 3 · 9회차",
    sessionNum: 9,
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
  // SLIDE 14: Session 10
  {
    id: 14,
    type: "session",
    phase: "p3",
    phaseLabel: "Phase 3 · 10회차",
    sessionNum: 10,
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
  // SLIDE 15: Session 11
  {
    id: 15,
    type: "session",
    phase: "p3",
    phaseLabel: "Phase 3 · 11회차",
    sessionNum: 11,
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
  // SLIDE 16: Phase 4 Overview
  {
    id: 16,
    type: "phase-overview",
    phase: "p4",
    phaseNum: 4,
    phaseLabel: "Phase 4 · 12~13회차",
    title: "백엔드 & 연동",
    tagline: '"데이터가 흐르는 구조 만들기"',
    sessions: [
      { num: 12, title: "백엔드 연동 — Supabase + 인증" },
      { num: 13, title: "실시간 기능 + 파일 업로드 + 푸시 알림" },
    ],
  },
  // SLIDE 17: Session 12
  {
    id: 17,
    type: "session",
    phase: "p4",
    phaseLabel: "Phase 4 · 12회차",
    sessionNum: 12,
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
  // SLIDE 18: Session 13
  {
    id: 18,
    type: "session",
    phase: "p4",
    phaseLabel: "Phase 4 · 13회차",
    sessionNum: 13,
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
  // SLIDE 19: Phase 5 Overview
  {
    id: 19,
    type: "phase-overview",
    phase: "p5",
    phaseNum: 5,
    phaseLabel: "Phase 5 · 14~15회차",
    title: "배포",
    tagline: '"세상에 내보내는 단계"',
    sessions: [
      { num: 14, title: "CI/CD + EAS Build + Vercel 자동 배포" },
      { num: 15, title: "앱스토어 출시 — Play Store + App Store" },
    ],
  },
  // SLIDE 20: Session 14
  {
    id: 20,
    type: "session",
    phase: "p5",
    phaseLabel: "Phase 5 · 14회차",
    sessionNum: 14,
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
  // SLIDE 21: Session 15
  {
    id: 21,
    type: "session",
    phase: "p5",
    phaseLabel: "Phase 5 · 15회차",
    sessionNum: 15,
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
  // SLIDE 22: Phase 6 Overview
  {
    id: 22,
    type: "phase-overview",
    phase: "p6",
    phaseNum: 6,
    phaseLabel: "Phase 6 · 16~18회차",
    title: "운영 & 개선",
    tagline: '"출시 후 더 좋게 만들기"',
    sessions: [
      { num: 16, title: "데이터 분석 + 사용자 획득" },
      { num: 17, title: "수익화 모델 + 결제 연동" },
      { num: 18, title: "앱 개선 — 접근성 · 다크모드 · 다국어 + 최종 발표" },
    ],
  },
  // SLIDE 23: Session 16
  {
    id: 23,
    type: "session",
    phase: "p6",
    phaseLabel: "Phase 6 · 16회차",
    sessionNum: 16,
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
  // SLIDE 24: Session 17
  {
    id: 24,
    type: "session",
    phase: "p6",
    phaseLabel: "Phase 6 · 17회차",
    sessionNum: 17,
    title: "수익화 모델 + 결제 연동",
    content: [
      "수익화 모델 검토 (구독 / 단건 / 광고)",
      "Stripe 기초 세팅 · 단건 결제 구현",
      "토스페이먼츠 옵션 검토",
      "구독 플랜 설계 + Webhook으로 결제 상태 DB 반영",
    ],
    assignment: "Stripe 테스트 모드로 단건 결제 1회 성공",
  },
  // SLIDE 25: Session 18
  {
    id: 25,
    type: "session",
    phase: "p6",
    phaseLabel: "Phase 6 · 18회차",
    sessionNum: 18,
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
  // SLIDE 26: Ops
  {
    id: 26,
    type: "ops",
  },
];

const TOTAL = slides.length;

function CoverSlide() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-8">
      <div className="text-7xl">🤖</div>
      <h1
        className="text-4xl sm:text-5xl font-extrabold leading-tight"
        style={{
          background: "linear-gradient(135deg, #A78BFA, #4ADE80)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        AI로 앱 만들기 모임
        <br />
        커리큘럼 & 개발 프로세스 가이드
      </h1>
      <div className="flex flex-wrap gap-3 justify-center">
        {["📅 주 1회 × 20회차", "⏱ 약 5개월", "🕐 회당 2시간"].map((t) => (
          <span
            key={t}
            className="px-4 py-2 rounded-full text-sm font-medium"
            style={{ background: "#1E1E28", border: "1px solid #2E2E38", color: "#F0F0F5" }}
          >
            {t}
          </span>
        ))}
      </div>
      <p className="text-base leading-relaxed" style={{ color: "#A0A0B0" }}>
        <span style={{ color: "#F0F0F5", fontWeight: 600 }}>대상</span>: 비개발자
        <br />
        <span style={{ color: "#F0F0F5", fontWeight: 600 }}>방식</span>: LLM으로 바이브코딩
      </p>
    </div>
  );
}

function PhaseOverviewSlide({ slide }: { slide: Slide }) {
  const color = PHASE_COLORS[slide.phase!];
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6">
      <span
        className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
        style={{ color, border: `1px solid ${color}`, background: `${color}15` }}
      >
        {slide.phaseLabel}
      </span>
      <h2 className="text-4xl sm:text-5xl font-extrabold" style={{ color: "#F0F0F5" }}>
        {slide.title}
      </h2>
      <p className="text-lg" style={{ color: "#A0A0B0" }}>{slide.tagline}</p>
      <div className="flex flex-wrap gap-3 justify-center mt-2">
        {slide.sessions?.map((s) => (
          <div
            key={s.num}
            className="rounded-xl px-4 py-3 text-left"
            style={{ background: "#16161A", border: "1px solid #2E2E38", minWidth: 180 }}
          >
            <div className="text-xs font-bold mb-1" style={{ color: "#A0A0B0" }}>
              {s.num}회차
            </div>
            <div className="text-sm font-medium" style={{ color: "#F0F0F5" }}>{s.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SessionSlide({ slide }: { slide: Slide }) {
  const color = PHASE_COLORS[slide.phase!];
  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <span
          className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
          style={{ color, border: `1px solid ${color}50`, background: `${color}15` }}
        >
          {slide.phaseLabel}
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold mt-3" style={{ color: "#F0F0F5" }}>
          {slide.title}
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Content */}
        <div className="rounded-xl p-5" style={{ background: "#16161A", border: "1px solid #2E2E38" }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#A0A0B0" }}>
            📚 이번 회차 내용
          </p>
          <ul className="flex flex-col gap-2">
            {slide.content?.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm" style={{ color: "#C8C8D8" }}>
                <span style={{ color, flexShrink: 0 }}>→</span>
                {item}
              </li>
            ))}
          </ul>
          {slide.note && (
            <div
              className="mt-3 text-xs rounded-lg px-3 py-2"
              style={{ background: "#1E1E2E", color: "#A0A0B0" }}
            >
              💡 {slide.note}
            </div>
          )}
        </div>

        {/* Assignment */}
        {slide.assignment && (
          <div className="rounded-xl p-5" style={{ background: "#16161A", border: "1px solid #2E2E38" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#A0A0B0" }}>
              📝 과제
            </p>
            <p className="text-sm leading-snug" style={{ color: "#C8C8D8" }}>
              {slide.assignment}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function OpsSlide() {
  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#F0F0F5" }}>
        운영 가이드
      </h2>
      <p className="text-sm -mt-3" style={{ color: "#A0A0B0" }}>과제·점검·생존 팁</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          {
            title: "⚙️ 운영 방식",
            items: [
              "회차 구성: 개념+실습 90분 → 개인 프로젝트 적용 30분",
              "과제 제출: 슬랙에 [n회차] @이름 - 완료/질문",
              "막힌 부분: 회차 초반 10분 공유",
            ],
          },
          {
            title: "📅 일정",
            items: [
              "주 1회 · 회당 2시간",
              "총 18회차 · 약 5개월",
            ],
          },
          {
            title: "💡 참여 팁",
            items: [
              "코드 이해 안 되면 읽고 질문",
              "에러는 배움의 기회",
              "막히면 바로 질문 — 혼자 오래 붙잡지 않기",
            ],
          },
          {
            title: "🚀 결과물 공유",
            items: [
              "매 회차 과제 슬랙에 공유",
              "스크린샷 · 링크 · 코드 모두 환영",
              "서로의 결과물을 보며 함께 성장",
            ],
          },
        ].map((box) => (
          <div
            key={box.title}
            className="rounded-xl p-5"
            style={{ background: "#16161A", border: "1px solid #2E2E38" }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#A0A0B0" }}>
              {box.title}
            </p>
            <ul className="flex flex-col gap-2">
              {box.items.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm" style={{ color: "#C8C8D8" }}>
                  <span style={{ color: "#A78BFA", flexShrink: 0 }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SlidesPage() {
  const [current, setCurrent] = useState(1);

  const goTo = useCallback(
    (n: number) => {
      if (n < 1 || n > TOTAL) return;
      setCurrent(n);
    },
    []
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goTo(current + 1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goTo(current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, goTo]);

  const slide = slides[current - 1];
  const progress = (current / TOTAL) * 100;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0D0D0F" }}>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 z-50" style={{ background: "#1E1E28" }}>
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #A78BFA, #4ADE80)",
          }}
        />
      </div>

      {/* Back to site */}
      <div className="fixed top-4 left-4 z-50">
        <a
          href="/"
          className="text-xs px-3 py-1.5 rounded-lg transition-all"
          style={{ background: "#1E1E28", color: "#A0A0B0", border: "1px solid #2E2E38" }}
        >
          ← 커리큘럼으로
        </a>
      </div>

      {/* Slide number */}
      <div
        className="fixed top-4 right-4 text-xs z-50"
        style={{ color: "#A0A0B0" }}
      >
        {current} / {TOTAL}
      </div>

      {/* Slide content */}
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-4xl">
          {slide.type === "cover" && <CoverSlide />}
          {slide.type === "phase-overview" && <PhaseOverviewSlide slide={slide} />}
          {slide.type === "session" && <SessionSlide slide={slide} />}
          {slide.type === "ops" && <OpsSlide />}
        </div>
      </div>

      {/* Navigation */}
      <div
        className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-6 py-3"
        style={{
          background: "rgba(13,13,15,0.95)",
          backdropFilter: "blur(10px)",
          borderTop: "1px solid #2E2E38",
        }}
      >
        <button
          onClick={() => goTo(current - 1)}
          disabled={current === 1}
          className="px-5 py-2 rounded-lg text-sm transition-all disabled:opacity-30"
          style={{ background: "#1E1E28", color: "#F0F0F5", border: "1px solid #2E2E38" }}
        >
          ← 이전
        </button>

        {/* Dot navigation (phase-level) */}
        <div className="flex gap-1.5 items-center">
          {Array.from({ length: TOTAL }, (_, i) => (
            <button
              key={i}
              onClick={() => goTo(i + 1)}
              className="rounded-full transition-all"
              style={{
                width: i + 1 === current ? 20 : 6,
                height: 6,
                background: i + 1 === current ? "#A78BFA" : "#2E2E38",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(current + 1)}
          disabled={current === TOTAL}
          className="px-5 py-2 rounded-lg text-sm transition-all disabled:opacity-30"
          style={{ background: "#1E1E28", color: "#F0F0F5", border: "1px solid #2E2E38" }}
        >
          다음 →
        </button>
      </div>
    </div>
  );
}

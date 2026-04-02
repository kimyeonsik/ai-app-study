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
    phaseLabel: "Phase 1 · 1~3회차",
    title: "시작 준비",
    tagline: '"같은 출발선에 서는 단계"',
    sessions: [
      { num: 1, title: "오리엔테이션 + 개발 세계 큰 그림" },
      { num: 2, title: "앱 기획 (AI와 함께)" },
      { num: 3, title: "기획 정리 + 개발 환경 세팅" },
    ],
  },
  // SLIDE 3: Session 1
  {
    id: 3,
    type: "session",
    phase: "p1",
    phaseLabel: "Phase 1 · 1회차",
    sessionNum: 1,
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
  // SLIDE 4: Session 2
  {
    id: 4,
    type: "session",
    phase: "p1",
    phaseLabel: "Phase 1 · 2회차",
    sessionNum: 2,
    title: "앱 기획 (AI와 함께)",
    content: [
      "PRD 작성 실습 — Claude로 초안 생성",
      "화면 목록 · 유저 플로우 설계",
      "바이브코딩 철학 소개 — '코드가 아니라 설계를 한다'",
      "멀티에이전트 구조 개념 (PO / Dev / QA 역할)",
    ],
    note: "비개발자도 PRD를 쓸 수 있다 — AI가 초안을 만들고 본인이 편집하는 방식",
    assignment: "내 앱 PRD 초안 완성 (목적·타겟유저·핵심기능 3가지 이상)",
  },
  // SLIDE 5: Session 3
  {
    id: 5,
    type: "session",
    phase: "p1",
    phaseLabel: "Phase 1 · 3회차",
    sessionNum: 3,
    title: "기획 정리 + 개발 환경 세팅",
    content: [
      "Plane.so 프로젝트 개설 + PRD 기반 이슈 등록",
      "GitHub 계정 · 레포 생성 · 첫 커밋",
      "Node.js / npm 환경 점검",
      "Git commit · push · pull · 브랜치 기초",
      "Supabase · Vercel · Expo 계정 세팅",
    ],
    assignment: "Plane.so에 기능 이슈 5개 이상 + GitHub 레포 첫 커밋",
  },
  // SLIDE 6: Phase 2 Overview
  {
    id: 6,
    type: "phase-overview",
    phase: "p2",
    phaseNum: 2,
    phaseLabel: "Phase 2 · 4~6회차",
    title: "AI 프롬프팅 + 바이브코딩",
    tagline: '"AI를 제대로 부리는 법"',
    sessions: [
      { num: 4, title: "AI로 기획 · 설계하기" },
      { num: 5, title: "AI로 코드 생성 + 바이브코딩" },
      { num: 6, title: "멀티에이전트 + 고급 프롬프팅" },
    ],
  },
  // SLIDE 7: Session 4
  {
    id: 7,
    type: "session",
    phase: "p2",
    phaseLabel: "Phase 2 · 4회차",
    sessionNum: 4,
    title: "AI로 기획 · 설계하기",
    content: [
      "프롬프트 기초 패턴 — 역할 부여 / 맥락 / 출력 형식",
      "AI로 PRD → 유저스토리 → 이슈 분해 실습",
      "AI로 화면 플로우 · DB 스키마 설계",
      "AI로 API 구조 초안 잡기",
      "좋은 기획 프롬프트 vs 나쁜 기획 프롬프트 실시간 비교",
    ],
    assignment: "내 앱 PRD를 AI로 유저스토리 5개로 분해 → Plane.so 이슈 등록",
  },
  // SLIDE 8: Session 5
  {
    id: 8,
    type: "session",
    phase: "p2",
    phaseLabel: "Phase 2 · 5회차",
    sessionNum: 5,
    title: "AI로 코드 생성 + 바이브코딩",
    content: [
      "기능 단위로 쪼개서 요청하기",
      "에러 메시지 그대로 붙여넣기 디버깅",
      "Cursor에서 AI 페어 프로그래밍 실습",
      "바이브코딩 철학 심화 — '설계가 코드보다 중요하다'",
    ],
    assignment: "각자 앱의 핵심 화면 1개를 AI로 생성해보기",
  },
  // SLIDE 9: Session 6
  {
    id: 9,
    type: "session",
    phase: "p2",
    phaseLabel: "Phase 2 · 6회차",
    sessionNum: 6,
    title: "멀티에이전트 + 고급 프롬프팅",
    content: [
      "멀티에이전트 구조 실전 — PO / Dev / QA 역할 분리",
      "같은 기능을 세 포지션으로 각각 물어보기 실습",
      "시스템 프롬프트 설계",
      "'내 앱 전용 AI 도우미' 만들어보기",
      "멀티턴 대화로 기능 완성하기",
    ],
    assignment: "기능 1개를 PO/Dev/QA 관점으로 각각 질문 → 결과 비교 슬랙 공유",
  },
  // SLIDE 10: Phase 3 Overview
  {
    id: 10,
    type: "phase-overview",
    phase: "p3",
    phaseNum: 3,
    phaseLabel: "Phase 3 · 7~12회차",
    title: "RN / Expo 앱 개발",
    tagline: '"모바일 앱의 처음부터 끝까지"',
    sessions: [
      { num: 7, title: "Expo 프로젝트 시작" },
      { num: 8, title: "Expo Router + 네비게이션" },
      { num: 9, title: "디자인 시스템 + pencil.dev ⭐" },
      { num: 10, title: "UI + NativeWind" },
      { num: 11, title: "상태 관리 + API 연동" },
      { num: 12, title: "인증 + 푸시 알림" },
    ],
  },
  // SLIDE 11: Session 7
  {
    id: 11,
    type: "session",
    phase: "p3",
    phaseLabel: "Phase 3 · 7회차",
    sessionNum: 7,
    title: "Expo 프로젝트 시작",
    content: [
      "Expo CLI로 프로젝트 생성",
      "폴더 구조 이해 — app/, components/, hooks/ 등",
      "시뮬레이터 · 실기기에서 실행",
      "AI로 첫 화면 컴포넌트 생성",
    ],
    assignment: "Expo 앱 생성 후 실기기에서 실행 스크린샷 슬랙에 공유",
  },
  // SLIDE 12: Session 8
  {
    id: 12,
    type: "session",
    phase: "p3",
    phaseLabel: "Phase 3 · 8회차",
    sessionNum: 8,
    title: "Expo Router + 네비게이션",
    content: [
      "파일 기반 라우팅 개념 — 폴더 = 라우트",
      "탭 네비게이션 구성",
      "스택 네비게이션 구성",
      "딥링크 설정",
      "AI로 네비게이션 구조 생성 실습",
    ],
    assignment: "내 앱 기준 탭 or 스택 네비게이션 구성, 화면 2개 이상 이동 가능하게",
  },
  // SLIDE 13: Session 9
  {
    id: 13,
    type: "session",
    phase: "p3",
    phaseLabel: "Phase 3 · 9회차 ⭐",
    sessionNum: 9,
    title: "디자인 시스템 + pencil.dev",
    content: [
      "디자인 토큰 개념 — 컬러 · 타이포 · 간격",
      "pencil.dev로 컴포넌트 스펙 정의",
      "AI로 컴포넌트 스펙 → pencil.dev → 코드 연결 흐름",
      "NativeWind와 디자인 토큰 연동",
    ],
    note: "pencil.dev = 디자인 시스템 플랫폼. AI가 컴포넌트 스펙을 코드로 바로 연결",
    assignment: "내 앱 컬러/타이포 시스템 정의 → NativeWind 설정에 반영",
  },
  // SLIDE 14: Session 10
  {
    id: 14,
    type: "session",
    phase: "p3",
    phaseLabel: "Phase 3 · 10회차",
    sessionNum: 10,
    title: "UI + NativeWind",
    content: [
      "NativeWind(Tailwind) 세팅 + pencil.dev 토큰 연결",
      "공통 컴포넌트 설계 — Button, Input, Card",
      "AI로 화면 단위 UI 생성",
      "반응형 레이아웃 다루기",
    ],
    assignment: "AI로 화면 1개 UI 완성 (버튼·인풋·리스트 포함) → 스크린샷 공유",
  },
  // SLIDE 15: Session 11
  {
    id: 15,
    type: "session",
    phase: "p3",
    phaseLabel: "Phase 3 · 11회차",
    sessionNum: 11,
    title: "상태 관리 + API 연동",
    content: [
      "Zustand로 전역 상태 관리",
      "Supabase 클라이언트 연결",
      "AI로 데이터 fetching 코드 생성",
      "로딩 · 에러 상태 처리",
    ],
    note: "11회차 후 MVP 점검 — 여기서 돌아가는 게 없으면 동력을 잃음",
    assignment: "Supabase 테이블 1개 연결해서 데이터 불러오기 → 화면에 리스트로 표시",
  },
  // SLIDE 16: Session 12
  {
    id: 16,
    type: "session",
    phase: "p3",
    phaseLabel: "Phase 3 · 12회차",
    sessionNum: 12,
    title: "인증 + 푸시 알림",
    content: [
      "Supabase Auth — 이메일 · 소셜 로그인",
      "Expo Push Notification 세팅",
      "OneSignal 연동 옵션",
      "로그인 플로우 완성",
    ],
    assignment: "이메일 or 소셜 로그인 1개 완성 → 로그인 후 유저 정보 화면에 표시",
  },
  // SLIDE 17: Phase 4 Overview
  {
    id: 17,
    type: "phase-overview",
    phase: "p4",
    phaseNum: 4,
    phaseLabel: "Phase 4 · 13~14회차",
    title: "백엔드 + 데이터",
    tagline: '"데이터가 쌓이고 흐르는 구조 만들기"',
    sessions: [
      { num: 13, title: "Supabase 심화 + Firebase 비교" },
      { num: 14, title: "이메일 + 자동화" },
    ],
  },
  // SLIDE 18: Session 13
  {
    id: 18,
    type: "session",
    phase: "p4",
    phaseLabel: "Phase 4 · 13회차",
    sessionNum: 13,
    title: "Supabase 심화 + Firebase 비교",
    content: [
      "AI로 DB 스키마 설계",
      "RLS(Row Level Security) 보안 정책 설정",
      "Edge Functions 기초",
      "Realtime 구독 실습",
      "Firestore vs Supabase 비교 · 판단 기준",
      "Firebase Storage 이미지 업로드 실습",
    ],
    assignment: "내 앱 DB 스키마 AI로 설계 후 Supabase에 테이블 생성 + RLS 적용",
  },
  // SLIDE 19: Session 14
  {
    id: 19,
    type: "session",
    phase: "p4",
    phaseLabel: "Phase 4 · 14회차",
    sessionNum: 14,
    title: "이메일 + 자동화",
    content: [
      "Resend로 트랜잭션 이메일 발송",
      "n8n 워크플로우 기초",
      "Webhook 연결",
      "AI로 자동화 시나리오 설계",
    ],
    assignment: "n8n으로 '앱 이벤트 발생 → 슬랙 메시지 전송' 자동화 1개",
  },
  // SLIDE 20: Phase 5 Overview
  {
    id: 20,
    type: "phase-overview",
    phase: "p5",
    phaseNum: 5,
    phaseLabel: "Phase 5 · 15~17회차",
    title: "핵심 비즈니스 기능",
    tagline: '"실제 서비스가 되려면 필요한 것들"',
    sessions: [
      { num: 15, title: "결제 연동" },
      { num: 16, title: "분석 + 모니터링" },
      { num: 17, title: "Next.js 웹 연동" },
    ],
  },
  // SLIDE 21: Session 15
  {
    id: 21,
    type: "session",
    phase: "p5",
    phaseLabel: "Phase 5 · 15회차",
    sessionNum: 15,
    title: "결제 연동",
    content: [
      "Stripe 기초 세팅",
      "토스페이먼츠 옵션",
      "구독 vs 단건 결제 구조 설계",
      "AI로 결제 플로우 코드 생성",
    ],
    assignment: "Stripe 테스트 모드로 단건 결제 1회 성공 → 결제 완료 화면까지",
  },
  // SLIDE 22: Session 16
  {
    id: 22,
    type: "session",
    phase: "p5",
    phaseLabel: "Phase 5 · 16회차",
    sessionNum: 16,
    title: "분석 + 모니터링",
    content: [
      "Amplitude 이벤트 설계 원칙",
      "어떤 데이터를 봐야 하는가",
      "Sentry 세팅 + 에러 트래킹",
      "대시보드 읽는 법",
    ],
    assignment: "Amplitude 핵심 이벤트 3개 설계 (이름·속성·발생 시점) → 문서로 정리",
  },
  // SLIDE 23: Session 17
  {
    id: 23,
    type: "session",
    phase: "p5",
    phaseLabel: "Phase 5 · 17회차",
    sessionNum: 17,
    title: "Next.js 웹 연동",
    content: [
      "앱과 웹 병행 구조 이해",
      "Next.js 프로젝트 생성 + Vercel 배포",
      "shadcn/ui 세팅",
      "앱·웹 공통 API 설계",
    ],
    note: "17회차 후 배포 전 기능 완성도 점검",
    assignment: "Next.js로 내 앱 소개 랜딩 페이지 만들고 Vercel 배포 → URL 슬랙에 공유",
  },
  // SLIDE 24: Phase 6 Overview
  {
    id: 24,
    type: "phase-overview",
    phase: "p6",
    phaseNum: 6,
    phaseLabel: "Phase 6 · 18~20회차",
    title: "배포 + 출시",
    tagline: '"세상에 내보내는 단계"',
    sessions: [
      { num: 18, title: "인프라 + CI/CD" },
      { num: 19, title: "앱스토어 출시 준비" },
      { num: 20, title: "최종 발표 + 회고" },
    ],
  },
  // SLIDE 25: Session 18
  {
    id: 25,
    type: "session",
    phase: "p6",
    phaseLabel: "Phase 6 · 18회차",
    sessionNum: 18,
    title: "인프라 + CI/CD",
    content: [
      "GitHub Actions 자동 배포 설정",
      "Cloudflare DNS · 보안 설정",
      "Tailscale로 팀 내부망 구성",
      "EAS Build 설정",
    ],
    assignment: "GitHub Actions로 main 브랜치 푸시 시 Vercel 자동 배포 설정",
  },
  // SLIDE 26: Session 19
  {
    id: 26,
    type: "session",
    phase: "p6",
    phaseLabel: "Phase 6 · 19회차",
    sessionNum: 19,
    title: "앱스토어 출시 준비",
    content: [
      "EAS Build로 앱 빌드",
      "screenshots.pro로 스토어 이미지 생성",
      "App Store · Google Play 등록 절차",
      "openclaw로 개인정보처리방침 · 이용약관 초안",
    ],
    assignment: "screenshots.pro로 앱스토어 등록용 스크린샷 5장 제작",
  },
  // SLIDE 27: Session 20
  {
    id: 27,
    type: "session",
    phase: "p6",
    phaseLabel: "Phase 6 · 20회차",
    sessionNum: 20,
    title: "최종 발표 + 회고 🎉",
    content: [
      "완성 앱 데모 발표 (각 3분)",
      "Plane.so 로드맵 정리",
      "배운 것 · 아쉬운 것 공유",
      "시즌 2 방향 논의",
    ],
    assignment: "완성된 앱 3분 데모 영상 촬영 (기능 시연 + 배운 점 1가지) → 슬랙 or 유튜브 업로드",
  },
  // SLIDE 28: Ops
  {
    id: 28,
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
              "막힌 사람 구제: 회차 초반 10분 공유",
            ],
          },
          {
            title: "📊 중간 점검",
            items: [
              "11회차 후 MVP 점검",
              "17회차 후 배포 전 완성도 점검",
            ],
          },
          {
            title: "💡 참여 팁",
            items: ["코드 이해 → 읽고 질문", "에러 = 기회", "세팅 문서 미리 준비", "완료 기준 낮추기"],
          },
          {
            title: "🚀 결과물 공유",
            items: [
              "매 회차 과제 슬랙에 공유",
              "막히면 바로 질문 — 혼자 2시간 이상 X",
              "결과물 공유로 동력 유지",
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

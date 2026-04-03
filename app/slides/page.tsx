"use client";

import { useState, useEffect, useCallback } from "react";

const PHASE_COLORS: Record<string, string> = {
  p1: "#4ADE80",
  p2: "#60A5FA",
  p3: "#F472B6",
  p4: "#FBBF24",
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
  detailUrl?: string;
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
    title: "이론 기초",
    tagline: '"왜 이렇게 만드는지 이해하는 단계"',
    sessions: [
      { num: 1, title: "오리엔테이션 — 앱 서비스 큰 그림" },
      { num: 2, title: "개발 용어 + 프롬프팅 기초" },
      { num: 3, title: "바이브코딩 철학 + 멀티에이전트 구조" },
    ],
  },
  // SLIDE 3: Session 1
  {
    id: 3,
    type: "session",
    phase: "p1",
    phaseLabel: "Phase 1 · 1회차",
    sessionNum: 1,
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
    detailUrl: "/session1",
  },
  // SLIDE 4: Session 2
  {
    id: 4,
    type: "session",
    phase: "p1",
    phaseLabel: "Phase 1 · 2회차",
    sessionNum: 2,
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
  // SLIDE 5: Session 3
  {
    id: 5,
    type: "session",
    phase: "p1",
    phaseLabel: "Phase 1 · 3회차",
    sessionNum: 3,
    title: "바이브코딩 철학 + 멀티에이전트 구조",
    content: [
      "바이브코딩 철학 — 설계가 코드보다 중요하다",
      "멀티에이전트 구조 개념 (PO / Dev / QA 역할 분리)",
      "하네스 엔지니어링 개요",
      "같은 기능을 세 포지션으로 각각 질문해보기 실습",
      "시스템 프롬프트 설계 기초",
    ],
    assignment: "기능 1개를 PO / Dev / QA 관점으로 각각 질문 → 결과 비교 공유",
  },
  // SLIDE 6: Phase 2 Overview
  {
    id: 6,
    type: "phase-overview",
    phase: "p2",
    phaseNum: 2,
    phaseLabel: "Phase 2 · 4~6회차",
    title: "시스템 구축",
    tagline: '"나만의 AI 개발 환경을 만드는 단계"',
    sessions: [
      { num: 4, title: "개발 환경 세팅 — Cursor · GitHub · Vercel" },
      { num: 5, title: "내 앱 기획 — PRD + CLAUDE.md 작성" },
      { num: 6, title: "워크플로우 완성 — 티켓 관리 + 개발 루프" },
    ],
  },
  // SLIDE 7: Session 4
  {
    id: 7,
    type: "session",
    phase: "p2",
    phaseLabel: "Phase 2 · 4회차",
    sessionNum: 4,
    title: "개발 환경 세팅 — Cursor · GitHub · Vercel",
    content: [
      "Cursor 설치 및 AI 코딩 환경 세팅",
      "GitHub 레포 생성 · 첫 커밋 · 브랜치 전략",
      "Vercel 프로젝트 연결 + 자동 배포 파이프라인",
      "환경 변수 관리 (.env 개념)",
      "Preview 배포 체험 — PR 하나로 URL 생성",
    ],
    assignment: "GitHub 레포 생성 + Vercel 자동 배포 연결 성공",
  },
  // SLIDE 8: Session 5
  {
    id: 8,
    type: "session",
    phase: "p2",
    phaseLabel: "Phase 2 · 5회차",
    sessionNum: 5,
    title: "내 앱 기획 — PRD + CLAUDE.md 작성",
    content: [
      "PRD 작성 실습 (Claude로 초안 생성)",
      "화면 목록 · 유저 플로우 설계",
      "CLAUDE.md (시스템 프롬프트) 작성법 — 내 앱 전용 AI 컨텍스트",
      "AI로 PRD → 유저스토리 → 이슈 분해",
      "바이브코딩으로 PRD 고도화 실습",
    ],
    assignment: "PRD 초안 완성 + 내 앱 전용 CLAUDE.md 초안 작성",
  },
  // SLIDE 9: Session 6 (Milestone)
  {
    id: 9,
    type: "session",
    phase: "p2",
    phaseLabel: "Phase 2 · 6회차",
    sessionNum: 6,
    title: "워크플로우 완성 — 티켓 관리 + 개발 루프",
    content: [
      "Plane.so 프로젝트 개설 + PRD 기반 이슈 등록",
      "이슈 → 개발 → PR → 머지 루프 체험",
      "CI/CD 개념 이해",
      "CLAUDE.md / .cursorrules 고도화",
      "컨텍스트 윈도우 관리 전략 · 에러 디버깅 패턴",
    ],
    note: "🎯 마일스톤 — 이 시점부터 모임 포맷이 코워킹으로 전환됩니다",
    assignment: "Plane.so에 기능 이슈 5개 이상 등록 + 티켓 하나 직접 머지까지",
  },
  // SLIDE 10: Phase 3 Overview
  {
    id: 10,
    type: "phase-overview",
    phase: "p3",
    phaseNum: 3,
    phaseLabel: "Phase 3 · 7~10회차",
    title: "앱 개발",
    tagline: '"직접 만들며 감을 잡는 단계"',
    sessions: [
      { num: 7, title: "프로젝트 생성 — Expo + 클린 아키텍처" },
      { num: 8, title: "디자인 시스템 1 — 토큰 설계" },
      { num: 9, title: "디자인 시스템 2 — 공통 컴포넌트" },
      { num: 10, title: "핵심 화면 개발 — 디자인 시스템 적용 검증" },
    ],
  },
  // SLIDE 11: Session 7
  {
    id: 11,
    type: "session",
    phase: "p3",
    phaseLabel: "Phase 3 · 7회차",
    sessionNum: 7,
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
  // SLIDE 12: Session 8
  {
    id: 12,
    type: "session",
    phase: "p3",
    phaseLabel: "Phase 3 · 8회차",
    sessionNum: 8,
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
  // SLIDE 13: Session 9
  {
    id: 13,
    type: "session",
    phase: "p3",
    phaseLabel: "Phase 3 · 9회차",
    sessionNum: 9,
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
  // SLIDE 14: Session 10 (Milestone)
  {
    id: 14,
    type: "session",
    phase: "p3",
    phaseLabel: "Phase 3 · 10회차",
    sessionNum: 10,
    title: "핵심 화면 개발 — 디자인 시스템 적용 검증",
    content: [
      "핵심 화면 2개 이상 완성 (디자인 시스템 100% 적용)",
      "탭 / 스택 네비게이션 설정",
      "Plane.so 티켓 기반 개발 루틴 정착",
      "AI에게 넘길 수 있는 작업 vs 직접 해야 하는 작업 구분",
      "이후 자율 개발을 위한 패턴 정리",
    ],
    note: "🎯 마일스톤 — AI로 혼자 개발할 수 있는 기반 완성",
    assignment: "핵심 화면 2개 이상 완성 후 Plane.so 티켓 Done 처리",
  },
  // SLIDE 15: Phase 4 Overview
  {
    id: 15,
    type: "phase-overview",
    phase: "p4",
    phaseNum: 4,
    phaseLabel: "Phase 4 · 11~12회차",
    title: "코워킹",
    tagline: '"각자 앱을 AI로 만들어가는 단계"',
    sessions: [
      { num: 11, title: "코워킹 1 — 개인 개발 + Q&A" },
      { num: 12, title: "코워킹 2 — 개인 개발 + 미니 데모" },
    ],
  },
  // SLIDE 16: Session 11
  {
    id: 16,
    type: "session",
    phase: "p4",
    phaseLabel: "Phase 4 · 11회차",
    sessionNum: 11,
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
  // SLIDE 17: Session 12
  {
    id: 17,
    type: "session",
    phase: "p4",
    phaseLabel: "Phase 4 · 12회차",
    sessionNum: 12,
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
  // SLIDE 18: Ops
  {
    id: 18,
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
        {["📅 주 1회 × 12회차", "⏱ 약 3개월", "🕐 회당 2시간"].map((t) => (
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

        {/* Detail link */}
        {slide.detailUrl && (
          <a
            href={slide.detailUrl}
            className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all hover:opacity-80"
            style={{ background: `${color}18`, color, border: `1px solid ${color}40` }}
          >
            🔍 상세 장표 보기 →
          </a>
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
      <p className="text-sm -mt-3" style={{ color: "#A0A0B0" }}>모임 운영 방식 & 참여 팁</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          {
            title: "⚙️ 운영 방식",
            items: [
              "1~6회차: 개념 + 실습 위주 (2시간)",
              "7~10회차: 과제 점검 + 강의 + 실습",
              "11~12회차: 과제 점검 20분 + 개인 개발 1.5시간 + Q&A",
            ],
          },
          {
            title: "📅 일정",
            items: [
              "주 1회 · 회당 2시간",
              "총 12회차 · 약 3개월",
              "🎯 6회차 / 10회차 — 마일스톤",
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

        {/* Dot navigation */}
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

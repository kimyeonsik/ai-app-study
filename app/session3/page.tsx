"use client";

import { useState, useEffect, useCallback } from "react";

const slides = [
  { id: 0, type: "cover" as const },
  { id: 1, type: "vibe-philosophy" as const },
  { id: 2, type: "multi-agent" as const },
  { id: 3, type: "harness" as const },
  { id: 4, type: "practice" as const },
  { id: 5, type: "homework" as const },
];

const TOTAL = slides.length;

const C = {
  bg: "#0a0a0f",
  surface: "#12121a",
  card: "#1a1a26",
  accent: "#f5e642",
  accent2: "#42f5a7",
  accent3: "#f542a7",
  text: "#eeeef5",
  muted: "#6b6b8a",
  border: "#2a2a3f",
};

function CoverSlide() {
  return (
    <div className="relative flex flex-col items-center justify-center text-center gap-0 overflow-hidden h-full">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          opacity: 0.35,
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{ width: 500, height: 500, background: "rgba(66,245,167,.12)", filter: "blur(120px)", top: -100, right: -100 }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{ width: 500, height: 500, background: "rgba(245,66,167,.08)", filter: "blur(120px)", bottom: -150, left: -100 }}
      />
      <span
        className="relative z-10 text-xs tracking-widest uppercase px-5 py-1.5 rounded-full mb-8"
        style={{ fontFamily: "'Space Mono', monospace", color: C.accent2, border: `1px solid ${C.accent2}`, fontSize: 13 }}
      >
        Session 3
      </span>
      <h1
        className="relative z-10 font-black leading-tight mb-6"
        style={{ fontSize: "clamp(32px, 5vw, 56px)", color: C.text }}
      >
        바이브코딩 철학
        <br />
        <span style={{ color: C.accent2 }}>+ 멀티에이전트</span>
      </h1>
      <p className="relative z-10 text-base font-light" style={{ color: C.muted }}>
        AI로 앱 만들기 모임 &nbsp;·&nbsp; 3회차
      </p>
    </div>
  );
}

function VibePhilosophySlide() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full" style={{ padding: "48px 64px" }}>
      <p className="text-xs tracking-widest uppercase mb-7" style={{ fontFamily: "'Space Mono', monospace", color: C.muted, letterSpacing: ".2em" }}>Session 03 · 바이브코딩 철학</p>
      <div style={{ fontSize: "clamp(20px, 3.5vw, 36px)", fontWeight: 900, lineHeight: 1.4, maxWidth: 700, color: C.text }}>
        <span style={{ color: C.accent }}>&ldquo;설계가 코드보다 중요하다.&rdquo;</span>
        <br />
        AI는 지시를 실행하는 기계 — 좋은 설계서가 있어야 좋은 코드가 나온다.
        <span className="block text-sm font-light mt-5" style={{ color: C.muted }}>
          코드 생성보다 먼저 &apos;무엇을 만들지&apos; 명확하게 정의하는 게 핵심
        </span>
      </div>
    </div>
  );
}

function MultiAgentSlide() {
  const roles = [
    {
      badge: "PO", badgeBg: "rgba(245,230,66,.12)", badgeColor: C.accent,
      title: "Product Owner",
      items: ["왜 이 기능이 필요한가", "사용자가 어떤 흐름으로 쓰는가", "성공 기준(KPI)은 무엇인가", "예외 케이스, 엣지 케이스 정의"],
    },
    {
      badge: "DEV", badgeBg: "rgba(66,245,167,.12)", badgeColor: C.accent2,
      title: "Developer",
      items: ["어떤 기술로 구현할 것인가", "데이터 구조 · API 설계", "성능 · 보안 고려사항", "테스트 전략"],
    },
    {
      badge: "QA", badgeBg: "rgba(245,66,167,.12)", badgeColor: C.accent3,
      title: "QA",
      items: ["어떤 케이스에서 깨질 수 있는가", "테스트 시나리오 목록", "비정상 입력 처리", "사용자 경험상 문제점"],
    },
  ];
  return (
    <div className="flex flex-col items-start w-full h-full justify-start" style={{ padding: "56px 64px 48px" }}>
      <p className="text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'Space Mono', monospace", color: C.muted, letterSpacing: ".2em" }}>Session 03 · 멀티에이전트 구조</p>
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-8" style={{ color: C.text }}>
        하나의 기능을 <span style={{ color: C.accent }}>세 포지션</span>으로 바라보기
      </h2>
      <div className="grid grid-cols-3 gap-3 w-full">
        {roles.map((r, i) => (
          <div key={i} className="rounded-xl p-5" style={{ background: C.card, border: `1px solid ${C.border}` }}>
            <span className="inline-block text-xs font-bold tracking-wider px-2.5 py-1 rounded-full mb-3.5" style={{ fontFamily: "'Space Mono', monospace", background: r.badgeBg, color: r.badgeColor, letterSpacing: ".15em" }}>
              {r.badge}
            </span>
            <h3 className="text-base font-bold mb-2.5" style={{ color: C.text }}>{r.title}</h3>
            <ul className="flex flex-col gap-1.5">
              {r.items.map((item, j) => (
                <li key={j} className="text-xs leading-snug pl-3.5 relative" style={{ color: C.muted }}>
                  <span className="absolute left-0" style={{ color: C.border }}>—</span>
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

function HarnessSlide() {
  const items = [
    { num: "개념", title: "하네스(Harness) = AI를 안전하게 제어하는 구조물", desc: "AI 에이전트가 예측 가능하게 동작하도록 역할 · 제약 · 출력 형식을 미리 정의해두는 것" },
    { num: "구성", title: "시스템 프롬프트 3요소", desc: '① 역할 정의 — "너는 ~야"  |  ② 제약 조건 — "절대 ~하지 마"  |  ③ 출력 규칙 — "반드시 JSON으로"' },
    { num: "실전", title: "내 앱 전용 AI 지시문 초안 만들기", desc: "오늘 실습 — 내가 만드는 앱의 AI 어시스턴트 시스템 프롬프트 한 장 작성" },
  ];
  return (
    <div className="flex flex-col items-start w-full h-full justify-start" style={{ padding: "56px 64px 48px" }}>
      <p className="text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'Space Mono', monospace", color: C.muted, letterSpacing: ".2em" }}>Session 03 · 하네스 엔지니어링</p>
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-8" style={{ color: C.text }}>
        <span style={{ color: C.accent }}>AI 지시문 설계</span> — 하네스 엔지니어링
      </h2>
      <div className="flex flex-col gap-3 w-full">
        {items.map((s, i) => (
          <div key={i} className="flex items-start gap-3.5 rounded-xl px-5 py-4" style={{ background: C.card, border: `1px solid ${C.border}` }}>
            <span className="text-xs pt-0.5 min-w-7" style={{ fontFamily: "'Space Mono', monospace", color: C.accent }}>{s.num}</span>
            <div>
              <strong className="text-sm font-bold block mb-1" style={{ color: C.text }}>{s.title}</strong>
              <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PracticeSlide() {
  const steps = [
    { num: "01", title: "기능 선택", desc: "내 앱에서 핵심 기능 하나 고르기 (예: 리뷰 작성, 친구 초대, 구독 결제)" },
    { num: "PO", title: '"PO 관점으로 질문"', desc: '"이 기능의 사용자 스토리와 엣지 케이스를 정리해줘"' },
    { num: "DEV", title: '"DEV 관점으로 질문"', desc: '"이 기능 구현에 필요한 DB 스키마와 API 엔드포인트를 설계해줘"' },
    { num: "QA", title: '"QA 관점으로 질문"', desc: '"이 기능에서 발생할 수 있는 버그 시나리오 10가지를 뽑아줘"' },
  ];
  return (
    <div className="flex flex-col items-start w-full h-full justify-start" style={{ padding: "56px 64px 48px" }}>
      <p className="text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'Space Mono', monospace", color: C.muted, letterSpacing: ".2em" }}>Session 03 · 실습</p>
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-8" style={{ color: C.text }}>
        🖐 기능 하나를 <span style={{ color: C.accent }}>세 관점</span>으로 질문해보기
      </h2>
      <div className="flex flex-col gap-3 w-full">
        {steps.map((s, i) => (
          <div key={i} className="flex items-start gap-3.5 rounded-xl px-5 py-4" style={{ background: C.card, border: `1px solid ${C.border}` }}>
            <span className="text-xs pt-0.5 min-w-7" style={{ fontFamily: "'Space Mono', monospace", color: C.accent2 }}>{s.num}</span>
            <div>
              <strong className="text-sm font-bold block mb-1" style={{ color: C.text }}>{s.title}</strong>
              <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HomeworkSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full" style={{ padding: "48px 64px" }}>
      <p className="text-xs tracking-widest uppercase mb-5" style={{ fontFamily: "'Space Mono', monospace", color: C.muted, letterSpacing: ".2em" }}>과제</p>
      <div className="flex flex-col gap-4 w-full" style={{ maxWidth: 680 }}>
        <div className="rounded-2xl px-7 py-6" style={{ background: "linear-gradient(135deg, rgba(66,245,167,.08), rgba(66,245,167,.04))", border: "1px solid rgba(66,245,167,.3)" }}>
          <div className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "'Space Mono', monospace", color: C.accent2, letterSpacing: ".2em" }}>3회차 과제</div>
          <div className="text-xl font-bold mb-2" style={{ color: C.text }}>기능 1개를 PO / Dev / QA 관점으로 각각 질문 → 결과 비교 공유</div>
          <div className="text-sm leading-relaxed" style={{ color: C.muted }}>세 관점에서 나온 답변 중 가장 유용했던 것과 그 이유를 슬랙에 공유</div>
        </div>
      </div>
    </div>
  );
}

function renderSlide(type: string) {
  switch (type) {
    case "cover": return <CoverSlide />;
    case "vibe-philosophy": return <VibePhilosophySlide />;
    case "multi-agent": return <MultiAgentSlide />;
    case "harness": return <HarnessSlide />;
    case "practice": return <PracticeSlide />;
    case "homework": return <HomeworkSlide />;
    default: return null;
  }
}

export default function Session3Page() {
  const [cur, setCur] = useState(0);

  const go = useCallback(
    (dir: number) => setCur((prev) => Math.max(0, Math.min(TOTAL - 1, prev + dir))),
    []
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") go(1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") go(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go]);

  return (
    <div className="flex flex-col h-screen" style={{ background: C.bg, color: C.text, fontFamily: "'Noto Sans KR', sans-serif" }}>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&family=Space+Mono:wght@400;700&display=swap"
        rel="stylesheet"
      />
      {/* Back button */}
      <div className="fixed top-4 left-4 z-50">
        <a
          href="/slides"
          className="text-xs px-3 py-1.5 rounded-lg transition-all"
          style={{ background: C.surface, color: C.muted, border: `1px solid ${C.border}` }}
        >
          ← 커리큘럼으로
        </a>
      </div>
      {/* Slide number */}
      <div className="fixed top-4 right-4 text-xs z-50" style={{ fontFamily: "'Space Mono', monospace", color: C.muted }}>
        {cur + 1} / {TOTAL}
      </div>
      <div className="flex-1 relative overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className="absolute inset-0 flex flex-col justify-center items-center transition-all duration-400"
            style={{
              opacity: i === cur ? 1 : 0,
              transform: i === cur ? "translateY(0)" : "translateY(24px)",
              pointerEvents: i === cur ? "all" : "none",
            }}
          >
            {renderSlide(slide.type)}
          </div>
        ))}
      </div>
      <nav
        className="flex items-center gap-4 px-8 py-3.5"
        style={{ background: C.surface, borderTop: `1px solid ${C.border}` }}
      >
        <span className="text-xs tracking-wider uppercase" style={{ fontFamily: "'Space Mono', monospace", color: C.muted }}>
          AI 앱 만들기 &nbsp;·&nbsp; 3회차
        </span>
        <div className="flex-1 h-[3px] rounded-sm overflow-hidden" style={{ background: C.border }}>
          <div
            className="h-full rounded-sm transition-all duration-400"
            style={{ background: C.accent2, width: `${((cur + 1) / TOTAL) * 100}%` }}
          />
        </div>
        <span className="text-xs min-w-[60px] text-right" style={{ fontFamily: "'Space Mono', monospace", color: C.muted }}>
          {cur + 1} / {TOTAL}
        </span>
        <button
          onClick={() => go(-1)}
          disabled={cur === 0}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-base transition-all disabled:opacity-30"
          style={{ background: C.card, border: `1px solid ${C.border}`, color: C.text }}
        >
          ‹
        </button>
        <button
          onClick={() => go(1)}
          disabled={cur === TOTAL - 1}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-base transition-all disabled:opacity-30"
          style={{ background: C.card, border: `1px solid ${C.border}`, color: C.text }}
        >
          ›
        </button>
      </nav>
    </div>
  );
}

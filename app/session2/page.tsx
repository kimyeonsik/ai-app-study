"use client";

import { useState, useEffect, useCallback } from "react";

const slides = [
  { id: 0, type: "cover" as const },
  { id: 1, type: "timetable" as const },
  { id: 2, type: "dev-terms" as const },
  { id: 3, type: "prompt-patterns" as const },
  { id: 4, type: "prompt-compare" as const },
  { id: 5, type: "practice" as const },
  { id: 6, type: "homework" as const },
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
        style={{ width: 500, height: 500, background: "rgba(245,230,66,.12)", filter: "blur(120px)", top: -100, right: -100 }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{ width: 500, height: 500, background: "rgba(66,245,167,.08)", filter: "blur(120px)", bottom: -150, left: -100 }}
      />
      <span
        className="relative z-10 text-xs tracking-widest uppercase px-5 py-1.5 rounded-full mb-8"
        style={{ fontFamily: "'Space Mono', monospace", color: C.accent, border: `1px solid ${C.accent}`, fontSize: 13 }}
      >
        Session 2
      </span>
      <h1
        className="relative z-10 font-black leading-tight mb-6"
        style={{ fontSize: "clamp(32px, 5vw, 56px)", color: C.text }}
      >
        개발 용어
        <br />
        <span style={{ color: C.accent }}>· 프롬프팅 기초</span>
      </h1>
      <p className="relative z-10 text-base font-light" style={{ color: C.muted }}>
        AI로 앱 만들기 모임 &nbsp;·&nbsp; 2회차
      </p>
    </div>
  );
}

function TimetableSlide() {
  const rows = [
    { t: "+0:00", label: "도입 — 지난 과제 공유 & 오늘 흐름 안내", dur: "10 min", highlight: false, brk: false },
    { t: "+0:10", label: "개발 용어 정리 — 클라이언트·API·서버·DB·인프라", dur: "20 min", highlight: true, brk: false },
    { t: "+0:30", label: "프롬프팅 3대 패턴 — 역할·맥락·출력 형식", dur: "25 min", highlight: true, brk: false },
    { t: "+0:55", label: "☕ 짧은 휴식", dur: "5 min", highlight: false, brk: true },
    { t: "+1:00", label: "나쁜 vs 좋은 프롬프트 비교 실습", dur: "30 min", highlight: true, brk: false },
    { t: "+1:30", label: "마무리 — 과제 안내 + Q&A", dur: "30 min", highlight: false, brk: false },
  ];
  return (
    <div className="flex flex-col items-start w-full h-full justify-center" style={{ padding: "48px 64px" }}>
      <h2 className="text-2xl font-bold mb-8" style={{ color: C.text }}>⏱ 오늘의 시간표</h2>
      <div className="flex flex-col gap-2.5 w-full">
        {rows.map((r, i) => (
          <div
            key={i}
            className="grid items-center gap-4 rounded-xl px-5 py-3.5"
            style={{
              gridTemplateColumns: "80px 1fr auto",
              background: C.card,
              border: `1px solid ${r.highlight ? C.accent : C.border}`,
              opacity: r.brk ? 0.5 : 1,
            }}
          >
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: C.accent }}>{r.t}</span>
            <span className="text-sm font-medium" style={{ color: C.text }}>{r.label}</span>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: C.muted, whiteSpace: "nowrap" }}>{r.dur}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DevTermsSlide() {
  const boxes = [
    { icon: "📱", name: "클라이언트", sub: "앱 · 웹 브라우저\n사용자가 보는 화면" },
    { icon: "⚙️", name: "API", sub: "클라이언트 ↔ 서버\n데이터 주고받는 창구" },
    { icon: "🖥", name: "서버 / 백엔드", sub: "비즈니스 로직\n데이터 처리" },
    { icon: "🗄", name: "DB", sub: "데이터 저장소\nSupabase · Firebase" },
    { icon: "☁️", name: "인프라 / 배포", sub: "Vercel · Cloudflare\n서비스를 세상에 공개" },
  ];
  return (
    <div className="flex flex-col items-start w-full h-full justify-start" style={{ padding: "56px 64px 48px" }}>
      <p className="text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'Space Mono', monospace", color: C.muted, letterSpacing: ".2em" }}>Session 02 · 개발 용어</p>
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-8" style={{ color: C.text }}>
        꼭 알아야 할 <span style={{ color: C.accent }}>개발 용어</span>
      </h2>
      <div className="flex items-center gap-0 w-full">
        {boxes.map((b, i) => (
          <div key={i} className="contents">
            <div className="flex-1 text-center rounded-xl py-3.5 px-2.5" style={{ background: C.card, border: `1px solid ${C.border}` }}>
              <div className="text-xl mb-1.5">{b.icon}</div>
              <div className="text-sm font-bold" style={{ color: C.text }}>{b.name}</div>
              <div className="text-xs mt-1 leading-snug whitespace-pre-line" style={{ color: C.muted }}>{b.sub}</div>
            </div>
            {i < boxes.length - 1 && <span className="text-lg px-1.5 shrink-0" style={{ color: C.accent }}>→</span>}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 w-full mt-4">
        {[
          { title: "프론트엔드 vs 백엔드", desc: "화면(프론트) / 데이터 처리(백) — AI에게 요청할 때 어느 쪽 코드인지 명시하면 훨씬 정확한 답 나옴" },
          { title: "배포(Deploy)란?", desc: "내 컴퓨터에서만 돌아가던 앱을 인터넷에 올려서 누구나 접근할 수 있게 만드는 것" },
        ].map((tip, i) => (
          <div key={i} className="flex items-start gap-3.5 rounded-xl px-5 py-4" style={{ background: C.card, border: `1px solid ${C.border}` }}>
            <span className="text-xs pt-0.5 min-w-7" style={{ fontFamily: "'Space Mono', monospace", color: C.accent }}>TIP</span>
            <div>
              <strong className="text-sm font-bold block mb-1" style={{ color: C.text }}>{tip.title}</strong>
              <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{tip.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PromptPatternsSlide() {
  const patterns = [
    { icon: "🎭", title: "역할 부여", desc: "AI에게 어떤 전문가처럼 답하라고 설정", code: '"너는 React Native 시니어 개발자야. 다음 코드를 리뷰해줘."' },
    { icon: "📋", title: "맥락 제공", desc: "배경 정보를 충분히 줄수록 핀포인트 답 나옴", code: '"Supabase + Expo 앱이야. 로그인 후 유저 테이블에서 프로필 조회하는 코드 짜줘."' },
    { icon: "📐", title: "출력 형식 지정", desc: "원하는 결과물 형태를 명시", code: '"TypeScript로, 주석 포함해서, 함수 하나로만 작성해줘."' },
  ];
  return (
    <div className="flex flex-col items-start w-full h-full justify-start" style={{ padding: "56px 64px 48px" }}>
      <p className="text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'Space Mono', monospace", color: C.muted, letterSpacing: ".2em" }}>Session 02 · 프롬프팅 기초</p>
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-8" style={{ color: C.accent }}>프롬프팅 3대 패턴</h2>
      <div className="grid grid-cols-3 gap-3 w-full">
        {patterns.map((p, i) => (
          <div key={i} className="rounded-xl p-5" style={{ background: C.card, border: `1px solid ${C.border}` }}>
            <div className="text-2xl mb-3">{p.icon}</div>
            <h3 className="text-sm font-bold mb-2" style={{ color: C.text }}>{p.title}</h3>
            <p className="text-xs leading-relaxed mb-3" style={{ color: C.muted }}>{p.desc}</p>
            <code className="block text-xs rounded-lg px-3 py-2 leading-relaxed whitespace-pre-wrap" style={{ fontFamily: "'Space Mono', monospace", background: C.bg, color: C.accent2 }}>
              {p.code}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
}

function PromptCompareSlide() {
  return (
    <div className="flex flex-col items-start w-full h-full justify-start" style={{ padding: "56px 64px 48px" }}>
      <p className="text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'Space Mono', monospace", color: C.muted, letterSpacing: ".2em" }}>Session 02 · 프롬프트 비교</p>
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-8" style={{ color: C.text }}>
        <span style={{ color: C.accent3 }}>나쁜 프롬프트</span> vs <span style={{ color: C.accent2 }}>좋은 프롬프트</span>
      </h2>
      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="rounded-xl p-5" style={{ background: C.card, border: `1px solid ${C.accent3}` }}>
          <div className="text-xs tracking-wider mb-3.5" style={{ fontFamily: "'Space Mono', monospace", color: C.accent3, letterSpacing: ".15em" }}>❌ 나쁜 예시</div>
          <div className="rounded-lg p-3.5 text-sm leading-relaxed mb-3" style={{ fontFamily: "'Space Mono', monospace", background: C.bg, color: C.text }}>
            로그인 만들어줘
          </div>
          <p className="text-xs leading-relaxed" style={{ color: C.muted }}>어떤 플랫폼인지, 어떤 방식인지, 어떤 언어인지 아무 정보 없음 → AI가 일반적인 예제를 뱉음</p>
        </div>
        <div className="rounded-xl p-5" style={{ background: C.card, border: `1px solid ${C.accent2}` }}>
          <div className="text-xs tracking-wider mb-3.5" style={{ fontFamily: "'Space Mono', monospace", color: C.accent2, letterSpacing: ".15em" }}>✅ 좋은 예시</div>
          <div className="rounded-lg p-3.5 text-sm leading-relaxed mb-3" style={{ fontFamily: "'Space Mono', monospace", background: C.bg, color: C.text }}>
            Expo + Supabase 앱이야.<br />이메일/비밀번호 로그인 화면을 만들어줘.<br />NativeWind로 스타일링하고,<br />에러 메시지는 토스트로 보여줘.<br />TypeScript로 작성해줘.
          </div>
          <p className="text-xs leading-relaxed" style={{ color: C.muted }}>플랫폼 · 기술 스택 · UI 방식 · 언어 모두 명시 → 바로 쓸 수 있는 코드 나옴</p>
        </div>
      </div>
    </div>
  );
}

function PracticeSlide() {
  const steps = [
    { num: "01", title: "내 앱의 기능 하나를 골라라", desc: "예: 게시글 작성 / 친구 추가 / 알림 설정 / 결제" },
    { num: "02", title: "나쁜 프롬프트로 먼저 질문해보기", desc: "짧고 맥락 없는 질문 → 결과 확인" },
    { num: "03", title: "3대 패턴 적용해서 다시 질문", desc: "역할 + 맥락 + 출력 형식 모두 포함 → 결과 비교" },
    { num: "04", title: "결과 공유", desc: "어떤 점이 달랐는지 2–3줄로 슬랙에 공유" },
  ];
  return (
    <div className="flex flex-col items-start w-full h-full justify-start" style={{ padding: "56px 64px 48px" }}>
      <p className="text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'Space Mono', monospace", color: C.muted, letterSpacing: ".2em" }}>Session 02 · 실습</p>
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-8" style={{ color: C.text }}>🖐 직접 해보기</h2>
      <div className="flex flex-col gap-3 w-full">
        {steps.map((s, i) => (
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

function HomeworkSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full" style={{ padding: "48px 64px" }}>
      <p className="text-xs tracking-widest uppercase mb-5" style={{ fontFamily: "'Space Mono', monospace", color: C.muted, letterSpacing: ".2em" }}>과제</p>
      <div className="flex flex-col gap-4 w-full" style={{ maxWidth: 680 }}>
        <div className="rounded-2xl px-7 py-6" style={{ background: "linear-gradient(135deg, rgba(245,230,66,.08), rgba(66,245,167,.06))", border: "1px solid rgba(245,230,66,.3)" }}>
          <div className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "'Space Mono', monospace", color: C.accent, letterSpacing: ".2em" }}>2회차 과제</div>
          <div className="text-xl font-bold mb-2" style={{ color: C.text }}>AI에게 내 앱 기능 하나를 3대 패턴으로 질문해보기</div>
          <div className="text-sm leading-relaxed" style={{ color: C.muted }}>역할 + 맥락 + 출력 형식 적용 전/후 결과를 비교해서 슬랙에 공유</div>
        </div>
      </div>
    </div>
  );
}

function renderSlide(type: string) {
  switch (type) {
    case "cover": return <CoverSlide />;
    case "timetable": return <TimetableSlide />;
    case "dev-terms": return <DevTermsSlide />;
    case "prompt-patterns": return <PromptPatternsSlide />;
    case "prompt-compare": return <PromptCompareSlide />;
    case "practice": return <PracticeSlide />;
    case "homework": return <HomeworkSlide />;
    default: return null;
  }
}

export default function Session2Page() {
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
          AI 앱 만들기 &nbsp;·&nbsp; 2회차
        </span>
        <div className="flex-1 h-[3px] rounded-sm overflow-hidden" style={{ background: C.border }}>
          <div
            className="h-full rounded-sm transition-all duration-400"
            style={{ background: C.accent, width: `${((cur + 1) / TOTAL) * 100}%` }}
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

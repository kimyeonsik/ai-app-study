"use client";

import { useState, useEffect, useCallback } from "react";

const slides = [
  { id: 1, type: "cover" as const },
  { id: 2, type: "timetable" as const },
  { id: 3, type: "dev-terms" as const },
  { id: 4, type: "prompt-patterns" as const },
  { id: 5, type: "prompt-compare" as const },
  { id: 6, type: "practice" as const },
  { id: 7, type: "homework" as const },
];

const TOTAL = slides.length;

function CoverSlide() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-8">
      <span
        className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
        style={{ color: "#FBBF24", border: "1px solid #FBBF24", background: "#FBBF2415" }}
      >
        2회차
      </span>
      <h1
        className="text-4xl sm:text-5xl font-extrabold leading-tight"
        style={{
          background: "linear-gradient(135deg, #FBBF24, #4ADE80)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        개발 용어<br />· 프롬프팅 기초
      </h1>
      <p className="text-lg max-w-xl" style={{ color: "#A0A0B0" }}>
        앱이 어떻게 동작하는지 이해하고, AI에게 정확히 말하는 법 배우기
      </p>
      <div className="flex flex-wrap gap-3 justify-center mt-2">
        {[
          "오늘의 시간표",
          "꼭 알아야 할 개발 용어",
          "프롬프팅 3대 패턴",
          "나쁜 vs 좋은 프롬프트",
        ].map((t, i) => (
          <span
            key={i}
            className="px-4 py-2 rounded-full text-sm font-medium"
            style={{ background: "#1E1E28", border: "1px solid #2E2E38", color: "#C8C8D8" }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function TimetableSlide() {
  const rows = [
    { time: "+0:00", label: "도입 — 지난 과제 공유 & 오늘 흐름 안내", dur: "10 min", highlight: false },
    { time: "+0:10", label: "개발 용어 정리 — 클라이언트·API·서버·DB·인프라", dur: "20 min", highlight: true },
    { time: "+0:30", label: "프롬프팅 3대 패턴 — 역할·맥락·출력 형식", dur: "25 min", highlight: true },
    { time: "+0:55", label: "☕ 짧은 휴식", dur: "5 min", highlight: false },
    { time: "+1:00", label: "나쁜 vs 좋은 프롬프트 비교 실습", dur: "30 min", highlight: true },
    { time: "+1:30", label: "마무리 — 과제 안내 + Q&A", dur: "30 min", highlight: false },
  ];

  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#4ADE80" }}>01</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#F0F0F5" }}>
          오늘의 시간표
        </h2>
        <p className="text-sm mt-1" style={{ color: "#A0A0B0" }}>2시간 동안 배울 내용 미리 보기</p>
      </div>
      <div className="flex flex-col gap-2">
        {rows.map((row, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-xl px-5 py-3"
            style={{
              background: "#16161A",
              border: `1px solid ${row.highlight ? "#FBBF2440" : "#2E2E38"}`,
              opacity: row.label.includes("휴식") ? 0.6 : 1,
            }}
          >
            <span className="font-mono text-sm shrink-0 min-w-[60px]" style={{ color: "#FBBF24" }}>{row.time}</span>
            <span className="flex-1 text-sm font-medium" style={{ color: "#F0F0F5" }}>{row.label}</span>
            <span className="text-xs shrink-0" style={{ color: "#A0A0B0" }}>{row.dur}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DevTermsSlide() {
  const boxes = [
    { icon: "📱", name: "클라이언트", sub: "앱 · 웹 브라우저\n사용자가 보는 화면", color: "#4ADE80" },
    { icon: "⚙️", name: "API", sub: "클라이언트 ↔ 서버\n데이터 주고받는 창구", color: "#60A5FA" },
    { icon: "🖥", name: "서버 / 백엔드", sub: "비즈니스 로직\n데이터 처리", color: "#F472B6" },
    { icon: "🗄", name: "DB", sub: "데이터 저장소\nSupabase · Firebase", color: "#FB923C" },
    { icon: "☁️", name: "인프라 / 배포", sub: "Vercel · Cloudflare\n서비스를 세상에 공개", color: "#A78BFA" },
  ];

  const tips = [
    {
      title: "프론트엔드 vs 백엔드",
      desc: "화면(프론트) / 데이터 처리(백) — AI에게 요청할 때 어느 쪽 코드인지 명시하면 훨씬 정확한 답 나옴",
    },
    {
      title: "배포(Deploy)란?",
      desc: "내 컴퓨터에서만 돌아가던 앱을 인터넷에 올려서 누구나 접근할 수 있게 만드는 것",
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#60A5FA" }}>02</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#F0F0F5" }}>
          꼭 알아야 할 개발 용어
        </h2>
        <p className="text-sm mt-1" style={{ color: "#A0A0B0" }}>앱이 돌아가는 구조를 5가지로 이해하기</p>
      </div>
      <div className="flex items-center gap-0 w-full">
        {boxes.map((b, i) => (
          <div key={i} className="contents">
            <div
              className="flex-1 text-center rounded-xl py-3.5 px-2.5"
              style={{ background: "#16161A", border: `1px solid ${b.color}30` }}
            >
              <div className="text-xl mb-1.5">{b.icon}</div>
              <div className="text-sm font-bold" style={{ color: "#F0F0F5" }}>{b.name}</div>
              <div className="text-xs mt-1 leading-snug whitespace-pre-line" style={{ color: "#A0A0B0" }}>{b.sub}</div>
            </div>
            {i < boxes.length - 1 && (
              <span className="text-lg px-1.5 shrink-0" style={{ color: "#2E2E38" }}>→</span>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {tips.map((tip, i) => (
          <div
            key={i}
            className="flex items-start gap-4 rounded-xl px-5 py-4"
            style={{ background: "#16161A", border: "1px solid #2E2E38" }}
          >
            <span className="text-xs font-bold shrink-0 mt-0.5" style={{ color: "#FBBF24" }}>TIP</span>
            <div>
              <strong className="text-sm font-bold block mb-1" style={{ color: "#F0F0F5" }}>{tip.title}</strong>
              <p className="text-sm" style={{ color: "#A0A0B0" }}>{tip.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PromptPatternsSlide() {
  const patterns = [
    {
      icon: "🎭",
      title: "역할 부여",
      desc: "AI에게 어떤 전문가처럼 답하라고 설정",
      code: '"너는 React Native 시니어 개발자야. 다음 코드를 리뷰해줘."',
      color: "#4ADE80",
    },
    {
      icon: "📋",
      title: "맥락 제공",
      desc: "배경 정보를 충분히 줄수록 핀포인트 답 나옴",
      code: '"Supabase + Expo 앱이야. 로그인 후 유저 테이블에서 프로필 조회하는 코드 짜줘."',
      color: "#60A5FA",
    },
    {
      icon: "📐",
      title: "출력 형식 지정",
      desc: "원하는 결과물 형태를 명시",
      code: '"TypeScript로, 주석 포함해서, 함수 하나로만 작성해줘."',
      color: "#F472B6",
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#F472B6" }}>03</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#F0F0F5" }}>
          프롬프팅 3대 패턴
        </h2>
        <p className="text-sm mt-1" style={{ color: "#A0A0B0" }}>이 세 가지만 지켜도 AI 답변 품질이 확 달라진다</p>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        {patterns.map((p) => (
          <div
            key={p.title}
            className="rounded-xl p-4"
            style={{ background: "#16161A", border: `1px solid ${p.color}30` }}
          >
            <div className="text-2xl mb-3">{p.icon}</div>
            <h3 className="text-sm font-bold mb-2" style={{ color: "#F0F0F5" }}>{p.title}</h3>
            <p className="text-xs mb-3" style={{ color: "#A0A0B0" }}>{p.desc}</p>
            <code
              className="block text-xs rounded-lg px-3 py-2 font-mono leading-relaxed whitespace-pre-wrap"
              style={{ background: "#0D0D0F", color: p.color }}
            >
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
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#FB923C" }}>04</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#F0F0F5" }}>
          <span style={{ color: "#F472B6" }}>나쁜 프롬프트</span> vs <span style={{ color: "#4ADE80" }}>좋은 프롬프트</span>
        </h2>
        <p className="text-sm mt-1" style={{ color: "#A0A0B0" }}>같은 질문도 방식에 따라 결과가 완전히 다르다</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-xl p-4" style={{ background: "#16161A", border: "1px solid #F472B630" }}>
          <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#F472B6" }}>❌ 나쁜 예시</div>
          <div
            className="rounded-lg p-3.5 text-sm font-mono leading-relaxed mb-3"
            style={{ background: "#0D0D0F", color: "#F0F0F5" }}
          >
            로그인 만들어줘
          </div>
          <p className="text-xs" style={{ color: "#A0A0B0" }}>
            어떤 플랫폼인지, 어떤 방식인지, 어떤 언어인지 아무 정보 없음 → AI가 일반적인 예제를 뱉음
          </p>
        </div>
        <div className="rounded-xl p-4" style={{ background: "#16161A", border: "1px solid #4ADE8030" }}>
          <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#4ADE80" }}>✅ 좋은 예시</div>
          <div
            className="rounded-lg p-3.5 text-sm font-mono leading-relaxed mb-3"
            style={{ background: "#0D0D0F", color: "#F0F0F5" }}
          >
            Expo + Supabase 앱이야.<br />이메일/비밀번호 로그인 화면을 만들어줘.<br />NativeWind로 스타일링하고,<br />에러 메시지는 토스트로 보여줘.<br />TypeScript로 작성해줘.
          </div>
          <p className="text-xs" style={{ color: "#A0A0B0" }}>
            플랫폼 · 기술 스택 · UI 방식 · 언어 모두 명시 → 바로 쓸 수 있는 코드 나옴
          </p>
        </div>
      </div>
    </div>
  );
}

function PracticeSlide() {
  const steps = [
    { icon: "1️⃣", label: "기능 선택", desc: "내 앱의 기능 하나를 골라라 (예: 게시글 작성 / 친구 추가 / 알림 설정 / 결제)" },
    { icon: "2️⃣", label: "나쁜 프롬프트 먼저", desc: "짧고 맥락 없는 질문 → 결과 확인" },
    { icon: "3️⃣", label: "3대 패턴 적용", desc: "역할 + 맥락 + 출력 형식 모두 포함 → 결과 비교" },
    { icon: "4️⃣", label: "결과 공유", desc: "어떤 점이 달랐는지 2–3줄로 슬랙에 공유" },
  ];

  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#A78BFA" }}>05</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#F0F0F5" }}>
          직접 해보기
        </h2>
        <p className="text-sm mt-1" style={{ color: "#A0A0B0" }}>프롬프팅 3대 패턴을 내 앱에 직접 적용해보자</p>
      </div>
      <div className="flex flex-col gap-2">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-4">
            <div
              className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-lg"
              style={{ background: "#1E1E28" }}
            >
              {step.icon}
            </div>
            <div
              className="flex-1 flex items-center gap-3 rounded-xl px-4 py-3"
              style={{ background: "#16161A", border: "1px solid #2E2E38" }}
            >
              <span className="font-semibold text-sm min-w-[140px]" style={{ color: "#F0F0F5" }}>
                {step.label}
              </span>
              <span className="text-sm" style={{ color: "#A0A0B0" }}>{step.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HomeworkSlide() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#FBBF24" }}>과제</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#F0F0F5" }}>
          2회차 과제
        </h2>
      </div>
      <div
        className="w-full max-w-xl rounded-xl p-6 text-left"
        style={{
          background: "linear-gradient(135deg, #FBBF2412, #4ADE8010)",
          border: "1px solid #FBBF2430",
        }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#FBBF24" }}>2회차 과제</p>
        <p className="text-lg font-bold mb-2" style={{ color: "#F0F0F5" }}>
          AI에게 내 앱 기능 하나를 3대 패턴으로 질문해보기
        </p>
        <p className="text-sm" style={{ color: "#A0A0B0" }}>
          역할 + 맥락 + 출력 형식 적용 전/후 결과를 비교해서 슬랙에 공유
        </p>
      </div>
    </div>
  );
}

export default function Session2Page() {
  const [current, setCurrent] = useState(1);

  const goTo = useCallback((n: number) => {
    if (n < 1 || n > TOTAL) return;
    setCurrent(n);
  }, []);

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
          style={{ width: `${progress}%`, background: "linear-gradient(90deg, #4ADE80, #60A5FA)" }}
        />
      </div>

      {/* Back */}
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
      <div className="fixed top-4 right-4 text-xs z-50" style={{ color: "#A0A0B0" }}>
        {current} / {TOTAL}
      </div>

      {/* Slide content */}
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-4xl">
          {slide.type === "cover" && <CoverSlide />}
          {slide.type === "timetable" && <TimetableSlide />}
          {slide.type === "dev-terms" && <DevTermsSlide />}
          {slide.type === "prompt-patterns" && <PromptPatternsSlide />}
          {slide.type === "prompt-compare" && <PromptCompareSlide />}
          {slide.type === "practice" && <PracticeSlide />}
          {slide.type === "homework" && <HomeworkSlide />}
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

        <div className="flex gap-1.5 items-center">
          {Array.from({ length: TOTAL }, (_, i) => (
            <button
              key={i}
              onClick={() => goTo(i + 1)}
              className="rounded-full transition-all"
              style={{
                width: i + 1 === current ? 20 : 6,
                height: 6,
                background: i + 1 === current ? "#4ADE80" : "#2E2E38",
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

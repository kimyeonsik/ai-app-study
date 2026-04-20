"use client";

import { useState, useEffect, useCallback } from "react";

const slides = [
  { id: 1, type: "cover" as const },
  { id: 2, type: "vibe-philosophy" as const },
  { id: 3, type: "multi-agent" as const },
  { id: 4, type: "harness" as const },
  { id: 5, type: "practice" as const },
  { id: 6, type: "homework" as const },
];

const TOTAL = slides.length;

function CoverSlide() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-8">
      <span
        className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
        style={{ color: "#4ADE80", border: "1px solid #4ADE80", background: "#4ADE8015" }}
      >
        3회차
      </span>
      <h1
        className="text-4xl sm:text-5xl font-extrabold leading-tight"
        style={{
          background: "linear-gradient(135deg, #4ADE80, #60A5FA)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        바이브코딩 철학<br />+ 멀티에이전트
      </h1>
      <p className="text-lg max-w-xl" style={{ color: "#A0A0B0" }}>
        좋은 설계가 좋은 코드를 만든다 — AI를 다양한 역할로 활용하는 방법
      </p>
      <div className="flex flex-wrap gap-3 justify-center mt-2">
        {[
          "바이브코딩 철학",
          "멀티에이전트 구조",
          "하네스 엔지니어링",
          "세 관점으로 질문하기",
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

function VibePhilosophySlide() {
  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#4ADE80" }}>01</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#F0F0F5" }}>
          바이브코딩 철학
        </h2>
        <p className="text-sm mt-1" style={{ color: "#A0A0B0" }}>AI를 잘 쓰는 사람들이 공통으로 가진 관점</p>
      </div>
      <div
        className="rounded-xl px-6 py-8 text-center"
        style={{ background: "#16161A", border: "1px solid #4ADE8030" }}
      >
        <p
          className="text-xl sm:text-2xl font-extrabold leading-relaxed"
          style={{ color: "#F0F0F5" }}
        >
          <span style={{ color: "#4ADE80" }}>&ldquo;설계가 코드보다 중요하다.&rdquo;</span>
        </p>
        <p className="text-base font-medium mt-4" style={{ color: "#A0A0B0" }}>
          AI는 지시를 실행하는 기계 — 좋은 설계서가 있어야 좋은 코드가 나온다.
        </p>
        <p className="text-sm mt-3" style={{ color: "#A0A0B0" }}>
          코드 생성보다 먼저 &apos;무엇을 만들지&apos; 명확하게 정의하는 게 핵심
        </p>
      </div>
    </div>
  );
}

function MultiAgentSlide() {
  const roles = [
    {
      icon: "📌",
      label: "PO (Product Owner)",
      color: "#FBBF24",
      items: [
        "왜 이 기능이 필요한가",
        "사용자가 어떤 흐름으로 쓰는가",
        "성공 기준(KPI)은 무엇인가",
        "예외 케이스, 엣지 케이스 정의",
      ],
    },
    {
      icon: "💻",
      label: "Developer",
      color: "#4ADE80",
      items: [
        "어떤 기술로 구현할 것인가",
        "데이터 구조 · API 설계",
        "성능 · 보안 고려사항",
        "테스트 전략",
      ],
    },
    {
      icon: "🔍",
      label: "QA",
      color: "#F472B6",
      items: [
        "어떤 케이스에서 깨질 수 있는가",
        "테스트 시나리오 목록",
        "비정상 입력 처리",
        "사용자 경험상 문제점",
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#60A5FA" }}>02</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#F0F0F5" }}>
          하나의 기능을 세 포지션으로 바라보기
        </h2>
        <p className="text-sm mt-1" style={{ color: "#A0A0B0" }}>같은 기능도 역할에 따라 보이는 관점이 다르다</p>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        {roles.map((role) => (
          <div
            key={role.label}
            className="rounded-xl p-4"
            style={{ background: "#16161A", border: `1px solid ${role.color}30` }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{role.icon}</span>
              <span className="font-bold text-sm" style={{ color: role.color }}>{role.label}</span>
            </div>
            <ul className="flex flex-col gap-1.5">
              {role.items.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm" style={{ color: "#C8C8D8" }}>
                  <span style={{ color: role.color, flexShrink: 0 }}>→</span>
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
    {
      icon: "💡",
      label: "개념",
      title: "하네스(Harness) = AI를 안전하게 제어하는 구조물",
      desc: "AI 에이전트가 예측 가능하게 동작하도록 역할 · 제약 · 출력 형식을 미리 정의해두는 것",
      color: "#4ADE80",
    },
    {
      icon: "🔧",
      label: "구성",
      title: "시스템 프롬프트 3요소",
      desc: '① 역할 정의 — "너는 ~야"  |  ② 제약 조건 — "절대 ~하지 마"  |  ③ 출력 규칙 — "반드시 JSON으로"',
      color: "#60A5FA",
    },
    {
      icon: "🚀",
      label: "실전",
      title: "내 앱 전용 AI 지시문 초안 만들기",
      desc: "오늘 실습 — 내가 만드는 앱의 AI 어시스턴트 시스템 프롬프트 한 장 작성",
      color: "#F472B6",
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#F472B6" }}>03</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#F0F0F5" }}>
          AI 지시문 설계 — 하네스 엔지니어링
        </h2>
        <p className="text-sm mt-1" style={{ color: "#A0A0B0" }}>AI를 내 앱에 맞게 길들이는 방법</p>
      </div>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-start gap-4 rounded-xl px-5 py-4"
            style={{ background: "#16161A", border: `1px solid ${item.color}30` }}
          >
            <div
              className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{ background: `${item.color}18` }}
            >
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm" style={{ color: "#F0F0F5" }}>{item.title}</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${item.color}20`, color: item.color }}>
                  {item.label}
                </span>
              </div>
              <p className="text-sm" style={{ color: "#A0A0B0" }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PracticeSlide() {
  const steps = [
    { icon: "🎯", label: "기능 선택", desc: "내 앱에서 핵심 기능 하나 고르기 (예: 리뷰 작성, 친구 초대, 구독 결제)" },
    { icon: "📌", label: "PO 관점으로 질문", desc: '"이 기능의 사용자 스토리와 엣지 케이스를 정리해줘"' },
    { icon: "💻", label: "DEV 관점으로 질문", desc: '"이 기능 구현에 필요한 DB 스키마와 API 엔드포인트를 설계해줘"' },
    { icon: "🔍", label: "QA 관점으로 질문", desc: '"이 기능에서 발생할 수 있는 버그 시나리오 10가지를 뽑아줘"' },
  ];

  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#FB923C" }}>04</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#F0F0F5" }}>
          기능 하나를 세 관점으로 질문해보기
        </h2>
        <p className="text-sm mt-1" style={{ color: "#A0A0B0" }}>같은 기능도 역할에 따라 질문이 달라진다</p>
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
            {i < steps.length - 1 && (
              <div className="w-9 text-center text-xs" style={{ color: "#3E3E48" }}>↓</div>
            )}
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
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#4ADE80" }}>과제</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#F0F0F5" }}>
          3회차 과제
        </h2>
      </div>
      <div
        className="w-full max-w-xl rounded-xl p-6 text-left"
        style={{
          background: "linear-gradient(135deg, #4ADE8012, #60A5FA10)",
          border: "1px solid #4ADE8030",
        }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#4ADE80" }}>3회차 과제</p>
        <p className="text-lg font-bold mb-2" style={{ color: "#F0F0F5" }}>
          기능 1개를 PO / Dev / QA 관점으로 각각 질문 → 결과 비교 공유
        </p>
        <p className="text-sm" style={{ color: "#A0A0B0" }}>
          세 관점에서 나온 답변 중 가장 유용했던 것과 그 이유를 슬랙에 공유
        </p>
      </div>
    </div>
  );
}

export default function Session3Page() {
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
          {slide.type === "vibe-philosophy" && <VibePhilosophySlide />}
          {slide.type === "multi-agent" && <MultiAgentSlide />}
          {slide.type === "harness" && <HarnessSlide />}
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

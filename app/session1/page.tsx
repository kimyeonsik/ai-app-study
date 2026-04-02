"use client";

import { useState, useEffect, useCallback } from "react";

const slides = [
  { id: 1, type: "cover" as const },
  { id: 2, type: "components" as const },
  { id: 3, type: "process" as const },
  { id: 4, type: "roles" as const },
  { id: 5, type: "stack" as const },
];

const TOTAL = slides.length;

function CoverSlide() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-8">
      <span
        className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
        style={{ color: "#4ADE80", border: "1px solid #4ADE80", background: "#4ADE8015" }}
      >
        1회차
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
        개발 시스템 큰그림
      </h1>
      <p className="text-lg max-w-xl" style={{ color: "#A0A0B0" }}>
        앱이 어떻게 만들어지고, 누가 무엇을 하고, 어떤 도구를 쓰는지 — 한눈에 이해하기
      </p>
      <div className="flex flex-wrap gap-3 justify-center mt-2">
        {[
          "앱 서비스의 구성요소",
          "서비스가 나오기까지의 과정",
          "직군 구분 & 역할",
          "전체 기술 스택",
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

function ComponentsSlide() {
  const items = [
    {
      icon: "📱",
      label: "클라이언트",
      sub: "앱 / 웹",
      desc: "사용자가 직접 보고 조작하는 화면. React Native(모바일), Next.js(웹).",
      color: "#4ADE80",
    },
    {
      icon: "⚙️",
      label: "서버 (API)",
      sub: "백엔드",
      desc: "클라이언트의 요청을 받아 비즈니스 로직을 처리하고 DB에 접근.",
      color: "#60A5FA",
    },
    {
      icon: "🗄️",
      label: "데이터베이스",
      sub: "DB",
      desc: "데이터를 저장하고 조회. SQL(Supabase) 또는 NoSQL(Firebase) 방식.",
      color: "#F472B6",
    },
    {
      icon: "☁️",
      label: "클라우드 인프라",
      sub: "호스팅 / 배포",
      desc: "서버와 앱이 실제로 돌아가는 환경. Vercel, EAS, Supabase 등.",
      color: "#FB923C",
    },
    {
      icon: "🔌",
      label: "외부 서비스",
      sub: "Third-party API",
      desc: "결제(Stripe), 푸시 알림, 이메일(Resend), 분석(Amplitude) 등.",
      color: "#A78BFA",
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#4ADE80" }}>01</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#F0F0F5" }}>
          앱 서비스의 구성요소
        </h2>
        <p className="text-sm mt-1" style={{ color: "#A0A0B0" }}>하나의 앱은 이 다섯 가지가 맞물려 돌아간다</p>
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
                <span className="font-bold text-sm" style={{ color: "#F0F0F5" }}>{item.label}</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${item.color}20`, color: item.color }}>
                  {item.sub}
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

function ProcessSlide() {
  const steps = [
    { icon: "💡", label: "아이디어", desc: "무엇을 만들까?" },
    { icon: "📋", label: "기획 (PRD)", desc: "목적 · 기능 · 유저 정의" },
    { icon: "🎨", label: "디자인", desc: "화면 · 플로우 설계" },
    { icon: "💻", label: "개발", desc: "프론트 + 백엔드 구현" },
    { icon: "🔍", label: "QA 테스트", desc: "버그 찾고 검증" },
    { icon: "🚀", label: "배포", desc: "앱스토어 · 웹 출시" },
    { icon: "📊", label: "운영 · 개선", desc: "데이터 보고 반복" },
  ];

  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#60A5FA" }}>02</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#F0F0F5" }}>
          앱 서비스가 나오기까지의 과정
        </h2>
        <p className="text-sm mt-1" style={{ color: "#A0A0B0" }}>아이디어에서 출시까지 — 반복되는 루프</p>
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
              <span className="font-semibold text-sm min-w-[90px]" style={{ color: "#F0F0F5" }}>
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
      <p className="text-xs text-center" style={{ color: "#A0A0B0" }}>
        배포 이후에도 개선 → 재배포 루프는 계속 반복된다
      </p>
    </div>
  );
}

function RolesSlide() {
  const roles = [
    {
      icon: "📌",
      label: "기획자 (PO / PM)",
      color: "#4ADE80",
      items: [
        "무엇을 만들지 결정",
        "PRD 작성 · 기능 우선순위",
        "로드맵 · 일정 관리",
        "유저 피드백 수집 및 반영",
      ],
    },
    {
      icon: "🎨",
      label: "디자이너 (UX/UI)",
      color: "#60A5FA",
      items: [
        "화면 흐름 (플로우) 설계",
        "와이어프레임 · 목업 제작",
        "디자인 시스템 구축",
        "사용성 테스트",
      ],
    },
    {
      icon: "💻",
      label: "개발자 (Frontend / Backend)",
      color: "#F472B6",
      items: [
        "화면 구현 (React Native, Next.js)",
        "API · DB 설계 및 구현",
        "성능 최적화 · 보안",
        "코드 리뷰 · 기술 결정",
      ],
    },
    {
      icon: "🔍",
      label: "QA 엔지니어",
      color: "#FB923C",
      items: [
        "기능 테스트 · 버그 발견",
        "테스트 케이스 작성",
        "배포 전 품질 검증",
        "자동화 테스트",
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#F472B6" }}>03</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#F0F0F5" }}>
          직군 구분 & 각 직군의 역할
        </h2>
        <p className="text-sm mt-1" style={{ color: "#A0A0B0" }}>이 모임에서는 모두가 이 역할을 AI와 함께 맡는다</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
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

function StackSlide() {
  const categories = [
    {
      label: "모바일 앱",
      color: "#4ADE80",
      items: [
        { name: "React Native", desc: "크로스플랫폼 앱 개발 (iOS + Android)" },
        { name: "Expo", desc: "RN 개발 환경 · 빌드 · 배포 도구" },
        { name: "NativeWind", desc: "Tailwind CSS 방식의 스타일링" },
      ],
    },
    {
      label: "웹",
      color: "#60A5FA",
      items: [
        { name: "Next.js", desc: "React 기반 풀스택 웹 프레임워크" },
        { name: "Tailwind CSS", desc: "유틸리티 기반 CSS 프레임워크" },
        { name: "shadcn/ui", desc: "UI 컴포넌트 라이브러리" },
      ],
    },
    {
      label: "백엔드 / DB",
      color: "#F472B6",
      items: [
        { name: "Supabase", desc: "PostgreSQL 기반 BaaS (인증 · DB · Storage)" },
        { name: "Firebase", desc: "Google의 NoSQL 기반 BaaS" },
        { name: "Node.js", desc: "서버 사이드 JavaScript 런타임" },
      ],
    },
    {
      label: "배포 / 인프라",
      color: "#FB923C",
      items: [
        { name: "Vercel", desc: "Next.js 웹 자동 배포 플랫폼" },
        { name: "EAS (Expo)", desc: "앱스토어 빌드 · 배포 서비스" },
        { name: "GitHub Actions", desc: "CI/CD 자동화" },
      ],
    },
    {
      label: "기획 / 관리",
      color: "#A78BFA",
      items: [
        { name: "Plane.so", desc: "이슈 트래킹 · 로드맵 관리" },
        { name: "GitHub", desc: "코드 버전 관리 · 협업" },
        { name: "Amplitude", desc: "사용자 행동 분석" },
      ],
    },
    {
      label: "AI 도구",
      color: "#FBBF24",
      items: [
        { name: "Claude / ChatGPT", desc: "기획 · 코드 생성 · 디버깅" },
        { name: "Cursor", desc: "AI 페어 프로그래밍 에디터" },
        { name: "pencil.dev", desc: "AI 연동 디자인 시스템 플랫폼" },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-4 w-full max-w-3xl mx-auto">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#FB923C" }}>04</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#F0F0F5" }}>
          전체 기술 스택
        </h2>
        <p className="text-sm mt-1" style={{ color: "#A0A0B0" }}>이 모임에서 사용하는 도구 전체 목록</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {categories.map((cat) => (
          <div
            key={cat.label}
            className="rounded-xl p-4"
            style={{ background: "#16161A", border: `1px solid ${cat.color}30` }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: cat.color }}>
              {cat.label}
            </p>
            <ul className="flex flex-col gap-2">
              {cat.items.map((item) => (
                <li key={item.name} className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold" style={{ color: "#F0F0F5" }}>{item.name}</span>
                  <span className="text-xs" style={{ color: "#A0A0B0" }}>{item.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Session1Page() {
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
          {slide.type === "components" && <ComponentsSlide />}
          {slide.type === "process" && <ProcessSlide />}
          {slide.type === "roles" && <RolesSlide />}
          {slide.type === "stack" && <StackSlide />}
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

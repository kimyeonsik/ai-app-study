"use client";

import { useState, useEffect, useCallback } from "react";

const slides = [
  { id: 1, type: "cover" as const },
  { id: 2, type: "timetable" as const },
  { id: 3, type: "why-prd" as const },
  { id: 4, type: "prd-elements" as const },
  { id: 5, type: "workshop1-draft" as const },
  { id: 6, type: "workshop2-persona" as const },
  { id: 7, type: "workshop3-screens" as const },
  { id: 8, type: "ai-instructions" as const },
  { id: 9, type: "workshop4-issues" as const },
  { id: 10, type: "prompt-cheatsheet" as const },
  { id: 11, type: "good-vs-bad" as const },
  { id: 12, type: "homework" as const },
];

const TOTAL = slides.length;

const ACCENT = "#60A5FA";
const ACCENT2 = "#A78BFA";
const HIGHLIGHT = "#FBBF24";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handle = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        // ignore
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={handle}
      className="text-xs px-2.5 py-1 rounded-md font-medium transition-all hover:opacity-80"
      style={{
        background: copied ? `${HIGHLIGHT}25` : "#1E1E28",
        color: copied ? HIGHLIGHT : "#A0A0B0",
        border: `1px solid ${copied ? `${HIGHLIGHT}60` : "#2E2E38"}`,
      }}
      aria-label="프롬프트 복사"
    >
      {copied ? "✓ 복사됨" : "📋 복사"}
    </button>
  );
}

function PromptBlock({ text }: { text: string }) {
  return (
    <div className="relative">
      <pre
        className="text-xs rounded-md px-3 py-3 pr-24 overflow-x-auto font-mono whitespace-pre-wrap leading-relaxed"
        style={{ background: "#0D0D0F", color: "#C8C8D8", border: "1px solid #2E2E38" }}
      >
{text}
      </pre>
      <div className="absolute top-2 right-2">
        <CopyButton text={text} />
      </div>
    </div>
  );
}

function CoverSlide() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-8">
      <span
        className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
        style={{ color: ACCENT, border: `1px solid ${ACCENT}`, background: `${ACCENT}15` }}
      >
        5회차 · 워크숍
      </span>
      <h1
        className="text-4xl sm:text-5xl font-extrabold leading-tight"
        style={{
          background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        내 앱 기획 워크숍<br />PRD + AI 지시문
      </h1>
      <p className="text-lg max-w-xl" style={{ color: "#A0A0B0" }}>
        한 줄 아이디어에서 출발해, AI에게 던질 수 있는 PRD와 이슈 5개까지 — 손으로 직접 만든다
      </p>
      <div className="flex flex-wrap gap-3 justify-center mt-2">
        {[
          "PRD 7요소",
          "Claude로 초안 생성",
          "페르소나 · 유저스토리",
          "AI 지시문 (CLAUDE.md)",
          "이슈 5개 분해",
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
      <p className="text-sm" style={{ color: ACCENT2 }}>
        🛠 노트북 · Claude Code 준비 — 오늘은 강의 30분, 손으로 1시간 20분
      </p>
    </div>
  );
}

function TimetableSlide() {
  const rows = [
    { time: "+0:00", label: "도입 — 4회차 과제 공유 + 오늘 흐름 안내", dur: "10 min", kind: "intro" },
    { time: "+0:10", label: "강의 — 왜 PRD인가 + PRD 7요소", dur: "20 min", kind: "lecture" },
    { time: "+0:30", label: "🛠 워크숍 1 — 한 줄 → PRD 초안 생성", dur: "15 min", kind: "workshop" },
    { time: "+0:45", label: "🛠 워크숍 2 — 페르소나 + 유저 스토리 추가", dur: "20 min", kind: "workshop" },
    { time: "+1:05", label: "☕ 짧은 휴식", dur: "5 min", kind: "break" },
    { time: "+1:10", label: "🛠 워크숍 3 — 화면 목록 + 유저 플로우 도출", dur: "15 min", kind: "workshop" },
    { time: "+1:25", label: "강의 — AI 지시문(CLAUDE.md) 작성법", dur: "10 min", kind: "lecture" },
    { time: "+1:35", label: "🛠 워크숍 4 — PRD → 이슈 5개로 분해", dur: "20 min", kind: "workshop" },
    { time: "+1:55", label: "공유 + 마무리 — 한 명씩 PRD 30초 피칭", dur: "5 min", kind: "intro" },
  ];

  const colorOf = (kind: string) =>
    kind === "workshop" ? HIGHLIGHT : kind === "lecture" ? ACCENT : kind === "break" ? "#A0A0B0" : "#C8C8D8";

  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: ACCENT }}>01</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#F0F0F5" }}>
          워크숍 시간표
        </h2>
        <p className="text-sm mt-1" style={{ color: "#A0A0B0" }}>
          강의 30분 · 손으로 만드는 시간 1시간 20분 · 공유 10분
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {rows.map((row, i) => {
          const c = colorOf(row.kind);
          const isWorkshop = row.kind === "workshop";
          return (
            <div
              key={i}
              className="flex items-center gap-4 rounded-xl px-5 py-3"
              style={{
                background: isWorkshop ? "#1A1A24" : "#16161A",
                border: `1px solid ${isWorkshop ? `${HIGHLIGHT}40` : row.kind === "lecture" ? `${ACCENT}30` : "#2E2E38"}`,
                opacity: row.kind === "break" ? 0.6 : 1,
              }}
            >
              <span className="font-mono text-sm shrink-0 min-w-[60px]" style={{ color: c }}>{row.time}</span>
              <span className="flex-1 text-sm font-medium" style={{ color: "#F0F0F5" }}>{row.label}</span>
              <span className="text-xs shrink-0" style={{ color: "#A0A0B0" }}>{row.dur}</span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-4 text-xs" style={{ color: "#A0A0B0" }}>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-sm" style={{ background: ACCENT }} /> 강의
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-sm" style={{ background: HIGHLIGHT }} /> 워크숍 (손으로)
        </span>
      </div>
    </div>
  );
}

function WhyPrdSlide() {
  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: ACCENT }}>02</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#F0F0F5" }}>
          왜 PRD부터 쓰는가?
        </h2>
        <p className="text-sm mt-1" style={{ color: "#A0A0B0" }}>AI 시대의 기획서는 사람용이 아니라 AI 컨텍스트용</p>
      </div>
      <div
        className="rounded-xl px-6 py-6 text-center"
        style={{ background: "#16161A", border: `1px solid ${ACCENT}30` }}
      >
        <p
          className="text-xl sm:text-2xl font-extrabold leading-relaxed"
          style={{ color: "#F0F0F5" }}
        >
          <span style={{ color: ACCENT }}>&ldquo;PRD는 AI에게 주는 컨텍스트의 본체다.&rdquo;</span>
        </p>
        <p className="text-sm mt-3" style={{ color: "#A0A0B0" }}>
          PRD가 좋으면 — Claude가 화면, 컴포넌트, 이슈, 코드까지 자동으로 뽑아낸다
        </p>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        {[
          { num: "01", title: "방향 통일", desc: "사람과 AI가 같은 그림을 본다" },
          { num: "02", title: "재사용 가능", desc: "한 번 쓴 PRD로 여러 작업 반복" },
          { num: "03", title: "검증 기준", desc: "완성됐는지 판단할 수 있는 기준" },
        ].map((b) => (
          <div key={b.num} className="rounded-xl p-4" style={{ background: "#16161A", border: "1px solid #2E2E38" }}>
            <p className="text-xs font-bold mb-1" style={{ color: ACCENT2 }}>{b.num}</p>
            <p className="text-sm font-bold mb-1" style={{ color: "#F0F0F5" }}>{b.title}</p>
            <p className="text-xs" style={{ color: "#A0A0B0" }}>{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PrdElementsSlide() {
  const elements = [
    { num: "1", name: "한 줄 정의", desc: "이 앱은 누구의 무엇을 해결하는가", color: ACCENT },
    { num: "2", name: "타깃 사용자", desc: "구체적인 페르소나 1~2명", color: ACCENT },
    { num: "3", name: "핵심 문제", desc: "지금 사용자가 겪는 불편함", color: ACCENT2 },
    { num: "4", name: "핵심 기능 (MVP)", desc: "최소한으로 가치가 성립되는 기능 3~5개", color: ACCENT2 },
    { num: "5", name: "화면 / 플로우", desc: "주요 화면 목록 + 사용자 동선", color: HIGHLIGHT },
    { num: "6", name: "성공 지표", desc: "이 앱이 잘 됐다고 판단할 숫자/기준", color: HIGHLIGHT },
    { num: "7", name: "Out of Scope", desc: "이번엔 안 만드는 것 — 가장 중요!", color: "#F47276" },
  ];

  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: ACCENT }}>03</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#F0F0F5" }}>
          좋은 PRD의 7요소
        </h2>
        <p className="text-sm mt-1" style={{ color: "#A0A0B0" }}>이 7개만 채우면 AI가 알아서 코드를 만든다</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-2.5">
        {elements.map((el) => (
          <div
            key={el.num}
            className="flex items-start gap-3 rounded-xl px-4 py-3"
            style={{ background: "#16161A", border: `1px solid ${el.color}30` }}
          >
            <div
              className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold"
              style={{ background: `${el.color}20`, color: el.color }}
            >
              {el.num}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm mb-0.5" style={{ color: "#F0F0F5" }}>{el.name}</p>
              <p className="text-xs" style={{ color: "#A0A0B0" }}>{el.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div
        className="rounded-xl px-5 py-3 text-sm"
        style={{ background: `${HIGHLIGHT}10`, border: `1px solid ${HIGHLIGHT}40`, color: "#C8C8D8" }}
      >
        ⭐ <strong style={{ color: HIGHLIGHT }}>7번 Out of Scope가 진짜 비밀</strong> — 이걸 안 쓰면 AI가 끝없이 기능을 늘린다.
      </div>
    </div>
  );
}

function Workshop1Slide() {
  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ color: HIGHLIGHT, background: `${HIGHLIGHT}15`, border: `1px solid ${HIGHLIGHT}40` }}>
          🛠 워크숍 1 · 15분
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold mt-3" style={{ color: "#F0F0F5" }}>
          한 줄 → PRD 초안
        </h2>
        <p className="text-sm mt-1" style={{ color: "#A0A0B0" }}>Claude한테 시켜서 첫 PRD를 받아본다</p>
      </div>
      <div className="rounded-xl p-5" style={{ background: "#16161A", border: `1px solid ${HIGHLIGHT}30` }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: HIGHLIGHT }}>
          STEP 1 — 한 줄 아이디어 정리
        </p>
        <div className="rounded-lg px-4 py-3 mb-3" style={{ background: "#0D0D0F", border: "1px solid #2E2E38" }}>
          <p className="text-sm font-mono" style={{ color: "#C8C8D8" }}>
            &ldquo;<span style={{ color: HIGHLIGHT }}>[누구]</span>가 <span style={{ color: HIGHLIGHT }}>[어떤 상황]</span>에서 <span style={{ color: HIGHLIGHT }}>[무엇]</span>을 할 수 있는 앱&rdquo;
          </p>
        </div>
        <p className="text-xs mb-1" style={{ color: "#A0A0B0" }}>
          예시 — &ldquo;1인 가구가 평일 저녁 30분 안에 집밥 한 끼를 해결할 수 있는 레시피 큐레이션 앱&rdquo;
        </p>
      </div>
      <div className="rounded-xl p-5" style={{ background: "#16161A", border: `1px solid ${ACCENT}30` }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>
          STEP 2 — Claude한테 인터뷰 시작 (그대로 복사 OK)
        </p>
        <PromptBlock
          text={`나는 [어떤 사람]을 위한 [어떤 앱]을 만들려고 해.
PRD를 작성하고 싶은데, 바로 쓰지 말고 먼저 너가 좋은 PRD를
쓰기 위해 나한테 필요한 정보를 5-10개 질문해줘.
한 번에 다 묻지 말고, 한 번에 2-3개씩 나눠서 물어봐.
내가 답하면 다음 질문 묶음으로 넘어가는 식으로.`}
        />
        <p className="text-xs mt-3" style={{ color: "#A0A0B0" }}>
          → Claude가 2~3개씩 질문 → 답변 → 다음 묶음 반복. 충분히 정보가 모였다 싶으면 마지막에 한 줄 더:
        </p>
        <p className="text-xs mt-1.5 font-mono px-3 py-2 rounded-md" style={{ background: "#0D0D0F", color: ACCENT, border: "1px solid #2E2E38" }}>
          &ldquo;좋아, 이제 모인 정보로 PRD.md 파일을 작성해줘. 추측은 [TBD]로 표시.&rdquo;
        </p>
      </div>
      <div
        className="rounded-xl px-5 py-3 text-sm"
        style={{ background: `${ACCENT}10`, border: `1px solid ${ACCENT}40`, color: "#C8C8D8" }}
      >
        ✅ <strong style={{ color: "#F0F0F5" }}>완료 기준</strong> — Claude가 뽑아준 PRD를 <code className="font-mono text-xs px-1.5 py-0.5 rounded mx-1" style={{ background: "#0D0D0F", color: ACCENT }}>PRD.md</code> 파일로 저장
      </div>
    </div>
  );
}

function Workshop2Slide() {
  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ color: HIGHLIGHT, background: `${HIGHLIGHT}15`, border: `1px solid ${HIGHLIGHT}40` }}>
          🛠 워크숍 2 · 20분
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold mt-3" style={{ color: "#F0F0F5" }}>
          페르소나 + 유저 스토리 강화
        </h2>
        <p className="text-sm mt-1" style={{ color: "#A0A0B0" }}>초안의 빈 곳을 채우면서 사람을 구체화한다</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-xl p-4" style={{ background: "#16161A", border: `1px solid ${ACCENT}30` }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: ACCENT }}>페르소나 템플릿</p>
          <ul className="flex flex-col gap-1.5 text-xs" style={{ color: "#C8C8D8" }}>
            <li><strong style={{ color: "#F0F0F5" }}>이름 / 나이 / 직업</strong> — 김지민 · 28세 · 1인 가구 직장인</li>
            <li><strong style={{ color: "#F0F0F5" }}>일상</strong> — 평일 저녁 8시 퇴근, 요리 30분 한계</li>
            <li><strong style={{ color: "#F0F0F5" }}>지금 쓰는 도구</strong> — 배달의민족, 유튜브 검색</li>
            <li><strong style={{ color: "#F0F0F5" }}>불편</strong> — 영양 불균형, 매번 비슷한 메뉴</li>
            <li><strong style={{ color: "#F0F0F5" }}>이상</strong> — 5분 결정 + 25분 조리</li>
          </ul>
        </div>
        <div className="rounded-xl p-4" style={{ background: "#16161A", border: `1px solid ${ACCENT2}30` }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: ACCENT2 }}>유저 스토리 형식</p>
          <div className="rounded-lg p-3 mb-2" style={{ background: "#0D0D0F", border: "1px solid #2E2E38" }}>
            <p className="text-xs font-mono leading-relaxed" style={{ color: "#C8C8D8" }}>
              <span style={{ color: ACCENT2 }}>As a</span> [페르소나],<br />
              <span style={{ color: ACCENT2 }}>I want to</span> [하고 싶은 것]<br />
              <span style={{ color: ACCENT2 }}>so that</span> [이유 / 가치]
            </p>
          </div>
          <p className="text-xs" style={{ color: "#A0A0B0" }}>
            예) 1인 가구로서, 냉장고 재료 입력 한 번에 30분 레시피를 받고 싶다 — 매번 메뉴 고민하기 싫으니까
          </p>
        </div>
      </div>
      <div className="rounded-xl p-5" style={{ background: "#16161A", border: `1px solid ${HIGHLIGHT}30` }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: HIGHLIGHT }}>
          Claude 프롬프트
        </p>
        <PromptBlock
          text={`첨부한 PRD.md를 읽고:
1) 페르소나 1명을 위 템플릿대로 더 구체화 (실제 인물처럼)
2) 핵심 기능 5개 각각에 대응되는 유저 스토리 5개 작성
3) 각 스토리에 우선순위(P0/P1/P2)와 한 줄 수락 기준(AC) 추가

PRD.md를 업데이트해서 보여줘.`}
        />
      </div>
    </div>
  );
}

function Workshop3Slide() {
  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ color: HIGHLIGHT, background: `${HIGHLIGHT}15`, border: `1px solid ${HIGHLIGHT}40` }}>
          🛠 워크숍 3 · 15분
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold mt-3" style={{ color: "#F0F0F5" }}>
          화면 목록 + 유저 플로우
        </h2>
        <p className="text-sm mt-1" style={{ color: "#A0A0B0" }}>PRD를 시각화 직전 단계로 — Claude가 화면을 그려준다</p>
      </div>
      <div className="rounded-xl p-5" style={{ background: "#16161A", border: `1px solid ${ACCENT}30` }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>
          단계별 결과물
        </p>
        <div className="flex flex-col gap-2">
          {[
            { num: "1", text: "주요 화면 6개 목록 — 이름 + 1줄 목적" },
            { num: "2", text: "각 화면의 핵심 컴포넌트 (헤더/리스트/CTA 등)" },
            { num: "3", text: "유저 플로우 — 첫 진입 → 핵심 액션 → 완료까지" },
            { num: "4", text: "ASCII 또는 Mermaid로 플로우 다이어그램" },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-3 text-sm">
              <span className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold" style={{ background: `${ACCENT}20`, color: ACCENT }}>
                {s.num}
              </span>
              <span style={{ color: "#C8C8D8" }}>{s.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl p-5" style={{ background: "#16161A", border: `1px solid ${HIGHLIGHT}30` }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: HIGHLIGHT }}>
          Claude 프롬프트
        </p>
        <PromptBlock
          text={`PRD.md를 기반으로 SCREENS.md 파일을 만들어줘.

포함할 것:
1. 주요 화면 6개 (이름 · 목적 · 핵심 컴포넌트)
2. 페르소나가 처음 앱을 켜고 핵심 가치를 경험하기까지의 플로우
3. Mermaid flowchart로 화면 간 이동 다이어그램

화면 이름은 짧게 (예: HomeScreen, RecipeDetailScreen).`}
        />
      </div>
    </div>
  );
}

function AiInstructionsSlide() {
  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: ACCENT }}>04</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#F0F0F5" }}>
          AI 지시문 — CLAUDE.md
        </h2>
        <p className="text-sm mt-1" style={{ color: "#A0A0B0" }}>레포 루트에 두면 Claude가 매번 자동으로 읽는 파일</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-xl p-4" style={{ background: "#16161A", border: `1px solid ${ACCENT}30` }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: ACCENT }}>왜 필요한가</p>
          <ul className="flex flex-col gap-1.5 text-xs" style={{ color: "#C8C8D8" }}>
            <li className="flex gap-2"><span style={{ color: ACCENT }}>→</span>매번 같은 컨텍스트를 안 알려줘도 됨</li>
            <li className="flex gap-2"><span style={{ color: ACCENT }}>→</span>스타일·컨벤션·금지 사항을 한 곳에</li>
            <li className="flex gap-2"><span style={{ color: ACCENT }}>→</span>팀원/AI가 같은 룰 공유</li>
          </ul>
        </div>
        <div className="rounded-xl p-4" style={{ background: "#16161A", border: "1px solid #2E2E38" }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#A0A0B0" }}>들어가야 할 내용</p>
          <ul className="flex flex-col gap-1.5 text-xs" style={{ color: "#C8C8D8" }}>
            <li>① 프로젝트 한 줄 소개 + 페르소나</li>
            <li>② 기술 스택 (Next.js · React Native 등)</li>
            <li>③ 폴더 구조 규칙</li>
            <li>④ 코딩 컨벤션 / 금지 사항</li>
            <li>⑤ 자주 쓰는 명령어</li>
          </ul>
        </div>
      </div>
      <div className="rounded-xl p-4" style={{ background: "#16161A", border: `1px solid ${ACCENT2}30` }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT2 }}>
          최소 템플릿 (그대로 시작 가능)
        </p>
        <PromptBlock
          text={`# CLAUDE.md

## 프로젝트
- 한 줄: <PRD에서 복사>
- 페르소나: <PRD에서 복사>

## 기술 스택
- Next.js 16 (App Router) · TypeScript · Tailwind v4

## 작업 규칙
- 컴포넌트: app/ 또는 components/ 안에만
- 새 파일 만들기 전에 기존 파일 활용 검토
- 한국어로 답변, 코드 주석은 영어 OK

## 금지
- 임의로 라이브러리 추가 금지 (먼저 물어볼 것)
- console.log 남기지 말 것
`}
        />
      </div>
    </div>
  );
}

function Workshop4Slide() {
  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ color: HIGHLIGHT, background: `${HIGHLIGHT}15`, border: `1px solid ${HIGHLIGHT}40` }}>
          🛠 워크숍 4 · 20분
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold mt-3" style={{ color: "#F0F0F5" }}>
          PRD → 이슈 5개 분해
        </h2>
        <p className="text-sm mt-1" style={{ color: "#A0A0B0" }}>
          이제 PRD가 실제로 굴러간다 — 다음 회차 Plane.so 등록용 티켓을 미리 뽑는다
        </p>
      </div>
      <div className="rounded-xl p-5" style={{ background: "#16161A", border: `1px solid ${ACCENT}30` }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>
          좋은 이슈의 조건
        </p>
        <div className="grid sm:grid-cols-2 gap-2 text-sm" style={{ color: "#C8C8D8" }}>
          <div className="flex gap-2"><span style={{ color: ACCENT }}>→</span>2~4시간 안에 끝나는 크기</div>
          <div className="flex gap-2"><span style={{ color: ACCENT }}>→</span>완료 기준이 명확 (수락 조건)</div>
          <div className="flex gap-2"><span style={{ color: ACCENT }}>→</span>다른 이슈와 의존성 최소</div>
          <div className="flex gap-2"><span style={{ color: ACCENT }}>→</span>한 PR로 머지 가능한 단위</div>
        </div>
      </div>
      <div className="rounded-xl p-5" style={{ background: "#16161A", border: `1px solid ${HIGHLIGHT}30` }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: HIGHLIGHT }}>
          Claude 프롬프트
        </p>
        <PromptBlock
          text={`PRD.md + SCREENS.md를 읽고, MVP를 만들기 위한
첫 5개 이슈를 ISSUES.md에 만들어줘.

각 이슈 양식:
- 제목: [feat/chore/fix] 한 줄 요약
- 설명: 왜 필요한가 (1~2줄)
- 수락 기준: 체크박스 3~5개 (구체적·검증 가능)
- 예상 시간: 2~4시간
- 의존: 선행 이슈 번호 (있다면)

순서는 Day 1에 시작 가능한 것부터.`}
        />
      </div>
      <div
        className="rounded-xl px-5 py-3 text-sm"
        style={{ background: `${ACCENT2}10`, border: `1px solid ${ACCENT2}40`, color: "#C8C8D8" }}
      >
        💡 다음 6회차에서 이 ISSUES.md를 그대로 Plane.so에 등록하고 첫 머지까지 돌립니다.
      </div>
    </div>
  );
}

function PromptCheatsheetSlide() {
  const cards = [
    {
      symptom: "PRD가 너무 추상적이고 뻔하다",
      label: "구체화",
      prompt: `PRD.md의 "타깃 사용자"가 너무 일반적이야.
페르소나의 어제 하루를 아침 7시부터 자정까지 30분 단위로
시뮬레이션해서 써줘. 그 시뮬레이션 안에서 우리 앱이
정확히 언제·왜 등장하는지 명시.
그리고 그 결과로 핵심 문제 3개를 다시 작성.`,
    },
    {
      symptom: "MVP 기능이 7개 넘는다 (욕심 폭주)",
      label: "압축",
      prompt: `현재 PRD의 핵심 기능을 다음 기준으로 다시 정리해줘.
- 이 기능 빠지면 페르소나의 핵심 가치가 깨지는가? → MVP
- 그 외는 모두 V2 백로그로 분리
최종적으로 MVP 기능 3~5개만 남기고,
잘려나간 기능은 BACKLOG.md에 이유와 함께 보관.`,
    },
    {
      symptom: "화면이 10개 넘어가서 그릴 엄두가 안 난다",
      label: "골든패스",
      prompt: `페르소나가 첫 30초 안에 경험해야 할 핵심 액션 1개를 정해줘.
그 액션을 완수하기까지 거치는 화면만 4개 이하로 추려서
SCREENS.md를 다시 써줘. 나머지 화면은 "Phase 2"로 분리.`,
    },
    {
      symptom: "이슈 1개가 8시간짜리로 보인다",
      label: "분해",
      prompt: `ISSUES.md의 "<이슈 제목>"을 2~4시간 단위 하위 이슈로 쪼개줘.
각 하위 이슈는:
- 단독으로 PR 1개로 머지 가능
- 다른 이슈를 막지 않게 의존 그래프로 표현
- 첫 번째 이슈는 데이터/UI 둘 중 하나만 다루도록`,
    },
    {
      symptom: "AI가 회차마다 다른 답을 준다 (일관성 깨짐)",
      label: "동기화",
      prompt: `방금 PRD.md를 수정했어 (변경사항: <한 줄 설명>).
이 변경에 맞춰 SCREENS.md / ISSUES.md / CLAUDE.md에서
영향받는 부분을 모두 찾아 업데이트해줘.
변경하지 않을 부분은 "유지" 사유와 함께 보고.`,
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: ACCENT }}>05</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#F0F0F5" }}>
          막혔을 때 쓰는 프롬프트 치트시트
        </h2>
        <p className="text-sm mt-1" style={{ color: "#A0A0B0" }}>
          워크숍 중 자주 만나는 5가지 상황 — 그대로 복사해서 사용
        </p>
      </div>
      <div className="flex flex-col gap-2.5">
        {cards.map((c, i) => (
          <div
            key={i}
            className="rounded-xl p-4"
            style={{ background: "#16161A", border: `1px solid ${HIGHLIGHT}30` }}
          >
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span
                className="text-xs font-bold px-2 py-0.5 rounded"
                style={{ background: `${HIGHLIGHT}20`, color: HIGHLIGHT }}
              >
                {c.label}
              </span>
              <span className="text-sm font-semibold" style={{ color: "#F0F0F5" }}>
                {c.symptom}
              </span>
            </div>
            <PromptBlock text={c.prompt} />
          </div>
        ))}
      </div>
      <div
        className="rounded-xl px-5 py-3 text-sm"
        style={{ background: `${ACCENT}10`, border: `1px solid ${ACCENT}40`, color: "#C8C8D8" }}
      >
        💡 모든 프롬프트의 공통 원칙 — <strong style={{ color: "#F0F0F5" }}>현재 파일을 명시</strong>하고, <strong style={{ color: "#F0F0F5" }}>출력 파일을 지정</strong>하고, <strong style={{ color: "#F0F0F5" }}>판단 기준</strong>을 함께 준다.
      </div>
    </div>
  );
}

function GoodVsBadSlide() {
  const bad = [
    "사용자: 일반 사람",
    "기능: SNS 기능, 결제, 푸시, AI 추천 등 다",
    "성공 지표: 많은 사용자가 좋아한다",
    "Out of scope: (없음)",
  ];
  const good = [
    "사용자: 평일 저녁 30분만 쓰는 1인 가구 직장인 (28~35세)",
    "MVP 기능: 냉장고 재료 입력 / 30분 레시피 추천 / 1탭 즐겨찾기 (3개)",
    "성공 지표: 주 3회 이상 앱 진입한 유저 비율 30% / 첫 추천 클릭 70%",
    "Out of scope: SNS 공유, 결제, 영양 분석, 레시피 직접 작성, 알림",
  ];

  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: ACCENT }}>06</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#F0F0F5" }}>
          나쁜 PRD vs 좋은 PRD
        </h2>
        <p className="text-sm mt-1" style={{ color: "#A0A0B0" }}>
          핵심 차이는 단 하나 — <strong style={{ color: "#F0F0F5" }}>구체성</strong>
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-xl p-4" style={{ background: "#16161A", border: "1px solid #F4727630" }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#F47276" }}>
            ❌ 나쁜 PRD
          </p>
          <ul className="flex flex-col gap-2">
            {bad.map((t, i) => (
              <li key={i} className="text-sm flex gap-2" style={{ color: "#C8C8D8" }}>
                <span style={{ color: "#F47276" }}>•</span>{t}
              </li>
            ))}
          </ul>
          <p className="text-xs mt-3 italic" style={{ color: "#F47276" }}>
            → AI가 매번 다른 답을 줌. 끝없이 기능 늘림.
          </p>
        </div>
        <div className="rounded-xl p-4" style={{ background: "#16161A", border: "1px solid #4ADE8030" }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#4ADE80" }}>
            ✅ 좋은 PRD
          </p>
          <ul className="flex flex-col gap-2">
            {good.map((t, i) => (
              <li key={i} className="text-sm flex gap-2" style={{ color: "#C8C8D8" }}>
                <span style={{ color: "#4ADE80" }}>•</span>{t}
              </li>
            ))}
          </ul>
          <p className="text-xs mt-3 italic" style={{ color: "#4ADE80" }}>
            → AI가 같은 답을 일관되게 주고, 코드까지 자동 생성.
          </p>
        </div>
      </div>
    </div>
  );
}

function HomeworkSlide() {
  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: ACCENT }}>07</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#F0F0F5" }}>
          이번 주 과제
        </h2>
      </div>
      <div className="rounded-xl p-6" style={{ background: `${ACCENT}10`, border: `1.5px solid ${ACCENT}40` }}>
        <p className="text-base font-bold mb-4" style={{ color: "#F0F0F5" }}>
          🎯 4개 문서 GitHub 레포에 커밋
        </p>
        <ul className="flex flex-col gap-2.5 text-sm" style={{ color: "#C8C8D8" }}>
          <li className="flex gap-2"><span style={{ color: ACCENT, flexShrink: 0 }}>→</span><code className="font-mono text-xs px-1.5 py-0.5 rounded" style={{ background: "#0D0D0F", color: ACCENT }}>PRD.md</code> — 워크숍 1+2 결과 (페르소나 + 스토리 포함)</li>
          <li className="flex gap-2"><span style={{ color: ACCENT, flexShrink: 0 }}>→</span><code className="font-mono text-xs px-1.5 py-0.5 rounded" style={{ background: "#0D0D0F", color: ACCENT }}>SCREENS.md</code> — 워크숍 3 결과 (화면 + 플로우)</li>
          <li className="flex gap-2"><span style={{ color: ACCENT, flexShrink: 0 }}>→</span><code className="font-mono text-xs px-1.5 py-0.5 rounded" style={{ background: "#0D0D0F", color: ACCENT }}>ISSUES.md</code> — 워크숍 4 결과 (이슈 5개)</li>
          <li className="flex gap-2"><span style={{ color: ACCENT, flexShrink: 0 }}>→</span><code className="font-mono text-xs px-1.5 py-0.5 rounded" style={{ background: "#0D0D0F", color: ACCENT }}>CLAUDE.md</code> — 본인 앱 전용 AI 지시문</li>
          <li className="flex gap-2"><span style={{ color: ACCENT, flexShrink: 0 }}>→</span>완료 인증: GitHub 커밋 링크 슬랙에 공유</li>
        </ul>
      </div>
      <div
        className="rounded-xl p-5"
        style={{ background: "#16161A", border: "1px solid #2E2E38" }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#A0A0B0" }}>
          📍 다음 회차 예고
        </p>
        <p className="text-sm font-semibold" style={{ color: "#F0F0F5" }}>
          6회차 — 워크플로우 완성 (Plane.so 티켓 + PR 머지 루프) · 마일스톤 🎯
        </p>
        <p className="text-xs mt-1" style={{ color: "#A0A0B0" }}>
          오늘 만든 ISSUES.md를 그대로 Plane.so에 등록 → 첫 티켓 PR 머지까지. 이 시점부터 모임은 코워킹 포맷으로 전환됩니다.
        </p>
      </div>
    </div>
  );
}

export default function Session5Page() {
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
      <div className="fixed top-0 left-0 right-0 h-0.5 z-50" style={{ background: "#1E1E28" }}>
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT2})` }}
        />
      </div>

      <div className="fixed top-4 left-4 z-50">
        <a
          href="/"
          className="text-xs px-3 py-1.5 rounded-lg transition-all"
          style={{ background: "#1E1E28", color: "#A0A0B0", border: "1px solid #2E2E38" }}
        >
          ← 커리큘럼으로
        </a>
      </div>

      <div className="fixed top-4 right-4 text-xs z-50" style={{ color: "#A0A0B0" }}>
        {current} / {TOTAL}
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-4xl">
          {slide.type === "cover" && <CoverSlide />}
          {slide.type === "timetable" && <TimetableSlide />}
          {slide.type === "why-prd" && <WhyPrdSlide />}
          {slide.type === "prd-elements" && <PrdElementsSlide />}
          {slide.type === "workshop1-draft" && <Workshop1Slide />}
          {slide.type === "workshop2-persona" && <Workshop2Slide />}
          {slide.type === "workshop3-screens" && <Workshop3Slide />}
          {slide.type === "ai-instructions" && <AiInstructionsSlide />}
          {slide.type === "workshop4-issues" && <Workshop4Slide />}
          {slide.type === "prompt-cheatsheet" && <PromptCheatsheetSlide />}
          {slide.type === "good-vs-bad" && <GoodVsBadSlide />}
          {slide.type === "homework" && <HomeworkSlide />}
        </div>
      </div>

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
                background: i + 1 === current ? ACCENT : "#2E2E38",
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

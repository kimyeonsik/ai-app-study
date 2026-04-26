"use client";

import { useState, useEffect, useCallback } from "react";

const slides = [
  { id: 1, type: "cover" as const },
  { id: 2, type: "timetable" as const },
  { id: 3, type: "why-claude-code" as const },
  { id: 4, type: "install" as const },
  { id: 5, type: "github-setup" as const },
  { id: 6, type: "vercel-setup" as const },
  { id: 7, type: "env-vars" as const },
  { id: 8, type: "pr-flow" as const },
  { id: 9, type: "common-errors" as const },
  { id: 10, type: "homework" as const },
];

const TOTAL = slides.length;

const ACCENT = "#60A5FA";
const ACCENT2 = "#A78BFA";

function CoverSlide() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-8">
      <span
        className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
        style={{ color: ACCENT, border: `1px solid ${ACCENT}`, background: `${ACCENT}15` }}
      >
        4회차
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
        개발 환경 세팅<br />Claude Code · GitHub · Vercel
      </h1>
      <p className="text-lg max-w-xl" style={{ color: "#A0A0B0" }}>
        AI 페어 프로그래밍을 위한 도구 세팅 — 코드 한 줄 안 짜고 PR 하나로 배포까지
      </p>
      <div className="flex flex-wrap gap-3 justify-center mt-2">
        {[
          "Claude Code 설치",
          "GitHub 레포 · 브랜치",
          "Vercel 자동 배포",
          "Preview URL 체험",
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
    { time: "+0:00", label: "도입 — 지난 회차 복습 + 오늘의 목표 안내", dur: "10 min", highlight: false },
    { time: "+0:10", label: "Claude Code란? Cursor와 무엇이 다른가", dur: "15 min", highlight: true },
    { time: "+0:25", label: "Claude Code 설치 · 로그인 · 첫 실행", dur: "20 min", highlight: true },
    { time: "+0:45", label: "GitHub 레포 생성 + 첫 커밋", dur: "20 min", highlight: true },
    { time: "+1:05", label: "☕ 짧은 휴식", dur: "5 min", highlight: false },
    { time: "+1:10", label: "Vercel 연결 + 자동 배포 체험", dur: "20 min", highlight: true },
    { time: "+1:30", label: "환경 변수 다루기 (.env)", dur: "10 min", highlight: true },
    { time: "+1:40", label: "첫 PR 만들기 — Preview URL 체험", dur: "15 min", highlight: true },
    { time: "+1:55", label: "마무리 — 과제 안내 + Q&A", dur: "5 min", highlight: false },
  ];

  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: ACCENT }}>01</p>
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
              border: `1px solid ${row.highlight ? `${ACCENT}40` : "#2E2E38"}`,
              opacity: row.label.includes("휴식") ? 0.6 : 1,
            }}
          >
            <span className="font-mono text-sm shrink-0 min-w-[60px]" style={{ color: ACCENT }}>{row.time}</span>
            <span className="flex-1 text-sm font-medium" style={{ color: "#F0F0F5" }}>{row.label}</span>
            <span className="text-xs shrink-0" style={{ color: "#A0A0B0" }}>{row.dur}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhyClaudeCodeSlide() {
  const points = [
    {
      icon: "💬",
      title: "터미널에서 자연어로 명령",
      desc: "에디터를 따로 열 필요 없이, 프로젝트 폴더에서 'claude' 한 줄이면 시작.",
    },
    {
      icon: "📁",
      title: "프로젝트 전체를 이해",
      desc: "파일 하나가 아니라 레포 전체 맥락을 보고 답한다 — 리팩토링·다파일 작업에 강점.",
    },
    {
      icon: "🔧",
      title: "직접 파일을 읽고 수정",
      desc: "복붙이 사라진다. AI가 Read/Edit/Bash로 직접 작업하고, 사용자는 승인만.",
    },
    {
      icon: "🌳",
      title: "git · 빌드 · 테스트까지 한 번에",
      desc: "Claude가 git 커밋, npm 빌드, 테스트 실행까지 자율적으로 — 사람은 검토만.",
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: ACCENT }}>02</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#F0F0F5" }}>
          왜 Claude Code인가?
        </h2>
        <p className="text-sm mt-1" style={{ color: "#A0A0B0" }}>Cursor · ChatGPT 복붙과 무엇이 다른가</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {points.map((p) => (
          <div
            key={p.title}
            className="rounded-xl p-4"
            style={{ background: "#16161A", border: `1px solid ${ACCENT}30` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{p.icon}</span>
              <span className="font-bold text-sm" style={{ color: "#F0F0F5" }}>{p.title}</span>
            </div>
            <p className="text-sm" style={{ color: "#A0A0B0" }}>{p.desc}</p>
          </div>
        ))}
      </div>
      <div
        className="rounded-xl px-5 py-3 text-sm"
        style={{ background: `${ACCENT}10`, border: `1px solid ${ACCENT}40`, color: "#C8C8D8" }}
      >
        💡 한 줄 요약 — <strong style={{ color: "#F0F0F5" }}>&ldquo;에디터를 안 켠다. 터미널 + AI + git만 있으면 된다.&rdquo;</strong>
      </div>
    </div>
  );
}

function InstallSlide() {
  const steps = [
    {
      step: "1",
      title: "Node.js 설치 확인",
      cmd: "node --version",
      desc: "v18 이상 필요. 안 깔려 있으면 nodejs.org에서 LTS 설치.",
    },
    {
      step: "2",
      title: "Claude Code 설치",
      cmd: "npm install -g @anthropic-ai/claude-code",
      desc: "전역 설치 — 어느 폴더에서든 'claude' 명령어 사용 가능.",
    },
    {
      step: "3",
      title: "프로젝트 폴더에서 첫 실행",
      cmd: "cd ~/my-app\nclaude",
      desc: "처음 실행 시 브라우저로 Anthropic 로그인 (구글/이메일).",
    },
    {
      step: "4",
      title: "동작 확인",
      cmd: "> 이 프로젝트의 폴더 구조를 설명해줘",
      desc: "Claude가 파일을 읽고 답한다 → 정상 동작 확인.",
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: ACCENT }}>03</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#F0F0F5" }}>
          Claude Code 설치 · 첫 실행
        </h2>
        <p className="text-sm mt-1" style={{ color: "#A0A0B0" }}>4단계로 끝 — 다 같이 해봅시다</p>
      </div>
      <div className="flex flex-col gap-3">
        {steps.map((s) => (
          <div
            key={s.step}
            className="rounded-xl p-4 flex gap-4"
            style={{ background: "#16161A", border: "1px solid #2E2E38" }}
          >
            <div
              className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
              style={{ background: `${ACCENT}20`, color: ACCENT }}
            >
              {s.step}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm mb-1" style={{ color: "#F0F0F5" }}>{s.title}</div>
              <pre
                className="text-xs rounded-md px-3 py-2 mb-2 overflow-x-auto font-mono"
                style={{ background: "#0D0D0F", color: ACCENT, border: "1px solid #2E2E38" }}
              >
                {s.cmd}
              </pre>
              <p className="text-xs" style={{ color: "#A0A0B0" }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GithubSetupSlide() {
  const steps = [
    {
      title: "1. 새 레포 만들기",
      desc: "github.com/new — Public, README 체크, .gitignore: Node",
    },
    {
      title: "2. 로컬에 클론",
      desc: "git clone <레포 URL> → cd <폴더명>",
    },
    {
      title: "3. Claude로 첫 작업",
      desc: "claude 실행 → '간단한 Next.js 앱 만들어줘' 같은 자연어 명령",
    },
    {
      title: "4. 커밋 + 푸시",
      desc: "Claude한테 '변경사항 커밋하고 푸시해줘' — 알아서 해줌",
    },
  ];
  const branches = [
    { name: "main", color: "#4ADE80", desc: "항상 배포 가능한 안정 버전" },
    { name: "feat/xxx", color: ACCENT, desc: "새 기능 작업용 — PR로 main에 병합" },
    { name: "fix/xxx", color: "#F472B6", desc: "버그 수정용 — 작업 후 PR" },
  ];

  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: ACCENT }}>04</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#F0F0F5" }}>
          GitHub 레포 + 브랜치 전략
        </h2>
        <p className="text-sm mt-1" style={{ color: "#A0A0B0" }}>버전 관리는 시작부터 — main 보호 + 브랜치 작업</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {steps.map((s) => (
          <div
            key={s.title}
            className="rounded-xl p-4"
            style={{ background: "#16161A", border: "1px solid #2E2E38" }}
          >
            <div className="font-semibold text-sm mb-1.5" style={{ color: "#F0F0F5" }}>{s.title}</div>
            <p className="text-xs" style={{ color: "#A0A0B0" }}>{s.desc}</p>
          </div>
        ))}
      </div>
      <div
        className="rounded-xl p-4"
        style={{ background: "#16161A", border: `1px solid ${ACCENT}30` }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>
          브랜치 컨벤션 (3가지만 외우자)
        </p>
        <div className="flex flex-col gap-2">
          {branches.map((b) => (
            <div key={b.name} className="flex items-center gap-3 text-sm">
              <span
                className="font-mono px-2 py-0.5 rounded text-xs font-semibold shrink-0"
                style={{ background: `${b.color}20`, color: b.color, minWidth: 80, textAlign: "center" }}
              >
                {b.name}
              </span>
              <span style={{ color: "#C8C8D8" }}>{b.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VercelSetupSlide() {
  const steps = [
    { num: "1", text: "vercel.com 가입 (GitHub 계정으로)" },
    { num: "2", text: "Add New → Project → 방금 만든 레포 선택" },
    { num: "3", text: "Framework: Next.js 자동 감지 → Deploy" },
    { num: "4", text: "1~2분 후 *.vercel.app URL 발급 — 끝" },
  ];

  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: ACCENT }}>05</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#F0F0F5" }}>
          Vercel 자동 배포
        </h2>
        <p className="text-sm mt-1" style={{ color: "#A0A0B0" }}>main에 푸시하면 알아서 배포 — 한 번만 연결하면 끝</p>
      </div>
      <div className="flex flex-col gap-2">
        {steps.map((s) => (
          <div
            key={s.num}
            className="flex items-center gap-3 rounded-xl px-4 py-3"
            style={{ background: "#16161A", border: "1px solid #2E2E38" }}
          >
            <div
              className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold"
              style={{ background: `${ACCENT}20`, color: ACCENT }}
            >
              {s.num}
            </div>
            <span className="text-sm" style={{ color: "#F0F0F5" }}>{s.text}</span>
          </div>
        ))}
      </div>
      <div
        className="rounded-xl px-5 py-4"
        style={{ background: `${ACCENT}10`, border: `1px solid ${ACCENT}40` }}
      >
        <p className="text-sm font-semibold mb-2" style={{ color: "#F0F0F5" }}>
          🚀 자동 배포 흐름
        </p>
        <p className="text-sm font-mono" style={{ color: "#C8C8D8" }}>
          git push origin main &nbsp;→&nbsp; Vercel이 감지 &nbsp;→&nbsp; 빌드 &nbsp;→&nbsp; 배포 &nbsp;→&nbsp; 알림
        </p>
        <p className="text-xs mt-2" style={{ color: "#A0A0B0" }}>
          Pull Request를 올리면 별도 Preview URL이 자동 생성됨 → main에 머지하기 전에 확인 가능
        </p>
      </div>
    </div>
  );
}

function EnvVarsSlide() {
  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: ACCENT }}>06</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#F0F0F5" }}>
          환경 변수 (.env)
        </h2>
        <p className="text-sm mt-1" style={{ color: "#A0A0B0" }}>API 키 · 비밀번호는 코드에 직접 쓰지 않는다</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-xl p-4" style={{ background: "#16161A", border: `1px solid ${ACCENT}30` }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>
            왜 .env를 쓰는가
          </p>
          <ul className="flex flex-col gap-2 text-sm" style={{ color: "#C8C8D8" }}>
            <li className="flex gap-2"><span style={{ color: ACCENT }}>→</span>API 키가 GitHub에 노출되면 즉시 도용 위험</li>
            <li className="flex gap-2"><span style={{ color: ACCENT }}>→</span>로컬 / 프로덕션 환경별 다른 값 사용</li>
            <li className="flex gap-2"><span style={{ color: ACCENT }}>→</span>팀원과 코드 공유 시 비밀 정보 분리</li>
          </ul>
        </div>
        <div className="rounded-xl p-4" style={{ background: "#16161A", border: "1px solid #2E2E38" }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#A0A0B0" }}>
            기본 흐름
          </p>
          <ol className="flex flex-col gap-2 text-sm" style={{ color: "#C8C8D8" }}>
            <li>① 로컬: <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ background: "#0D0D0F", color: ACCENT }}>.env.local</code> 파일에 저장</li>
            <li>② <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ background: "#0D0D0F", color: ACCENT }}>.gitignore</code>에 .env* 추가 (자동)</li>
            <li>③ Vercel: 대시보드 → Settings → Env Vars 등록</li>
            <li>④ 다음 배포부터 자동 반영</li>
          </ol>
        </div>
      </div>
      <div
        className="rounded-xl px-5 py-3"
        style={{ background: "#1E1E28", border: "1px solid #F4727630" }}
      >
        <p className="text-sm" style={{ color: "#C8C8D8" }}>
          ⚠️ <strong style={{ color: "#F47276" }}>실수하면 안 되는 것</strong> — API 키를 코드에 적고 GitHub에 푸시. 한 번 푸시되면 git history에 영원히 남음.
        </p>
      </div>
    </div>
  );
}

function PrFlowSlide() {
  const steps = [
    { num: "1", text: "Claude한테 '브랜치 만들고 README 한 줄 추가해줘'" },
    { num: "2", text: "Claude가 git checkout -b feat/xxx + 파일 수정 + 커밋" },
    { num: "3", text: "Claude한테 '푸시하고 PR 올려줘' (gh CLI 사용)" },
    { num: "4", text: "GitHub PR 페이지에 Vercel이 댓글로 Preview URL 남김" },
    { num: "5", text: "URL 클릭 → 배포된 변경사항 확인 → PR 머지" },
    { num: "6", text: "main에 머지되면 production URL이 자동 업데이트" },
  ];

  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: ACCENT }}>07</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#F0F0F5" }}>
          첫 PR 만들기 — Preview URL 체험
        </h2>
        <p className="text-sm mt-1" style={{ color: "#A0A0B0" }}>오늘의 클라이맥스 — Claude한테 시키고 결과를 본다</p>
      </div>
      <div className="flex flex-col gap-2">
        {steps.map((s) => (
          <div key={s.num} className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: "#16161A", border: "1px solid #2E2E38" }}>
            <div
              className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold"
              style={{ background: `${ACCENT}20`, color: ACCENT }}
            >
              {s.num}
            </div>
            <span className="text-sm" style={{ color: "#F0F0F5" }}>{s.text}</span>
          </div>
        ))}
      </div>
      <div
        className="rounded-xl px-5 py-3 text-sm"
        style={{ background: `${ACCENT2}15`, border: `1px solid ${ACCENT2}40`, color: "#C8C8D8" }}
      >
        💡 PR 하나 = 독립된 URL 하나 — 여러 변경사항을 동시에 미리 보고 비교할 수 있다.
      </div>
    </div>
  );
}

function CommonErrorsSlide() {
  const errors = [
    {
      sym: "claude: command not found",
      cause: "전역 설치 안 됐거나 PATH 문제",
      fix: "npm install -g @anthropic-ai/claude-code 다시 실행 → 터미널 재시작",
    },
    {
      sym: "Vercel 빌드 실패 — Module not found",
      cause: "package.json에 의존성 누락",
      fix: "로컬에서 npm install 하고 package-lock.json까지 커밋 후 푸시",
    },
    {
      sym: "환경 변수가 undefined",
      cause: "Vercel 대시보드에 등록 안 했거나 재배포 안 됨",
      fix: "Settings → Env Vars 등록 → Deployments에서 Redeploy",
    },
    {
      sym: "git push가 거부됨 (main 보호)",
      cause: "main 브랜치 직접 푸시 차단 정책",
      fix: "브랜치 만들어서 PR로 머지 — 정상 흐름이니 당황 X",
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: ACCENT }}>08</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#F0F0F5" }}>
          자주 만나는 에러
        </h2>
        <p className="text-sm mt-1" style={{ color: "#A0A0B0" }}>막히면 이 4개부터 의심</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {errors.map((e) => (
          <div key={e.sym} className="rounded-xl p-4" style={{ background: "#16161A", border: "1px solid #2E2E38" }}>
            <p className="font-mono text-xs px-2 py-1 rounded mb-2 inline-block" style={{ background: "#0D0D0F", color: "#F47276", border: "1px solid #F4727630" }}>
              {e.sym}
            </p>
            <p className="text-xs mb-1" style={{ color: "#A0A0B0" }}>
              <strong style={{ color: "#F0F0F5" }}>원인 — </strong>{e.cause}
            </p>
            <p className="text-xs" style={{ color: "#A0A0B0" }}>
              <strong style={{ color: ACCENT }}>해결 — </strong>{e.fix}
            </p>
          </div>
        ))}
      </div>
      <div
        className="rounded-xl px-5 py-3 text-sm"
        style={{ background: `${ACCENT}10`, border: `1px solid ${ACCENT}40`, color: "#C8C8D8" }}
      >
        💡 에러 메시지 그대로 Claude에 붙여넣고 &ldquo;이 에러 어떻게 해결?&rdquo; 물어보면 90%는 답이 나온다.
      </div>
    </div>
  );
}

function HomeworkSlide() {
  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: ACCENT }}>09</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#F0F0F5" }}>
          이번 주 과제
        </h2>
      </div>
      <div
        className="rounded-xl p-6"
        style={{ background: `${ACCENT}10`, border: `1.5px solid ${ACCENT}40` }}
      >
        <p className="text-base font-bold mb-4" style={{ color: "#F0F0F5" }}>
          🎯 GitHub 레포 + Vercel 자동 배포 연결
        </p>
        <ul className="flex flex-col gap-2.5 text-sm" style={{ color: "#C8C8D8" }}>
          <li className="flex gap-2"><span style={{ color: ACCENT, flexShrink: 0 }}>→</span>Claude Code 설치 + 정상 동작 확인</li>
          <li className="flex gap-2"><span style={{ color: ACCENT, flexShrink: 0 }}>→</span>GitHub 레포 생성 + 첫 커밋</li>
          <li className="flex gap-2"><span style={{ color: ACCENT, flexShrink: 0 }}>→</span>Vercel 연결 → *.vercel.app URL 발급 받기</li>
          <li className="flex gap-2"><span style={{ color: ACCENT, flexShrink: 0 }}>→</span>브랜치 → PR → Preview URL 한 번 체험</li>
          <li className="flex gap-2"><span style={{ color: ACCENT, flexShrink: 0 }}>→</span>완료 인증: 발급받은 *.vercel.app URL 슬랙에 공유</li>
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
          5회차 — 내 앱 기획 (PRD + AI 지시문 작성) · 워크숍 포맷
        </p>
        <p className="text-xs mt-1" style={{ color: "#A0A0B0" }}>
          만들고 싶은 앱 한 줄 → 풀 PRD → 화면 목록 → 이슈 5개까지, 다 같이 손으로 만들어봅니다.
        </p>
      </div>
    </div>
  );
}

export default function Session4Page() {
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
          {slide.type === "why-claude-code" && <WhyClaudeCodeSlide />}
          {slide.type === "install" && <InstallSlide />}
          {slide.type === "github-setup" && <GithubSetupSlide />}
          {slide.type === "vercel-setup" && <VercelSetupSlide />}
          {slide.type === "env-vars" && <EnvVarsSlide />}
          {slide.type === "pr-flow" && <PrFlowSlide />}
          {slide.type === "common-errors" && <CommonErrorsSlide />}
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

"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { curriculum, MILESTONE_SESSIONS, type Phase, type Session } from "@/lib/curriculum-data";

function AssignmentRow({
  emoji,
  label,
  text,
}: {
  emoji: string;
  label: string;
  text: string;
}) {
  return (
    <div className="flex gap-2 text-sm">
      <span className="shrink-0">{emoji}</span>
      <span style={{ color: "#A0A0B0" }}>
        <span className="font-medium" style={{ color: "#F0F0F5" }}>
          {label}
        </span>{" "}
        {text}
      </span>
    </div>
  );
}

function SessionCard({
  session,
  phaseColor,
}: {
  session: Session;
  phaseColor: string;
}) {
  const isMilestone = MILESTONE_SESSIONS.includes(session.number);

  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-4 transition-all"
      style={{
        background: isMilestone ? "#1A1A24" : "#16161A",
        border: isMilestone
          ? `1.5px solid ${phaseColor}50`
          : "1px solid #2E2E38",
        boxShadow: isMilestone ? `0 0 20px ${phaseColor}18` : undefined,
      }}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div
          className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
          style={{
            background: isMilestone ? phaseColor : `${phaseColor}20`,
            color: isMilestone ? "#0D0D0F" : phaseColor,
          }}
        >
          {session.number}
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="font-semibold text-base leading-snug"
            style={{ color: "#F0F0F5" }}
          >
            {session.title}
          </h3>
          {isMilestone && (
            <span
              className="inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ background: `${phaseColor}25`, color: phaseColor }}
            >
              마일스톤
            </span>
          )}
        </div>
      </div>

      {/* Content list */}
      <ul className="flex flex-col gap-1.5 pl-1">
        {session.content.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <span style={{ color: phaseColor, marginTop: 2 }}>•</span>
            <span style={{ color: "#C8C8D8" }}>{item}</span>
          </li>
        ))}
      </ul>

      {/* Note */}
      {session.note && (
        <p
          className="text-xs rounded-lg px-3 py-2"
          style={{ background: "#1E1E24", color: "#A0A0B0" }}
        >
          💡 {session.note}
        </p>
      )}

      {/* Assignments */}
      {(session.assignment.beginner ||
        session.assignment.junior ||
        session.assignment.advanced) && (
        <div
          className="flex flex-col gap-2 rounded-lg px-3 py-3"
          style={{ background: "#1E1E28", borderTop: "1px solid #2E2E38" }}
        >
          <p className="text-xs font-semibold" style={{ color: "#A0A0B0" }}>
            과제
          </p>
          {session.assignment.beginner && (
            <AssignmentRow
              emoji="🟢"
              label="비개발자"
              text={session.assignment.beginner}
            />
          )}
          {session.assignment.junior && (
            <AssignmentRow
              emoji="🟡"
              label="주니어"
              text={session.assignment.junior}
            />
          )}
          {session.assignment.advanced && (
            <AssignmentRow
              emoji="🔴"
              label="심화"
              text={session.assignment.advanced}
            />
          )}
        </div>
      )}
    </div>
  );
}

function PhaseTab({ phase }: { phase: Phase }) {
  return (
    <TabsContent value={`phase-${phase.id}`} className="mt-0">
      <div className="flex flex-col gap-4">
        {/* Phase header */}
        <div
          className="flex items-center gap-3 rounded-xl px-5 py-4"
          style={{ background: "#16161A", border: "1px solid #2E2E38" }}
        >
          <div
            className="w-3 h-3 rounded-full shrink-0"
            style={{ background: phase.color }}
          />
          <div>
            <h2 className="font-semibold text-lg" style={{ color: "#F0F0F5" }}>
              Phase {phase.id} — {phase.name}
            </h2>
            <p className="text-sm" style={{ color: "#A0A0B0" }}>
              {phase.sessions}
            </p>
          </div>
        </div>

        {/* Sessions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {phase.items.map((session) => (
            <SessionCard
              key={session.number}
              session={session}
              phaseColor={phase.color}
            />
          ))}
        </div>
      </div>
    </TabsContent>
  );
}

export default function Home() {
  const totalSessions = curriculum.reduce(
    (sum, phase) => sum + phase.items.length,
    0
  );

  return (
    <div className="min-h-screen" style={{ background: "#0D0D0F" }}>
      <main className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mb-12 text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium mb-6"
            style={{ background: "#1E1E24", color: "#A78BFA" }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "#A78BFA" }}
            />
            모집 중
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
            style={{ color: "#F0F0F5" }}
          >
            AI로 앱 만들기 모임
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto mb-8"
            style={{ color: "#A0A0B0" }}
          >
            AI 도구로 실제 앱을 만들어보는 소모임. 기획부터 배포, AI 기능
            통합까지 — 5개월 동안 함께 만들어갑니다.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: "총 회차", value: `${totalSessions}회차` },
              { label: "기간", value: "약 5개월" },
              { label: "모집 인원", value: "6~8명" },
              { label: "주기", value: "주 1회" },
              { label: "마일스톤", value: "3회" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center rounded-xl px-6 py-4 min-w-[100px]"
                style={{ background: "#16161A", border: "1px solid #2E2E38" }}
              >
                <span
                  className="text-2xl font-bold"
                  style={{ color: "#7C6FF7" }}
                >
                  {stat.value}
                </span>
                <span className="text-sm mt-1" style={{ color: "#A0A0B0" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Phase overview */}
        <div className="mb-8">
          <h2
            className="text-sm font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#A0A0B0" }}
          >
            전체 커리큘럼 구성
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {curriculum.map((phase) => (
              <div
                key={phase.id}
                className="rounded-xl px-4 py-3 text-center"
                style={{ background: "#16161A", border: `1px solid ${phase.color}30` }}
              >
                <div
                  className="w-2 h-2 rounded-full mx-auto mb-2"
                  style={{ background: phase.color }}
                />
                <p
                  className="text-xs font-semibold leading-tight mb-1"
                  style={{ color: "#F0F0F5" }}
                >
                  {phase.name}
                </p>
                <p className="text-xs" style={{ color: "#A0A0B0" }}>
                  {phase.sessions}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="phase-1">
          <TabsList
            className="flex flex-wrap h-auto gap-1 p-1.5 mb-6 w-full"
            style={{ background: "#16161A", border: "1px solid #2E2E38" }}
          >
            {curriculum.map((phase) => (
              <TabsTrigger
                key={phase.id}
                value={`phase-${phase.id}`}
                className="flex items-center gap-1.5 text-sm rounded-lg px-3 py-1.5 transition-all data-[state=active]:text-[#F0F0F5]"
                style={
                  {
                    "--phase-color": phase.color,
                  } as React.CSSProperties
                }
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: phase.color }}
                />
                <span className="hidden sm:inline">
                  Phase {phase.id} —{" "}
                </span>
                {phase.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {curriculum.map((phase) => (
            <PhaseTab key={phase.id} phase={phase} />
          ))}
        </Tabs>

        {/* Legend */}
        <div
          className="mt-10 rounded-xl px-5 py-4 flex flex-wrap gap-6 items-center"
          style={{ background: "#16161A", border: "1px solid #2E2E38" }}
        >
          <p className="text-sm font-semibold" style={{ color: "#A0A0B0" }}>
            과제 레벨
          </p>
          {[
            { emoji: "🟢", label: "비개발자", desc: "코딩 경험 없어도 OK" },
            { emoji: "🟡", label: "주니어", desc: "기초 코딩 가능" },
            { emoji: "🔴", label: "심화", desc: "실무 경험 보유" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span>{item.emoji}</span>
              <span className="text-sm font-medium" style={{ color: "#F0F0F5" }}>
                {item.label}
              </span>
              <span className="text-sm" style={{ color: "#A0A0B0" }}>
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

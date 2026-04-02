"use client";

import { useState, useEffect } from "react";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { curriculum } from "@/lib/curriculum-data";

const ADMIN_PASSWORD = "1234";

type Member = { id: string; name: string };
type SessionRecord = { id: string; sessionNum: number; date: string; attendances: Record<string, boolean> };

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);

  const [members, setMembers] = useState<Member[]>([]);
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [newMemberName, setNewMemberName] = useState("");
  const [activeSession, setActiveSession] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"sessions" | "members">("sessions");

  // 모든 회차 번호
  const allSessionNums = curriculum.flatMap((p) => p.items.map((s) => s.number));

  useEffect(() => {
    if (!authed) return;

    // 멤버 실시간
    const unsubMembers = onSnapshot(collection(db, "members"), (snap) => {
      setMembers(snap.docs.map((d) => ({ id: d.id, name: d.data().name as string })));
    });

    // 세션 기록 실시간
    const unsubSessions = onSnapshot(collection(db, "sessions"), (snap) => {
      setSessions(
        snap.docs.map((d) => ({
          id: d.id,
          sessionNum: d.data().sessionNum as number,
          date: d.data().date as string,
          attendances: (d.data().attendances as Record<string, boolean>) || {},
        }))
      );
    });

    return () => {
      unsubMembers();
      unsubSessions();
    };
  }, [authed]);

  function handleLogin() {
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  }

  async function addMember() {
    const name = newMemberName.trim();
    if (!name) return;
    const id = `member_${Date.now()}`;
    await setDoc(doc(db, "members", id), { name, createdAt: serverTimestamp() });
    setNewMemberName("");
  }

  async function removeMember(id: string) {
    if (!confirm("멤버를 삭제할까요?")) return;
    await deleteDoc(doc(db, "members", id));
  }

  function getSession(num: number): SessionRecord | undefined {
    return sessions.find((s) => s.sessionNum === num);
  }

  async function saveSession(num: number, date: string, attendances: Record<string, boolean>) {
    setSaving(true);
    const id = `session_${num}`;
    await setDoc(doc(db, "sessions", id), {
      sessionNum: num,
      date,
      attendances,
      updatedAt: serverTimestamp(),
    });
    setSaving(false);
  }

  function getSessionTitle(num: number) {
    for (const phase of curriculum) {
      const s = phase.items.find((i) => i.number === num);
      if (s) return s.title;
    }
    return "";
  }

  // ── 로그인 화면 ──
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0D0D0F" }}>
        <div className="w-full max-w-sm flex flex-col gap-4 px-6">
          <h1 className="text-2xl font-bold text-center" style={{ color: "#F0F0F5" }}>관리자</h1>
          <input
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="rounded-xl px-4 py-3 text-sm outline-none"
            style={{
              background: "#16161A",
              border: pwError ? "1px solid #F87171" : "1px solid #2E2E38",
              color: "#F0F0F5",
            }}
          />
          {pwError && <p className="text-xs text-center" style={{ color: "#F87171" }}>비밀번호가 틀렸어요</p>}
          <button
            onClick={handleLogin}
            className="rounded-xl px-4 py-3 text-sm font-semibold transition-all hover:opacity-80"
            style={{ background: "#A78BFA", color: "#0D0D0F" }}
          >
            로그인
          </button>
        </div>
      </div>
    );
  }

  // ── 관리자 대시보드 ──
  return (
    <div className="min-h-screen" style={{ background: "#0D0D0F" }}>
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold" style={{ color: "#F0F0F5" }}>관리자 대시보드</h1>
          <a href="/" className="text-xs px-3 py-1.5 rounded-lg" style={{ background: "#1E1E28", color: "#A0A0B0", border: "1px solid #2E2E38" }}>
            ← 사이트로
          </a>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["sessions", "members"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: tab === t ? "#A78BFA" : "#16161A",
                color: tab === t ? "#0D0D0F" : "#A0A0B0",
                border: "1px solid #2E2E38",
              }}
            >
              {t === "sessions" ? "📅 회차 기록" : "👥 멤버 관리"}
            </button>
          ))}
        </div>

        {/* ── 회차 기록 탭 ── */}
        {tab === "sessions" && (
          <div className="flex flex-col gap-3">
            {allSessionNums.map((num) => {
              const record = getSession(num);
              const isOpen = activeSession === num;
              const title = getSessionTitle(num);

              return (
                <div
                  key={num}
                  className="rounded-xl overflow-hidden"
                  style={{ background: "#16161A", border: "1px solid #2E2E38" }}
                >
                  {/* Row */}
                  <button
                    onClick={() => setActiveSession(isOpen ? null : num)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                        style={{ background: "#A78BFA20", color: "#A78BFA" }}
                      >
                        {num}
                      </span>
                      <div>
                        <p className="text-sm font-medium" style={{ color: "#F0F0F5" }}>{title}</p>
                        {record?.date && (
                          <p className="text-xs mt-0.5" style={{ color: "#A0A0B0" }}>{record.date}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {record?.date && (
                        <span className="text-xs" style={{ color: "#A0A0B0" }}>
                          {Object.values(record.attendances).filter(Boolean).length}/{members.length}명
                        </span>
                      )}
                      <span style={{ color: "#A0A0B0" }}>{isOpen ? "▲" : "▼"}</span>
                    </div>
                  </button>

                  {/* Expanded */}
                  {isOpen && (
                    <SessionEditor
                      sessionNum={num}
                      record={record}
                      members={members}
                      saving={saving}
                      onSave={saveSession}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── 멤버 관리 탭 ── */}
        {tab === "members" && (
          <div className="flex flex-col gap-4">
            {/* 추가 */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="멤버 이름"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addMember()}
                className="flex-1 rounded-xl px-4 py-3 text-sm outline-none"
                style={{ background: "#16161A", border: "1px solid #2E2E38", color: "#F0F0F5" }}
              />
              <button
                onClick={addMember}
                className="px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
                style={{ background: "#4ADE80", color: "#0D0D0F" }}
              >
                추가
              </button>
            </div>

            {/* 목록 */}
            <div className="flex flex-col gap-2">
              {members.length === 0 && (
                <p className="text-sm text-center py-8" style={{ color: "#A0A0B0" }}>멤버가 없어요</p>
              )}
              {members.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between rounded-xl px-5 py-4"
                  style={{ background: "#16161A", border: "1px solid #2E2E38" }}
                >
                  <span className="text-sm font-medium" style={{ color: "#F0F0F5" }}>{m.name}</span>
                  <button
                    onClick={() => removeMember(m.id)}
                    className="text-xs px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
                    style={{ background: "#F8717120", color: "#F87171", border: "1px solid #F8717130" }}
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SessionEditor({
  sessionNum,
  record,
  members,
  saving,
  onSave,
}: {
  sessionNum: number;
  record: SessionRecord | undefined;
  members: Member[];
  saving: boolean;
  onSave: (num: number, date: string, attendances: Record<string, boolean>) => Promise<void>;
}) {
  const [date, setDate] = useState(record?.date ?? "");
  const [attendances, setAttendances] = useState<Record<string, boolean>>(record?.attendances ?? {});

  function toggle(id: string) {
    setAttendances((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  async function handleSave() {
    await onSave(sessionNum, date, attendances);
  }

  return (
    <div className="px-5 pb-5 flex flex-col gap-4" style={{ borderTop: "1px solid #2E2E38" }}>
      {/* 날짜 */}
      <div className="flex flex-col gap-1.5 pt-4">
        <label className="text-xs font-semibold" style={{ color: "#A0A0B0" }}>모임 날짜</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-xl px-4 py-2.5 text-sm outline-none w-fit"
          style={{ background: "#0D0D0F", border: "1px solid #2E2E38", color: "#F0F0F5" }}
        />
      </div>

      {/* 출석 */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold" style={{ color: "#A0A0B0" }}>출석 체크</label>
        {members.length === 0 && (
          <p className="text-xs" style={{ color: "#A0A0B0" }}>먼저 멤버를 추가해주세요</p>
        )}
        <div className="flex flex-wrap gap-2">
          {members.map((m) => {
            const checked = !!attendances[m.id];
            return (
              <button
                key={m.id}
                onClick={() => toggle(m.id)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  background: checked ? "#4ADE8020" : "#1E1E28",
                  color: checked ? "#4ADE80" : "#A0A0B0",
                  border: checked ? "1px solid #4ADE8040" : "1px solid #2E2E38",
                }}
              >
                {checked ? "✓ " : ""}{m.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 저장 */}
      <button
        onClick={handleSave}
        disabled={saving || !date}
        className="self-start px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80 disabled:opacity-40"
        style={{ background: "#A78BFA", color: "#0D0D0F" }}
      >
        {saving ? "저장 중..." : "저장"}
      </button>
    </div>
  );
}

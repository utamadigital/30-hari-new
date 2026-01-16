"use client";

import React, { useEffect, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, KeyRound, Lock, Printer, Sparkles } from "lucide-react";
import Container from "@/components/Container";
import BottomSheetModal from "@/components/landing/BottomSheetModal";
import {
  ACCESS_CODE_STORAGE_KEY,
  ACCESS_STORAGE_KEY,
  type AccessTier,
  type LearningType,
  getTierLimits,
  tierFromCode,
  tierLabel,
} from "@/lib/calendarAccess";
import { AGE_GROUPS, getDayPlan } from "@/lib/calendarCurriculum";

type MaybeTier = AccessTier | null;

const START_DATE_STORAGE_KEY = "cal60.startDate";
const progressStorageKey = (ageGroupId: string, type: LearningType) => `cal60.done.${ageGroupId}.${type}`;

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function readStoredTier(): MaybeTier {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(ACCESS_STORAGE_KEY);
    if (!raw) return null;
    if (raw === "BASIC" || raw === "PROGRAM_30" || raw === "FULL") return raw;
    return null;
  } catch {
    return null;
  }
}

function readStoredCode(): string {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(ACCESS_CODE_STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function persistTier(tier: MaybeTier, code: string) {
  if (typeof window === "undefined") return;
  try {
    if (!tier) {
      window.localStorage.removeItem(ACCESS_STORAGE_KEY);
      window.localStorage.removeItem(ACCESS_CODE_STORAGE_KEY);
      return;
    }
    window.localStorage.setItem(ACCESS_STORAGE_KEY, tier);
    window.localStorage.setItem(ACCESS_CODE_STORAGE_KEY, code);
  } catch {
    // ignore
  }
}

function readStoredStartDate(): string {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(START_DATE_STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function persistStartDate(isoDate: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(START_DATE_STORAGE_KEY, isoDate);
  } catch {
    // ignore
  }
}

function readStoredDone(ageGroupId: string, type: LearningType): Record<number, true> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(progressStorageKey(ageGroupId, type));
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    const arr: number[] = Array.isArray(parsed) ? parsed : [];
    const map: Record<number, true> = {};
    for (const n of arr) {
      if (Number.isFinite(n) && n >= 1 && n <= 60) map[Math.trunc(n)] = true;
    }
    return map;
  } catch {
    return {};
  }
}

function persistDone(ageGroupId: string, type: LearningType, doneMap: Record<number, true>) {
  if (typeof window === "undefined") return;
  try {
    const list = Object.keys(doneMap)
      .map((k) => Number(k))
      .filter((n) => Number.isFinite(n) && n >= 1 && n <= 60)
      .sort((a, b) => a - b);
    window.localStorage.setItem(progressStorageKey(ageGroupId, type), JSON.stringify(list));
  } catch {
    // ignore
  }
}

function isoToday(): string {
  const d = new Date();
  // Use local date (not UTC) to avoid off-by-one in Asia/Jakarta
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function toISODateLocal(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function formatShortDate(date: Date): string {
  try {
    return new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "short" }).format(date);
  } catch {
    return `${date.getDate()}/${date.getMonth() + 1}`;
  }
}

function formatLongDate(date: Date): string {
  try {
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "short",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch {
    return date.toDateString();
  }
}

function addDaysISO(startISO: string, add: number): Date {
  const [y, m, d] = startISO.split("-").map((x) => Number(x));
  // Use local time to match user expectations when printing
  const base = new Date(y || new Date().getFullYear(), (m ? m - 1 : 0), d || 1);
  base.setDate(base.getDate() + add);
  return base;
}

function TypePill({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-extrabold ring-1",
        active
          ? "bg-slate-900 text-white ring-slate-900"
          : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50",
      )}
    >
      {active ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
      {label}
    </button>
  );
}

export default function Calendar60Client() {
  const [tier, setTier] = useState<MaybeTier>(null);
  const [code, setCode] = useState<string>("");

  const [ageGroupId, setAgeGroupId] = useState<string>(AGE_GROUPS[1]?.id ?? "5-6");
  const [learningType, setLearningType] = useState<LearningType>("islami");

  const [startDate, setStartDate] = useState<string>(isoToday());
  const [done, setDone] = useState<Record<number, true>>({});

  const [openDay, setOpenDay] = useState<number | null>(null);
  const [openLocked, setOpenLocked] = useState<{ day: number; reason: string } | null>(null);
  const [openCode, setOpenCode] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);

  const todayISO = useMemo(() => isoToday(), []);

  useEffect(() => {
    const t = readStoredTier();
    const c = readStoredCode();
    setTier(t);
    setCode(c);

    const storedStart = readStoredStartDate();
    setStartDate(storedStart || isoToday());
  }, []);

  // load done-map when age/type changes
  useEffect(() => {
    setDone(readStoredDone(ageGroupId, learningType));
  }, [ageGroupId, learningType]);

  // persist start date
  useEffect(() => {
    if (!startDate) return;
    persistStartDate(startDate);
  }, [startDate]);

  // persist done-map
  useEffect(() => {
    persistDone(ageGroupId, learningType, done);
  }, [done, ageGroupId, learningType]);

  const limits = useMemo(() => {
    if (!tier) {
      return { unlockedDays: 0, types: [] as LearningType[] };
    }
    return getTierLimits(tier);
  }, [tier]);

  // pastikan learningType valid untuk tier saat ini
  useEffect(() => {
    if (!limits.types.length) {
      setLearningType("islami");
      return;
    }
    if (!limits.types.includes(learningType)) {
      setLearningType(limits.types[0]!);
    }
  }, [limits.types, learningType]);

  const days = useMemo(() => Array.from({ length: 60 }, (_, i) => i + 1), []);

  const unlockedDayCount = useMemo(() => {
    if (!tier) return 0;
    if (!isTypeUnlocked(learningType)) return 0;
    return Math.min(60, limits.unlockedDays);
  }, [tier, limits.unlockedDays, learningType]);

  const completedCount = useMemo(() => {
    const maxDay = unlockedDayCount;
    let c = 0;
    for (const k of Object.keys(done)) {
      const d = Number(k);
      if (Number.isFinite(d) && d >= 1 && d <= maxDay) c++;
    }
    return c;
  }, [done, unlockedDayCount]);

  const progressPercent = useMemo(() => {
    if (!unlockedDayCount) return 0;
    return Math.max(0, Math.min(100, Math.round((completedCount / unlockedDayCount) * 100)));
  }, [completedCount, unlockedDayCount]);

  const lastCompletedDay = useMemo(() => {
    const maxDay = unlockedDayCount;
    let last = 0;
    for (const k of Object.keys(done)) {
      const d = Number(k);
      if (Number.isFinite(d) && d >= 1 && d <= maxDay) last = Math.max(last, d);
    }
    return last;
  }, [done, unlockedDayCount]);

  function scrollToDay(day: number) {
    if (typeof window === "undefined") return;
    const el = document.getElementById(`day-${day}`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function isDayUnlocked(day: number) {
    return day <= limits.unlockedDays;
  }

  function isTypeUnlocked(type: LearningType) {
    return limits.types.includes(type);
  }

  function onClickDay(day: number) {
    if (!tier) {
      setOpenLocked({ day, reason: "Kalender belum diaktivasi. Masukkan kode untuk membuka." });
      return;
    }

    if (!isTypeUnlocked(learningType)) {
      setOpenLocked({
        day,
        reason:
          learningType === "bonus"
            ? "Fitur Bonus hanya terbuka di paket Full Pendampingan."
            : "Tipe ini belum terbuka di paket kamu.",
      });
      return;
    }

    if (!isDayUnlocked(day)) {
      const need = tier === "BASIC" ? "Program 30 Hari" : tier === "PROGRAM_30" ? "Full Pendampingan" : "paket di atas";
      setOpenLocked({
        day,
        reason:
          tier === "FULL"
            ? "Hari ini seharusnya sudah terbuka."
            : `Hari ${day} terkunci untuk paket kamu. Untuk membuka sampai hari ${day}, kamu perlu upgrade ke ${need}.`,
      });
      return;
    }

    setOpenDay(day);
  }

  function isDayDone(day: number) {
    return !!done[day];
  }

  function toggleDayDone(day: number) {
    // Only allow marking unlocked items as done
    if (!tier) return;
    if (!isTypeUnlocked(learningType)) return;
    if (!isDayUnlocked(day)) return;

    setDone((prev) => {
      const next = { ...prev };
      if (next[day]) delete next[day];
      else next[day] = true;
      return next;
    });
  }

  function onSubmitCode() {
    const t = tierFromCode(codeInput);
    if (!t) {
      setCodeError("Kode tidak valid. Cek lagi ya 🙂");
      return;
    }
    setCodeError(null);
    setTier(t);
    setCode(codeInput.trim());
    persistTier(t, codeInput.trim());
    setOpenCode(false);
  }

  function onResetAccess() {
    setTier(null);
    setCode("");
    persistTier(null, "");
  }

  const selectedAge = AGE_GROUPS.find((a) => a.id === ageGroupId) ?? AGE_GROUPS[0]!;

  const headerPill = tier ? tierLabel(tier) : "Belum aktivasi (masukkan kode)";

  return (
    <main className="min-h-screen bg-slate-50">
      {/* PRINT STYLES */}
      <style jsx global>{`
        .print-only {
          display: none;
        }
        @media print {
          .no-print {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
          body {
            background: white !important;
          }
          .print-card {
            box-shadow: none !important;
          }
          .print-grid {
            gap: 8px !important;
          }
          .print-day {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>

      <div className="no-print border-b border-slate-200 bg-white">
        <Container>
          <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
                <CalendarDays className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-extrabold text-slate-900">Kalender Belajar 60 Hari</p>
                <p className="mt-0.5 text-xs text-slate-600">
                  Pilih umur & tipe belajar. Hari yang terkunci akan blur.
                </p>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-700">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  {headerPill}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setOpenCode(true)}
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-emerald-600 px-3 text-xs font-extrabold text-white shadow-sm hover:bg-emerald-700"
              >
                <KeyRound className="h-4 w-4" />
                Masukkan Kode
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-extrabold text-slate-800 shadow-sm hover:bg-slate-50"
              >
                <Printer className="h-4 w-4" />
                Print
              </button>

              {tier ? (
                <button
                  type="button"
                  onClick={onResetAccess}
                  className="inline-flex h-10 items-center rounded-xl border border-slate-200 bg-white px-3 text-xs font-extrabold text-slate-600 hover:bg-slate-50"
                >
                  Reset
                </button>
              ) : null}
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-5 sm:py-7">
          {/* Print header */}
          <div className="print-only mb-4 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-base font-black text-slate-900">Kalender Belajar 60 Hari</p>
                <p className="mt-0.5 text-xs font-semibold text-slate-700">
                  Umur: <span className="font-extrabold">{selectedAge.label}</span> • Tipe: <span className="font-extrabold">{learningType.toUpperCase()}</span>
                </p>
                <p className="mt-0.5 text-xs text-slate-600">Mulai: {startDate ? formatLongDate(addDaysISO(startDate, 0)) : "-"}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-extrabold text-slate-900">Progress</p>
                <p className="mt-0.5 text-sm font-black text-slate-900">{completedCount}/{unlockedDayCount} ({progressPercent}%)</p>
                <p className="mt-0.5 text-[11px] font-semibold text-slate-500">Akses: {headerPill}</p>
              </div>
            </div>

            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full bg-emerald-600" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          {/* Controls */}
          <div className="no-print grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid gap-3 md:grid-cols-3 md:items-end">
              {/* Age */}
              <div>
                <label className="text-xs font-extrabold text-slate-800">Pilih umur</label>
                <select
                  value={ageGroupId}
                  onChange={(e) => setAgeGroupId(e.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-slate-300"
                >
                  {AGE_GROUPS.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.label} — {a.hint}
                    </option>
                  ))}
                </select>

                <label className="mt-3 block text-xs font-extrabold text-slate-800">Mulai tanggal</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-slate-300"
                />
                <p className="mt-1 text-[11px] font-semibold text-slate-500">
                  Tanggal otomatis terisi (hari ini) dan disimpan di browser.
                </p>
              </div>

              {/* Type */}
              <div className="md:col-span-2">
                <p className="text-xs font-extrabold text-slate-800">Tipe belajar</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <TypePill
                    active={learningType === "islami"}
                    label="Islami"
                    onClick={() => setLearningType("islami")}
                  />
                  <TypePill
                    active={learningType === "umum"}
                    label="Umum"
                    onClick={() => setLearningType("umum")}
                  />
                  <TypePill
                    active={learningType === "bonus"}
                    label="Bonus"
                    onClick={() => setLearningType("bonus")}
                  />

                  <div className="ml-auto flex items-center gap-2 text-[11px] font-semibold text-slate-600">
                    <span className={cn("inline-flex items-center gap-1", isTypeUnlocked(learningType) ? "text-emerald-700" : "text-slate-500")}>
                      {isTypeUnlocked(learningType) ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                      {isTypeUnlocked(learningType) ? "Tipe terbuka" : "Tipe terkunci"}
                    </span>
                  </div>
                </div>

                {!tier ? (
                  <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-900">
                    Masukkan kode dulu untuk membuka kalender (Basic/Program/Full).
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Progress (screen) */}
          <div className="no-print mt-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-xs font-extrabold text-slate-900">Progress belajar</p>
                <p className="mt-0.5 text-[11px] font-semibold text-slate-600">
                  {completedCount}/{unlockedDayCount} hari selesai • {progressPercent}%
                </p>
              </div>
              <div className="text-[11px] font-semibold text-slate-500">
                {startDate ? `Mulai ${formatShortDate(addDaysISO(startDate, 0))}` : ""}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                if (lastCompletedDay > 0) scrollToDay(lastCompletedDay);
              }}
              className={cn(
                "mt-3 block h-2 w-full overflow-hidden rounded-full bg-slate-100",
                lastCompletedDay > 0 ? "cursor-pointer" : "cursor-default",
              )}
              aria-label="Scroll ke hari terakhir yang sudah dicentang"
              title={lastCompletedDay > 0 ? `Ke hari ${lastCompletedDay}` : undefined}
            >
              <div className="h-full bg-emerald-600" style={{ width: `${progressPercent}%` }} />
            </button>
          </div>

          {/* Calendar grid */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 print-grid">
            {days.map((day) => {
              const unlocked = tier ? isDayUnlocked(day) && isTypeUnlocked(learningType) : false;
              const plan = getDayPlan({ day, ageGroupId: selectedAge.id, type: learningType });
              const date = startDate ? addDaysISO(startDate, day - 1) : null;
              const doneDay = unlocked && isDayDone(day);
              const isToday = !!date && toISODateLocal(date) === todayISO;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => onClickDay(day)}
                  id={`day-${day}`}
                  className={cn(
                    "print-day relative overflow-hidden rounded-2xl border bg-white p-3 text-left shadow-sm transition",
                    unlocked
                      ? "border-slate-200 hover:-translate-y-0.5 hover:shadow-md"
                      : "border-slate-200/70",
                    isToday && unlocked ? "ring-2 ring-emerald-200" : "",
                  )}
                >
                  {/* top */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[11px] font-extrabold text-slate-500">HARI</p>
                      <p className="text-2xl font-black text-slate-900">{day}</p>
                      <p className="mt-0.5 text-[11px] font-semibold text-slate-600">{date ? formatShortDate(date) : ""}</p>
                    </div>
                    {unlocked ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleDayDone(day);
                        }}
                        aria-label={doneDay ? "Tandai belum selesai" : "Tandai selesai"}
                        className="group absolute right-3 top-3 z-10 rounded-xl print:hidden"
                        title={doneDay ? "Sudah selesai" : "Belum selesai"}
                      >
                        <div
                          className={cn(
                            "inline-flex h-9 w-9 items-center justify-center rounded-xl transition-transform duration-150 group-active:scale-95",
                            doneDay
                              ? "bg-emerald-500 text-white shadow-sm"
                              : "bg-slate-100 text-slate-400 hover:bg-slate-200",
                          )}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                      </button>
                    ) : (
                      <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                        <Lock className="h-4 w-4" />
                      </div>
                    )}
                  </div>

                  <div className={cn("mt-2", unlocked ? "" : "blur-[2px] opacity-60")}> 
                    <p className="line-clamp-2 text-[12px] font-extrabold text-slate-900">{plan.title}</p>
                    <p className="mt-1 text-[11px] font-semibold text-slate-600">{plan.focus}</p>
                  </div>

                  {!unlocked ? (
                    <div className="absolute inset-0 flex items-end justify-start p-3">
                      <div className="rounded-xl bg-slate-900/80 px-2.5 py-1.5 text-[10px] font-extrabold text-white">
                        Terkunci
                      </div>
                    </div>
                  ) : null}

                  {/* (removed) big checkbox button bottom-right to avoid covering text */}
                </button>
              );
            })}
          </div>

          {/* Print note */}
          <div className="mt-5 text-center text-[11px] font-semibold text-slate-500">
            Tip: untuk print rapi, gunakan mode <span className="font-extrabold">Landscape</span> dan skala 90–100%.
          </div>
        </div>
      </Container>

      {/* Day detail */}
      <BottomSheetModal
        open={openDay !== null}
        onClose={() => setOpenDay(null)}
        title={openDay ? `Hari ${openDay}` : "Hari"}
        subtitle={openDay ? `Umur ${selectedAge.label} • Tipe ${learningType.toUpperCase()}` : undefined}
      >
        {openDay ? (
          <div>
            {(() => {
              const plan = getDayPlan({ day: openDay, ageGroupId: selectedAge.id, type: learningType });
              return (
                <div className="space-y-6">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6 shadow-sm print-card">
                    <p className="text-sm font-extrabold text-slate-900">{plan.title}</p>
                    <p className="mt-1 text-xs text-slate-600">{plan.subtitle}</p>
                    <p className="mt-3 text-xs font-semibold text-slate-700">{plan.focus}</p>
                  </div>

                  <div className="no-print rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-extrabold text-slate-900">Checklist</p>
                        <p className="mt-1 text-[11px] font-semibold text-slate-600">
                          {startDate ? `Tanggal: ${formatLongDate(addDaysISO(startDate, openDay - 1))}` : ""}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleDayDone(openDay)}
                        className={cn(
                          "inline-flex h-11 items-center gap-2 rounded-xl border px-4 text-sm font-extrabold shadow-sm",
                          isDayDone(openDay)
                            ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                            : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50",
                        )}
                      >
                        <CheckCircle2 className={cn("h-4 w-4", isDayDone(openDay) ? "opacity-100" : "opacity-50")} />
                        {isDayDone(openDay) ? "Sudah selesai" : "Tandai selesai"}
                      </button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6 shadow-sm">
                    <p className="text-xs font-extrabold text-slate-900">Panduan cepat</p>
                    <ul className="mt-2 space-y-2 text-sm text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-emerald-700">✓</span>
                        <span>Durasi singkat 10–20 menit. Berhenti saat anak mulai lelah.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-emerald-700">✓</span>
                        <span>Ulang 1 halaman yang sama jika anak masih butuh penguatan.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-emerald-700">✓</span>
                        <span>Berikan pujian spesifik ("rapi", "fokus", "hebat mencoba").</span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
                    <p className="text-xs font-extrabold text-slate-900">Resource</p>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      {plan.resources.map((r) => (
                        <div key={r.label} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                          <p className="text-xs font-extrabold text-slate-900">{r.label}</p>
                          <p className="mt-0.5 text-[11px] font-semibold text-slate-600">{r.note}</p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 text-[11px] text-slate-500">
                      Catatan: halaman ini belum menautkan file otomatis—kita bisa sambungkan ke file PDF asli kalau kamu mau.
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>
        ) : null}
      </BottomSheetModal>

      {/* Locked modal */}
      <BottomSheetModal
        open={openLocked !== null}
        onClose={() => setOpenLocked(null)}
        title={openLocked ? `Hari ${openLocked.day} terkunci` : "Terkunci"}
        subtitle={tier ? `Paket kamu: ${tierLabel(tier)}` : "Belum aktivasi"}
      >
        {openLocked ? (
          <div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
            <p className="text-sm font-extrabold text-slate-900">Akses dibatasi</p>
              <p className="mt-2 text-sm text-slate-700">{openLocked.reason}</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpenLocked(null);
                    setOpenCode(true);
                  }}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 text-sm font-extrabold text-white shadow-sm hover:bg-emerald-700"
                >
                  <KeyRound className="h-4 w-4" />
                  Masukkan Kode
                </button>
                <button
                  type="button"
                  onClick={() => setOpenLocked(null)}
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-extrabold text-slate-800 shadow-sm hover:bg-slate-50"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </BottomSheetModal>

      {/* Code modal */}
      <BottomSheetModal
        open={openCode}
        onClose={() => {
          setOpenCode(false);
          setCodeError(null);
          setCodeInput("");
        }}
        title="Aktivasi Akses"
        subtitle="Masukkan kode untuk membuka paket Basic / Program 30 / Full"
      >
        <div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
          <p className="text-sm font-extrabold text-slate-900">Kode akses</p>
            <p className="mt-1 text-xs text-slate-600">
              Kode dipakai untuk mengidentifikasi paket yang dibeli.
            </p>

            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <input
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                placeholder="Contoh: BASIC7 / PROG30 / FULL60"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-slate-300"
              />
              <button
                type="button"
                onClick={onSubmitCode}
                className="inline-flex h-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-extrabold text-white shadow-sm hover:bg-slate-800"
              >
                Aktifkan
              </button>
            </div>

            {codeError ? (
              <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-900">
                {codeError}
              </div>
            ) : null}

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-semibold text-slate-700">
              <p className="font-extrabold">Akses saat ini:</p>
              <p className="mt-1">{tier ? `${tierLabel(tier)} (kode: ${code || "-"})` : "Belum aktivasi"}</p>
              <p className="mt-2 text-slate-500">
                Catatan: kamu bisa ganti daftar kode di file <span className="font-mono">src/lib/calendarAccess.ts</span>.
              </p>
            </div>
          </div>
        </div>
      </BottomSheetModal>
    </main>
  );
}

"use client";

import React, { useEffect, useMemo, useState } from "react";

type DayItem = {
  icon: string;
  title: string;
  folderLabel: string;
  href?: string; // link opsional (bisa kosong)
};

const DAYS: DayItem[] = [
  { icon: "🎨", title: "Latihan Mewarnai", folderLabel: "Folder: Mewarnai", href: "" },
  { icon: "🅰️", title: "Mengenal Alfabet", folderLabel: "Folder: Seri Alfabet", href: "" },
  { icon: "🕌", title: "Huruf Hijaiyah", folderLabel: "Folder: Huruf Hijaiyah", href: "" },
  { icon: "⭐", title: "Rukun Iman & Islam", folderLabel: "Folder: Rukun Iman", href: "" },
  { icon: "🐯", title: "Mengenal Hewan", folderLabel: "Folder: Seri Hewan", href: "" },

  { icon: "🧎‍♂️", title: "Sholat & Wudhu", folderLabel: "Folder: Sholat Wudhu", href: "" },
  { icon: "🙏", title: "Doa-doa Pendek", folderLabel: "Folder: Doa Pendek", href: "" },
  { icon: "👍", title: "Perbuatan Terpuji", folderLabel: "Folder: Perbuatan Terpuji", href: "" },
  { icon: "🥦", title: "Seri Sayuran", folderLabel: "Folder: Seri Sayuran", href: "" },
  { icon: "🌙", title: "Kalimat Thayyibah", folderLabel: "Folder: Kalimat Thayyibah", href: "" },

  { icon: "➕", title: "Seri Berhitung", folderLabel: "Folder: Seri Berhitung", href: "" },
  { icon: "1️⃣", title: "Angka Bhs. Arab", folderLabel: "Folder: Angka Arab", href: "" },
  { icon: "⏰", title: "Mengenal Waktu", folderLabel: "Folder: Mengenal Waktu", href: "" },
  { icon: "📖", title: "Mengenal Harakat", folderLabel: "Folder: Mengenal Harakat", href: "" },
  { icon: "🚗", title: "Seri Kendaraan", folderLabel: "Folder: Seri Kendaraan", href: "" },

  { icon: "☁️", title: "Asmaul Husna", folderLabel: "Folder: Asmaul Husna", href: "" },
  { icon: "🧔", title: "Nabi dan Rasul", folderLabel: "Folder: Nabi & Rasul", href: "" },
  { icon: "🧑‍🏫", title: "Seri Profesi", folderLabel: "Folder: Seri Profesi", href: "" },
  { icon: "🍱", title: "Makanan Halal", folderLabel: "Folder: Makanan Halal", href: "" },
  { icon: "📜", title: "Surat Pendek", folderLabel: "Folder: Surat Pendek", href: "" },

  { icon: "👼", title: "Nama Malaikat", folderLabel: "Folder: Nama Malaikat", href: "" },
  { icon: "🏫", title: "Mengenal Tempat", folderLabel: "Folder: Mengenal Tempat", href: "" },
  { icon: "🗓️", title: "Hari Besar & Bulan", folderLabel: "Folder: Hari Besar Islam", href: "" },
  { icon: "🧹", title: "Najis & Kebersihan", folderLabel: "Folder: Najis dalam Islam", href: "" },
  { icon: "📣", title: "Hadits Pendek", folderLabel: "Folder: Hadits Pendek", href: "" },

  { icon: "🍽️", title: "Belajar Puasa", folderLabel: "Folder: Puasa", href: "" },
  { icon: "🕋", title: "Haji dan Umroh", folderLabel: "Folder: Haji Umroh", href: "" },
  { icon: "✨", title: "Sifat-sifat Allah", folderLabel: "Folder: Sifat Allah", href: "" },
  { icon: "⚖️", title: "Surga & Neraka", folderLabel: "Folder: Surga Neraka", href: "" },
  { icon: "🏆", title: "LULUS! (Hadiah)", folderLabel: "Bebas Pilih Mainan", href: "" },
];

const STORAGE_KEY = "lp_kal30_done_v2";

function fmtShortID(date: Date) {
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  const dd = String(date.getDate()).padStart(2, "0");
  return `${dd} ${months[date.getMonth()]}`;
}

function themeClass(dayNum: number) {
  const themes = [
    "border-blue-300 bg-blue-50",
    "border-purple-300 bg-purple-50",
    "border-emerald-300 bg-emerald-50",
    "border-amber-300 bg-amber-50",
    "border-rose-300 bg-rose-50",
  ];
  if (dayNum === 30) return "border-yellow-300 bg-yellow-50";
  return themes[(dayNum - 1) % themes.length];
}

function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window !== "undefined") {
    }

    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/50 p-4"
      onMouseDown={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="w-full max-w-md rounded-3xl bg-white p-4 shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default function BonusCalendar30Days() {
  const [childName, setChildName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [mainTarget, setMainTarget] = useState<string>("");

  // Mobile: tampilkan preview dulu agar tidak kepanjangan
  const [showAllDays, setShowAllDays] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (isDesktop) setShowAllDays(true);
  }, []);

  const [doneMap, setDoneMap] = useState<Record<number, boolean>>({});
  const [activeDay, setActiveDay] = useState<number | null>(null);

  // load state
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setDoneMap(JSON.parse(raw));
    } catch {}
  }, []);

  // save state
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(doneMap));
    } catch {}
  }, [doneMap]);

  const doneCount = useMemo(() => Object.keys(doneMap).length, [doneMap]);

  const dateLabels = useMemo(() => {
    if (!startDate) return Array(30).fill("");
    const base = new Date(`${startDate}T00:00:00`);
    return Array.from({ length: 30 }, (_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      return fmtShortID(d);
    });
  }, [startDate]);

  const active = activeDay ? DAYS[activeDay - 1] : null;
  const activeDone = activeDay ? !!doneMap[activeDay] : false;

  function toggleDay(dayNum: number) {
    setDoneMap((prev) => {
      const next = { ...prev };
      if (next[dayNum]) delete next[dayNum];
      else next[dayNum] = true;
      return next;
    });
  }

  function resetAll() {
    const ok = window.confirm("Reset semua centang 30 hari?");
    if (!ok) return;
    setDoneMap({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-b from-emerald-50 to-white p-5 shadow-[0_18px_45px_rgba(2,6,23,.08)]">
        <div className="pointer-events-none absolute -right-20 -top-28 h-64 w-64 rotate-12 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,.25),rgba(16,185,129,0)_60%)]" />

        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 md:text-xl">
              Peta Belajar Pintar 30 Hari
            </h2>
            <p className="mt-2 text-sm font-semibold text-emerald-800">
              Klik kartu untuk centang progres. (Nama / tanggal / target boleh dikosongkan.)
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-extrabold text-slate-800">
            ✅ Progress: <span className="text-emerald-700">{doneCount}/30</span>
          </div>
        </div>

        {/* Inputs (default kosong) */}
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-extrabold text-slate-700">👧 Nama anak (opsional)</p>
            <input
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="Contoh: Aisha"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-extrabold text-slate-700">📅 Tanggal mulai (opsional)</p>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-extrabold text-slate-700">🎯 Target utama (opsional)</p>
            <textarea
              value={mainTarget}
              onChange={(e) => setMainTarget(e.target.value)}
              placeholder="Contoh: 1 huruf hijaiyah + 1 doa pendek per hari"
              className="mt-2 min-h-[48px] w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={resetAll}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-extrabold text-slate-800 shadow-sm hover:bg-slate-50 active:scale-[0.98] sm:text-sm"
          >
            ↺ Reset Centang
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-xs font-extrabold text-white shadow-sm hover:bg-emerald-700 active:scale-[0.98] sm:text-sm"
          >
            🖨️ Print A4
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm print:shadow-none">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
          <p className="text-sm font-extrabold text-slate-900">
            Peta 30 Hari — klik kartu untuk detail
          </p>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-extrabold text-slate-700">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,.12)]" />
            {doneCount} selesai
          </div>


<button
  type="button"
  onClick={() => setShowAllDays((v) => !v)}
  className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-extrabold text-slate-700 shadow-sm hover:bg-slate-50"
>
  {showAllDays ? "Tutup (ringkas)" : "Lihat 30 hari penuh"}
</button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {(showAllDays ? DAYS : DAYS.slice(0, 8)).map((d, idx) => {
            const dayNum = idx + 1;
            const isDone = !!doneMap[dayNum];
            const theme = themeClass(dayNum);

            return (
              <button
                key={dayNum}
                type="button"
                onClick={() => setActiveDay(dayNum)}
                className={[
                  "relative flex min-h-[118px] flex-col items-center justify-center gap-2 rounded-2xl border-2 p-4 text-center transition hover:shadow-md active:scale-[0.99]",
                  theme,
                  isDone ? "saturate-[1.02]" : "",
                ].join(" ")}
              >
                <div className="absolute -left-2.5 -top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-blue-700 text-xs font-extrabold text-white shadow-[0_10px_20px_rgba(2,6,23,.18)]">
                  {dayNum}
                </div>

                <div className="text-[22px] leading-none">{d.icon}</div>
                <p className="text-xs font-extrabold text-slate-900">{d.title}</p>

                <p className="rounded-full border border-slate-200/90 bg-white/70 px-2.5 py-1 text-[11px] font-semibold italic text-slate-600">
                  {d.folderLabel}
                </p>

                {startDate ? (
                  <p className="text-[11px] font-bold text-slate-500">
                    {dateLabels[idx]}
                  </p>
                ) : null}

                {/* visual done indicator */}
                <div
                  className={[
                    "mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 bg-white/60",
                    isDone ? "border-emerald-400 bg-emerald-500/10" : "border-slate-400/80",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "h-2.5 w-2.5 rotate-[-45deg] border-b-[3px] border-l-[3px] transition",
                      isDone ? "border-emerald-600 opacity-100" : "border-transparent opacity-0",
                    ].join(" ")}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <Modal open={activeDay !== null} onClose={() => setActiveDay(null)}>
        {activeDay && active ? (
          <div className="p-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-extrabold text-slate-800">
                  Hari {activeDay}
                  {startDate ? (
                    <span className="font-bold text-slate-500">
                      • {dateLabels[activeDay - 1]}
                    </span>
                  ) : null}
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <div className="text-3xl leading-none">{active.icon}</div>
                  <div>
                    <p className="text-base font-extrabold text-slate-900">{active.title}</p>
                    <p className="mt-1 text-sm font-semibold italic text-slate-600">
                      {active.folderLabel}
                    </p>
                  </div>
                </div>

                {(childName || mainTarget) ? (
                  <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-3">
                    <p className="text-xs font-extrabold text-slate-700">Info</p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {childName ? <>Nama: <span className="font-extrabold text-slate-900">{childName}</span><br/></> : null}
                      {mainTarget ? <>Target utama: <span className="font-extrabold text-slate-900">{mainTarget}</span></> : null}
                    </p>
                  </div>
                ) : null}
              </div>

              <button
                type="button"
                onClick={() => setActiveDay(null)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                aria-label="Tutup"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => {
                  toggleDay(activeDay);
                }}
                className={[
                  "inline-flex h-11 items-center justify-center rounded-xl px-4 text-xs font-extrabold shadow-sm active:scale-[0.98]",
                  activeDone
                    ? "border border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                    : "bg-emerald-600 text-white hover:bg-emerald-700",
                ].join(" ")}
              >
                {activeDone ? "✅ Sudah selesai (klik untuk batal)" : "✅ Tandai Selesai"}
              </button>

              <a
                href={active.href || "#"}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => {
                  if (!active.href) e.preventDefault();
                }}
                className={[
                  "inline-flex h-11 items-center justify-center rounded-xl border px-4 text-xs font-extrabold shadow-sm active:scale-[0.98]",
                  active.href
                    ? "border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
                    : "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400",
                ].join(" ")}
              >
                🔗 {active.href ? "Buka Folder/Link" : "Link belum diisi"}
              </a>
            </div>

            <p className="mt-3 text-[11px] text-slate-500">
              *Kamu bisa isi setiap <code>href</code> dengan link file/folder drive/gumroad/zip index sesuai struktur produk.
            </p>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
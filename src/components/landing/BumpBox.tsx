"use client";

import { useId, useState } from "react";
import { Check, Sparkles, X } from "lucide-react";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={[
        "h-4 w-4 transition-transform duration-200",
        open ? "rotate-180" : "rotate-0",
      ].join(" ")}
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.19l3.71-3.96a.75.75 0 1 1 1.1 1.02l-4.25 4.53a.75.75 0 0 1-1.1 0L5.21 8.25a.75.75 0 0 1 .02-1.04Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const BONUS_FOLDERS = [
  "Alphabet",
  "Bugs",
  "Cats",
  "Emotion",
  "Food",
  "Fruit",
  "Kids coloring",
  "Preschool",
  "Sports",
  "Unicorn",
];

function formatIDR(n: number) {
  return new Intl.NumberFormat("id-ID").format(n);
}

export default function BumpBox({
  enabled,
  checked,
  onChange,
  bumpPrice,
}: {
  enabled: boolean;
  checked: boolean;
  onChange: (next: boolean) => void;
  bumpPrice: number;
}) {
  const detailsId = useId();
  const modalTitleId = useId();
  const [open, setOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const stopLabelToggle = (e: React.MouseEvent | React.KeyboardEvent) => {
    // Tombol/aksi di dalam <label> jangan ikut toggle checkbox
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <>
      <div
        className={[
          "rounded-2xl border p-4 transition-colors",
          enabled
            ? checked
              ? "border-emerald-200 bg-emerald-50"
              : "border-slate-200 bg-white"
            : "border-slate-200 bg-white opacity-60",
        ].join(" ")}
      >
        <label
          className={[
            "flex items-start gap-3",
            enabled ? "cursor-pointer" : "cursor-not-allowed",
          ].join(" ")}
        >
          <input
            type="checkbox"
            checked={enabled ? checked : false}
            disabled={!enabled}
            onChange={(e) => onChange(e.target.checked)}
            className="mt-1 h-4 w-4 accent-emerald-600"
          />

          <div className="min-w-0 flex-1">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-slate-900/5 px-2.5 py-1 text-[11px] font-extrabold text-slate-800 ring-1 ring-slate-200">
                BUMP (OPSIONAL)
              </span>

              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-extrabold text-amber-800 ring-1 ring-amber-200">
                <Sparkles className="h-3.5 w-3.5" />
                Anak lebih betah belajar
              </span>
            </div>

            {/* Headline */}
            <p className="mt-2 text-sm font-extrabold text-slate-900">
              Tambahkan Paket Aktivitas Lengkap
            </p>

            {/* Subcopy */}
            <p className="mt-1 text-xs text-slate-600">
              Bonus ini{" "}
              <span className="font-semibold text-slate-900">langsung ikut terbuka</span>{" "}
              setelah pembayaran berhasil.
            </p>

            {/* Benefits */}
          

            {/* Actions: expand + popup */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              

              <button
                type="button"
                onClick={(e) => {
                  stopLabelToggle(e);
                  setShowPopup(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") stopLabelToggle(e);
                }}
                className="inline-flex items-center rounded-xl bg-emerald-700/10 px-3 py-2 text-xs font-extrabold text-emerald-800 ring-1 ring-emerald-200 hover:bg-emerald-700/15 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              >
                Lihat isi bonus (popup)
              </button>
            </div>

            {/* Expand details */}
            <div
              id={detailsId}
              className={[
                "overflow-hidden transition-[max-height,opacity] duration-300",
                open ? "mt-4 max-h-[1200px] opacity-100" : "max-h-0 opacity-0",
              ].join(" ")}
            >
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-bold text-slate-700">
                    📁 Tema folder worksheet umum:
                  </p>
                  <span className="inline-flex items-center rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200">
                    Total: 10 tema
                  </span>
                </div>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {BONUS_FOLDERS.map((name) => (
                    <div
                      key={name}
                      className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800"
                    >
                      <span className="text-slate-500">📁</span>
                      <span className="min-w-0 truncate">{name}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-3 text-[11px] text-slate-500">
                  *Bonus ini worksheet tema sehari-hari untuk variasi aktivitas anak.
                </p>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="shrink-0 text-right">
            <p className="text-sm font-extrabold text-slate-900">
              + Rp {formatIDR(bumpPrice)}
            </p>
            <p className="mt-0.5 text-[11px] text-slate-500">opsional</p>
          </div>
        </label>
      </div>

      {/* Popup */}
      {showPopup ? (
        <div className="fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-slate-900/40"
            onClick={() => setShowPopup(false)}
            aria-hidden="true"
          />

          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={modalTitleId}
              className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p
                    id={modalTitleId}
                    className="text-base font-extrabold text-slate-900"
                  >
                    Isi Lengkap Bonus
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    Bonus ini ikut terbuka setelah pembayaran berhasil.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
                  aria-label="Tutup"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4">
                <p className="text-sm font-extrabold text-slate-900">
                  📁 10 Folder Worksheet Umum
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  {BONUS_FOLDERS.map((name) => (
                    <div
                      key={name}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800"
                    >
                      {name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-sm font-extrabold text-slate-900">
                  🗓 Planner 30 Hari Anak
                </p>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-[2px] inline-flex h-5 w-5 items-center justify-center rounded-full bg-white ring-1 ring-emerald-200">
                      <Check className="h-3.5 w-3.5 text-emerald-700" strokeWidth={3} />
                    </span>
                    <span>Versi HTML (bisa dicentang & simpan progres)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[2px] inline-flex h-5 w-5 items-center justify-center rounded-full bg-white ring-1 ring-emerald-200">
                      <Check className="h-3.5 w-3.5 text-emerald-700" strokeWidth={3} />
                    </span>
                    <span>Versi PDF siap cetak (A4 landscape)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[2px] inline-flex h-5 w-5 items-center justify-center rounded-full bg-white ring-1 ring-emerald-200">
                      <Check className="h-3.5 w-3.5 text-emerald-700" strokeWidth={3} />
                    </span>
                    <span>Panduan 10–20 menit per hari (no ribet)</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => setShowPopup(false)}
                className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl bg-slate-900 text-sm font-extrabold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
              >
                Oke, paham
              </button>

              <p className="mt-2 text-center text-[11px] text-slate-500">
                *Produk bonus berupa file digital (siap print).
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

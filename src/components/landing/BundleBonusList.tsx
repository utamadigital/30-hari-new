"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Gift } from "lucide-react";

export default function BundleBonusList() {
  const items = useMemo(
    () => [
      "Seri Alphabet",
      "Seri Benda di Sekitar Kita",
      "Seri Berhitung",
      "Seri Buah-buahan",
      "Seri Dinosaurus",
      "Seri Hewan",
      "Seri Kendaraan",
      "Seri Mengenal Tempat",
      "Seri Mengenal Tubuh",
      "Seri Mengenal Waktu",
      "Seri Profesi",
      "Seri Sayur-sayuran",
    ],
    []
  );

  const [open, setOpen] = useState(false);
  const preview = items.slice(0, 4);
  const rest = items.length - preview.length;

  return (
    <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-emerald-700 px-3 py-1 text-[11px] font-extrabold text-white">
              Khusus Paket Bundle
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[11px] font-bold text-slate-800 ring-1 ring-emerald-200">
              <Gift className="h-3.5 w-3.5 text-emerald-700" />
              Bonus 12 tema
            </span>
          </div>

          <p className="mt-2 text-sm font-extrabold text-slate-900">
            Bonus Bundle: Seri Aktivitas Tambahan
          </p>
          <p className="mt-1 text-xs text-slate-700">
            Tambah variasi aktivitas biar anak nggak cepat bosan. Semua siap print.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-2 text-xs font-extrabold text-emerald-800 shadow-sm hover:bg-emerald-50"
          aria-expanded={open}
        >
          {open ? "Tutup" : "Lihat"}
          <ChevronDown className={["h-4 w-4 transition-transform", open ? "rotate-180" : ""].join(" ")} />
        </button>
      </div>

      {!open && (
        <div className="mt-3 flex flex-wrap gap-2">
          {preview.map((t) => (
            <span
              key={t}
              className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-emerald-200"
            >
              {t}
            </span>
          ))}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-extrabold text-amber-900 ring-1 ring-amber-200 hover:bg-amber-100"
          >
            +{rest} tema lainnya
          </button>
        </div>
      )}

      <div
        className={[
          "grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out",
          open ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0",
        ].join(" ")}
      >
        <div className="min-h-0">
          <div className="grid gap-2 sm:grid-cols-2">
            {items.map((t) => (
              <div
                key={t}
                className="rounded-xl bg-white px-3 py-2 text-xs font-semibold text-slate-800 ring-1 ring-emerald-200"
              >
                {t}
              </div>
            ))}
          </div>

          <p className="mt-3 text-[11px] text-slate-600">
            Bonus ini hanya muncul kalau pilih <span className="font-bold">Bundle</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

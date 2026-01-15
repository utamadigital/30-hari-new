"use client";

import { useMemo, useState } from "react";
import { ChevronDown, FileText, Layers } from "lucide-react";
import BottomSheetModal from "./BottomSheetModal";

type Props = {
  className?: string;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200">
      {children}
    </span>
  );
}

function Item({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-slate-700">
      <span className="mt-[3px] text-emerald-700">✓</span>
      <span className="leading-relaxed">{children}</span>
    </li>
  );
}

export default function BundleContentsBox({ className }: Props) {
  const [show, setShow] = useState(false);

  const umumSeries = useMemo(
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

  const umumPreview = umumSeries.slice(0, 4);
  const umumRest = umumSeries.slice(4);

  return (
    <div
      className={cn(
        "mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-emerald-700 px-3 py-1 text-[11px] font-extrabold text-white">
              ISI PAKET BUNDLE
            </span>
            <span className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-emerald-800 ring-1 ring-emerald-200">
              2 paket dalam 1 checkout
            </span>
          </div>

          <p className="mt-2 text-sm font-extrabold text-slate-900">
            Paket Islami (1.000+ lembar) + Umum 1.200+ lembar
          </p>
          <p className="mt-1 text-xs text-slate-700">
            Ini <span className="font-bold">bukan bonus</span> — memang{" "}
            <span className="font-bold">isi Paket Bundle</span> supaya variasi
            aktivitas lebih banyak.
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <Pill>PDF • Siap cetak A4</Pill>
            <Pill>Akses instan</Pill>
            <Pill>Print ulang seumur hidup</Pill>
          </div>
        </div>

        {/* tombol Detail -> modal (mobile-safe) */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation(); // penting biar ga ikut select plan
            setShow(true);
          }}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-extrabold text-emerald-800 shadow-sm ring-1 ring-emerald-200 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        >
          Detail
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {/* Ringkas (selalu terlihat) */}
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
              <FileText className="h-5 w-5 text-emerald-700" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-extrabold text-slate-900">
                Paket Islami 1.000+ lembar
              </p>
              <p className="mt-0.5 text-xs text-slate-600">
                Fokus utama: hijaiyah, harakat, doa harian, wudhu, adab.
              </p>
            </div>
          </div>
          <ul className="mt-3 space-y-2">
            <Item>Aktivitas anak (tracing, matching, mewarnai, puzzle ringan)</Item>
            <Item>Materi kebiasaan baik & ibadah sederhana</Item>
            <Item>Siap cetak A4</Item>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
              <Layers className="h-5 w-5 text-emerald-700" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-extrabold text-slate-900">
                Worksheet Umum — 12 seri
              </p>
              <p className="mt-0.5 text-xs text-slate-600">
                Pelengkap variasi aktivitas (biar anak nggak cepat bosan).
              </p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {umumPreview.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200"
              >
                {t}
              </span>
            ))}
            <span className="inline-flex items-center rounded-full bg-slate-900/5 px-2.5 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200">
              +{umumRest.length} seri lainnya
            </span>
          </div>
        </div>
      </div>

      {/* Modal Detail (mobile bottom sheet) */}
      <BottomSheetModal
        open={show}
        onClose={() => setShow(false)}
        title="Detail 12 Seri Worksheet Umum"
        subtitle="Cocok untuk selingan aktivitas harian setelah sesi Islami. Total lebih dari 1.200 lembar."
        zIndexClassName="z-[110]"
      >
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="grid gap-2 sm:grid-cols-2">
            {umumSeries.map((t) => (
              <div
                key={t}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
              >
                {t}
              </div>
            ))}
          </div>

          <p className="mt-3 text-[11px] text-slate-500">
            Tips: pilih 1–2 seri untuk "pemanasan" atau penutup sesi agar anak tetap anteng.
          </p>
        </div>
      </BottomSheetModal>
    </div>
  );
}

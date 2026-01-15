
"use client";

import Container from "@/components/Container";
import React from "react";
import BonusCalendar30Days from "./BonusCalendar30Days";


export default function Program30DaysSection({ ctaHref = "#pricing" }: { ctaHref?: string }) {
  return (
    <section id="program-30-hari" className="pt-10">
      <Container>
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm sm:p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200">
                ⭐ INTI PRODUK (Bukan bonus)
              </span>
              <h2 className="mt-3 text-2xl font-extrabold text-slate-900 md:text-3xl">
                Peta Belajar Pintar 30 Hari — anak tinggal ikuti, orang tua tidak pusing
              </h2>
              <p className="mt-2 text-sm text-slate-700 md:text-base">
                Setiap hari sudah ada tema & aktivitas. Target <strong>10–20 menit/hari</strong>. Tanpa gadget.
                Cocok untuk membangun kebiasaan belajar islami yang ringan tapi konsisten.
              </p>
            </div>

            <a
              href={ctaHref}
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-emerald-600 text-sm font-extrabold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.99]"
            >
              Pilih Paket & Mulai Program
            </a>
          </div>

          <div className="mt-6">
            <BonusCalendar30Days />
          </div>

          <div className="mt-4 rounded-2xl border border-emerald-200 bg-white p-4 text-sm text-slate-700">
            <strong className="text-slate-900">Cara pakai super simpel:</strong>{" "}
            Pilih tema hari ini → print worksheet → kerjakan 10–20 menit → centang progres. Besok lanjut.
          </div>
        </div>
      </Container>
    </section>
  );
}
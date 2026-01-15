"use client";

import Container from "@/components/Container";

export default function BonusSection({ ctaHref = "#pricing" }: { ctaHref?: string }) {
  return (
    <section className="py-14">
  <Container>
<div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200">
              🧰 TOOLS PENDUKUNG
            </span>
            <h2 className="mt-3 text-xl font-extrabold text-slate-900 md:text-2xl">
              Biar rutinitas makin konsisten
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Tambahan alat bantu biar program 30 hari lebih gampang dijalankan di rumah (tanpa ribet).
            </p>
          </div>

          <a
            href={ctaHref}
            className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-extrabold text-slate-900 shadow-sm transition hover:bg-slate-50 active:scale-[0.99] whitespace-nowrap"
          >
            Lihat Paket
          </a>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-extrabold text-slate-900">Reward Chart Anak</p>
            <p className="mt-1 text-sm text-slate-700">
              Bantu anak konsisten dengan checklist harian.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-extrabold text-slate-900">20 Ide Aktivitas Tanpa Gadget</p>
            <p className="mt-1 text-sm text-slate-700">
              Ide aktivitas ringan 10–20 menit di rumah.
            </p>
          </div>
        </div>
      </div>
  </Container>
</section>
  );
}
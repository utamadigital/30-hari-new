"use client";

import Image from "next/image";
import Container from "@/components/Container";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PreviewItem = {
  title: string;
  note: string;
  badge?: string;
  images: string[];
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function Slider({
  images,
  altBase,
}: {
  images: string[];
  altBase: string;
}) {
  const [idx, setIdx] = useState(0);
  const total = images.length;

  const canNav = total > 1;

  const prev = () => setIdx((v) => (v - 1 + total) % total);
  const next = () => setIdx((v) => (v + 1) % total);

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
        {/* Portrait-ish aspect for A4 preview feel */}
        <div className="relative aspect-[3/4] w-full">
          <div
            className="absolute inset-0 flex h-full w-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${idx * 100}%)` }}
          >
            {images.map((src, i) => (
              <div key={src + i} className="relative h-full w-full shrink-0">
                <Image
                  src={src}
                  alt={`${altBase} – contoh ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px"
                  className="object-contain"
                  priority={false}
                />
              </div>
            ))}
          </div>

          {/* Nav buttons (desktop hover) */}
          {canNav && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Sebelumnya"
                className="absolute left-2 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/90 p-2 text-slate-700 shadow-sm hover:bg-white lg:flex"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Berikutnya"
                className="absolute right-2 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/90 p-2 text-slate-700 shadow-sm hover:bg-white lg:flex"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}

          {/* Counter badge */}
          <div className="absolute left-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200">
            {idx + 1}/{total}
          </div>

          {/* Mobile hint */}
          {canNav && (
            <div className="absolute right-2 top-2 rounded-full bg-slate-900/70 px-2.5 py-1 text-[11px] font-semibold text-white lg:hidden">
              Ketuk Titik
            </div>
          )}
        </div>
      </div>

      {/* Dots */}
      {canNav && (
        <div className="mt-2 flex items-center justify-center gap-1.5">
          {images.map((_, i) => {
            const active = i === idx;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`Ke contoh ${i + 1}`}
                className={[
                  "h-2 w-2 rounded-full transition",
                  active ? "bg-emerald-600" : "bg-slate-300 hover:bg-slate-400",
                ].join(" ")}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function PreviewSection() {
  const PREVIEWS: PreviewItem[] = useMemo(
    () => [
      {
        title: "Hijaiyah Tracing",
        note: "Motorik halus + dasar membaca",
        badge: "⭐ Favorit anak",
        images: [
          "/halaman/HijaiyahTracing3.jpg",
		  "/halaman/HijaiyahTracing2.jpg",
		  "/halaman/HijaiyahTracing1.jpg",
        ],
      },
      {
        title: "Latihan Harakat",
        note: "Fathah • Kasrah • Dhammah",
        images: ["/halaman/Harakat1.jpg", "/halaman/Harakat2.jpg", "/halaman/Harakat3.jpg"],
      },
      {
        title: "Doa Harian",
        note: "Arab + latin + arti singkat",
        images: ["/halaman/doaharian1.jpg", "/halaman/doaharian2.jpg", "/halaman/doaharian3.jpg"],
      },
      {
        title: "Langkah Wudhu",
        note: "Step-by-step sederhana",
        images: [
          "/halaman/sholatwudhu2.jpg",
          "/halaman/sholatwudhu1.jpg",
          "/halaman/sholatwudhu3.jpg",
        ],
      },
      {
        title: "Mewarnai",
        note: "Aktivitas kreatif + fokus",
        badge: "⭐ Paling disukai",
        images: ["/halaman/Mewarnai1.jpg", "/halaman/Mewarnai2.jpg", "/halaman/Mewarnai3.jpg"],
      },
      {
        title: "Aktivitas Ringan",
        note: "10–20 menit tanpa gadget",
        images: [
          "/halaman/Aktivitas1.jpg",
          "/halaman/Aktivitas2.jpg",
          "/halaman/Aktivitas3.jpg",
        ],
      },
    ],
    []
  );

  return (
    <section id="preview" className="py-14">
  <Container>
<div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-xl font-extrabold text-slate-900 md:text-2xl">
            Contoh halaman yang anak suka
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Geser lewat dots untuk lihat 3 contoh per kategori (isi asli dari file).
          </p>
        </div>

        <a
          href="#pricing"
          className="mt-2 inline-flex w-fit items-center justify-center rounded-full border border-slate-200 bg-white py-2 text-xs font-extrabold text-slate-900 shadow-sm hover:bg-slate-50 sm:mt-0"
        >
          Lihat Paket
        </a>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PREVIEWS.map((p) => (
          <div
            key={p.title}
            className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-extrabold text-slate-900">{p.title}</p>
                <p className="mt-1 text-xs text-slate-600">{p.note}</p>
              </div>

              {p.badge ? (
                <span className="shrink-0 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-extrabold text-amber-900 ring-1 ring-amber-200">
                  {p.badge}
                </span>
              ) : null}
            </div>

            <div className="mt-3">
              <Slider images={p.images} altBase={p.title} />
            </div>

            {/* Micro proof under each card */}
            <div className="mt-3 flex flex-wrap gap-2">
              {["PDF A4", "Siap cetak", "Print ulang"].map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs text-slate-500">
        Catatan: ini hanya contoh. Setelah checkout, kamu dapat file lengkap (1.000 lembar) dan bisa print ulang
        seumur hidup.
      </p>
  </Container>
</section>
  );
}

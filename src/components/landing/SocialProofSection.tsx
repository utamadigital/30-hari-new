"use client";

import React from "react";
import Container from "@/components/Container";
import { Star } from "lucide-react";

type Props = {
  /** CTA untuk kembali ke pricing (hindari CTA fatigue di tengah halaman) */
  ctaHref?: string;
};

function Stars({ value = 5 }: { value?: number }) {
  const safe = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <div className="flex items-center gap-1" aria-label={`${safe} dari 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={[
            "h-4 w-4",
            i < safe ? "fill-amber-400 text-amber-400" : "text-slate-300",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  name,
  city,
  quote,
  stars = 5,
}: {
  name: string;
  city: string;
  quote: string;
  stars?: number;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-extrabold text-slate-900">
        {name} <span className="font-semibold text-slate-600">({city})</span>
      </p>

      <p className="mt-3 text-sm leading-relaxed text-slate-700">“{quote}”</p>

      <div className="mt-4">
        <Stars value={stars} />
      </div>
    </div>
  );
}

export default function SocialProofSection({ ctaHref = "#pricing" }: Props) {
  return (
    <section className="py-10">
  <Container>
<div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-lg font-extrabold text-slate-900 md:text-xl">
            Testimoni orang tua
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            <span className="font-semibold text-slate-800">Rating 4,9/5</span> dari
            <span className="font-semibold text-slate-800"> 2.000+ orang tua</span> (ringkasan). Biar kamu makin yakin ini bukan “PDF biasa”.
          </p>
        </div>

        {/* CTA secondary: fokus tetap di Hero/Pricing/Sticky untuk aksi checkout */}
        <a
          href={ctaHref}
          className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-extrabold text-slate-900 shadow-sm transition hover:bg-slate-50 active:scale-[0.99] whitespace-nowrap"
        >
          Lihat Paket
        </a>
      </div>

      {/* Highlight quote */}
      <div className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <span className="inline-flex items-center rounded-full bg-emerald-700 px-3 py-1 text-[11px] font-extrabold text-white">
              TESTIMONI TERPILIH
            </span>

            <p className="mt-3 text-sm font-extrabold text-slate-900">
              Ibu R*** <span className="font-semibold text-slate-600">(Jakarta)</span>
            </p>

            <p className="mt-2 text-base font-semibold leading-relaxed text-slate-900 md:text-lg">
              “Anak jadi lebih mau belajar karena aktivitasnya bertahap. Ada jadwalnya juga untuk 30 Hari, saya jadi nggak bingung mulai dari mana.”
            </p>

            <div className="mt-4">
              <Stars value={5} />
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2 md:max-w-[320px] md:justify-end">
            {["✅ Materi bertahap", "✅ Bisa print ulang", "✅ Checkout otomatis"].map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Other testimonials */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <TestimonialCard
          name="Ayah D***"
          city="Bandung"
          quote="Bisa print ulang kapan saja. Jadi lebih hemat dibanding beli buku berkali-kali."
          stars={5}
        />
        <TestimonialCard
          name="Ibu N***"
          city="Surabaya"
          quote="Checkout otomatisnya enak. Setelah bayar, link langsung muncul. Kalau ada kendala pun dibantu."
          stars={5}
        />
      </div>
  </Container>
</section>
  );
}

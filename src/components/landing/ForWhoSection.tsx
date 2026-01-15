"use client";

import Container from "@/components/Container";

import { Quote, Star } from "lucide-react";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="">{children}</div>;
}

function Stars() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 text-amber-500 fill-amber-500" />
      ))}
    </div>
  );
}

export default function SocialProofSection({ onCTA }: { onCTA: () => void }) {
  return (
    <section className="pt-10">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 md:text-2xl">
              Dipakai & disukai orang tua
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Bukti sosial cukup—tanpa bikin halaman jadi ramai kartu.
            </p>
          </div>

          <button
            onClick={onCTA}
            className="hidden h-11 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.98] sm:inline-flex"
          >
            Lihat Paket
          </button>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            { t: "Orang tua terbantu", v: "2.000+", d: "sesuaikan angka real" },
            { t: "Rating kepuasan", v: "4.9/5", d: "dari feedback pembeli" },
            { t: "Sekali bayar", v: "Seumur hidup", d: "bisa print ulang" },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold text-slate-500">{x.t}</p>
              <p className="mt-2 text-2xl font-extrabold text-slate-900">{x.v}</p>
              <p className="mt-1 text-sm text-slate-600">{x.d}</p>
            </div>
          ))}
        </div>

        {/* highlight quote */}
        <div className="mt-5 rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
          <div className="flex items-start gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-emerald-200">
              <Quote className="h-5 w-5 text-emerald-700" />
            </div>
            <div>
              <p className="text-xs font-semibold text-emerald-900">TESTIMONI TERPILIH</p>
              <p className="mt-2 text-base font-extrabold leading-relaxed text-slate-900">
                “Anak jadi lebih mau belajar karena aktivitasnya bertahap. Saya nggak bingung mulai dari mana.”
              </p>
              <p className="mt-2 text-sm text-slate-700">— Ibu R*** (Jakarta)</p>
              <div className="mt-3">
                <Stars />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 sm:hidden">
          <button
            onClick={onCTA}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.98]"
          >
            Lihat Paket
          </button>
        </div>
      </Container>
    </section>
  );
}
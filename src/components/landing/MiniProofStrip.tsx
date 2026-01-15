"use client";

import React from "react";
import { Users, Star, ShieldCheck, Printer } from "lucide-react";

type Item = {
  title: string;
  subtitle: string;
  Icon: React.ElementType;
};

const items: Item[] = [
  { title: "2.000+", subtitle: "Orang tua mulai rutinitas", Icon: Users },
  { title: "4,9/5", subtitle: "Rating kepuasan", Icon: Star },
  { title: "Garansi", subtitle: "Download 100%", Icon: ShieldCheck },
  { title: "Seumur hidup", subtitle: "Akses seumur hidup", Icon: Printer },
];

function ProofCard({ title, subtitle, Icon }: Item) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-200">
        <Icon className="h-5 w-5 text-emerald-700" />
      </div>

      <div className="min-w-0">
        <div className="text-sm font-extrabold text-slate-900 leading-tight">
          {title}
        </div>
        <div className="text-xs text-slate-600 leading-tight">{subtitle}</div>
      </div>
    </div>
  );
}

export default function MiniProofStrip() {
  return (
    <section
      aria-label="Bukti & jaminan"
      className=""
    >
      {/* sedikit konteks biar nggak “random” */}
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-extrabold text-slate-900">
          Terbukti & aman sebelum kamu pilih paket:
        </p>

        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
          {items.map((it) => (
            <ProofCard key={it.subtitle} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
}

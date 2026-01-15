"use client";

import Container from "@/components/Container";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";

type Props = {
  onClick?: () => void;
};

export default function MicroUrgencyStrip({ onClick }: Props) {
  return (
    <section className="py-6">
      <Container>
        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-slate-700">
              <span className="inline-flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-emerald-600" />
                Harga promo aktif hari ini
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                Aman via Midtrans + Garansi dibantu sampai beres
              </span>
            </div>

            <button
              type="button"
              onClick={onClick}
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-3 py-2 text-xs font-extrabold text-white shadow-sm hover:bg-emerald-700 sm:w-auto"
            >
              Lihat Paket & Harga <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

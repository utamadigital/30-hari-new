"use client";

import Container from "@/components/Container";

import { CreditCard, Download, MousePointerClick } from "lucide-react";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="">{children}</div>;
}

function StepCard({
  icon,
  step,
  title,
  desc,
}: {
  icon: React.ReactNode;
  step: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 ring-1 ring-emerald-200">
          <div className="text-emerald-700">{icon}</div>
        </div>
        <div>
          <p className="text-sm font-extrabold text-slate-900">{step}</p>
          <p className="mt-1 text-xl font-extrabold text-slate-900">{title}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorksSection({ onCTA }: { onCTA: () => void }) {
  return (
    <section className="pt-10">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 md:text-2xl">
              Mulai programnya hari ini — akses instan setelah bayar
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Tanpa ribet chat admin. Setelah bayar, Anda langsung diarahkan ke halaman download untuk mulai Hari 1.
            </p>
          </div>

          {/* CTA secondary (hindari CTA fatigue). Aksi utama tetap di Hero/Pricing/Sticky */}
          <button
            onClick={onCTA}
            className="hidden h-11 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-extrabold text-slate-900 shadow-sm transition hover:bg-slate-50 active:scale-[0.99] sm:inline-flex"
          >
            Lihat Paket
          </button>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          <StepCard
            icon={<MousePointerClick className="h-7 w-7" />}
            step="Step 1"
            title="Klik Checkout"
            desc="Pilih paket (Basic / Bundle) lalu isi data singkat."
          />
          <StepCard
            icon={<CreditCard className="h-7 w-7" />}
            step="Step 2"
            title="Selesaikan Pembayaran"
            desc="Pilih metode pembayaran yang tersedia dan selesaikan transaksi."
          />
          <StepCard
            icon={<Download className="h-7 w-7" />}
            step="Step 3"
            title="Download Instan"
            desc="Link download muncul otomatis. File bisa disimpan & diprint ulang kapan saja."
          />
        </div>

        <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-slate-800">
          ✅ Jika link bermasalah, kami bantu kirim ulang file sampai bisa diakses & diprint.
        </div>
      </Container>
    </section>
  );
}
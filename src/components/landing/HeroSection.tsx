
"use client";

import dynamic from "next/dynamic";
import Container from "@/components/Container";
import { ShieldCheck, Clock, Sparkles } from "lucide-react";
const PdfFlipbook = dynamic(() => import("./PdfFlipbook"), { ssr: false });

export default function HeroSection() {
  return (
    <section className="pt-12 bg-gradient-to-b from-white to-emerald-50 text-slate-900">
  <Container>
<div className="mx-auto max-w-screen-xl px-6 grid gap-10 lg:grid-cols-2 items-start">
        <div>
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
            PROGRAM 30 HARI • TANPA GADGET
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-black leading-tight text-slate-900">
            Anak Lebih Tenang & Konsisten Belajar Islam
            <span className="block text-emerald-700">Tanpa Perlu Disuruh</span>
          </h1>
          <p className="mt-4 text-slate-700 text-base">
            Ini <strong>bukan kumpulan worksheet</strong>. Ini program belajar anak Muslim 30 hari,
            sudah disusun harian. Orang tua tinggal print, anak tinggal kerjakan.
          </p>

          <ul className="mt-5 space-y-2 text-sm text-slate-800">
            <li className="flex gap-2"><Clock className="h-4 w-4 text-emerald-600"/>10–20 menit per hari</li>
            <li className="flex gap-2"><Sparkles className="h-4 w-4 text-emerald-600"/>Tema berganti, anak tidak bosan</li>
            <li className="flex gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600"/>Akses seumur hidup & bisa print ulang</li>
          </ul>

          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new Event("open-package-sheet"));
              }
            }}
            className="mt-6 inline-flex h-12 items-center justify-center rounded-2xl bg-emerald-600 px-6 font-extrabold text-white shadow hover:bg-emerald-700 w-full sm:w-auto"
          >
            Mulai Program 30 Hari
          </button>
          <div className="mt-2 space-y-1 text-xs lg:mb-12">
            <p className="text-slate-700">
              Bayar via <span className="font-bold">QRIS / VA</span> • Link download <span className="font-bold">muncul otomatis</span>
            </p>
            <p className="text-slate-600">
              Paling dipilih: <span className="font-extrabold text-emerald-700">Program 30 Hari Rp 99.000</span>
            </p>
          </div>
        </div>

        <div className="rounded-3xl border shadow bg-white p-4 mb-10 lg:mb-12">
  <PdfFlipbook />
</div>
      </div>
  </Container>
</section>
  );
}

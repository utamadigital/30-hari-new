"use client";

import Container from "@/components/Container";
import { Check, AlertTriangle, Star } from "lucide-react";

export default function PricingSection(_props: any) {
  return (
    <section id="pricing" className="py-16 bg-slate-50">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">
            Mulai dari Coba Dulu, atau Langsung Bikin Anak Konsisten
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-700">
            Banyak orang tua menyesal karena hanya beli worksheet, tapi tetap bingung harus mulai dari mana.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* BASIC */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-left">
            <h3 className="text-lg font-bold text-slate-900">Basic — Coba Dulu</h3>
            <p className="mt-1 text-sm text-slate-600">Cocok kalau mau lihat-lihat dulu isinya.</p>

            <div className="my-6">
              <span className="text-4xl font-black text-slate-900">Rp 69.000</span>
            </div>

            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-emerald-600" />
                1.000+ Worksheet Anak Muslim (PDF)
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-emerald-600" />
                Bisa print ulang seumur hidup
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-emerald-600" />
                Download instan
              </li>
              <li className="flex gap-2 opacity-50">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Orang tua perlu atur sendiri jadwal & urutan belajar
              </li>
            </ul>

            <a
              href={process.env.NEXT_PUBLIC_CHECKOUT_BASIC}
              className="mt-6 block rounded-xl border border-slate-300 py-3 text-center font-bold text-slate-700 hover:bg-slate-100"
            >
              Saya Mau Coba Dulu
            </a>
          </div>

          {/* BEST VALUE */}
          <div className="relative rounded-3xl border-2 border-emerald-600 bg-white p-6 pt-12 text-left shadow-xl">
            {/* Centered badge (not cramped with the card above) */}
            <div className="absolute left-1/2 top-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-700 px-5 py-2 text-center text-[11px] font-extrabold leading-tight text-white shadow-md whitespace-nowrap">
              PALING AMAN UNTUK ORANG TUA
            </div>

            <h3 className="flex items-center gap-2 text-lg font-black text-slate-900">
              Program 30 Hari
              <Star className="h-5 w-5 text-emerald-600" />
            </h3>
            <p className="mt-1 text-sm text-slate-600">Anak tinggal ikuti. Orang tua tidak perlu mikir.</p>

            <div className="my-6">
              <span className="text-4xl font-black text-slate-900">Rp 99.000</span>
              <p className="mt-1 text-sm font-semibold text-emerald-700">
                Selisih Rp 30.000, tapi beda hasilnya berbulan-bulan
              </p>
            </div>

            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2 font-semibold">
                <Check className="h-4 w-4 text-emerald-600" />
                Semua isi Paket Basic
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-emerald-600" />
                Program belajar anak muslim 30 hari (harian)
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-emerald-600" />
                Target 10–20 menit per hari
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-emerald-600" />
                Urutan jelas, anak tidak loncat-loncat
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-emerald-600" />
                Lebih mudah konsisten tanpa disuruh
              </li>
            </ul>

            <p className="mt-3 text-sm font-semibold text-slate-800">
              Ini paket yang dipilih orang tua yang tidak mau mengulang kesalahan bulan lalu.
            </p>

            <a
              href={process.env.NEXT_PUBLIC_CHECKOUT_BUNDLE}
              className="mt-6 block rounded-xl bg-emerald-600 py-3 text-center font-black text-white hover:bg-emerald-700"
            >
              Saya Mau yang Paling Aman
            </a>
          </div>

          {/* PREMIUM */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-left">
            <h3 className="text-lg font-bold text-slate-900">Lengkap + Pendamping</h3>
            <p className="mt-1 text-sm text-slate-600">
              Untuk orang tua yang ingin benar-benar tenang & ditemani.
            </p>

            <div className="my-6">
              <span className="text-4xl font-black text-slate-900">Rp 129.000</span>
            </div>

            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-emerald-600" />
                Semua isi Program 30 Hari
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-emerald-600" />
                Update worksheet berkala
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-emerald-600" />
                Template reward & target anak
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-emerald-600" />
                Akses prioritas WA support
              </li>
            </ul>

            <a
              href={process.env.NEXT_PUBLIC_CHECKOUT_PREMIUM}
              className="mt-6 block rounded-xl border border-slate-300 py-3 text-center font-bold text-slate-700 hover:bg-slate-100"
            >
              Saya Mau Paling Lengkap
            </a>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-slate-600">
          Pembayaran aman • File bisa diunduh langsung • Cocok untuk anak usia dini
        </p>
      </Container>
    </section>
  );
}

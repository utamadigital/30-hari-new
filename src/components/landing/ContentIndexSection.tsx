"use client";

import { useMemo, useState } from "react";
import Container from "@/components/Container";
import { ChevronDown, FileText } from "lucide-react";

type Item = { name: string };

function ItemRow({ name }: { name: string }) {
  return (
    <div className="flex items-start gap-2 rounded-xl bg-white p-3 ring-1 ring-slate-200">
      <span className="mt-[1px] inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-200">
        <FileText className="h-4 w-4 text-emerald-700" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-900">{name}</p>
        <p className="mt-0.5 text-xs text-slate-500">PDF • Siap cetak A4</p>
      </div>
    </div>
  );
}

export default function ContentIndexSection() {
  const items = useMemo<Item[]>(
    () => [
      { name: "Angka dalam Bahasa Arab" },
      { name: "Asmaul Husna" },
      { name: "Bulan Hijriyah" },
      { name: "Doa-doa Pendek" },
      { name: "Hadits-hadits Pendek" },
      { name: "Haji dan Umroh" },
      { name: "Hari Besar Islam" },
      { name: "Hari Kiamat" },
      { name: "Huruf Hijaiyah" },
      { name: "Kalimat Thayyibah" },
      { name: "Lain-lain" },
      { name: "Makanan Halal" },
      { name: "Mengenal Harakat" },
      { name: "Mewarnai" },
      { name: "Nabi dan Rasul" },
      { name: "Najis dalam Islam" },
      { name: "Nama Malaikat" },
      { name: "Perbuatan Terpuji" },
      { name: "Puasa" },
      { name: "Rukun Iman dan Islam" },
      { name: "Sholat dan Wudhu" },
      { name: "Sifat-sifat Allah" },
      { name: "Surat-surat Pendek" },
      { name: "Surga Neraka" },
    ],
    []
  );

  const total = items.length;
  const previewCount = 5;
  const rest = Math.max(0, total - previewCount);
  const preview = items.slice(0, previewCount);

  const [open, setOpen] = useState(false);

  return (
    <section className="py-10">
  <Container>
<div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-500">Daftar isi paket</p>
            <h3 className="mt-1 text-base font-extrabold text-slate-900">
              Isi lengkap yang kamu dapat
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Ringkasnya: banyak modul siap cetak. Klik untuk lihat semua judul.
            </p>

            {/* Collapsed summary chips */}
            {!open && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-extrabold text-emerald-800 ring-1 ring-emerald-200">
                  {total} modul PDF
                </span>
                <span className="rounded-full bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200">
                  Siap cetak A4
                </span>
                <span className="rounded-full bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200">
                  Print ulang seumur hidup
                </span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 py-2 text-xs font-extrabold text-slate-900 shadow-sm hover:bg-slate-100"
            aria-expanded={open}
          >
            <span>{open ? "Tutup daftar isi" : `Lihat daftar isi (${total} modul)`}</span>
            <ChevronDown
              className={[
                "h-4 w-4 transition-transform",
                open ? "rotate-180" : "rotate-0",
              ].join(" ")}
            />
          </button>
        </div>

        {/* Collapsed “teaser list” */}
        {!open && (
          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold text-slate-600">Contoh judul di dalamnya:</p>

            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {preview.map((it) => (
                <ItemRow key={it.name} name={it.name} />
              ))}

              {rest > 0 && (
  <button
    type="button"
    onClick={() => setOpen(true)}
    className="group flex items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-3 transition hover:bg-slate-50"
    aria-label={`Lihat ${rest} judul lainnya`}
  >
    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-extrabold text-amber-900 ring-1 ring-amber-200 transition group-hover:bg-amber-100">
      Buka semua judul +{rest}
    </span>
  </button>
)}
            </div>

            <p className="mt-3 text-[11px] text-slate-500">
              Tip: setelah lihat daftar isi, biasanya orang makin yakin sebelum lihat harga.
            </p>
          </div>
        )}

        {/* Expanded full list */}
        <div
          className={[
            "grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out",
            open ? "grid-rows-[1fr] opacity-100 mt-5" : "grid-rows-[0fr] opacity-0 mt-0",
          ].join(" ")}
        >
          <div className="min-h-0">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((it) => (
                  <ItemRow key={it.name} name={it.name} />
                ))}
              </div>

              <p className="mt-4 text-[11px] leading-relaxed text-slate-500">
                *Judul modul bisa bertambah seiring update file (tanpa biaya tambahan).
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white py-2 text-xs font-extrabold text-slate-900 shadow-sm hover:bg-slate-50"
                >
                  Lihat Paket
                </a>
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800 ring-1 ring-emerald-200">
                  Total {total} modul PDF
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-[11px] text-slate-500">
          Catatan: ini daftar modul (judul file). Kamu tetap dapat file utama 1.000 lembar sesuai paket.
        </p>
      </div>
  </Container>
</section>
  );
}

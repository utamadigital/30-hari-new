"use client";

import Container from "@/components/Container";

function Card({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
          {icon}
        </span>
        <div>
          <p className="text-sm font-extrabold text-slate-900">{title}</p>
          <p className="mt-1 text-sm text-slate-700">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function IconDownload({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M12 3v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 11l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 21h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconPrint({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M7 8V4h10v4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M7 17H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" stroke="currentColor" strokeWidth="2" />
      <path d="M7 14h10v6H7v-6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function IconHome({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 9.5V21h14V9.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export default function GuaranteeSection({ ctaHref = "#pricing" }: { ctaHref?: string }) {
  return (
    <section
      id="guarantee"
      className="pb-16"
    >
  <Container>
<div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200">
              GARANSI & BANTUAN
            </span>
            <h2 className="mt-3 text-2xl font-extrabold text-slate-900">
              Tenang, kami bantu sampai beres
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              Produk digital seharusnya praktis. Kalau ada kendala akses atau butuh kirim ulang,
              kami bantu sampai file bisa diunduh dan dicetak.
            </p>
          </div>

          <a
            href={ctaHref}
            className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-8 text-sm font-extrabold text-slate-900 shadow-sm transition hover:bg-slate-50 active:scale-[0.99]"
          >
            Lihat Paket
          </a>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card
            icon={<IconDownload className="h-6 w-6" />}
            title="Bantuan sampai bisa download"
            desc="Kalau link bermasalah atau file hilang, kami bantu kirim ulang sampai beres."
          />
          <Card
            icon={<IconPrint className="h-6 w-6" />}
            title="Bisa diprint ulang kapan saja"
            desc="Simpan file PDF di HP/laptop. Print ulang saat anak ingin mengulang aktivitas."
          />
          <Card
            icon={<IconHome className="h-6 w-6" />}
            title="Cocok untuk belajar di rumah"
            desc="Printable dibuat untuk aktivitas ringkas 10–20 menit (tanpa gadget)."
          />
        </div>

        <div className="mt-6 rounded-2xl border border-emerald-200 bg-white p-5">
          <p className="text-sm font-extrabold text-slate-900">
            Saran kami: pilih Bundle kalau ingin lebih banyak variasi
          </p>
          <p className="mt-2 text-sm text-slate-700">
            Lebih hemat untuk pemakaian jangka panjang - anak tidak cepat bosan karena materinya beragam.
          </p>
        </div>
      </div>
  </Container>
</section>
  );
}
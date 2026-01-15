"use client";

import Container from "@/components/Container";

const FAQS = [
  {
    q: "Produk ini untuk usia berapa?",
    a: "Paling cocok untuk anak usia 3–8 tahun. Namun tetap bisa dipakai menyesuaikan kemampuan anak—tinggal pilih halaman yang paling mudah dulu.",
  },
  {
    q: "Setelah bayar, file dikirim lewat apa?",
    a: "Checkout otomatis—setelah pembayaran sukses, link download langsung muncul. Kamu juga bisa simpan file di HP/laptop.",
  },
  {
    q: "Bisa print ulang kapan saja?",
    a: "Bisa. File PDF bisa disimpan dan diprint ulang kapan pun anak ingin mengulang aktivitas.",
  },
  {
    q: "Kalau link download bermasalah gimana?",
    a: "Tenang. Kalau ada kendala akses/link, kami bantu kirim ulang sampai file bisa diakses & diprint.",
  },
  {
    q: "Perlu aplikasi khusus untuk buka file?",
    a: "Tidak. Cukup pakai PDF reader umum (di HP/laptop biasanya sudah ada).",
  },
];

export default function FAQSection({ ctaHref = "#pricing" }: { ctaHref?: string }) {
  return (
    <section id="faq" className="py-14">
  <Container>
<div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
            PERTANYAAN UMUM
          </span>
          <h2 className="mt-3 text-xl font-extrabold text-slate-900 md:text-2xl lg:text-3xl">
            Masih ragu? Ini jawaban singkatnya
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Pertanyaan yang paling sering ditanya sebelum checkout.
          </p>
        </div>

        <a
          href={ctaHref}
          className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-extrabold text-slate-900 shadow-sm transition hover:bg-slate-50 active:scale-[0.99] whitespace-nowrap"
        >
          Lihat Paket
        </a>
      </div>

      <div className="mt-6 space-y-3">
        {FAQS.map((f) => (
          <details
            key={f.q}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
              <p className="text-sm font-extrabold text-slate-900">{f.q}</p>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-700 ring-1 ring-slate-200 transition group-open:rotate-180">
                ▼
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{f.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-slate-700">
        ✅ Jika ada kendala download, kami bantu sampai file bisa diakses & diprint.
      </div>
  </Container>
</section>
  );
}
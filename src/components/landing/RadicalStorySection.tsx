
"use client";

import Container from "@/components/Container";

export default function RadicalStorySection() {
  return (
    <section className="py-14 bg-slate-50">
      <Container>
        <div className="text-left">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900">
          Masalahnya Bukan Anak Malas.
        </h2>
        <p className="mt-4 text-slate-700 text-base lg:text-lg lg:leading-relaxed">
          Kebanyakan orang tua menyerah bukan karena anaknya,
          tapi karena <strong>bingung mulai dari mana dan tidak konsisten</strong>.
        </p>
        <p className="mt-3 text-slate-700">
          Program ini dibuat agar <strong>Anda tidak perlu mikir</strong>.
          Hari 1–30 sudah disusun. Tinggal jalankan.
        </p>
      </div>
      </Container>
    </section>
  );
}
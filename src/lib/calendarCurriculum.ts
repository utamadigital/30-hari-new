import type { LearningType } from "./calendarAccess";

export type AgeGroup = {
  id: string;
  label: string;
  hint: string;
};

export const AGE_GROUPS: AgeGroup[] = [
  { id: "3-4", label: "3–4 tahun", hint: "lebih banyak mewarnai & motorik" },
  { id: "5-6", label: "5–6 tahun", hint: "mulai tracing & berhitung sederhana" },
  { id: "7-8", label: "7–8 tahun", hint: "lebih fokus latihan & kemandirian" },
];

// Judul file berdasarkan screenshot kamu (ringkas & aman dipakai sebagai label kalender).
const ISLAMI_TITLES = [
  "Huruf Hijaiyah",
  "Mengenal Harakat",
  "Angka dalam Bahasa Arab",
  "Kalimat Thayyibah",
  "Doa-doa Pendek",
  "Hadits-hadits Pendek",
  "Surat-surat Pendek",
  "Asmaul Husna",
  "Hari Besar Islam",
  "Bulan Hijriyah",
  "Rukun Iman dan Islam",
  "Sifat-sifat Allah",
  "Nabi dan Rasul",
  "Nama Malaikat",
  "Sholat dan Wudhu",
  "Puasa",
  "Haji dan Umroh",
  "Makanan Halal",
  "Najis dalam Islam",
  "Perbuatan Terpuji",
  "Hari Kiamat",
  "Surga Neraka",
  "Lain-lain (Islami)",
];

const UMUM_TITLES = [
  "Seri Alfabet",
  "Seri Berhitung",
  "Seri Benda di Sekitar Kita",
  "Seri Buah-buahan",
  "Seri Sayur-sayuran",
  "Seri Hewan",
  "Seri Kendaraan",
  "Seri Profesi",
  "Seri Mengenal Anggota Tubuh",
  "Seri Mengenal Tempat",
  "Seri Mengenal Waktu",
  "Seri Dinosaurus",
];

const BONUS_TITLES = [
  "100 Hari Belajar Matematika",
  "Alphabet – Tracing Line",
  "Berhitung TK",
  "Bilingual Activity (ENG)",
  "Body System (ENG)",
  "Crossword (ENG)",
  "Coloring Books Random (ENG)",
  "Tracing Activities (ENG)",
  "Worksheets for Kindergarten (ENG)",
  "Gunting dan Tempel",
  "Mencocokkan",
  "Menghubungkan Angka",
  "Mewarnai Berdasarkan Angka",
  "Mewarnai (Komplit)",
];

function pickCycled(list: string[], idx1Based: number) {
  if (!list.length) return "";
  const i = (idx1Based - 1) % list.length;
  return list[i] ?? list[0];
}

export function getDayPlan(opts: {
  day: number; // 1..60
  ageGroupId: string;
  type: LearningType;
}) {
  const { day, ageGroupId, type } = opts;

  const baseTitle =
    type === "islami"
      ? pickCycled(ISLAMI_TITLES, day)
      : type === "umum"
        ? pickCycled(UMUM_TITLES, day)
        : pickCycled(BONUS_TITLES, day);

  // sedikit personalisasi berdasarkan umur (tanpa bikin file baru)
  const ageHint =
    ageGroupId === "3-4"
      ? "(ringan & fun)"
      : ageGroupId === "5-6"
        ? "(latihan bertahap)"
        : "(lebih mandiri)";

  const focus =
    type === "islami"
      ? "Fokus: nilai & kebiasaan baik"
      : type === "umum"
        ? "Fokus: kognitif & pengetahuan"
        : "Bonus: variasi aktivitas";

  return {
    title: baseTitle,
    subtitle: `Hari ${day} • ${ageHint}`,
    focus,
    // Placeholder untuk kamu isi nanti kalau mau menautkan file/download per hari
    resources: [
      { label: "Worksheet/PDF", note: "(gunakan file sesuai judul di atas)" },
      { label: "Durasi", note: "10–20 menit" },
    ],
  };
}

"use client";

import type { PlanId } from "./PricingSection";
import Container from "@/components/Container";

function formatIDR(n: number) {
  return new Intl.NumberFormat("id-ID").format(n);
}

function percentOff(compareAt: number, price: number) {
  if (!compareAt || compareAt <= price) return 0;
  return Math.round(((compareAt - price) / compareAt) * 100);
}

function scrollToCheckoutSummary() {
  const el = document.getElementById("checkout-summary");
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  el.classList.add("ud-highlight");
  window.setTimeout(() => el.classList.remove("ud-highlight"), 1400);
}

export default function QuickPickSection({
  selectedId,
  onPick,

  // Optional props biar nggak hardcode. Kalau tidak dikirim, pakai default ini.
  basicPrice = 69_000,
  bundlePrice = 99_000,
  basicCompareAt = 149_000,
  bundleCompareAt = 249_000,
}: {
  selectedId: PlanId | null;
  onPick: (id: PlanId) => void;

  basicPrice?: number;
  bundlePrice?: number;
  basicCompareAt?: number;
  bundleCompareAt?: number;
}) {
  const items: Array<{
    id: PlanId;
    title: string;
    subtitle: string;
    badgeText: string;
    badgeTone: "amber" | "emerald";
    price: number;
    compareAt: number;
  }> = [
    {
      id: "basic",
      title: "Basic — Program 30 Hari",
      subtitle:
        "Untuk mulai rutinitas 10–20 menit/hari. Hari 1–30 sudah ada panduan.",
      badgeText: "Terlaris",
      badgeTone: "amber",
      price: basicPrice,
      compareAt: basicCompareAt,
    },
    {
      id: "bundle",
      title: "Bundle (1.500 halaman)",
      subtitle:
        "Cocok kalau ingin variasi lebih banyak & dipakai lebih lama (lebih worth it: +500 halaman).",
      badgeText: "Value Terbesar",
      badgeTone: "emerald",
      price: bundlePrice,
      compareAt: bundleCompareAt,
    },
  ];

  const selectedPrice = items.find((x) => x.id === selectedId)?.price ?? 0;

  return (
    <section
      id="quick-pick"
      className="pt-6"
    >
  <Container>
<div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 md:text-lg">
              Pilih cepat biar nggak bingung
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {selectedId
                ? "Mantap. Scroll sedikit untuk lihat ringkasan & checkout."
                : "Belum pilih paket. Pilih salah satu dulu-baru tombol checkout aktif."}
            </p>
          </div>

          <span className="hidden sm:inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200">
            ⏱️ 1 menit pilih paket
          </span>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {items.map((it) => {
            const selected = selectedId === it.id;
            const off = percentOff(it.compareAt, it.price);

            const badgeCls =
              it.badgeTone === "amber"
                ? "bg-amber-50 text-amber-800 ring-1 ring-amber-200"
                : "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200";

            return (
              <button
                key={it.id}
                type="button"
                onClick={() => onPick(it.id)}
                aria-pressed={selected}
                className={[
                  "w-full rounded-2xl border p-4 text-left transition",
                  "bg-white",
                  selected
                    ? "border-emerald-300 ring-2 ring-emerald-200 shadow-md"
                    : "border-slate-200 hover:border-slate-300 hover:shadow-sm",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-extrabold text-slate-900">
                      {it.title}
                    </p>
                  </div>

                  <span
                    className={[
                      "shrink-0 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold",
                      badgeCls,
                    ].join(" ")}
                  >
                    {it.badgeTone === "amber" ? "🔥 " : "⭐ "}
                    {it.badgeText}
                  </span>
                </div>

                {/* Harga (ini inti perbaikan poin 1) */}
                <div className="mt-3">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="text-base font-extrabold text-slate-900">
                      Promo Rp {formatIDR(it.price)}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      Normal{" "}
                      <span className="line-through">
                        Rp {formatIDR(it.compareAt)}
                      </span>
                    </span>

                    {off > 0 && (
                      <span className="inline-flex items-center rounded-full bg-emerald-600 px-2.5 py-1 text-[11px] font-extrabold text-white">
                        Hemat {off}%
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-sm text-slate-600">{it.subtitle}</p>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">
                    {selected ? "✓ Terpilih" : "Pilih →"}
                  </span>

                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">
                    {selected ? "Lanjut" : "Pilih ini"}{" "}
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Aksi cepat (biar nggak “mandek” setelah pilih paket) */}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-600">
            {selectedId
              ? "Kamu bisa cek ringkasan total + opsi bonus di bawah, lalu checkout."
              : "Silakan pilih paket dulu. Setelah itu, kamu bisa lanjut ke ringkasan."}
          </p>

          {selectedId ? (
            <a
              href="#checkout-summary"
              className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-extrabold text-slate-900 shadow-sm transition hover:bg-slate-50 active:scale-[0.99] focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-200"
            >
              Lanjut ke Ringkasan • Rp {formatIDR(selectedPrice)}
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-sm font-extrabold text-slate-500"
            >
              Pilih paket dulu
            </button>
          )}
        </div>
      </div>
  </Container>
</section>
  );
}

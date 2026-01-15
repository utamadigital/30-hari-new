"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, ChevronUp, X, ShieldCheck, Star, Sparkles } from "lucide-react";

type Props = {
  /** Fallback action (mis. scroll ke #pricing) */
  onClick: () => void;
  label?: string;
};

function getEnv(key: string) {
  // Next injects env at build-time; tetap aman kalau undefined.
  return (process.env as any)?.[key] as string | undefined;
}

export default function StickyMobileCTA({ onClick, label = "Pilih Paket (Cepat)" }: Props) {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

// Allow other sections (Hero) to open this sheet
useEffect(() => {
  const handler = () => setOpen(true);
  window.addEventListener("open-package-sheet", handler as any);
  return () => window.removeEventListener("open-package-sheet", handler as any);
}, []);


  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setShow(y > 420);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true } as any);
    return () => window.removeEventListener("scroll", onScroll as any);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const plans = useMemo(() => {
    const basic = getEnv("NEXT_PUBLIC_CHECKOUT_BASIC");
    const bundle = getEnv("NEXT_PUBLIC_CHECKOUT_BUNDLE");
    const premium = getEnv("NEXT_PUBLIC_CHECKOUT_PREMIUM");
    return [
      {
        id: "basic",
        title: "Basic",
        price: "Rp 69.000",
        note: "Coba dulu (tanpa program harian).",
        href: basic || "#pricing",
        icon: Sparkles,
        tone: "border-slate-200",
        btn: "bg-white border border-slate-300 text-slate-800 hover:bg-slate-50",
      },
      {
        id: "bundle",
        title: "Program 30 Hari",
        price: "Rp 99.000",
        note: "Paling aman untuk orang tua.",
        href: bundle || "#pricing",
        icon: Star,
        tone: "border-emerald-500",
        btn: "bg-emerald-600 text-white hover:bg-emerald-700",
        badge: "Direkomendasikan",
      },
      {
        id: "premium",
        title: "Lengkap + Pendamping",
        price: "Rp 129.000",
        note: "Tenang & ditemani (support prioritas).",
        href: premium || "#pricing",
        icon: ShieldCheck,
        tone: "border-slate-200",
        btn: "bg-white border border-slate-300 text-slate-800 hover:bg-slate-50",
      },
    ];
  }, []);

  if (!show) return null;

  return (
    <>
      {/* Sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 pb-[max(env(safe-area-inset-bottom),12px)]">
        <div className="mx-auto max-w-3xl px-3">
          <div className="rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-lg backdrop-blur">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-extrabold text-white shadow-sm hover:bg-emerald-700 flex items-center justify-between"
              aria-haspopup="dialog"
              aria-expanded={open}
            >
              <span className="flex items-center gap-2">
                <ChevronUp className="h-5 w-5" />
                {label}
              </span>
              <ArrowUpRight className="h-5 w-5" />
            </button>
            <p className="mt-1 text-center text-[11px] font-medium text-slate-600">
              Tip: QRIS biasanya paling cepat ✓
            </p>
          </div>
        </div>
      </div>

      {/* Bottom sheet */}
      {open && (
        <div className="fixed inset-0 z-[60]">
          <button
            className="absolute inset-0 bg-black/40"
            aria-label="Tutup"
            onClick={() => setOpen(false)}
            type="button"
          />
          <div
            role="dialog"
            aria-modal="true"
            className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-3 pb-[max(env(safe-area-inset-bottom),12px)]"
          >
            <div className="rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                <div>
                  <p className="text-sm font-black text-slate-900">Pilih paket cepat</p>
                  <p className="text-xs text-slate-600">Klik untuk langsung checkout. Bisa scroll.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-xl p-2 hover:bg-slate-100"
                  aria-label="Tutup"
                >
                  <X className="h-5 w-5 text-slate-700" />
                </button>
              </div>

              <div className="max-h-[70vh] overflow-y-auto px-4 py-4 space-y-3">
                {plans.map((p) => {
                  const Icon = p.icon as any;
                  return (
                    <div key={p.id} className={`rounded-2xl border ${p.tone} bg-white p-4`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
                              <Icon className="h-5 w-5 text-emerald-700" />
                            </span>
                            <div className="min-w-0">
                              <p className="text-sm font-black text-slate-900 truncate">{p.title}</p>
                              <p className="text-xs text-slate-600">{p.note}</p>
                              {p.id === "bundle" && (
                                <p className="mt-1 text-[11px] font-medium text-slate-500">
                                  Akses instan hari ini • Tanpa langganan
                                </p>
                              )}

                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          {p.badge && (
                            <span className="mb-1 inline-flex rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-extrabold text-white">
                              {p.badge}
                            </span>
                          )}
                          
{p.id === "bundle" && (
  <p className="mb-1 text-[11px] font-medium text-slate-500">
    ⭐ Dipilih oleh 2.000+ orang tua • Rating 4,9/5
  </p>
)}

<p className="text-base font-black text-slate-900">{p.price}</p>
{p.id === "bundle" && (
  <p className="mt-1 text-[11px] font-medium text-slate-500">
  </p>
)}
                        </div>
                      </div>

                      <div className="mt-3 flex gap-2">
                        <a
                          href={p.href}
                          className={`flex-1 rounded-xl px-3 py-2 text-center text-sm font-extrabold ${p.btn}`}
                          onClick={() => setOpen(false)}
                        >
                          Checkout {p.title}
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            setOpen(false);
                            onClick(); // scroll ke pricing (detail)
                          }}
                          className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
                        >
                          Detail
                        </button>
                      </div>
                    </div>
                  );
                })}

                <div className="rounded-2xl bg-slate-50 p-3 text-xs text-slate-700">
                  <p className="font-bold text-slate-900">Catatan:</p>
                  <ul className="mt-1 list-disc pl-4 space-y-1">
                    <li>Jika tombol checkout mengarah ke #pricing, berarti link checkout belum diisi di env.</li>
                    <li>QRIS biasanya paling cepat untuk selesai pembayaran.</li>
                  </ul>
                </div>
              </div>

              <div className="px-4 py-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onClick();
                  }}
                  className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-extrabold text-white hover:bg-slate-800"
                >
                  Lihat harga lengkap di halaman
                </button>
                <p className="mt-2 text-center text-[11px] text-slate-600">
                  Pembayaran aman • Download instan
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
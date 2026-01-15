"use client";

import { useEffect, useMemo, useState } from "react";
import type { PlanId } from "./types";

function formatIDR(n: number) {
  return `Rp ${Math.round(n).toLocaleString("id-ID")}`;
}

function scrollToPricingAndFocus() {
  const el = document.getElementById("pricing");
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth", block: "start" });

  // highlight section (sementara)
  el.classList.add("ud-highlight");
  window.setTimeout(() => el.classList.remove("ud-highlight"), 1400);

  // fokuskan kartu pertama
  window.setTimeout(() => {
    const firstCard = document.querySelector("#pricing [role='radio']") as
      | HTMLElement
      | null;
    firstCard?.focus?.();
  }, 450);
}

function useLoopingCountdown(key = "lp_countdown_end_v1", seconds = 30 * 60) {
  // SSR & first client render sama => menghindari hydration mismatch
  const [remain, setRemain] = useState(seconds); // 1800 = 30:00

  useEffect(() => {
    const getEnd = () => {
      const raw = window.localStorage.getItem(key);
      const parsed = raw ? Number(raw) : NaN;
      if (!Number.isFinite(parsed) || parsed <= 0) return 0;
      return parsed;
    };

    const setNewEnd = () => {
      const end = Date.now() + seconds * 1000;
      window.localStorage.setItem(key, String(end));
      return end;
    };

    let endAt = getEnd();
    if (!endAt || endAt < Date.now()) endAt = setNewEnd();

    const tick = () => {
      const diff = Math.ceil((endAt - Date.now()) / 1000);
      if (diff <= 0) {
        endAt = setNewEnd(); // looping
        setRemain(seconds);
      } else {
        setRemain(diff);
      }
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [key, seconds]);

  const mm = String(Math.floor(remain / 60)).padStart(2, "0");
  const ss = String(remain % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

export default function StickyFloatingCTA({
  selectedId,
  checkoutUrl,
  promoPrice,
  compareAtPrice,
  bumpSelected,
  bumpPrice,
  showAfterPx = 0,
}: {
  selectedId: PlanId | null;
  checkoutUrl: string;
  promoPrice: number;
  compareAtPrice: number;
  bumpSelected: boolean;
  bumpPrice: number;
  /** muncul setelah user scroll minimal sekian px */
  showAfterPx?: number;
}) {
  const [show, setShow] = useState(false);
  const [hideBecauseSection, setHideBecauseSection] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // ✅ hanya aktif jika paket sudah dipilih
  const canCheckout = !!checkoutUrl && promoPrice > 0 && compareAtPrice > 0;

  const packNormal = compareAtPrice;
  const packPromo = promoPrice;

  const totalPrice = useMemo(
    () => packPromo + (bumpSelected ? bumpPrice : 0),
    [packPromo, bumpSelected, bumpPrice]
  );

  const savings = useMemo(
    () => Math.max(0, packNormal - packPromo),
    [packNormal, packPromo]
  );

  const savingsPct = useMemo(() => {
    if (packNormal <= 0) return 0;
    return Math.round((savings / packNormal) * 100);
  }, [savings, packNormal]);

  const perDay = useMemo(() => {
    // framing lembut: 30 hari pemakaian (rutinitas harian)
    if (!canCheckout) return 0;
    return Math.round(totalPrice / 30);
  }, [canCheckout, totalPrice]);

  const pages = selectedId === "bundle" ? 1500 : 1000;
  const priceForCalc = canCheckout ? totalPrice : 69000;
  const perSheet = useMemo(() => {
    return Math.max(1, Math.round(priceForCalc / pages));
  }, [priceForCalc, pages]);

  const perSheetLabel = useMemo(() => {
    return `Rp ${new Intl.NumberFormat("id-ID").format(perSheet)}`;
  }, [perSheet]);

  // Countdown looping 30:00 (tampil saat bisa checkout & ada diskon)
  const countdown = useLoopingCountdown("lp_countdown_end_v1", 30 * 60);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setShow(y > showAfterPx);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfterPx]);

  // Sembunyikan hanya saat berada di blok Ringkasan Checkout (biar nggak nutup summary)
  useEffect(() => {
    const ids = ["checkout-summary"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    let mounted = true;
    const state: Record<string, boolean> = {};

    const recompute = () => {
      if (!mounted) return;
      const anyVisible = Object.values(state).some(Boolean);
      setHideBecauseSection(anyVisible);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = (e.target as HTMLElement).id;
          state[id] = e.isIntersecting;
        }
        recompute();
      },
      {
        // agak longgar: begitu section mulai terlihat, hide
        threshold: 0.12,
        rootMargin: "-10% 0px -55% 0px",
      }
    );

    els.forEach((el) => obs.observe(el));
    return () => {
      mounted = false;
      obs.disconnect();
    };
  }, []);

  function showToast(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1600);
  }

  if (!show || hideBecauseSection) return null;

  const pageLabel =
    selectedId === "basic" ? "1.000" : selectedId === "bundle" ? "1.500" : null;

  return (
    <>
      <style jsx global>{`
        .ud-highlight {
          outline: 4px solid rgba(251, 191, 36, 0.55);
          border-radius: 24px;
          box-shadow: 0 0 0 10px rgba(251, 191, 36, 0.15);
          animation: udPulse 1.2s ease-in-out 1;
        }
        @keyframes udPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.25);
          }
          50% {
            box-shadow: 0 0 0 14px rgba(251, 191, 36, 0.18);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(251, 191, 36, 0);
          }
        }
      `}</style>

      {toast && (
        <div className="fixed bottom-24 left-1/2 z-[60] w-[92%] max-w-sm -translate-x-1/2 rounded-2xl bg-slate-900 py-3 text-sm font-semibold text-white shadow-lg">
          {toast}
        </div>
      )}

      <div className="fixed bottom-4 left-0 right-0 z-[80]">
        <div className="max-w-xl">
          <div
            className="rounded-3xl border border-slate-200 bg-white/95 shadow-lg backdrop-blur"
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0px)" }}
          >
            <div className="grid grid-cols-[1fr_auto] items-center gap-3 p-3 sm:p-4">
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold text-slate-600">
                  <>Checkout instan</>
                </p>

                {canCheckout ? (
                  <>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="whitespace-nowrap text-sm font-extrabold text-slate-900">
                        {formatIDR(totalPrice)}
                      </span>
                      <span className="whitespace-nowrap text-[11px] font-semibold text-slate-500 line-through">
                        {formatIDR(packNormal)}
                      </span>
                    </div>

                    <p className="mt-0.5 text-[11px] font-semibold text-slate-600">
                      ≈ {perSheetLabel}/lembar • Gratis update worksheet
                    </p>
                  </>
                ) : (
                  <p className="mt-0.5 text-[11px] font-semibold text-slate-600">
                    ≈ {perSheetLabel}/lembar • Gratis update worksheet
                  </p>
                )}
              </div>

              <div className="flex shrink-0 flex-col items-end gap-1">
                {/* Countdown + Hemat (di atas tombol CTA) */}
                {savingsPct > 0 && canCheckout ? (
                  <div className="flex items-center justify-end gap-2">
                    <div className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-extrabold text-amber-700 ring-1 ring-amber-200">
                      {countdown}
                    </div>
                    <div className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-extrabold text-emerald-700 ring-1 ring-emerald-200">
                      Hemat {savingsPct}%
                    </div>
                  </div>
                ) : null}

                <button
                  type="button"
                  onClick={() => {
                    if (!canCheckout) {
                      showToast("Pilih salah satu paket dulu ya 😊");
                      scrollToPricingAndFocus();
                      return;
                    }
                    window.location.href = checkoutUrl;
                  }}
                  className={[
                    "inline-flex h-12 w-[190px] items-center justify-center rounded-xl px-4 text-sm font-extrabold shadow-sm outline-none ring-1 ring-black/5 focus:ring-2 focus:ring-emerald-200 whitespace-nowrap",
                    canCheckout
                      ? "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.99]"
                      : "bg-slate-200 text-slate-700 hover:bg-slate-300",
                  ].join(" ")}
                >
                  {canCheckout ? "Lanjut Bayar" : "Pilih Paket"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

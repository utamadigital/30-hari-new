"use client";

export default function CheckoutCTA({
  checkoutUrl,
  className = "",
}: {
  checkoutUrl: string;
  className?: string;
}) {
  const canGo = !!checkoutUrl;

  return (
    <button
      type="button"
      onClick={() => {
        if (!canGo) return;
        window.location.href = checkoutUrl; // ✅ full-page redirect
      }}
      disabled={!canGo}
      className={[
        "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-extrabold transition focus:outline-none focus:ring-2 focus:ring-emerald-200",
        canGo
          ? "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.99]"
          : "cursor-not-allowed bg-slate-200 text-slate-600",
        className,
      ].join(" ")}
    >
      Checkout &amp; Download Instan
    </button>
  );
}

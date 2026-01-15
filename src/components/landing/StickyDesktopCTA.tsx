"use client";

export default function StickyDesktopCTA({ href }: { href: string }) {
  const canGo = !!href;

  return (
    <button
      type="button"
      onClick={() => {
        if (!canGo) return;
        window.location.href = href; // ✅ full-page redirect
      }}
      disabled={!canGo}
      className={[
        "hidden md:inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-extrabold transition focus:outline-none focus:ring-2 focus:ring-emerald-200",
        canGo
          ? "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.99]"
          : "cursor-not-allowed bg-slate-200 text-slate-600",
      ].join(" ")}
    >
      Checkout &amp; Download Instan
    </button>
  );
}

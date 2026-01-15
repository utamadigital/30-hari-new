export default function HeroPreviewMockup() {
  return (
    <div className="relative w-full max-w-md">
      {/* Card container */}
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-lg">
        {/* Top: "Laptop/PDF" block */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-700">Preview File PDF</p>
            <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
              A4 Ready
            </span>
          </div>

          {/* fake pdf thumbnails */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="aspect-[3/4] rounded-xl bg-white shadow-sm ring-1 ring-slate-200" />
            <div className="aspect-[3/4] rounded-xl bg-white shadow-sm ring-1 ring-slate-200" />
            <div className="aspect-[3/4] rounded-xl bg-white shadow-sm ring-1 ring-slate-200" />
          </div>

          <p className="mt-3 text-[11px] text-slate-600">
            (Nanti ganti jadi gambar asli PDF-mu)
          </p>
        </div>

        {/* Bottom: printed sheets */}
        <div className="relative mt-4">
          <p className="text-xs font-semibold text-slate-700">Hasil Cetak</p>

          <div className="mt-2 flex items-end gap-2">
            <div className="h-28 w-20 rotate-[-6deg] rounded-xl bg-white shadow-sm ring-1 ring-slate-200" />
            <div className="h-32 w-24 rotate-[2deg] rounded-xl bg-white shadow-md ring-1 ring-slate-200" />
            <div className="h-28 w-20 rotate-[8deg] rounded-xl bg-white shadow-sm ring-1 ring-slate-200" />
          </div>

          <p className="mt-3 text-[11px] text-slate-600">
            Print ulang kapan saja • tanpa watermark
          </p>
        </div>

        {/* Trust chips */}
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
            Checkout otomatis
          </span>
          <span className="rounded-full bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200">
            Link download instan
          </span>
          <span className="rounded-full bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200">
            Siap cetak A4
          </span>
        </div>
      </div>

      {/* Decorative glow */}
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[32px] bg-emerald-200/20 blur-2xl" />
    </div>
  );
}

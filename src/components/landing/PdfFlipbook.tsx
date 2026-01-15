"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";

const HTMLFlipBook = dynamic(() => import("react-pageflip").then((m) => m.default), {
  ssr: false,
});

export type FlipPage = { src: string; alt?: string };

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(!!mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function useContainerWidth() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [w, setW] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    setW(el.clientWidth);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return { ref, w };
}

function PreviewImage({
  src,
  alt,
  eager = false,
}: {
  src: string;
  alt: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-slate-100 text-xs font-semibold text-slate-500">
        Preview
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      onError={() => setFailed(true)}
      className="h-full w-full object-contain"
    />
  );
}

/**
 * FINAL UX:
 * - Selalu single-page portrait (anti “nabrak/spread”)
 * - Kalau kena maxHeight, wrapper ikut mengecil (mx-auto) => whitespace jadi rapih (intentional)
 * - object-contain => gambar A4 1200x1697 tampil utuh, tidak jadi landscape/crop
 */
export default function PdfFlipbook({
  pages,
  ratio = 1.414, // A4 portrait height = width * ratio
  maxWidth = 520,
  maxHeightMobile = 360,
  maxHeightDesktop = 620,
  className = "",
}: {
  pages: FlipPage[];
  ratio?: number;
  maxWidth?: number;
  maxHeightMobile?: number;
  maxHeightDesktop?: number;
  className?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const { ref, w } = useContainerWidth();

  const isDesktop =
    typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches : false;

  const { pageW, pageH } = useMemo(() => {
    const containerW = w || 0;

    // width target: ikuti container tapi dibatasi maxWidth
    const targetW = Math.max(260, Math.min(containerW, maxWidth));
    const targetH = Math.round(targetW * ratio);

    const capH = isDesktop ? maxHeightDesktop : maxHeightMobile;

    // Jika terlalu tinggi: skala turun tapi JAGA rasio.
    if (targetH > capH) {
      const scaledW = Math.round(capH / ratio);
      return { pageW: Math.max(240, Math.min(scaledW, targetW)), pageH: capH };
    }

    return { pageW: targetW, pageH: targetH };
  }, [w, maxWidth, ratio, maxHeightMobile, maxHeightDesktop, isDesktop]);

  if (!pages?.length) return null;

  return (
    <div ref={ref} className={className}>
      {/* Inner wrapper ikut ukuran flipbook => tidak ada whitespace “ngambang” */}
      <div className="" style={{ width: pageW }}>
        {reducedMotion ? (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div style={{ height: pageH }}>
              <PreviewImage src={pages[0].src} alt={pages[0].alt ?? "Preview"} eager />
            </div>
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {/* @ts-expect-error react-pageflip types sometimes strict */}
            <HTMLFlipBook
              width={pageW}
              height={pageH}
              size="fixed"
              showCover={false}
              mobileScrollSupport={true}
              useMouseEvents={true}
              clickEventForward={true}
              swipeDistance={24}
              maxShadowOpacity={0.2}
              flippingTime={650}
              usePortrait={true} // ✅ anti spread 2 halaman
              className="!m-0"
            >
              {pages.map((p, i) => (
                <div key={p.src + i} className="bg-white">
                  <div className="h-full w-full bg-white">
                    <PreviewImage
                      src={p.src}
                      alt={p.alt ?? `Preview halaman ${i + 1}`}
                      eager={i === 0}
                    />
                  </div>
                </div>
              ))}
            </HTMLFlipBook>
          </div>
        )}
      </div>
    </div>
  );
}

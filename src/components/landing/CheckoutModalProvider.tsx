"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type CheckoutModalCtx = {
  /** buka modal + load halaman order di iframe */
  open: (url: string) => void;
  close: () => void;
  isOpen: boolean;
  url: string | null;
};

const Ctx = createContext<CheckoutModalCtx | null>(null);

export function useCheckoutModal() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCheckoutModal must be used within CheckoutModalProvider");
  return ctx;
}

function CheckoutModal({
  isOpen,
  url,
  onClose,
}: {
  isOpen: boolean;
  url: string | null;
  onClose: () => void;
}) {
  if (!isOpen || !url) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* backdrop */}
      <button
        type="button"
        aria-label="Tutup"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/55 backdrop-blur-sm"
      />

      {/* modal */}
      <div className="absolute inset-x-3 top-[calc(env(safe-area-inset-top)+0.75rem)] bottom-[calc(env(safe-area-inset-bottom)+0.75rem)]">
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-start justify-between gap-3 border-b border-slate-200 bg-white py-3">
            <div className="min-w-0">
              <p className="text-sm font-extrabold text-slate-900">Halaman Order</p>
              <p className="mt-0.5 text-xs text-slate-600">
                Kalau tidak muncul (kadang provider memblokir iframe), klik{" "}
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = url;
                  }}
                  className="font-semibold text-emerald-700 underline underline-offset-2"
                >
                  buka halaman penuh
                </button>
                .
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden h-9 items-center justify-center rounded-full border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 sm:inline-flex"
              >
                Tab baru
              </a>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50"
                aria-label="Tutup modal"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="relative flex-1 bg-slate-50">
            <iframe
              title="Order"
              src={url}
              className="h-full w-full"
              // beberapa provider butuh izin payment
              allow="payment *; clipboard-read *; clipboard-write *"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [url, setUrl] = useState<string | null>(null);
  const isOpen = !!url;

  const close = useCallback(() => setUrl(null), []);
  const open = useCallback((nextUrl: string) => {
    if (!nextUrl) return;
    setUrl(nextUrl);
  }, []);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  // lock body scroll
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const value = useMemo(
    () => ({ open, close, isOpen, url }),
    [open, close, isOpen, url]
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <CheckoutModal isOpen={isOpen} url={url} onClose={close} />
    </Ctx.Provider>
  );
}

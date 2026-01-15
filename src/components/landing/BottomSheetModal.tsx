"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  /** override z-index if needed */
  zIndexClassName?: string;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function BottomSheetModal({
  open,
  onClose,
  title,
  subtitle,
  children,
  zIndexClassName,
}: Props) {
  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={cn("fixed inset-0", zIndexClassName ?? "z-[95]")}>
      {/* Overlay */}
      <button
        type="button"
        aria-label="Tutup"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/55 backdrop-blur-sm"
      />

      {/* Panel */}
      <div className="absolute inset-x-0 bottom-0 w-full sm:inset-0 sm:flex sm:items-center sm:justify-center sm:p-4">
        <div
          role="dialog"
          aria-modal="true"
          className="w-full rounded-t-2xl border border-slate-200 bg-white shadow-2xl sm:max-w-2xl sm:rounded-2xl"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 border-b border-slate-200 py-3">
            <div className="min-w-0">
              <p className="text-sm font-extrabold text-slate-900">{title}</p>
              {subtitle ? (
                <p className="mt-0.5 text-xs text-slate-600">{subtitle}</p>
              ) : null}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50"
              aria-label="Tutup modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Content */}
          <div className="max-h-[80dvh] overflow-y-auto py-4 sm:max-h-[70vh]">
            {children}
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 py-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-slate-900 text-sm font-extrabold text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

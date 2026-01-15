
"use client";

import { useMemo, useRef, useState } from "react";
import { track } from "@/lib/tracking";

import HeroSection from "./HeroSection";
import MicroUrgencyStrip from "./MicroUrgencyStrip";
import StickyMobileCTA from "./StickyMobileCTA";
import RadicalStorySection from "./RadicalStorySection";
import Program30DaysSection from "./Program30DaysSection";
import SocialProofSection from "./SocialProofSection";
import PricingSection, { type PlanId } from "./PricingSection";
import GuaranteeSection from "./GuaranteeSection";
import FAQSection from "./FAQSection";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function LandingPageClient() {
  // ✅ default: user belum memilih paket
  const [selectedId, setSelectedId] = useState<PlanId | null>(null);
  const [bumpSelected, setBumpSelected] = useState(false);

  // ✅ Guard super-aman: cegah double fire bahkan saat spam tap sangat cepat
  const lastSelectedRef = useRef<PlanId | null>(null);

  // ✅ AddToCart hanya 1x: saat pertama kali user memilih paket (pindah paket tidak hitung ATC)
  const atcFiredRef = useRef(false);

  const plans = useMemo(
    () => [
      { id: "basic" as const, price: 69000, pages: 1000 },
      { id: "bundle" as const, price: 99000, pages: 1250 },
    ],
    []
  );

  const checkoutUrls = useMemo(
    () => ({
      basic: {
        noBump: process.env.NEXT_PUBLIC_CHECKOUT_BASIC ?? "",
        bump: process.env.NEXT_PUBLIC_CHECKOUT_BASIC_BUMP ?? "",
      },
      bundle: {
        noBump: process.env.NEXT_PUBLIC_CHECKOUT_BUNDLE ?? "",
        bump: process.env.NEXT_PUBLIC_CHECKOUT_BUNDLE_BUMP ?? "",
      },
    }),
    []
  );

  const checkoutUrl = useMemo(() => {
    if (!selectedId) return "";
    const v = checkoutUrls[selectedId];
    return bumpSelected ? v.bump : v.noBump;
  }, [selectedId, bumpSelected, checkoutUrls]);

  function onSelect(id: PlanId) {
    setSelectedId(id);

    // Fire ATC only once for the first ever selection
    if (!atcFiredRef.current) {
      atcFiredRef.current = true;
      try {
        track("AddToCart", {
          content_type: "product",
          content_ids: [id],
          value: id === "basic" ? 69000 : 99000,
          currency: "IDR",
        });
      } catch {}
    }

    // Guard to prevent spamming selection event
    if (lastSelectedRef.current !== id) {
      lastSelectedRef.current = id;
      try {
        track("SelectContent", { content_type: "pricing_card", content_ids: [id] });
      } catch {}
    }
  }

  function onToggleBump(v: boolean) {
    setBumpSelected(v);
  }

  return (
    <div className="bg-white text-slate-900 pb-24">
      <>
      <HeroSection />

      <MicroUrgencyStrip onClick={() => scrollToId('pricing')} />

      <RadicalStorySection />

      <Program30DaysSection ctaHref="#pricing" />

      <SocialProofSection />

      <PricingSection
        plans={plans}
        selectedId={selectedId}
        onSelect={(id) => {
          onSelect(id);
          // optional: scroll to pricing to keep momentum
          scrollToId("pricing");
        }}
        bumpSelected={bumpSelected}
        onToggleBump={onToggleBump}
        bumpPrice={19000}
        checkoutUrl={checkoutUrl}
      />

      <GuaranteeSection />

      <FAQSection />

      <StickyMobileCTA onClick={() => scrollToId('pricing')} />
    </>
    </div>
  );
}

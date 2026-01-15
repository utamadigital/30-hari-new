"use client";

import { useEffect } from "react";
import { track } from "@/lib/tracking";

export default function TrackingProvider() {
  // ViewContent (page view)
  useEffect(() => {
    track("ViewContent", { page: "LP Anak Muslim" });
  }, []);

  return null; // tidak render apa-apa
}

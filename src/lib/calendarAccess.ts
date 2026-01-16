export type AccessTier = "BASIC" | "PROGRAM_30" | "FULL";

export type LearningType = "islami" | "umum" | "bonus";

/**
 * GANTI KODE DI SINI (satu tempat) sesuai kebutuhanmu.
 *
 * - BASIC: hanya buka 7 hari + hanya tipe "islami"
 * - PROGRAM_30: buka 30 hari + tipe "islami" & "umum"
 * - FULL: buka 60 hari + tipe "islami" & "umum" & "bonus"
 */
export const ACCESS_CODES: Record<string, AccessTier> = {
  // contoh kode (silakan ganti)
  BASIC7: "BASIC",
  PROG30: "PROGRAM_30",
  FULL60: "FULL",
};

export const ACCESS_STORAGE_KEY = "pb_calendar_access_tier_v1";
export const ACCESS_CODE_STORAGE_KEY = "pb_calendar_access_code_v1";

export function normalizeCode(raw: string) {
  return (raw ?? "").trim().toUpperCase();
}

export function tierFromCode(rawCode: string): AccessTier | null {
  const code = normalizeCode(rawCode);
  return ACCESS_CODES[code] ?? null;
}

export function getTierLimits(tier: AccessTier) {
  if (tier === "BASIC") {
    return {
      unlockedDays: 7,
      types: ["islami"] as LearningType[],
    };
  }

  if (tier === "PROGRAM_30") {
    return {
      unlockedDays: 30,
      types: ["islami", "umum"] as LearningType[],
    };
  }

  return {
    unlockedDays: 60,
    types: ["islami", "umum", "bonus"] as LearningType[],
  };
}

export function tierLabel(tier: AccessTier) {
  if (tier === "BASIC") return "Basic (7 Hari — Islami saja)";
  if (tier === "PROGRAM_30") return "Program 30 Hari (Islami + Umum)";
  return "Full Pendampingan (Semua terbuka + Bonus)";
}

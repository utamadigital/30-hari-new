import type { Metadata } from "next";
import Calendar60Client from "@/components/calendar/Calendar60Client";

export const metadata: Metadata = {
  title: "Kalender Belajar 60 Hari",
  description: "Kalender belajar 60 hari dengan sistem lock berdasarkan paket.",
};

export default function KalenderPage() {
  return <Calendar60Client />;
}

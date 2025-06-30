import { Noto_Nastaliq_Urdu } from "next/font/google";

export const arabicFont = Noto_Nastaliq_Urdu({
  weight: ["400", "700"],
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-arabic",
  fallback: ["sans-serif"],
});

export const arabicFontClass = arabicFont.className;

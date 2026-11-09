import { z } from "zod";

const hex = z.string().regex(/^#[0-9a-fA-F]{6}$/, "6-digit hex colour");

export const iconNames = ["shield", "gift", "heart", "clock", "paw"] as const;

export const benefitSchema = z.object({
  icon: z.enum(iconNames),
  title: z.string(),
  value: z.number().nonnegative(),
  // currency -> "$1,840", count -> "4", days -> "2.5 days"
  format: z.enum(["currency", "count", "days"]),
  caption: z.string(),
});

export const videoSchema = z.object({
  headline: z.string(),
  subhead: z.string(),
  currency: z.string(),
  theme: z.object({
    ink: hex,
    accent: hex,
    surface: hex,
    soft: hex,
    mid: hex,
    cta: hex,
  }),
  benefits: z.array(benefitSchema).min(1).max(8),
  cta: z.string(),
});

export type Benefit = z.infer<typeof benefitSchema>;
export type VideoProps = z.infer<typeof videoSchema>;
export type Theme = VideoProps["theme"];

// Scene lengths in frames at 30 fps. Total duration is derived from the
// number of benefits, so adding a row to the JSON lengthens the video.
export const FPS = 30;
export const INTRO = 75;
export const PER_BENEFIT = 80;
export const SUMMARY = 120;
export const OUTRO = 80;

export const totalFrames = (benefitCount: number) =>
  INTRO + benefitCount * PER_BENEFIT + SUMMARY + OUTRO;

export const formatValue = (b: Benefit, v: number, currency: string) => {
  if (b.format === "currency")
    return `${currency}${Math.round(v).toLocaleString("en-AU")}`;
  if (b.format === "days") return `${v.toFixed(1)} days`;
  return `${Math.round(v)}`;
};

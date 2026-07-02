import { GA_MEASUREMENT_ID } from "@/lib/constants";

export function resolveGaMeasurementId(): string | null {
  const fromEnv = process.env.NEXT_PUBLIC_GA_ID?.trim();
  if (fromEnv) return fromEnv;
  if (process.env.NODE_ENV === "production") return GA_MEASUREMENT_ID;
  return null;
}

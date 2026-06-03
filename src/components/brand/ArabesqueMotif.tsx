import { cn } from "@/lib/utils";

type ArabesqueMotifProps = {
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
};

export function ArabesqueMotif({
  className,
  primaryColor = "var(--color-primary)",
  secondaryColor = "var(--color-secondary)",
}: ArabesqueMotifProps) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full max-w-md h-auto", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id="motif-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0.35" />
          <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="200" r="160" fill="url(#motif-grad)" />
      <path
        d="M200 80c40 60 80 90 120 100-30 50-70 90-120 120-50-30-90-70-120-120 40-10 80-40 120-100Z"
        stroke={primaryColor}
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M140 200h120M200 140v120"
        stroke={secondaryColor}
        strokeWidth="1.5"
        opacity="0.7"
      />
      <path
        d="M160 160c20 20 40 30 80 40M160 240c30-10 60-30 80-60M240 160c-20 30-40 60-80 80"
        stroke={primaryColor}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <text
        x="200"
        y="215"
        textAnchor="middle"
        fontSize="72"
        fontFamily="Georgia, 'Times New Roman', serif"
        fill={primaryColor}
        opacity="0.85"
      >
        ع
      </text>
      <text
        x="248"
        y="248"
        textAnchor="middle"
        fontSize="48"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontStyle="italic"
        fill={secondaryColor}
      >
        ñ
      </text>
      <ellipse
        cx="200"
        cy="320"
        rx="100"
        ry="12"
        fill={primaryColor}
        opacity="0.08"
      />
    </svg>
  );
}

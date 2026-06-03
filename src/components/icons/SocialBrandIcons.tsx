import { cn } from "@/lib/utils";

type BrandIconProps = {
  className?: string;
};

export function XBrandIcon({ className }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5", className)} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  );
}

export function FacebookBrandIcon({ className }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5", className)} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path
        fill="currentColor"
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
    </svg>
  );
}

export function InstagramBrandIcon({ className }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5", className)} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="instagram-official-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFDC80" />
          <stop offset="18%" stopColor="#F77737" />
          <stop offset="40%" stopColor="#E1306C" />
          <stop offset="65%" stopColor="#C13584" />
          <stop offset="100%" stopColor="#833AB4" />
        </linearGradient>
      </defs>
      <path
        className="fill-[url(#instagram-official-gradient)] transition-[fill] duration-200 group-hover:!fill-white"
        d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608-.058-1.266-.069-1.646-.069-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308 1.266-.058 1.646-.069 4.85-.069zM12 0C8.741 0 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.497 2.913.558 1.28.058 1.689.072 4.948.072s3.668-.014 4.948-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.497-1.636.558-2.913.058-1.28.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.498-2.913-.558C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
      />
    </svg>
  );
}

export function LinkedInBrandIcon({ className }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5", className)} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.062 2.062 0 114.126 0 2.062 2.062 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

export function YouTubeBrandIcon({ className }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5", className)} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path
        fill="currentColor"
        d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
      />
    </svg>
  );
}

export type SocialBrandId = "x" | "facebook" | "instagram" | "linkedin" | "youtube";

export const SOCIAL_BRAND_ICONS: Record<
  SocialBrandId,
  {
    Icon: typeof XBrandIcon;
    label: string;
    iconClass: string;
    iconHoverClass: string;
    hoverClass: string;
  }
> = {
  x: {
    Icon: XBrandIcon,
    label: "Follow us on X",
    iconClass: "text-footer-heading",
    iconHoverClass: "group-hover:text-[#000000]",
    hoverClass: "hover:border-white/90 hover:bg-white",
  },
  facebook: {
    Icon: FacebookBrandIcon,
    label: "Follow us on Facebook",
    iconClass: "text-[#1877F2]",
    iconHoverClass: "group-hover:text-white",
    hoverClass: "hover:border-[#1877F2] hover:bg-[#1877F2]",
  },
  instagram: {
    Icon: InstagramBrandIcon,
    label: "Follow us on Instagram",
    iconClass: "",
    iconHoverClass: "",
    hoverClass:
      "hover:border-transparent hover:bg-[linear-gradient(135deg,#f9ce34_0%,#ee2a7b_45%,#6228d7_100%)]",
  },
  linkedin: {
    Icon: LinkedInBrandIcon,
    label: "Follow us on LinkedIn",
    iconClass: "text-[#0A66C2]",
    iconHoverClass: "group-hover:text-white",
    hoverClass: "hover:border-[#0A66C2] hover:bg-[#0A66C2]",
  },
  youtube: {
    Icon: YouTubeBrandIcon,
    label: "Subscribe on YouTube",
    iconClass: "text-[#FF0000]",
    iconHoverClass: "group-hover:text-white",
    hoverClass: "hover:border-[#FF0000] hover:bg-[#FF0000]",
  },
};

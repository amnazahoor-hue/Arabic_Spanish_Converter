import type { IconType } from "react-icons";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaQuora,
  FaReddit,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

export type SocialBrandId =
  | "x"
  | "facebook"
  | "instagram"
  | "linkedin"
  | "youtube"
  | "quora"
  | "reddit";

export const SOCIAL_BRAND_ICONS: Record<
  SocialBrandId,
  {
    Icon: IconType;
    label: string;
    iconClass: string;
    iconHoverClass: string;
    hoverClass: string;
  }
> = {
  x: {
    Icon: FaXTwitter,
    label: "Follow us on X",
    iconClass: "text-footer-heading",
    iconHoverClass: "group-hover:text-[#000000]",
    hoverClass: "hover:border-white/90 hover:bg-white",
  },
  facebook: {
    Icon: FaFacebook,
    label: "Follow us on Facebook",
    iconClass: "text-[#1877F2]",
    iconHoverClass: "group-hover:text-white",
    hoverClass: "hover:border-[#1877F2] hover:bg-[#1877F2]",
  },
  instagram: {
    Icon: FaInstagram,
    label: "Follow us on Instagram",
    iconClass: "text-[#E4405F]",
    iconHoverClass: "group-hover:text-white",
    hoverClass: "hover:border-[#E4405F] hover:bg-[#E4405F]",
  },
  linkedin: {
    Icon: FaLinkedin,
    label: "Follow us on LinkedIn",
    iconClass: "text-[#0A66C2]",
    iconHoverClass: "group-hover:text-white",
    hoverClass: "hover:border-[#0A66C2] hover:bg-[#0A66C2]",
  },
  youtube: {
    Icon: FaYoutube,
    label: "Subscribe on YouTube",
    iconClass: "text-[#FF0000]",
    iconHoverClass: "group-hover:text-white",
    hoverClass: "hover:border-[#FF0000] hover:bg-[#FF0000]",
  },
  quora: {
    Icon: FaQuora,
    label: "Follow us on Quora",
    iconClass: "text-[#B92B27]",
    iconHoverClass: "group-hover:text-white",
    hoverClass: "hover:border-[#B92B27] hover:bg-[#B92B27]",
  },
  reddit: {
    Icon: FaReddit,
    label: "Follow us on Reddit",
    iconClass: "text-[#FF4500]",
    iconHoverClass: "group-hover:text-white",
    hoverClass: "hover:border-[#FF4500] hover:bg-[#FF4500]",
  },
};

import type { IconType } from "react-icons";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
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
  | "pinterest"
  | "quora"
  | "reddit";

export const SOCIAL_BRAND_ICONS: Record<
  SocialBrandId,
  {
    Icon: IconType;
    label: string;
    brandColor: string;
  }
> = {
  x: {
    Icon: FaXTwitter,
    label: "Síguenos en X",
    brandColor: "#ffffff",
  },
  facebook: {
    Icon: FaFacebook,
    label: "Síguenos en Facebook",
    brandColor: "#1877F2",
  },
  instagram: {
    Icon: FaInstagram,
    label: "Síguenos en Instagram",
    brandColor: "#E4405F",
  },
  linkedin: {
    Icon: FaLinkedin,
    label: "Síguenos en LinkedIn",
    brandColor: "#0A66C2",
  },
  youtube: {
    Icon: FaYoutube,
    label: "Suscríbete en YouTube",
    brandColor: "#FF0000",
  },
  pinterest: {
    Icon: FaPinterest,
    label: "Síguenos en Pinterest",
    brandColor: "#E60023",
  },
  quora: {
    Icon: FaQuora,
    label: "Síguenos en Quora",
    brandColor: "#B92B27",
  },
  reddit: {
    Icon: FaReddit,
    label: "Síguenos en Reddit",
    brandColor: "#FF4500",
  },
};

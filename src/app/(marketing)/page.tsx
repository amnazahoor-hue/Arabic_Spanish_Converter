import { Hero } from "@/components/sections/Hero";
import dynamic from "next/dynamic";

const HowItWorks = dynamic(() =>
  import("@/components/sections/HowItWorks").then((mod) => mod.HowItWorks),
);

const CommonPhrases = dynamic(() =>
  import("@/components/sections/CommonPhrases").then((mod) => mod.CommonPhrases),
);

const ArabicDialects = dynamic(() =>
  import("@/components/sections/ArabicDialects").then((mod) => mod.ArabicDialects),
);

const AiTranslatorFeatures = dynamic(() =>
  import("@/components/sections/AiTranslatorFeatures").then((mod) => mod.AiTranslatorFeatures),
);

const UserTestimonials = dynamic(() =>
  import("@/components/sections/UserTestimonials").then((mod) => mod.UserTestimonials),
);

const Features = dynamic(() =>
  import("@/components/sections/Features").then((mod) => mod.Features),
);

const Faq = dynamic(() => import("@/components/sections/Faq").then((mod) => mod.Faq));

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <CommonPhrases />
      <ArabicDialects />
      <AiTranslatorFeatures />
      <UserTestimonials />
      <Faq />
    </>
  );
}

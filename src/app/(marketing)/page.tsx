import { Hero } from "@/components/sections/Hero";
import { JsonLd } from "@/components/seo/JsonLd";
import { homePageSchemas } from "@/lib/schema";
import dynamic from "next/dynamic";

const Features = dynamic(
  () => import("@/components/sections/Features").then((mod) => mod.Features),
  { loading: () => null },
);

const HowItWorks = dynamic(
  () => import("@/components/sections/HowItWorks").then((mod) => mod.HowItWorks),
  { loading: () => null },
);

const CommonPhrases = dynamic(
  () => import("@/components/sections/CommonPhrases").then((mod) => mod.CommonPhrases),
  { loading: () => null },
);

const ArabicDialects = dynamic(
  () => import("@/components/sections/ArabicDialects").then((mod) => mod.ArabicDialects),
  { loading: () => null },
);

const AiTranslatorFeatures = dynamic(
  () => import("@/components/sections/AiTranslatorFeatures").then((mod) => mod.AiTranslatorFeatures),
  { loading: () => null },
);

const Faq = dynamic(() => import("@/components/sections/Faq").then((mod) => mod.Faq), {
  loading: () => null,
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={homePageSchemas()} />
      <Hero />
      <Features />
      <HowItWorks />
      <CommonPhrases />
      <ArabicDialects />
      <AiTranslatorFeatures />
      <Faq />
    </>
  );
}

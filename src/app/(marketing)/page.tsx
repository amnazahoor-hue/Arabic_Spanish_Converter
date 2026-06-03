import { Hero } from "@/components/sections/Hero";
import { Translator } from "@/components/sections/Translator";
import dynamic from "next/dynamic";

const HowItWorks = dynamic(() =>
  import("@/components/sections/HowItWorks").then((mod) => mod.HowItWorks),
);

const Features = dynamic(() =>
  import("@/components/sections/Features").then((mod) => mod.Features),
);

const Faq = dynamic(() => import("@/components/sections/Faq").then((mod) => mod.Faq));

export default function HomePage() {
  return (
    <>
      <Hero />
      <Translator />
      <HowItWorks />
      <Features />
      <Faq />
    </>
  );
}

import { Hero } from "@/components/sections/Hero";
import { HomeBelowFoldSections } from "@/components/sections/HomeBelowFoldSections";
import { JsonLd } from "@/components/seo/JsonLd";
import { homePageSchemas } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <JsonLd data={homePageSchemas()} />
      <Hero />
      <HomeBelowFoldSections />
    </>
  );
}

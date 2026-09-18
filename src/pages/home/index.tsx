import { PageMeta } from "@/components/PageMeta";
import { PageDivider } from "@/components/PageDivider";
import { PageShell } from "@/components/PageShell";

import { AboutMeSection } from "./sections/AboutMeSection";
import { HeroSection } from "./sections/HeroSection";
import { ServicesSection } from "./sections/ServicesSection";
import { SkillGridSection } from "./sections/SkillGridSection";
import "./home.scss";

export const Home = () => (
  <PageShell id="home">
    <PageMeta page="home" />
    <HeroSection />
    <AboutMeSection />
    <PageDivider />
    <ServicesSection />
    <PageDivider />
    <SkillGridSection />
  </PageShell>
);

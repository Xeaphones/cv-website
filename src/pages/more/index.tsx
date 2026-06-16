import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import { PageMeta } from "@/components/PageMeta";
import { PageDivider } from "@/components/PageDivider";
import { PageShell } from "@/components/PageShell";

import { CvDownloadSection } from "./sections/CvDownloadSection";
import { DetailedSkillsSection } from "./sections/DetailedSkillsSection";
import { EducationTimelineSection } from "./sections/EducationTimelineSection";
import { InterestsSection } from "./sections/InterestsSection";
import "./more.scss";

export const More = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, [location]);

  return (
    <PageShell id="more">
      <PageMeta page="more" />
      <DetailedSkillsSection />
      <PageDivider />
      <EducationTimelineSection />
      <PageDivider />
      <InterestsSection />
      <PageDivider />
      <CvDownloadSection />
    </PageShell>
  );
};

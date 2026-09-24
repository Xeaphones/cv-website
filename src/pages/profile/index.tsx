import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import { PageMeta } from "@/shared/components/PageMeta";
import { PageDivider } from "@/shared/components/PageDivider";
import { PageShell } from "@/shared/components/PageShell";

import { CvDownloadSection } from "./sections/CvDownloadSection";
import { DetailedSkillsSection } from "./sections/DetailedSkillsSection";
import { EducationTimelineSection } from "./sections/EducationTimelineSection";
import { InterestsSection } from "./sections/InterestsSection";

export const Profile = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, [location]);

  return (
    <PageShell id="profile">
      <PageMeta page="profile" />
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

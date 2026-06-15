import { useTranslation } from "react-i18next";

import { PageSection } from "@/components/PageSection";
import { Timeline, TimelineItem } from "@/components/timeline";
import { useFormations } from "@/lib/content";

export function EducationTimelineSection() {
  const { t } = useTranslation();
  const formations = useFormations();

  return (
    <PageSection id="formations" title={t("formations")}>
      <Timeline>
        {formations.map((formation) => (
          <TimelineItem
            key={formation.slug}
            date={formation.dateLabel}
            title={formation.title}
            location={formation.location}
          >
            {formation.bullets.length > 0 && (
              <ul>
                {formation.bullets.map((bullet: string) => (
                  <li key={bullet} className="break-words">
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </TimelineItem>
        ))}
      </Timeline>
    </PageSection>
  );
}

import { useTranslation } from "react-i18next";

import { PageSection } from "@/components/PageSection";
import { Timeline, TimelineItem } from "@/components/timeline";
import { useExperiences } from "@/lib/content";

export function ExperienceTimelineSection() {
  const { t } = useTranslation();
  const experiences = useExperiences();

  return (
    <PageSection id="experiences" title={t("experiences")}>
      <Timeline>
        {experiences.map((experience) => (
          <TimelineItem
            key={experience.slug}
            date={experience.dateLabel}
            title={experience.title}
            location={
              experience.companyUrl && experience.company ? (
                <a href={experience.companyUrl} target="_blank" rel="noreferrer">
                  {experience.location ?? experience.company}
                </a>
              ) : (
                experience.location
              )
            }
          >
            {experience.summary && <p>{experience.summary}</p>}
            {experience.bullets.length > 0 && (
              <ul>
                {experience.bullets.map((bullet: string) => (
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

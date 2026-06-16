import { useTranslation } from "react-i18next";

import InterestCard from "@/components/interestContainer";
import { PageSection } from "@/components/PageSection";
import { CherryFlower, Clapperboard, Controller, Data, Note } from "@/assets/svg";

const INTERESTS = [
  { titleKey: "gaming", icon: Controller },
  { titleKey: "music", icon: Note },
  { titleKey: "computer", icon: Data },
  { titleKey: "movie", icon: Clapperboard },
  { titleKey: "jCulture", icon: CherryFlower },
] as const;

export function InterestsSection() {
  const { t } = useTranslation();

  return (
    <PageSection id="interest" title={t("interest")}>
      <div className="mx-auto flex w-full max-w-5xl flex-wrap justify-evenly gap-4">
        {INTERESTS.map(({ titleKey, icon: Icon }) => (
          <InterestCard
            key={titleKey}
            title={t(titleKey)}
            icon={<Icon />}
            className="h-full min-w-[8.5rem] max-w-[12rem] flex-[1_1_8.5rem]"
          />
        ))}
      </div>
    </PageSection>
  );
}

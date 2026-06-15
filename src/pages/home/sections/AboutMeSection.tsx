import { useTranslation } from "react-i18next";

import { PageSection } from "@/components/PageSection";
import { calculateAge } from "@/lib/age";
import { useIsMobile } from "@/lib/hooks";
import photoOfMoi from "@/assets/img/photoofmoi.jpg";

export function AboutMeSection() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <PageSection id="aboutme" title={t("aboutme")}>
      <div className="flex">
        {!isMobile && <img src={photoOfMoi} className="w-[10rem]" alt="A photo of me" />}
        <div className="flex flex-col flex-wrap">
          <div className="flex info text-2xl flex-wrap">
            <p>
              {calculateAge()} {t("years")}
            </p>
            <span>/</span>
            <p>Toulouse</p>
            <span>/</span>
            <p>{t("student")}</p>
          </div>
          <p className="py-10 px-[1rem] text-md text-justify leading-6">{t("bio")}</p>
          <div className="flex contact items-center justify-center text-lg flex-wrap">
            <a href="mailto:yohan.velay@free.fr">yohan.velay@free.fr</a>
            <span>/</span>
            <p>07 81 07 21 78</p>
          </div>
        </div>
      </div>
    </PageSection>
  );
}

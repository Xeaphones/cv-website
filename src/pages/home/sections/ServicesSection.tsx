import { useTranslation } from "react-i18next";

import Card from "@/components/card";
import { PageSection } from "@/components/PageSection";

import apiBlackIMG from "@/assets/img/api_black_128.png";
import apiWhiteIMG from "@/assets/img/api_white_128.png";
import codeBlackIMG from "@/assets/img/code_black_128.png";
import codeWhiteIMG from "@/assets/img/code_white_128.png";
import gameDevBlackIMG from "@/assets/img/game-dev_black_128.png";
import gameDevWhiteIMG from "@/assets/img/game-dev_white_128.png";

export function ServicesSection() {
  const { t } = useTranslation();

  return (
    <PageSection id="wicd" title={t("services")}>
      <div className="flex justify-center gap-20 flex-wrap">
        <Card
          title={t("webDevTitle")}
          content={t("webDevContent")}
          imgSRC={{ light: codeBlackIMG, dark: codeWhiteIMG }}
          imgALT="Web Development icon"
        />
        <Card
          title={t("apiDevTitle")}
          content={t("apiDevContent")}
          imgSRC={{ light: apiBlackIMG, dark: apiWhiteIMG }}
          imgALT="API Icon"
        />
        <Card
          title={t("gameDevTitle")}
          content={t("gameDevContent")}
          imgSRC={{ light: gameDevBlackIMG, dark: gameDevWhiteIMG }}
          imgALT="Game Development icon"
        />
        <Card
          title={t("appDevTitle")}
          content={t("appDevContent")}
          imgSRC={{ light: codeBlackIMG, dark: codeWhiteIMG }}
          imgALT="Application Development icon"
        />
      </div>
    </PageSection>
  );
}

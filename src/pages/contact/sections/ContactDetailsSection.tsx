import { useTranslation } from "react-i18next";

import { PageSection } from "@/components/PageSection";

export function ContactDetailsSection() {
  const { t } = useTranslation();

  return (
    <PageSection id="contacts">
      <p className="text-xl text-center m-5">
        <span className="text-primary">Mail:</span>{" "}
        <a href="mailto:yohan.velay@free.fr">yohan.velay@free.fr</a>
      </p>
      <p className="text-xl text-center m-5">
        <span className="text-primary">{t("phone")}:</span> 07 81 07 21 78
      </p>
    </PageSection>
  );
}

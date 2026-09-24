import { PageMeta } from "@/shared/components/PageMeta";
import { PageDivider } from "@/shared/components/PageDivider";
import { PageShell } from "@/shared/components/PageShell";

import { ContactDetailsSection } from "./sections/ContactDetailsSection";
import { ContactFormSection } from "./sections/ContactFormSection";
import { SocialLinksSection } from "./sections/SocialLinksSection";

export const Contact = () => (
  <PageShell id="contact">
    <PageMeta page="contact" />
    <ContactDetailsSection />
    <PageDivider />
    <SocialLinksSection />
    <PageDivider />
    <ContactFormSection />
  </PageShell>
);

import { PageMeta } from "@/components/PageMeta";
import { PageDivider } from "@/components/PageDivider";
import { PageShell } from "@/components/PageShell";

import { ContactDetailsSection } from "./sections/ContactDetailsSection";
import { ContactFormSection } from "./sections/ContactFormSection";
import { SocialLinksSection } from "./sections/SocialLinksSection";
import "./contact.scss";

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

import { useTranslation } from "react-i18next";

import { ThemedIcon } from "@/components/ThemedIcon";
import { PageSection } from "@/components/PageSection";
import { useToast } from "@/components/ui/use-toast";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Discord, Github, Linkedin } from "@/assets/svg";
import { SITE_LINKS } from "@/lib/siteConfig";

export function SocialLinksSection() {
  const { t } = useTranslation();
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          variant: "success",
          title: t("clipboardSuccess"),
          duration: 3000,
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: t("clipboardError"),
          duration: 3000,
        });
      });
  };

  return (
    <PageSection id="socials">
      <div className="flex justify-center gap-10">
        <HoverCard closeDelay={0} openDelay={200}>
          <HoverCardTrigger className="w-20" href={SITE_LINKS.linkedin} target="_blank">
            <i>
              <Linkedin />
            </i>
          </HoverCardTrigger>
          <HoverCardContent>
            <p className="text-center text-primary">
              <strong>Linkedin</strong>
            </p>
            <p className="text-center">Yohan Velay</p>
          </HoverCardContent>
        </HoverCard>
        <HoverCard closeDelay={0} openDelay={200}>
          <HoverCardTrigger className="w-20" href={SITE_LINKS.github} target="_blank">
            <i>
              <ThemedIcon icon={Github} />
            </i>
          </HoverCardTrigger>
          <HoverCardContent>
            <p className="text-center text-primary">
              <strong>Github</strong>
            </p>
            <p className="text-center">Xeaphones</p>
          </HoverCardContent>
        </HoverCard>
        <HoverCard closeDelay={0} openDelay={200}>
          <HoverCardTrigger className="w-20" onClick={() => copyToClipboard("xeaphones")}>
            <i>
              <Discord />
            </i>
          </HoverCardTrigger>
          <HoverCardContent>
            <p className="text-center text-primary">
              <strong>Discord</strong>
            </p>
            <p className="text-center">xeaphones</p>
          </HoverCardContent>
        </HoverCard>
      </div>
    </PageSection>
  );
}

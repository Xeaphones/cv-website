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
      <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
        <HoverCard closeDelay={0} openDelay={200}>
          <HoverCardTrigger
            className="flex cursor-pointer items-center justify-center rounded-lg border border-border/60 bg-card/30 p-4 shadow-sm transition-colors hover:border-primary/40 hover:bg-card/50"
            href={SITE_LINKS.linkedin}
            target="_blank"
          >
            <i className="h-8 w-8">
              <Linkedin className="h-full w-full" />
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
          <HoverCardTrigger
            className="flex cursor-pointer items-center justify-center rounded-lg border border-border/60 bg-card/30 p-4 shadow-sm transition-colors hover:border-primary/40 hover:bg-card/50"
            href={SITE_LINKS.github}
            target="_blank"
          >
            <i className="h-8 w-8">
              <ThemedIcon icon={Github} className="h-full w-full" />
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
          <HoverCardTrigger
            className="flex cursor-pointer items-center justify-center rounded-lg border border-border/60 bg-card/30 p-4 shadow-sm transition-colors hover:border-primary/40 hover:bg-card/50"
            onClick={() => copyToClipboard("xeaphones")}
          >
            <i className="h-8 w-8">
              <Discord className="h-full w-full" />
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

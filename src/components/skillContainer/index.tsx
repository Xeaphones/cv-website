import { useNavigate, useLocation } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { useIsMobile, useLocalePath } from "@/lib/hooks";
import { stripLocalePrefix } from "@/lib/locale";
import style from "./skillcontainer.module.scss";

type SkillContainerContent = {
  icon: JSX.Element;
  name: string;
  content: JSX.Element | string;
  firstFillNone?: boolean;
};

const SkillContainer = ({ icon, name, content, firstFillNone }: SkillContainerContent) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const moreSkillsPath = useLocalePath("/more#skills");

  let infoDiv = null;
  if (typeof content === "string" && content !== "") {
    infoDiv = (
      <div className={style.Info}>
        <p className={style.Name}>
          <strong>{name}</strong>
        </p>
        <p className={style.Content}>{content}</p>
      </div>
    );
  }

  const goToSkill = () => {
    if (stripLocalePrefix(location.pathname) === "/more") {
      document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", moreSkillsPath);
    } else {
      navigate(moreSkillsPath);
    }
  };

  return (
    <HoverCard closeDelay={0} openDelay={200}>
      <HoverCardTrigger
        onClick={goToSkill}
        className={[
          infoDiv === null ? style.SkillIconContainer : undefined,
          style.SkillContainer,
          firstFillNone ? style.firstFillNone : undefined,
          isMobile ? style.mobile : undefined,
        ].join(" ")}
      >
        <i>{icon}</i>
        {infoDiv}
      </HoverCardTrigger>
      {typeof content !== "string" && (
        <HoverCardContent>
          <p className="text-center text-primary">
            <strong>{name}</strong>
          </p>
          {content}
        </HoverCardContent>
      )}
    </HoverCard>
  );
};

export default SkillContainer;

import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type SkillBarContent = {
  name: string;
  percent: number;
  color?: string;
  icon?: JSX.Element;
  animationDelay?: number;
};

const SkillBar = ({ name, percent, color, icon, animationDelay }: SkillBarContent) => {
  const isMobile = useIsMobile();

  return (
    <div className={cn("flex gap-3", isMobile ? "w-full" : "w-[48%]")}>
      {icon ? (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center self-start pt-0.5 [&_svg]:h-5 [&_svg]:w-5">
          {icon}
        </div>
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-sm font-medium leading-snug">{name}</p>
          <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{percent}%</span>
        </div>
        <Progress value={percent} color={color} animationDelay={animationDelay} />
      </div>
    </div>
  );
};

export default SkillBar;

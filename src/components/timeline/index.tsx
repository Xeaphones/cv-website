import { Children, cloneElement, isValidElement, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export type TimelineSide = "left" | "right";

type TimelineProps = {
  children: ReactNode;
  className?: string;
  /** First item side on desktop. Defaults to `"right"`. */
  startSide?: TimelineSide;
};

function getSideForIndex(index: number, startSide: TimelineSide): TimelineSide {
  const sides: TimelineSide[] = startSide === "right" ? ["right", "left"] : ["left", "right"];
  return sides[index % 2];
}

export function Timeline({ children, className, startSide = "right" }: TimelineProps) {
  const items = Children.map(children, (child, index) => {
    if (!isValidElement<TimelineItemProps>(child)) {
      return child;
    }

    const side = child.props.side ?? getSideForIndex(index, startSide);
    return cloneElement(child, { side });
  });

  return (
    <div className={cn("relative mx-auto w-full max-w-5xl px-1 sm:px-0", className)}>
      <div
        aria-hidden
        className="absolute bottom-4 left-[0.4375rem] top-4 w-px bg-border/80 lg:left-1/2 lg:-translate-x-px"
      />
      <ol className="flex flex-col">{items}</ol>
    </div>
  );
}

export type TimelineItemProps = {
  side?: TimelineSide;
  date: string;
  title: string;
  location?: ReactNode;
  children: ReactNode;
};

type TimelineCardProps = {
  date: string;
  title: string;
  location?: ReactNode;
  children: ReactNode;
  className?: string;
};

function TimelineCard({ date, title, location, children, className }: TimelineCardProps) {
  return (
    <article
      className={cn(
        "w-full min-w-0 rounded-lg border border-border/60 bg-card/30 p-4 shadow-sm sm:p-5",
        "lg:max-w-lg",
        className,
      )}
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <time className="min-w-0 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {date}
          </time>
          {location ? (
            <div
              className={cn(
                "min-w-0 max-w-full text-xs leading-snug text-muted-foreground",
                "break-words text-right sm:max-w-[58%]",
                "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:opacity-85",
              )}
            >
              {location}
            </div>
          ) : null}
        </div>
        <h3 className="mt-1 break-words text-base font-semibold leading-snug text-primary sm:text-lg">
          {title}
        </h3>
      </div>
      <div
        className={cn(
          "mt-3 space-y-2 text-sm leading-relaxed text-foreground",
          "[&_a]:break-words [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:opacity-85",
          "[&_li]:break-words [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5",
          "[&_p]:break-words [&_p]:text-muted-foreground",
        )}
      >
        {children}
      </div>
    </article>
  );
}

function TimelineDot() {
  return (
    <div
      aria-hidden
      className="h-3.5 w-3.5 shrink-0 rounded-full border-2 border-primary bg-background shadow-[0_0_0_3px_hsl(var(--background))]"
    />
  );
}

export function TimelineItem({ side = "right", date, title, location, children }: TimelineItemProps) {
  const isLeft = side === "left";

  return (
    <li
      className={cn(
        "relative grid items-start gap-x-3 pb-8 last:pb-0 sm:gap-x-4 sm:pb-10",
        "grid-cols-[auto_minmax(0,1fr)]",
        "lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-x-6 xl:gap-x-8",
      )}
    >
      <div className="col-start-1 row-start-1 justify-self-start pt-1.5 lg:col-start-2 lg:justify-self-center lg:pt-2">
        <TimelineDot />
      </div>

      <div
        className={cn(
          "col-start-2 row-start-1 min-w-0",
          isLeft
            ? "lg:col-start-1 lg:flex lg:justify-end lg:pr-4 xl:pr-8"
            : "lg:col-start-3 lg:pl-4 xl:pl-8",
        )}
      >
        <TimelineCard date={date} title={title} location={location}>
          {children}
        </TimelineCard>
      </div>
    </li>
  );
}

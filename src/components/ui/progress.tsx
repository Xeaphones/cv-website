import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

type ProgressProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  value?: number;
  color?: string;
  animationDelay?: number;
};

const Progress = ({
  className,
  value = 0,
  color,
  animationDelay = 120,
  ...props
}: ProgressProps) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    setProgress(0);
    const timer = window.setTimeout(() => setProgress(value), animationDelay);
    return () => window.clearTimeout(timer);
  }, [value, animationDelay]);

  return (
    <ProgressPrimitive.Root
      className={cn("relative h-1.5 w-full overflow-hidden rounded-full bg-muted/80", className)}
      value={progress}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 rounded-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: `translateX(-${100 - progress}%)`,
          backgroundColor: color ?? "hsl(var(--primary))",
        }}
      />
    </ProgressPrimitive.Root>
  );
};

export { Progress };

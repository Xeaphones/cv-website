import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = ({ className, value, startValue=value/8, color, ...props } : any) => {
  const [progress, setProgress] = React.useState(startValue);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ProgressPrimitive.Root 
    className={cn("relative h-4 w-full overflow-hidden rounded-full bg-primary/20",className)} 
    value={progress} {...props}>
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (progress || 0)}%)`, backgroundColor: color }}
      />
      <p className="text-center relative bottom-[105%] text-white">{progress}%</p>
    </ProgressPrimitive.Root>
  );
};

export { Progress }

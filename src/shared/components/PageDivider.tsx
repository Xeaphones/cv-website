import { Separator } from "@/shared/ui/separator";
import { cn } from "@/lib/utils";

export function PageDivider({ className }: { className?: string }) {
  return <Separator className={cn("relative left-[5%] w-[90%] shrink-0", className)} />;
}

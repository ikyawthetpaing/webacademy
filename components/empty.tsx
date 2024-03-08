import { HTMLAttributes } from "react";
import { IconName } from "@/types";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/icons";

interface Props extends HTMLAttributes<HTMLDivElement> {
  iconName: IconName;
  message: string;
}
export function Empty({ iconName, message, className, ...props }: Props) {
  return (
    <div
      className={cn("flex flex-col items-center gap-4", className)}
      {...props}
    >
      <Icon
        name={iconName}
        className="text-muted-foreground size-16"
        aria-hidden="true"
      />
      <p className="text-muted-foreground text-xl font-medium">{message}</p>
    </div>
  );
}

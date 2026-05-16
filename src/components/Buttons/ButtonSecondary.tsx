import React from "react";

import Spinner from "@/components/Loaders/Spinner";
import { cn } from "@/helpers/classNameHelpers";

const baseClasses =
  "inline-flex items-center justify-center gap-1 rounded-[0.625rem] border border-border-primary font-semibold text-foreground transition-colors enabled:hover:bg-foreground/5 disabled:cursor-not-allowed disabled:opacity-40";

const sizeClasses: Record<"sm" | "md", string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
};

export type ButtonSecondaryProps = Omit<React.ComponentProps<"button">, "className"> & {
  className?: string;
  extraButtonCss?: string;
  size?: "sm" | "md";
  isLoading?: boolean;
};

export const ButtonSecondary = ({
  children,
  className,
  extraButtonCss,
  size = "md",
  isLoading,
  disabled,
  ...rest
}: ButtonSecondaryProps) => {
  return (
    <button
      disabled={disabled}
      className={cn(baseClasses, sizeClasses[size], className, extraButtonCss)}
      {...rest}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};

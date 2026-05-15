import Link from "next/link";
import React from "react";
import Spinner from "@/components/Spinners/Spinner";
import { cn } from "@/helpers/classNameHelpers";

interface ButtonPrimaryProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  extraButtonCss?: string;
  extraTextCss?: string;
}

const baseClasses = `rounded-[0.625rem] bg-button-bg-primary hover:bg-button-bg-primary-hover px-[15px]
py-[10px] w-full max-w-[370px] flex items-center gap-[5px]
justify-center transition-colors duration-300 ease-in-out
`;
const stateClasses = (disabled?: boolean) =>
  disabled ? "opacity-40 cursor-not-allowed" : "opacity-100 cursor-pointer";

const textClasses = "text-[14px] font-semibold text-button-text-primary";

export const ButtonPrimary = ({
  children,
  onClick,
  disabled,
  isLoading,
  type = "button",
  extraButtonCss,
  extraTextCss,
}: ButtonPrimaryProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(baseClasses, stateClasses(disabled), extraButtonCss)}
      type={type}
    >
      <span className={cn(textClasses, extraTextCss)}>{isLoading ? <Spinner /> : children}</span>
    </button>
  );
};

interface ButtonPrimaryLinkProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  href: string;
  type?: "button" | "submit" | "reset";
  extraButtonCss?: string;
  extraTextCss?: string;
}

export const ButtonPrimaryLink = ({
  children,
  onClick,
  disabled,
  isLoading,
  href,
  type = "button",
  extraButtonCss,
  extraTextCss,
}: ButtonPrimaryLinkProps) => {
  return (
    <Link href={href}>
      <button
        onClick={onClick}
        disabled={disabled}
        className={cn(baseClasses, stateClasses(disabled), extraButtonCss)}
        type={type}
      >
        <span className={cn(textClasses, extraTextCss)}>{isLoading ? <Spinner /> : children}</span>
      </button>
    </Link>
  );
};

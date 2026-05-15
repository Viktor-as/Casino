import Link from "next/link";
import React from "react";
import Spinner from "@/components/Spinners/Spinner";

interface ButtonPrimaryProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
}

const baseClasses = `rounded-[0.625rem] bg-button-bg-primary hover:bg-button-bg-primary-hover px-[15px]
py-[5px] w-full max-w-[370px] flex items-center gap-[5px]
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
}: ButtonPrimaryProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${stateClasses(disabled)}`}
      type={type}
    >
      <span className={textClasses}>{isLoading ? <Spinner /> : children}</span>
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
}

export const ButtonPrimaryLink = ({
  children,
  onClick,
  disabled,
  isLoading,
  href,
  type = "button",
}: ButtonPrimaryLinkProps) => {
  return (
    <Link href={href}>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} ${stateClasses(disabled)}`}
        type={type}
      >
        <span className={textClasses}>{isLoading ? <Spinner /> : children}</span>
      </button>
    </Link>
  );
};

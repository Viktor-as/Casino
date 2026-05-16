"use client";

import { useState, type ComponentProps } from "react";

import EyeIcon from "@/assets/icons/eye.svg";
import EyeOffIcon from "@/assets/icons/eye-off.svg";

type PasswordInputProps = Omit<ComponentProps<"input">, "type">;

export function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="password-field">
      <input type={visible ? "text" : "password"} className={className} {...props} />
      <button
        type="button"
        className="password-field__toggle"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Slėpti slaptažodį" : "Rodyti slaptažodį"}
        aria-pressed={visible}
      >
        {visible ? (
          <EyeOffIcon className="text-text-secondary" width={20} height={20} aria-hidden />
        ) : (
          <EyeIcon className="text-text-secondary" width={20} height={20} aria-hidden />
        )}
      </button>
    </div>
  );
}

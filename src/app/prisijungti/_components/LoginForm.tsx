"use client";

import { ButtonPrimary } from "@/components/Buttons/ButtonPrimary";
import { PasswordInput } from "@/components/Form/PasswordInput";
import { useLogin } from "@/hooks/auth/useLogin";
import { getFieldDisplayState } from "@/helpers/formHelpers";
import type { LoginPayload } from "@/lib/api/auth/types";
import { useForm, useStore } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import z from "zod";
import Link from "next/link";

const passwordSchema = z
  .string()
  .min(8, "Slaptažodis turi būti bent 8 simbolių")

const loginFormSchema = z
  .object({
    email: z.email("Neteisingas el. pašto formatas"),
    password: passwordSchema,
  });

  type LoginFormValues = z.infer<typeof loginFormSchema>;

function toLoginPayload(value: LoginFormValues): LoginPayload {
  return {
    email: value.email,
    password: value.password,
  };
}

export default function LoginForm() {
    const router = useRouter();
    const login = useLogin();

    const form = useForm({
        defaultValues: {
          email: "",
          password: "",
        },
        onSubmit: async ({ value }) => {
          login.reset();
    
          try {
            await login.mutateAsync(toLoginPayload(value));
            router.push("/");
          } catch (error) {
            console.log(error);
          }
        },
        validators: {
          onSubmit: loginFormSchema,
          onBlur: loginFormSchema,
          onChange: loginFormSchema,
        },
      });

      const { Field } = form;
      const submissionAttempts = useStore(form.store, (state) => state.submissionAttempts);

      const serverErrorMessage = login.isError
      ? login.error.message || "Prisijungimas nepavyko. Bandykite dar kartą, arba susisiekite su pagalbos centru."
      : undefined;

  return <div className="content center h-[calc(100vh-100px)]">
  <div className="center-col gap-4 p-8 rounded-[0.625rem] bg-foreground/10 w-full max-w-[400px]">
    <h1 className="h3">Prisijungimas</h1>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex flex-col gap-4 w-full"
    >
      
      <Field name="email">
        {(field) => {
          const { errorMap, isTouched, isBlurred } = field.state.meta;
          const { showError, errorMessage } = getFieldDisplayState(
            { errorMap, isTouched, isBlurred },
            submissionAttempts,
          );
          return (
            <div className="flex flex-col gap-1">
              <label htmlFor="email">El. paštas *</label>
              <input
                type="email"
                id="email"
                className={`registration-form-input${showError ? " registration-form-input--error" : ""}`}
                placeholder="El. paštas"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                aria-invalid={showError}
              />
              {showError && (
                <span className="text-[0.875rem] text-red-500">{errorMessage}</span>
              )}
            </div>
          );
        }}
      </Field>
      <Field name="password">
        {(field) => {
          const { errorMap, isTouched, isBlurred } = field.state.meta;
          const { showError, errorMessage } = getFieldDisplayState(
            { errorMap, isTouched, isBlurred },
            submissionAttempts,
          );
          return (
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Slaptažodis *</label>
              <PasswordInput
                id="password"
                className={`registration-form-input${showError ? " registration-form-input--error" : ""}`}
                placeholder="Slaptažodis"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                aria-invalid={showError}
              />
              {showError && (
                <span className="text-[0.875rem] text-red-500">{errorMessage}</span>
              )}
            </div>
          );
        }}
      </Field>
      
      
      {serverErrorMessage && (
        <p className="text-[0.875rem] text-red-500" role="alert">
          {serverErrorMessage}
        </p>
      )}
      <ButtonPrimary type="submit" isLoading={login.isPending} disabled={login.isPending}>
        Prisijungti
      </ButtonPrimary>
      <p className="text-[0.75rem] text-center">
        Neturite paskyros?{" "}
        <Link href="/registracija" className="text-primary">
          Registruokitės
        </Link>
      </p>
    </form>
  </div>
</div>;
}

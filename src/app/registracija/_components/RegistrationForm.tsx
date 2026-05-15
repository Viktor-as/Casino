"use client";

import { ButtonPrimary } from "@/components/Buttons/ButtonPrimary";
import { PasswordInput } from "@/components/Form/PasswordInput";
import { useRegister } from "@/hooks/auth/useRegister";
import { getFieldDisplayState } from "@/helpers/formHelpers";
import type { RegisterPayload } from "@/lib/api/auth/types";
import { useForm, useStore } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import z from "zod";
import Link from "next/link";

const passwordSchema = z
  .string()
  .min(8, "Slaptažodis turi būti bent 8 simbolių")
  .regex(/[a-zA-Z]/, "Slaptažodis turi turėti bent vieną raidę")
  .regex(/\d/, "Slaptažodis turi turėti bent vieną skaitmenį")
  .regex(/[^a-zA-Z0-9]/, "Slaptažodis turi turėti bent vieną specialųjį simbolį");

const registrationFormSchema = z
  .object({
    name: z
      .string()
      .min(2, "Vardas turi būti bent 2 simboliai")
      .max(30, "Vardas negali būti ilgesnis nei 30 simbolių"),
    email: z.email("Neteisingas el. pašto formatas"),
    password: passwordSchema,
    confirmPassword: passwordSchema,
    terms: z.boolean().refine((value) => value, {
      message: "Privalote patvirtinti sąlygas",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Slaptažodžiai nesutampa",
    path: ["confirmPassword"],
  });

type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

function toRegisterPayload(value: RegistrationFormValues): RegisterPayload {
  return {
    name: value.name,
    email: value.email,
    password: value.password,
    confirmPassword: value.confirmPassword,
  };
}

export default function RegistrationForm() {
  const router = useRouter();
  const register = useRegister();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    onSubmit: async ({ value }) => {
      register.reset();

      try {
        await register.mutateAsync(toRegisterPayload(value));
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    validators: {
      onSubmit: registrationFormSchema,
      onBlur: registrationFormSchema,
      onChange: registrationFormSchema,
    },
  });

  const { Field } = form;
  const submissionAttempts = useStore(form.store, (state) => state.submissionAttempts);

  const serverErrorMessage = register.isError
    ? register.error.message ||
      "Registracija nepavyko. Bandykite dar kartą, arba susisiekite su pagalbos centru."
    : undefined;

  return (
    <div className="content center h-[calc(100vh-100px)]">
      <div className="center-col gap-4 p-8 rounded-[0.625rem] bg-foreground/10 w-full max-w-[400px]">
        <h1 className="h3">Registracija</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="flex flex-col gap-4 w-full"
        >
          <Field name="name">
            {(field) => {
              const { errorMap, isTouched, isBlurred } = field.state.meta;
              const { showError, errorMessage } = getFieldDisplayState(
                { errorMap, isTouched, isBlurred },
                submissionAttempts,
              );
              return (
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="text-[0.875rem]">
                    Vardas *
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`registration-form-input${showError ? " registration-form-input--error" : ""}`}
                    placeholder="Vardas"
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
          <Field name="confirmPassword">
            {(field) => {
              const { errorMap, isTouched, isBlurred } = field.state.meta;
              const { showError, errorMessage } = getFieldDisplayState(
                { errorMap, isTouched, isBlurred },
                submissionAttempts,
              );
              return (
                <div className="flex flex-col gap-1">
                  <label htmlFor="confirmPassword">Patvirtinti slaptažodį *</label>
                  <PasswordInput
                    id="confirmPassword"
                    className={`registration-form-input${showError ? " registration-form-input--error" : ""}`}
                    placeholder="Patvirtinti slaptažodį"
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
          <Field name="terms">
            {(field) => {
              const { errorMap, isTouched, isBlurred } = field.state.meta;
              const { showError, errorMessage } = getFieldDisplayState(
                { errorMap, isTouched, isBlurred },
                submissionAttempts,
              );
              return (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 justify-start">
                    <input
                      type="checkbox"
                      id="terms"
                      className={`registration-form-checkbox${showError ? " registration-form-checkbox--error" : ""}`}
                      checked={field.state.value}
                      onChange={(e) => field.handleChange(e.target.checked)}
                      onBlur={field.handleBlur}
                    />
                    <label htmlFor="terms" className="text-[0.875rem]">
                      Sutinku su <span className="text-primary">naudojimo sąlygomis</span> ir esu
                      18+ amžiaus
                    </label>
                  </div>
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
          <ButtonPrimary type="submit" isLoading={register.isPending} disabled={register.isPending}>
            Registruotis
          </ButtonPrimary>
          <p className="text-[0.75rem] text-center">
            Jau turite paskyrą?{" "}
            <Link href="/prisijungti" className="text-primary">
              Prisijunkite
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

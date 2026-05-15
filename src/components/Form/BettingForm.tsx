"use client";

import { useState } from "react";
import { useForm, useStore } from "@tanstack/react-form";
import z from "zod";

import { ButtonPrimary } from "@/components/Buttons/ButtonPrimary";
import { formatBalance } from "@/helpers/formatBalance";
import { getFieldDisplayState } from "@/helpers/formHelpers";
import { useSession } from "@/hooks/auth/useSession";
import { useBet } from "@/hooks/betting/useBet";
import { BetError } from "@/lib/api/errors";
import type { PlaceBetSuccessResponse } from "@/lib/api/auth/types";

const GUEST_BET_MESSAGE = "Pirma turite prisijungti, kad atlikti statymą.";
const SELECT_TEAM_MESSAGE = "Pirmiausia pasirinkite komandą.";

function parseAmount(value: string): number {
  return Number(value.trim().replace(",", "."));
}

const amountNumericSchema = z
  .string()
  .trim()
  .min(1, "Įveskite sumą")
  .refine((s) => Number.isFinite(parseAmount(s)), "Įveskite tinkamą skaičių");

type BettingFormProps = {
  selectedTeam: "team1" | "team2" | null;
  stakeFieldId: string;
  requireTeamSelection?: boolean;
};

export default function BettingForm({
  selectedTeam,
  stakeFieldId,
  requireTeamSelection = true,
}: BettingFormProps) {
  const [success, setSuccess] = useState<PlaceBetSuccessResponse | null>(null);
  const [fieldsKey, setFieldsKey] = useState(0);

  if (success) {
    const currency = success.currency;
    return (
      <div className="flex min-h-[132px] flex-col gap-3 pt-2">
        <div className="flex min-h-[118px] flex-col justify-center gap-3">
          <p className="text-center text-sm text-foreground">
            {success.winAmount != null ? (
              <>
                Laimėjote{" "}
                <span className="font-semibold text-primary">
                  {formatBalance(success.winAmount, currency)}
                </span>
                !
              </>
            ) : (
              "Statymas priimtas. Šį kartą nepavyko — sėkmės kitą kartą!"
            )}
          </p>
          <ButtonPrimary
            type="button"
            onClick={() => {
              setSuccess(null);
              setFieldsKey((k) => k + 1);
            }}
            extraButtonCss="max-w-none w-full"
          >
            Statyti dar
          </ButtonPrimary>
        </div>
      </div>
    );
  }

  return (
    <StakeFields
      key={fieldsKey}
      selectedTeam={selectedTeam}
      stakeFieldId={stakeFieldId}
      requireTeamSelection={requireTeamSelection}
      onBetSuccess={setSuccess}
    />
  );
}

type StakeFieldsProps = {
  selectedTeam: "team1" | "team2" | null;
  stakeFieldId: string;
  requireTeamSelection: boolean;
  onBetSuccess: (data: PlaceBetSuccessResponse) => void;
};

function StakeFields({
  selectedTeam,
  stakeFieldId,
  requireTeamSelection,
  onBetSuccess,
}: StakeFieldsProps) {
  const { user, isAuthenticated } = useSession();
  const bet = useBet();
  const balance = user?.balance;

  const [bannerMessage, setBannerMessage] = useState<string | null>(null);
  const [amountError, setAmountError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      amount: "",
    },
    onSubmit: async ({ value }) => {
      bet.reset();
      setBannerMessage(null);
      setAmountError(null);

      const numericResult = amountNumericSchema.safeParse(value.amount);
      if (!numericResult.success) {
        setAmountError(numericResult.error.issues[0]?.message ?? "Neteisinga reikšmė");
        return;
      }

      const n = parseAmount(value.amount);

      if (n < 1) {
        setAmountError("Minimali statymo suma yra 1");
        return;
      }

      if (balance !== undefined && n > balance) {
        setAmountError("Nepakanka lėšų");
        return;
      }

      try {
        const data = await bet.mutateAsync(n);
        onBetSuccess(data);
      } catch (err) {
        const message =
          err instanceof BetError ? err.message : "Statymas nepavyko. Bandykite dar kartą.";
        setBannerMessage(message);
      }
    },
  });

  const { Field } = form;
  const submissionAttempts = useStore(form.store, (state) => state.submissionAttempts);

  const canSubmit = requireTeamSelection ? selectedTeam !== null : true;
  const inputId = `stake-amount-${stakeFieldId}`;

  return (
    <div className="flex flex-col gap-2 pt-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!isAuthenticated) {
            setBannerMessage(GUEST_BET_MESSAGE);
            return;
          }
          if (!canSubmit) {
            setBannerMessage(SELECT_TEAM_MESSAGE);
            return;
          }
          form.handleSubmit();
        }}
        className="flex flex-col gap-1"
      >
        <Field name="amount">
          {(field) => {
            const { errorMap, isTouched, isBlurred } = field.state.meta;
            const { showError: showValidatedError, errorMessage: validatedMessage } =
              getFieldDisplayState({ errorMap, isTouched, isBlurred }, submissionAttempts);
            const showError = !!amountError || showValidatedError;
            const errorMessage = amountError ?? validatedMessage;
            return (
              <div className="flex flex-col gap-2">
                <label htmlFor={inputId} className="sr-only">
                  Statymo suma
                </label>
                <input
                  type="number"
                  id={inputId}
                  inputMode="decimal"
                  min={1}
                  step={0.01}
                  placeholder="Statymo suma €"
                  className={`h-[46px] w-full rounded-lg border border-border-primary bg-background px-3 text-sm text-foreground placeholder:text-text-grey/70 ${
                    showError ? "border-red-500" : ""
                  }`}
                  value={field.state.value}
                  onChange={(e) => {
                    setBannerMessage(null);
                    setAmountError(null);
                    field.handleChange(e.target.value);
                  }}
                  onBlur={field.handleBlur}
                  aria-invalid={showError}
                />
                <div>
                  {showError ? (
                    <span className="text-[0.875rem] text-red-500">{errorMessage}</span>
                  ) : null}
                </div>
              </div>
            );
          }}
        </Field>
        <ButtonPrimary
          type="submit"
          isLoading={bet.isPending}
          disabled={bet.isPending}
          extraButtonCss="max-w-none w-full"
        >
          Statyti
        </ButtonPrimary>
        {bannerMessage ? (
          <p className="text-sm text-red-500" role="alert">
            {bannerMessage}
          </p>
        ) : null}
      </form>
    </div>
  );
}

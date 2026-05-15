type FieldMetaForDisplay = {
  errorMap: Record<string, unknown>;
  isTouched: boolean;
  isBlurred: boolean;
};

function getFieldValidationError(errorMap: Record<string, unknown>, submissionAttempts: number) {
  return submissionAttempts > 0 ? errorMap.onChange : errorMap.onBlur;
}

function getErrorMessage(error: unknown): string | undefined {
  if (!error) return undefined;
  if (typeof error === "string") return error;
  if (Array.isArray(error)) {
    const first = error[0];
    if (!first) return undefined;
    if (typeof first === "string") return first;
    if (typeof first === "object" && "message" in first) {
      return String(first.message);
    }
    return undefined;
  }
  if (typeof error === "object" && "message" in error) {
    return String((error as { message: unknown }).message);
  }
  return undefined;
}

export function getFieldDisplayState(meta: FieldMetaForDisplay, submissionAttempts: number) {
  const errorMessage = getErrorMessage(getFieldValidationError(meta.errorMap, submissionAttempts));
  const showError =
    !!errorMessage && ((meta.isTouched && meta.isBlurred) || submissionAttempts > 0);

  return { showError, errorMessage };
}

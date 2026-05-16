import { WALLET_TRANSACTION_TYPE_FILTER_OPTIONS } from "@/constants/walletTransactionTypeFilter";
import { MyTransactionsFetchError } from "@/lib/api/wallet/fetchMyTransactions";

export function walletTransactionsErrorMessage(error: unknown) {
  if (error instanceof MyTransactionsFetchError) {
    return error.message;
  }
  return "Nepavyko įkelti operacijų istorijos. Bandykite vėliau.";
}

export function transactionTypeLabel(type: string): string {
  const found = WALLET_TRANSACTION_TYPE_FILTER_OPTIONS.find((o) => o.value === type);
  if (found && found.value !== "") {
    return found.label;
  }
  return type;
}

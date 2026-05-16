"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import SelectChevronDown from "@/assets/icons/select-chevron-down.svg";
import WalletIcon from "@/assets/icons/wallet.svg";
import { ButtonPrimary } from "@/components/Buttons/ButtonPrimary";
import { ButtonSecondary } from "@/components/Buttons/ButtonSecondary";
import PulsingLoader from "@/components/Loaders/PulsingLoader";
import { WALLET_TRANSACTION_TYPE_FILTER_OPTIONS } from "@/constants/walletTransactionTypeFilter";
import { formatBalance } from "@/helpers/formatBalance";
import { formatBetCreatedAt as formatCreatedAt } from "@/helpers/myBetsPageHelpers";
import { transactionTypeLabel, walletTransactionsErrorMessage } from "@/helpers/walletPageHelpers";
import { useSession } from "@/hooks/auth/useSession";
import type { PlayerAuthResponse } from "@/lib/api/auth/types";
import { fetchMyTransactions } from "@/lib/api/wallet/fetchMyTransactions";
import { queryKeys } from "@/lib/query/queryKeys";

import {
  buildWalletTransactionsHref,
  parseWalletTransactionsSearchParams,
  type WalletTransactionsUrlState,
} from "../_lib/walletTransactionsUrlState";

const PAGE_SIZE = 5;

function TableSkeleton() {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center rounded-2xl border border-secondary/10 bg-foreground/5 p-8">
      <PulsingLoader />
    </div>
  );
}

type WalletInitialBalance = {
  readonly balance: number;
  readonly currency: string;
};

type BalanceCardModel = {
  readonly balance: number;
  readonly currency: string;
};

function balanceCardFromSession(
  user: PlayerAuthResponse | null,
  initialBalance: WalletInitialBalance | null,
): BalanceCardModel | null {
  if (user) {
    return { balance: user.balance, currency: user.currency };
  }
  if (initialBalance) {
    return { balance: initialBalance.balance, currency: initialBalance.currency };
  }
  return null;
}

type WalletTransactionsClientProps = {
  readonly initialBalance: WalletInitialBalance | null;
  readonly initialUrlState: WalletTransactionsUrlState;
};

export default function WalletTransactionsClient({
  initialBalance,
  initialUrlState,
}: WalletTransactionsClientProps) {
  const { user } = useSession();
  const balanceCard = balanceCardFromSession(user, initialBalance);
  const currency = balanceCard?.currency ?? "EUR";
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlQueryKey = searchParams.toString();

  const parsedFromUrl = useMemo(
    () => parseWalletTransactionsSearchParams(new URLSearchParams(urlQueryKey)),
    [urlQueryKey],
  );

  const [draftId, setDraftId] = useState(initialUrlState.id);
  const [draftType, setDraftType] = useState(initialUrlState.type);
  const [prevUrlQueryKey, setPrevUrlQueryKey] = useState(urlQueryKey);

  if (prevUrlQueryKey !== urlQueryKey) {
    setPrevUrlQueryKey(urlQueryKey);
    setDraftId(parsedFromUrl.id);
    setDraftType(parsedFromUrl.type);
  }

  useEffect(() => {
    const parsed = parseWalletTransactionsSearchParams(new URLSearchParams(urlQueryKey));
    if (!parsed.invalidTypeInUrl) return;
    router.replace(
      buildWalletTransactionsHref(pathname, {
        page: parsed.page,
        id: parsed.id,
        type: parsed.type,
      }),
      { scroll: false },
    );
  }, [urlQueryKey, pathname, router]);

  const page = parsedFromUrl.page;
  const appliedId = parsedFromUrl.id;
  const appliedType = parsedFromUrl.type;
  const hasAppliedFilters = Boolean(appliedId.trim()) || Boolean(appliedType.trim());

  const queryParams = useMemo(
    () => ({
      page,
      limit: PAGE_SIZE,
      id: appliedId,
      type: appliedType,
    }),
    [page, appliedId, appliedType],
  );

  const query = useQuery({
    queryKey: queryKeys.wallet.myTransactions.list(queryParams),
    queryFn: () =>
      fetchMyTransactions({
        page: queryParams.page,
        limit: queryParams.limit,
        id: queryParams.id.trim() || undefined,
        type: queryParams.type.trim() || undefined,
      }),
  });

  const applyFilters = () => {
    router.push(
      buildWalletTransactionsHref(pathname, { page: 1, id: draftId, type: draftType }),
      { scroll: false },
    );
  };

  const clearFilters = () => {
    router.push(buildWalletTransactionsHref(pathname, { page: 1, id: "", type: "" }), {
      scroll: false,
    });
  };

  const goToPage = (nextPage: number) => {
    router.push(
      buildWalletTransactionsHref(pathname, {
        page: nextPage,
        id: appliedId,
        type: appliedType,
      }),
      { scroll: false },
    );
  };

  const totalPages = query.data ? Math.max(1, Math.ceil(query.data.total / PAGE_SIZE)) : 1;

  let mainBlock: ReactNode;
  if (query.isPending) {
    mainBlock = <TableSkeleton />;
  } else if (query.isError) {
    mainBlock = (
      <p className="text-text-grey" role="alert">
        {walletTransactionsErrorMessage(query.error)}
      </p>
    );
  } else {
    mainBlock = (
      <>
        <div className="overflow-x-auto rounded-2xl border border-secondary/10">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <caption className="sr-only">Piniginės operacijos</caption>
            <thead>
              <tr className="border-b border-secondary/10 bg-foreground/5">
                <th className="px-4 py-3 font-semibold text-foreground">ID</th>
                <th className="px-4 py-3 font-semibold text-foreground">Data / laikas</th>
                <th className="px-4 py-3 font-semibold text-foreground">Tipas</th>
                <th className="px-4 py-3 font-semibold text-foreground">Suma</th>
              </tr>
            </thead>
            <tbody>
              {query.data.data.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-text-grey">
                    Operacijų nerasta.
                  </td>
                </tr>
              ) : (
                query.data.data.map((tx) => {
                  const created = formatCreatedAt(tx.createdAt);
                  return (
                    <tr
                      key={String(tx.id)}
                      className="border-b border-secondary/10 last:border-b-0"
                    >
                      <td className="px-4 py-3 text-foreground">{String(tx.id)}</td>
                      <td className="px-4 py-3 text-text-grey">{created}</td>
                      <td className="px-4 py-3 text-foreground">{transactionTypeLabel(tx.type)}</td>
                      <td className="px-4 py-3 text-foreground">
                        {Number.isFinite(tx.amount) ? formatBalance(tx.amount, currency) : "—"}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {query.data.total > 0 ? (
          <div className="flex flex-col gap-3 tab:flex-row tab:items-center tab:justify-between">
            <p className="text-sm text-text-grey">
              Rodoma {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, query.data.total)} iš{" "}
              {query.data.total} · Puslapis {page} iš {totalPages}
            </p>
            <div className="flex gap-2">
              <ButtonSecondary
                type="button"
                disabled={page <= 1}
                onClick={() => goToPage(Math.max(1, page - 1))}
              >
                Atgal
              </ButtonSecondary>
              <ButtonSecondary
                type="button"
                disabled={page >= totalPages}
                onClick={() => goToPage(page + 1)}
              >
                Pirmyn
              </ButtonSecondary>
            </div>
          </div>
        ) : null}
      </>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {balanceCard ? (
        <div
          className="flex max-w-md items-center gap-3 rounded-2xl border border-secondary/10 bg-foreground/5 px-6 py-4 max-mob:px-4"
          aria-label="Balansas"
        >
          <WalletIcon className="shrink-0 text-text-secondary" width={24} height={24} aria-hidden />
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="text-sm text-text-grey">Balansas</span>
            <span className="truncate text-lg font-bold text-foreground">
              {formatBalance(balanceCard.balance, balanceCard.currency)}
            </span>
          </div>
        </div>
      ) : null}

      <div className="flex max-w-2xl flex-col gap-4 rounded-2xl border border-secondary/10 bg-foreground/5 p-6 max-mob:p-4">
        <div className="grid grid-cols-1 gap-4 tab:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="wallet-filter-id">Operacijos ID</label>
            <input
              id="wallet-filter-id"
              className="registration-form-input"
              placeholder="Filtruoti pagal ID"
              value={draftId}
              onChange={(e) => setDraftId(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="wallet-filter-type">Tipas</label>
            <div className="relative">
              <select
                id="wallet-filter-type"
                className="registration-form-input w-full cursor-pointer appearance-none bg-background pr-10"
                value={draftType}
                onChange={(e) => setDraftType(e.target.value)}
              >
                {WALLET_TRANSACTION_TYPE_FILTER_OPTIONS.map((opt) => (
                  <option key={opt.value || "all"} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <span
                className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-text-grey"
                aria-hidden
              >
                <SelectChevronDown width={16} height={16} />
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 tab:flex-row tab:flex-wrap tab:items-center">
          <ButtonPrimary
            type="button"
            onClick={applyFilters}
            extraButtonCss="max-w-none w-full tab:w-auto tab:max-w-[200px]"
          >
            Filtruoti
          </ButtonPrimary>
          {hasAppliedFilters ? (
            <ButtonSecondary
              type="button"
              onClick={clearFilters}
              extraButtonCss="max-w-none w-full tab:w-auto tab:max-w-[200px]"
            >
              Išvalyti filtrus
            </ButtonSecondary>
          ) : null}
        </div>
      </div>

      {mainBlock}
    </div>
  );
}

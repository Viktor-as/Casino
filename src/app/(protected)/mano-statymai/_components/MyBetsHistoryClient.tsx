"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import SelectChevronDown from "@/assets/icons/select-chevron-down.svg";
import { ButtonPrimary } from "@/components/Buttons/ButtonPrimary";
import { ButtonSecondary } from "@/components/Buttons/ButtonSecondary";
import PulsingLoader from "@/components/Loaders/PulsingLoader";
import { MY_BET_STATUS_FILTER_OPTIONS } from "@/constants/myBetsStatusFilter";

import { formatBalance } from "@/helpers/formatBalance";
import {
  myBetsErrorMessage,
  betPrize,
  formatPrizeCell,
  formatBetCreatedAt,
  myBetStatusLabelLt,
} from "@/helpers/myBetsPageHelpers";
import { useSession } from "@/hooks/auth/useSession";
import { useCancelMyBet } from "@/hooks/betting/useCancelMyBet";
import { fetchMyBets } from "@/lib/api/betting/fetchMyBets";
import { BetError } from "@/lib/api/errors";
import { queryKeys } from "@/lib/query/queryKeys";

import {
  buildMyBetsHref,
  parseMyBetsSearchParams,
  type MyBetsUrlState,
} from "../_lib/myBetsUrlState";

const PAGE_SIZE = 5;

function TableSkeleton() {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center rounded-2xl border border-secondary/10 bg-foreground/5 p-8">
      <PulsingLoader />
    </div>
  );
}

type MyBetsHistoryClientProps = {
  readonly initialUrlState: MyBetsUrlState;
};

export default function MyBetsHistoryClient({ initialUrlState }: MyBetsHistoryClientProps) {
  const { user } = useSession();
  const currency = user?.currency ?? "EUR";
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlQueryKey = searchParams.toString();
  const cancelBet = useCancelMyBet();
  const [cancelError, setCancelError] = useState<string | null>(null);

  const parsedFromUrl = useMemo(
    () => parseMyBetsSearchParams(new URLSearchParams(urlQueryKey)),
    [urlQueryKey],
  );

  const [draftId, setDraftId] = useState(initialUrlState.id);
  const [draftStatus, setDraftStatus] = useState(initialUrlState.status);
  const [prevUrlQueryKey, setPrevUrlQueryKey] = useState(urlQueryKey);

  if (prevUrlQueryKey !== urlQueryKey) {
    setPrevUrlQueryKey(urlQueryKey);
    setDraftId(parsedFromUrl.id);
    setDraftStatus(parsedFromUrl.status);
  }

  useEffect(() => {
    const parsed = parseMyBetsSearchParams(new URLSearchParams(urlQueryKey));
    if (!parsed.invalidStatusInUrl) return;
    router.replace(
      buildMyBetsHref(pathname, {
        page: parsed.page,
        id: parsed.id,
        status: parsed.status,
      }),
      { scroll: false },
    );
  }, [urlQueryKey, pathname, router]);

  const page = parsedFromUrl.page;
  const appliedId = parsedFromUrl.id;
  const appliedStatus = parsedFromUrl.status;
  const hasAppliedFilters = Boolean(appliedId.trim()) || Boolean(appliedStatus.trim());

  const queryParams = useMemo(
    () => ({
      page,
      limit: PAGE_SIZE,
      id: appliedId,
      status: appliedStatus,
    }),
    [page, appliedId, appliedStatus],
  );

  const query = useQuery({
    queryKey: queryKeys.betting.myBets.list(queryParams),
    queryFn: () =>
      fetchMyBets({
        page: queryParams.page,
        limit: queryParams.limit,
        id: queryParams.id.trim() || undefined,
        status: queryParams.status.trim() || undefined,
      }),
  });

  const applyFilters = () => {
    router.push(buildMyBetsHref(pathname, { page: 1, id: draftId, status: draftStatus }), {
      scroll: false,
    });
  };

  const clearFilters = () => {
    router.push(buildMyBetsHref(pathname, { page: 1, id: "", status: "" }), { scroll: false });
  };

  const goToPage = (nextPage: number) => {
    router.push(
      buildMyBetsHref(pathname, {
        page: nextPage,
        id: appliedId,
        status: appliedStatus,
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
        {myBetsErrorMessage(query.error)}
      </p>
    );
  } else {
    mainBlock = (
      <>
        {cancelError ? (
          <p className="text-sm text-red-500" role="alert">
            {cancelError}
          </p>
        ) : null}
        <div className="overflow-x-auto rounded-2xl border border-secondary/10">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <caption className="sr-only">Mano statymai</caption>
            <thead>
              <tr className="border-b border-secondary/10 bg-foreground/5">
                <th className="px-4 py-3 font-semibold text-foreground">ID</th>
                <th className="px-4 py-3 font-semibold text-foreground">Data / laikas</th>
                <th className="px-4 py-3 font-semibold text-foreground">Suma</th>
                <th className="px-4 py-3 font-semibold text-foreground">Statusas</th>
                <th className="px-4 py-3 font-semibold text-foreground">Laimėjimas</th>
                <th className="px-4 py-3 font-semibold text-foreground">Veiksmai</th>
              </tr>
            </thead>
            <tbody>
              {query.data.data.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-text-grey">
                    Statymų nerasta.
                  </td>
                </tr>
              ) : (
                query.data.data.map((bet) => {
                  const prize = betPrize(bet);
                  const created = formatBetCreatedAt(bet.createdAt);
                  const isCanceled = bet.status.toLowerCase() === "canceled";
                  const cancelInFlight =
                    cancelBet.isPending && String(cancelBet.variables) === String(bet.id);
                  return (
                    <tr
                      key={String(bet.id)}
                      className="border-b border-secondary/10 last:border-b-0"
                    >
                      <td className="px-4 py-3 text-foreground">{String(bet.id)}</td>
                      <td className="px-4 py-3 text-text-grey">{created}</td>
                      <td className="px-4 py-3 text-foreground">
                        {Number.isFinite(bet.amount) ? formatBalance(bet.amount, currency) : "—"}
                      </td>
                      <td className="px-4 py-3 text-foreground">
                        {myBetStatusLabelLt(bet.status)}
                      </td>
                      <td className="px-4 py-3 text-foreground">
                        {formatPrizeCell(prize, currency)}
                      </td>
                      <td className="px-4 py-3">
                        <ButtonSecondary
                          type="button"
                          size="sm"
                          disabled={isCanceled || cancelInFlight}
                          onClick={async () => {
                            setCancelError(null);
                            try {
                              await cancelBet.mutateAsync(bet.id);
                            } catch (err) {
                              const message =
                                err instanceof BetError
                                  ? err.message
                                  : "Statymo atšaukti nepavyko. Bandykite dar kartą.";
                              setCancelError(message);
                            }
                          }}
                        >
                          Atšaukti
                        </ButtonSecondary>
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
      <div className="flex max-w-2xl flex-col gap-4 rounded-2xl border border-secondary/10 bg-foreground/5 p-6 max-mob:p-4">
        <div className="grid grid-cols-1 gap-4 tab:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="bet-filter-id">Statymo ID</label>
            <input
              id="bet-filter-id"
              className="registration-form-input"
              placeholder="Filtruoti pagal ID"
              value={draftId}
              onChange={(e) => setDraftId(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="bet-filter-status">Statusas</label>
            <div className="relative">
              <select
                id="bet-filter-status"
                className="registration-form-input w-full cursor-pointer appearance-none bg-background pr-10"
                value={draftStatus}
                onChange={(e) => setDraftStatus(e.target.value)}
              >
                {MY_BET_STATUS_FILTER_OPTIONS.map((opt) => (
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

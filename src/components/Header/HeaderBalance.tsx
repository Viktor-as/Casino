"use client";

import WalletIcon from "@/assets/icons/wallet.svg";
import { formatBalance } from "@/helpers/formatBalance";
import { useSession } from "@/hooks/auth/useSession";

export default function HeaderBalance() {
  const { user } = useSession();

  if (!user) {
    return null;
  }

  return (
    <div
      className="flex items-center gap-2 rounded-[0.625rem] border border-primary/40 bg-background/50 px-2 py-1 font-bold text-text-secondary"
      aria-label="Balansas"
    >
      <WalletIcon className="shrink-0 text-text-secondary" width={20} height={20} aria-hidden />
      <span>{formatBalance(user.balance, user.currency)}</span>
    </div>
  );
}

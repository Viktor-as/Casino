"use client";

import { ButtonPrimary, ButtonPrimaryLink } from "@/components/Buttons/ButtonPrimary";
import { useLogout } from "@/hooks/auth/useLogout";
import { useSession } from "@/hooks/auth/useSession";

interface HeaderAuthActionsProps {
  showLoginLink?: boolean;
  onLogoutClick?: () => void;
}

export default function HeaderAuthActions({
  showLoginLink = true,
  onLogoutClick,
}: Readonly<HeaderAuthActionsProps>) {
  const { isAuthenticated } = useSession();
  const logout = useLogout();

  if (isAuthenticated) {
    return (
      <ButtonPrimary
        extraButtonCss="py-[5px] w-auto max-w-none"
        onClick={() => {
          onLogoutClick?.();
          logout.mutate();
        }}
        isLoading={logout.isPending}
        disabled={logout.isPending}
      >
        Atsijungti
      </ButtonPrimary>
    );
  }

  if (!showLoginLink) {
    return null;
  }

  return (
    <ButtonPrimaryLink href="/prisijungti" extraButtonCss="py-[5px] w-auto max-w-none">
      <span>Prisijungti</span>
    </ButtonPrimaryLink>
  );
}

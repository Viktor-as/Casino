export type NavItem = {
  href: string;
  label: string;
  requiresAuth?: boolean;
};

export type NavLinkDisplay = {
  href: string;
  label: string;
};

export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/", label: "Pradžia" },
  { href: "/lazybos", label: "Lažybos" },
  { href: "/mano-statymai", label: "Mano statymai", requiresAuth: true },
  { href: "/pinigine", label: "Piniginė", requiresAuth: true },
];

export function getNavLinksForDisplay(isAuthenticated: boolean): NavLinkDisplay[] {
  return NAV_ITEMS.filter((item) => !item.requiresAuth || isAuthenticated).map(({ href, label }) => ({
    href,
    label,
  }));
}

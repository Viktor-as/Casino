"use client";

import Link from "next/link";

import { getNavLinksForDisplay } from "@/constants/nav";
import { useSession } from "@/hooks/auth/useSession";

export default function FooterNavLinks() {
  const { isAuthenticated } = useSession();
  const links = getNavLinksForDisplay(isAuthenticated);

  return (
    <ul className="flex flex-col gap-2">
      {links.map(({ href, label }) => (
        <li key={href}>
          <Link
            href={href}
            className="text-sm font-medium text-text-grey transition-colors hover:text-primary"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

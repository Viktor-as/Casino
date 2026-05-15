"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/helpers/classNameHelpers";

interface HeaderNavLinksProps {
  navLinks: Readonly<{ href: string; label: string }[]>;
  variant?: "horizontal" | "vertical";
}

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function HeaderNavLinks({ navLinks, variant = "horizontal" }: HeaderNavLinksProps) {
  const pathname = usePathname();
  const vertical = variant === "vertical";

  return (
    <nav aria-label="Pagrindinė navigacija">
      <ul
        className={cn(
          "flex gap-2",
          vertical ? "flex-col items-stretch" : "flex-wrap items-center",
        )}
      >
        {navLinks.map(({ href, label }) => {
          const active = isActivePath(pathname, href);
          return (
            <li key={href} className={vertical ? "w-full" : undefined}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex rounded-[0.625rem] px-4 py-2 font-medium transition-colors",
                  vertical && "w-full justify-center text-center",
                  active
                    ? "bg-primary/20 text-text-secondary"
                    : "text-text-grey hover:bg-black/5 hover:text-text-primary dark:hover:bg-white/10",
                )}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default HeaderNavLinks;

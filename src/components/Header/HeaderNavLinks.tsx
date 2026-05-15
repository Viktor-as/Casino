"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderNavLinksProps {
  navLinks: Readonly<{ href: string; label: string }[]>;
}

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function HeaderNavLinks({ navLinks }: HeaderNavLinksProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Pagrindinė navigacija">
      <ul className="flex flex-wrap items-center gap-2">
        {navLinks.map(({ href, label }) => {
          const active = isActivePath(pathname, href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={
                  "flex rounded-[0.625rem] px-4 py-2 font-medium transition-colors " +
                  (active
                    ? "bg-primary/20 text-text-secondary"
                    : "text-text-grey hover:bg-black/5 hover:text-text-primary dark:hover:bg-white/10")
                }
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

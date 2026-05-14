import Link from "next/link";
import Image from "next/image";
import ThemeSwitcher from "./ThemeSwitcher";

import logo from "@/assets/logo/ggcasino-logo.png";

const navItems = [
  { href: "/", label: "Pradžia" },
  { href: "/bets", label: "Lažybos" },
  { href: "/my-bets", label: "Mano statymai" },
  { href: "/wallet", label: "Piniginė" },
  { href: "/login", label: "Prisijungti" },
  { href: "/register", label: "Registracija" },
] as const;

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-background/80 backdrop-blur-md dark:border-zinc-800/80">
      <div className="content relative flex items-center justify-between gap-4 py-4">
        <Link href="/" className="absolute left-10 top-2">
          <Image src={logo} alt="GG Casino Logo" width={120} />
        </Link>
        <div className="w-[120px]"></div>
        <nav aria-label="Pagrindinė navigacija" className="">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {navItems.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground hover:underline underline-offset-4"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex shrink-0 items-center min-[480px]:ml-0">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}

export default Header;

import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";

const navItems = [
  { href: "/", label: "Pradžia" },
  { href: "/bets", label: "Statymai" },
  { href: "/my-bets", label: "Mano statymai" },
  { href: "/wallet", label: "Piniginė" },
  { href: "/login", label: "Prisijungti" },
  { href: "/register", label: "Registracija" },
] as const;

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-background/80 backdrop-blur-md dark:border-zinc-800/80">
      <div className="content flex flex-wrap items-center justify-between gap-4 py-3">
        <Link
          href="/"
          className="font-secondary text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-red-800 dark:hover:text-red-200"
        >
          Casino
        </Link>
        <nav aria-label="Pagrindinė navigacija" className="order-3 w-full min-[480px]:order-none min-[480px]:mx-auto min-[480px]:w-auto min-[480px]:flex-1 min-[768px]:flex-none">
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

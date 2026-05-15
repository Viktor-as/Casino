import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo/ggcasino-logo.png";
import { NAV_ITEMS } from "@/components/Header/Header";

const INFO_LINKS = [
  { href: "#", label: "Taisyklės" },
  { href: "#", label: "Atsakingas lošimas" },
  { href: "#", label: "Pagalba" },
] as const;

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      aria-label="Poraštė"
      className="mt-auto border-t border-zinc-200/80 bg-background dark:border-zinc-800/80"
    >
      <div className="content py-10 md:py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          <div className="flex flex-col gap-4">
            <Link href="/" className="w-fit">
              <Image src={logo} alt="GG Casino" width={96} />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-text-grey">
              Naujos kartos lažybų platforma. Greiti išmokėjimai ir skaidri sistema.
            </p>
          </div>

          <nav aria-label="Poraštės navigacija" className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-grey">
              Navigacija
            </p>
            <ul className="flex flex-col gap-2">
              {NAV_ITEMS.map(({ href, label }) => (
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
          </nav>

          <nav aria-label="Informacija" className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-grey">
              Informacija
            </p>
            <ul className="flex flex-col gap-2">
              {INFO_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    prefetch={false}
                    className="text-sm font-medium text-text-grey transition-colors hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-zinc-200/80 pt-8 dark:border-zinc-800/80 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text-grey">
            © {year}{" "}
            <span className="font-medium text-text-primary">GG Casino</span>. Visos teisės saugomos.
          </p>
          <p className="text-xs text-text-grey">
            Lošimas gali sukelti priklausomybę. Žaiskite atsakingai.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

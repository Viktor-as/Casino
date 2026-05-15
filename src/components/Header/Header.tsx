import Link from "next/link";
import Image from "next/image";
import ThemeSwitcher from "./ThemeSwitcher";
import HeaderNavLinks from "./HeaderNavLinks";
import HeaderAuthActions from "./HeaderAuthActions";
import HeaderBalance from "./HeaderBalance";

import logo from "@/assets/logo/ggcasino-logo.png";
import GlobeIcon from "@/assets/icons/globe.svg";

export const NAV_ITEMS = [
  { href: "/", label: "Pradžia" },
  { href: "/lazybos", label: "Lažybos" },
  { href: "/mano-statymai", label: "Mano statymai" },
  { href: "/pinigine", label: "Piniginė" },
] as const;

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-background/80 backdrop-blur-md dark:border-zinc-800/80">
      <div className="content relative flex items-center justify-between gap-4 py-4 text-[0.875rem]">
        <Link href="/" className="absolute left-10 top-2">
          <Image src={logo} alt="GG Casino Logo" width={120} />
        </Link>
        <div className="w-[140px] flex-shrink-0"></div>
        <HeaderNavLinks navLinks={NAV_ITEMS} />
        <div className="flex items-center gap-3 flex-wrap">
          <HeaderBalance />
          <div
            className="flex items-center gap-2 rounded-[0.625rem] bg-foreground/10 px-2 py-1 font-medium dark:bg-white/10 border border-grey/40"
            aria-label="Kalba"
          >
            <GlobeIcon className="shrink-0 text-text-grey" width={20} height={20} />
            <span className="text-text-secondary cursor-pointer">LT</span>
            <span className="text-text-grey">/</span>
            <span className="text-text-grey cursor-pointer">EN</span>
          </div>
          <ThemeSwitcher />
          <HeaderAuthActions />
        </div>
      </div>
    </header>
  );
}

export default Header;

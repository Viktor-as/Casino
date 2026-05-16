"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import CloseIcon from "@/assets/icons/close.svg";
import GlobeIcon from "@/assets/icons/globe.svg";
import MenuIcon from "@/assets/icons/menu.svg";
import { ButtonPrimaryLink } from "@/components/Buttons/ButtonPrimary";
import { useSession } from "@/hooks/auth/useSession";
import HeaderAuthActions from "./HeaderAuthActions";
import HeaderBalance from "./HeaderBalance";
import HeaderNavLinks from "./HeaderNavLinks";
import ThemeSwitcher from "./ThemeSwitcher";
import logo from "@/assets/logo/ggcasino-logo.png";
import { getNavLinksForDisplay } from "@/constants/nav";

const PANEL_ID = "header-mobile-menu";

function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated } = useSession();
  const navLinks = useMemo(() => getNavLinksForDisplay(isAuthenticated), [isAuthenticated]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- close overlay when Next.js route changes
    setOpen(false);
  }, [pathname]);

  const closePanel = () => setOpen(false);

  const languageBlock = (
    <div
      className="flex items-center justify-center gap-2 rounded-[0.625rem] bg-foreground/10 px-2 py-1 font-medium dark:bg-white/10 border border-grey/40"
      aria-label="Kalba"
    >
      <GlobeIcon className="shrink-0 text-text-grey" width={20} height={20} aria-hidden />
      <span className="text-text-secondary cursor-pointer">LT</span>
      <span className="text-text-grey">/</span>
      <span className="text-text-grey cursor-pointer">EN</span>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-background/80 backdrop-blur-md dark:border-zinc-800/80">
      <div className="content relative flex w-full items-center justify-between gap-4 py-4 text-[0.875rem]">
        <Link href="/" className="z-10 shrink-0 absolute left-2 top-2 sm:left-10">
          <Image src={logo} alt="GG Casino Logo" width={120} />
        </Link>

        <div className=" w-[110px] shrink-0 mob:w-[175px]" aria-hidden />

        <div className="hidden min-w-0 flex-1 justify-start tab:flex w-full">
          <HeaderNavLinks navLinks={navLinks} />
        </div>

        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 tab:gap-3">
          {isAuthenticated ? (
            <Link href="/pinigine">
              <HeaderBalance />
            </Link>
          ) : null}

          {!isAuthenticated && (
            <div className="tab:hidden">
              <ButtonPrimaryLink href="/prisijungti" extraButtonCss="py-[5px] w-auto max-w-none">
                <span>Prisijungti</span>
              </ButtonPrimaryLink>
            </div>
          )}

          <div className="hidden items-center gap-2 tab:flex">{languageBlock}</div>

          <div className="hidden tab:block">
            <ThemeSwitcher />
          </div>

          <div className="hidden tab:block">
            <HeaderAuthActions />
          </div>

          <button
            type="button"
            className="tab:hidden flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.625rem] border border-grey/40 bg-foreground/10 text-text-primary dark:bg-white/10"
            aria-expanded={open}
            aria-controls={open ? PANEL_ID : undefined}
            aria-label="Atidaryti meniu"
            onClick={() => setOpen(true)}
          >
            <MenuIcon className="h-6 w-6 shrink-0" aria-hidden />
          </button>
        </div>
      </div>

      {open
        ? createPortal(
            <div
              className="fixed inset-0 z-100 flex min-h-dvh flex-col bg-background"
              id={PANEL_ID}
              role="dialog"
              aria-modal="true"
              aria-labelledby="header-mobile-menu-title"
            >
              <div className="flex shrink-0 items-center justify-between border-b border-zinc-200/80 px-4 py-3 dark:border-zinc-800/80">
                <span id="header-mobile-menu-title" className="text-base font-semibold">
                  Meniu
                </span>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-[0.625rem] border border-grey/40 bg-foreground/10 dark:bg-white/10"
                  aria-label="Uždaryti meniu"
                  onClick={closePanel}
                >
                  <CloseIcon className="h-6 w-6 shrink-0" aria-hidden />
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6">
                <div className="mx-auto flex max-w-md flex-col gap-6">
                  <HeaderNavLinks navLinks={navLinks} variant="vertical" />
                  {languageBlock}
                  <div className="flex items-center justify-between gap-4 border-t border-zinc-200/80 pt-6 dark:border-zinc-800/80">
                    <span className="text-sm font-medium text-text-secondary">Tema</span>
                    <ThemeSwitcher onThemeChange={closePanel} />
                  </div>
                  {isAuthenticated ? (
                    <div className="border-t border-zinc-200/80 pt-6 dark:border-zinc-800/80">
                      <HeaderAuthActions showLoginLink={false} onLogoutClick={closePanel} />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </header>
  );
}

export default Header;

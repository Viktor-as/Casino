import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "@/styles/globals.css";
import Header from "@/components/Header/Header";
import { QueryProvider } from "@/components/providers/QueryProvider";
import Footer from "@/components/Footer/Footer";
import { getSiteOrigin } from "@/lib/site";

const secondaryFont = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-secondaryFont",
});

const primaryFont = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-primaryFont",
});

const siteOrigin = getSiteOrigin();
const defaultDescription =
  "Naujos kartos lošimų platforma: greiti išmokėjimai, konkurencingi koeficientai ir skaidri sistema. Žaisk drąsiai su GG Casino.";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: "GG Casino",
    template: "%s | GG Casino",
  },
  description: defaultDescription,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "lt_LT",
    siteName: "GG Casino",
    title: "GG Casino",
    description: defaultDescription,
    url: siteOrigin,
  },
  twitter: {
    card: "summary_large_image",
    title: "GG Casino",
    description: defaultDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="lt"
      suppressHydrationWarning
      className={`${secondaryFont.variable} ${primaryFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            <main className="flex min-h-0 flex-1 flex-col">{children}</main>
            <Footer />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

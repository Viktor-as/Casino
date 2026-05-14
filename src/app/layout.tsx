import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "@/styles/globals.css";
import Header from "@/components/Header/Header";

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

export const metadata: Metadata = {
  title: "Casino",
  description: "Casino Website",
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

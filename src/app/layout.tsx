import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import "@/styles/globals.css";
import Header from "@/components/Header/Header";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { getSession } from "@/actions/auth/session";
import { getQueryClient } from "@/lib/query/getQueryClient";
import { queryKeys } from "@/lib/query/queryKeys";
import Footer from "@/components/Footer/Footer";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.auth.session,
    queryFn: getSession,
  });

  return (
    <html
      lang="lt"
      suppressHydrationWarning
      className={`${secondaryFont.variable} ${primaryFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Header />
              <div className="flex min-h-0 flex-1 flex-col">{children}</div>
              <Footer />
            </ThemeProvider>
          </HydrationBoundary>
        </QueryProvider>
      </body>
    </html>
  );
}

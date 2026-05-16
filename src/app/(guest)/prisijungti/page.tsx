import type { Metadata } from "next";

import LoginForm from "./_components/LoginForm";

export const metadata: Metadata = {
  title: "Prisijungimas",
  description: "Prisijunkite prie savo GG Casino paskyros saugiai ir greitai.",
};

export default function LoginPage() {
  return (
    <main className="content center">
      <LoginForm />
    </main>
  );
}

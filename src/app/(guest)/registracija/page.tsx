import type { Metadata } from "next";

import RegistrationForm from "./_components/RegistrationForm";

export const metadata: Metadata = {
  title: "Registracija",
  description: "Susikurkite GG Casino paskyrą ir pradėkite statyti keliais žingsniais.",
};

export default function RegisterPage() {
  return (
    <main className="content center">
      <RegistrationForm />
    </main>
  );
}

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GG Casino",
    short_name: "GG Casino",
    description:
      "Naujos kartos lošimų platforma: greiti išmokėjimai, konkurencingi koeficientai ir skaidri sistema.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#008000",
    lang: "lt",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

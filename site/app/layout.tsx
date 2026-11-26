import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "lenis/dist/lenis.css";
import "./globals.css";
import "./experience.css";
import "./navigation.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:4317"),
  title: "Dra. Carolina Marino | Odontologia em Cachoeirinha",
  description: "Conheça o trabalho da Dra. Carolina Marino em ortodontia e harmonização orofacial. Agende uma avaliação pelo WhatsApp.",
  openGraph: {
    title: "Dra. Carolina Marino | Odontologia em Cachoeirinha",
    description: "Ortodontia e harmonização orofacial. Agende uma avaliação com a Dra. Carolina Marino.",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/imagens/carolina-social.webp", width: 1200, height: 630, alt: "Dra. Carolina Marino" }],
  },
  icons: { icon: "/marca/icone.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}

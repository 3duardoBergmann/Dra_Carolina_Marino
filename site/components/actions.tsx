import { ArrowUpRight, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/content";

export function BookingLink({ label, subject, style = "primary" }: Readonly<{
  label: string;
  subject?: string;
  style?: "primary" | "inline";
}>) {
  return (
    <a className={style === "primary" ? "button button-primary" : "text-link"} href={whatsappLink(subject)} target="_blank" rel="noreferrer">
      {style === "primary" && <MessageCircle aria-hidden="true" />}
      <span>{label}</span>
      <ArrowUpRight aria-hidden="true" className="action-arrow" />
    </a>
  );
}

export const contact = {
  phone: "5551994987272",
  displayPhone: "(51) 99498-7272",
  instagram: "https://www.instagram.com/dracarolinamarino/",
  city: "Cachoeirinha, RS",
  directions: "https://www.google.com/maps/dir/?api=1&destination=-29.9505974%2C-51.1006713",
};

export function whatsappLink(treatment?: string) {
  const message = treatment
    ? `Olá, Dra. Carolina! Conheci seu trabalho pelo site e gostaria de agendar uma avaliação para saber mais sobre ${treatment}.`
    : "Olá, Dra. Carolina! Conheci seu trabalho pelo site e gostaria de agendar uma avaliação.";
  return `https://wa.me/${contact.phone}?text=${encodeURIComponent(message)}`;
}

export const sections = [
  { id: "inicio", label: "Início" },
  { id: "tratamentos", label: "Tratamentos" },
  { id: "sobre", label: "Sobre" },
  { id: "diferenciais", label: "Diferenciais" },
  { id: "faq", label: "Dúvidas" },
  { id: "contato", label: "Contato" },
] as const;

export const treatments = [
  {
    title: "Harmonização orofacial",
    subject: "harmonização orofacial",
    description: "Uma avaliação das proporções e da expressão do rosto para orientar cuidados em sintonia com seus traços.",
    icon: "face",
  },
  {
    title: "Preenchimento facial",
    subject: "preenchimento facial",
    description: "A avaliação considera as proporções do rosto e em quais regiões o preenchimento pode fazer sentido para os seus objetivos.",
    icon: "profile",
  },
  {
    title: "Ortodontia",
    subject: "ortodontia",
    description: "Cuidado com o alinhamento dos dentes e a mordida, com atenção à função e à estética do sorriso.",
    icon: "smile",
  },
] as const;

import Image from "next/image";
import { ArrowDown, ArrowUp, ArrowUpRight, Instagram, MapPin, MessageCircle, Plus } from "lucide-react";
import { BookingLink } from "@/components/actions";
import { ApproachSequence } from "@/components/approach-sequence";
import { ContactCard } from "@/components/contact-card";
import { GrainBackdrop, Heading } from "@/components/editorial-effects";
import { Navigation } from "@/components/navigation";
import { SiteMotion } from "@/components/site-motion";
import { SmoothScroll } from "@/components/smooth-scroll";
import { TreatmentSequence } from "@/components/treatment-sequence";
import { contact, whatsappLink } from "@/lib/content";

const questions = [
  { question: "Como faço para agendar?", answer: "Fale pelo WhatsApp para consultar os horários de atendimento e combinar sua avaliação." },
  { question: "O que acontece na primeira avaliação?", answer: "A Dra. Carolina conversa com você sobre suas expectativas, examina o que você gostaria de cuidar e explica as opções para o seu caso." },
  { question: "Preciso escolher um procedimento antes da consulta?", answer: "Você pode chegar com dúvidas. A avaliação ajuda a entender quais cuidados fazem sentido para o seu caso." },
  { question: "Onde é o atendimento?", answer: "O atendimento é em Cachoeirinha, no Rio Grande do Sul. Abra a rota do consultório na seção Contato ou confirme a localização pelo WhatsApp." },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Navigation />
      <main id="conteudo" className="page-main">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-stage">
            <GrainBackdrop className="hero-grain" />
            <div className="hero-image" aria-hidden="true">
              <Image src="/imagens/carolina-luz-estudio-4k.webp" alt="" fill sizes="(max-width: 650px) 90vw, 660px" preload />
            </div>
            <div className="hero-wash" />
            <div className="container hero-layout">
              <a className="hero-brand hero-enter" href="#inicio" aria-label="Dra. Carolina Marino, início">
                <Image src="/marca/carolina-marino.svg" alt="" width={210} height={62} />
              </a>
              <div className="hero-copy">
                <Heading as="h1" id="hero-title" lines={["A beleza de", "ser você."]} accent={1} />
                <p className="hero-enter">Ortodontia e harmonização orofacial com atenção ao seu sorriso e aos traços que fazem parte de quem você é.</p>
                <div className="hero-actions hero-enter">
                  <BookingLink label="Agendar avaliação" />
                  <a className="button button-ghost" href="#tratamentos">Ver tratamentos <ArrowDown aria-hidden="true" /></a>
                </div>
              </div>
              <div className="hero-base hero-enter">
                <span>Dra. Carolina Marino <i /> <span className="hero-profession">Cirurgiã-dentista</span></span>
                <span><MapPin aria-hidden="true" /> {contact.city}</span>
              </div>
            </div>
          </div>
        </section>

        <TreatmentSequence />

        <section id="sobre" className="about about-sequence" aria-labelledby="about-title">
          <div className="about-stage">
            <GrainBackdrop />
            <div className="container about-layout">
              <div className="about-photo-slot">
                <figure className="about-photo">
                  <Image src="/imagens/carolina-retrato.webp" alt="Retrato da Dra. Carolina Marino em estúdio" fill sizes="(max-width: 650px) 90vw, 900px" />
                </figure>
              </div>
              <div className="about-copy">
                <Heading id="about-title" lines={["Dra. Carolina", "Marino"]} />
                <p>Cirurgiã-dentista, atua com ortodontia e harmonização orofacial em Cachoeirinha, no Rio Grande do Sul.</p>
                <p>Seu trabalho em harmonização facial valoriza a naturalidade, com atenção às proporções do rosto e à expressão de cada pessoa.</p>
                <BookingLink label="Agendar avaliação" />
              </div>
            </div>
          </div>
        </section>

        <ApproachSequence />

        <section id="faq" className="section faq" aria-labelledby="faq-title" tabIndex={-1}>
          <div className="container faq-layout">
            <Heading id="faq-title" lines={["Perguntas", "frequentes"]} />
            <div className="faq-list">
              {questions.map(({ question, answer }) => (
                <details key={question} name="carolina-faq" className="faq-item">
                  <summary>{question}<Plus aria-hidden="true" /></summary>
                  <div className="faq-answer"><p>{answer}</p></div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="section contact" aria-labelledby="contact-title">
          <GrainBackdrop />
          <div className="container contact-layout">
            <ContactCard>
              <div className="contact-copy">
                <Heading id="contact-title" lines={["Agende sua", "avaliação."]} accent={1} />
                <p>Fale pelo WhatsApp para tirar dúvidas e consultar os horários de atendimento.</p>
                <BookingLink label="Conversar pelo WhatsApp" />
              </div>
            </ContactCard>
            <address className="contact-details" data-reveal>
              <a href={whatsappLink()} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /><span>WhatsApp<small>{contact.displayPhone}</small></span><ArrowUpRight aria-hidden="true" /></a>
              <a href={contact.instagram} target="_blank" rel="noreferrer"><Instagram aria-hidden="true" /><span>Instagram<small>@dracarolinamarino</small></span><ArrowUpRight aria-hidden="true" /></a>
              <a href={contact.directions} target="_blank" rel="noreferrer"><MapPin aria-hidden="true" /><span>Como chegar<small>{contact.city}</small></span><ArrowUpRight aria-hidden="true" /></a>
            </address>
          </div>
        </section>
        <footer className="footer">
          <div className="container footer-layout">
            <Image src="/marca/carolina-marino.svg" alt="Dra. Carolina Marino · Harmonização Facial" width={164} height={49} />
            <span>Dra. Carolina Marino<br />Cirurgiã-dentista</span>
            <a href="#inicio">Voltar ao início <ArrowUp aria-hidden="true" /></a>
          </div>
        </footer>
      </main>
      <SiteMotion />
      <SmoothScroll />
    </>
  );
}

"use client";

import { AudioLines, Focus, ScanFace } from "lucide-react";
import { Heading } from "./editorial-effects";
import { Step, Stepper } from "./react-bits";
import { useScrollSequence } from "./scroll-sequence";
import { scrollPageTo } from "./smooth-scroll";

const principles = [
  { title: "Escuta", text: "A avaliação é o momento de conversar sobre o que você percebe, suas expectativas e suas dúvidas.", Icon: AudioLines },
  { title: "Planejamento", text: "O exame e a conversa orientam a escolha dos cuidados e das etapas do tratamento.", Icon: Focus },
  { title: "Naturalidade", text: "Função, proporções e expressão fazem parte da avaliação do sorriso e da face.", Icon: ScanFace },
];

export function ApproachSequence() {
  const { region, active, goTo } = useScrollSequence(principles.length);

  function showFaq() {
    const faq = document.getElementById("faq");
    if (!faq) return;
    history.replaceState(null, "", "#faq");
    faq.focus({ preventScroll: true });
    scrollPageTo(faq);
  }

  return (
    <section ref={region} className="approach scroll-sequence" id="diferenciais" aria-labelledby="approach-title">
      <div className="scroll-stage">
        <div className="container approach-layout">
          <div className="approach-heading">
            <Heading id="approach-title" lines={["Como é a", "avaliação"]} />
            <p>Uma conversa para entender o que você gostaria de cuidar e quais são as possibilidades para o seu caso.</p>
          </div>
          <div className="approach-stepper" data-active-step={active + 1}>
            <Stepper step={active + 1} onStepChange={(step) => goTo(step - 1)}
              onFinalStepCompleted={showFaq} indicator="bars" linear={false} theme="light" width="100%"
              accentColor="#edb1ca" className="assessment-stepper" backButtonText="Voltar"
              nextButtonText="Avançar" completeButtonText="Ver dúvidas">
              {principles.map(({ title, text, Icon }) => (
                <Step key={title} title={title}>
                  <article className="assessment-step">
                    <Icon aria-hidden="true" />
                    <Heading as="h3" lines={[title]} />
                    <p>{text}</p>
                  </article>
                </Step>
              ))}
            </Stepper>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { PRIX, PROJET } from "@/data/villas-ahlam";

interface QA {
  q: string;
  a: string;
}

/** FAQ — CDC §11.1 (financement, réservation, juridique, MRE, délais). */
const ITEMS: QA[] = [
  {
    q: "Comment se passe la réservation en ligne ?",
    a: "Choisissez un lot disponible sur la carte, remplissez le formulaire (nom, téléphone, e-mail). Le lot passe en « en cours » et un conseiller Yatib Sakan vous rappelle sous 24 h pour finaliser. Aucun paiement en ligne au lancement.",
  },
  {
    q: "Le prix affiché est-il définitif ?",
    a: `Le prix « à partir de » est indicatif : surface du lot × ${PRIX.prixM2.toLocaleString(
      "fr-FR",
    )} DH/m². Il concerne le lot viabilisé (la villa R+1 est à bâtir). Le prix exact est confirmé par le service commercial.`,
  },
  {
    q: "Puis-je financer mon achat à crédit ?",
    a: "Oui. Un simulateur de crédit vous donne une estimation de mensualité, et nos conseillers vous accompagnent dans le montage du dossier auprès des grandes banques marocaines (Attijariwafa, Bank of Africa, CIH, BMCE).",
  },
  {
    q: "Le projet est-il légalement sécurisé ?",
    a: `Oui. Le lotissement est autorisé et titré (Titre Foncier ${PROJET.titreFoncier}), conçu par l'architecte ${PROJET.architecte}. Les lots sont viabilisés (voirie et réseaux réalisés).`,
  },
  {
    q: "Je vis à l'étranger (MRE), puis-je réserver à distance ?",
    a: "Absolument. Tout le parcours est pensé pour la diaspora : galerie immersive de rendus, réservation en ligne, rappel commercial, échanges par WhatsApp, et un site disponible en français, arabe et anglais.",
  },
  {
    q: "Quels sont les délais ?",
    a: "Les lots viabilisés sont commercialisés dès à présent (tous d'un coup). La construction de la villa R+1 est à votre initiative ; votre conseiller précise les modalités et l'accompagnement.",
  },
];

/**
 * FAQ accessible (accordéon) + données structurées FAQPage — CDC §11.1 / §10.
 */
export function Faq() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "faq-jsonld";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: ITEMS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
    document.getElementById("faq-jsonld")?.remove();
    document.head.appendChild(script);
    return () => document.getElementById("faq-jsonld")?.remove();
  }, []);

  return (
    <section aria-labelledby="faq-title" className="container-luxe py-16 md:py-24">
      <div className="flex items-center gap-4">
        <span className="gold-rule" />
        <span className="eyebrow text-gold">Questions fréquentes</span>
      </div>
      <h2 id="faq-title" className="mt-4 h-section text-primary">
        Tout ce qu'il faut <em>savoir</em>.
      </h2>

      <div className="mx-auto mt-10 max-w-3xl divide-y divide-border/60 border-y border-border/60">
        {ITEMS.map((item) => (
          <details key={item.q} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-display text-lg text-primary transition-colors hover:text-gold">
              {item.q}
              <ChevronDown
                className="h-5 w-5 shrink-0 text-gold transition-transform duration-300 group-open:rotate-180"
                aria-hidden
              />
            </summary>
            <p className="pb-5 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default Faq;

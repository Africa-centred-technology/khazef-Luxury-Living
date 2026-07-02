import Seo from "@/components/Seo";
import { LegalShell, LegalSection } from "@/components/legal/LegalShell";

const Cookies = () => {
  return (
    <>
      <Seo
        title="Gestion des cookies"
        description="Politique de gestion des cookies du site Les Villas Ahlam — cookies nécessaires et mesure d'audience soumise à consentement."
      />
      <LegalShell title="Gestion des cookies" updated="Juillet 2026">
        <p>
          Un cookie est un petit fichier déposé sur votre appareil lors de la visite d'un
          site. Le site Les Villas Ahlam limite au strict nécessaire l'usage des cookies et
          traceurs, dans le respect de la loi n° 09-08 et des bonnes pratiques RGPD.
        </p>

        <LegalSection title="Cookies strictement nécessaires">
          <p>
            Indispensables au fonctionnement du site, ils ne requièrent pas votre
            consentement :
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>Préférence de langue</strong> — mémorise votre choix FR / AR / EN
              (stockage local du navigateur).
            </li>
            <li>
              <strong>Choix de consentement</strong> — mémorise votre décision concernant les
              cookies afin de ne plus vous solliciter.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="Cookies de mesure d'audience (soumis à consentement)">
          <p>
            Avec votre accord, nous pouvons déposer des cookies de mesure d'audience pour
            comprendre l'usage du site et l'améliorer (pages consultées, temps passé sur la
            carte des lots). <strong>Aucun de ces cookies n'est déposé tant que vous n'avez
            pas cliqué sur « Tout accepter »</strong> dans la bannière de consentement.
          </p>
        </LegalSection>

        <LegalSection title="Gérer votre consentement">
          <p>
            Vous pouvez à tout moment modifier votre choix en supprimant les données de site
            enregistrées par votre navigateur, ou en refusant les cookies non essentiels dès
            la bannière affichée à votre première visite.
          </p>
          <p>
            La plupart des navigateurs permettent également de bloquer ou supprimer les
            cookies via leurs réglages (rubrique « Confidentialité » / « Données de
            navigation »).
          </p>
        </LegalSection>

        <LegalSection title="En savoir plus">
          <p>
            Le traitement de vos données personnelles est détaillé dans notre{" "}
            <a href="/confidentialite" className="link-luxe text-primary">
              Politique de confidentialité
            </a>
            .
          </p>
        </LegalSection>
      </LegalShell>
    </>
  );
};

export default Cookies;

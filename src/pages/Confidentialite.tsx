import Seo from "@/components/Seo";
import { LegalShell, LegalSection } from "@/components/legal/LegalShell";
import { PROJET, CONTACT } from "@/data/villas-ahlam";

const Confidentialite = () => {
  return (
    <>
      <Seo
        title="Politique de confidentialité"
        description="Politique de confidentialité et protection des données (loi 09-08) du site Les Villas Ahlam à Bouskoura."
      />
      <LegalShell title="Politique de confidentialité" updated="Juillet 2026">
        <p>
          {PROJET.nom} accorde une grande importance à la protection de votre vie privée.
          La présente politique décrit les données que nous collectons, les raisons de leur
          collecte et vos droits, conformément à la <strong>loi n° 09-08</strong> relative
          à la protection des personnes physiques à l'égard du traitement des données à
          caractère personnel.
        </p>

        <LegalSection title="Responsable du traitement">
          <p>
            Le responsable du traitement est le lotisseur <strong>{PROJET.lotisseur}</strong>,
            joignable au {CONTACT.telephone} (également par WhatsApp).
          </p>
        </LegalSection>

        <LegalSection title="Données collectées">
          <p>Nous collectons uniquement les données que vous nous transmettez volontairement via nos formulaires :</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Identité : nom et prénom ;</li>
            <li>Coordonnées : téléphone, e-mail, ville / pays de résidence ;</li>
            <li>Projet : lot concerné, intention de financement (comptant / crédit), message ;</li>
            <li>Consentement : votre acceptation d'être recontacté(e).</li>
          </ul>
          <p>
            Aucune donnée sensible n'est demandée. La navigation peut générer des données
            techniques (voir notre{" "}
            <a href="/cookies" className="link-luxe text-primary">
              politique cookies
            </a>
            ).
          </p>
        </LegalSection>

        <LegalSection title="Finalités">
          <p>Vos données sont utilisées pour :</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>traiter vos demandes de réservation de lot et vous rappeler ;</li>
            <li>répondre à vos demandes de rappel, de brochure ou de contact ;</li>
            <li>réaliser une simulation de financement à votre demande ;</li>
            <li>vous informer sur l'avancement du projet si vous y consentez.</li>
          </ul>
        </LegalSection>

        <LegalSection title="Base légale">
          <p>
            Le traitement repose sur votre <strong>consentement</strong> et sur l'exécution
            de mesures précontractuelles prises à votre demande (traitement de votre
            réservation).
          </p>
        </LegalSection>

        <LegalSection title="Destinataires">
          <p>
            Vos données sont destinées au seul service commercial de {PROJET.lotisseur}.
            <strong> Elles ne sont ni vendues, ni louées, ni cédées à des tiers</strong> à des
            fins commerciales.
          </p>
        </LegalSection>

        <LegalSection title="Durée de conservation">
          <p>
            Vos données sont conservées le temps nécessaire au traitement de votre demande
            puis pendant la durée de la relation commerciale, et au maximum trois (3) ans
            après le dernier contact, sauf obligation légale contraire.
          </p>
        </LegalSection>

        <LegalSection title="Vos droits">
          <p>
            Conformément à la loi 09-08, vous disposez d'un droit d'accès, de rectification,
            d'opposition et de suppression de vos données. Pour l'exercer, contactez-nous au{" "}
            {CONTACT.telephone}. Ces traitements peuvent faire l'objet, le cas échéant, d'une
            déclaration auprès de la <strong>CNDP</strong> (Commission Nationale de contrôle
            de la protection des Données à caractère Personnel).
          </p>
        </LegalSection>

        <LegalSection title="Sécurité">
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles raisonnables
            pour protéger vos données contre tout accès, altération ou divulgation non
            autorisés (connexions chiffrées HTTPS, accès restreint aux demandes).
          </p>
        </LegalSection>
      </LegalShell>
    </>
  );
};

export default Confidentialite;

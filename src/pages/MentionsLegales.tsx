import Seo from "@/components/Seo";
import { LegalShell, LegalSection } from "@/components/legal/LegalShell";
import { PROJET, CONTACT } from "@/data/villas-ahlam";

const MentionsLegales = () => {
  return (
    <>
      <Seo
        title="Mentions légales"
        description="Mentions légales du site Les Villas Ahlam — lotisseur Yatib Sakan, domaine résidentiel privé à Bouskoura."
      />
      <LegalShell title="Mentions légales" updated="Juillet 2026">
        <LegalSection title="Éditeur du site">
          <p>
            Le présent site <strong>{PROJET.nom}</strong> ({PROJET.sousTitre}) est édité par
            le lotisseur <strong>{PROJET.lotisseur}</strong>, dans le cadre de la
            commercialisation du lotissement de {PROJET.nombreLots} lots de villas{" "}
            {PROJET.typologie} situé à {PROJET.localisation}.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Téléphone : {CONTACT.telephone}</li>
            <li>WhatsApp : {CONTACT.telephone}</li>
            <li>Architecte du projet : {PROJET.architecte}</li>
            <li>Propriétaire foncier : {PROJET.proprietaireFoncier}</li>
            <li>Titre foncier : {PROJET.titreFoncier}</li>
          </ul>
        </LegalSection>

        <LegalSection title="Directeur de la publication">
          <p>
            Le directeur de la publication est le représentant légal du lotisseur{" "}
            {PROJET.lotisseur}.
          </p>
        </LegalSection>

        <LegalSection title="Hébergement">
          <p>
            Le site est diffusé via l'infrastructure <strong>Cloudflare, Inc.</strong>
            (101 Townsend Street, San Francisco, CA 94107, États-Unis) et servi depuis les
            serveurs du projet. Pour toute demande relative à l'hébergement, contactez
            l'éditeur aux coordonnées ci-dessus.
          </p>
        </LegalSection>

        <LegalSection title="Propriété intellectuelle">
          <p>
            L'ensemble des éléments du site (marque « {PROJET.nom} », logo, textes, plans,
            rendus, photographies et illustrations) est protégé par le droit d'auteur et le
            droit des marques. Toute reproduction, représentation ou diffusion, totale ou
            partielle, sans l'autorisation écrite de l'éditeur est interdite.
          </p>
          <p>
            Les rendus et visuels de villas sont des <em>illustrations non contractuelles</em>
            destinées à la présentation du projet. Les surfaces, prix et disponibilités sont
            indicatifs et confirmés par le service commercial.
          </p>
        </LegalSection>

        <LegalSection title="Responsabilité">
          <p>
            L'éditeur s'efforce d'assurer l'exactitude des informations diffusées mais ne
            saurait être tenu responsable des erreurs, omissions ou d'une indisponibilité
            temporaire du site. Les informations relatives aux lots (surface, prix indicatif,
            statut) sont fournies à titre indicatif et ne constituent pas une offre ferme de
            vente.
          </p>
        </LegalSection>

        <LegalSection title="Données personnelles">
          <p>
            Le traitement des données collectées via les formulaires est décrit dans notre{" "}
            <a href="/confidentialite" className="link-luxe text-primary">
              Politique de confidentialité
            </a>
            , conforme à la loi n° 09-08 relative à la protection des personnes physiques à
            l'égard du traitement des données à caractère personnel.
          </p>
        </LegalSection>
      </LegalShell>
    </>
  );
};

export default MentionsLegales;

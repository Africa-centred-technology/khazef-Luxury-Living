import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Seo from "@/components/Seo";
import CtaBanner from "@/components/CtaBanner";
import {
  BookingCTA,
  DetailHero,
  FloorPlanSection,
  Live3DPreview,
  LocationOrientation,
  NarrativeAndMaterials,
  RelatedTypologies,
  RoomGrid,
  SignatureOverview,
} from "@/components/apartment-detail";
import {
  getTypologyById,
  type TypologyId,
} from "@/components/virtual-tour/data/apartment-typologies";
import { useTourStore } from "@/components/virtual-tour/hooks/useTourStore";

const ApartmentDetail = () => {
  const { typologyId } = useParams<{ typologyId: string }>();
  const typology = typologyId
    ? getTypologyById(typologyId as TypologyId)
    : undefined;

  useEffect(() => {
    if (typology) {
      useTourStore.getState().setTypology(typology.id);
    }
  }, [typology]);

  if (!typology) {
    return (
      <>
        <Seo
          title="Typologie introuvable"
          description="Cette typologie d'appartement n'existe pas ou n'est plus disponible."
        />
        <section className="container-luxe py-28 md:py-40">
          <p className="eyebrow mb-6">Erreur 404</p>
          <h1 className="h-display mb-8">
            Cette typologie
            <br />
            <span className="italic text-primary/70">est introuvable.</span>
          </h1>
          <div className="gold-rule mb-10" />
          <p className="max-w-xl text-lg text-foreground/70 mb-12">
            L'adresse demandée ne correspond à aucune de nos typologies. Revenez
            à la sélection pour explorer les vingt-cinq appartements Luxury
            Living.
          </p>
          <Link to="/apartments" className="link-luxe">
            Retour aux appartements
          </Link>
        </section>
      </>
    );
  }

  const t = typology;

  return (
    <>
      <Seo
        title={`${t.name} — Appartement`}
        description={t.tagline}
      />
      <DetailHero typology={t} />
      <SignatureOverview typology={t} />
      <NarrativeAndMaterials typology={t} />
      <RoomGrid typology={t} />
      <Live3DPreview typology={t} />
      <FloorPlanSection typology={t} />
      <LocationOrientation typology={t} />
      <BookingCTA typology={t} />
      <RelatedTypologies typology={t} />
      <CtaBanner />
    </>
  );
};

export default ApartmentDetail;

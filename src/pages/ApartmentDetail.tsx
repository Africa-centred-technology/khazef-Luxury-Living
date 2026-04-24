import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("apartmentDetail");
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
          title={t("notFound.seoTitle")}
          description={t("notFound.seoDescription")}
        />
        <section className="container-luxe py-28 md:py-40">
          <p className="eyebrow mb-6">{t("notFound.eyebrow")}</p>
          <h1 className="h-display mb-8">
            {t("notFound.titleLine1")}
            <br />
            <span className="italic text-primary/70">
              {t("notFound.titleLine2")}
            </span>
          </h1>
          <div className="gold-rule mb-10" />
          <p className="max-w-xl text-lg text-foreground/70 mb-12">
            {t("notFound.body")}
          </p>
          <Link to="/apartments" className="link-luxe">
            {t("notFound.back")}
          </Link>
        </section>
      </>
    );
  }

  const typologyDetail = typology;

  return (
    <>
      <Seo
        title={`${typologyDetail.name} ${t("seo.titleSuffix")}`}
        description={typologyDetail.tagline}
      />
      <DetailHero typology={typologyDetail} />
      <SignatureOverview typology={typologyDetail} />
      <NarrativeAndMaterials typology={typologyDetail} />
      <RoomGrid typology={typologyDetail} />
      <Live3DPreview typology={typologyDetail} />
      <FloorPlanSection typology={typologyDetail} />
      <LocationOrientation typology={typologyDetail} />
      <BookingCTA typology={typologyDetail} />
      <RelatedTypologies typology={typologyDetail} />
      <CtaBanner />
    </>
  );
};

export default ApartmentDetail;

import { useState } from "react";
import { useTranslation } from "react-i18next";
import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import CtaBanner from "@/components/CtaBanner";
import { X } from "lucide-react";
import hero from "@/assets/hero-building.jpg";
import living from "@/assets/interior-living.jpg";
import bedroom from "@/assets/interior-bedroom.jpg";
import kitchen from "@/assets/interior-kitchen.jpg";
import safi from "@/assets/safi-aerial.jpg";
import coast from "@/assets/safi-coast.jpg";
import pottery from "@/assets/safi-pottery.jpg";
import zellige from "@/assets/material-zellige.jpg";
import marble from "@/assets/material-marble.jpg";

interface GalleryImage {
  src: string;
  span: string;
}

const imageSources: GalleryImage[] = [
  { src: hero, span: "md:col-span-2 md:row-span-2" },
  { src: living, span: "" },
  { src: bedroom, span: "" },
  { src: kitchen, span: "md:col-span-2" },
  { src: safi, span: "" },
  { src: coast, span: "md:col-span-2" },
  { src: pottery, span: "" },
  { src: zellige, span: "" },
  { src: marble, span: "" },
];

const Gallery = () => {
  const { t } = useTranslation("gallery");
  const [open, setOpen] = useState<number | null>(null);
  const alts = t("mosaic.alts", { returnObjects: true }) as string[];
  const images = imageSources.map((img, index) => ({
    ...img,
    alt: alts[index] ?? "",
  }));

  return (
    <>
      <Seo title={t("seo.title")} description={t("seo.description")} />
      <PageHeader
        eyebrow={t("header.eyebrow")}
        arabic={t("header.arabic")}
        title={t("header.title")}
        italicWord={t("header.italicWord")}
        image={hero}
      />

      <section className="container-luxe py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setOpen(i)}
              className={`group relative overflow-hidden bg-muted ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                decoding="async"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="eyebrow text-gold-bright text-[10px]">{String(i + 1).padStart(2, "0")}</div>
                <div className="font-display text-lg leading-tight">{img.alt}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {open !== null && (
        <div
          className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur p-6 flex items-center justify-center animate-fade-in"
          onClick={() => setOpen(null)}
        >
          <button
            className="absolute top-6 right-6 h-12 w-12 rounded-full border border-gold/40 text-secondary flex items-center justify-center hover:bg-gold/10"
            aria-label={t("lightbox.close")}
          >
            <X className="h-6 w-6" />
          </button>
          <figure className="max-w-6xl w-full">
            <img src={images[open].src} alt={images[open].alt} className="w-full max-h-[80vh] object-contain shadow-luxe-xl" />
            <figcaption className="text-secondary/80 text-center mt-4 font-display italic text-lg">
              {images[open].alt}
            </figcaption>
          </figure>
        </div>
      )}

      <CtaBanner />
    </>
  );
};

export default Gallery;

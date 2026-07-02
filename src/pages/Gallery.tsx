import { useMemo, useState } from "react";
import { X } from "lucide-react";

import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import CtaBanner from "@/components/CtaBanner";
import { GALLERY, RENDERS, type RenderItem } from "@/data/renders";

type Categorie = RenderItem["categorie"] | "Tout";
const CATEGORIES: Categorie[] = ["Tout", "Architecture", "Intérieurs", "Domaine", "Art de vivre"];

const Gallery = () => {
  const [filtre, setFiltre] = useState<Categorie>("Tout");
  const [open, setOpen] = useState<number | null>(null);

  const images = useMemo(
    () => (filtre === "Tout" ? GALLERY : GALLERY.filter((g) => g.categorie === filtre)),
    [filtre],
  );

  return (
    <>
      <Seo
        title="Galerie immersive — rendus des villas"
        description="Découvrez en images les villas R+1 des Villas Ahlam à Bouskoura : façades de jour et de nuit, intérieurs, toit-terrasse et art de vivre. Rendus haute définition."
      />
      <PageHeader
        eyebrow="Galerie immersive"
        title="Imaginez"
        italicWord="votre quotidien"
        arabic="أحلام"
        intro="Façades, intérieurs et art de vivre : une projection fidèle de l'esprit du domaine. Rendus illustratifs."
        image={RENDERS.villaDusk}
      />

      <section className="container-luxe py-16 md:py-24">
        {/* Filtres par catégorie */}
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltre(cat)}
              className={`rounded-full border px-4 py-1.5 text-xs transition-colors ${
                filtre === cat
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
          {images.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setOpen(i)}
              className={`group relative overflow-hidden bg-muted ${img.span ?? ""}`}
            >
              <img
                src={img.src}
                alt={img.titre}
                className="absolute inset-0 h-full w-full object-cover transition-transform [transition-duration:1500ms] group-hover:scale-110"
                loading={i === 0 ? "eager" : "lazy"}
                fetchpriority={i === 0 ? "high" : "auto"}
                decoding="async"
              />
              <div className="absolute inset-0 bg-primary/0 transition-colors group-hover:bg-primary/30" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-secondary opacity-0 transition-opacity group-hover:opacity-100">
                <div className="eyebrow text-[10px] text-gold-bright">{img.categorie}</div>
                <div className="font-display text-lg leading-tight">{img.titre}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {open !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/95 p-6 backdrop-blur animate-fade-in"
          onClick={() => setOpen(null)}
        >
          <button
            className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-secondary hover:bg-gold/10"
            aria-label="Fermer"
          >
            <X className="h-6 w-6" />
          </button>
          <figure className="w-full max-w-6xl">
            <img
              src={images[open].src}
              alt={images[open].titre}
              className="max-h-[80vh] w-full object-contain shadow-luxe-xl"
            />
            <figcaption className="mt-4 text-center font-display text-lg italic text-secondary/80">
              {images[open].titre}
            </figcaption>
          </figure>
        </div>
      )}

      <CtaBanner />
    </>
  );
};

export default Gallery;

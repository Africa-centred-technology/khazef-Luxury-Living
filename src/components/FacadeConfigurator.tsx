import { useState } from "react";
import { RENDERS } from "@/data/renders";
import tadelakt from "@/assets/material-tadelakt.jpg";
import zellige from "@/assets/material-zellige.jpg";
import marble from "@/assets/material-marble.jpg";

interface Finish {
  name: string;
  desc: string;
  /** Couleurs de la charte (façade / menuiserie bois / accent). */
  facade: string;
  wood: string;
  accent: string;
  material: string;
  materialName: string;
  /** Teinte d'ambiance appliquée en surimpression sur le rendu. */
  tint: string;
}

/** Ambiances de finition — reprennent la palette Ahlam (CDC §4.1 / §8 #13). */
const FINISHES: Finish[] = [
  {
    name: "Ahlam · Ivoire & rose",
    desc: "L'ambiance signature : façade ivoire, bois chaud et une touche d'Orchid Rose pour les détails.",
    facade: "#F7F0EA",
    wood: "#D08F6B",
    accent: "#942F67",
    material: tadelakt,
    materialName: "Tadelakt",
    tint: "rgba(148,47,103,0.14)",
  },
  {
    name: "Nature · Ivoire & jade",
    desc: "Une lecture apaisée, tournée vers le jardin : menuiseries et accents jade, matière minérale.",
    facade: "#F7F0EA",
    wood: "#86947A",
    accent: "#86947A",
    material: zellige,
    materialName: "Zellige",
    tint: "rgba(134,148,122,0.16)",
  },
  {
    name: "Lumière · Ivoire & or",
    desc: "La golden hour au quotidien : accents Honeycomb dorés et pierre veinée pour la chaleur.",
    facade: "#F7F0EA",
    wood: "#D08F6B",
    accent: "#F2C368",
    material: marble,
    materialName: "Pierre & marbre",
    tint: "rgba(242,195,104,0.16)",
  },
  {
    name: "Terre · Grège & chêne",
    desc: "Un contraste plus dense : façade grège, chêne foncé et terracotta, pour un caractère affirmé.",
    facade: "#EDE4DA",
    wood: "#423934",
    accent: "#D08F6B",
    material: tadelakt,
    materialName: "Tadelakt",
    tint: "rgba(66,57,52,0.18)",
  },
];

/**
 * Configurateur de façade / finitions — CDC §8 Tier 2 (#13).
 * Le visiteur choisit une ambiance ; le rendu et les échantillons s'adaptent.
 * Purement illustratif — les finitions réelles sont validées avec le conseiller.
 */
export function FacadeConfigurator() {
  const [index, setIndex] = useState(0);
  const finish = FINISHES[index];

  return (
    <section aria-labelledby="config-title" className="container-luxe py-20 md:py-28">
      <div className="flex items-center gap-4">
        <span className="gold-rule" />
        <span className="eyebrow text-gold">Configurateur de finitions</span>
      </div>
      <h2 id="config-title" className="mt-4 h-section text-primary">
        Imaginez <em>votre façade</em>.
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Composez l'ambiance de votre villa parmi quatre harmonies inspirées de la palette
        Ahlam. Un aperçu, à affiner avec votre conseiller.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        {/* Aperçu du rendu avec teinte d'ambiance */}
        <div className="relative overflow-hidden rounded-sm border border-border/60 shadow-luxe-md">
          <img
            src={RENDERS.villaDay}
            alt="Villa R+1 contemporaine — aperçu des finitions"
            className="aspect-[4/3] w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-multiply transition-colors duration-500"
            style={{ backgroundColor: finish.tint }}
          />
          {/* Vignette matière */}
          <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-sm border border-background/30 bg-charcoal/70 p-2 pr-4 text-background backdrop-blur">
            <img
              src={finish.material}
              alt={finish.materialName}
              className="h-10 w-10 rounded-sm object-cover"
              loading="lazy"
            />
            <div className="text-xs">
              <div className="opacity-70">Matière</div>
              <div className="font-medium">{finish.materialName}</div>
            </div>
          </div>
        </div>

        {/* Sélecteur d'ambiances + échantillons */}
        <div>
          <div className="flex flex-col gap-2">
            {FINISHES.map((f, i) => (
              <button
                key={f.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-pressed={i === index}
                className={`flex items-center gap-3 rounded-sm border p-3 text-left transition-colors ${
                  i === index
                    ? "border-primary bg-secondary/40"
                    : "border-border/60 hover:border-primary/60"
                }`}
              >
                <span className="flex shrink-0 gap-1">
                  <Swatch color={f.facade} />
                  <Swatch color={f.wood} />
                  <Swatch color={f.accent} />
                </span>
                <span className="text-sm font-medium text-primary">{f.name}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-sm bg-secondary/30 p-5">
            <p className="text-sm text-muted-foreground">{finish.desc}</p>
            <dl className="mt-4 grid grid-cols-3 gap-3 text-center text-[11px]">
              <Sample label="Façade" color={finish.facade} />
              <Sample label="Menuiserie" color={finish.wood} />
              <Sample label="Accent" color={finish.accent} />
            </dl>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Aperçu illustratif. Les finitions, matériaux et teintes définitifs sont précisés
            avec votre conseiller dans le respect de la charte du domaine.
          </p>
        </div>
      </div>
    </section>
  );
}

function Swatch({ color }: { color: string }) {
  return (
    <span
      className="inline-block h-5 w-5 rounded-sm border border-border/60"
      style={{ backgroundColor: color }}
    />
  );
}

function Sample({ label, color }: { label: string; color: string }) {
  return (
    <div>
      <span
        className="mx-auto block h-10 w-full rounded-sm border border-border/60"
        style={{ backgroundColor: color }}
      />
      <div className="mt-1.5 uppercase tracking-[0.14em] text-muted-foreground">{label}</div>
    </div>
  );
}

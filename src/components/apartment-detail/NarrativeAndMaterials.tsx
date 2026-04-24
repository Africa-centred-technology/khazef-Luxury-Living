import type {
  ApartmentTypology,
  TypologyId,
  TypologyTheme,
} from "@/components/virtual-tour/data/apartment-typologies";

interface NarrativeAndMaterialsProps {
  typology: ApartmentTypology;
}

interface NarrativeCopy {
  title: string;
  paragraphs: readonly [string, string, string];
  pullQuote: string;
}

interface Material {
  label: string;
  category: string;
  description: string;
  swatch: string;
}

const NARRATIVE_BY_TYPOLOGY: Record<TypologyId, NarrativeCopy> = {
  "harbour-t2": {
    title: "Habiter le port",
    paragraphs: [
      "Ici, la lumière entre par la mer. Les barques de Safi dessinent l'horizon du matin, et le séjour prolonge la cuisine dans un même geste, comme une pièce tournée vers le môle.",
      "Les murs de chaux minérale absorbent le jour pour le rendre plus doux, tandis que le parquet de chêne clair tient la pièce au chaud. Le cordage des luminaires rappelle la corderie du port, le laiton ponctue sans jamais crier.",
      "La chambre se love à l'arrière, enveloppée de tadelakt sable et de linge écru. On y retrouve le silence des maisons de pêcheurs, la sobriété des bois brossés, la présence discrète des objets choisis un à un.",
    ],
    pullQuote:
      "Un refuge à hauteur d'artisan, où chaque matière garde la mémoire du port.",
  },
  "atlantic-t3": {
    title: "Habiter l'Atlantique",
    paragraphs: [
      "Le salon traversant tient l'océan d'un côté, le jardin clos de l'autre. Entre les deux, le marbre veiné court sans rupture, comme une marée lente qui redessine la pièce à chaque heure du jour.",
      "Le tadelakt sable des murs capte la lumière atlantique et la renvoie plus chaude. Le zellige cobalt, posé par touches, signe la pièce d'une couleur maroco-méditerranéenne qui dialogue avec le velours indigo du canapé.",
      "La suite parentale se pare des mêmes bleus profonds, soulignés d'or patiné et de laiton brossé. L'ensemble tient la ligne d'une maison pensée pour durer, sans emphase, avec la mesure d'un riad contemporain.",
    ],
    pullQuote:
      "L'Atlantique et la médina, réconciliés dans une même pièce traversante.",
  },
  "penthouse-duplex": {
    title: "Habiter le ciel",
    paragraphs: [
      "Au dernier étage, le salon monte vers la lumière. Le béton ciré fumé court jusqu'aux baies, le ciel de Safi s'invite sans obstacle, et la terrasse tient l'Atlantique dans sa paume ouverte.",
      "Les murs d'enduit charbon mat dessinent une architecture d'ombre autour des grands vitrages. Le métal noir des menuiseries, les verres trempés, les cuirs patinés composent une pièce taillée pour la hauteur.",
      "Le velours charbon du mobilier et le laiton brossé des touches finales tiennent la promesse du duplex : une maison contemporaine, posée à six étages du sol, où chaque matière s'efface devant la vue.",
    ],
    pullQuote:
      "À six étages du sol, la matière s'efface pour laisser parler le ciel.",
  },
};

const FLOOR_LABELS: Record<TypologyTheme["floor"], string> = {
  parquet: "Parquet chêne clair",
  marble: "Marbre veiné de crème",
  concrete: "Béton ciré fumé",
};

const FLOOR_DESCRIPTIONS: Record<TypologyTheme["floor"], string> = {
  parquet: "Lames larges, finition huilée mate, patine d'atelier.",
  marble: "Dalles grand format, joints serrés, polissage satiné.",
  concrete: "Coulé sur place, surface fumée, rendu minéral profond.",
};

const ACCENT_LABELS: Record<TypologyTheme["accent"], string> = {
  zellige: "Zellige cobalt",
  rope: "Cordage & laiton",
  none: "Métal noir & verre",
};

const ACCENT_DESCRIPTIONS: Record<TypologyTheme["accent"], string> = {
  zellige: "Carreaux émaillés à la main, posés par touches éditoriales.",
  rope: "Luminaires et détails tressés, clin d'œil à la corderie du port.",
  none: "Menuiseries noires, verre trempé, lignes contemporaines assumées.",
};

const WALL_COPY: Record<
  TypologyId,
  { label: string; description: string }
> = {
  "harbour-t2": {
    label: "Chaux minérale ivoire",
    description: "Murs respirants, texture feutrée, lumière diffusée.",
  },
  "atlantic-t3": {
    label: "Tadelakt sable chaud",
    description: "Enduit ciré à la main, velouté, teintes de dune.",
  },
  "penthouse-duplex": {
    label: "Enduit charbon mat",
    description: "Surface profonde, absorbe la lumière, dramatise la vue.",
  },
};

const SOFA_COPY: Record<
  TypologyId,
  { label: string; description: string }
> = {
  "harbour-t2": {
    label: "Velours bleu marine",
    description: "Assise basse, tissage dense, patine marine.",
  },
  "atlantic-t3": {
    label: "Velours indigo nuit",
    description: "Textile profond, piqûres sellier, confort enveloppant.",
  },
  "penthouse-duplex": {
    label: "Velours charbon",
    description: "Lignes architecturales, densité feutrée, élégance sobre.",
  },
};

const TOUCH_COPY: Record<
  TypologyId,
  { label: string; description: string; swatch: string }
> = {
  "harbour-t2": {
    label: "Laiton brossé",
    description: "Poignées, appliques, robinetterie aux reflets mats.",
    swatch: "#c9a961",
  },
  "atlantic-t3": {
    label: "Laiton brossé & or patiné",
    description: "Détails dorés, reflets chauds, mesure éditoriale.",
    swatch: "#c9a961",
  },
  "penthouse-duplex": {
    label: "Laiton brossé noirci",
    description: "Touches discrètes, finition fumée, pointe de chaleur.",
    swatch: "#a0843e",
  },
};

function buildMaterials(typology: ApartmentTypology): readonly Material[] {
  const { theme, id } = typology;
  const wall = WALL_COPY[id];
  const sofa = SOFA_COPY[id];
  const touch = TOUCH_COPY[id];

  return [
    {
      category: "Sol",
      label: FLOOR_LABELS[theme.floor],
      description: FLOOR_DESCRIPTIONS[theme.floor],
      swatch: theme.floorColor,
    },
    {
      category: "Murs",
      label: wall.label,
      description: wall.description,
      swatch: theme.wallInterior,
    },
    {
      category: "Accent",
      label: ACCENT_LABELS[theme.accent],
      description: ACCENT_DESCRIPTIONS[theme.accent],
      swatch: theme.accent === "zellige" ? theme.kitchenBase : theme.sofa,
    },
    {
      category: "Mobilier",
      label: sofa.label,
      description: sofa.description,
      swatch: theme.sofaBack,
    },
    {
      category: "Touches",
      label: touch.label,
      description: touch.description,
      swatch: touch.swatch,
    },
  ] as const;
}

export function NarrativeAndMaterials({ typology }: NarrativeAndMaterialsProps) {
  const narrative = NARRATIVE_BY_TYPOLOGY[typology.id];
  const materials = buildMaterials(typology);

  return (
    <section
      className="bg-secondary/40 py-20 md:py-28"
      aria-labelledby="narrative-heading"
    >
      <div className="container-luxe">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left column — editorial narrative (7/12) */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-4">
              <span className="gold-rule" aria-hidden />
              <span className="eyebrow text-gold-deep">L'art de vivre</span>
              <span
                className="arabic text-xl text-gold/80"
                aria-hidden
              >
                أناقة
              </span>
            </div>

            <h2
              id="narrative-heading"
              className="h-display mt-6 text-balance text-foreground"
            >
              {narrative.title}
            </h2>

            <div className="mt-10 space-y-6">
              {narrative.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="max-w-prose text-base leading-relaxed text-foreground/85 md:text-lg md:leading-[1.75]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <figure className="mt-12 border-l-2 border-gold/60 pl-6 md:pl-8">
              <blockquote
                cite={typology.name}
                className="font-display italic text-2xl leading-snug text-gold md:text-3xl"
              >
                « {narrative.pullQuote} »
              </blockquote>
            </figure>
          </div>

          {/* Right column — materials palette (5/12) */}
          <aside
            className="lg:col-span-5"
            aria-labelledby="materials-heading"
          >
            <div className="lg:sticky lg:top-28">
              <div className="flex flex-wrap items-center gap-3">
                <span className="gold-rule" aria-hidden />
                <h3
                  id="materials-heading"
                  className="eyebrow text-gold-deep"
                >
                  Matières signatures
                </h3>
                <span
                  className="arabic text-lg text-gold/80"
                  aria-hidden
                >
                  المواد
                </span>
              </div>

              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Une palette pensée pour la typologie, matière par matière,
                jusqu'au dernier reflet de laiton.
              </p>

              <ul className="mt-8 divide-y divide-gold/15 border-y border-gold/15">
                {materials.map((material) => (
                  <li
                    key={material.category}
                    className="flex items-start gap-4 py-5"
                  >
                    <span
                      className="mt-1 inline-block h-5 w-5 flex-shrink-0 rounded-full border border-foreground/10 shadow-sm"
                      style={{ backgroundColor: material.swatch }}
                      aria-hidden
                    />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <span className="eyebrow text-gold-deep">
                          {material.category}
                        </span>
                        <span className="font-display text-lg leading-tight text-foreground">
                          {material.label}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {material.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default NarrativeAndMaterials;

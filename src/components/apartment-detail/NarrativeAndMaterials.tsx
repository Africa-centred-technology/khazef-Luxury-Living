import { useTranslation } from "react-i18next";
import type {
  ApartmentTypology,
  TypologyId,
  TypologyTheme,
} from "@/components/virtual-tour/data/apartment-typologies";

interface NarrativeAndMaterialsProps {
  typology: ApartmentTypology;
}

interface Material {
  label: string;
  category: string;
  description: string;
  swatch: string;
}

type TFn = (key: string, options?: Record<string, unknown>) => string;

const TOUCH_SWATCHES: Record<TypologyId, string> = {
  "harbour-t2": "#c9a961",
  "atlantic-t3": "#c9a961",
  "penthouse-duplex": "#a0843e",
};

function buildMaterials(
  typology: ApartmentTypology,
  t: TFn,
): readonly Material[] {
  const { theme, id } = typology;
  const floorKey = theme.floor as TypologyTheme["floor"];
  const accentKey = theme.accent as TypologyTheme["accent"];

  return [
    {
      category: t("narrative.materials.categories.soil"),
      label: t(`narrative.materials.floors.${floorKey}.label`),
      description: t(`narrative.materials.floors.${floorKey}.description`),
      swatch: theme.floorColor,
    },
    {
      category: t("narrative.materials.categories.walls"),
      label: t(`narrative.materials.wall.${id}.label`),
      description: t(`narrative.materials.wall.${id}.description`),
      swatch: theme.wallInterior,
    },
    {
      category: t("narrative.materials.categories.accent"),
      label: t(`narrative.materials.accents.${accentKey}.label`),
      description: t(`narrative.materials.accents.${accentKey}.description`),
      swatch: theme.accent === "zellige" ? theme.kitchenBase : theme.sofa,
    },
    {
      category: t("narrative.materials.categories.furniture"),
      label: t(`narrative.materials.sofa.${id}.label`),
      description: t(`narrative.materials.sofa.${id}.description`),
      swatch: theme.sofaBack,
    },
    {
      category: t("narrative.materials.categories.touches"),
      label: t(`narrative.materials.touches.${id}.label`),
      description: t(`narrative.materials.touches.${id}.description`),
      swatch: TOUCH_SWATCHES[id],
    },
  ];
}

export function NarrativeAndMaterials({ typology }: NarrativeAndMaterialsProps) {
  const { t } = useTranslation("apartmentDetail");
  const paragraphs = t(`narrative.paragraphs.${typology.id}`, {
    returnObjects: true,
  }) as readonly string[];
  const pullQuote = t(`narrative.pullQuotes.${typology.id}`);
  const title = t(`narrative.titles.${typology.id}`);
  const materials = buildMaterials(typology, t);

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
              <span className="eyebrow text-gold-deep">
                {t("narrative.eyebrow")}
              </span>
              <span
                className="arabic text-xl text-gold/80"
                aria-hidden
              >
                {t("narrative.arabic")}
              </span>
            </div>

            <h2
              id="narrative-heading"
              className="h-display mt-6 text-balance text-foreground"
            >
              {title}
            </h2>

            <div className="mt-10 space-y-6">
              {paragraphs.map((paragraph, index) => (
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
                « {pullQuote} »
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
                  {t("narrative.materials.eyebrow")}
                </h3>
                <span
                  className="arabic text-lg text-gold/80"
                  aria-hidden
                >
                  {t("narrative.materials.arabic")}
                </span>
              </div>

              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {t("narrative.materials.intro")}
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

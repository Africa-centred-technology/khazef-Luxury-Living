import { BellRing, Car, Key } from "lucide-react";

import type { ApartmentTypology } from "@/components/virtual-tour/data/apartment-typologies";

interface SignatureOverviewProps {
  typology: ApartmentTypology;
}

interface FloorParts {
  readonly badge: string;
  readonly caption: string;
}

interface MetricCell {
  readonly label: string;
  readonly value: string;
  readonly caption: string;
}

interface InlineFeature {
  readonly icon: typeof Key;
  readonly label: string;
}

const FALLBACK_FLOOR: FloorParts = {
  badge: "—",
  caption: "Étage",
};

const INLINE_FEATURES: readonly InlineFeature[] = [
  { icon: Key, label: "Livraison clés en main 2026" },
  { icon: Car, label: "Parking privatif" },
  { icon: BellRing, label: "Concierge 7j/7" },
] as const;

/**
 * Parses a floor label such as `"4ᵉ étage · Vue Atlantique"` into a compact
 * badge (`"4ᵉ"`) and a residual caption (`"Vue Atlantique"`). Falls back
 * gracefully when the label does not match the expected shape.
 */
function parseFloorLabel(floor: string): FloorParts {
  if (!floor) {
    return FALLBACK_FLOOR;
  }

  const [rawBadgeCandidate, ...rest] = floor.split(/[·•|–-]/);
  const residualCaption = rest.join(" ").trim();

  const badgeMatch = rawBadgeCandidate.match(/(\d+)\s*([ᵉᵉèe]{0,2}|er)?/i);
  if (!badgeMatch) {
    return {
      badge: rawBadgeCandidate.trim() || FALLBACK_FLOOR.badge,
      caption: residualCaption || "Étage",
    };
  }

  const [, digits, ordinal] = badgeMatch;
  const suffix = ordinal && ordinal.length > 0 ? ordinal : "ᵉ";
  const badge = `${digits}${suffix}`;

  const caption = residualCaption.replace(/^étage\s*/i, "").trim();

  return {
    badge,
    caption: caption.length > 0 ? caption : "Étage",
  };
}

function buildMetrics(typology: ApartmentTypology): readonly MetricCell[] {
  const floorParts = parseFloorLabel(typology.floor);
  const priceValue = typology.priceRange ?? "Sur demande";

  return [
    {
      label: "Surface",
      value: typology.surface,
      caption: "Surface utile",
    },
    {
      label: "Chambres",
      value: String(typology.bedrooms),
      caption: typology.bedrooms > 1 ? "Chambres" : "Chambre",
    },
    {
      label: "Étage",
      value: floorParts.badge,
      caption: floorParts.caption,
    },
    {
      label: "Dès",
      value: priceValue,
      caption: "Prix à partir de",
    },
  ];
}

export function SignatureOverview({ typology }: SignatureOverviewProps) {
  const metrics = buildMetrics(typology);

  return (
    <section
      aria-labelledby="signature-overview-heading"
      className="container-luxe py-20 md:py-28"
    >
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <span className="gold-rule" aria-hidden="true" />
        <span className="eyebrow text-primary/70">Signature</span>
        <span
          className="arabic text-lg md:text-xl text-gold"
          lang="ar"
          dir="rtl"
        >
          صفات مميزة
        </span>
      </div>

      <div className="mt-8 grid gap-10 md:grid-cols-12 md:gap-12">
        <h2
          id="signature-overview-heading"
          className="h-display text-primary max-w-3xl md:col-span-7"
        >
          Taillé pour l&rsquo;art de vivre marocain contemporain.
        </h2>

        <p className="text-muted-foreground leading-relaxed md:col-span-5 md:pt-3">
          {`${typology.surface} de surface utile, ${typology.bedrooms} ${
            typology.bedrooms > 1 ? "chambres" : "chambre"
          }, ${typology.floor.toLowerCase()}. Une composition pensée pour la lumière, la matière et les usages quotidiens — sans compromis sur la générosité des volumes.`}
        </p>
      </div>

      <dl className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 md:mt-20 md:grid-cols-4 md:gap-8">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="relative flex flex-col gap-3 border-t border-gold/40 pt-6"
          >
            <dt className="eyebrow text-muted-foreground/80">{metric.label}</dt>
            <dd className="font-display text-4xl md:text-5xl font-light leading-none text-primary tracking-tight">
              {metric.value}
            </dd>
            <span className="text-sm text-muted-foreground">
              {metric.caption}
            </span>
          </div>
        ))}
      </dl>

      <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-border/60 pt-8">
        {INLINE_FEATURES.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-3 text-sm text-primary/85"
          >
            <Icon
              className="h-4 w-4 text-gold"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

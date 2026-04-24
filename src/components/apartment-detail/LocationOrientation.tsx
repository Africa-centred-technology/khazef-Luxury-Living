import { Anchor, Landmark, Mountain, Waves } from "lucide-react";

import type {
  ApartmentTypology,
  TypologyId,
} from "@/components/virtual-tour/data/apartment-typologies";

interface LocationOrientationProps {
  typology: ApartmentTypology;
}

interface NearbyPoint {
  readonly icon: typeof Anchor;
  readonly label: string;
  readonly duration: string;
  readonly arabic: string;
}

interface OrientationConfig {
  /** Degrees clockwise from North (0 = N, 90 = E, 180 = S, 270 = W). */
  readonly arrowAngle: number;
  readonly directionLabel: string;
  readonly primaryView: string;
  readonly secondaryView: string;
  readonly light: string;
  readonly outdoor: string;
  readonly goldenHour: string;
}

const LANDMARKS: readonly NearbyPoint[] = [
  { icon: Anchor, label: "Port de Safi", duration: "3 min à pied", arabic: "الميناء" },
  { icon: Landmark, label: "Médina historique", duration: "7 min à pied", arabic: "المدينة" },
  { icon: Waves, label: "Plage municipale", duration: "2 min à pied", arabic: "الشاطئ" },
  { icon: Mountain, label: "Colline minérale", duration: "10 min à pied", arabic: "الهضبة" },
] as const;

/**
 * Orientation per typology. Angles measured clockwise from North in degrees.
 * - harbour-t2 → NE (45°) toward the port
 * - atlantic-t3 → W (270°) facing the Atlantic
 * - penthouse-duplex → SW (225°) panoramic W + S
 */
const ORIENTATION_BY_TYPOLOGY: Record<TypologyId, OrientationConfig> = {
  "harbour-t2": {
    arrowAngle: 45,
    directionLabel: "Nord-Est",
    primaryView: "Port de Safi, môle et barques",
    secondaryView: "Cour intérieure plantée",
    light: "Lumière du matin, traversante est-ouest",
    outdoor: "Loggia traversante, 4 m²",
    goldenHour:
      "Au lever, le soleil dore les quais et la lumière entre latéralement jusqu'au séjour. L'appartement retrouve une douceur dorée vers 18 h, quand le port s'apaise.",
  },
  "atlantic-t3": {
    arrowAngle: 270,
    directionLabel: "Ouest",
    primaryView: "Atlantique, ligne d'horizon océanique",
    secondaryView: "Jardin clos et patio zellige",
    light: "Double orientation, lumière traversante mer-jardin",
    outdoor: "Balcon filant côté océan, 6 m²",
    goldenHour:
      "L'appartement s'allume vers 17 h, heure d'or sur le plateau atlantique. La façade ouest capte la dernière lumière avant que l'océan ne bascule dans le bleu profond.",
  },
  "penthouse-duplex": {
    arrowAngle: 225,
    directionLabel: "Sud-Ouest, panoramique",
    primaryView: "Atlantique + médina, panorama 180°",
    secondaryView: "Ciel de Safi, terrasse plein sud",
    light: "Nord-sud, toiture haute, lumière toute la journée",
    outdoor: "Terrasse panoramique, 34 m²",
    goldenHour:
      "Au dernier étage, le crépuscule dure plus longtemps. De 17 h à 19 h, la terrasse devient une scène ouverte sur l'Atlantique et les toits de la médina, braises orange contre tadelakt.",
  },
} as const;

interface WindowRow {
  readonly label: string;
  readonly value: string;
}

function buildWindowRows(config: OrientationConfig): readonly WindowRow[] {
  return [
    { label: "Vue principale", value: config.primaryView },
    { label: "Vue secondaire", value: config.secondaryView },
    { label: "Lumière", value: config.light },
    { label: "Extérieur privatif", value: config.outdoor },
  ];
}

interface CompassRoseProps {
  angle: number;
  directionLabel: string;
}

/** Hand-rolled compass rose SVG. Arrow rotates by `angle` degrees clockwise. */
function CompassRose({ angle, directionLabel }: CompassRoseProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <svg
        width={180}
        height={180}
        viewBox="0 0 180 180"
        role="img"
        aria-label={`Orientation principale de l'appartement : ${directionLabel}`}
        className="text-primary"
      >
        {/* Outer ring */}
        <circle
          cx={90}
          cy={90}
          r={82}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.25}
          strokeWidth={1}
        />
        {/* Inner ring */}
        <circle
          cx={90}
          cy={90}
          r={64}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.15}
          strokeWidth={1}
        />
        {/* Cardinal tick marks */}
        {[0, 90, 180, 270].map((tick) => (
          <line
            key={tick}
            x1={90}
            y1={8}
            x2={90}
            y2={18}
            stroke="currentColor"
            strokeOpacity={0.4}
            strokeWidth={1.2}
            transform={`rotate(${tick} 90 90)`}
          />
        ))}
        {/* Cardinal labels */}
        <text
          x={90}
          y={24}
          textAnchor="middle"
          className="fill-current font-display"
          fontSize={14}
          fontStyle="italic"
        >
          N
        </text>
        <text
          x={166}
          y={95}
          textAnchor="middle"
          className="fill-current font-display"
          fontSize={14}
          fontStyle="italic"
        >
          E
        </text>
        <text
          x={90}
          y={168}
          textAnchor="middle"
          className="fill-current font-display"
          fontSize={14}
          fontStyle="italic"
        >
          S
        </text>
        <text
          x={14}
          y={95}
          textAnchor="middle"
          className="fill-current font-display"
          fontSize={14}
          fontStyle="italic"
        >
          O
        </text>

        {/* Arrow — rotated by the typology angle (clockwise from North) */}
        <g transform={`rotate(${angle} 90 90)`}>
          {/* Gold shaft */}
          <line
            x1={90}
            y1={90}
            x2={90}
            y2={26}
            stroke="hsl(var(--gold))"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
          {/* Arrow head (triangle) */}
          <polygon
            points="90,16 82,34 98,34"
            fill="hsl(var(--gold))"
          />
          {/* Tail dot */}
          <circle cx={90} cy={90} r={5} fill="hsl(var(--gold))" />
        </g>

        {/* Center hub */}
        <circle
          cx={90}
          cy={90}
          r={2}
          fill="hsl(var(--primary))"
        />
      </svg>
      <span className="eyebrow text-primary/70">{directionLabel}</span>
    </div>
  );
}

export function LocationOrientation({ typology }: LocationOrientationProps) {
  const orientation = ORIENTATION_BY_TYPOLOGY[typology.id];
  const windowRows = buildWindowRows(orientation);

  return (
    <section
      aria-labelledby="location-orientation-heading"
      className="bg-secondary/40 py-20 md:py-28"
    >
      <div className="container-luxe">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <span className="gold-rule" aria-hidden="true" />
          <span className="eyebrow text-primary/70">Adresse &amp; orientation</span>
          <span
            className="arabic text-lg md:text-xl text-gold"
            lang="ar"
            dir="rtl"
          >
            الموقع
          </span>
        </div>

        <h2
          id="location-orientation-heading"
          className="mt-6 h-display text-primary max-w-3xl"
        >
          Au c&oelig;ur de Safi, face à l&rsquo;Atlantique.
        </h2>

        <div className="mt-12 grid gap-10 items-start lg:grid-cols-2">
          {/* LEFT — Map + nearby landmarks */}
          <div className="flex flex-col gap-6">
            <div className="overflow-hidden border border-border/60 bg-primary/5">
              <iframe
                src="https://www.google.com/maps?q=Safi%2C%20Morocco&z=14&output=embed"
                className="w-full h-[420px] border-0"
                loading="lazy"
                title="Plan d'accès à la résidence Luxury Living à Safi"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <dl className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              {LANDMARKS.map(({ icon: Icon, label, duration, arabic }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 border-t border-gold/40 pt-5"
                >
                  <span
                    className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-background/70"
                    aria-hidden="true"
                  >
                    <Icon
                      className="h-4 w-4 text-gold"
                      strokeWidth={1.5}
                    />
                  </span>
                  <div className="flex flex-col gap-1">
                    <dt className="font-display text-lg text-primary leading-tight">
                      {label}
                    </dt>
                    <dd className="text-sm text-muted-foreground">
                      {duration}
                    </dd>
                    <span
                      className="arabic text-sm text-gold/80"
                      lang="ar"
                      dir="rtl"
                    >
                      {arabic}
                    </span>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          {/* RIGHT — Orientation, views, golden hour */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <h3 className="font-display text-2xl text-primary">
                Orientation de l&rsquo;appartement
              </h3>

              <div className="flex flex-col items-center gap-6 border border-border/60 bg-background/60 p-8 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
                <CompassRose
                  angle={orientation.arrowAngle}
                  directionLabel={orientation.directionLabel}
                />
                <div className="flex-1 text-sm text-muted-foreground leading-relaxed">
                  <p className="font-display text-base text-primary">
                    {typology.name} — {typology.surface}
                  </p>
                  <p className="mt-2">
                    L&rsquo;appartement s&rsquo;oriente principalement vers le{" "}
                    <span className="text-primary">
                      {orientation.directionLabel.toLowerCase()}
                    </span>
                    , capturant la lumière et le paysage qui font la signature
                    de cet étage.
                  </p>
                </div>
              </div>
            </div>

            <dl className="divide-y divide-border/60 border-y border-border/60">
              {windowRows.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[10rem_1fr] gap-6 py-4 sm:grid-cols-[12rem_1fr]"
                >
                  <dt className="eyebrow text-muted-foreground/80">
                    {row.label}
                  </dt>
                  <dd className="text-primary/90 leading-relaxed">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Golden hour card */}
            <aside className="border border-gold/40 bg-background/70 p-8">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="gold-rule" aria-hidden="true" />
                <span className="eyebrow text-primary/70">L&rsquo;heure d&rsquo;or</span>
                <span
                  className="arabic text-base text-gold"
                  lang="ar"
                  dir="rtl"
                >
                  الساعة الذهبية
                </span>
              </div>
              <p className="mt-5 font-display text-xl text-primary leading-snug">
                Quand la lumière s&rsquo;installe.
              </p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {orientation.goldenHour}
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

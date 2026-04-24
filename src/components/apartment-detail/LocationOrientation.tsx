import { Anchor, Landmark, Mountain, Waves } from "lucide-react";
import { useTranslation } from "react-i18next";

import type {
  ApartmentTypology,
  TypologyId,
} from "@/components/virtual-tour/data/apartment-typologies";

interface LocationOrientationProps {
  typology: ApartmentTypology;
}

interface NearbyPoint {
  readonly label: string;
  readonly duration: string;
  readonly arabic: string;
}

type TFn = (key: string, options?: Record<string, unknown>) => string;

const LANDMARK_ICONS = [Anchor, Landmark, Waves, Mountain] as const;

/**
 * Orientation angle per typology, measured clockwise from North in degrees.
 * - harbour-t2 → NE (45°) toward the port
 * - atlantic-t3 → W (270°) facing the Atlantic
 * - penthouse-duplex → SW (225°) panoramic W + S
 */
const ARROW_ANGLE_BY_TYPOLOGY: Record<TypologyId, number> = {
  "harbour-t2": 45,
  "atlantic-t3": 270,
  "penthouse-duplex": 225,
};

interface WindowRow {
  readonly label: string;
  readonly value: string;
}

function buildWindowRows(typologyId: TypologyId, t: TFn): readonly WindowRow[] {
  return [
    {
      label: t("location.rows.primaryView"),
      value: t(`location.typologies.${typologyId}.primaryView`),
    },
    {
      label: t("location.rows.secondaryView"),
      value: t(`location.typologies.${typologyId}.secondaryView`),
    },
    {
      label: t("location.rows.light"),
      value: t(`location.typologies.${typologyId}.light`),
    },
    {
      label: t("location.rows.outdoor"),
      value: t(`location.typologies.${typologyId}.outdoor`),
    },
  ];
}

interface CompassRoseProps {
  angle: number;
  directionLabel: string;
  ariaLabel: string;
}

/** Hand-rolled compass rose SVG. Arrow rotates by `angle` degrees clockwise. */
function CompassRose({ angle, directionLabel, ariaLabel }: CompassRoseProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <svg
        width={180}
        height={180}
        viewBox="0 0 180 180"
        role="img"
        aria-label={ariaLabel}
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
  const { t } = useTranslation("apartmentDetail");
  const arrowAngle = ARROW_ANGLE_BY_TYPOLOGY[typology.id];
  const directionLabel = t(`location.typologies.${typology.id}.directionLabel`);
  const goldenHour = t(`location.typologies.${typology.id}.goldenHour`);
  const windowRows = buildWindowRows(typology.id, t);
  const landmarks = t("location.landmarks", {
    returnObjects: true,
  }) as readonly NearbyPoint[];

  return (
    <section
      aria-labelledby="location-orientation-heading"
      className="bg-secondary/40 py-20 md:py-28"
    >
      <div className="container-luxe">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <span className="gold-rule" aria-hidden="true" />
          <span className="eyebrow text-primary/70">
            {t("location.eyebrow")}
          </span>
          <span
            className="arabic text-lg md:text-xl text-gold"
            lang="ar"
            dir="rtl"
          >
            {t("location.arabic")}
          </span>
        </div>

        <h2
          id="location-orientation-heading"
          className="mt-6 h-display text-primary max-w-3xl"
        >
          {t("location.title")}
        </h2>

        <div className="mt-12 grid gap-10 items-start lg:grid-cols-2">
          {/* LEFT — Map + nearby landmarks */}
          <div className="flex flex-col gap-6">
            <div className="overflow-hidden border border-border/60 bg-primary/5">
              <iframe
                src="https://www.google.com/maps?q=Safi%2C%20Morocco&z=14&output=embed"
                className="w-full h-[420px] border-0"
                loading="lazy"
                title={t("location.mapTitle")}
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <dl className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              {landmarks.map((landmark, index) => {
                const Icon = LANDMARK_ICONS[index] ?? Anchor;
                return (
                  <div
                    key={landmark.label}
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
                        {landmark.label}
                      </dt>
                      <dd className="text-sm text-muted-foreground">
                        {landmark.duration}
                      </dd>
                      <span
                        className="arabic text-sm text-gold/80"
                        lang="ar"
                        dir="rtl"
                      >
                        {landmark.arabic}
                      </span>
                    </div>
                  </div>
                );
              })}
            </dl>
          </div>

          {/* RIGHT — Orientation, views, golden hour */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <h3 className="font-display text-2xl text-primary">
                {t("location.orientationHeading")}
              </h3>

              <div className="flex flex-col items-center gap-6 border border-border/60 bg-background/60 p-8 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
                <CompassRose
                  angle={arrowAngle}
                  directionLabel={directionLabel}
                  ariaLabel={t("location.compassAria", {
                    direction: directionLabel,
                  })}
                />
                <div className="flex-1 text-sm text-muted-foreground leading-relaxed">
                  <p className="font-display text-base text-primary">
                    {typology.name} — {typology.surface}
                  </p>
                  <p className="mt-2">
                    {t("location.orientationSentence", {
                      direction: directionLabel.toLowerCase(),
                    })}
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
                <span className="eyebrow text-primary/70">
                  {t("location.goldenHourEyebrow")}
                </span>
                <span
                  className="arabic text-base text-gold"
                  lang="ar"
                  dir="rtl"
                >
                  {t("location.goldenHourArabic")}
                </span>
              </div>
              <p className="mt-5 font-display text-xl text-primary leading-snug">
                {t("location.goldenHourTitle")}
              </p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {goldenHour}
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

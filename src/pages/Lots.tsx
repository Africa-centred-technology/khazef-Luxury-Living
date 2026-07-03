import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Maximize2, Phone, MessageCircle, Calculator, X, Scale, Star } from "lucide-react";
import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { LotsMap, LotsLegend } from "@/components/lots/LotsMap";
import { LotComparator, MAX_COMPARE } from "@/components/lots/LotComparator";
import { ReservationDialog } from "@/components/lots/ReservationDialog";
import { BrochureDialog } from "@/components/brochure/BrochureDialog";
import { RENDERS } from "@/data/renders";
import { STATUT_META, type Lot, type StatutLot } from "@/data/lots";
import { useLots } from "@/hooks/useLots";
import { PROJET, PRIX, formatDH, whatsappLien } from "@/data/villas-ahlam";

type FiltreStatut = StatutLot | "tous";
type FiltreIlot = "A" | "B" | "tous";

const Lots = () => {
  const [statut, setStatut] = useState<FiltreStatut>("tous");
  const [ilot, setIlot] = useState<FiltreIlot>("tous");
  const [surfaceMax, setSurfaceMax] = useState<number>(PROJET.surfaceMax);
  const budgetMin = PROJET.surfaceMin * PRIX.prixM2;
  const budgetMax = PROJET.surfaceMax * PRIX.prixM2;
  const [budget, setBudget] = useState<number>(budgetMax);
  const [selected, setSelected] = useState<Lot | null>(null);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [compare, setCompare] = useState<number[]>([]);

  const { lots, isLoading, isFallback } = useLots();

  const toggleCompare = (numero: number) => {
    setCompare((prev) =>
      prev.includes(numero)
        ? prev.filter((n) => n !== numero)
        : prev.length >= MAX_COMPARE
          ? prev
          : [...prev, numero],
    );
  };

  const visibleNumeros = useMemo(() => {
    const set = new Set<number>();
    for (const lot of lots) {
      if (statut !== "tous" && lot.statut !== statut) continue;
      if (ilot !== "tous" && lot.ilot !== ilot) continue;
      if (lot.surfaceM2 > surfaceMax) continue;
      if (lot.prixIndicatif > budget) continue;
      set.add(lot.numero);
    }
    return set;
  }, [lots, statut, ilot, surfaceMax, budget]);

  const disponibles = lots.filter((l) => l.statut === "disponible").length;

  // Données structurées Schema.org : ItemList des 42 lots (CDC §10).
  const lotsJsonLd = useMemo(() => {
    if (lots.length === 0) return undefined;
    const availability = (s: StatutLot) =>
      s === "vendu"
        ? "https://schema.org/SoldOut"
        : s === "en_cours"
          ? "https://schema.org/LimitedAvailability"
          : "https://schema.org/InStock";
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `Les ${PROJET.nombreLots} lots — ${PROJET.nom}`,
      numberOfItems: lots.length,
      itemListElement: lots.map((lot, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Offer",
          name: `Lot ${lot.numero} — ${lot.surfaceM2} m² (îlot ${lot.ilot})`,
          price: lot.prixIndicatif,
          priceCurrency: "MAD",
          availability: availability(lot.statut),
          itemOffered: {
            "@type": "Residence",
            name: `Lot ${lot.numero} — villa ${lot.hauteur}`,
            floorSize: { "@type": "QuantitativeValue", value: lot.surfaceM2, unitCode: "MTK" },
          },
        },
      })),
    };
  }, [lots]);

  // Version "live" du lot selectionne : reflete les MAJ de statut issues du polling.
  const selectedLive = selected
    ? lots.find((l) => l.numero === selected.numero) ?? selected
    : null;

  return (
    <>
      <Seo
        title="Plan & Disponibilités — les 42 lots"
        description="Carte interactive des 42 lots de villas R+1 du domaine Les Villas Ahlam à Bouskoura. Statut en temps réel, surface, prix indicatif et réservation en ligne."
        jsonLd={lotsJsonLd}
      />
      <PageHeader
        eyebrow="Plan & Disponibilités"
        title="Choisissez"
        italicWord="votre lot"
        arabic="أحلام"
        intro={`${PROJET.nombreLots} lots viabilisés, de ${PROJET.surfaceMin} à ${PROJET.surfaceMax} m², ${PRIX.accroche.toLowerCase()}. Survolez le plan, cliquez sur un lot disponible et réservez en ligne — un conseiller vous rappelle.`}
      />

      <div className="container-luxe py-16 md:py-24">
        {/* Compteur de rareté — CDC §7.3 */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="gold-rule" />
            <span className="eyebrow text-gold">Disponibilités en temps réel</span>
          </div>
          <BrochureDialog />
          <p className="text-sm font-medium text-primary">
            {isLoading ? (
              <span className="text-muted-foreground">Chargement des disponibilités…</span>
            ) : (
              <>
                Plus que <span className="text-gold">{disponibles}</span> lots disponibles
              </>
            )}
          </p>
        </div>

        {isFallback && (
          <div className="mb-6 rounded-sm border border-gold/40 bg-gold/5 px-4 py-3 text-sm text-muted-foreground">
            Disponibilités affichées en mode hors-ligne — la mise à jour en temps réel
            est momentanément indisponible. La réservation reste possible via WhatsApp.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          {/* Carte + filtres */}
          <div>
            {/* Filtres — CDC §7.3 */}
            <div className="mb-6 flex flex-wrap items-end gap-4 rounded-sm border border-border/60 bg-secondary/30 p-4">
              <FilterGroup label="Statut">
                {(["tous", "disponible", "en_cours", "vendu"] as FiltreStatut[]).map((s) => (
                  <Chip key={s} active={statut === s} onClick={() => setStatut(s)}>
                    {s === "tous" ? "Tous" : STATUT_META[s as StatutLot].label}
                  </Chip>
                ))}
              </FilterGroup>

              <FilterGroup label="Îlot">
                {(["tous", "A", "B"] as FiltreIlot[]).map((i) => (
                  <Chip key={i} active={ilot === i} onClick={() => setIlot(i)}>
                    {i === "tous" ? "Tous" : `Îlot ${i}`}
                  </Chip>
                ))}
              </FilterGroup>

              <FilterGroup label={`Surface ≤ ${surfaceMax} m²`}>
                <input
                  type="range"
                  min={PROJET.surfaceMin}
                  max={PROJET.surfaceMax}
                  step={1}
                  value={surfaceMax}
                  onChange={(e) => setSurfaceMax(Number(e.target.value))}
                  className="w-44 accent-[hsl(var(--primary))]"
                  aria-label="Surface maximale"
                />
              </FilterGroup>

              <FilterGroup label={`Budget ≤ ${formatDH(budget)}`}>
                <input
                  type="range"
                  min={budgetMin}
                  max={budgetMax}
                  step={4500}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-44 accent-[hsl(var(--primary))]"
                  aria-label="Budget indicatif maximal"
                />
              </FilterGroup>
            </div>

            <LotsMap
              lots={lots}
              selectedNumero={selectedLive?.numero ?? null}
              onSelectLot={(lot) => setSelected(lot)}
              visibleNumeros={visibleNumeros}
            />

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <LotsLegend />
              <p className="text-xs text-muted-foreground">
                Plan réel de l'architecte du lotissement (TF 23025/63).
              </p>
            </div>
          </div>

          {/* Panneau de détail — CDC §7.3 */}
          <aside className="lg:sticky lg:top-32 h-fit">
            {selectedLive ? (
              <LotDetail
                lot={selectedLive}
                onClose={() => setSelected(null)}
                onReserve={() => setReserveOpen(true)}
                inCompare={compare.includes(selectedLive.numero)}
                compareDisabled={
                  !compare.includes(selectedLive.numero) && compare.length >= MAX_COMPARE
                }
                onToggleCompare={() => toggleCompare(selectedLive.numero)}
              />
            ) : (
              <div className="rounded-sm border border-dashed border-border/70 bg-secondary/20 p-8 text-center">
                <Maximize2 className="mx-auto mb-3 h-6 w-6 text-gold" />
                <p className="font-display text-xl text-primary">Sélectionnez un lot</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Cliquez sur un lot disponible du plan pour voir sa surface, son prix
                  indicatif et le réserver.
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>

      <ReservationDialog lot={selectedLive} open={reserveOpen} onOpenChange={setReserveOpen} />

      <LotComparator
        lots={lots}
        compareNumeros={compare}
        onRemove={toggleCompare}
        onClear={() => setCompare([])}
      />
    </>
  );
};

function LotDetail({
  lot,
  onClose,
  onReserve,
  inCompare,
  compareDisabled,
  onToggleCompare,
}: {
  lot: Lot;
  onClose: () => void;
  onReserve: () => void;
  inCompare: boolean;
  compareDisabled: boolean;
  onToggleCompare: () => void;
}) {
  const meta = STATUT_META[lot.statut];
  const waMessage = `Bonjour, je suis intéressé(e) par le LOT ${lot.numero} (${lot.surfaceM2} m², îlot ${lot.ilot}) du projet ${PROJET.nom}. Pouvez-vous me donner plus d'informations ?`;

  return (
    <div className="relative rounded-sm border border-border/60 bg-background shadow-luxe-md">
      <button
        onClick={onClose}
        aria-label="Fermer"
        className="absolute right-3 top-3 p-1.5 text-muted-foreground hover:text-primary transition-colors"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="border-b border-border/60 bg-gradient-night p-6 text-background">
        <div className="eyebrow text-gold">Lot {lot.numero} · Îlot {lot.ilot}</div>
        <div className="mt-1 font-display text-4xl">{lot.surfaceM2} m²</div>
        <div className="mt-1 text-sm opacity-90">Villa {lot.hauteur} · lot viabilisé</div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span
            className="inline-block rounded-full px-3 py-1 text-xs font-medium text-background"
            style={{ backgroundColor: `hsl(${meta.colorVar})` }}
          >
            {meta.label}
          </span>
          {lot.highlight && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gold/90 px-3 py-1 text-xs font-medium text-primary">
              <Star className="h-3 w-3 fill-current" /> Populaire
            </span>
          )}
        </div>
      </div>

      <div className="p-6 space-y-5">
        <div>
          <div className="eyebrow text-muted-foreground">Prix indicatif</div>
          <div className="font-display text-2xl text-primary">
            À partir de {formatDH(lot.prixIndicatif)}
          </div>
          <p className="text-xs text-muted-foreground">
            {lot.surfaceM2} m² × {PRIX.prixM2.toLocaleString("fr-FR")} DH/m² · prix exact
            sur demande.
          </p>
        </div>

        {/* "Imaginez votre villa" — CDC §8.6 */}
        <div className="overflow-hidden rounded-sm border border-border/60 bg-secondary/40">
          <img
            src={RENDERS.villaDay}
            alt="Villa R+1 contemporaine — rendu illustratif"
            className="aspect-[4/3] w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="p-4">
            <div className="eyebrow text-gold mb-1">Imaginez votre villa</div>
            <p className="text-sm text-muted-foreground">
              Une villa R+1 contemporaine sur ce lot. Rendu illustratif ; surface
              constructible et règles précisées par votre conseiller.
            </p>
          </div>
        </div>

        {meta.cliquable ? (
          <div className="space-y-3">
            <Button
              onClick={onReserve}
              size="lg"
              className="w-full bg-gradient-gold-bright text-primary"
            >
              Réserver ce lot
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button asChild variant="outline" size="sm">
                <a href={whatsappLien(waMessage)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href="tel:+212661228619">
                  <Phone className="h-4 w-4" /> Être rappelé
                </a>
              </Button>
            </div>
            <Link
              to={`/financement?prix=${lot.prixIndicatif}`}
              className="flex items-center justify-center gap-2 rounded-sm border border-border/60 py-2.5 text-sm text-primary transition-colors hover:border-primary"
            >
              <Calculator className="h-4 w-4 text-gold" /> Simuler mon financement
            </Link>
          </div>
        ) : (
          <p className="rounded-sm bg-secondary/50 p-4 text-center text-sm text-muted-foreground">
            Ce lot est vendu. Contactez-nous pour rejoindre la liste d'attente.
          </p>
        )}

        <button
          type="button"
          onClick={onToggleCompare}
          disabled={compareDisabled}
          className={`flex w-full items-center justify-center gap-2 rounded-sm border py-2.5 text-sm transition-colors ${
            inCompare
              ? "border-primary bg-secondary/50 text-primary"
              : "border-border/60 text-primary hover:border-primary disabled:cursor-not-allowed disabled:opacity-50"
          }`}
        >
          <Scale className="h-4 w-4 text-gold" />
          {inCompare ? "Retirer de la comparaison" : "Ajouter au comparateur"}
        </button>

        <a
          href="#"
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary"
        >
          <MapPin className="h-3.5 w-3.5 text-gold" /> Situé dans l'îlot {lot.ilot} du domaine
        </a>
      </div>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-muted-foreground hover:border-primary hover:text-primary"
      }`}
    >
      {children}
    </button>
  );
}

export default Lots;

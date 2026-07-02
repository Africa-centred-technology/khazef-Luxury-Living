import { useEffect, useState } from "react";
import { Calculator, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { simulerCredit, type SimulationResult } from "@/lib/api";
import { formatDH, PRIX, PROJET } from "@/data/villas-ahlam";

/**
 * Simulateur de credit immobilier — CDC §8.5.
 *
 * Les entrees (prix, apport, duree, taux) sont envoyees a l'API Django
 * (debounce 350 ms) qui renvoie la mensualite : la formule d'amortissement
 * reste cote backend (source unique de verite, pas de duplication).
 *
 * `prixInitial` permet de pre-remplir avec le prix indicatif d'un lot.
 */
interface CreditSimulatorProps {
  prixInitial?: number;
}

const DUREES = [10, 15, 20, 25] as const;
const PRIX_DEFAUT = PROJET.surfaceMin * PRIX.prixM2; // ex. 200 m2 x 4 500 = 900 000 DH

export function CreditSimulator({ prixInitial }: CreditSimulatorProps) {
  const [prix, setPrix] = useState<number>(prixInitial ?? PRIX_DEFAUT);
  const [apport, setApport] = useState<number>(Math.round((prixInitial ?? PRIX_DEFAUT) * 0.2));
  const [duree, setDuree] = useState<number>(20);
  const [taux, setTaux] = useState<number>(5);

  const [result, setResult] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    let annule = false;
    setLoading(true);
    setErreur(null);
    const timer = setTimeout(async () => {
      try {
        const res = await simulerCredit({
          prix,
          apport,
          duree_annees: duree,
          taux_annuel: taux,
        });
        if (!annule) setResult(res);
      } catch {
        if (!annule) {
          setErreur("Simulateur momentanément indisponible.");
          setResult(null);
        }
      } finally {
        if (!annule) setLoading(false);
      }
    }, 350);

    return () => {
      annule = true;
      clearTimeout(timer);
    };
  }, [prix, apport, duree, taux]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      {/* Entrees */}
      <div className="space-y-7 rounded-sm border border-border/60 bg-secondary/20 p-6 md:p-8">
        <div className="flex items-center gap-3">
          <Calculator className="h-5 w-5 text-gold" />
          <h3 className="font-display text-2xl text-primary">Estimez votre mensualité</h3>
        </div>

        <SliderField
          label="Prix du bien"
          value={prix}
          min={PROJET.surfaceMin * PRIX.prixM2}
          max={PROJET.surfaceMax * PRIX.prixM2}
          step={10000}
          format={formatDH}
          onChange={(v) => {
            setPrix(v);
            if (apport > v) setApport(v);
          }}
        />
        <SliderField
          label="Apport personnel"
          value={apport}
          min={0}
          max={prix}
          step={10000}
          format={formatDH}
          onChange={setApport}
        />

        <div>
          <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
            Durée du crédit
          </div>
          <div className="grid grid-cols-4 gap-2">
            {DUREES.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDuree(d)}
                className={`rounded-sm border px-3 py-2 text-sm transition-colors ${
                  duree === d
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-primary"
                }`}
              >
                {d} ans
              </button>
            ))}
          </div>
        </div>

        <SliderField
          label="Taux annuel"
          value={taux}
          min={3}
          max={8}
          step={0.1}
          format={(v) => `${v.toFixed(1)} %`}
          onChange={setTaux}
        />

        <p className="text-xs text-muted-foreground">
          Estimation indicative hors assurance et frais de dossier. Le taux réel dépend
          de votre profil et de la banque.
        </p>
      </div>

      {/* Resultat */}
      <aside className="h-fit rounded-sm bg-gradient-night p-6 text-background lg:sticky lg:top-32">
        <div className="eyebrow text-gold">Mensualité estimée</div>
        <div className="mt-2 flex items-end gap-2">
          {loading ? (
            <Loader2 className="my-3 h-7 w-7 animate-spin text-gold" />
          ) : (
            <span className="font-display text-4xl md:text-5xl">
              {result ? formatDH(Math.round(result.mensualite)) : "—"}
            </span>
          )}
          <span className="pb-2 text-sm opacity-80">/ mois</span>
        </div>

        {erreur && <p className="mt-2 text-xs text-gold">{erreur}</p>}

        {result && (
          <dl className="mt-6 space-y-3 text-sm">
            <Ligne label="Capital emprunté" value={formatDH(Math.round(result.capital_emprunte))} />
            <Ligne label="Durée" value={`${result.duree_mois} mois`} />
            <Ligne label="Coût total du crédit" value={formatDH(Math.round(result.cout_total_credit))} />
            <Ligne label="Dont intérêts" value={formatDH(Math.round(result.cout_interets))} />
          </dl>
        )}

        <Button asChild size="lg" className="mt-7 w-full bg-gradient-gold-bright text-primary">
          <a href="#rappel-financement">Être rappelé pour mon financement</a>
        </Button>
      </aside>
    </div>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="font-display text-lg text-primary">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[hsl(var(--primary))]"
        aria-label={label}
      />
    </div>
  );
}

function Ligne({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-background/15 pb-2">
      <dt className="opacity-75">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}

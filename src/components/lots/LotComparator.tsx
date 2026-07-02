import { useState } from "react";
import { Scale, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { type Lot, STATUT_META } from "@/data/lots";
import { PRIX, PROJET, formatDH, whatsappLien } from "@/data/villas-ahlam";

interface LotComparatorProps {
  lots: Lot[];
  /** Numéros sélectionnés pour comparaison (max 3). */
  compareNumeros: number[];
  onRemove: (numero: number) => void;
  onClear: () => void;
}

/** Nombre maximum de lots comparables — CDC §8 (#10). */
export const MAX_COMPARE = 3;

/**
 * Comparateur de lots (jusqu'à 3) — CDC §8 Tier 2 (#10).
 * Barre flottante récapitulant la sélection + tableau comparatif
 * (surface, prix indicatif, prix/m², orientation/îlot, statut).
 */
export function LotComparator({ lots, compareNumeros, onRemove, onClear }: LotComparatorProps) {
  const [open, setOpen] = useState(false);
  const selected = compareNumeros
    .map((n) => lots.find((l) => l.numero === n))
    .filter((l): l is Lot => Boolean(l));

  if (selected.length === 0) return null;

  return (
    <>
      {/* Barre de comparaison flottante */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 shadow-luxe-md backdrop-blur">
        <div className="container-luxe flex flex-wrap items-center gap-3 py-3">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
            <Scale className="h-4 w-4 text-gold" />
            Comparer
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {selected.map((lot) => (
              <span
                key={lot.numero}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/40 py-1 pl-3 pr-1 text-xs text-primary"
              >
                Lot {lot.numero} · {lot.surfaceM2} m²
                <button
                  type="button"
                  onClick={() => onRemove(lot.numero)}
                  aria-label={`Retirer le lot ${lot.numero} de la comparaison`}
                  className="rounded-full p-0.5 text-muted-foreground transition-colors hover:text-primary"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={onClear}
              className="text-xs text-muted-foreground underline-offset-2 hover:text-primary hover:underline"
            >
              Tout effacer
            </button>
            <Button
              size="sm"
              className="bg-gradient-gold-bright text-primary"
              disabled={selected.length < 2}
              onClick={() => setOpen(true)}
            >
              Comparer ({selected.length})
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-primary">
              Comparaison des lots
            </DialogTitle>
            <DialogDescription>
              Surface, prix indicatif et disponibilité — prix exact sur demande.
            </DialogDescription>
          </DialogHeader>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="p-3 text-left text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Critère
                  </th>
                  {selected.map((lot) => (
                    <th key={lot.numero} className="p-3 text-left font-display text-lg text-primary">
                      Lot {lot.numero}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                <Row label="Îlot" values={selected.map((l) => `Îlot ${l.ilot}`)} />
                <Row label="Surface" values={selected.map((l) => `${l.surfaceM2} m²`)} />
                <Row label="Hauteur" values={selected.map((l) => l.hauteur)} />
                <Row
                  label="Prix indicatif"
                  values={selected.map((l) => `À partir de ${formatDH(l.prixIndicatif)}`)}
                  highlight
                />
                <Row
                  label="Prix au m²"
                  values={selected.map(() => `${PRIX.prixM2.toLocaleString("fr-FR")} DH/m²`)}
                />
                <Row
                  label="Statut"
                  values={selected.map((l) => STATUT_META[l.statut].label)}
                />
              </tbody>
            </table>
          </div>

          <div className="mt-2 flex flex-wrap justify-end gap-3">
            <Button asChild variant="outline" size="sm">
              <a
                href={whatsappLien(
                  `Bonjour, je compare les lots ${selected
                    .map((l) => l.numero)
                    .join(", ")} du projet ${PROJET.nom}. Pouvez-vous m'aider à choisir ?`,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Être conseillé sur WhatsApp
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Row({
  label,
  values,
  highlight = false,
}: {
  label: string;
  values: string[];
  highlight?: boolean;
}) {
  return (
    <tr>
      <td className="p-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</td>
      {values.map((v, i) => (
        <td
          key={i}
          className={`p-3 ${highlight ? "font-display text-base text-gold" : "text-foreground"}`}
        >
          {v}
        </td>
      ))}
    </tr>
  );
}

import type { ReactNode } from "react";

interface LegalShellProps {
  title: string;
  updated: string;
  children: ReactNode;
}

/** Mise en page commune des pages légales (mentions, confidentialité, cookies). */
export function LegalShell({ title, updated, children }: LegalShellProps) {
  return (
    <div className="container-luxe max-w-3xl py-16 md:py-24">
      <span className="gold-rule" />
      <h1 className="mt-4 font-display text-4xl text-primary md:text-5xl">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">Dernière mise à jour : {updated}</p>
      <div className="legal-prose mt-10 space-y-8 text-[15px] leading-relaxed text-foreground/90">
        {children}
      </div>
    </div>
  );
}

interface SectionProps {
  title: string;
  children: ReactNode;
}

/** Section titrée d'une page légale. */
export function LegalSection({ title, children }: SectionProps) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-2xl text-primary">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export default LegalShell;

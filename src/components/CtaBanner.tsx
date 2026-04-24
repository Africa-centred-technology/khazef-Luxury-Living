import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CtaBanner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-night text-secondary">
      <div className="absolute inset-0 pattern-zellige opacity-30 pointer-events-none" />
      <div className="container-luxe relative py-24 md:py-32 text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="gold-rule" />
          <span className="eyebrow text-gold">Une adresse confidentielle</span>
          <span className="gold-rule" />
        </div>
        <h2 className="h-display text-secondary text-balance max-w-3xl mx-auto">
          Entrez chez vous, <em className="text-gold">avant tout le monde.</em>
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-secondary/80 font-light">
          Une visite privée, sur simple demande. Notre conseiller vous accompagne dans la découverte de votre future résidence.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="group inline-flex items-center justify-center gap-3 bg-gradient-gold-bright text-primary px-8 py-4 text-[12px] uppercase tracking-[0.22em] font-medium hover:shadow-luxe-lg transition-all duration-500"
          >
            Réserver une visite
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/apartments"
            className="inline-flex items-center justify-center gap-3 border border-gold/40 text-secondary px-8 py-4 text-[12px] uppercase tracking-[0.22em] font-medium hover:bg-gold/10 transition-all duration-500"
          >
            Découvrir les appartements
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;

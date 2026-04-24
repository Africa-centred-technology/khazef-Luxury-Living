import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  return (
    <section className="min-h-[80vh] flex items-center justify-center container-luxe py-32">
      <div className="text-center max-w-xl">
        <div className="font-display text-[8rem] md:text-[12rem] leading-none text-primary">404</div>
        <div className="eyebrow text-gold mb-6">Page introuvable</div>
        <h1 className="h-section text-primary mb-6">
          Cette adresse <em>n'existe pas encore.</em>
        </h1>
        <p className="text-muted-foreground mb-10 font-light">
          Le seuil que vous cherchez n'a pas été ciselé. Revenons ensemble à l'entrée.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-[12px] uppercase tracking-[0.22em] font-medium hover:bg-gradient-indigo transition-all duration-500"
        >
          Retour à l'accueil
        </Link>
      </div>
    </section>
  );
};

export default NotFound;

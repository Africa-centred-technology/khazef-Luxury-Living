import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface SeoProps {
  title: string;
  description?: string;
  canonical?: string;
  /**
   * Données structurées Schema.org propres à la page (objet ou tableau d'objets).
   * Injectées dans un <script type="application/ld+json"> dédié, en complément du
   * graphe global d'index.html.
   */
  jsonLd?: object | object[];
}

const PAGE_JSONLD_ID = "seo-page-jsonld";

const Seo = ({ title, description, canonical, jsonLd }: SeoProps) => {
  const { t } = useTranslation("common");

  useEffect(() => {
    const fullTitle = `${title}${t("seo.suffix")}`;
    document.title = fullTitle;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    if (description) setMeta("description", description);

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonical ?? window.location.href);
  }, [title, description, canonical, t]);

  // Données structurées par page (nettoyées au démontage / changement).
  useEffect(() => {
    const existing = document.getElementById(PAGE_JSONLD_ID);
    if (existing) existing.remove();
    if (!jsonLd) return;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = PAGE_JSONLD_ID;
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.getElementById(PAGE_JSONLD_ID)?.remove();
    };
  }, [jsonLd]);

  return null;
};

export default Seo;

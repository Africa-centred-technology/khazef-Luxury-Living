import { useEffect } from "react";

interface SeoProps {
  title: string;
  description?: string;
  canonical?: string;
}

const Seo = ({ title, description, canonical }: SeoProps) => {
  useEffect(() => {
    const fullTitle = `${title} · Khazef — Safi, Maroc`;
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
  }, [title, description, canonical]);

  return null;
};

export default Seo;

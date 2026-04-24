import { useEffect } from "react";
import { PANORAMA_PLACEHOLDERS } from "../data/panorama-assets";
import { ROOM_ORDER, TOUR_ROOMS } from "../data/tour-data";

interface VirtualTourSchemaProps {
  /** Public URL to display as the canonical tour page in the JSON-LD. */
  canonicalUrl?: string;
  /** Residence name shown in structured data. */
  name?: string;
  /** Residence short description for SEO. */
  description?: string;
}

const SCRIPT_ID = "khazef-virtual-tour-jsonld";

function setMeta(property: string, content: string): () => void {
  const selector = `meta[property="${property}"]`;
  const existing = document.head.querySelector<HTMLMetaElement>(selector);
  if (existing) {
    const previous = existing.getAttribute("content") ?? "";
    existing.setAttribute("content", content);
    return () => {
      existing.setAttribute("content", previous);
    };
  }

  const created = document.createElement("meta");
  created.setAttribute("property", property);
  created.setAttribute("content", content);
  document.head.appendChild(created);
  return () => {
    if (created.parentNode) {
      created.parentNode.removeChild(created);
    }
  };
}

function absoluteUrl(path: string): string {
  if (typeof window === "undefined") return path;
  try {
    return new URL(path, window.location.origin).toString();
  } catch {
    return path;
  }
}

/**
 * Injects a JSON-LD `ApartmentComplex` graph describing the virtual tour
 * (Khazef residence + VirtualLocation + panoramic images) and sets
 * OpenGraph meta tags. Cleans up on unmount.
 */
const VirtualTourSchema = ({
  canonicalUrl,
  name = "Luxury Living — Safi, Maroc",
  description = "Visite virtuelle immersive de la residence Luxury Living (projet Khazef) a Safi : salon, cuisine et suite parentale en 360 degres.",
}: VirtualTourSchemaProps) => {
  useEffect(() => {
    const url =
      canonicalUrl ??
      (typeof window !== "undefined" ? window.location.href : "");

    const images = ROOM_ORDER.map((roomId) =>
      absoluteUrl(PANORAMA_PLACEHOLDERS[roomId]),
    );

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "ApartmentComplex",
      name,
      description,
      url,
      image: images,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Safi",
        addressCountry: "MA",
      },
      amenityFeature: ROOM_ORDER.map((roomId) => ({
        "@type": "LocationFeatureSpecification",
        name: TOUR_ROOMS[roomId].name,
        value: true,
      })),
      subjectOf: {
        "@type": "VirtualLocation",
        name: `${name} — Visite 360 degres`,
        url,
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = SCRIPT_ID;
    script.text = JSON.stringify(jsonLd);

    const previous = document.getElementById(SCRIPT_ID);
    if (previous && previous.parentNode) {
      previous.parentNode.removeChild(previous);
    }
    document.head.appendChild(script);

    const cleanupOgImage = setMeta("og:image", images[0] ?? "");
    const cleanupOgType = setMeta("og:type", "website");

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      cleanupOgImage();
      cleanupOgType();
    };
  }, [canonicalUrl, name, description]);

  return null;
};

export default VirtualTourSchema;

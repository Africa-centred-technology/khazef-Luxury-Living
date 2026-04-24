import { Link } from "react-router-dom";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  italicWord?: string;
  intro?: string;
  arabic?: string;
  image?: string;
}

const PageHeader = ({ eyebrow, title, italicWord, intro, arabic, image }: PageHeaderProps) => {
  const { t } = useTranslation("common");
  const hasImage = Boolean(image);

  const sectionClass = [
    "relative overflow-hidden",
    "min-h-[55vh] md:min-h-[72vh]",
    hasImage ? "bg-primary" : "bg-secondary/40 pattern-zellige",
  ].join(" ");

  return (
    <section className={sectionClass}>
      {hasImage && (
        <>
          <img
            src={image}
            alt={t("pageHeader.illustrationAlt")}
            className="absolute inset-0 h-full w-full object-cover animate-slow-pan will-change-transform"
            loading="eager"
            decoding="async"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-primary/55 via-primary/50 to-primary/85" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-primary/75 via-primary/35 to-transparent md:to-primary/5" />
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.4),transparent_60%)]" />
          <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        </>
      )}

      {/* Arabic watermark — large, low-opacity decoration behind the title */}
      {arabic && (
        <span
          aria-hidden
          className={`pointer-events-none absolute right-[-2%] top-1/2 -translate-y-1/2 arabic font-normal select-none ${
            hasImage ? "text-gold/10" : "text-primary/5"
          }`}
          style={{ fontSize: "clamp(10rem, 28vw, 28rem)", lineHeight: 1 }}
        >
          {arabic}
        </span>
      )}

      <div className="container-luxe relative flex min-h-[55vh] md:min-h-[72vh] flex-col justify-center pt-40 pb-24 md:pt-48 md:pb-32">
        {/* Breadcrumb */}
        <nav
          aria-label={t("pageHeader.breadcrumbLabel")}
          className={`mb-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-medium ${
            hasImage ? "text-white/85" : "text-muted-foreground"
          }`}
          style={hasImage ? { textShadow: "0 1px 3px hsl(var(--primary) / 0.6)" } : undefined}
        >
          <Link
            to="/"
            className={`transition-colors hover:text-gold ${hasImage ? "text-white/85" : "text-muted-foreground"}`}
          >
            {t("pageHeader.brandCrumb")}
          </Link>
          <ChevronRight className="h-3 w-3 text-gold" aria-hidden />
          <span className={hasImage ? "text-gold" : "text-primary"}>{eyebrow}</span>
        </nav>

        <div className="max-w-4xl relative">
          {/* Eyebrow + arabic inline accent — staggered */}
          <div
            className="flex items-center gap-4 mb-6 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
          >
            <span className="gold-rule" />
            <span
              className="eyebrow text-gold"
              style={hasImage ? { textShadow: "0 1px 3px hsl(var(--primary) / 0.7)" } : undefined}
            >
              {eyebrow}
            </span>
            {arabic && (
              <span
                className={`arabic text-2xl ml-2 ${hasImage ? "text-gold/90" : "text-primary/70"}`}
                style={hasImage ? { textShadow: "0 1px 3px hsl(var(--primary) / 0.7)" } : undefined}
              >
                {arabic}
              </span>
            )}
          </div>

          {/* Title — staggered */}
          <h1
            className={`h-display text-balance opacity-0 animate-fade-in ${
              hasImage ? "text-white" : "text-primary"
            }`}
            style={{
              animationDelay: "0.25s",
              animationFillMode: "forwards",
              ...(hasImage
                ? { textShadow: "0 2px 14px hsl(var(--primary) / 0.6), 0 1px 3px hsl(var(--primary) / 0.8)" }
                : {}),
            }}
          >
            {title}{" "}
            {italicWord && (
              <em className={`font-light ${hasImage ? "text-gold" : "text-primary/80"}`}>
                {italicWord}
              </em>
            )}
          </h1>

          {/* Intro — staggered */}
          {intro && (
            <p
              className={`mt-8 max-w-2xl text-lg font-light leading-relaxed opacity-0 animate-fade-in ${
                hasImage ? "text-white/90" : "text-muted-foreground"
              }`}
              style={{
                animationDelay: "0.4s",
                animationFillMode: "forwards",
                ...(hasImage ? { textShadow: "0 1px 6px hsl(var(--primary) / 0.75)" } : {}),
              }}
            >
              {intro}
            </p>
          )}
        </div>
      </div>

      {/* Scroll-down indicator (only when hero is visible enough — i.e. hasImage) */}
      {hasImage && (
        <a
          href="#main"
          aria-label={t("pageHeader.discover")}
          className="group absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70 hover:text-gold transition-colors"
          onClick={(e) => {
            // Let native smooth-scroll handle if a #main anchor exists, else prevent jump
            const target = document.getElementById("main");
            if (!target) e.preventDefault();
          }}
        >
          <span className="text-[9px] uppercase tracking-[0.3em]">{t("pageHeader.scrollIndicator")}</span>
          <span className="relative flex h-7 w-[1px] overflow-hidden">
            <span className="absolute inset-x-0 top-0 h-3 bg-gold animate-[scroll-indicator_2.2s_ease-in-out_infinite]" />
          </span>
          <ChevronDown className="h-4 w-4 text-gold animate-bounce" aria-hidden />
        </a>
      )}
    </section>
  );
};

export default PageHeader;

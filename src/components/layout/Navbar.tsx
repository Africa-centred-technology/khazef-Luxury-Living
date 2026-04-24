import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight, ChevronDown, ChevronRight, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

interface NavItem {
  to: string;
  label: string;
  arabic?: string;
}

/** Primary nav — always visible on desktop */
const PRIMARY: NavItem[] = [
  { to: "/", label: "Accueil", arabic: "الرئيسية" },
  { to: "/project", label: "Projet", arabic: "المشروع" },
  { to: "/apartments", label: "Appartements", arabic: "الشقق" },
  { to: "/plans", label: "Plans", arabic: "المخططات" },
  { to: "/virtual-tour", label: "Visite 360°", arabic: "جولة" },
  { to: "/gallery", label: "Galerie", arabic: "معرض" },
];

/** Secondary nav — grouped under a "Plus" dropdown on desktop */
const SECONDARY: NavItem[] = [
  { to: "/location", label: "Emplacement", arabic: "الموقع" },
  { to: "/timeline", label: "Livraison", arabic: "التسليم" },
  { to: "/safi", label: "Safi", arabic: "آسفي" },
];

const ALL_NAV: NavItem[] = [...PRIMARY, ...SECONDARY, { to: "/contact", label: "Contact", arabic: "اتصل" }];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const moreRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (y / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [location.pathname]);

  // Close "Plus" dropdown on outside click + Escape
  useEffect(() => {
    if (!moreOpen) return;
    const onDown = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [moreOpen]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const headerTone = scrolled || open;
  const onImage = !scrolled && !open;
  const isSecondaryActive = SECONDARY.some((item) => location.pathname.startsWith(item.to) && item.to !== "/");

  // Text-shadow strings applied when the navbar sits on top of a hero image
  const textShadowStrong = "0 2px 12px hsl(var(--primary) / 0.75), 0 1px 3px hsl(var(--primary) / 0.85)";
  const textShadowSoft = "0 1px 4px hsl(var(--primary) / 0.75)";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        headerTone
          ? "bg-background backdrop-blur-lg border-b border-gold/30 shadow-luxe-md"
          : "bg-transparent"
      }`}
    >
      {/* Top legibility scrim — dark gradient behind the navbar when transparent.
          Does NOT touch any hero image; sits on top of it at low opacity so
          the text below has enough contrast on any photo. */}
      {onImage && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/55 via-primary/25 to-transparent"
        />
      )}
      <div className="container-luxe relative z-10 flex items-center justify-between h-28 md:h-32">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-4 md:gap-5 group" aria-label="Luxury Living — Accueil">
          <div className="relative h-[88px] w-[88px] md:h-[104px] md:w-[104px] flex items-center justify-center shrink-0">
            {/* Outer rotating ring — conic gradient gold, hugs the logo */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, hsl(var(--gold) / 0) 0deg, hsl(var(--gold) / 0.9) 60deg, hsl(var(--gold) / 0) 120deg, hsl(var(--gold) / 0.75) 220deg, hsl(var(--gold) / 0) 280deg)",
                animation: "logo-spin-slow 14s linear infinite, logo-ring-glow 4s ease-in-out infinite",
                WebkitMask: "radial-gradient(circle, transparent 82%, black 86%, black 93%, transparent 97%)",
                mask: "radial-gradient(circle, transparent 82%, black 86%, black 93%, transparent 97%)",
              }}
            />
            {/* Inner counter-rotating ring — thinner, just outside the logo */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-1 rounded-full"
              style={{
                background:
                  "conic-gradient(from 180deg, hsl(var(--gold) / 0) 0deg, hsl(var(--gold-bright) / 0.7) 90deg, hsl(var(--gold) / 0) 180deg)",
                animation: "logo-spin-reverse 22s linear infinite",
                WebkitMask: "radial-gradient(circle, transparent 80%, black 84%, black 90%, transparent 94%)",
                mask: "radial-gradient(circle, transparent 80%, black 84%, black 90%, transparent 94%)",
              }}
            />
            {/* Soft halo behind the logo — tighter */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-2 rounded-full bg-gold/25 blur-md"
              style={{ animation: "logo-halo-pulse 5s ease-in-out infinite" }}
            />
            {/* Four orbiting dots — closer to the logo edge */}
            {[0, 90, 180, 270].map((deg) => (
              <span
                key={deg}
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
                style={{
                  transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-46%)`,
                  opacity: 0.85,
                }}
              />
            ))}
            {/* Logo */}
            <img
              src={logo}
              alt="Luxury Living"
              className="relative z-10 h-20 w-20 md:h-24 md:w-24 object-contain transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 drop-shadow-[0_2px_12px_hsl(var(--gold)/0.35)]"
              width={96}
              height={96}
            />
          </div>
          <div className="leading-tight">
            <div
              className={`font-display text-lg md:text-xl tracking-wide group-hover:text-gold transition-colors duration-500 ${
                onImage ? "text-white" : "text-primary"
              }`}
              style={onImage ? { textShadow: textShadowStrong } : undefined}
            >
              Khazef
            </div>
            <div
              className="eyebrow text-[9px] md:text-[10px] text-gold -mt-0.5"
              style={onImage ? { textShadow: textShadowSoft } : undefined}
            >
              Luxury Living
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Navigation principale">
          {PRIMARY.map((item) => (
            <DesktopNavLink key={item.to} item={item} onImage={onImage} />
          ))}

          {/* "Plus" dropdown */}
          <div ref={moreRef} className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              aria-expanded={moreOpen}
              aria-haspopup="menu"
              style={onImage && !isSecondaryActive ? { textShadow: textShadowSoft } : undefined}
              className={`group inline-flex items-center gap-1 text-[13px] uppercase tracking-[0.18em] font-medium transition-colors ${
                isSecondaryActive
                  ? "text-gold"
                  : onImage
                    ? "text-white hover:text-gold"
                    : "text-primary hover:text-gold"
              }`}
            >
              Plus
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-300 ${moreOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            {moreOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-3 w-56 border border-border/60 bg-background/95 backdrop-blur-md shadow-luxe-lg py-2 animate-fade-in"
              >
                {SECONDARY.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    role="menuitem"
                    className={({ isActive }) =>
                      `flex items-center justify-between gap-4 px-4 py-2.5 text-[12px] uppercase tracking-[0.18em] font-medium transition-colors ${
                        isActive ? "text-gold bg-secondary/60" : "text-primary hover:text-gold hover:bg-secondary/40"
                      }`
                    }
                  >
                    <span>{item.label}</span>
                    {item.arabic && <span className="arabic text-[13px] text-gold/70 normal-case tracking-normal">{item.arabic}</span>}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <Link
            to="/contact"
            className="group relative ml-2 inline-flex items-center gap-2 bg-gradient-gold-bright text-primary px-5 py-3 text-[12px] uppercase tracking-[0.22em] font-medium shadow-luxe-sm transition-all duration-500 hover:shadow-luxe-md hover:-translate-y-0.5 overflow-hidden"
          >
            <span className="relative z-10">Visite privée</span>
            <ArrowUpRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            <span
              aria-hidden
              className="absolute inset-0 bg-primary translate-y-full transition-transform duration-500 group-hover:translate-y-0"
            />
            <span className="absolute inset-0 flex items-center justify-center gap-2 text-secondary translate-y-full transition-transform duration-500 group-hover:translate-y-0 pointer-events-none">
              <span>Visite privée</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </span>
          </Link>
        </nav>

        {/* Mobile trigger — always-visible pill so the user can find it on any hero */}
        <button
          className={`lg:hidden relative inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors shadow-luxe-sm ${
            onImage
              ? "border-white/70 bg-primary/60 text-white backdrop-blur-md hover:bg-primary/80"
              : "border-border/70 bg-background/90 text-primary backdrop-blur-md hover:border-gold hover:text-gold"
          }`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Scroll progress bar (bottom of nav) */}
      <div
        aria-hidden
        className={`absolute inset-x-0 bottom-0 h-[1px] transition-opacity duration-300 ${headerTone ? "opacity-100" : "opacity-0"}`}
      >
        <div
          className="h-full bg-gradient-to-r from-gold via-gold-bright to-gold origin-left transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>

      {/* Mobile drawer — rendered via portal onto document.body so it
          escapes the header's stacking context entirely. Guarantees
          the full-screen overlay always covers everything beneath. */}
      {typeof document !== "undefined" &&
        createPortal(
          <div
            aria-hidden={!open}
            className={`fixed inset-0 z-[100] lg:hidden transition-opacity duration-500 ${
              open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-primary/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        {/* Panel */}
        <aside
          role="dialog"
          aria-label="Menu"
          style={{ backgroundColor: "hsl(var(--background))" }}
          className={`absolute right-0 top-0 h-full w-[min(92vw,22rem)] border-l border-gold/40 shadow-luxe-xl flex flex-col transition-transform duration-500 overflow-hidden ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Gold signature rail on the left edge of the panel */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-gold/0 via-gold to-gold/0"
          />
          {/* Arabic watermark behind the list */}
          <span
            aria-hidden
            className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 arabic text-primary/5 select-none"
            style={{ fontSize: "clamp(10rem, 38vw, 18rem)", lineHeight: 1 }}
          >
            خَزَف
          </span>

          <header className="relative flex items-center justify-between px-6 pt-6 pb-4 border-b border-border/60">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 flex items-center justify-center shrink-0">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, hsl(var(--gold) / 0) 0deg, hsl(var(--gold) / 0.85) 90deg, hsl(var(--gold) / 0) 180deg)",
                    animation: "logo-spin-slow 16s linear infinite",
                    WebkitMask:
                      "radial-gradient(circle, transparent 82%, black 86%, black 94%, transparent 98%)",
                    mask: "radial-gradient(circle, transparent 82%, black 86%, black 94%, transparent 98%)",
                  }}
                />
                <img src={logo} alt="" className="relative z-10 h-12 w-12 object-contain" width={48} height={48} />
              </div>
              <div>
                <div className="font-display text-xl text-primary leading-tight">Khazef</div>
                <div className="eyebrow text-[9px] text-gold">Luxury Living</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer"
              className="p-2 text-primary hover:text-gold transition-all duration-500 hover:rotate-90"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <nav className="relative flex-1 overflow-y-auto px-6 py-6" aria-label="Navigation mobile">
            <div className="flex items-center gap-3 mb-4">
              <span className="gold-rule" aria-hidden />
              <span className="eyebrow text-gold text-[10px]">Navigation</span>
            </div>

            <ul className="flex flex-col">
              {ALL_NAV.map((item, i) => (
                <li
                  key={item.to}
                  className="border-b border-border/40 last:border-b-0 transition-all duration-500"
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0)" : "translateY(8px)",
                    transitionDelay: open ? `${i * 40}ms` : "0ms",
                  }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      `group relative flex items-center justify-between gap-4 py-4 pl-6 pr-1 font-display text-2xl transition-all duration-500 ${
                        isActive ? "text-gold translate-x-1" : "text-primary hover:text-gold hover:translate-x-1"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {/* Editorial number prefix (01, 02, ...) */}
                        <span
                          aria-hidden
                          className={`absolute left-0 top-1/2 -translate-y-1/2 eyebrow text-[10px] transition-colors ${
                            isActive ? "text-gold" : "text-primary/30 group-hover:text-gold/70"
                          }`}
                          style={{ letterSpacing: "0.16em" }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="flex items-center gap-3">
                          {/* Active dot */}
                          {isActive && (
                            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_8px_hsl(var(--gold))]" />
                          )}
                          {item.label}
                        </span>
                        <span className="flex items-center gap-2">
                          {item.arabic && (
                            <span className="arabic text-sm text-muted-foreground opacity-70 group-hover:opacity-100 group-hover:text-gold/80 transition-opacity">
                              {item.arabic}
                            </span>
                          )}
                          <ChevronRight
                            className={`h-4 w-4 transition-all duration-500 ${
                              isActive
                                ? "text-gold translate-x-0 opacity-100"
                                : "text-primary/40 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-gold"
                            }`}
                            aria-hidden
                          />
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Contact block */}
            <div className="mt-10 pt-6 border-t border-border/60">
              <div className="flex items-center gap-3 mb-4">
                <span className="gold-rule" aria-hidden />
                <span className="eyebrow text-gold text-[10px]">Contact direct</span>
              </div>
              <a
                href="tel:+212000000000"
                className="group flex items-center gap-3 py-2 text-sm text-primary hover:text-gold hover:translate-x-1 transition-all duration-500"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center border border-gold/40 group-hover:bg-gold/10 transition-colors">
                  <Phone className="h-3.5 w-3.5 text-gold" />
                </span>
                +212 0 00 00 00 00
              </a>
              <a
                href="mailto:contact@luxuryliving.ma"
                className="group flex items-center gap-3 py-2 text-sm text-primary hover:text-gold hover:translate-x-1 transition-all duration-500"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center border border-gold/40 group-hover:bg-gold/10 transition-colors">
                  <Mail className="h-3.5 w-3.5 text-gold" />
                </span>
                contact@luxuryliving.ma
              </a>
            </div>
          </nav>

          {/* Mobile CTA */}
          <div className="relative px-6 pb-6 pt-2">
            <Link
              to="/contact"
              className="group relative inline-flex w-full items-center justify-center gap-2 bg-gradient-gold-bright text-primary px-5 py-4 text-[12px] uppercase tracking-[0.22em] font-medium shadow-luxe-sm transition-all duration-500 hover:shadow-luxe-md overflow-hidden"
            >
              <span className="relative z-10">Réserver une visite privée</span>
              <ArrowUpRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span
                aria-hidden
                className="absolute inset-0 bg-primary translate-y-full transition-transform duration-500 group-hover:translate-y-0"
              />
              <span className="absolute inset-0 flex items-center justify-center gap-2 text-secondary translate-y-full transition-transform duration-500 group-hover:translate-y-0 pointer-events-none">
                <span>Réserver une visite privée</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </Link>
            <div className="mt-3 text-center eyebrow text-[9px] text-muted-foreground">
              Sur rendez-vous · 7j/7
            </div>
          </div>
        </aside>
      </div>,
          document.body,
        )}
    </header>
  );
};

/**
 * Desktop nav link with animated gold underline.
 * When `onImage` is true, text switches to white + text-shadow so it stays
 * readable over any hero photograph.
 */
function DesktopNavLink({ item, onImage }: { item: NavItem; onImage: boolean }) {
  const shadow = "0 1px 4px hsl(var(--primary) / 0.8)";
  return (
    <NavLink
      to={item.to}
      end={item.to === "/"}
      className={({ isActive }) =>
        `group relative text-[13px] uppercase tracking-[0.18em] font-medium transition-colors ${
          isActive
            ? "text-gold"
            : onImage
              ? "text-white hover:text-gold"
              : "text-primary hover:text-gold"
        }`
      }
      style={({ isActive }) => (onImage && !isActive ? { textShadow: shadow } : undefined)}
    >
      {({ isActive }) => (
        <span className="relative">
          {item.label}
          <span
            aria-hidden
            className={`absolute -bottom-1 left-0 right-0 h-px origin-left transition-transform duration-500 bg-gold ${
              isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            }`}
          />
        </span>
      )}
    </NavLink>
  );
}

export default Navbar;

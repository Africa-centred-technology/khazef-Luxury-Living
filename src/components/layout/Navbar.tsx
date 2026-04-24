import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const NAV = [
  { to: "/", label: "Accueil" },
  { to: "/project", label: "Projet" },
  { to: "/apartments", label: "Appartements" },
  { to: "/plans", label: "Plans" },
  { to: "/location", label: "Emplacement" },
  { to: "/timeline", label: "Livraison" },
  { to: "/virtual-tour", label: "Visite 360°" },
  { to: "/gallery", label: "Galerie" },
  { to: "/safi", label: "Safi" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-background/92 backdrop-blur-md border-b border-border/60 shadow-luxe-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container-luxe flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3 group" aria-label="Khazef — Accueil">
          <img
            src={logo}
            alt="Khazef"
            className="h-12 w-12 object-contain transition-transform duration-700 group-hover:rotate-12"
            width={48}
            height={48}
          />
          <div className="leading-tight">
            <div className="font-display text-xl text-primary tracking-wide">Khazef</div>
            <div className="eyebrow text-[10px] text-muted-foreground -mt-0.5">Projet immobilier</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Navigation principale">
          {NAV.slice(0, 9).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `link-luxe text-[13px] uppercase tracking-[0.18em] font-medium transition-colors ${
                  isActive ? "text-gold" : "text-primary hover:text-gold"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="ml-2 inline-flex items-center justify-center bg-primary text-primary-foreground px-5 py-3 text-[12px] uppercase tracking-[0.22em] font-medium hover:bg-gradient-indigo transition-all duration-500 shadow-luxe-sm hover:shadow-luxe-md"
          >
            Visite privée
          </Link>
        </nav>

        <button
          className="lg:hidden p-2 text-primary"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-500 ease-in-out ${
          open ? "max-h-[80vh]" : "max-h-0"
        }`}
      >
        <nav className="container-luxe flex flex-col gap-1 py-6 border-t border-border/60">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `py-3 font-display text-2xl ${isActive ? "text-gold" : "text-primary"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

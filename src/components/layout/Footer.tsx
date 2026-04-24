import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-charcoal text-secondary mt-24">
      <div className="absolute inset-0 pattern-zellige opacity-40 pointer-events-none" />
      <div className="container-luxe relative py-20 grid gap-14 md:grid-cols-12">
        <div className="md:col-span-4 space-y-5">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-14 w-14 object-contain" width={56} height={56} />
            <div>
              <div className="font-display text-2xl text-secondary">Khazef </div>
              <div className="eyebrow text-[10px] text-gold">Luxury Living</div>
            </div>
          </div>
          <p className="font-display italic text-secondary/80 text-lg leading-snug">
            « L'art de vivre,<br />ciselé dans la pierre. »
          </p>
        </div>

        <div className="md:col-span-3">
          <div className="eyebrow text-gold mb-5">Le projet</div>
          <ul className="space-y-3 text-sm text-secondary/85">
            <li><Link to="/project" className="link-luxe">Concept architectural</Link></li>
            <li><Link to="/apartments" className="link-luxe">Appartements</Link></li>
            <li><Link to="/plans" className="link-luxe">Plans & étages</Link></li>
            <li><Link to="/timeline" className="link-luxe">Livraison</Link></li>
            <li><Link to="/virtual-tour" className="link-luxe">Visite 360°</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <div className="eyebrow text-gold mb-5">Découvrir</div>
          <ul className="space-y-3 text-sm text-secondary/85">
            <li><Link to="/location" className="link-luxe">Emplacement</Link></li>
            <li><Link to="/safi" className="link-luxe">Ville de Safi</Link></li>
            <li><Link to="/gallery" className="link-luxe">Galerie</Link></li>
            <li><Link to="/contact" className="link-luxe">Contact</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <div className="eyebrow text-gold mb-5">Contact</div>
          <ul className="space-y-3 text-sm text-secondary/85">
            <li className="flex items-start gap-3">
              <MapPin className="h-4 w-4 mt-0.5 text-gold shrink-0" />
              Avenue Atlantique, Safi 46000, Maroc
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-gold shrink-0" />
              <a href="tel:+212500000000" className="link-luxe">+212 5 00 00 00 00</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-gold shrink-0" />
              <a href="mailto:contact@khazef.ma" className="link-luxe">contact@khazef.ma</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-secondary/10">
        <div className="container-luxe py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-secondary/60">
          <div>© {new Date().getFullYear()} Luxury Living — Résidence Khazef · Safi · Tous droits réservés.</div>
          <div className="eyebrow text-secondary/50">Safi · Maroc · المغرب</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

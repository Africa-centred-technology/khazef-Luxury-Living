import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "@/assets/logo.png";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-charcoal text-secondary mt-24">
      <div className="absolute inset-0 pattern-zellige opacity-40 pointer-events-none" />
      <div className="container-luxe relative py-20 grid gap-14 md:grid-cols-12">
        <div className="md:col-span-4 space-y-5">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-14 w-14 object-contain" width={56} height={56} />
            <div>
              <div className="font-display text-2xl text-secondary">{t("brand.name")} </div>
              <div className="eyebrow text-[10px] text-gold">{t("brand.eyebrow")}</div>
            </div>
          </div>
          <p className="font-display italic text-secondary/80 text-lg leading-snug whitespace-pre-line">
            {t("brand.tagline")}
          </p>
        </div>

        <div className="md:col-span-3">
          <div className="eyebrow text-gold mb-5">{t("columns.project.title")}</div>
          <ul className="space-y-3 text-sm text-secondary/85">
            <li><Link to="/project" className="link-luxe">{t("columns.project.links.concept")}</Link></li>
            <li><Link to="/apartments" className="link-luxe">{t("columns.project.links.apartments")}</Link></li>
            <li><Link to="/plans" className="link-luxe">{t("columns.project.links.plans")}</Link></li>
            <li><Link to="/timeline" className="link-luxe">{t("columns.project.links.timeline")}</Link></li>
            <li><Link to="/virtual-tour" className="link-luxe">{t("columns.project.links.virtualTour")}</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <div className="eyebrow text-gold mb-5">{t("columns.discover.title")}</div>
          <ul className="space-y-3 text-sm text-secondary/85">
            <li><Link to="/location" className="link-luxe">{t("columns.discover.links.location")}</Link></li>
            <li><Link to="/safi" className="link-luxe">{t("columns.discover.links.safi")}</Link></li>
            <li><Link to="/gallery" className="link-luxe">{t("columns.discover.links.gallery")}</Link></li>
            <li><Link to="/contact" className="link-luxe">{t("columns.discover.links.contact")}</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <div className="eyebrow text-gold mb-5">{t("columns.contact.title")}</div>
          <ul className="space-y-3 text-sm text-secondary/85">
            <li className="flex items-start gap-3">
              <MapPin className="h-4 w-4 mt-0.5 text-gold shrink-0" />
              {t("columns.contact.address")}
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-gold shrink-0" />
              <a href="tel:+212500000000" className="link-luxe" aria-label={t("columns.contact.phoneLabel")}>+212 5 00 00 00 00</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-gold shrink-0" />
              <a href="mailto:contact@khazef.ma" className="link-luxe" aria-label={t("columns.contact.emailLabel")}>contact@khazef.ma</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-secondary/10">
        <div className="container-luxe py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-secondary/60">
          <div>{t("legal.copyright", { year })}</div>
          <div className="eyebrow text-secondary/50">{t("legal.locale")}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

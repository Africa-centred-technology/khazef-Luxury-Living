import { FormEvent, useState } from "react";
import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Demande envoyée", {
        description: "Notre conseiller vous répondra sous 24h.",
      });
    }, 900);
  };

  return (
    <>
      <Seo title="Contact" description="Réservez une visite privée de la résidence Khazef à Safi." />
      <PageHeader
        eyebrow="Contact"
        arabic="تواصل"
        title="Une visite privée,"
        italicWord="sur simple demande."
        intro="Notre conseiller vous accompagne dans la découverte de Khazef et la sélection de votre future adresse."
      />

      <section className="container-luxe py-20 grid lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Form */}
        <form onSubmit={onSubmit} className="lg:col-span-7 bg-background border border-border/60 p-8 md:p-12 shadow-luxe-md space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="eyebrow text-gold text-[11px]">Nom complet</label>
              <input
                id="name" name="name" required
                className="w-full bg-transparent border-b border-border focus:border-gold py-3 text-primary outline-none transition-colors"
                placeholder="Votre nom"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="eyebrow text-gold text-[11px]">Téléphone</label>
              <input
                id="phone" name="phone" type="tel" required
                className="w-full bg-transparent border-b border-border focus:border-gold py-3 text-primary outline-none transition-colors"
                placeholder="+212 …"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="eyebrow text-gold text-[11px]">E-mail</label>
            <input
              id="email" name="email" type="email" required
              className="w-full bg-transparent border-b border-border focus:border-gold py-3 text-primary outline-none transition-colors"
              placeholder="vous@exemple.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="interest" className="eyebrow text-gold text-[11px]">Votre intérêt</label>
            <select
              id="interest" name="interest"
              className="w-full bg-transparent border-b border-border focus:border-gold py-3 text-primary outline-none transition-colors"
              defaultValue=""
            >
              <option value="" disabled>Sélectionnez…</option>
              <option>Visite privée</option>
              <option>Information sur les appartements</option>
              <option>Documentation commerciale</option>
              <option>Espaces commerciaux</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="eyebrow text-gold text-[11px]">Message</label>
            <textarea
              id="message" name="message" rows={5}
              className="w-full bg-transparent border-b border-border focus:border-gold py-3 text-primary outline-none resize-none transition-colors"
              placeholder="Quelques mots sur votre projet…"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-[12px] uppercase tracking-[0.22em] font-medium hover:bg-gradient-indigo transition-all duration-500 shadow-luxe-sm hover:shadow-luxe-md disabled:opacity-60"
          >
            {loading ? "Envoi en cours…" : "Envoyer la demande"}
            <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-xs text-muted-foreground pt-2">
            En soumettant ce formulaire, vous acceptez d'être contacté par un conseiller Khazef.
          </p>
        </form>

        {/* Info */}
        <aside className="lg:col-span-5 space-y-10">
          <div>
            <div className="flex items-center gap-4 mb-4"><span className="gold-rule" /><span className="eyebrow text-gold">Bureau de vente</span></div>
            <h2 className="h-section text-primary mb-6">À votre écoute, <em>chaque jour.</em></h2>
            <ul className="space-y-5 text-muted-foreground font-light">
              <li className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-gold mt-1 shrink-0" strokeWidth={1.4} />
                <div>
                  <div className="text-primary font-medium">Avenue Atlantique</div>
                  Safi 46000, Maroc
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="h-5 w-5 text-gold mt-1 shrink-0" strokeWidth={1.4} />
                <div>
                  <div className="text-primary font-medium">+212 5 00 00 00 00</div>
                  Lun. – Sam. · 9h–19h
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="h-5 w-5 text-gold mt-1 shrink-0" strokeWidth={1.4} />
                <div>
                  <div className="text-primary font-medium">contact@khazef.ma</div>
                  Réponse sous 24h
                </div>
              </li>
            </ul>
          </div>

          <div className="aspect-[4/3] overflow-hidden border border-border shadow-luxe-sm">
            <iframe
              title="Plan d'accès Khazef"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-9.27%2C32.28%2C-9.21%2C32.32&layer=mapnik&marker=32.30,-9.24"
              className="h-full w-full grayscale-[20%]"
              loading="lazy"
            />
          </div>
        </aside>
      </section>
    </>
  );
};

export default Contact;

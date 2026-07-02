import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { RENDERS } from "@/data/renders";
import { CONTACT } from "@/data/villas-ahlam";
import { ApiError, createRappel } from "@/lib/api";
import { RendezVous } from "@/components/RendezVous";
import { Faq } from "@/components/Faq";

const hero = RENDERS.villaDusk;

const Contact = () => {
  const { t } = useTranslation("contact");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const nom = String(data.get("name") ?? "").trim();
    const telephone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const interet = String(data.get("interest") ?? "").trim();
    const messageLibre = String(data.get("message") ?? "").trim();

    if (!nom || !telephone) {
      toast.error(t("form.name.label") + " / " + t("form.phone.label"));
      return;
    }

    // On consolide e-mail, intérêt et message dans le champ message du rappel.
    const message = [
      interet && `Intérêt : ${interet}`,
      email && `E-mail : ${email}`,
      messageLibre,
    ]
      .filter(Boolean)
      .join("\n");

    setLoading(true);
    try {
      await createRappel({ nom, telephone, sujet: "general", message, consentement_rgpd: true });
      form.reset();
      toast.success(t("form.toast.title"), { description: t("form.toast.description") });
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : "Envoi impossible. Réessayez ou appelez-nous.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo title={t("seo.title")} description={t("seo.description")} />
      <PageHeader
        eyebrow={t("header.eyebrow")}
        arabic={t("header.arabic")}
        title={t("header.title")}
        italicWord={t("header.italicWord")}
        intro={t("header.intro")}
        image={hero}
      />

      <section className="container-luxe py-20 grid lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Form */}
        <form onSubmit={onSubmit} className="lg:col-span-7 bg-background border border-border/60 p-8 md:p-12 shadow-luxe-md space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="eyebrow text-gold text-[11px]">{t("form.name.label")}</label>
              <input
                id="name" name="name" required
                className="w-full bg-transparent border-b border-border focus:border-gold py-3 text-primary outline-none transition-colors"
                placeholder={t("form.name.placeholder")}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="eyebrow text-gold text-[11px]">{t("form.phone.label")}</label>
              <input
                id="phone" name="phone" type="tel" required
                className="w-full bg-transparent border-b border-border focus:border-gold py-3 text-primary outline-none transition-colors"
                placeholder={t("form.phone.placeholder")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="eyebrow text-gold text-[11px]">{t("form.email.label")}</label>
            <input
              id="email" name="email" type="email" required
              className="w-full bg-transparent border-b border-border focus:border-gold py-3 text-primary outline-none transition-colors"
              placeholder={t("form.email.placeholder")}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="interest" className="eyebrow text-gold text-[11px]">{t("form.interest.label")}</label>
            <select
              id="interest" name="interest"
              className="w-full bg-transparent border-b border-border focus:border-gold py-3 text-primary outline-none transition-colors"
              defaultValue=""
            >
              <option value="" disabled>{t("form.interest.placeholder")}</option>
              <option>{t("form.interest.options.visit")}</option>
              <option>{t("form.interest.options.apartments")}</option>
              <option>{t("form.interest.options.documentation")}</option>
              <option>{t("form.interest.options.commercial")}</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="eyebrow text-gold text-[11px]">{t("form.message.label")}</label>
            <textarea
              id="message" name="message" rows={5}
              className="w-full bg-transparent border-b border-border focus:border-gold py-3 text-primary outline-none resize-none transition-colors"
              placeholder={t("form.message.placeholder")}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-[12px] uppercase tracking-[0.22em] font-medium hover:bg-gradient-indigo transition-all duration-500 shadow-luxe-sm hover:shadow-luxe-md disabled:opacity-60"
          >
            {loading ? t("form.submitting") : t("form.submit")}
            <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-xs text-muted-foreground pt-2">
            {t("form.disclaimer")}
          </p>
        </form>

        {/* Info */}
        <aside className="lg:col-span-5 space-y-10">
          <div>
            <div className="flex items-center gap-4 mb-4"><span className="gold-rule" /><span className="eyebrow text-gold">{t("info.eyebrow")}</span></div>
            <h2 className="h-section text-primary mb-6">{t("info.title")} <em>{t("info.italicWord")}</em></h2>
            <ul className="space-y-5 text-muted-foreground font-light">
              <li className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-gold mt-1 shrink-0" strokeWidth={1.4} />
                <div>
                  <div className="text-primary font-medium">{t("info.address.line1")}</div>
                  {t("info.address.line2")}
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="h-5 w-5 text-gold mt-1 shrink-0" strokeWidth={1.4} />
                <div>
                  <a href={`tel:${CONTACT.telephoneRaw}`} className="text-primary font-medium link-luxe">
                    {CONTACT.telephone}
                  </a>
                  <div>{t("info.phone.hours")}</div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="h-5 w-5 text-gold mt-1 shrink-0" strokeWidth={1.4} />
                <div>
                  <a
                    href={CONTACT.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-medium link-luxe"
                  >
                    WhatsApp · {CONTACT.telephone}
                  </a>
                  <div>{t("info.email.reply")}</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="aspect-[4/3] overflow-hidden border border-border shadow-luxe-sm">
            <iframe
              title={t("info.mapTitle")}
              src="https://www.openstreetmap.org/export/embed.html?bbox=-7.70%2C33.45%2C-7.63%2C33.51&layer=mapnik&marker=33.479327,-7.665879"
              className="h-full w-full grayscale-[20%]"
              loading="lazy"
            />
          </div>
        </aside>
      </section>

      <Faq />

      <div className="container-luxe pb-24">
        <RendezVous />
      </div>
    </>
  );
};

export default Contact;

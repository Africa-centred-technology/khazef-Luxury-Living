import { Link } from "react-router-dom";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  italicWord?: string;
  intro?: string;
  arabic?: string;
  image?: string;
}

const PageHeader = ({ eyebrow, title, italicWord, intro, arabic, image }: PageHeaderProps) => {
  return (
    <section className="relative overflow-hidden bg-secondary/40">
      {image && (
        <>
          <img
            src={image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-25"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
        </>
      )}
      <div className="container-luxe relative pt-40 pb-24 md:pt-48 md:pb-32">
        <nav aria-label="Fil d'Ariane" className="eyebrow text-muted-foreground mb-8">
          <Link to="/" className="hover:text-gold">Khazef</Link> <span className="text-gold mx-2">/</span> {eyebrow}
        </nav>
        <div className="max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="gold-rule" />
            <span className="eyebrow text-gold">{eyebrow}</span>
            {arabic && <span className="arabic text-2xl text-primary/70 ml-2">{arabic}</span>}
          </div>
          <h1 className="h-display text-primary text-balance">
            {title}{" "}
            {italicWord && <em className="font-light text-primary/80">{italicWord}</em>}
          </h1>
          {intro && (
            <p className="mt-8 max-w-2xl text-lg text-muted-foreground font-light leading-relaxed">
              {intro}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHeader;

import logo from "@/assets/logo.png";

interface PanoramaLoadingProps {
  label?: string;
}

export function PanoramaLoading({ label = "Chargement immersif" }: PanoramaLoadingProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 bg-primary/95 backdrop-blur-md"
      role="status"
      aria-live="polite"
    >
      <div className="relative flex h-32 w-32 items-center justify-center">
        <span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            animation: "pulse-gold 2.4s ease-in-out infinite",
            boxShadow: "0 0 0 0 hsl(var(--gold) / 0.5)",
          }}
        />
        <span
          aria-hidden
          className="absolute inset-2 rounded-full border border-gold/40"
        />
        <img
          src={logo}
          alt="Khazef"
          className="relative h-16 w-16 object-contain opacity-95"
        />
      </div>

      <div className="flex flex-col items-center gap-3 text-center">
        <span className="eyebrow text-gold">{label}</span>
        <span className="arabic text-2xl text-primary-foreground/80">
          جاري التحميل
        </span>
      </div>

      <div className="relative h-px w-64 overflow-hidden rounded-full bg-primary-foreground/10">
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gold to-transparent"
          style={{
            backgroundSize: "200% 100%",
            animation: "shimmer 1.8s linear infinite",
          }}
        />
      </div>
    </div>
  );
}

export default PanoramaLoading;

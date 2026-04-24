import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useXRStoreContext } from "../scenes/XRProvider";

interface NavigatorWithXR extends Navigator {
  xr?: {
    isSessionSupported: (mode: string) => Promise<boolean>;
  };
}

/**
 * Button that enters an immersive-VR session using the shared XR store.
 * Mounts only after we confirm `navigator.xr.isSessionSupported('immersive-vr')`.
 */
export function XRButton() {
  const { t } = useTranslation("virtualTour");
  const store = useXRStoreContext();
  const [supported, setSupported] = useState<boolean>(false);
  const [pending, setPending] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;
    if (typeof navigator === "undefined") {
      return;
    }
    const nav = navigator as NavigatorWithXR;
    if (!nav.xr || typeof nav.xr.isSessionSupported !== "function") {
      return;
    }
    nav.xr
      .isSessionSupported("immersive-vr")
      .then((ok: boolean) => {
        if (!cancelled) {
          setSupported(ok);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSupported(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!supported) {
    return null;
  }

  const handleEnterVR = async (): Promise<void> => {
    setPending(true);
    try {
      await store.enterVR();
    } catch {
      // Swallow — some browsers reject if the user cancels the permission prompt.
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleEnterVR}
      disabled={pending}
      className="bg-primary text-primary-foreground px-5 py-3 text-[12px] uppercase tracking-[0.22em] transition-opacity hover:opacity-90 disabled:opacity-60"
    >
      {pending ? t("ui.xr.connecting") : t("ui.xr.enter")}
    </button>
  );
}

export default XRButton;

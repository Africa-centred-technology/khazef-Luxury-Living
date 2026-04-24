import { createContext, useContext, useMemo, type ReactNode } from "react";
import { createXRStore, type XRStore } from "@react-three/xr";

interface XRProviderProps {
  children: ReactNode;
  /**
   * Optional external store. When omitted, the provider creates its own
   * store so the component can be used standalone.
   */
  store?: XRStore;
}

const XRStoreContext = createContext<XRStore | null>(null);

/**
 * Thin provider exposing a single shared `XRStore` to children via React
 * context. It does NOT mount the `<XR>` component; the orchestrator places
 * `<XR store={...}>` inside its `<Canvas>` so the store is only connected
 * to the three.js scene when needed.
 */
export function XRProvider({ children, store }: XRProviderProps) {
  const value = useMemo<XRStore>(
    () => store ?? createXRStore(),
    [store],
  );

  return <XRStoreContext.Provider value={value}>{children}</XRStoreContext.Provider>;
}

/**
 * Read the shared XR store from context. Throws if used outside
 * `<XRProvider>` to surface configuration mistakes early.
 */
export function useXRStoreContext(): XRStore {
  const store = useContext(XRStoreContext);
  if (!store) {
    throw new Error("useXRStoreContext must be used inside <XRProvider>");
  }
  return store;
}

export default XRProvider;

import { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CookieConsent from "@/components/CookieConsent";
import Analytics from "@/components/Analytics";

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Aller au contenu
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} key={pathname} className="page-enter flex-1 outline-none">
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
      <Analytics />
    </div>
  );
};

export default Layout;

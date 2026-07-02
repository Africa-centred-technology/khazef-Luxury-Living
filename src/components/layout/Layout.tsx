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
      <Navbar />
      <main key={pathname} className="page-enter flex-1">
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
      <Analytics />
    </div>
  );
};

export default Layout;

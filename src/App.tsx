import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/layout/Layout";
import Home from "./pages/Home";
import Project from "./pages/Project";
import Location from "./pages/Location";
import Lots from "./pages/Lots";
import Plans from "./pages/Plans";
import Financement from "./pages/Financement";
import Timeline from "./pages/Timeline";
import Gallery from "./pages/Gallery";
import Safi from "./pages/Safi";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/project" element={<Project />} />
            <Route path="/location" element={<Location />} />
            <Route path="/lots" element={<Lots />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/financement" element={<Financement />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/safi" element={<Safi />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

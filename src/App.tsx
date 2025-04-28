
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";

// Pages
import HomePage from "@/pages/Index";
import ServicesPage from "@/pages/Services";
import AboutUsPage from "@/pages/AboutUs";
import CaseStudiesPage from "@/pages/CaseStudies";
import BlogPage from "@/pages/Blog";
import CareersPage from "@/pages/Careers";
import ContactUsPage from "@/pages/ContactUs";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <PageTransition>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

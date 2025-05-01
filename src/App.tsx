
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { CmsProvider } from "@/cms/context/CmsContext";

import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";

// Pages
import HomePage from "@/pages/Index";
import ServicesPage from "@/pages/Services";
import AboutUsPage from "@/pages/AboutUs";
import CaseStudiesPage from "@/pages/CaseStudies";
import BlogPage from "@/pages/Blog";
import BlogPostPage from "@/pages/BlogPost";
import CareersPage from "@/pages/Careers";
import ContactUsPage from "@/pages/ContactUs";
import AdminPage from "@/pages/Admin";
import NotFound from "@/pages/NotFound";

// Create a QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CmsProvider>
        <BrowserRouter>
          <TooltipProvider>
            <Navigation />
            <Routes>
              <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
              <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
              <Route path="/about-us" element={<PageTransition><AboutUsPage /></PageTransition>} />
              <Route path="/case-studies" element={<PageTransition><CaseStudiesPage /></PageTransition>} />
              <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
              <Route path="/blog/:slug" element={<PageTransition><BlogPostPage /></PageTransition>} />
              <Route path="/careers" element={<PageTransition><CareersPage /></PageTransition>} />
              <Route path="/contact-us" element={<PageTransition><ContactUsPage /></PageTransition>} />
              <Route path="/admin" element={<PageTransition><AdminPage /></PageTransition>} />
              <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
            </Routes>
            <Footer />
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </BrowserRouter>
      </CmsProvider>
    </QueryClientProvider>
  );
};

export default App;


import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { CmsProvider } from "@/cms/context/CmsContext";
import { AuthProvider } from "@/context/AuthContext";

import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Pages
import HomePage from "@/pages/Index";
import ServicesPage from "@/pages/Services";
import AgentforcePage from "@/pages/Agentforce";
import AgentforceImplementationPage from "@/pages/AgentforceImplementation";
import ApolloSalesforceIntegrationPage from "@/pages/ApolloSalesforceIntegration";
import SalesforceRevOpsPage from "@/pages/SalesforceRevOps";
import LeadGenerationPage from "@/pages/LeadGeneration";
import AboutUsPage from "@/pages/AboutUs";
import CaseStudiesPage from "@/pages/CaseStudies";
import BlogPage from "@/pages/Blog";
import BlogPostPage from "@/pages/BlogPost";
import CareersPage from "@/pages/Careers";
import ContactUsPage from "@/pages/ContactUs";
import AdminPage from "@/pages/Admin";
import AdminLogin from "@/pages/AdminLogin";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import SitemapPage from "@/pages/SitemapPage";
import NotFound from "@/pages/NotFound";

// Create a QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CmsProvider>
        <BrowserRouter>
          <AuthProvider>
            <TooltipProvider>
              <Navigation />
              <Routes>
                <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
                <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
                <Route path="/agentforce" element={<PageTransition><AgentforcePage /></PageTransition>} />
                <Route path="/agentforce-implementation" element={<PageTransition><AgentforceImplementationPage /></PageTransition>} />
                <Route path="/apollo-io-salesforce-integration" element={<PageTransition><ApolloSalesforceIntegrationPage /></PageTransition>} />
                <Route path="/salesforce-revops" element={<PageTransition><SalesforceRevOpsPage /></PageTransition>} />
                <Route path="/b2b-lead-generation" element={<PageTransition><LeadGenerationPage /></PageTransition>} />
                <Route path="/about-us" element={<PageTransition><AboutUsPage /></PageTransition>} />
                <Route path="/case-studies" element={<PageTransition><CaseStudiesPage /></PageTransition>} />
                <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
                <Route path="/blog/:slug" element={<PageTransition><BlogPostPage /></PageTransition>} />
                <Route path="/careers" element={<PageTransition><CareersPage /></PageTransition>} />
                <Route path="/contact-us" element={<PageTransition><ContactUsPage /></PageTransition>} />
                <Route path="/privacy-policy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
                <Route path="/terms-of-service" element={<PageTransition><TermsOfService /></PageTransition>} />
                <Route path="/sitemap" element={<PageTransition><SitemapPage /></PageTransition>} />
                <Route path="/admin-login" element={<PageTransition><AdminLogin /></PageTransition>} />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute>
                      <PageTransition><AdminPage /></PageTransition>
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
              </Routes>
              <Footer />
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </AuthProvider>
        </BrowserRouter>
      </CmsProvider>
    </QueryClientProvider>
  );
};

export default App;

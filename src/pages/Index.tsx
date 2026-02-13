// src/pages/Index.tsx - GARDE LA VERSION ORIGINALE
import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PartnersSection from "@/components/PartnersSection";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

const Index = () => {
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);

  const openLeadForm = () => setIsLeadFormOpen(true);
  const closeLeadForm = () => setIsLeadFormOpen(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onGetStarted={openLeadForm} />
      <HeroSection onGetStarted={openLeadForm} />
      <FeaturesSection />
      <PartnersSection />
      <Footer />
      <LeadForm isOpen={isLeadFormOpen} onClose={closeLeadForm} />
    </div>
  );
};

export default Index;
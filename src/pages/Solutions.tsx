import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShieldAlert, Building2, HeartPulse, Scale, Film, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import LeadForm from "@/components/LeadForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import solutionsHeroBg from "@/assets/solutions-hero-bg.jpg";
import capabilitySearchImg from "@/assets/capability-search.jpg";
import capabilityAlertsImg from "@/assets/capability-alerts.jpg";

const capabilities = [
  {
    id: "search",
    icon: Search,
    image: capabilitySearchImg,
    title: "Natural Language Video Search",
    shortDesc: "Search across thousands of hours of footage using plain language.",
    description:
      "Ask questions like \"Show me every time a red truck appeared last week\" and get instant, precise results from your entire video library. No tagging, no manual indexing — just AI that understands what you're looking for.",
    sectors: {
      security: "Identify a suspect wearing a blue jacket near entrance B at 3 AM, trace a vehicle's path across 50+ camera feeds, or find every instance of tailgating at restricted doors — all by simply describing what you're looking for.",
      health: "Search across OR recordings to find specific laparoscopic techniques, locate patient fall incidents for review, or retrieve physiotherapy session footage by describing the exercise performed.",
      legal: "Describe a key moment — \"witness pointing at exhibit A\" — and instantly surface it from hundreds of hours of deposition video. Cross-reference body-cam footage by location, time, and observed actions.",
      media: "Find the perfect B-roll of a sunset over a cityscape, locate every interview where a guest mentioned a specific topic, or pull together highlight reels from live event recordings.",
    },
  },
  {
    id: "alerts",
    icon: ShieldAlert,
    image: capabilityAlertsImg,
    title: "Smart Video Surveillance & Alerts",
    shortDesc: "Define custom rules and get real-time alerts from live feeds.",
    description:
      "Set up intelligent monitoring rules in plain language — \"Alert me if someone enters Zone B after 10 PM\" — and receive instant notifications. No complex configuration, just describe what matters.",
    sectors: {
      security: "Define rules like \"alert if someone lingers near the server room for more than 2 minutes after hours\" or \"notify me when a vehicle stops in the no-parking zone.\" Instant push notifications with timestamped clips.",
      health: "Set up monitors such as \"alert if a patient in Room 204 hasn't moved for 30 minutes\" or \"notify nursing staff when someone approaches the medication cabinet outside scheduled rounds.\"",
      legal: "Automate evidence integrity with rules like \"alert if the evidence locker is accessed without a sign-in\" or \"flag any courtroom footage where exhibits are handled without gloves.\"",
      media: "Monitor live broadcasts with rules like \"alert if the lower-third graphic is missing for more than 10 seconds\" or \"flag any segment containing unblurred faces.\"",
    },
  },
];

const sectors = [
  { id: "security", label: "Security", icon: Building2 },
  { id: "health", label: "Healthcare", icon: HeartPulse },
  { id: "legal", label: "Legal", icon: Scale },
  { id: "media", label: "Media", icon: Film },
];

const Solutions = () => {
  const [activeSector, setActiveSector] = useState("security");
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onGetStarted={() => setIsLeadFormOpen(true)} />

      {/* Full-bleed cinematic hero */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={solutionsHeroBg}
            alt="AI surveillance command center"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
        </div>

        <div className="container mx-auto px-6 pb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-primary font-medium tracking-wide uppercase">Industry Solutions</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
              Making Video Data{" "}
              <span className="text-gradient">Actionable</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
              Two powerful AI capabilities — adapted to the unique challenges of your sector.
              From security operations to healthcare compliance.
            </p>

            <Button variant="hero" size="xl" onClick={() => setIsLeadFormOpen(true)}>
              Get Started
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Sector selector — sticky pill bar */}
      <section className="sticky top-[73px] z-40 py-4 bg-background/80 backdrop-blur-xl border-b border-border/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {sectors.map((sector) => {
              const isActive = activeSector === sector.id;
              return (
                <button
                  key={sector.id}
                  onClick={() => setActiveSector(sector.id)}
                  className={`relative flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <sector.icon className="w-4 h-4" />
                  {sector.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Capabilities — alternating layout with images */}
      <section className="py-20">
        <div className="container mx-auto px-6 space-y-24">
          <AnimatePresence mode="wait">
            {capabilities.map((cap, index) => {
              const isReversed = index % 2 === 1;
              return (
                <motion.div
                  key={`${cap.id}-${activeSector}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${isReversed ? "lg:[direction:rtl]" : ""}`}>
                    {/* Image side */}
                    <div className={`${isReversed ? "lg:[direction:ltr]" : ""}`}>
                      <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-glow-secondary/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative rounded-2xl overflow-hidden border border-border/30">
                          <img
                            src={cap.image}
                            alt={cap.title}
                            className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                          <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30">
                            <cap.icon className="w-4 h-4 text-primary" />
                            <span className="text-xs font-medium text-primary">{cap.shortDesc.split(" ").slice(0, 4).join(" ")}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content side */}
                    <div className={`space-y-6 ${isReversed ? "lg:[direction:ltr]" : ""}`}>
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-glow-secondary flex items-center justify-center">
                            <cap.icon className="w-6 h-6 text-primary-foreground" />
                          </div>
                          <h2 className="text-2xl md:text-3xl font-bold">{cap.title}</h2>
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-base">{cap.description}</p>
                      </div>

                      {/* Sector-specific use case */}
                      <div className="bg-glass rounded-xl p-6 border border-border/30">
                        <div className="flex items-center gap-2 mb-3">
                          <ChevronRight className="w-4 h-4 text-primary" />
                          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                            {sectors.find((s) => s.id === activeSector)?.label} Use Case
                          </span>
                        </div>
                        <AnimatePresence mode="wait">
                          <motion.p
                            key={`${cap.id}-${activeSector}-text`}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.25 }}
                            className="text-foreground/90 leading-relaxed"
                          >
                            {cap.sectors[activeSector as keyof typeof cap.sectors]}
                          </motion.p>
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative max-w-3xl mx-auto"
          >
            <div className="absolute -inset-8 bg-gradient-to-r from-primary/10 via-glow-secondary/10 to-primary/10 rounded-3xl blur-3xl" />
            <div className="relative bg-glass rounded-2xl p-12 md:p-16 border border-border/30">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to transform your{" "}
                <span className="text-gradient">video workflow</span>?
              </h2>
              <p className="text-muted-foreground mb-8 text-lg max-w-xl mx-auto">
                Get early access and see how Astuse adapts to your industry.
              </p>
              <Button variant="hero" size="xl" onClick={() => setIsLeadFormOpen(true)}>
                Request Early Access
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <LeadForm isOpen={isLeadFormOpen} onClose={() => setIsLeadFormOpen(false)} />
    </div>
  );
};

export default Solutions;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShieldAlert, Building2, HeartPulse, Scale, Film, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import LeadForm from "@/components/LeadForm";

const capabilities = [
  {
    id: "search",
    icon: Search,
    title: "Natural Language Video Search",
    shortDesc: "Search across thousands of hours of footage using plain language.",
    description:
      "Ask questions like \"Show me every time a red truck appeared last week\" and get instant, precise results from your entire video library. No tagging, no manual indexing — just AI that understands what you're looking for.",
    sectors: {
      security: "Instantly retrieve footage of specific incidents, people, or vehicles across all your cameras.",
      health: "Find specific surgical procedures, patient interactions, or training moments in medical video archives.",
      legal: "Search deposition recordings, body-cam footage, or surveillance evidence by describing what you need.",
      media: "Locate the exact shot, scene, or interview across your entire production library in seconds.",
    },
  },
  {
    id: "alerts",
    icon: ShieldAlert,
    title: "Smart Video Surveillance & Alerts",
    shortDesc: "Define custom rules and get real-time alerts from live feeds.",
    description:
      "Set up intelligent monitoring rules in plain language — \"Alert me if someone enters Zone B after 10 PM\" — and receive instant notifications. No complex configuration, just describe what matters to you.",
    sectors: {
      security: "Detect unauthorized access, perimeter breaches, or unusual crowd behavior and trigger instant alerts.",
      health: "Monitor patient rooms for falls, unusual inactivity, or equipment tampering with real-time notifications.",
      legal: "Track chain-of-custody compliance and courtroom activity with automated rule-based alerts.",
      media: "Monitor live broadcasts for content policy violations or detect specific on-screen events in real time.",
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
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-glass border-b border-border/30"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-glow-secondary flex items-center justify-center">
              <Play className="w-5 h-5 text-primary-foreground fill-current" />
            </div>
            <span className="text-xl font-bold text-foreground">Astuse</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            <Link to="/solutions" className="text-foreground font-medium">Solutions</Link>
          </div>

          <Button variant="hero" size="lg" onClick={() => setIsLeadFormOpen(true)}>
            Get Started
          </Button>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-glow-secondary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Solutions for <span className="text-gradient">Every Industry</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Two powerful AI capabilities — adapted to the unique challenges of your sector.
          </motion.p>
        </div>
      </section>

      {/* Sector selector */}
      <section className="pb-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {sectors.map((sector) => {
              const isActive = activeSector === sector.id;
              return (
                <button
                  key={sector.id}
                  onClick={() => setActiveSector(sector.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                    isActive
                      ? "bg-primary/15 border-primary/50 text-foreground shadow-lg shadow-primary/10"
                      : "border-border/40 text-muted-foreground hover:border-primary/30 hover:text-foreground"
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

      {/* Capabilities */}
      <section className="py-12">
        <div className="container mx-auto px-6 space-y-10">
          <AnimatePresence mode="wait">
            {capabilities.map((cap, index) => (
              <motion.div
                key={`${cap.id}-${activeSector}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-glass rounded-2xl p-8 md:p-10 border border-border/30"
              >
                <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 items-start">
                  {/* Left: capability info */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-primary to-glow-secondary flex items-center justify-center">
                        <cap.icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <h2 className="text-xl font-bold">{cap.title}</h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{cap.description}</p>
                  </div>

                  {/* Right: sector-specific use case */}
                  <div className="bg-background/40 rounded-xl p-6 border border-border/20">
                    <div className="flex items-center gap-2 mb-3">
                      <ChevronRight className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-primary uppercase tracking-wide">
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
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-glass rounded-2xl p-10 border border-border/30 max-w-2xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Ready to transform your <span className="text-gradient">video workflow</span>?
            </h2>
            <p className="text-muted-foreground mb-6">
              Get early access and see how Astuse adapts to your industry.
            </p>
            <Button variant="hero" size="xl" onClick={() => setIsLeadFormOpen(true)}>
              Request Early Access
            </Button>
          </motion.div>
        </div>
      </section>

      <LeadForm isOpen={isLeadFormOpen} onClose={() => setIsLeadFormOpen(false)} />
    </div>
  );
};

export default Solutions;

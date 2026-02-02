import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Video, Eye, Zap } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-glow-secondary/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass border border-primary/30">
              <Video className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">AI-Powered Video Intelligence</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Unlock Insights from{" "}
              <span className="text-gradient">Every Frame</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg">
              Transform your video library into actionable intelligence. Astuse analyzes hours of footage in seconds, helping decision-makers act faster with real-time streaming alerts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" onClick={onGetStarted}>
                <Zap className="w-5 h-5" />
                Start Free Trial
              </Button>
              <Button variant="heroOutline" size="xl">
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-xs font-medium">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Trusted by 500+ teams</p>
                <p className="text-xs text-muted-foreground">Processing 1M+ hours of video</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-glow-secondary/30 rounded-2xl blur-2xl" />
              <div className="relative bg-glass rounded-2xl p-6 border border-border/50">
                <div className="aspect-video bg-secondary/50 rounded-lg overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-sm border border-primary/30">
                      <Play className="w-8 h-8 text-primary fill-current ml-1" />
                    </div>
                  </div>
                  {/* Video scan lines effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-destructive/90 text-destructive-foreground text-xs font-medium flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    LIVE
                  </div>
                </div>
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <Eye className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Motion Detected</p>
                      <p className="text-xs text-muted-foreground">Zone A - 2 seconds ago</p>
                    </div>
                    <span className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs">Alert</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <Video className="w-5 h-5 text-glow-secondary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Analyzing Stream</p>
                      <p className="text-xs text-muted-foreground">Processing 24 fps</p>
                    </div>
                    <span className="px-2 py-1 rounded-full bg-glow-secondary/20 text-glow-secondary text-xs">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

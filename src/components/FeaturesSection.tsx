import { motion } from "framer-motion";
import { Video, Bell, FileSearch, Zap, Library, Eye } from "lucide-react";

const features = [
  {
    icon: Library,
    title: "Massive Video Library Analysis",
    description: "Process thousands of hours of video content in minutes. Extract key moments, patterns, and insights from your entire archive.",
    gradient: "from-primary to-primary/50",
  },
  {
    icon: Bell,
    title: "Live Stream Notifications",
    description: "Get real-time alerts from your security cameras and live feeds. Never miss critical events with intelligent motion and object detection.",
    gradient: "from-glow-secondary to-glow-secondary/50",
  },
  {
    icon: Eye,
    title: "Smart Object Recognition",
    description: "Automatically identify people, vehicles, and objects across all your video content with state-of-the-art computer vision.",
    gradient: "from-primary to-glow-secondary",
  },
  {
    icon: FileSearch,
    title: "Document Intelligence",
    description: "Beyond video—analyze PDFs, images, and documents. Unified AI that understands all your content in one place.",
    gradient: "from-glow-secondary to-primary",
  },
  {
    icon: Zap,
    title: "Instant Insights",
    description: "Ask questions in natural language and get answers instantly. 'Show me all delivery trucks from last Tuesday.'",
    gradient: "from-primary/80 to-glow-secondary/80",
  },
  {
    icon: Video,
    title: "Multi-Camera Sync",
    description: "Correlate events across multiple camera feeds. Track subjects as they move through your entire camera network.",
    gradient: "from-glow-secondary/80 to-primary/80",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Video Intelligence at <span className="text-gradient">Scale</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From archived footage to live streams, Astuse transforms how you understand and act on visual data.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-glass rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

import { motion } from "framer-motion";
import { assetUrl } from "@/lib/utils";

const PartnersSection = () => {
  const partners = [
    { name: "La base", logo: "/partners/logo_labase.png" },
  ];

  return (
    <section id="partners" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Backed By</p>
          <h2 className="text-2xl md:text-3xl font-bold">
            Our Partners & Incubators
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
            >
              <div className="w-32 h-20 md:w-40 md:h-24 bg-glass rounded-xl flex items-center justify-center border border-border/50 hover:border-primary/30 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/5 p-4">
                <img
                  src={assetUrl(partner.logo)}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          Join the startups shaping the future of video intelligence
        </motion.p>
      </div>
    </section>
  );
};

export default PartnersSection;

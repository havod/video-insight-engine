import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Send, CheckCircle } from "lucide-react";

interface LeadFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeadForm = ({ isOpen, onClose }: LeadFormProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your backend
    console.log("Lead submitted:", { name, email, company, message });
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setEmail("");
      setName("");
      setCompany("");
      setMessage("");
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-2rem)] max-w-md"
          >
            <div className="bg-glass rounded-2xl p-8 border border-border/50 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold">Get Early Access</h3>
                  <p className="text-sm text-muted-foreground">Start your free trial today</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center py-8"
                >
                  <CheckCircle className="w-16 h-16 text-primary mb-4" />
                  <p className="text-lg font-medium">Thank you!</p>
                  <p className="text-sm text-muted-foreground">We'll be in touch soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-secondary/50 border-border/50 focus:border-primary"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Work email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-secondary/50 border-border/50 focus:border-primary"
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      placeholder="Company name"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="bg-secondary/50 border-border/50 focus:border-primary"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Your message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      className="w-full rounded-md bg-secondary/50 border border-border/50 focus:border-primary px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                    />
                  </div>
                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    <Send className="w-4 h-4" />
                    Request Access
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    By submitting, you agree to our terms of service.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LeadForm;

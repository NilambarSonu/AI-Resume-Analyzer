import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Background3D } from "@/components/layout/background-3d";
import { UploadZone } from "@/components/upload-zone";
import { useAnalyzeResume } from "@/hooks/use-analyze";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [_, setLocation] = useLocation();
  const { mutate: analyze, isPending } = useAnalyzeResume();
  const { toast } = useToast();
  
  const handleFileSelect = (file: File) => {
    const formData = new FormData();
    formData.append("resume", file);

    analyze(formData, {
      onSuccess: (data) => {
        // In a real app we might store this in context or a store
        // For now, we'll pass it via location state using history API directly or 
        // rely on a global state solution. Since wouter doesn't support state 
        // in navigation easily, let's use localStorage for this prototype.
        localStorage.setItem("analysisResult", JSON.stringify(data));
        setLocation("/results");
      },
      onError: (error) => {
        toast({
          title: "Analysis Failed",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-4">
      <Background3D />
      
      <div className="relative z-10 w-full max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-500 text-glow tracking-tight cursor-default">
              AI CAREER <br className="hidden md:block" />
              <span className="text-primary">ARCHITECT</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground font-mono max-w-2xl mx-auto"
          >
            OPTIMIZE YOUR PROFESSIONAL PROFILE AGAINST GLOBAL MARKET DATA
          </motion.p>
        </div>

        {/* Interactive Zone */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
          <UploadZone onFileSelect={handleFileSelect} isAnalyzing={isPending} />
        </motion.div>

        {/* Footer Stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center gap-8 md:gap-16 pt-8 border-t border-white/5"
        >
          <div className="text-center">
            <div className="text-2xl font-display font-bold text-white">98%</div>
            <div className="text-xs font-mono text-primary uppercase">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-display font-bold text-white">2.4s</div>
            <div className="text-xs font-mono text-primary uppercase">Latency</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-display font-bold text-white">50k+</div>
            <div className="text-xs font-mono text-primary uppercase">Profiles</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

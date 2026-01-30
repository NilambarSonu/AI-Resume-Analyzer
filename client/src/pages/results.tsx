import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Check, X, ArrowRight, Download, Share2, Target, Brain, Code2, AlertTriangle, Loader2 } from "lucide-react";
import { Background3D } from "@/components/layout/background-3d";
import { CyberButton } from "@/components/ui/button-cyber";
import { ScoreChart } from "@/components/charts/score-chart";
import { SkillsRadar } from "@/components/charts/skills-radar";
import { type AnalysisResult } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function Results() {
  const [_, setLocation] = useLocation();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem("analysisResult");
    if (!stored) {
      setLocation("/");
      return;
    }
    setResult(JSON.parse(stored));
  }, [setLocation]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My AI Career Analysis',
        text: `I just analyzed my resume and got a match score of ${result?.score}%!`,
        url: window.location.href,
      }).catch(() => {
        toast({
          title: "Link Copied",
          description: "Analysis report link copied to clipboard.",
        });
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Analysis report link copied to clipboard.",
      });
    }
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    // Simulate PDF generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const blob = new Blob(["AI Career Architect - Report Content"], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `career-report-${new Date().getTime()}.pdf`;
    a.click();
    
    setIsExporting(false);
    toast({
      title: "Export Complete",
      description: "Your PDF report has been downloaded.",
    });
  };

  const handleGenerateResume = async () => {
    setIsGenerating(true);
    // Simulate AI resume generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
    
    toast({
      title: "Resume Generated",
      description: "A new optimized resume version is ready for review.",
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (!result) return null;

  return (
    <div className="min-h-screen bg-background text-foreground pb-12">
      <Background3D />
      
      {/* Navigation Bar */}
      <div className="sticky top-0 z-50 glass-panel border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setLocation("/")}>
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-black font-bold font-display">
            AI
          </div>
          <span className="font-display font-bold tracking-wider hidden md:block">CAREER ARCHITECT</span>
        </div>
        <div className="flex gap-4">
          <CyberButton 
            variant="outline" 
            className="hidden md:flex text-xs px-4 py-2 h-auto"
            onClick={handleShare}
          >
            <Share2 className="w-3 h-3 mr-2" /> Share Report
          </CyberButton>
          <CyberButton 
            variant="primary" 
            className="text-xs px-4 py-2 h-auto"
            onClick={handleExportPDF}
            disabled={isExporting}
          >
            {isExporting ? <Loader2 className="w-3 h-3 mr-2 animate-spin" /> : <Download className="w-3 h-3 mr-2" />}
            {isExporting ? "Exporting..." : "Export PDF"}
          </CyberButton>
        </div>
      </div>

      <main className="container mx-auto px-4 pt-8">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {/* Main Score Card - Top Left */}
          <motion.div 
            variants={item}
            className="lg:col-span-4 glass-panel rounded-xl p-6 min-h-[300px] flex flex-col relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-50">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-display text-primary mb-4">OVERALL MATCH</h3>
            <div className="flex-1">
              <ScoreChart score={result.score} />
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm font-mono text-muted-foreground">
                Your profile ranks in the top <span className="text-white font-bold">{100 - result.score}%</span> of candidates
              </p>
            </div>
          </motion.div>

          {/* Radar Chart - Top Middle */}
          <motion.div 
            variants={item}
            className="lg:col-span-5 glass-panel rounded-xl p-6 min-h-[300px] flex flex-col"
          >
            <h3 className="text-lg font-display text-secondary mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5" />
              SKILL VECTORS
            </h3>
            <div className="flex-1 w-full h-[250px]">
              <SkillsRadar data={result.chart_data} />
            </div>
          </motion.div>

          {/* Quick Stats - Top Right */}
          <motion.div variants={item} className="lg:col-span-3 space-y-6">
            <div className="glass-panel rounded-xl p-6 flex flex-col gap-2 relative overflow-hidden">
               <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/20 blur-2xl rounded-full" />
               <span className="text-xs font-mono text-muted-foreground">KEYWORD MATCHES</span>
               <span className="text-4xl font-display font-bold text-white">{result.matches.length}</span>
               <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                 <div className="h-full bg-primary w-[70%]" />
               </div>
            </div>
            <div className="glass-panel rounded-xl p-6 flex flex-col gap-2 relative overflow-hidden">
               <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-500/20 blur-2xl rounded-full" />
               <span className="text-xs font-mono text-muted-foreground">MISSING CRITICAL</span>
               <span className="text-4xl font-display font-bold text-white">{result.missing.length}</span>
               <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                 <div className="h-full bg-red-500 w-[30%]" />
               </div>
            </div>
          </motion.div>

          {/* Detailed Lists - Bottom Row */}
          <motion.div variants={item} className="lg:col-span-8 glass-panel rounded-xl p-8">
            <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
              <Code2 className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-display text-white">TECHNICAL ANALYSIS</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-mono text-sm text-primary mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  DETECTED SKILLS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.matches.map((skill, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono flex items-center gap-1 hover:bg-primary/20 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all cursor-default"
                    >
                      <Check className="w-3 h-3" /> {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-mono text-sm text-red-400 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                  MISSING KEYWORDS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.missing.map((skill, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-mono flex items-center gap-1 hover:bg-red-500/20 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all cursor-default"
                    >
                      <X className="w-3 h-3" /> {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recommendations / Next Steps - Bottom Right */}
          <motion.div variants={item} className="lg:col-span-4 glass-panel rounded-xl p-8 bg-gradient-to-br from-white/5 to-transparent">
             <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <h3 className="text-xl font-display text-white">ACTION PLAN</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/5 hover:border-primary/30 transition-colors group">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5 text-primary text-xs font-bold">1</div>
                  <div>
                    <h5 className="font-bold text-white text-sm group-hover:text-primary transition-colors">Add Missing Keywords</h5>
                    <p className="text-xs text-muted-foreground mt-1">
                      Integrate <span className="text-red-300">{result.missing.slice(0, 3).join(", ")}</span> into your experience bullets.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/5 hover:border-primary/30 transition-colors group">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5 text-primary text-xs font-bold">2</div>
                  <div>
                    <h5 className="font-bold text-white text-sm group-hover:text-primary transition-colors">Quantify Achievements</h5>
                    <p className="text-xs text-muted-foreground mt-1">
                      Add metrics (%, $) to your recent roles to increase impact score.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 mt-4">
                 <motion.div
                   animate={{ scale: [1, 1.02, 1] }}
                   transition={{ duration: 2, repeat: Infinity }}
                 >
                   <CyberButton 
                     className="w-full text-xs"
                     onClick={handleGenerateResume}
                     disabled={isGenerating}
                   >
                      {isGenerating ? <Loader2 className="w-3 h-3 mr-2 animate-spin" /> : <ArrowRight className="w-3 h-3 mr-2" />}
                      {isGenerating ? "GENERATING..." : "GENERATE NEW RESUME"}
                   </CyberButton>
                 </motion.div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </main>
    </div>
  );
}

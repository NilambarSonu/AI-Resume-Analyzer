import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Check, X, ArrowRight, Download, Share2, Target, Brain, Code2, AlertTriangle, Loader2 } from "lucide-react";
import { Background3D } from "@/components/layout/background-3d";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScoreChart } from "@/components/charts/score-chart";
import { SkillsRadar } from "@/components/charts/skills-radar";
import { type AnalysisResult } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

import { Badge } from "@/components/ui/badge";

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
        staggerChildren: 0.1
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
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border px-sp-6 py-sp-4 flex items-center justify-between">
        <div className="flex items-center gap-sp-2 cursor-pointer group" onClick={() => setLocation("/")}>
          <div className="w-8 h-8 rounded-sm bg-primary flex items-center justify-center text-primary-foreground font-bold font-headline text-xl group-hover:glow-gold-sm transition-all">
            A
          </div>
          <span className="font-headline font-bold text-2xl tracking-tight hidden md:block">Career Architect</span>
        </div>
        <div className="flex gap-sp-4">
          <Button 
            variant="ghost" 
            size="sm"
            className="hidden md:flex uppercase tracking-[1px] text-[11px]"
            onClick={handleShare}
          >
            <Share2 className="w-3 h-3 mr-2" /> Share Report
          </Button>
          <Button 
            variant="default" 
            size="sm"
            className="uppercase tracking-[1px] text-[11px]"
            onClick={handleExportPDF}
            disabled={isExporting}
          >
            {isExporting ? <Loader2 className="w-3 h-3 mr-2 animate-spin" /> : <Download className="w-3 h-3 mr-2" />}
            {isExporting ? "Exporting..." : "Export PDF"}
          </Button>
        </div>
      </div>

      <main className="container mx-auto px-sp-4 pt-sp-8">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-12 gap-sp-6"
        >
          {/* Main Score Card - Top Left */}
          <motion.div 
            variants={item}
            className="lg:col-span-4"
          >
            <Card elevated className="h-full flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-sp-4 opacity-20">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <CardHeader>
                <CardTitle className="text-primary text-xl">Overall Match</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col items-center">
                <div className="flex-1 w-full min-h-[200px]">
                  <ScoreChart score={result.score} />
                </div>
                <div className="mt-sp-4 text-center">
                  <p className="text-sm font-sans font-light text-foreground/60 uppercase tracking-[0.5px]">
                    Profile Ranking: Top <span className="text-primary font-medium">{100 - result.score}%</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Radar Chart - Top Middle */}
          <motion.div 
            variants={item}
            className="lg:col-span-5"
          >
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-sp-2">
                  <Brain className="w-5 h-5 text-primary" />
                  Skill Vectors
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 w-full h-[250px]">
                <SkillsRadar data={result.chart_data} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Stats - Top Right */}
          <motion.div variants={item} className="lg:col-span-3 space-y-sp-6">
            <Card className="flex flex-col gap-sp-2 relative overflow-hidden">
               <span className="text-[11px] font-sans font-medium text-foreground/40 uppercase tracking-[1px]">Keyword Matches</span>
               <span className="text-4xl font-headline font-bold text-foreground">{result.matches.length}</span>
               <div className="w-full h-1 bg-white/5 rounded-full mt-sp-2 overflow-hidden">
                 <div className="h-full bg-primary w-[70%] shadow-[0_0_8px_rgba(201,168,76,0.3)]" />
               </div>
            </Card>
            <Card className="flex flex-col gap-sp-2 relative overflow-hidden">
               <span className="text-[11px] font-sans font-medium text-foreground/40 uppercase tracking-[1px]">Missing Critical</span>
               <span className="text-4xl font-headline font-bold text-foreground">{result.missing.length}</span>
               <div className="w-full h-1 bg-white/5 rounded-full mt-sp-2 overflow-hidden">
                 <div className="h-full bg-error w-[30%] shadow-[0_0_8px_rgba(239,68,68,0.3)]" />
               </div>
            </Card>
          </motion.div>

          {/* Detailed Lists - Bottom Row */}
          <motion.div variants={item} className="lg:col-span-8">
            <Card className="p-sp-8">
              <div className="flex items-center gap-sp-2 mb-sp-6 border-b border-border pb-sp-4">
                <Code2 className="w-5 h-5 text-primary" />
                <CardTitle className="text-2xl">Technical Analysis</CardTitle>
              </div>
              
              <div className="grid md:grid-cols-2 gap-sp-8">
                <div>
                  <h4 className="text-[12px] font-sans font-medium text-primary uppercase tracking-[2px] mb-sp-4 flex items-center gap-sp-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Detected Skills
                  </h4>
                  <div className="flex flex-wrap gap-sp-2">
                    {result.matches.map((skill, i) => (
                      <Badge key={i} variant="success" className="bg-success/5 border-success/20">
                        <Check className="w-3 h-3 mr-1" /> {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[12px] font-sans font-medium text-error uppercase tracking-[2px] mb-sp-4 flex items-center gap-sp-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-error" />
                    Missing Keywords
                  </h4>
                  <div className="flex flex-wrap gap-sp-2">
                    {result.missing.map((skill, i) => (
                      <Badge key={i} variant="destructive" className="bg-error/5 border-error/20">
                        <X className="w-3 h-3 mr-1" /> {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Recommendations / Next Steps - Bottom Right */}
          <motion.div variants={item} className="lg:col-span-4">
            <Card className="h-full flex flex-col">
               <div className="flex items-center gap-sp-2 mb-sp-6 border-b border-border pb-sp-4">
                <AlertTriangle className="w-5 h-5 text-warning" />
                <CardTitle className="text-2xl">Action Plan</CardTitle>
              </div>
              
              <div className="space-y-sp-4 flex-1">
                <div className="p-sp-4 rounded-md border border-border hover:border-primary/30 transition-colors group bg-input/50">
                  <div className="flex items-start gap-sp-3">
                    <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 text-primary text-[11px] font-bold border border-primary/20">1</div>
                    <div>
                      <h5 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors uppercase tracking-[0.5px]">Add Missing Keywords</h5>
                      <p className="text-[12px] text-foreground/60 mt-sp-1 font-light">
                        Integrate <span className="text-primary/80">{result.missing.slice(0, 3).join(", ")}</span> into your experience bullets.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-sp-4 rounded-md border border-border hover:border-primary/30 transition-colors group bg-input/50">
                  <div className="flex items-start gap-sp-3">
                    <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 text-primary text-[11px] font-bold border border-primary/20">2</div>
                    <div>
                      <h5 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors uppercase tracking-[0.5px]">Quantify Achievements</h5>
                      <p className="text-[12px] text-foreground/60 mt-sp-1 font-light">
                        Add metrics (%, $) to your recent roles to increase impact score.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-sp-8">
                 <Button 
                   className="w-full uppercase tracking-[1px]"
                   size="lg"
                   onClick={handleGenerateResume}
                   disabled={isGenerating}
                 >
                    {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <ArrowRight className="w-4 h-4 mr-2" />}
                    {isGenerating ? "GENERATING..." : "GENERATE NEW RESUME"}
                 </Button>
              </div>
            </Card>
          </motion.div>

        </motion.div>
      </main>
    </div>
  );
}

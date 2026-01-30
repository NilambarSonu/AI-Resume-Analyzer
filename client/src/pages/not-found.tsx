import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";
import { CyberButton } from "@/components/ui/button-cyber";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="glass-panel p-12 rounded-xl text-center max-w-md w-full border border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.1)]">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-red-500/50">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        
        <h1 className="text-4xl font-display font-bold text-white mb-2">404</h1>
        <h2 className="text-xl font-mono text-red-400 mb-6 tracking-wider">SYSTEM ERROR // PAGE LOST</h2>
        
        <p className="text-muted-foreground mb-8 text-sm">
          The requested navigational vector does not exist in the current grid. 
          Please return to the main interface.
        </p>

        <Link href="/">
          <CyberButton variant="danger" className="w-full">
            RETURN TO BASE
          </CyberButton>
        </Link>
      </div>
    </div>
  );
}

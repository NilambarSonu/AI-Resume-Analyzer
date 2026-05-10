import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground p-4">
      <Card className="p-12 text-center max-w-md w-full border-error/30 glow-gold-sm">
        <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-error/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
          <AlertTriangle className="w-10 h-10 text-error" />
        </div>

        <h1 className="text-5xl font-headline font-bold text-foreground mb-2">404</h1>
        <h2 className="text-xl font-sans text-error mb-6 tracking-[2px] uppercase font-light">Navigational Error</h2>

        <p className="text-foreground/60 mb-8 text-[13px] font-sans font-light leading-relaxed">
          The requested navigational vector does not exist in the current grid.
          Please return to the main interface.
        </p>

        <Link href="/">
          <Button variant="default" className="w-full uppercase tracking-[1px]">
            Return to Base
          </Button>
        </Link>
      </Card>
    </div>
  );
}


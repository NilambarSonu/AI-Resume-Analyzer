import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, ScanLine, BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isAnalyzing?: boolean;
}

export function UploadZone({ onFileSelect, isAnalyzing }: UploadZoneProps) {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.[0]) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    disabled: isAnalyzing
  });

  const handleAnalyze = () => {
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card elevated className="overflow-hidden p-sp-8">
        <div
          {...getRootProps()}
          className={cn(
            "relative border-2 border-dashed rounded-md p-sp-8 transition-all duration-300 flex flex-col items-center justify-center gap-sp-4 cursor-pointer min-h-[300px]",
            isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-white/5",
            file ? "border-primary/50 bg-primary/5" : ""
          )}
        >
          <input {...getInputProps()} />

          <AnimatePresence mode="wait">
            {isAnalyzing ? (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center space-y-sp-6"
              >
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-t-primary border-r-transparent border-b-primary border-l-transparent rounded-full"
                  />
                  <BrainCircuit className="w-10 h-10 text-primary animate-pulse" />
                </div>
                <div className="space-y-sp-2">
                  <h3 className="text-2xl font-headline text-primary">Analyzing Profile</h3>
                  <p className="font-sans font-light text-foreground/60 text-sm uppercase tracking-[1px]">
                    Optimizing career vectors...
                  </p>
                </div>
              </motion.div>
            ) : file ? (
              <motion.div
                key="file-selected"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center text-center space-y-sp-4"
              >
                <div className="w-16 h-16 rounded-md bg-primary/10 flex items-center justify-center border border-primary/20 glow-gold-sm">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-headline text-foreground">{file.name}</h3>
                  <p className="text-sm text-foreground/60 font-sans font-light uppercase tracking-[0.5px]">
                    {(file.size / 1024 / 1024).toFixed(2)} MB • READY FOR ANALYSIS
                  </p>
                </div>
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAnalyze();
                  }}
                  className="mt-sp-4"
                  size="lg"
                >
                  <ScanLine className="w-4 h-4 mr-2" />
                  INITIATE ANALYSIS
                </Button>
                <button 
                  className="text-[11px] text-foreground/40 hover:text-foreground/80 transition-colors mt-sp-2 uppercase tracking-[1px]" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                >
                    Replace File
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center space-y-sp-4"
              >
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-sp-4 group-hover:bg-primary/10 transition-all duration-500 border border-transparent group-hover:border-primary/20">
                  <Upload className="w-10 h-10 text-foreground/40 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-3xl font-headline text-foreground group-hover:text-primary transition-colors">UPLOAD RESUME</h3>
                <p className="text-foreground/60 max-w-sm font-sans font-light uppercase tracking-[0.5px]">
                  Drag & drop your PDF, DOCX, or TXT file here.
                  <br />
                  <span className="text-[11px] font-sans font-medium text-primary/70 mt-sp-2 block uppercase tracking-[2px]">
                    PREMIUM SECURE PROCESSING
                  </span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
}

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle, AlertCircle, ScanLine, BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";
import { CyberButton } from "./ui/button-cyber";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isAnalyzing?: boolean;
}

export function UploadZone({ onFileSelect, isAnalyzing }: UploadZoneProps) {
  const [file, setFile] = useState<File | null>(null);
  const [scanStep, setScanStep] = useState<string>("Ready for input");

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
    <div className="w-full max-w-2xl mx-auto p-1">
      {/* Decorative corners */}
      <div className="relative glass-panel rounded-xl overflow-hidden p-8">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary" />

        <div
          {...getRootProps()}
          className={cn(
            "relative border-2 border-dashed rounded-lg p-12 transition-all duration-300 flex flex-col items-center justify-center gap-4 cursor-pointer min-h-[300px]",
            isDragActive ? "border-primary bg-primary/5 scale-[1.02]" : "border-white/10 hover:border-primary/50 hover:bg-white/5",
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
                className="flex flex-col items-center text-center space-y-6"
              >
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-t-primary border-r-transparent border-b-primary border-l-transparent rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 border-4 border-t-secondary border-r-transparent border-b-secondary border-l-transparent rounded-full"
                  />
                  <BrainCircuit className="w-10 h-10 text-white animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-display text-primary animate-pulse">NEURAL SCAN ACTIVE</h3>
                  <p className="font-mono text-muted-foreground text-sm">
                    Decoding resume vectors...
                  </p>
                </div>
              </motion.div>
            ) : file ? (
              <motion.div
                key="file-selected"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center ring-1 ring-primary">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{file.name}</h3>
                  <p className="text-sm text-muted-foreground font-mono">
                    {(file.size / 1024 / 1024).toFixed(2)} MB • READY FOR SCAN
                  </p>
                </div>
                <CyberButton 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAnalyze();
                  }}
                  className="mt-4"
                >
                  <ScanLine className="w-4 h-4 mr-2" />
                  INITIATE ANALYSIS
                </CyberButton>
                <p className="text-xs text-muted-foreground hover:text-white transition-colors" onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                }}>
                    Cancel / Replace File
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Upload className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white">UPLOAD RESUME</h3>
                <p className="text-muted-foreground max-w-sm">
                  Drag & drop your PDF, DOCX, or TXT file here.
                  <br />
                  <span className="text-xs font-mono text-primary/70 mt-2 block">
                    SYSTEM SECURE • ENCRYPTION ACTIVE
                  </span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

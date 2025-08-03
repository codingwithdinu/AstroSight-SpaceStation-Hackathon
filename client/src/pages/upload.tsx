import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { ImageUpload } from "@/components/image-upload";
import { LoadingAnimation } from "@/components/loading-animation";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStage, setAnalysisStage] = useState<"uploading" | "detecting" | "analyzing" | "complete">("uploading");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const analysisMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);
      
      setAnalysisStage("uploading");
      const response = await apiRequest('POST', '/api/analyze', formData);
      return response.json();
    },
    onSuccess: (data) => {
      setAnalysisStage("complete");
      setTimeout(() => {
        setIsAnalyzing(false);
        // Store result in sessionStorage to pass to results page
        sessionStorage.setItem('lastAnalysis', JSON.stringify(data));
        setLocation('/results');
      }, 1000);
    },
    onError: (error) => {
      setIsAnalyzing(false);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze image",
        variant: "destructive"
      });
    }
  });

  const startAnalysis = () => {
    if (!selectedFile) {
      toast({
        title: "No Image Selected",
        description: "Please select an image to analyze",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisStage("detecting");
    
    // Simulate stage progression
    setTimeout(() => setAnalysisStage("analyzing"), 2000);
    
    analysisMutation.mutate(selectedFile);
  };

  const clearUpload = () => {
    setSelectedFile(null);
    setIsAnalyzing(false);
  };

  if (isAnalyzing) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 text-primary">Processing Image</h2>
          <p className="text-muted-foreground text-lg">AI analysis in progress</p>
        </div>
        <LoadingAnimation stage={analysisStage} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto fade-in">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-primary">Upload Image for Analysis</h2>
        <p className="text-muted-foreground text-lg">
          Upload images from cameras or sensors for AI-powered object detection and analysis
        </p>
      </div>

      <ImageUpload
        onImageSelect={setSelectedFile}
        isUploading={analysisMutation.isPending}
      />

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mt-12">
        <Button
          variant="secondary"
          onClick={clearUpload}
          disabled={!selectedFile || analysisMutation.isPending}
          className="bg-muted/30 text-muted-foreground hover:bg-muted/50"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Clear Upload
        </Button>
        <Button
          onClick={startAnalysis}
          disabled={!selectedFile || analysisMutation.isPending}
          className="bg-gradient-to-r from-primary to-blue-500 hover:shadow-lg hover:shadow-primary/25 transform hover:scale-105 transition-all duration-300"
        >
          <Play className="mr-2 h-4 w-4" />
          Run Detection
        </Button>
      </div>
    </div>
  );
}

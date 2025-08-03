import { useEffect, useState } from "react";
import { Link } from "wouter";
import { DetectionViewer } from "@/components/detection-viewer";
import { AIAnalysis } from "@/components/ai-analysis";
import { Button } from "@/components/ui/button";
import { Plus, RotateCcw } from "lucide-react";
import { Detection } from "@shared/schema";

export default function Results() {
  const [result, setResult] = useState<Detection & { imageUrl: string } | null>(null);

  useEffect(() => {
    // Get result from sessionStorage
    const storedResult = sessionStorage.getItem('lastAnalysis');
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
  }, []);

  if (!result) {
    return (
      <div className="max-w-4xl mx-auto text-center fade-in">
        <h2 className="text-4xl font-bold mb-4 text-primary">No Results Found</h2>
        <p className="text-muted-foreground text-lg mb-8">
          No analysis results available. Please upload and analyze an image first.
        </p>
        <Link href="/upload">
          <Button className="bg-gradient-to-r from-primary to-blue-500">
            <Plus className="mr-2 h-4 w-4" />
            Upload Image
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto fade-in">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 text-primary">Detection Results</h2>
        <p className="text-muted-foreground text-lg">
          AI-powered analysis completed with object detection and intelligent insights
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Image with Detection Overlays */}
        <div className="lg:col-span-2">
          <DetectionViewer
            imageUrl={result.imageUrl}
            objects={result.detectedObjects}
            confidence={result.confidence}
            processTime={result.processTime}
          />
        </div>

        {/* AI Analysis Panel */}
        <div className="space-y-6">
          <AIAnalysis
            objects={result.detectedObjects}
            analysis={result.geminiAnalysis || "Analysis not available"}
          />

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link href="/upload">
              <Button className="w-full bg-gradient-to-r from-primary to-blue-500 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
                <Plus className="mr-2 h-4 w-4" />
                Analyze New Image
              </Button>
            </Link>
            <Button
              variant="secondary"
              className="w-full bg-muted/30 text-muted-foreground hover:bg-muted/50"
              onClick={() => window.location.reload()}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Re-run Detection
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

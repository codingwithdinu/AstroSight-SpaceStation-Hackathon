import { useState } from "react";
import { DetectedObject } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Crosshair, Download, Eye, EyeOff } from "lucide-react";

interface DetectionViewerProps {
  imageUrl: string;
  objects: DetectedObject[];
  confidence: number;
  processTime: number;
}

export function DetectionViewer({ imageUrl, objects, confidence, processTime }: DetectionViewerProps) {
  const [showBoxes, setShowBoxes] = useState(true);

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center">
          <Crosshair className="text-primary mr-3" />
          Detected Objects
        </h3>
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowBoxes(!showBoxes)}
            className="bg-primary/20 text-primary hover:bg-primary/30"
          >
            {showBoxes ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
            {showBoxes ? "Hide" : "Show"} Boxes
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="bg-muted/30 text-muted-foreground hover:bg-muted/50"
          >
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      </div>
      
      <div className="relative">
        <img
          src={imageUrl}
          alt="Analysis result"
          className="w-full rounded-xl"
        />
        
        {/* Detection Boxes */}
        {showBoxes && objects.map((obj, index) => (
          <div
            key={index}
            className="detection-box"
            style={{
              top: `${obj.bbox.y * 100}%`,
              left: `${obj.bbox.x * 100}%`,
              width: `${obj.bbox.width * 100}%`,
              height: `${obj.bbox.height * 100}%`,
            }}
          >
            <div className="absolute -top-6 left-0 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
              {obj.class} ({(obj.confidence * 100).toFixed(0)}%)
            </div>
          </div>
        ))}
      </div>

      {/* Detection Summary */}
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="text-2xl font-bold text-primary">{objects.length}</div>
          <div className="text-sm text-muted-foreground">Objects Found</div>
        </div>
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-400">
            {(confidence * 100).toFixed(0)}%
          </div>
          <div className="text-sm text-muted-foreground">Avg Confidence</div>
        </div>
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-400">{processTime.toFixed(1)}s</div>
          <div className="text-sm text-muted-foreground">Process Time</div>
        </div>
      </div>
    </div>
  );
}

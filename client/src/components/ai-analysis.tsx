import { useState, useEffect } from "react";
import { DetectedObject } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Copy, Share, Bot, List } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIAnalysisProps {
  objects: DetectedObject[];
  analysis: string;
}

export function AIAnalysis({ objects, analysis }: AIAnalysisProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);
    
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < analysis.length) {
        setDisplayedText(analysis.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [analysis]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(analysis);
      toast({
        title: "Copied!",
        description: "Analysis copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy to clipboard",
        variant: "destructive"
      });
    }
  };

  const shareAnalysis = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "AstroSight Analysis",
          text: analysis,
        });
      } catch (error) {
        // User cancelled or error occurred
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="space-y-6">
      {/* Detected Objects List */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <List className="text-green-400 mr-3" />
          Object List
        </h3>
        
        <div className="space-y-3">
          {objects.map((obj, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
            >
              <div className="flex items-center">
                <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                <span className="font-medium capitalize">
                  {obj.class.replace('_', ' ')}
                </span>
              </div>
              <span className="text-primary font-bold">
                {(obj.confidence * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Gemini AI Analysis */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Bot className="text-purple-400 mr-3" />
          AI Analysis
        </h3>
        
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-500/10 to-primary/10 rounded-xl p-4 border border-purple-500/20">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="text-white h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-purple-300 mb-2">Gemini Analysis</div>
                <p className={`text-foreground leading-relaxed ${isTyping ? 'typing-animation' : ''}`}>
                  {displayedText}
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={copyToClipboard}
              className="flex-1 bg-primary/20 text-primary hover:bg-primary/30"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={shareAnalysis}
              className="flex-1 bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
            >
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

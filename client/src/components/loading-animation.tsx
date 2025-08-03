import { Loader2, Brain, Eye } from "lucide-react";

interface LoadingAnimationProps {
  stage: "uploading" | "detecting" | "analyzing" | "complete";
  progress?: number;
}

export function LoadingAnimation({ stage, progress = 0 }: LoadingAnimationProps) {
  const stages = [
    { key: "uploading", icon: Loader2, label: "Uploading Image", color: "text-primary" },
    { key: "detecting", icon: Eye, label: "YOLOv8 Detection", color: "text-green-400" },
    { key: "analyzing", icon: Brain, label: "Gemini Analysis", color: "text-purple-400" },
  ];

  const currentStageIndex = stages.findIndex(s => s.key === stage);

  return (
    <div className="glass-card rounded-2xl p-8 text-center">
      <div className="flex items-center justify-center mb-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
      
      <h3 className="text-xl font-semibold mb-2">
        {stage === "uploading" && "Uploading Image..."}
        {stage === "detecting" && "Detecting Objects..."}
        {stage === "analyzing" && "Analyzing Image..."}
        {stage === "complete" && "Analysis Complete!"}
      </h3>
      
      <p className="text-muted-foreground mb-6">
        {stage === "uploading" && "Preparing image for analysis"}
        {stage === "detecting" && "AI is identifying objects and components"}
        {stage === "analyzing" && "Generating intelligent insights"}
        {stage === "complete" && "Ready to view results"}
      </p>

      {/* Stage Progress */}
      <div className="flex justify-center space-x-8 text-sm">
        {stages.map((stageInfo, index) => {
          const StageIcon = stageInfo.icon;
          const isActive = index === currentStageIndex;
          const isComplete = index < currentStageIndex;
          
          return (
            <div key={stageInfo.key} className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${
                isComplete
                  ? "bg-green-400"
                  : isActive
                  ? `${stageInfo.color.replace('text-', 'bg-')} animate-pulse`
                  : "bg-muted"
              }`}></div>
              <span className={
                isComplete
                  ? "text-green-400"
                  : isActive
                  ? stageInfo.color
                  : "text-muted-foreground"
              }>
                {stageInfo.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      {progress > 0 && (
        <div className="mt-6">
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary to-purple-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">{progress}% complete</p>
        </div>
      )}
    </div>
  );
}

import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Rocket, Eye, Brain, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="mb-8">
          <img
            src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400"
            alt="Space station interior"
            className="w-full h-64 object-cover rounded-2xl shadow-2xl mb-8"
          />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
          AstroSight
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-4">
          Advanced AI Vision for Space Operations
        </p>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
          Powered by YOLOv8 and Gemini AI, AstroSight helps space station operators instantly detect tools, components, and anomalies from camera feeds with intelligent analysis and detailed descriptions.
        </p>
        
        <Link href="/upload">
          <Button
            size="lg"
            className="pulse-glow bg-gradient-to-r from-primary to-blue-500 hover:shadow-lg hover:shadow-primary/25 transform hover:scale-105 transition-all duration-300"
          >
            <Rocket className="mr-3 h-5 w-5" />
            Start Detection
          </Button>
        </Link>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="glass-card rounded-2xl p-8 text-center hover:transform hover:scale-105 transition-all duration-300">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Eye className="text-primary h-8 w-8" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Object Detection</h3>
          <p className="text-muted-foreground">
            Advanced YOLOv8 computer vision identifies tools, components, and anomalies in real-time.
          </p>
        </div>
        
        <div className="glass-card rounded-2xl p-8 text-center hover:transform hover:scale-105 transition-all duration-300">
          <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Brain className="text-green-400 h-8 w-8" />
          </div>
          <h3 className="text-xl font-semibold mb-4">AI Analysis</h3>
          <p className="text-muted-foreground">
            Gemini AI provides intelligent descriptions and contextual insights for detected objects.
          </p>
        </div>
        
        <div className="glass-card rounded-2xl p-8 text-center hover:transform hover:scale-105 transition-all duration-300">
          <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Zap className="text-purple-400 h-8 w-8" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Mission Critical</h3>
          <p className="text-muted-foreground">
            Designed for time-sensitive operations with intuitive workflows and instant feedback.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="glass-morphism rounded-2xl p-8 grid md:grid-cols-4 gap-8 text-center">
        <div>
          <div className="text-3xl font-bold text-primary mb-2">99.2%</div>
          <div className="text-muted-foreground">Detection Accuracy</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-green-400 mb-2">&lt;2s</div>
          <div className="text-muted-foreground">Processing Time</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
          <div className="text-muted-foreground">Object Classes</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-primary mb-2">24/7</div>
          <div className="text-muted-foreground">Mission Ready</div>
        </div>
      </div>
    </div>
  );
}

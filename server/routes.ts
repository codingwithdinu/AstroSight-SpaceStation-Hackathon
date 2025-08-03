import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDetectionSchema } from "@shared/schema";
import { detectObjects } from "./services/yolo";
import { analyzeImageWithObjects } from "./services/gemini";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  dest: uploadDir,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and WEBP are allowed.'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Upload and analyze image
  app.post('/api/analyze', upload.single('image'), async (req: MulterRequest, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No image file provided' });
      }

      const imagePath = req.file.path;
      
      // Run YOLO detection
      const detectionResult = await detectObjects(imagePath);
      
      // Run Gemini analysis
      const geminiAnalysis = await analyzeImageWithObjects(imagePath, detectionResult.objects);
      
      // Store results
      const detection = await storage.createDetection({
        filename: req.file.originalname,
        originalPath: imagePath,
        detectedObjects: detectionResult.objects,
        geminiAnalysis,
        confidence: detectionResult.confidence,
        processTime: detectionResult.processTime
      });

      res.json({
        id: detection.id,
        objects: detectionResult.objects,
        analysis: geminiAnalysis,
        confidence: detectionResult.confidence,
        processTime: detectionResult.processTime,
        imageUrl: `/api/images/${detection.id}`
      });

    } catch (error) {
      console.error('Analysis error:', error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : 'Analysis failed' 
      });
    }
  });

  // Get detection results
  app.get('/api/detections/:id', async (req, res) => {
    try {
      const detection = await storage.getDetection(req.params.id);
      if (!detection) {
        return res.status(404).json({ message: 'Detection not found' });
      }
      
      res.json({
        ...detection,
        imageUrl: `/api/images/${detection.id}`
      });
    } catch (error) {
      console.error('Get detection error:', error);
      res.status(500).json({ message: 'Failed to retrieve detection' });
    }
  });

  // Serve uploaded images
  app.get('/api/images/:id', async (req, res) => {
    try {
      const detection = await storage.getDetection(req.params.id);
      if (!detection || !fs.existsSync(detection.originalPath)) {
        return res.status(404).json({ message: 'Image not found' });
      }
      
      res.sendFile(path.resolve(detection.originalPath));
    } catch (error) {
      console.error('Image serve error:', error);
      res.status(500).json({ message: 'Failed to serve image' });
    }
  });

  // Get recent detections
  app.get('/api/detections', async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const detections = await storage.getRecentDetections(limit);
      
      res.json(detections.map(detection => ({
        ...detection,
        imageUrl: `/api/images/${detection.id}`
      })));
    } catch (error) {
      console.error('Get detections error:', error);
      res.status(500).json({ message: 'Failed to retrieve detections' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

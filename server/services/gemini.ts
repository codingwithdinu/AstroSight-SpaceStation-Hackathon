import * as fs from "fs";
import { GoogleGenAI } from "@google/genai";
import { DetectedObject } from "@shared/schema";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY || ""
});

export async function analyzeImageWithObjects(
  imagePath: string, 
  detectedObjects: DetectedObject[]
): Promise<string> {
  try {
    const imageBytes = fs.readFileSync(imagePath);
    
    const objectSummary = detectedObjects.map(obj => 
      `${obj.class} (${(obj.confidence * 100).toFixed(1)}% confidence)`
    ).join(", ");

    const contents = [
      {
        inlineData: {
          data: imageBytes.toString("base64"),
          mimeType: "image/jpeg",
        },
      },
      `You are an AI assistant for space station operations. Analyze this image that contains the following detected objects: ${objectSummary}. 

Please provide a detailed analysis focusing on:
1. The context and environment shown in the image
2. The condition and status of detected objects
3. Any potential safety concerns or operational notes
4. Recommendations for space station operators

Keep your analysis professional, concise, and mission-critical focused. This is for real space operations.`,
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: contents,
    });

    return response.text || "Analysis could not be completed at this time.";
  } catch (error) {
    console.error("Gemini analysis error:", error);
    return "AI analysis is temporarily unavailable. Please try again later.";
  }
}

export async function analyzeImageOnly(imagePath: string): Promise<string> {
  try {
    const imageBytes = fs.readFileSync(imagePath);

    const contents = [
      {
        inlineData: {
          data: imageBytes.toString("base64"),
          mimeType: "image/jpeg",
        },
      },
      `Analyze this space station image in detail. Describe what you see, identify any equipment, tools, or components visible, and provide operational insights that would be valuable for space station personnel. Focus on safety, functionality, and mission-critical observations.`,
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: contents,
    });

    return response.text || "Analysis could not be completed at this time.";
  } catch (error) {
    console.error("Gemini analysis error:", error);
    return "AI analysis is temporarily unavailable. Please try again later.";
  }
}

import { type User, type InsertUser, type Detection, type InsertDetection } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createDetection(detection: InsertDetection): Promise<Detection>;
  getDetection(id: string): Promise<Detection | undefined>;
  getRecentDetections(limit?: number): Promise<Detection[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private detections: Map<string, Detection>;

  constructor() {
    this.users = new Map();
    this.detections = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createDetection(insertDetection: InsertDetection): Promise<Detection> {
    const id = randomUUID();
    const detection: Detection = { 
      id,
      filename: insertDetection.filename,
      originalPath: insertDetection.originalPath,
      detectedObjects: insertDetection.detectedObjects as any,
      geminiAnalysis: insertDetection.geminiAnalysis || null,
      confidence: insertDetection.confidence,
      processTime: insertDetection.processTime,
      createdAt: new Date()
    };
    this.detections.set(id, detection);
    return detection;
  }

  async getDetection(id: string): Promise<Detection | undefined> {
    return this.detections.get(id);
  }

  async getRecentDetections(limit: number = 10): Promise<Detection[]> {
    return Array.from(this.detections.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
}

export const storage = new MemStorage();

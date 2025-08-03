# AstroSight - AI-Powered Space Station Object Detection

## Overview

AstroSight is an advanced AI vision system designed for space station operations. The application combines YOLOv8 object detection with Google's Gemini AI to provide real-time identification and intelligent analysis of tools, components, and anomalies from camera feeds. Built as a full-stack TypeScript application, it features a modern React frontend with shadcn/ui components and an Express backend with PostgreSQL database integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development/build tooling
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom space-themed design system featuring dark/light modes
- **State Management**: TanStack Query for server state management and caching
- **File Upload**: React Dropzone for drag-and-drop image uploads with preview capabilities

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints with multipart form data support for file uploads
- **File Processing**: Multer middleware for handling image uploads with validation
- **Storage**: In-memory storage implementation with interface for future database integration

### Database Architecture
- **ORM**: Drizzle ORM with PostgreSQL adapter
- **Database**: PostgreSQL (configured for Neon serverless)
- **Schema**: Type-safe schema definitions with Zod validation
- **Tables**: Users table for authentication, detections table for storing analysis results
- **Data Types**: JSONB for storing detected object arrays, real numbers for confidence scores

### AI Integration Services
- **Object Detection**: YOLOv8 integration (currently mocked for development)
- **Analysis**: Google Gemini AI for contextual image analysis
- **Processing Pipeline**: Sequential workflow from upload → detection → analysis → storage

### Development Architecture
- **Build System**: Vite for frontend, esbuild for backend bundling
- **Development**: Hot module replacement with Vite dev server
- **File Structure**: Monorepo with shared types between client/server
- **Path Aliases**: TypeScript path mapping for clean imports (@/, @shared/)

### Authentication & Authorization
- **Session Management**: Express sessions with PostgreSQL store (connect-pg-simple)
- **Security**: CORS configuration and file type validation for uploads

## External Dependencies

### AI Services
- **Google Gemini AI**: Image analysis and contextual understanding via @google/genai SDK
- **YOLOv8**: Object detection model (integration planned, currently mocked)

### Database & Storage
- **Neon Database**: Serverless PostgreSQL hosting
- **File Storage**: Local filesystem for uploaded images (production may use cloud storage)

### UI & Styling
- **Radix UI**: Headless component primitives for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **Replit Integration**: Runtime error overlay and cartographer for development environment
- **TypeScript**: Type safety across the entire application
- **Drizzle Kit**: Database migrations and schema management

### Third-Party Libraries
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form handling with Zod validation
- **Date-fns**: Date manipulation utilities
- **clsx/tailwind-merge**: Conditional CSS class management
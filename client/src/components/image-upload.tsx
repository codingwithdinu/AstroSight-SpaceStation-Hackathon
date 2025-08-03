import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Cloud, Image, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  isUploading?: boolean;
  uploadProgress?: number;
}

export function ImageUpload({ onImageSelect, isUploading, uploadProgress }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileInfo, setFileInfo] = useState<{
    name: string;
    size: string;
    dimensions: string;
    format: string;
  } | null>(null);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        
        // Get image dimensions
        const img = document.createElement('img');
        img.onload = () => {
          setFileInfo({
            name: file.name,
            size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
            dimensions: `${img.width} × ${img.height}`,
            format: file.type.split('/')[1].toUpperCase()
          });
        };
        img.src = result;
      };
      reader.readAsDataURL(file);
      
      onImageSelect(file);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    onDropRejected: (rejectedFiles) => {
      const rejection = rejectedFiles[0]?.errors[0];
      toast({
        title: "Upload Failed",
        description: rejection?.message || "Please select a valid image file",
        variant: "destructive"
      });
    }
  });

  const clearUpload = () => {
    setPreview(null);
    setFileInfo(null);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Upload Zone */}
      <div className="glass-card rounded-2xl p-8">
        <h3 className="text-2xl font-semibold mb-6 flex items-center">
          <Cloud className="text-primary mr-3" />
          Image Upload
        </h3>
        
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors duration-300 ${
            isDragActive
              ? "border-primary/60 bg-primary/10"
              : "border-primary/30 hover:border-primary/60"
          }`}
        >
          <input {...getInputProps()} />
          <Image className="text-primary h-12 w-12 mx-auto mb-4" />
          <p className="text-lg font-medium mb-2">
            {isDragActive ? "Drop image here" : "Drag & Drop Image Here"}
          </p>
          <p className="text-muted-foreground mb-4">or click to browse files</p>
          <Button
            type="button"
            variant="secondary"
            className="bg-primary/20 text-primary hover:bg-primary/30"
          >
            Browse Files
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            Supports: JPG, PNG, WEBP (Max 10MB)
          </p>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Uploading...</span>
              <span className="text-sm text-primary">{uploadProgress || 0}%</span>
            </div>
            <Progress value={uploadProgress || 0} className="h-2" />
          </div>
        )}
      </div>

      {/* Preview Zone */}
      <div className="glass-card rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold flex items-center">
            <Upload className="text-green-400 mr-3" />
            Preview
          </h3>
          {preview && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearUpload}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear
            </Button>
          )}
        </div>
        
        <div className="min-h-64 border border-border/30 rounded-xl flex items-center justify-center bg-muted/20 overflow-hidden">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-contain rounded-xl"
            />
          ) : (
            <div className="text-center text-muted-foreground">
              <Image className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No image selected</p>
            </div>
          )}
        </div>

        {fileInfo && (
          <div className="mt-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">File Size:</span>
              <span>{fileInfo.size}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Dimensions:</span>
              <span>{fileInfo.dimensions}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Format:</span>
              <span>{fileInfo.format}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export interface DownloadOptions {
  format: "PNG" | "SVG" | "JPEG";
  scale: "2x" | "4x" | "8x" | "16x";
  background: "Transparent" | "White" | "Black";
}

export interface Template {
  id: string;
  name: string;
  code: string;
} 

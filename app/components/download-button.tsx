"use client";

import { Download } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { type DownloadOptions } from "@/lib/types";

interface DownloadButtonProps {
  onDownload: (options: DownloadOptions) => Promise<void>;
}

const formatOptions = ["PNG", "SVG", "JPEG"] as const;
const scaleOptions = ["2x", "4x", "8x", "16x"] as const;
const backgroundOptions = ["Transparent", "White", "Black"] as const;

export function DownloadButton({ onDownload }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<DownloadOptions["format"]>("PNG");
  const [selectedScale, setSelectedScale] = useState<DownloadOptions["scale"]>("2x");
  const [selectedBackground, setSelectedBackground] = useState<DownloadOptions["background"]>("Transparent");

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await onDownload({
        format: selectedFormat,
        scale: selectedScale,
        background: selectedBackground
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Download className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-3" align="end">
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Format</p>
            <div className="grid grid-cols-3 gap-2">
              {formatOptions.map((format) => (
                <Button
                  key={format}
                  size="sm"
                  variant={selectedFormat === format ? "default" : "outline"}
                  onClick={() => setSelectedFormat(format)}
                  className="h-7"
                >
                  {format}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Scale</p>
            <div className="grid grid-cols-4 gap-2">
              {scaleOptions.map((scale) => (
                <Button
                  key={scale}
                  size="sm"
                  variant={selectedScale === scale ? "default" : "outline"}
                  onClick={() => setSelectedScale(scale)}
                  className="h-7"
                >
                  {scale}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Background</p>
            <div className="grid grid-cols-1 gap-2">
              {backgroundOptions.map((background) => (
                <Button
                  key={background}
                  size="sm"
                  variant={selectedBackground === background ? "default" : "outline"}
                  onClick={() => setSelectedBackground(background)}
                  className="h-7"
                >
                  {background}
                </Button>
              ))}
            </div>
          </div>
          <Button
            className="w-full"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? "Downloading..." : "Download"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default DownloadButton;

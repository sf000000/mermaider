import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { TransformComponent, TransformWrapper, useControls } from "react-zoom-pan-pinch";

import { Button } from "@/components/ui/button";

import DownloadButton from "./download-button";

interface DownloadOptions {
  format: "PNG" | "SVG" | "JPEG";
  scale: "2x" | "4x" | "8x" | "16x";
  background: "Transparent" | "White" | "Black";
}

interface OutputAreaProps {
  svg: string;
  error: string;
  onDownload: (options: DownloadOptions) => Promise<void>;
}

function ZoomControls() {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="absolute top-8 left-8 flex gap-2 z-10">
      <Button variant="outline" size="icon" onClick={() => zoomIn(0.2)}>
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={() => zoomOut(0.2)}>
        <ZoomOut className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={() => resetTransform()}>
        <RotateCcw className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default function OutputArea({ svg, error, onDownload }: OutputAreaProps) {
  return (
    <div className="relative h-full p-4 bg-background">
      <div className="relative h-full rounded-md border bg-card p-4 overflow-hidden">
        {error ? (
          <div className="text-destructive">{error}</div>
        ) : (
          <TransformWrapper
            initialScale={1}
            minScale={0.5}
            maxScale={4}
            centerOnInit
            limitToBounds={true}
            wheel={{
              step: 0.1,
              smoothStep: 0.002,
              disabled: false
            }}
            doubleClick={{
              disabled: true
            }}
            alignmentAnimation={{
              animationTime: 200,
              animationType: "easeOut"
            }}
            zoomAnimation={{
              animationTime: 200,
              animationType: "easeOut"
            }}
            panning={{
              excluded: ["button"]
            }}
          >
            {() => (
              <>
                <TransformComponent
                  wrapperClass={`!w-full !h-full !overflow-hidden cursor-grab active:cursor-grabbing`}
                  contentClass="!w-full !h-full flex items-center justify-center"
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: svg }}
                    className="w-full h-full flex items-center justify-center [&>svg]:max-w-[90%] [&>svg]:max-h-[90%] [&>svg]:w-auto [&>svg]:h-auto"
                    data-mermaid-svg
                  />
                </TransformComponent>
                <ZoomControls />
                <div className="absolute top-8 right-8 z-10">
                  <DownloadButton onDownload={onDownload} />
                </div>
              </>
            )}
          </TransformWrapper>
        )}
      </div>
    </div>
  );
}

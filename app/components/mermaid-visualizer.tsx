"use client";

import { useCallback, useEffect, useState } from "react";
import { type DownloadOptions } from "@/lib/types";
import { exportRasterImage, getRandomTemplate } from "@/lib/utils";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import Header from "@/components/header";
import InputArea from "./input-area";
import OutputArea from "./output-area";
import Footer from "@/components/footer";

export function MermaidVisualizer() {
  const [input, setInput] = useState(getRandomTemplate());
  const [svg, setSvg] = useState("");
  const [error, setError] = useState("");

  const renderDiagram = useCallback(async () => {
    try {
      setError("");
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({ startOnLoad: false });
      
      const id = `mermaid-${Math.random().toString(36).slice(2, 11)}`;
      const { svg: svgCode } = await mermaid.render(id, input);
      setSvg(svgCode);
    } catch (err) {
      setError("Invalid Mermaid syntax. Please check your input.");
      console.error(err);
    }
  }, [input]);

  const handleDownload = useCallback(async ({ format, scale, background }: DownloadOptions) => {
    if (!svg) return;

    const scaleValue = parseInt(scale.replace("x", ""));
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = svg;
    const svgElement = tempDiv.querySelector("svg");

    if (!svgElement) throw new Error("SVG element not found");

    if (background !== "Transparent") {
      svgElement.style.backgroundColor = background.toLowerCase();
    }

    if (format === "SVG") {
      const blob = new Blob([svgElement.outerHTML], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `diagram.svg`;
      a.click();
      URL.revokeObjectURL(url);
      return;
    }

    await exportRasterImage(svgElement, format, scaleValue, background.toLowerCase());
  }, [svg]);

  useEffect(() => {
    const timeoutId = setTimeout(renderDiagram, 500);
    return () => clearTimeout(timeoutId);
  }, [renderDiagram]);

  return (
    <div className="h-screen flex flex-col">
      <Header onSelectTemplate={setInput} />
      <div className="flex-1">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={50} minSize={30}>
            <InputArea value={input} onChange={setInput} />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50} minSize={30}>
            <OutputArea svg={svg} error={error} onDownload={handleDownload} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <Footer />
    </div>
  );
}

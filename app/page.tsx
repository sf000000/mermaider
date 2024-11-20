import { Metadata } from "next";
import { MermaidVisualizer } from "./components/mermaid-visualizer";

export const metadata: Metadata = {
  title: "Create Diagrams Online - Mermaider",
  description: "Create and edit Mermaid.js diagrams in real-time. Export as SVG, PNG, or JPEG with customizable settings.",
  openGraph: {
    title: "Create Diagrams Online - Mermaider",
    description: "Create and edit Mermaid.js diagrams in real-time"
  }
};

export default function Home() {
  return (
    <main className="h-screen">
      <MermaidVisualizer />
    </main>
  );
}

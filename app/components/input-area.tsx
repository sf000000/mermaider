import { Textarea } from "@/components/ui/textarea";

interface InputAreaProps {
  value: string;
  onChange: (value: string) => void;
}

export default function InputArea({ value, onChange }: InputAreaProps) {
  return (
    <div className="relative h-full p-4 bg-background">
      <div className="h-full rounded-md border bg-card p-4">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter Mermaid.js syntax here..."
          className="h-full resize-none font-mono border-0 focus-visible:ring-0 p-0"
        />
      </div>
    </div>
  );
}

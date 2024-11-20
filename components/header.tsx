import { Settings } from "lucide-react";
import Link from "next/link";
import { TemplateSelector } from "@/app/components/template-selector";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onSelectTemplate: (code: string) => void;
}

export default function Header({ onSelectTemplate }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-background border-b">
      <h1 className="text-2xl font-bold">Mermaider</h1>
      <div className="flex items-center gap-2">
        <TemplateSelector onSelect={onSelectTemplate} />
        <Button variant="outline" size="icon" asChild>
          <Link href="/settings">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}

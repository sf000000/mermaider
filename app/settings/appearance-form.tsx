"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function AppearanceForm() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-2">
        <Button
          variant={theme === "light" ? "default" : "outline"}
          onClick={() => setTheme("light")}
          className="w-full"
        >
          Light
        </Button>
        <Button
          variant={theme === "dark" ? "default" : "outline"}
          onClick={() => setTheme("dark")}
          className="w-full"
        >
          Dark
        </Button>
        <Button
          variant={theme === "system" ? "default" : "outline"}
          onClick={() => setTheme("system")}
          className="w-full"
        >
          System
        </Button>
      </div>
    </div>
  );
}

export default AppearanceForm; 

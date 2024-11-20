import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import AppearanceForm from "./appearance-form";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Settings",
  description: "Customize your Mermaider experience. Adjust theme preferences and application settings.",
  openGraph: {
    title: "Settings - Mermaider",
    description: "Customize your Mermaider experience"
  }
};

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="h-full max-w-6xl mx-auto p-6 space-y-8">
        <div className="space-y-0.5">
          <Button variant="ghost" size="sm" className="mb-2" asChild>
            <Link href="/" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to editor
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your settings and preferences
          </p>
        </div>
        <Separator />
        <div>
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold">Appearance</h2>
              <p className="text-sm text-muted-foreground">
                Customize how Mermaider looks and feels
              </p>
            </div>
            <AppearanceForm />
          </div>
        </div>
      </div>
    </div>
  );
} 

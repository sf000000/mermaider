import { Github } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export default function Footer() {
  return (
    <footer className="border-t bg-background/50 backdrop-blur-sm">
      <div className="flex h-12 items-center justify-between px-6">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span>Built by</span>
          <Link
            href="https://github.com/sf000000"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:underline transition-colors"
          >
            sf000000
          </Link>
        </div>
        <div className="flex items-center">
          <Link
            href="https://github.com/sf000000/mermaider"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "ghost" })}
          >
            <Github className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
} 

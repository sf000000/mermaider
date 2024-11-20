"use client";

import * as React from "react";
import templatesData from "@/app/data/templates.json";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface TemplateSelectorProps {
  onSelect: (code: string) => void;
}

export function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  return (
    <Select
      onValueChange={(value) => {
        const template = templatesData.templates.find((t) => t.id === value);
        if (template) {
          onSelect(template.code);
        }
      }}
    >
      <SelectTrigger className="w-[140px] truncate">
        <SelectValue placeholder="Templates" />
      </SelectTrigger>
      <SelectContent>
        {templatesData.templates.map((template) => (
          <SelectItem 
            key={template.id} 
            value={template.id}
            className="truncate"
          >
            {template.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

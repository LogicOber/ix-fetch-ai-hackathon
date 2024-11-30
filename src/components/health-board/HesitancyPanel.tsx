import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle } from "lucide-react";
import { hesitancyLevels } from "@/lib/mock-data";
import type { HesitancyLevel } from "@/types/health";

interface HesitancyPanelProps {
  selectedHesitancy: HesitancyLevel[];
  onHesitancyToggle: (hesitancy: HesitancyLevel) => void;
}

export function HesitancyPanel({ selectedHesitancy, onHesitancyToggle }: HesitancyPanelProps) {
  return (
    <Card className="p-4 space-y-4 rounded-lg border-[1.5px] border-primary/30">
      <div className="flex items-center space-x-2">
        <AlertTriangle className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-primary">Vaccine Hesitancy</h2>
      </div>
      <div className="space-y-3">
        {hesitancyLevels.map((level) => (
          <div key={level} className="flex items-center space-x-3">
            <Checkbox
              id={level}
              checked={selectedHesitancy.includes(level)}
              onCheckedChange={() => onHesitancyToggle(level)}
              className="medical-checkbox"
            />
            <Label 
              htmlFor={level} 
              className="text-sm font-medium cursor-pointer text-foreground"
            >
              {level}
            </Label>
          </div>
        ))}
      </div>
    </Card>
  );
}
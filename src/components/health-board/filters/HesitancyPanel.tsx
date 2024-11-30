import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { hesitancyLevels } from "@/lib/mock-data";
import type { HesitancyLevel } from "@/types/health";

interface HesitancyPanelProps {
  selectedHesitancy: HesitancyLevel[];
  onHesitancyToggle: (hesitancy: HesitancyLevel) => void;
  onClear: () => void;
}

export function HesitancyPanel({ selectedHesitancy, onHesitancyToggle, onClear }: HesitancyPanelProps) {
  return (
    <Card className="relative p-4 space-y-4 rounded-lg border-[1.5px] border-primary/30">
      <div className="flex items-center gap-3">
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
              className="text-sm font-medium"
            >
              {level}
            </Label>
          </div>
        ))}
      </div>
      {selectedHesitancy.length > 0 && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onClear}
          className="absolute bottom-4 right-4 h-8 px-4 font-medium bg-white hover:bg-gray-50 text-primary border border-primary/30 shadow-sm"
        >
          Clear
        </Button>
      )}
    </Card>
  );
}
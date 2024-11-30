import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { vaccineTypes } from "@/lib/mock-data";
import { Syringe } from "lucide-react";
import type { VaccineType } from "@/types/health";

interface FilterPanelProps {
  selectedVaccines: VaccineType[];
  onVaccineToggle: (vaccine: VaccineType) => void;
}

export function FilterPanel({ selectedVaccines, onVaccineToggle }: FilterPanelProps) {
  return (
    <Card className="p-4 space-y-4 rounded-lg border-[1.5px] border-primary/30">
      <div className="flex items-center space-x-2">
        <Syringe className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-primary">Vaccine Types</h2>
      </div>
      <div className="space-y-3">
        {vaccineTypes.map((vaccine) => (
          <div key={vaccine} className="flex items-center space-x-3">
            <Checkbox
              id={vaccine}
              checked={selectedVaccines.includes(vaccine)}
              onCheckedChange={() => onVaccineToggle(vaccine)}
              className="medical-checkbox"
            />
            <Label 
              htmlFor={vaccine} 
              className="text-sm font-medium text-foreground cursor-pointer"
            >
              {vaccine}
            </Label>
          </div>
        ))}
      </div>
    </Card>
  );
}
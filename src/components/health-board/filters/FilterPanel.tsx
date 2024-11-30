import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { vaccineTypes } from "@/lib/mock-data";
import { Syringe } from "lucide-react";
import type { VaccineType } from "@/types/health";

interface FilterPanelProps {
  selectedVaccines: VaccineType[];
  onVaccineToggle: (vaccine: VaccineType) => void;
  disabled?: boolean;
  onClear: () => void;
}

export function FilterPanel({ selectedVaccines, onVaccineToggle, disabled, onClear }: FilterPanelProps) {
  return (
    <Card className={`relative p-4 space-y-4 rounded-lg border-[1.5px] border-primary/30 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <div className="flex items-center gap-3">
        <Syringe className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-semibold text-primary">Vaccine Types</h2>
      </div>
      <div className="space-y-3">
        {vaccineTypes.map((vaccine) => (
          <div key={vaccine} className="flex items-center space-x-3">
            <Checkbox
              id={vaccine}
              checked={selectedVaccines.includes(vaccine)}
              onCheckedChange={() => onVaccineToggle(vaccine)}
              className="medical-checkbox"
              disabled={disabled}
            />
            <Label 
              htmlFor={vaccine} 
              className="text-base font-medium"
            >
              {vaccine}
            </Label>
          </div>
        ))}
      </div>
      {selectedVaccines.length > 0 && !disabled && (
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
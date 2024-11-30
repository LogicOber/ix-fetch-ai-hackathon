import { Card } from "@/components/ui/card";
import { Syringe } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface VaccineFilterProps {
  selectedVaccines: string[];
  onVaccineSelect: (vaccine: string) => void;
}

const vaccineTypes = [
  "Moderna COVID MRNA",
  "Pfizer COVID MRNA",
  "MonkeyPox MRNA",
  "Astra Zenica COVID MRNA",
];

export function VaccineFilter({ selectedVaccines, onVaccineSelect }: VaccineFilterProps) {
  return (
    <Card className="p-4 space-y-4 rounded-lg border-[1.5px] border-primary/30">
      <div className="flex items-center space-x-2">
        <Syringe className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold text-primary">Vaccine Types</h2>
      </div>
      <div className="space-y-3">
        {vaccineTypes.map((vaccine) => (
          <div key={vaccine} className="flex items-center space-x-2">
            <Checkbox
              id={vaccine}
              checked={selectedVaccines.includes(vaccine)}
              onCheckedChange={() => onVaccineSelect(vaccine)}
            />
            <Label
              htmlFor={vaccine}
              className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {vaccine}
            </Label>
          </div>
        ))}
      </div>
    </Card>
  );
}

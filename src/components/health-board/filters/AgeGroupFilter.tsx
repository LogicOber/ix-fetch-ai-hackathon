import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { ageGroups } from "@/lib/mock-data";
import type { AgeGroup } from "@/types/health";

interface AgeGroupFilterProps {
  selectedAgeGroups: AgeGroup[];
  onAgeGroupToggle: (ageGroup: AgeGroup) => void;
  onClear: () => void;
}

export function AgeGroupFilter({ selectedAgeGroups, onAgeGroupToggle, onClear }: AgeGroupFilterProps) {
  return (
    <Card className="relative p-4 space-y-4 rounded-lg border-[1.5px] border-primary/30">
      <div className="flex items-center gap-3">
        <Clock className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-semibold text-primary">Age Groups</h2>
      </div>
      <div className="space-y-3">
        {ageGroups.map((ageGroup) => (
          <div key={ageGroup} className="flex items-center space-x-3">
            <Checkbox
              id={`age-${ageGroup}`}
              checked={selectedAgeGroups.includes(ageGroup)}
              onCheckedChange={() => onAgeGroupToggle(ageGroup)}
              className="medical-checkbox"
            />
            <Label
              htmlFor={`age-${ageGroup}`}
              className="text-base font-medium"
            >
              {ageGroup}
            </Label>
          </div>
        ))}
      </div>
      {selectedAgeGroups.length > 0 && (
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

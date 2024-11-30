import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { genders } from "@/lib/mock-data";
import type { Gender } from "@/types/health";

interface GenderFilterProps {
  selectedGenders: Gender[];
  onGenderToggle: (gender: Gender) => void;
  onClear: () => void;
}

export function GenderFilter({ selectedGenders, onGenderToggle, onClear }: GenderFilterProps) {
  return (
    <Card className="relative p-4 space-y-4 rounded-lg border-[1.5px] border-primary/30">
      <div className="flex items-center gap-3">
        <Users className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-primary">Gender</h2>
      </div>
      <div className="space-y-3">
        {genders.map((gender) => (
          <div key={gender} className="flex items-center space-x-3">
            <Checkbox
              id={`gender-${gender}`}
              checked={selectedGenders.includes(gender)}
              onCheckedChange={() => onGenderToggle(gender)}
              className="medical-checkbox"
            />
            <Label
              htmlFor={`gender-${gender}`}
              className="text-sm font-medium"
            >
              {gender}
            </Label>
          </div>
        ))}
      </div>
      {selectedGenders.length > 0 && (
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

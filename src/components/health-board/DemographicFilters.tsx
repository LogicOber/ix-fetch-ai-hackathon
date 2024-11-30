import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, Clock } from "lucide-react";
import { genders, ageGroups } from "@/lib/mock-data";
import type { Gender, AgeGroup } from "@/types/health";

interface DemographicFiltersProps {
  selectedGender: Gender | null;
  selectedAgeGroup: AgeGroup | null;
  onGenderSelect: (gender: Gender | null) => void;
  onAgeGroupSelect: (ageGroup: AgeGroup | null) => void;
}

export function DemographicFilters({
  selectedGender,
  selectedAgeGroup,
  onGenderSelect,
  onAgeGroupSelect
}: DemographicFiltersProps) {
  return (
    <div className="grid grid-cols-2 gap-6 mt-6">
      <Card className="p-4 space-y-4 rounded-lg border-[1.5px] border-primary/30">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-primary">Gender</h2>
        </div>
        <div className="space-y-3">
          {genders.map((gender) => (
            <div key={gender} className="flex items-center space-x-3">
              <Checkbox
                id={gender}
                checked={selectedGender === gender}
                onCheckedChange={() => onGenderSelect(selectedGender === gender ? null : gender)}
                className="medical-checkbox"
              />
              <Label 
                htmlFor={gender} 
                className="text-sm font-medium cursor-pointer text-foreground"
              >
                {gender}
              </Label>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 space-y-4 rounded-lg border-[1.5px] border-primary/30">
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-primary">Age Groups</h2>
        </div>
        <div className="space-y-3">
          {ageGroups.map((ageGroup) => (
            <div key={ageGroup} className="flex items-center space-x-3">
              <Checkbox
                id={ageGroup}
                checked={selectedAgeGroup === ageGroup}
                onCheckedChange={() => onAgeGroupSelect(selectedAgeGroup === ageGroup ? null : ageGroup)}
                className="medical-checkbox"
              />
              <Label 
                htmlFor={ageGroup} 
                className="text-sm font-medium cursor-pointer text-foreground"
              >
                {ageGroup}
              </Label>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
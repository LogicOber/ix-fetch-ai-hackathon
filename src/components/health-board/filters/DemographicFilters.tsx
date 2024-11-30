import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, Clock } from "lucide-react";
import { genders, ageGroups } from "@/lib/mock-data";
import type { Gender, AgeGroup } from "@/types/health";

interface DemographicFiltersProps {
  selectedGenders: Gender[];
  selectedAgeGroups: AgeGroup[];
  onGenderToggle: (gender: Gender) => void;
  onAgeGroupToggle: (ageGroup: AgeGroup) => void;
}

export function DemographicFilters({
  selectedGenders,
  selectedAgeGroups,
  onGenderToggle,
  onAgeGroupToggle
}: DemographicFiltersProps) {
  return (
    <div className="grid grid-cols-2 gap-6">
      <Card className="p-4 space-y-4">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-primary">Gender</h2>
        </div>
        <div className="space-y-3">
          {genders.map((gender) => (
            <div key={gender} className="flex items-center space-x-3">
              <Checkbox
                id={gender}
                checked={selectedGenders.includes(gender)}
                onCheckedChange={() => onGenderToggle(gender)}
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

      <Card className="p-4 space-y-4">
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-primary">Age Groups</h2>
        </div>
        <div className="space-y-3">
          {ageGroups.map((ageGroup) => (
            <div key={ageGroup} className="flex items-center space-x-3">
              <Checkbox
                id={ageGroup}
                checked={selectedAgeGroups.includes(ageGroup)}
                onCheckedChange={() => onAgeGroupToggle(ageGroup)}
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
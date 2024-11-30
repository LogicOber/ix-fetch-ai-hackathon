import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Users, Clock, X } from "lucide-react";
import { genders, ageGroups } from "@/lib/mock-data";
import type { Gender, AgeGroup } from "@/types/health";

interface DemographicFiltersProps {
  selectedGenders: Gender[];
  selectedAgeGroups: AgeGroup[];
  onGenderToggle: (gender: Gender) => void;
  onAgeGroupToggle: (ageGroup: AgeGroup) => void;
  onClearGenders: () => void;
  onClearAgeGroups: () => void;
}

export function DemographicFilters({
  selectedGenders,
  selectedAgeGroups,
  onGenderToggle,
  onAgeGroupToggle,
  onClearGenders,
  onClearAgeGroups
}: DemographicFiltersProps) {
  return (
    <Card className="p-4 space-y-6 rounded-lg border-[1.5px] border-primary/30">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-primary">Gender</h2>
          </div>
          {selectedGenders.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearGenders}
              className="h-8 px-2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
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
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {gender}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-primary">Age Groups</h2>
          </div>
          {selectedAgeGroups.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAgeGroups}
              className="h-8 px-2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
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
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {ageGroup}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
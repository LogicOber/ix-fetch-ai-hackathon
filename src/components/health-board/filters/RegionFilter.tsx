import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { englishRegions } from "@/lib/mock-data";
import type { Region } from "@/types/health";
import { cn } from "@/lib/utils";

interface RegionFilterProps {
  selectedRegion: Region | null;
  onRegionSelect: (region: Region | null) => void;
}

export function RegionFilter({ selectedRegion, onRegionSelect }: RegionFilterProps) {
  return (
    <Card className="p-4 space-y-4 rounded-lg border-[1.5px] border-primary/30">
      <div className="flex items-center space-x-2">
        <MapPin className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-primary">Regions</h2>
      </div>
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="Search region..." />
        <CommandList>
          <CommandEmpty>No region found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              value="all"
              onSelect={() => onRegionSelect(null)}
              className={cn(
                "cursor-pointer",
                !selectedRegion 
                  ? "bg-[#006AF5] text-white hover:bg-[#006AF5] hover:text-white"
                  : "hover:bg-[#A0C5FF] hover:text-foreground"
              )}
            >
              All Regions
            </CommandItem>
            {englishRegions.map((region) => (
              <CommandItem
                key={region}
                value={region.toLowerCase()}
                onSelect={() => onRegionSelect(region)}
                className={cn(
                  "cursor-pointer",
                  selectedRegion === region 
                    ? "bg-[#006AF5] text-white hover:bg-[#006AF5] hover:text-white"
                    : "hover:bg-[#A0C5FF] hover:text-foreground"
                )}
              >
                {region}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </Card>
  );
}
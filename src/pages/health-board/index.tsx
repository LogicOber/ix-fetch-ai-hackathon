import { useState } from 'react';
import { TimeRangeSelector } from '@/components/social/TimeRangeSelector';
import { VaccinationMap } from '@/components/health-board/VaccinationMap';
import { FilterPanel } from '@/components/health-board/filters/FilterPanel';
import { RegionFilter } from '@/components/health-board/filters/RegionFilter';
import { HesitancyPanel } from '@/components/health-board/filters/HesitancyPanel';
import { GenderFilter } from '@/components/health-board/filters/GenderFilter';
import { AgeGroupFilter } from '@/components/health-board/filters/AgeGroupFilter';
import { StackedBarChart } from '@/components/health-board/charts/StackedBarChart';
import { useFilteredData } from '@/hooks/useFilteredData';
import { LayoutDashboard } from 'lucide-react';
import type { Region, VaccineType, Gender, AgeGroup, HesitancyLevel } from '@/types/health';
import { hesitancyLevels } from '@/lib/mock-data';

export default function HealthBoard() {
  const [selectedVaccines, setSelectedVaccines] = useState<VaccineType[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedHesitancy, setSelectedHesitancy] = useState<HesitancyLevel[]>([...hesitancyLevels]);
  const [selectedGenders, setSelectedGenders] = useState<Gender[]>([]);
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<AgeGroup[]>([]);
  const shouldDisableVaccines = selectedGenders.length > 0 || selectedAgeGroups.length > 0;
  const shouldDisableRegions = selectedGenders.length > 0 || selectedAgeGroups.length > 0;

  const { filteredMapData, timeSeriesData, showTimeSeries } = useFilteredData({
    selectedRegion,
    selectedHesitancy,
    selectedGenders,
    selectedAgeGroups,
  });

  // 清除选择的处理函数
  const clearGenders = () => setSelectedGenders([]);
  const clearAgeGroups = () => setSelectedAgeGroups([]);
  const clearVaccines = () => setSelectedVaccines([]);
  const clearHesitancy = () => setSelectedHesitancy([]);

  return (
    <div className="min-h-screen">
      <header className="border-b border-primary/20">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="h-7 w-7 text-primary" />
              <h1 className="text-2xl font-semibold">NHS Vaccination Dashboard</h1>
            </div>
            <div className="opacity-0">
              <TimeRangeSelector selected="day" onChange={() => {}} />
            </div>
          </div>
        </div>
      </header>

      <div className="p-8">
        <div className="flex gap-6">
          <div className="flex-1 min-w-0 space-y-6">
            {showTimeSeries ? (
              <StackedBarChart data={timeSeriesData} />
            ) : (
              <VaccinationMap
                data={filteredMapData}
                selectedRegion={selectedRegion}
                selectedVaccines={selectedVaccines}
                selectedHesitancy={selectedHesitancy}
                onRegionSelect={setSelectedRegion}
              />
            )}
            <div className="grid grid-cols-2 gap-6">
              <GenderFilter
                selectedGenders={selectedGenders}
                onGenderToggle={(gender) => {
                  setSelectedGenders(prev =>
                    prev.includes(gender)
                      ? prev.filter(g => g !== gender)
                      : [...prev, gender]
                  );
                }}
                onClear={clearGenders}
              />
              <AgeGroupFilter
                selectedAgeGroups={selectedAgeGroups}
                onAgeGroupToggle={(ageGroup) => {
                  setSelectedAgeGroups(prev =>
                    prev.includes(ageGroup)
                      ? prev.filter(g => g !== ageGroup)
                      : [...prev, ageGroup]
                  );
                }}
                onClear={clearAgeGroups}
              />
            </div>
          </div>
          <div className="w-72 space-y-6">
            <RegionFilter 
              selectedRegion={selectedRegion} 
              onRegionChange={setSelectedRegion}
              disabled={shouldDisableRegions}
            />
            <FilterPanel
              selectedVaccines={selectedVaccines}
              onVaccineToggle={(vaccine) => {
                setSelectedVaccines(prev =>
                  prev.includes(vaccine)
                    ? prev.filter(v => v !== vaccine)
                    : [...prev, vaccine]
                );
              }}
              disabled={shouldDisableVaccines}
              onClear={clearVaccines}
            />
            <HesitancyPanel
              selectedHesitancy={selectedHesitancy}
              onHesitancyToggle={(hesitancy) => {
                setSelectedHesitancy(prev =>
                  prev.includes(hesitancy)
                    ? prev.filter(h => h !== hesitancy)
                    : [...prev, hesitancy]
                );
              }}
              onClear={clearHesitancy}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
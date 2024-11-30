import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { VaccinationMap } from '@/components/health-board/VaccinationMap';
import { FilterPanel } from '@/components/health-board/filters/FilterPanel';
import { RegionFilter } from '@/components/health-board/filters/RegionFilter';
import { HesitancyPanel } from '@/components/health-board/filters/HesitancyPanel';
import { DemographicFilters } from '@/components/health-board/filters/DemographicFilters';
import { StackedBarChart } from '@/components/health-board/charts/StackedBarChart';
import { useFilteredData } from '@/hooks/useFilteredData';
import { Activity } from 'lucide-react';
import type { Region, VaccineType, Gender, AgeGroup, HesitancyLevel } from '@/types/health';
import { hesitancyLevels } from '@/lib/mock-data';

export default function HealthBoard() {
  const [selectedVaccines, setSelectedVaccines] = useState<VaccineType[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedHesitancy, setSelectedHesitancy] = useState<HesitancyLevel[]>([...hesitancyLevels]);
  const [selectedGenders, setSelectedGenders] = useState<Gender[]>([]);
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<AgeGroup[]>([]);

  // 检查是否应该禁用疫苗选择
  const shouldDisableVaccines = selectedGenders.length > 0 || selectedAgeGroups.length > 0;

  const { filteredMapData, timeSeriesData, showTimeSeries } = useFilteredData({
    selectedRegion,
    selectedHesitancy,
    selectedGenders,
    selectedAgeGroups,
  });

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        <header className="border-b">
          <div className="px-6 py-4">
            <div className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  NHS Vaccination Dashboard
                </h1>
                <p className="text-sm text-gray-600">
                  Monitor vaccination progress and willingness across England
                </p>
              </div>
            </div>
          </div>
        </header>
        
        <div className="p-6">
          <div className="flex gap-6">
            <div className="flex-1 min-w-0 space-y-6">
              {showTimeSeries ? (
                <StackedBarChart data={timeSeriesData} />
              ) : (
                <VaccinationMap
                  data={filteredMapData}
                  selectedVaccines={selectedVaccines}
                  selectedRegion={selectedRegion}
                  selectedHesitancy={selectedHesitancy}
                  onRegionSelect={setSelectedRegion}
                />
              )}
              <DemographicFilters
                selectedGenders={selectedGenders}
                selectedAgeGroups={selectedAgeGroups}
                onGenderToggle={(gender) => {
                  setSelectedGenders(prev =>
                    prev.includes(gender)
                      ? prev.filter(g => g !== gender)
                      : [...prev, gender]
                  );
                }}
                onAgeGroupToggle={(ageGroup) => {
                  setSelectedAgeGroups(prev =>
                    prev.includes(ageGroup)
                      ? prev.filter(a => a !== ageGroup)
                      : [...prev, ageGroup]
                  );
                }}
              />
            </div>
            <div className="w-80 shrink-0 space-y-6">
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
              />
              <RegionFilter
                selectedRegion={selectedRegion}
                onRegionSelect={setSelectedRegion}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
import { useMemo } from 'react';
import { mockVaccinationData, mockDemographicData } from '@/lib/mock-data';
import type { TimeSeriesData, VaccinationData, Region, Gender, AgeGroup, HesitancyLevel } from '@/types/health';

interface UseFilteredDataProps {
  selectedRegion: Region | null;
  selectedHesitancy: HesitancyLevel[];
  selectedGenders: Gender[];
  selectedAgeGroups: AgeGroup[];
}

export function useFilteredData({
  selectedRegion,
  selectedHesitancy,
  selectedGenders,
  selectedAgeGroups,
}: UseFilteredDataProps) {
  const filteredMapData = useMemo(() => {
    const filteredMapData: VaccinationData[] = mockVaccinationData
      .filter((item) => !selectedRegion || item.region === selectedRegion)
      .map((item) => {
        const filteredHesitancy = {
          Low: selectedHesitancy.includes('Low') ? item.hesitancy.Low || 0 : 0,
          Moderate: selectedHesitancy.includes('Moderate') ? item.hesitancy.Moderate || 0 : 0,
          High: selectedHesitancy.includes('High') ? item.hesitancy.High || 0 : 0,
          Severe: selectedHesitancy.includes('Severe') ? item.hesitancy.Severe || 0 : 0
        };

        return {
          ...item,
          vaccineTypes: {
            "Moderna COVID MRNA": item.vaccineTypes["Moderna COVID MRNA"] || 0,
            "Pfizer COVID MRNA": item.vaccineTypes["Pfizer COVID MRNA"] || 0,
            "MonkeyPox MRNA": item.vaccineTypes["MonkeyPox MRNA"] || 0,
            "Astra Zenica COVID MRNA": item.vaccineTypes["Astra Zenica COVID MRNA"] || 0
          },
          hesitancy: filteredHesitancy
        };
      });

    return filteredMapData;
  }, [selectedRegion, selectedHesitancy]);

  const timeSeriesData = useMemo(() => {
    if (selectedGenders.length === 0 && selectedAgeGroups.length === 0) {
      return [];
    }

    // Create a map to store aggregated data by date
    const aggregatedData = new Map<string, TimeSeriesData>();

    // Helper function to initialize data structure
    const initializeDataPoint = (): TimeSeriesData => ({
      date: '',
      newCases: 0,
      deaths: 0,
      sevenDayAverage: 0,
      deathsSevenDayAverage: 0,
      hesitancyBreakdown: {
        Low: 0,
        Moderate: 0,
        High: 0,
        Severe: 0
      }
    });

    // Function to add data points
    const addDataPoint = (item: TimeSeriesData, entry: TimeSeriesData) => {
      entry.newCases += item.newCases;
      entry.deaths += item.deaths;
      entry.sevenDayAverage += item.sevenDayAverage;
      entry.deathsSevenDayAverage += item.deathsSevenDayAverage;
      Object.entries(item.hesitancyBreakdown).forEach(([level, value]) => {
        entry.hesitancyBreakdown[level as HesitancyLevel] = (entry.hesitancyBreakdown[level as HesitancyLevel] || 0) + value;
      });
    };

    // Process gender data
    selectedGenders.forEach(gender => {
      mockDemographicData.gender[gender].forEach(item => {
        const date = item.date;
        if (!aggregatedData.has(date)) {
          aggregatedData.set(date, initializeDataPoint());
        }
        const entry = aggregatedData.get(date)!;
        addDataPoint(item, entry);
      });
    });

    // Process age group data
    selectedAgeGroups.forEach(ageGroup => {
      mockDemographicData.ageGroups[ageGroup].forEach(item => {
        const date = item.date;
        if (!aggregatedData.has(date)) {
          aggregatedData.set(date, initializeDataPoint());
        }
        const entry = aggregatedData.get(date)!;
        addDataPoint(item, entry);
      });
    });

    // Convert map to array and sort by date
    return Array.from(aggregatedData.entries())
      .map(([date, data]) => ({
        ...data,
        date
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [selectedGenders, selectedAgeGroups]);

  return {
    filteredMapData,
    timeSeriesData,
    showTimeSeries: selectedGenders.length > 0 || selectedAgeGroups.length > 0
  };
}
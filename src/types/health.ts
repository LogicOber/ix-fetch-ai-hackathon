export type Region = typeof import('@/lib/mock-data').englishRegions[number];
export type VaccineType = typeof import('@/lib/mock-data').vaccineTypes[number];
export type Gender = 'Male' | 'Female';
export type AgeGroup = '1-12' | '13-19' | '20-40' | '41-60' | '60+';
export type HesitancyLevel = 'Low' | 'Moderate' | 'High' | 'Severe';

export interface TimeSeriesData {
  date: string;
  newCases: number;
  deaths: number;
  sevenDayAverage: number;
  deathsSevenDayAverage: number;
  hesitancyBreakdown: {
    [K in HesitancyLevel]: number;
  };
}

export interface VaccinationData {
  region: Region;
  coordinates: [number, number];
  vaccineTypes: {
    [K in VaccineType]: number;
  };
  willingness: number;
  hesitancy: {
    [K in HesitancyLevel]: number;
  };
}

export interface DemographicData {
  gender: {
    [K in Gender]: TimeSeriesData[];
  };
  ageGroups: {
    [K in AgeGroup]: TimeSeriesData[];
  };
}
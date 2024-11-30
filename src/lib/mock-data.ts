import type { VaccinationData, TimeSeriesData, DemographicData } from '@/types/health';

export const englishRegions = [
  "Greater London",
  "South East",
  "South West",
  "East of England",
  "West Midlands",
  "East Midlands",
  "Yorkshire and the Humber",
  "North West",
  "North East"
] as const;

export const vaccineTypes = [
  "Moderna COVID MRNA",
  "Pfizer COVID MRNA",
  "MonkeyPox MRNA",
  "Astra Zenica COVID MRNA"
] as const;

export const hesitancyLevels = [
  "Low",
  "Moderate",
  "High",
  "Severe"
] as const;

export const genders = [
  "Male",
  "Female"
] as const;

export const ageGroups = [
  "1-12",
  "13-19",
  "20-40",
  "41-60",
  "60+"
] as const;

// Generate mock time series data
const generateTimeSeriesData = (startDate: Date, days: number, multiplier = 1): TimeSeriesData[] => {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const newCases = Math.floor((Math.random() * 100000 + 20000) * multiplier);
    const deaths = Math.floor(newCases * (Math.random() * 0.02 + 0.01)); // 1-3% death rate
    
    return {
      date: date.toISOString().split('T')[0],
      newCases,
      deaths,
      sevenDayAverage: Math.floor((Math.random() * 80000 + 40000) * multiplier),
      deathsSevenDayAverage: Math.floor((Math.random() * 2000 + 1000) * multiplier),
      hesitancyBreakdown: {
        "Low": 25 + Math.floor(Math.random() * 10),
        "Moderate": 30 + Math.floor(Math.random() * 10),
        "High": 25 + Math.floor(Math.random() * 10),
        "Severe": 10 + Math.floor(Math.random() * 5)
      }
    };
  });
};

const startDate = new Date('2023-08-15');
const baseTimeSeriesData = generateTimeSeriesData(startDate, 30);

export const mockDemographicData: DemographicData = {
  gender: {
    "Male": baseTimeSeriesData.map(d => ({
      ...d,
      newCases: Math.floor(d.newCases * 0.48),
      deaths: Math.floor(d.deaths * 0.48),
      sevenDayAverage: Math.floor(d.sevenDayAverage * 0.48),
      deathsSevenDayAverage: Math.floor(d.deathsSevenDayAverage * 0.48)
    })),
    "Female": baseTimeSeriesData.map(d => ({
      ...d,
      newCases: Math.floor(d.newCases * 0.52),
      deaths: Math.floor(d.deaths * 0.52),
      sevenDayAverage: Math.floor(d.sevenDayAverage * 0.52),
      deathsSevenDayAverage: Math.floor(d.deathsSevenDayAverage * 0.52)
    }))
  },
  ageGroups: {
    "1-12": baseTimeSeriesData.map(d => ({
      ...d,
      newCases: Math.floor(d.newCases * 0.15),
      deaths: Math.floor(d.deaths * 0.05),
      sevenDayAverage: Math.floor(d.sevenDayAverage * 0.15),
      deathsSevenDayAverage: Math.floor(d.deathsSevenDayAverage * 0.05)
    })),
    "13-19": baseTimeSeriesData.map(d => ({
      ...d,
      newCases: Math.floor(d.newCases * 0.2),
      deaths: Math.floor(d.deaths * 0.1),
      sevenDayAverage: Math.floor(d.sevenDayAverage * 0.2),
      deathsSevenDayAverage: Math.floor(d.deathsSevenDayAverage * 0.1)
    })),
    "20-40": baseTimeSeriesData.map(d => ({
      ...d,
      newCases: Math.floor(d.newCases * 0.3),
      deaths: Math.floor(d.deaths * 0.2),
      sevenDayAverage: Math.floor(d.sevenDayAverage * 0.3),
      deathsSevenDayAverage: Math.floor(d.deathsSevenDayAverage * 0.2)
    })),
    "41-60": baseTimeSeriesData.map(d => ({
      ...d,
      newCases: Math.floor(d.newCases * 0.25),
      deaths: Math.floor(d.deaths * 0.3),
      sevenDayAverage: Math.floor(d.sevenDayAverage * 0.25),
      deathsSevenDayAverage: Math.floor(d.deathsSevenDayAverage * 0.3)
    })),
    "60+": baseTimeSeriesData.map(d => ({
      ...d,
      newCases: Math.floor(d.newCases * 0.1),
      deaths: Math.floor(d.deaths * 0.35),
      sevenDayAverage: Math.floor(d.sevenDayAverage * 0.1),
      deathsSevenDayAverage: Math.floor(d.deathsSevenDayAverage * 0.35)
    }))
  }
};

export const mockVaccinationData: VaccinationData[] = englishRegions.map(region => {
  const coordinates: [number, number] = (() => {
    switch (region) {
      case "Greater London": return [51.5074, -0.1278];
      case "South East": return [51.1781, -0.5698];
      case "South West": return [50.7772, -3.9995];
      case "East of England": return [52.1911, 0.1927];
      case "West Midlands": return [52.4862, -1.8904];
      case "East Midlands": return [52.8306, -1.3321];
      case "Yorkshire and the Humber": return [53.9591, -1.0792];
      case "North West": return [53.4084, -2.9916];
      case "North East": return [54.9783, -1.6178];
      default: return [52.8566, -1.3522];
    }
  })();

  return {
    region,
    coordinates,
    vaccineTypes: {
      "Moderna COVID MRNA": 35 + Math.floor(Math.random() * 20),
      "Pfizer COVID MRNA": 40 + Math.floor(Math.random() * 20),
      "MonkeyPox MRNA": 15 + Math.floor(Math.random() * 20),
      "Astra Zenica COVID MRNA": 30 + Math.floor(Math.random() * 20)
    },
    willingness: 70 + Math.floor(Math.random() * 20),
    hesitancy: {
      "Low": 25 + Math.floor(Math.random() * 10),
      "Moderate": 30 + Math.floor(Math.random() * 10),
      "High": 25 + Math.floor(Math.random() * 10),
      "Severe": 10 + Math.floor(Math.random() * 5)
    }
  };
});
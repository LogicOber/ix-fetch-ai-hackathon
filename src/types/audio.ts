export interface EmotionPoint {
  time: number;          // Time in seconds
  emotionScore: number;  // Score from -1 to 1
  isHesitancyPoint?: boolean;
  speech?: string;       // The actual speech at hesitancy point
  aiAnalysis?: string;   // AI Doctor's analysis of hesitancy
}

export interface AudioAnalysis {
  fileName: string;
  duration: number;      // Total duration in seconds
  emotionData: EmotionPoint[];
}

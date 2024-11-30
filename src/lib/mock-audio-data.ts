import type { AudioAnalysis } from '@/types/audio';

export const mockAudioAnalysis: AudioAnalysis = {
  fileName: "patient_consultation_01.mp3",
  duration: 180, // 3 minutes
  emotionData: [
    { time: 0, emotionScore: 0 },
    { time: 15, emotionScore: 0.2 },
    { time: 30, emotionScore: 0.1 },
    { time: 45, emotionScore: -0.3, isHesitancyPoint: true, 
      speech: "I've heard some stories about vaccine side effects that worry me...",
      aiAnalysis: "Patient expresses anxiety about vaccine safety based on anecdotal evidence, indicating potential information gap that needs addressing." },
    { time: 60, emotionScore: -0.2 },
    { time: 75, emotionScore: 0 },
    { time: 90, emotionScore: -0.4, isHesitancyPoint: true,
      speech: "My friend got really sick after the shot, and I'm not sure if it's worth the risk.",
      aiAnalysis: "Personal experience of acquaintance is influencing risk assessment, showing need for statistical context and risk-benefit explanation." },
    { time: 105, emotionScore: -0.3 },
    { time: 120, emotionScore: -0.1 },
    { time: 135, emotionScore: 0.2 },
    { time: 150, emotionScore: 0.3 },
    { time: 165, emotionScore: 0.4 },
    { time: 180, emotionScore: 0.5 }
  ]
};

export const emptyAudioAnalysis: AudioAnalysis = {
  fileName: "",
  duration: 0,
  emotionData: []
};

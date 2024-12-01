import type { AudioAnalysis, EmotionPoint } from '@/types/audio';

const generateExtendedData = (): EmotionPoint[] => {
  const data: EmotionPoint[] = [];
  for (let time = 0; time <= 3600; time += 15) {
    const emotionScore = Math.sin(time / 180) * 0.5 + Math.random() * 0.3;
    data.push({ time, emotionScore });
  }
  
  const hesitationPointsData = [
    { 
      time: 45, 
      emotionScore: -0.4,
      speech: "Here they come again, another outsider. You think your 'science' can teach us how to live? Our ways have sustained us for thousands of years.",
      aiAnalysis: "Strong initial resistance rooted in historical distrust and cultural pride. Defensive posture against perceived cultural imperialism."
    },
    { 
      time: 180, 
      emotionScore: -0.5,
      speech: "Don't trust you? Of course not. The mining companies came the same way, talking about 'help' and 'development'. Now our rivers are poisoned.",
      aiAnalysis: "Historical trauma revealed. Links current medical intervention to past betrayals. Key barrier to trust."
    },
    { 
      time: 450, 
      emotionScore: -0.45,
      speech: "...*long silence* They promised development and progress. Instead, our children got sick, couldn't even drink clean water. Now you come talking about injecting our children?",
      aiAnalysis: "Deep emotional wound surfaces. Past betrayals directly impact current medical trust. Children's safety is central concern."
    },
    { 
      time: 900, 
      emotionScore: -0.3,
      speech: "*slightly relaxing* You know about our ceremonies?",
      aiAnalysis: "First sign of openness after recognizing cultural awareness. Potential trust-building moment."
    },
    { 
      time: 1200, 
      emotionScore: -0.2,
      speech: "Last month, we lost a child... *voice trembling* The shaman says it's because the new-age evil spirits are getting stronger...",
      aiAnalysis: "Vulnerability moment sharing personal loss. Interprets modern challenges through traditional spiritual framework."
    },
    { 
      time: 1800, 
      emotionScore: -0.1,
      speech: "But if we accept this... won't it make our young people disregard tradition even more? They barely learn the ancient healing arts anymore.",
      aiAnalysis: "Fear of cultural erosion. Sees modern medicine as potential threat to traditional knowledge transmission."
    },
    { 
      time: 2400, 
      emotionScore: 0.1,
      speech: "*thoughtful* You mean let the shaman control the process?",
      aiAnalysis: "Considering compromise when traditional authority is respected. Key turning point in acceptance."
    },
    { 
      time: 3000, 
      emotionScore: 0.2,
      speech: "...tell me about the other villages. Are their traditions still alive?",
      aiAnalysis: "First sign of openness to evidence. Seeks validation through peer community experiences."
    },
    { 
      time: 3300, 
      emotionScore: 0.3,
      speech: "Maybe... maybe we can discuss it with the shaman first. He always says 'wisdom is like a river, always getting new streams'...",
      aiAnalysis: "Using traditional wisdom to justify openness to new ideas. Beginning to see possibility of integration."
    }
  ];

  hesitationPointsData.forEach(point => {
    const index = data.findIndex(d => d.time === point.time);
    if (index !== -1) {
      data[index] = { ...data[index], ...point, isHesitancyPoint: true };
    }
  });

  return data;
};

export const mockAudioAnalysis: AudioAnalysis = {
  fileName: "traditional_healer_consultation.mp3",
  duration: 3600,
  emotionData: generateExtendedData(),
  hesitationPoints: generateExtendedData().filter(point => point.isHesitancyPoint),
  summary: "Patient's conversation reveals deep-rooted cultural resistance to modern medical interventions, stemming from historical trauma with outsiders. Initial strong distrust gradually shifts to cautious consideration. Key concerns include preserving traditional practices, children's safety, and community autonomy. Notable turning point when discussing shaman's potential role in the process."
};

export const emptyAudioAnalysis: AudioAnalysis = {
  fileName: '',
  duration: 0,
  emotionData: [],
  hesitationPoints: [],
  summary: ''
};

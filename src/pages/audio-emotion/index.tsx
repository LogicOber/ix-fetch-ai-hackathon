import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Mic } from 'lucide-react';
import { AudioUploader } from '@/components/audio/AudioUploader';
import { EmotionChart } from '@/components/audio/EmotionChart';
import { mockAudioAnalysis, emptyAudioAnalysis } from '@/lib/mock-audio-data';
import type { AudioAnalysis } from '@/types/audio';

export default function AudioEmotion() {
  const [analysis, setAnalysis] = useState<AudioAnalysis>(emptyAudioAnalysis);

  const handleFileSelect = (file: File) => {
    // In a real application, we would upload the file and get analysis from the server
    console.log(`Processing file: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
    // For now, we'll just use the mock data
    setAnalysis(mockAudioAnalysis);
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Mic className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Audio Emotion Analysis</h1>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Upload Audio Recording</h2>
          <AudioUploader onFileSelect={handleFileSelect} />
        </Card>

        {analysis.emotionData.length > 0 && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Emotion Analysis</h2>
              <span className="text-sm text-gray-500">
                File: {analysis.fileName}
              </span>
            </div>
            <EmotionChart 
              data={analysis.emotionData}
            />
          </Card>
        )}
      </div>
    </div>
  );
}

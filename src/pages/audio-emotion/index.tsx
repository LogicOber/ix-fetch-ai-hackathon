import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Mic } from 'lucide-react';
import { AudioUploader } from '@/components/audio/AudioUploader';
import { EmotionChart } from '@/components/audio/EmotionChart';
import { mockAudioAnalysis, emptyAudioAnalysis } from '@/lib/mock-audio-data';
import type { AudioAnalysis } from '@/types/audio';
import { TimeRangeSelector } from '@/components/social/TimeRangeSelector';

export default function AudioEmotion() {
  const [analysis, setAnalysis] = useState<AudioAnalysis>(emptyAudioAnalysis);

  const handleFileSelect = (file: File) => {
    // In a real application, we would upload the file and get analysis from the server
    console.log(`Processing file: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
    // For now, we'll just use the mock data
    setAnalysis(mockAudioAnalysis);
  };

  return (
    <div className="min-h-screen">
      <header className="border-b border-primary/20">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mic className="h-7 w-7 text-primary" />
              <h1 className="text-2xl font-semibold">Audio Emotion Analysis</h1>
            </div>
            <div className="opacity-0">
              <TimeRangeSelector selected="day" onChange={() => {}} />
            </div>
          </div>
        </div>
      </header>

      <div className="p-8">
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
    </div>
  );
}

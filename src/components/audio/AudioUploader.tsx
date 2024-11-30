import { useState, useCallback } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AudioUploaderProps {
  onFileSelect: (file: File) => void;
}

export function AudioUploader({ onFileSelect }: AudioUploaderProps) {
  const [error, setError] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    setError('');
    
    if (rejectedFiles.length > 0) {
      setError('Only MP3 files are supported');
      return;
    }

    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'audio/mpeg': ['.mp3']
    },
    maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
        isDragActive && !isDragReject && 'border-primary bg-primary/5',
        isDragReject && 'border-gray-400 bg-gray-100 cursor-not-allowed',
        !isDragActive && !isDragReject && 'border-gray-300 hover:border-primary'
      )}
    >
      <input {...getInputProps()} />
      <Upload className={cn(
        'w-12 h-12 mx-auto mb-4',
        isDragReject ? 'text-gray-400' : 'text-primary'
      )} />
      <p className={cn(
        'text-lg font-medium',
        isDragReject ? 'text-gray-400' : 'text-gray-700'
      )}>
        {isDragReject 
          ? 'Only MP3 files are supported'
          : isDragActive 
            ? 'Drop the audio file here'
            : 'Drag & drop an MP3 file here, or click to select'}
      </p>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

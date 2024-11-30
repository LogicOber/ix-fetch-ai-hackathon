import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TimeRangeSelector } from '@/components/social/TimeRangeSelector';
import {
  Button,
  TextField,
  Typography,
  Modal,
  CircularProgress,
  Paper,
  IconButton,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { BookOpen } from 'lucide-react';

const StoryStrategy: React.FC = () => {
  const [culturalContext, setCulturalContext] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [generatedStory, setGeneratedStory] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Demo story for demonstration
  const demoStory = `
    Title: The Sacred Waters of Healing

    In the ancient times of our ancestors, there was a wise elder who discovered 
    the sacred waters blessed by the spirits of protection. These waters had the 
    power to shield the village from great illnesses that threatened their people. 
    
    The elder taught that accepting these blessed waters was a way of honoring 
    our ancestors and protecting our community's future generations. Today, 
    modern medicine carries this same sacred protection, blessed by both science 
    and spiritual wisdom.

    This story teaches us that accepting medical treatment is not just about 
    individual health, but about preserving our community's strength and honoring 
    our traditional values of protecting one another.
  `;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleGenerate = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setGeneratedStory(demoStory);
      setIsLoading(false);
      setOpenModal(true);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white">
        <header className="border-b border-primary/20">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="h-7 w-7 text-primary" />
                <h1 className="text-2xl font-semibold">Story Strategy</h1>
              </div>
              <div className="opacity-0">
                <TimeRangeSelector selected="day" onChange={() => {}} />
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="max-w-4xl space-y-6">
            <div className="rounded-lg border border-primary/20 bg-card">
              <div className="p-6">
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  variant="outlined"
                  label="Cultural Context"
                  placeholder="Describe the patient's cultural background, beliefs, and relevant context..."
                  value={culturalContext}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCulturalContext(e.target.value)}
                  className="mb-6"
                />

                <div className="flex items-center gap-4 mb-6">
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    className="w-48"
                  >
                    Upload Document
                    <input
                      type="file"
                      hidden
                      accept=".doc,.docx,.pdf"
                      onChange={handleFileUpload}
                    />
                  </Button>
                  {selectedFile && (
                    <Typography variant="body2" className="text-gray-600">
                      {selectedFile.name}
                    </Typography>
                  )}
                </div>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleGenerate}
                  disabled={!culturalContext && !selectedFile}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Generate Story Strategy
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Modal */}
        <Modal
          open={isLoading}
          aria-labelledby="loading-modal"
          className="flex items-center justify-center"
        >
          <div className="text-center outline-none">
            <CircularProgress className="text-primary" />
            <Typography variant="h6" className="mt-2 text-white">
              Generating Story Strategy...
            </Typography>
          </div>
        </Modal>

        {/* Result Modal */}
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="story-modal"
          className="flex items-center justify-center p-4"
        >
          <Paper className="relative w-full max-w-3xl max-h-[80vh] overflow-auto rounded-lg">
            <div className="p-6">
              <IconButton
                className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                onClick={() => setOpenModal(false)}
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h5" component="h2" className="text-xl font-semibold mb-4">
                Generated Story Strategy
              </Typography>
              <Typography
                variant="body1"
                component="pre"
                className="whitespace-pre-wrap font-inherit mt-4 text-gray-700"
              >
                {generatedStory}
              </Typography>
            </div>
          </Paper>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default StoryStrategy;

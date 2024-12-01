import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export type Profile = {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
};

export type MappingHistory = {
  id: string;
  user_id: string;
  analysis_type: 'audio_emotion' | 'chat_flow' | 'conversation';
  title: string;
  analyzed_at: string;
  audio_data?: {
    emotions: Record<string, number>;
    transcription: string;
    timestamps: number[];
  };
  flow_data?: {
    nodes: Array<{
      id: string;
      type: string;
      position: { x: number; y: number };
      data: Record<string, unknown>;
    }>;
    edges: Array<{
      id: string;
      source: string;
      target: string;
      type: string;
      data?: Record<string, unknown>;
    }>;
  };
  chat_data?: {
    messages: Array<{
      role: 'user' | 'assistant';
      content: string;
      timestamp: string;
    }>;
  };
  created_at: string;
};

export type SocialMetrics = {
  id: string;
  user_id: string;
  date: string;
  total_views: number;
  total_likes: number;
  total_reposts: number;
  positive_percentage: number;
  negative_percentage: number;
  positive_metrics: {
    views: number;
    likes: number;
    reposts: number;
  };
  negative_metrics: {
    views: number;
    likes: number;
    reposts: number;
  };
  created_at: string;
};

export const supabase = createClient<{
  mapping_history: MappingHistory;
}>(supabaseUrl, supabaseAnonKey);

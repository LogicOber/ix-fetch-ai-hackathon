export type TimeRange = 'day' | 'week' | 'month';
export type SentimentType = 'positive' | 'negative';

export interface SocialMetrics {
  views: number;
  likes: number;
  reposts: number;
  previousViews: number;
  previousLikes: number;
  previousReposts: number;
}

export interface Tweet {
  id: string;
  content: string;
  timestamp: string;
  metrics: {
    views: number;
    likes: number;
    reposts: number;
  };
}

export interface SocialUser {
  name: string;
  handle: string;
  influenceScore: number;
  sentiment: SentimentType;
  avatar?: string;
  tweets: Tweet[];
}

export interface TimeSeriesMetrics {
  date: string;
  totalViews: number;
  totalLikes: number;
  totalReposts: number;
  positive: {
    percentage: number;
    views: number;
    likes: number;
    reposts: number;
  };
  negative: {
    percentage: number;
    views: number;
    likes: number;
    reposts: number;
  };
}

export interface SocialData {
  metrics: {
    positive: SocialMetrics;
    negative: SocialMetrics;
  };
  users: SocialUser[];
  timeSeries: {
    day: TimeSeriesMetrics[];
    week: TimeSeriesMetrics[];
    month: TimeSeriesMetrics[];
  };
}
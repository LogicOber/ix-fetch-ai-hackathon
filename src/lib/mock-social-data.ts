import type { SocialData } from '@/types/social';

// Generate time series data
const generateTimeSeriesData = (days: number) => {
  const data = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // Generate random percentages that sum to 100
    const positivePercentage = Math.floor(Math.random() * 40) + 30; // 30-70%
    const negativePercentage = 100 - positivePercentage;
    
    // Base metrics
    const totalViews = Math.floor(Math.random() * 80000) + 160000;
    const totalLikes = Math.floor(Math.random() * 35000) + 50000;
    const totalReposts = Math.floor(Math.random() * 13000) + 15000;
    
    data.push({
      date: date.toISOString().split('T')[0],
      totalViews,
      totalLikes,
      totalReposts,
      positive: {
        percentage: positivePercentage,
        views: Math.floor(totalViews * (positivePercentage / 100)),
        likes: Math.floor(totalLikes * (positivePercentage / 100)),
        reposts: Math.floor(totalReposts * (positivePercentage / 100))
      },
      negative: {
        percentage: negativePercentage,
        views: Math.floor(totalViews * (negativePercentage / 100)),
        likes: Math.floor(totalLikes * (negativePercentage / 100)),
        reposts: Math.floor(totalReposts * (negativePercentage / 100))
      }
    });
  }

  return data;
};

// Generate mock tweets
const generateTweets = (sentiment: 'positive' | 'negative') => {
  const tweets = [];
  const baseViews = sentiment === 'positive' ? 10000 : 8000;
  const baseLikes = sentiment === 'positive' ? 5000 : 4000;
  const baseReposts = sentiment === 'positive' ? 2000 : 1500;

  for (let i = 0; i < 3; i++) {
    tweets.push({
      id: `tweet-${sentiment}-${i}`,
      content: sentiment === 'positive'
        ? "The new NHS vaccination program has shown remarkable success in reducing infection rates. Great to see such positive results! #NHS #Healthcare"
        : "Concerned about the long waiting times at local NHS facilities. We need better resource allocation. #NHSCrisis",
      timestamp: new Date().toISOString(),
      metrics: {
        views: Math.floor(Math.random() * 5000) + baseViews,
        likes: Math.floor(Math.random() * 2000) + baseLikes,
        reposts: Math.floor(Math.random() * 1000) + baseReposts
      }
    });
  }

  return tweets;
};

// Generate different time ranges of data
const dayData = generateTimeSeriesData(1)[0];
const weekData = generateTimeSeriesData(7);
const monthData = generateTimeSeriesData(30);

export const mockSocialData: SocialData = {
  metrics: {
    positive: {
      views: dayData.positive.views,
      likes: dayData.positive.likes,
      reposts: dayData.positive.reposts,
      previousViews: Math.floor(dayData.positive.views * 0.8),
      previousLikes: Math.floor(dayData.positive.likes * 0.8),
      previousReposts: Math.floor(dayData.positive.reposts * 0.8)
    },
    negative: {
      views: dayData.negative.views,
      likes: dayData.negative.likes,
      reposts: dayData.negative.reposts,
      previousViews: Math.floor(dayData.negative.views * 1.2),
      previousLikes: Math.floor(dayData.negative.likes * 1.2),
      previousReposts: Math.floor(dayData.negative.reposts * 1.2)
    }
  },
  users: [
    {
      name: "Sarah Johnson",
      handle: "@sarahj_health",
      influenceScore: 88,
      sentiment: "positive",
      tweets: generateTweets('positive')
    },
    {
      name: "Dr. Michael Chen",
      handle: "@dr_chen_med",
      influenceScore: 84,
      sentiment: "positive",
      tweets: generateTweets('positive')
    },
    {
      name: "Emma Williams",
      handle: "@emma_wellness",
      influenceScore: 82,
      sentiment: "positive",
      tweets: generateTweets('positive')
    },
    {
      name: "James Wilson",
      handle: "@jwilson_health",
      influenceScore: 70,
      sentiment: "positive",
      tweets: generateTweets('positive')
    },
    {
      name: "Lisa Brown",
      handle: "@lisa_healthcare",
      influenceScore: 69,
      sentiment: "positive",
      tweets: generateTweets('positive')
    },
    {
      name: "Robert Smith",
      handle: "@rob_smith",
      influenceScore: 88,
      sentiment: "negative",
      tweets: generateTweets('negative')
    },
    {
      name: "Anna Martinez",
      handle: "@anna_m",
      influenceScore: 84,
      sentiment: "negative",
      tweets: generateTweets('negative')
    },
    {
      name: "David Lee",
      handle: "@david_lee",
      influenceScore: 82,
      sentiment: "negative",
      tweets: generateTweets('negative')
    },
    {
      name: "Rachel Green",
      handle: "@rachel_g",
      influenceScore: 70,
      sentiment: "negative",
      tweets: generateTweets('negative')
    },
    {
      name: "Tom Anderson",
      handle: "@tom_anderson",
      influenceScore: 69,
      sentiment: "negative",
      tweets: generateTweets('negative')
    }
  ],
  timeSeries: {
    day: [dayData],
    week: weekData,
    month: monthData
  }
};
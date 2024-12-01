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
      influenceScore: 92,
      sentiment: "positive",
      tweets: generateTweets('positive')
    },
    {
      name: "David Chen",
      handle: "@dchen_med",
      influenceScore: 88,
      sentiment: "positive",
      tweets: generateTweets('positive')
    },
    {
      name: "Emma Williams",
      handle: "@emma_healthcare",
      influenceScore: 85,
      sentiment: "positive",
      tweets: generateTweets('positive')
    },
    {
      name: "Lisa Anderson",
      handle: "@lisa_health",
      influenceScore: 78,
      sentiment: "positive",
      tweets: generateTweets('positive')
    },
    {
      name: "Rachel Lee",
      handle: "@rlee_medical",
      influenceScore: 75,
      sentiment: "positive",
      tweets: generateTweets('positive')
    },
    {
      name: "Sophie Turner",
      handle: "@sturner_nhs",
      influenceScore: 72,
      sentiment: "positive",
      tweets: generateTweets('positive')
    },
    {
      name: "Jennifer Smith",
      handle: "@jsmith_care",
      influenceScore: 89,
      sentiment: "positive",
      tweets: generateTweets('positive')
    },
    {
      name: "Mark Davis",
      handle: "@mdavis_health",
      influenceScore: 86,
      sentiment: "positive",
      tweets: generateTweets('positive')
    },
    {
      name: "Alice Cooper",
      handle: "@acooper_med",
      influenceScore: 83,
      sentiment: "positive",
      tweets: generateTweets('positive')
    },
    {
      name: "Peter Zhang",
      handle: "@pzhang_health",
      influenceScore: 81,
      sentiment: "positive",
      tweets: generateTweets('positive')
    },
    {
      name: "Laura White",
      handle: "@lwhite_care",
      influenceScore: 77,
      sentiment: "positive",
      tweets: generateTweets('positive')
    },
    {
      name: "Kevin Brown",
      handle: "@kbrown_health",
      influenceScore: 74,
      sentiment: "positive",
      tweets: generateTweets('positive')
    },
    {
      name: "Maria Garcia",
      handle: "@mgarcia_med",
      influenceScore: 71,
      sentiment: "positive",
      tweets: generateTweets('positive')
    },
    {
      name: "Chris Wilson",
      handle: "@cwilson_care",
      influenceScore: 69,
      sentiment: "positive",
      tweets: generateTweets('positive')
    },
    {
      name: "Michael Brown",
      handle: "@mbrown_nhs",
      influenceScore: 82,
      sentiment: "negative",
      tweets: generateTweets('negative')
    },
    {
      name: "James Wilson",
      handle: "@jwilson_doc",
      influenceScore: 76,
      sentiment: "negative",
      tweets: generateTweets('negative')
    },
    {
      name: "Thomas Clark",
      handle: "@tclark_health",
      influenceScore: 74,
      sentiment: "negative",
      tweets: generateTweets('negative')
    },
    {
      name: "Robert Taylor",
      handle: "@rtaylor_med",
      influenceScore: 71,
      sentiment: "negative",
      tweets: generateTweets('negative')
    },
    {
      name: "Richard Lee",
      handle: "@rlee_critic",
      influenceScore: 87,
      sentiment: "negative",
      tweets: generateTweets('negative')
    },
    {
      name: "Sarah Miller",
      handle: "@smiller_watch",
      influenceScore: 84,
      sentiment: "negative",
      tweets: generateTweets('negative')
    },
    {
      name: "Daniel Park",
      handle: "@dpark_health",
      influenceScore: 80,
      sentiment: "negative",
      tweets: generateTweets('negative')
    },
    {
      name: "Emily Rogers",
      handle: "@erogers_med",
      influenceScore: 77,
      sentiment: "negative",
      tweets: generateTweets('negative')
    },
    {
      name: "Andrew Thompson",
      handle: "@athompson_nhs",
      influenceScore: 75,
      sentiment: "negative",
      tweets: generateTweets('negative')
    },
    {
      name: "Jessica Chen",
      handle: "@jchen_health",
      influenceScore: 73,
      sentiment: "negative",
      tweets: generateTweets('negative')
    },
    {
      name: "Paul Martinez",
      handle: "@pmartinez_care",
      influenceScore: 70,
      sentiment: "negative",
      tweets: generateTweets('negative')
    },
    {
      name: "Karen White",
      handle: "@kwhite_health",
      influenceScore: 68,
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
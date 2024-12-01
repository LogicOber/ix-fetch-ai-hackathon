export interface Plan {
  id: string;
  name: string;
  description: string;
  price_monthly: number;
  price_yearly: number;
  features: {
    health_board_analyses: number;
    social_media_analyses: number;
    record_mapping: 'basic' | 'advanced';
    support: 'community' | 'priority';
    custom_reports?: boolean;
    api_access?: boolean;
  };
  created_at: string;
}

export interface Invoice {
  id: string;
  amount: number;
  status: string;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: 'active' | 'canceled' | 'incomplete' | 'past_due';
  interval: 'month' | 'year';
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
  plan?: Plan;
  card_last4?: string;
  invoices?: Invoice[];
  used_health_board_analyses?: number;
  used_social_media_analyses?: number;
}

export interface UsageLimit {
  id: string;
  user_id: string;
  feature: string;
  used: number;
  usage_limit: number;
  reset_at: string;
  created_at: string;
}

export const isPro = (subscription: Subscription | null): boolean => {
  return Boolean(subscription?.plan_id === 'pro' && subscription?.status === 'active');
};

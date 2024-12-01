import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Plan, Subscription } from '@/types/subscription';

export function useSubscription() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);

  const loadSubscription = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // Set default free plan for non-authenticated users
        setPlan({
          id: 'free',
          name: 'Free',
          description: 'Get started with basic features',
          price_monthly: 0,
          price_yearly: 0,
          features: {
            health_board_analyses: 5,
            social_media_analyses: 3,
            record_mapping: 'basic',
            support: 'community'
          },
          created_at: new Date().toISOString()
        });
        setLoading(false);
        return;
      }

      const { data: sub, error: subError } = await supabase
        .from('subscriptions')
        .select(`
          *,
          plan:plans(*)
        `)
        .eq('user_id', user.id)
        .or('status.eq.active,cancel_at_period_end.eq.true')
        .single();

      if (subError && subError.code !== 'PGRST116') throw subError;

      if (sub) {
        setSubscription(sub);
        setPlan(sub.plan);
      } else {
        // Set default free plan for authenticated users without subscription
        setPlan({
          id: 'free',
          name: 'Free',
          description: 'Get started with basic features',
          price_monthly: 0,
          price_yearly: 0,
          features: {
            health_board_analyses: 5,
            social_media_analyses: 3,
            record_mapping: 'basic',
            support: 'community'
          },
          created_at: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error loading subscription:', error);
      // Set default free plan on error
      setPlan({
        id: 'free',
        name: 'Free',
        description: 'Get started with basic features',
        price_monthly: 0,
        price_yearly: 0,
        features: {
          health_board_analyses: 5,
          social_media_analyses: 3,
          record_mapping: 'basic',
          support: 'community'
        },
        created_at: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSubscription();

    const subscription = supabase
      .channel('subscription-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'subscriptions',
        },
        loadSubscription
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [loadSubscription]);

  return { 
    subscription, 
    plan, 
    loading,
    refetch: loadSubscription  // 导出 refetch 函数
  };
}

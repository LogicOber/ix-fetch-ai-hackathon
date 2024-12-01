import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useSubscription } from './useSubscription';

export function useFeatureAccess(feature: string) {
  const { plan } = useSubscription();
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAccess() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return false;

        const { data, error } = await supabase
          .rpc('check_feature_limit', {
            user_id: user.id,
            feature: feature
          });

        if (error) throw error;
        setHasAccess(data);
      } catch (error) {
        console.error('Error checking feature access:', error);
        setHasAccess(false);
      } finally {
        setLoading(false);
      }
    }

    checkAccess();
  }, [feature, plan]);

  return { hasAccess, loading };
}

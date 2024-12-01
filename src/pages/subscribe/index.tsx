import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';

export default function SubscribePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [yearlyBilling, setYearlyBilling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (planId: string) => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth/login');
        return;
      }

      // 先检查是否已有订阅
      const { data: existingSub } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single();

      let error;
      
      if (existingSub) {
        // 如果已有订阅，更新它
        const { error: updateError } = await supabase
          .from('subscriptions')
          .update({
            plan_id: planId,
            status: 'active',
            interval: yearlyBilling ? 'year' : 'month',
            current_period_start: new Date().toISOString(),
            current_period_end: new Date(Date.now() + (yearlyBilling ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString(),
            cancel_at_period_end: false
          })
          .eq('user_id', user.id);
        error = updateError;
      } else {
        // 如果没有订阅，创建新的
        const { error: insertError } = await supabase
          .from('subscriptions')
          .insert([
            {
              user_id: user.id,
              plan_id: planId,
              status: 'active',
              interval: yearlyBilling ? 'year' : 'month',
              current_period_start: new Date().toISOString(),
              current_period_end: new Date(Date.now() + (yearlyBilling ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString(),
              cancel_at_period_end: false
            }
          ]);
        error = insertError;
      }

      if (error) throw error;

      toast({
        title: 'Success',
        description: existingSub ? 'Successfully updated your subscription' : 'Successfully subscribed to the plan',
      });
      
      navigate('/billing');
    } catch (error) {
      console.error('Error managing subscription:', error);
      toast({
        title: 'Error',
        description: 'Failed to manage subscription',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-6xl py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-muted-foreground mb-8">
          Select the perfect plan for your needs
        </p>
        <div className="flex items-center justify-center gap-2">
          <span className={yearlyBilling ? 'text-muted-foreground' : ''}>Monthly</span>
          <Switch
            checked={yearlyBilling}
            onCheckedChange={setYearlyBilling}
          />
          <span className={!yearlyBilling ? 'text-muted-foreground' : ''}>Yearly (Save 20%)</span>
        </div>
      </div>

      <div className="flex justify-center gap-8">
        <Card className="w-[400px] p-6 flex flex-col">
          <div className="flex-1">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">Defo Furth</h2>
              <p className="text-muted-foreground">Basic features for individuals</p>
            </div>
            
            <div className="mb-6">
              <span className="text-3xl font-bold">$0</span>
              <span className="text-muted-foreground">/month</span>
              <div className="text-sm text-muted-foreground h-[24px]">
                &nbsp;
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>5 Health Board Analyses per month</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>3 Social Media Analyses per month</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Basic Record Mapping</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Community Support</span>
              </div>
            </div>
          </div>

          <Button
            className="w-full mt-6"
            variant="outline"
            disabled
          >
            Current Plan
          </Button>
        </Card>

        <Card className="w-[400px] p-6 border-primary flex flex-col">
          <div className="flex-1">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">Pro</h2>
              <p className="text-muted-foreground">Advanced features for professionals</p>
            </div>
            
            <div className="mb-6">
              <span className="text-3xl font-bold">
                ${yearlyBilling ? '25' : '29'}
              </span>
              <span className="text-muted-foreground">/{yearlyBilling ? 'year' : 'month'}</span>
              <div className="text-sm text-muted-foreground h-[24px]">
                {yearlyBilling ? `Billed $${25 * 12} yearly` : '\u00A0'}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>50 Health Board Analyses per month</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>30 Social Media Analyses per month</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Advanced Record Mapping</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Priority Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Custom Report Generation</span>
              </div>
            </div>
          </div>

          <Button
            className="w-full mt-6"
            onClick={() => handleSubscribe('pro')}
            disabled={isLoading}
          >
            {isLoading ? 'Upgrading...' : 'Upgrade to Pro'}
          </Button>
        </Card>
      </div>
    </div>
  );
}

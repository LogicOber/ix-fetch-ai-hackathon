import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '@/hooks/useSubscription';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function BillingPage() {
  const navigate = useNavigate();
  const { subscription, loading, refetch } = useSubscription();
  const { toast } = useToast();
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  useEffect(() => {
    if (!loading && (!subscription || subscription.plan_id !== 'pro')) {
      navigate('/subscribe');
    }
  }, [subscription, loading, navigate]);

  const handleCancelSubscription = async () => {
    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({ 
          status: 'canceled',
          cancel_at_period_end: true 
        })
        .eq('user_id', subscription?.user_id)
        .single();

      if (error) throw error;

      // 手动触发订阅数据重新加载
      await refetch();

      toast({
        title: 'Subscription Cancelled',
        description: 'Your subscription will end at the end of your current billing period',
      });
      
      setShowCancelDialog(false);
    } catch (error) {
      console.error('Error canceling subscription:', error);
      toast({
        title: 'Error',
        description: 'Failed to cancel subscription',
        variant: 'destructive',
      });
    }
  };

  const handleReactivateSubscription = async () => {
    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({ 
          status: 'active',
          cancel_at_period_end: false 
        })
        .eq('user_id', subscription?.user_id)
        .single();

      if (error) throw error;

      // 手动触发订阅数据重新加载
      await refetch();

      toast({
        title: 'Subscription Reactivated',
        description: 'Your Pro subscription has been reactivated successfully',
      });
    } catch (error) {
      console.error('Error reactivating subscription:', error);
      toast({
        title: 'Error',
        description: 'Failed to reactivate subscription',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!subscription || subscription.plan_id !== 'pro') {
    return null;
  }

  const periodEnd = new Date(subscription.current_period_end).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const isCanceled = subscription.status === 'canceled' || subscription.cancel_at_period_end;

  return (
    <div className="min-h-screen">
      <header className="border-b border-primary/20">
        <div className="px-8 py-6">
          <div className="flex items-center gap-3">
            <CreditCard className="h-7 w-7 text-primary" />
            <h1 className="text-2xl font-semibold">Billing & Subscription</h1>
          </div>
        </div>
      </header>

      <div className="p-8 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>
              {isCanceled 
                ? `Your Pro plan will end on ${periodEnd}`
                : 'You are currently on the Pro plan'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">Pro Plan</p>
                <p className="text-muted-foreground">
                  {subscription.interval === 'year' ? 'Yearly' : 'Monthly'} billing
                </p>
                {isCanceled && (
                  <p className="text-sm text-destructive mt-2">
                    Subscription will be canceled at the end of the billing period
                  </p>
                )}
              </div>
              {isCanceled ? (
                <Button
                  variant="default"
                  onClick={handleReactivateSubscription}
                  disabled={loading}
                >
                  Reactivate Subscription
                </Button>
              ) : (
                <Button
                  variant="destructive"
                  onClick={() => setShowCancelDialog(true)}
                  disabled={loading}
                >
                  Cancel Subscription
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Your current payment method details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <CreditCard className="h-6 w-6" />
                <div>
                  <p className="font-medium">
                    <span className="font-mono">**** **** **** {subscription.card_last4 || '****'}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">Expires 12/2024</p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => window.open('https://billing.stripe.com/p/login/test', '_blank')}
              >
                Update
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>Your recent billing history and invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(subscription.invoices || []).map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Pro Plan - {subscription.interval === 'year' ? 'Yearly' : 'Monthly'}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(invoice.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-medium">${invoice.amount / 100}</p>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Subscription?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                Are you sure you want to cancel your subscription? Your Pro access will continue until {periodEnd}.
              </p>
              <p>
                After this date, you'll lose access to Pro features and your account will be downgraded to the Free plan.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelSubscription}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Cancel Subscription
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

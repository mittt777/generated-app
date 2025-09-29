import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Check, CreditCard, Loader2 } from 'lucide-react';
import { Plan, PlanId, Invoice, Subscription } from '@shared/types';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';
import { format } from 'date-fns';
import { api } from '@/lib/api-client';
import { Toaster, toast } from '@/components/ui/sonner';
import { Skeleton } from '@/components/ui/skeleton';
const pricingPlans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'For individuals and small teams getting started.',
    price: 0,
    priceSuffix: '/ month',
    features: ['1 Project', 'Basic Analytics', 'Community Support'],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For growing businesses that need more power.',
    price: 20,
    priceSuffix: '/ month',
    features: ['10 Projects', 'Advanced Analytics', 'Priority Email Support', 'API Access'],
    isPopular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations with custom needs.',
    price: 0,
    priceSuffix: 'Contact Us',
    features: ['Unlimited Projects', 'Dedicated Support', 'Custom Integrations', 'SLA'],
  },
];
export function BillingPage() {
  const subscription = useAuthStore((state) => state.subscription);
  const tenant = useAuthStore((state) => state.tenant);
  const updateSubscription = useAuthStore((state) => state.updateSubscription);
  const [isLoading, setIsLoading] = useState<PlanId | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoadingInvoices, setIsLoadingInvoices] = useState(true);
  useEffect(() => {
    async function fetchInvoices() {
      if (!tenant) return;
      try {
        const data = await api<Invoice[]>(`/api/billing/history/${tenant.id}`);
        setInvoices(data);
      } catch (error) {
        toast.error('Failed to fetch billing history.');
      } finally {
        setIsLoadingInvoices(false);
      }
    }
    fetchInvoices();
  }, [tenant]);
  const currentPlan = pricingPlans.find(p => p.id === subscription?.planId);
  const renewalDate = subscription?.currentPeriodEnd ? format(new Date(subscription.currentPeriodEnd), 'MMMM dd, yyyy') : 'N/A';
  const handleUpgradePlan = async (newPlanId: PlanId) => {
    if (!tenant) {
      toast.error('Tenant information is missing.');
      return;
    }
    setIsLoading(newPlanId);
    try {
      const updatedSub = await api<Subscription>(`/api/subscription/change`, {
        method: 'POST',
        body: JSON.stringify({ tenantId: tenant.id, newPlanId }),
      });
      updateSubscription(updatedSub);
      // Refetch invoices
      const data = await api<Invoice[]>(`/api/billing/history/${tenant.id}`);
      setInvoices(data);
      toast.success(`Successfully upgraded to the ${pricingPlans.find(p => p.id === newPlanId)?.name} plan!`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      toast.error(`Upgrade failed: ${errorMessage}`);
    } finally {
      setIsLoading(null);
    }
  };
  return (
    <>
      <Toaster richColors closeButton />
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Billing</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>You are currently on the {currentPlan?.name} plan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="font-semibold text-2xl">${currentPlan?.price}/month</p>
            <p className="text-sm text-muted-foreground">Your plan renews on {renewalDate}.</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" disabled>Cancel Subscription</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Change how you pay for your plan.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <CreditCard className="h-8 w-8" />
              <div>
                <p className="font-medium">Visa ending in 1234</p>
                <p className="text-sm text-muted-foreground">Expires 12/2025</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" disabled>Update Payment Method</Button>
          </CardFooter>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View your past invoices and payments.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingInvoices ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.length > 0 ? (
                  invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{format(new Date(invoice.createdAt), 'MMMM dd, yyyy')}</TableCell>
                      <TableCell>Payment for {invoice.planName} plan</TableCell>
                      <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={invoice.status === 'paid' ? 'default' : 'destructive'}>
                          {invoice.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No invoices found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      <div>
        <h2 className="text-xl font-semibold mb-4">Upgrade your plan</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <Card key={plan.id} className={cn("flex flex-col", plan.id === subscription?.planId && "border-primary")}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    {plan.price > 0 ? `$${plan.price}` : 'Custom'}
                  </span>
                  <span className="text-muted-foreground">{plan.price > 0 ? plan.priceSuffix : ''}</span>
                </div>
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  disabled={plan.id === subscription?.planId || isLoading !== null || plan.id === 'enterprise'}
                  onClick={() => handleUpgradePlan(plan.id)}
                >
                  {isLoading === plan.id && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {plan.id === subscription?.planId ? 'Current Plan' : plan.id === 'enterprise' ? 'Contact Sales' : 'Upgrade'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
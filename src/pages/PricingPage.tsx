import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Plan } from '@shared/types';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
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
    price: 0, // Custom pricing
    priceSuffix: 'Contact Us',
    features: ['Unlimited Projects', 'Dedicated Support', 'Custom Integrations', 'SLA'],
  },
];
const PricingCard = ({ plan }: { plan: Plan }) => (
  <Card className={cn("flex flex-col", plan.isPopular && "border-primary shadow-lg")}>
    {plan.isPopular && (
      <div className="bg-primary text-primary-foreground text-center text-sm font-semibold py-1.5 rounded-t-lg">
        Most Popular
      </div>
    )}
    <CardHeader>
      <CardTitle>{plan.name}</CardTitle>
      <CardDescription>{plan.description}</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow">
      <div className="mb-6">
        <span className="text-4xl font-bold">
          {plan.price > 0 ? `$${plan.price}` : ''}
        </span>
        <span className="text-muted-foreground">{plan.priceSuffix}</span>
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
      <Button className="w-full" variant={plan.isPopular ? 'default' : 'outline'} asChild>
        <Link to="/signup">
          {plan.id === 'enterprise' ? 'Contact Sales' : 'Get Started'}
        </Link>
      </Button>
    </CardFooter>
  </Card>
);
export function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow">
        <section className="py-16 md:py-24 lg:py-32">
          <div className="container max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Find the perfect plan
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                Start for free, then upgrade as you grow. All plans include our core features.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {pricingPlans.map((plan) => (
                <PricingCard key={plan.id} plan={plan} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
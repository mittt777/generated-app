import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Zap, BarChart, Users, Shield } from 'lucide-react';
import { Plan } from '@shared/types';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const features = [
  {
    icon: Zap,
    title: 'Blazing Fast',
    description: 'Built on Cloudflare Workers for unparalleled performance and reliability worldwide.',
  },
  {
    icon: BarChart,
    title: 'Insightful Analytics',
    description: 'Get a clear view of your subscription metrics and make data-driven decisions.',
  },
  {
    icon: Users,
    title: 'Multi-Tenancy',
    description: 'Manage multiple organizations or clients from a single, unified dashboard.',
  },
  {
    icon: Shield,
    title: 'Secure & Scalable',
    description: 'Robust security measures and scalable infrastructure to grow with your business.',
  },
];
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
  <Card className={cn("flex flex-col transition-all hover:shadow-xl hover:-translate-y-1", plan.isPopular && "border-primary shadow-lg")}>
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
export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-24 md:py-32 lg:py-40">
          <div className="container max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                The Modern SaaS Platform for Subscription Billing
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                Zenith provides a stunning, user-friendly interface to manage your subscriptions, billing, and services with ease.
              </p>
              <div className="mt-10 flex justify-center gap-x-6">
                <Button size="lg" asChild>
                  <Link to="/signup">Get Started for Free</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-muted/40">
          <div className="container max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to grow
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Focus on your product. We'll handle the billing.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-center">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground mx-auto">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 text-lg font-medium">{feature.title}</h3>
                    <p className="mt-2 text-base text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Pricing Section */}
        <section className="py-16 md:py-24">
          <div className="container max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Transparent Pricing
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Choose the plan that's right for you.
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
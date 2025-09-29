import { Hono } from "hono";
import type { Env } from './core-utils';
import { UserEntity, TenantEntity, SubscriptionEntity, InvoiceEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
import { User, Tenant, Subscription, PlanId, Invoice } from "@shared/types";
const pricingPlans = [
  { id: 'free', name: 'Free', price: 0 },
  { id: 'pro', name: 'Pro', price: 20 },
  { id: 'enterprise', name: 'Enterprise', price: 0 },
];

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function userRoutes(app: Hono<{ Bindings: Env }>) {
  app.post('/api/auth/signup', async (c) => {
    const { name, email, password } = await c.req.json<Partial<User>>();
    if (!isStr(name) || !isStr(email) || !isStr(password)) {
      return bad(c, 'Name, email, and password are required.');
    }
    const userExists = await new UserEntity(c.env, email).exists();
    if (userExists) {
      return bad(c, 'A user with this email already exists.');
    }
    const tenantId = crypto.randomUUID();
    // Create User
    const hashedPassword = await hashPassword(password);
    const newUser: User = { id: crypto.randomUUID(), name, email, password: hashedPassword, tenantId };
    await UserEntity.create(c.env, newUser, email); // Use email as key
    // Create Tenant
    const newTenant = await TenantEntity.create(c.env, {
      id: tenantId,
      name: `${name}'s Team`,
      createdAt: new Date().toISOString(),
    });
    // Create Subscription
    const periodEnd = new Date();
    periodEnd.setDate(periodEnd.getDate() + 14); // 14-day trial
    const newSubscription = await SubscriptionEntity.create(c.env, {
      id: crypto.randomUUID(),
      tenantId: tenantId,
      planId: 'free',
      status: 'trialing',
      currentPeriodEnd: periodEnd.toISOString(),
    }, tenantId); // Use tenantId as key
    // Create initial Invoice
    await InvoiceEntity.create(c.env, {
      id: crypto.randomUUID(),
      tenantId,
      amount: 0,
      status: 'paid',
      createdAt: new Date().toISOString(),
      planName: 'Free (Trial)',
    });
    const { password: _, ...userResponse } = newUser;
    return ok(c, {
      user: userResponse,
      tenant: newTenant,
      subscription: newSubscription,
    });
  });
  app.post('/api/auth/login', async (c) => {
    const { email, password } = await c.req.json<Partial<User>>();
    if (!isStr(email) || !isStr(password)) {
      return bad(c, 'Email and password are required.');
    }
    const userEntity = new UserEntity(c.env, email);
    if (!await userEntity.exists()) {
      return notFound(c, 'User not found.');
    }
    const user = await userEntity.getState();
    const hashedPassword = await hashPassword(password);
    if (user.password !== hashedPassword) {
      return bad(c, 'Invalid credentials.');
    }
    if (!user.tenantId) {
      return notFound(c, 'User is not associated with a tenant.');
    }
    const tenant = await new TenantEntity(c.env, user.tenantId).getState();
    const subscription = await new SubscriptionEntity(c.env, user.tenantId).getState();
    const { password: _, ...userResponse } = user;
    return ok(c, {
      user: userResponse,
      tenant,
      subscription,
    });
  });
  // USER & TENANT UPDATES
  app.post('/api/user/update', async (c) => {
    const { email, name } = await c.req.json<{ email: string; name: string }>();
    if (!isStr(email) || !isStr(name)) return bad(c, 'Email and name are required.');
    const userEntity = new UserEntity(c.env, email);
    if (!await userEntity.exists()) return notFound(c, 'User not found.');
    const updatedUser = await userEntity.mutate(user => ({ ...user, name }));
    const { password: _, ...userResponse } = updatedUser;
    return ok(c, userResponse);
  });
  app.post('/api/tenant/update', async (c) => {
    const { id, name } = await c.req.json<{ id: string; name: string }>();
    if (!isStr(id) || !isStr(name)) return bad(c, 'Tenant ID and name are required.');
    const tenantEntity = new TenantEntity(c.env, id);
    if (!await tenantEntity.exists()) return notFound(c, 'Tenant not found.');
    const updatedTenant = await tenantEntity.mutate(tenant => ({ ...tenant, name }));
    return ok(c, updatedTenant);
  });
  // SUBSCRIPTION & BILLING
  app.post('/api/subscription/change', async (c) => {
    const { tenantId, newPlanId } = await c.req.json<{ tenantId: string; newPlanId: PlanId }>();
    if (!isStr(tenantId) || !isStr(newPlanId)) return bad(c, 'Tenant ID and new Plan ID are required.');
    const subEntity = new SubscriptionEntity(c.env, tenantId);
    if (!await subEntity.exists()) return notFound(c, 'Subscription not found.');
    const planDetails = pricingPlans.find(p => p.id === newPlanId);
    if (!planDetails) return bad(c, 'Invalid plan selected.');
    // Create Invoice for the change
    await InvoiceEntity.create(c.env, {
      id: crypto.randomUUID(),
      tenantId,
      amount: planDetails.price,
      status: 'paid',
      createdAt: new Date().toISOString(),
      planName: planDetails.name,
    });
    const updatedSubscription = await subEntity.mutate(sub => ({
      ...sub,
      planId: newPlanId,
      status: 'active', // Assume changing plan makes it active
      currentPeriodEnd: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(), // Set next billing date
    }));
    return ok(c, updatedSubscription);
  });
  app.get('/api/billing/history/:tenantId', async (c) => {
    const tenantId = c.req.param('tenantId');
    if (!isStr(tenantId)) return bad(c, 'Tenant ID is required.');
    const invoiceResult = await InvoiceEntity.list(c.env, tenantId);
    const tenantInvoices = invoiceResult.items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return ok(c, tenantInvoices);
  });
}
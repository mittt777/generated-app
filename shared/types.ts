export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
// ZENITH SAAS PLATFORM TYPES
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Only for creation/login, should not be sent back to client
  tenantId?: string; // Link to the user's tenant
}
export type PlanId = 'free' | 'pro' | 'enterprise';
export interface Plan {
  id: PlanId;
  name: string;
  description: string;
  price: number;
  priceSuffix: string;
  features: string[];
  isPopular?: boolean;
}
export interface Tenant {
  id: string;
  name: string;
  createdAt: string;
}
export interface Subscription {
  id: string;
  tenantId: string;
  planId: PlanId;
  status: 'active' | 'trialing' | 'canceled';
  currentPeriodEnd: string;
}
export interface Invoice {
  id: string;
  tenantId: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  createdAt: string;
  planName: string;
}
export interface AuthPayload {
  user: Omit<User, 'password'>;
  tenant: Tenant;
  subscription: Subscription;
}
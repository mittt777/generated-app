import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Tenant, Subscription, AuthPayload } from '@shared/types';
interface AuthState {
  isAuthenticated: boolean;
  user: Omit<User, 'password'> | null;
  tenant: Tenant | null;
  subscription: Subscription | null;
  login: (data: AuthPayload) => void;
  logout: () => void;
  updateUser: (user: Omit<User, 'password'>) => void;
  updateTenant: (tenant: Tenant) => void;
  updateSubscription: (subscription: Subscription) => void;
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      tenant: null,
      subscription: null,
      login: (data) => set({
        isAuthenticated: true,
        user: data.user,
        tenant: data.tenant,
        subscription: data.subscription,
      }),
      logout: () => set({
        isAuthenticated: false,
        user: null,
        tenant: null,
        subscription: null,
      }),
      updateUser: (user) => set((state) => ({
        ...state,
        user: state.user ? { ...state.user, ...user } : user,
      })),
      updateTenant: (tenant) => set((state) => ({
        ...state,
        tenant: state.tenant ? { ...state.tenant, ...tenant } : tenant,
      })),
      updateSubscription: (subscription) => set((state) => ({
        ...state,
        subscription: state.subscription ? { ...state.subscription, ...subscription } : subscription,
      })),
    }),
    {
      name: 'zenith-auth-storage', // name of the item in the storage (must be unique)
    }
  )
);
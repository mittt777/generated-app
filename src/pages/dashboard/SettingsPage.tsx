import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/lib/api-client';
import { Toaster, toast } from '@/components/ui/sonner';
import { Loader2 } from 'lucide-react';
import { User, Tenant } from '@shared/types';
const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
});
const tenantSchema = z.object({
  name: z.string().min(2, { message: "Tenant name must be at least 2 characters." }),
});
export function SettingsPage() {
  const user = useAuthStore((state) => state.user);
  const tenant = useAuthStore((state) => state.tenant);
  const updateUser = useAuthStore((state) => state.updateUser);
  const updateTenant = useAuthStore((state) => state.updateTenant);
  const [isProfileSaving, setIsProfileSaving] = useState(false);
  const [isTenantSaving, setIsTenantSaving] = useState(false);
  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });
  const tenantForm = useForm<z.infer<typeof tenantSchema>>({
    resolver: zodResolver(tenantSchema),
    defaultValues: {
      name: tenant?.name || '',
    },
  });
  useEffect(() => {
    if (user) {
      profileForm.reset({ name: user.name, email: user.email });
    }
    if (tenant) {
      tenantForm.reset({ name: tenant.name });
    }
  }, [user, tenant]);
  async function handleSaveProfile(values: z.infer<typeof profileSchema>) {
    if (!user) return;
    setIsProfileSaving(true);
    try {
      const updatedUser = await api<Omit<User, 'password'>>('/api/user/update', {
        method: 'POST',
        body: JSON.stringify({ email: user.email, name: values.name }),
      });
      updateUser(updatedUser);
      toast.success('Profile updated successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      toast.error(`Update failed: ${errorMessage}`);
    } finally {
      setIsProfileSaving(false);
    }
  }
  async function handleSaveTenant(values: z.infer<typeof tenantSchema>) {
    if (!tenant) return;
    setIsTenantSaving(true);
    try {
      const updatedTenant = await api<Tenant>('/api/tenant/update', {
        method: 'POST',
        body: JSON.stringify({ id: tenant.id, name: values.name }),
      });
      updateTenant(updatedTenant);
      toast.success('Tenant updated successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      toast.error(`Update failed: ${errorMessage}`);
    } finally {
      setIsTenantSaving(false);
    }
  }
  return (
    <>
      <Toaster richColors closeButton />
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Settings</h1>
      </div>
      <div className="grid gap-6">
        <Card>
          <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(handleSaveProfile)}>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  This is how others will see you on the site.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={profileForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email" {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button type="submit" disabled={isProfileSaving}>
                  {isProfileSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
        <Card>
          <Form {...tenantForm}>
            <form onSubmit={tenantForm.handleSubmit(handleSaveTenant)}>
              <CardHeader>
                <CardTitle>Tenant</CardTitle>
                <CardDescription>
                  Manage your organization's settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={tenantForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tenant Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your tenant's name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button type="submit" disabled={isTenantSaving}>
                  {isTenantSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
}
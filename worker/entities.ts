import { IndexedEntity } from "./core-utils";
import type { User, Tenant, Subscription, Invoice } from "@shared/types";
// USER ENTITY
export class UserEntity extends IndexedEntity<User> {
  static readonly entityName = "user";
  static readonly indexName = "users";
  static readonly initialState: User = { id: "", name: "", email: "", tenantId: "" };
}
// TENANT ENTITY
export class TenantEntity extends IndexedEntity<Tenant> {
  static readonly entityName = "tenant";
  static readonly indexName = "tenants";
  static readonly initialState: Tenant = { id: "", name: "", createdAt: "" };
}
// SUBSCRIPTION ENTITY
export class SubscriptionEntity extends IndexedEntity<Subscription> {
  static readonly entityName = "subscription";
  static readonly indexName = "subscriptions";
  static readonly initialState: Subscription = {
    tenantId: "",
    planId: "free",
    status: "trialing",
    currentPeriodEnd: "",
    id: ""
  };
}
// INVOICE ENTITY
export class InvoiceEntity extends IndexedEntity<Invoice> {
  static readonly entityName = "invoice";
  static readonly indexName = "invoices";
  static readonly initialState: Invoice = {
    id: "",
    tenantId: "",
    amount: 0,
    status: "pending",
    createdAt: "",
    planName: "",
  };
}
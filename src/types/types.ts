export enum EventType {}
export enum CaseStatus {
  NEW,
  OPEN,
  CLOSE,
}
export enum ContactType {}
export enum CaseType {}
export enum PolicyType {}
export enum PaymentType {
  CONSULTING,
  COURT,
  EXPERT,
  FEES,
  TRAVEL_EXPENSES,
}
export interface Case {
  id: string;
  type: CaseType;
  attachments: Attachment[];
  client: Client;
  policyType: PolicyType;
  address: Address;
  createdAt: number;
  status: CaseStatus;
  comments: string;
  contacts: Contact[];
  events: Event[];
  payments: Payment[];
}
export interface Payment {
  type: PaymentType;
  amount: number;
  taxRate: number;
}
export interface Event {
  type: EventType;
  date: number;
}
export interface Attachment {
  id: string;
  link: string;
  filename: string;
}
export interface Contact {
  type: ContactType;
  name: string;
  phone: string;
  address?: Address;
  email?: string;
  fax?: string;
}
export interface Address {}
export interface Client {}

export enum PaymentType {
  CONSULTING,
  COURT,
  EXPERT,
  FEES,
  TRAVEL_EXPENSES,
}
export enum CaseStatus {
  NEW,
  OPEN,
  WAITING_FOR_FIRST_IMPRESSION,
  WAITING_FOR_REPORT,
  WAITING_FOR_PAYMENT,
  CLOSE,
}
export enum EventType {}
export enum ContactType {}
export enum CaseType {
  WATER,
  FIRE,
  BURGLARY,
  WIND,
  FLOOD,
  EXEDENT,
  ALL_RISKS,
}
export enum PolicyType {}
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

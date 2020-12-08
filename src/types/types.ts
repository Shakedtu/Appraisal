export enum PaymentType {
  CONSULTING,
  COURT,
  EXPERT,
  FEES,
  TRAVEL_EXPENSES,
}
export enum CaseStatus {
  NEW = 'new',
  OPEN = 'open',
  WAITING_FOR_FIRST_IMPRESSION = 'waiting_for_first_impression',
  WAITING_FOR_REPORT = 'waiting_for_report',
  WAITING_FOR_PAYMENT = 'waiting_for_payment',
  CLOSE = 'closed',
}
export enum EventType {
  START_OF_INSURANCE,
  END_OF_INSURANCE,
  SURVEY,
  CASE,
  VISIT,
  REFFERENSE, //תאריך הפניה
  LAST_DOCUMENT,
}

export enum ContactType {
  INSURANCE_COMPANY = 'insurance_company',
  INSURANCE_AGENT = 'insurance_agent',
  INSUREE = 'insuree',
}

export enum CaseType {
  WATER = 'water',
  FIRE = 'fire',
  BURGLARY = 'burglary',
  ROBBERY = 'robbery',
  WIND = 'wind',
  EXPLOSION = 'explosion',
  EARTHQUAKE = 'earthquake',
  THIRD_PARTY = 'third-party',
  FLOOD = 'flood',
  ALL_RISKS = 'all-risks',
  BUSINESS_OTHER = 'other',
} // אש, גנבה, שיטפון, זדון, התפוצצות, רעידת אדמה, צד שלישי, אחר - עסקים

export enum PolicyType {}
export interface ICase {
  id?: string;
  type: CaseType;
  attachments?: Attachment[];
  client: Client;
  policyType?: PolicyType;
  address?: Address;
  createdAt: string;
  status: CaseStatus;
  comments?: string;
  contacts: Contact[];
  events?: Event[];
  payments?: Payment[];
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
  id?: string;
  type: ContactType;
  name: string;
  phone: string;
  address: Address;
  email: string;
  fax?: string;
}
export interface Address {
  street: string;
  houseNumber: string;
  city: string;
}
export interface Client {
  name: string;
}

export interface ICaseInfo {
  id?: string;
  type: string;
  client: Client;
  createdAt: string;
  status: string;
}

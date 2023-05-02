import { UUID } from 'crypto';
import { CustomerDb } from '../customers';

export interface ClaimCsv {
  id: UUID; // UUID
  status: string; // VARCHAR(50)
  solution: string; // VARCHAR(50)
  createdAt: Date; // TIMESTAMP
  updatedAt: Date; // TIMESTAMP
  customerId: UUID; // UUID REFERENCES customers (id)
  productPurchaseId: UUID; // UUID
  productCondition: string; // VARCHAR(2)
  damageDescription: string; // TEXT
  damageDate: Date; // DATE
}

export interface ClaimDb extends ClaimCsv {}

export interface ClaimsFullCount {
  count: number;
}

export interface CustomerClaims {
  customer: CustomerDb;
  claims: ClaimDb[];
}

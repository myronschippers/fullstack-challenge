import { UUID } from 'crypto';

export interface PurchaseCsv {
  id: UUID;
  invoice: string; // VARCHAR(20)
  totalSaleAmount: number; // MONEY
  invoiceDate: Date; // TIMESTAMP
  deliveryDate: Date; // TIMESTAMP
  name: string; // VARCHAR(150)
  description: string; // TEXT
  sku: string; // VARCHAR(10)
  protectionPlanName: string; // VARCHAR(150)
  protectionPlanDuration: number; // INTEGER
  protectionPlanPrice: number; // MONEY
  protectionPlanSku: string; // VARCHAR(20)
  protectionPlanPeriod: string; // VARCHAR(10)
  customerId: UUID; // UUID REFERENCES customers (id)
  createdAt: Date; // TIMESTAMP
  updatedAt: Date; // TIMESTAMP
}

export interface PurchasesFullCount {
  count: number;
}

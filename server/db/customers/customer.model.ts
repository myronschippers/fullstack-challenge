import { UUID } from 'crypto';

export interface CustomerCsv {
  id: UUID;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerDb extends CustomerCsv {}

export interface CustomersPaginated {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  customers: CustomerDb[];
}

export interface CustomerFullCount {
  count: number;
}

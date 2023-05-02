import { UUID } from 'crypto';

export interface CustomerCsv {
  id: UUID;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

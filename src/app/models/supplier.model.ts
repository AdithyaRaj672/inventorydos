import { BaseEntity } from './product.model';

export interface Supplier {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export class SupplierModel extends BaseEntity implements Supplier {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;

  constructor(data: Supplier) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.address = data.address;
  }

  get displayName(): string {
    return this.name;
  }
}

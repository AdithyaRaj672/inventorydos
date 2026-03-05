import { BaseEntity } from './product.model';

export interface Order {
  id: number;
  productId: number;
  quantity: number;
  orderDate: Date;
  expectedDelivery: Date;
  status: 'pending' | 'delivered' | 'cancelled';
  supplier: string;
}

export class OrderModel extends BaseEntity implements Order {
  id: number;
  productId: number;
  quantity: number;
  orderDate: Date;
  expectedDelivery: Date;
  status: 'pending' | 'delivered' | 'cancelled';
  supplier: string;

  constructor(data: Order) {
    super();
    this.id = data.id;
    this.productId = data.productId;
    this.quantity = data.quantity;
    this.orderDate = new Date(data.orderDate);
    this.expectedDelivery = new Date(data.expectedDelivery);
    this.status = data.status;
    this.supplier = data.supplier;
  }

  get displayName(): string {
    return `Order #${this.id}`;
  }

  get isPending(): boolean {
    return this.status === 'pending';
  }

  get isDelivered(): boolean {
    return this.status === 'delivered';
  }
}

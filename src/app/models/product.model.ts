export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  reorderLevel: number;
  supplier: string;
}

export abstract class BaseEntity {
  abstract id: number;
  abstract get displayName(): string;
}

export class ProductModel extends BaseEntity implements Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  reorderLevel: number;
  supplier: string;

  constructor(data: Product) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.quantity = data.quantity;
    this.reorderLevel = data.reorderLevel;
    this.supplier = data.supplier;
  }

  get displayName(): string {
    return this.name;
  }

  get isLowStock(): boolean {
    return this.quantity <= this.reorderLevel;
  }

  get totalValue(): number {
    return this.price * this.quantity;
  }
}

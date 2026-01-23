export interface Order {
  id: number;
  productId: number;
  quantity: number;
  orderDate: Date;
  expectedDelivery: Date;
  status: 'pending' | 'delivered' | 'cancelled';
  supplier: string;
}

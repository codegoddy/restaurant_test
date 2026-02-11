export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'appetizer' | 'main' | 'dessert' | 'drink';
  imageUrl?: string;
}

export type OrderItem = {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

export type Order = {
  id: string;
  tableId: string;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'paid';
  createdAt: Date;
  updatedAt: Date;
  totalAmount: number;
}

export type Table = {
  id: string;
  number: number;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved' | 'cleaning';
  currentOrderId?: string;
}

export type RestaurantState = {
  tables: Table[];
  orders: Order[];
  menu: MenuItem[];
}

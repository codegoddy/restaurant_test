import type { MenuItem, Table, Order } from '../types';

export const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with parmesan, croutons, and caesar dressing',
    price: 12.99,
    category: 'appetizer',
  },
  {
    id: '2',
    name: 'Bruschetta',
    description: 'Grilled bread topped with tomatoes, garlic, and fresh basil',
    price: 9.99,
    category: 'appetizer',
  },
  {
    id: '3',
    name: 'Grilled Salmon',
    description: 'Atlantic salmon with lemon butter sauce and seasonal vegetables',
    price: 28.99,
    category: 'main',
  },
  {
    id: '4',
    name: 'Ribeye Steak',
    description: '12oz prime ribeye with mashed potatoes and asparagus',
    price: 42.99,
    category: 'main',
  },
  {
    id: '5',
    name: 'Chicken Parmesan',
    description: 'Breaded chicken breast with marinara and mozzarella over pasta',
    price: 24.99,
    category: 'main',
  },
  {
    id: '6',
    name: 'Margherita Pizza',
    description: 'Fresh mozzarella, tomatoes, and basil on wood-fired crust',
    price: 18.99,
    category: 'main',
  },
  {
    id: '7',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with espresso and mascarpone',
    price: 10.99,
    category: 'dessert',
  },
  {
    id: '8',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center and vanilla ice cream',
    price: 11.99,
    category: 'dessert',
  },
  {
    id: '9',
    name: 'House Wine',
    description: 'Red or white wine selection',
    price: 8.99,
    category: 'drink',
  },
  {
    id: '10',
    name: 'Craft Beer',
    description: 'Local brewery selection',
    price: 7.99,
    category: 'drink',
  },
  {
    id: '11',
    name: 'Sparkling Water',
    description: 'Refreshing sparkling mineral water',
    price: 4.99,
    category: 'drink',
  },
  {
    id: '12',
    name: 'Fresh Lemonade',
    description: 'Homemade lemonade with fresh mint',
    price: 5.99,
    category: 'drink',
  },
];

export const mockTables: Table[] = Array.from({ length: 12 }, (_, i) => ({
  id: `table-${i + 1}`,
  number: i + 1,
  capacity: i % 3 === 0 ? 6 : i % 2 === 0 ? 4 : 2,
  status: 'available',
}));

export const mockOrders: Order[] = [];

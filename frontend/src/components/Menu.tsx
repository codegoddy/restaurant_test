import { useState } from 'react';
import type { MenuItem, OrderItem } from '../types';
import { MenuItemCard } from './MenuItemCard';

interface MenuProps {
  menu: MenuItem[];
  onAddToOrder: (item: OrderItem) => void;
}

export function Menu({ menu, onAddToOrder }: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const categories = ['all', 'appetizer', 'main', 'dessert', 'drink'];

  const filteredMenu = selectedCategory === 'all'
    ? menu
    : menu.filter((item) => item.category === selectedCategory);

  const handleAddToOrder = (item: MenuItem) => {
    const quantity = quantities[item.id] || 1;
    onAddToOrder({
      menuItem: item,
      quantity,
      notes: '',
    });
    setQuantities((prev) => ({ ...prev, [item.id]: 1 }));
  };

  return (
    <div className="menu">
      <div className="menu-categories">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="menu-grid">
        {filteredMenu.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            onAddToOrder={handleAddToOrder}
          />
        ))}
      </div>
    </div>
  );
}

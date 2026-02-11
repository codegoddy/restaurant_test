import type { MenuItem } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToOrder: (item: MenuItem) => void;
}

export function MenuItemCard({ item, onAddToOrder }: MenuItemCardProps) {
  return (
    <div className="menu-item-card">
      <div className="menu-item-content">
        <h3>{item.name}</h3>
        <p className="menu-item-description">{item.description}</p>
        <div className="menu-item-footer">
          <span className="menu-item-price">${item.price.toFixed(2)}</span>
          <button 
            className="add-button"
            onClick={() => onAddToOrder(item)}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

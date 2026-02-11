import { useState } from 'react';
import type { Table, OrderItem, MenuItem } from '../types';
import { Menu } from './Menu';

interface NewOrderModalProps {
  table: Table;
  menu: MenuItem[];
  onClose: () => void;
  onCreateOrder: (items: OrderItem[]) => void;
}

export function NewOrderModal({ table, menu, onClose, onCreateOrder }: NewOrderModalProps) {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const handleAddItem = (item: OrderItem) => {
    setOrderItems((prev) => {
      const existing = prev.find((i) => i.menuItem.id === item.menuItem.id);
      if (existing) {
        return prev.map((i) =>
          i.menuItem.id === item.menuItem.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const handleRemoveItem = (menuItemId: string) => {
    setOrderItems((prev) => prev.filter((i) => i.menuItem.id !== menuItemId));
  };

  const total = orderItems.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>New Order - Table {table.number}</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          <div className="menu-section">
            <Menu menu={menu} onAddToOrder={handleAddItem} />
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            {orderItems.length === 0 ? (
              <p className="empty-order">Add items from the menu</p>
            ) : (
              <div className="order-items-list">
                {orderItems.map((item) => (
                  <div key={item.menuItem.id} className="order-summary-item">
                    <div className="item-info">
                      <span>{item.menuItem.name}</span>
                      <span>x{item.quantity}</span>
                    </div>
                    <div className="item-actions">
                      <span>${(item.menuItem.price * item.quantity).toFixed(2)}</span>
                      <button
                        className="remove-button"
                        onClick={() => handleRemoveItem(item.menuItem.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="order-summary-total">
              <span>Total: ${total.toFixed(2)}</span>
            </div>

            <button
              className="create-order-button"
              disabled={orderItems.length === 0}
              onClick={() => {
                onCreateOrder(orderItems);
                onClose();
              }}
            >
              Create Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

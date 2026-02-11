import type { Order, Table } from '../types';

interface OrderPanelProps {
  order: Order | null;
  selectedTable: Table | null;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
  onAddItem: () => void;
}

export function OrderPanel({ order, selectedTable, onUpdateStatus, onAddItem }: OrderPanelProps) {
  if (!selectedTable) {
    return (
      <div className="order-panel empty">
        <p>Select a table to view or create an order</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-panel">
        <div className="order-header">
          <h3>Table {selectedTable.number}</h3>
          <span className={`order-status ${selectedTable.status}`}>{selectedTable.status}</span>
        </div>
        <div className="order-panel empty" style={{ flex: 1, justifyContent: 'center' }}>
          <p>No active order</p>
          <button 
            className="add-item-button" 
            onClick={onAddItem}
            style={{ marginTop: '1rem' }}
          >
            Create Order
          </button>
        </div>
      </div>
    );
  }

  const statusFlow: Order['status'][] = ['pending', 'preparing', 'ready', 'served', 'paid'];
  const currentStatusIndex = statusFlow.indexOf(order.status);

  return (
    <div className="order-panel">
      <div className="order-header">
        <h3>Table {selectedTable.number} - Order #{order.id.slice(-4)}</h3>
        <span className={`order-status ${order.status}`}>{order.status}</span>
      </div>

      <div className="order-items">
        {order.items.map((item, index) => (
          <div key={index} className="order-item">
            <div className="order-item-info">
              <span className="order-item-name">{item.menuItem.name}</span>
              <span className="order-item-quantity">x{item.quantity}</span>
            </div>
            <span className="order-item-price">
              ${(item.menuItem.price * item.quantity).toFixed(2)}
            </span>
            {item.notes && (
              <p className="order-item-notes">{item.notes}</p>
            )}
          </div>
        ))}
      </div>

      <div className="order-total">
        <span>Total:</span>
        <span className="total-amount">${order.totalAmount.toFixed(2)}</span>
      </div>

      <div className="order-actions">
        <button className="add-item-button" onClick={onAddItem}>
          Add Items
        </button>
        
        {order.status !== 'paid' && (
          <button
            className="status-button"
            onClick={() => {
              const nextStatus = statusFlow[currentStatusIndex + 1];
              if (nextStatus) {
                onUpdateStatus(order.id, nextStatus);
              }
            }}
          >
            {order.status === 'served' ? 'Mark as Paid' : 'Next Status'}
          </button>
        )}
      </div>
    </div>
  );
}

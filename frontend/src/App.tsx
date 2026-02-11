import { useState } from 'react';
import type { Table, OrderItem } from './types';
import { useRestaurant } from './hooks/useRestaurant';
import { TableGrid } from './components/TableGrid';
import { OrderPanel } from './components/OrderPanel';
import { NewOrderModal } from './components/NewOrderModal';
import './App.css';

function App() {
  const {
    tables,
    menu,
    createOrder,
    updateOrderStatus,
    addItemToOrder,
    getTableOrder,
  } = useRestaurant();

  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [showAddItemsModal, setShowAddItemsModal] = useState(false);

  const handleTableClick = (table: Table) => {
    setSelectedTable(table);
    
    if (table.status === 'available') {
      setShowNewOrderModal(true);
    }
  };

  const handleCreateOrder = (items: OrderItem[]) => {
    if (selectedTable) {
      createOrder(selectedTable.id, items);
      setShowNewOrderModal(false);
    }
  };

  const handleAddItems = (items: OrderItem[]) => {
    const order = selectedTable ? getTableOrder(selectedTable.id) : null;
    if (order) {
      items.forEach((item) => addItemToOrder(order.id, item));
      setShowAddItemsModal(false);
    }
  };

  const currentOrder = selectedTable ? getTableOrder(selectedTable.id) ?? null : null;

  return (
    <div className="restaurant-app">
      <header className="app-header">
        <h1>Restaurant POS</h1>
        <p>Table & Order Management</p>
      </header>

      <div className="app-content">
        <div className="table-section">
          <h2>Tables</h2>
          <TableGrid
            tables={tables}
            selectedTable={selectedTable}
            onSelectTable={handleTableClick}
          />
        </div>

        <OrderPanel
          order={currentOrder}
          selectedTable={selectedTable}
          onUpdateStatus={updateOrderStatus}
          onAddItem={() => setShowAddItemsModal(true)}
        />
      </div>

      {showNewOrderModal && selectedTable && (
        <NewOrderModal
          table={selectedTable}
          menu={menu}
          onClose={() => setShowNewOrderModal(false)}
          onCreateOrder={handleCreateOrder}
        />
      )}

      {showAddItemsModal && selectedTable && (
        <NewOrderModal
          table={selectedTable}
          menu={menu}
          onClose={() => setShowAddItemsModal(false)}
          onCreateOrder={handleAddItems}
        />
      )}
    </div>
  );
}

export default App;

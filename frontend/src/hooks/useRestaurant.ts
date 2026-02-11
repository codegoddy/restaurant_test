import { useState, useCallback } from 'react';
import type { Order, OrderItem, Table, MenuItem } from '../types';
import { mockTables, mockMenuItems } from '../data/mockData';

export function useRestaurant() {
  const [tables, setTables] = useState<Table[]>(mockTables);
  const [orders, setOrders] = useState<Order[]>([]);
  const [menu] = useState<MenuItem[]>(mockMenuItems);

  const createOrder = useCallback((tableId: string, items: OrderItem[]) => {
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      tableId,
      items,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      totalAmount: items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0),
    };

    setOrders((prev) => [...prev, newOrder]);
    setTables((prev) =>
      prev.map((table) =>
        table.id === tableId
          ? { ...table, status: 'occupied', currentOrderId: newOrder.id }
          : table
      )
    );

    return newOrder;
  }, []);

  const updateOrderStatus = useCallback((orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status, updatedAt: new Date() } : order
      )
    );

    if (status === 'paid') {
      const order = orders.find((o) => o.id === orderId);
      if (order) {
        setTables((prev) =>
          prev.map((table) =>
            table.id === order.tableId
              ? { ...table, status: 'cleaning', currentOrderId: undefined }
              : table
          )
        );
      }
    }
  }, [orders]);

  const addItemToOrder = useCallback((orderId: string, item: OrderItem) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        
        const existingItem = order.items.find(
          (i) => i.menuItem.id === item.menuItem.id
        );
        
        let newItems;
        if (existingItem) {
          newItems = order.items.map((i) =>
            i.menuItem.id === item.menuItem.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          );
        } else {
          newItems = [...order.items, item];
        }

        return {
          ...order,
          items: newItems,
          totalAmount: newItems.reduce(
            (sum, i) => sum + i.menuItem.price * i.quantity,
            0
          ),
          updatedAt: new Date(),
        };
      })
    );
  }, []);

  const updateTableStatus = useCallback((tableId: string, status: Table['status']) => {
    setTables((prev) =>
      prev.map((table) => (table.id === tableId ? { ...table, status } : table))
    );
  }, []);

  const getTableOrder = useCallback(
    (tableId: string) => {
      return orders.find((order) => order.tableId === tableId && order.status !== 'paid');
    },
    [orders]
  );

  const getActiveOrders = useCallback(() => {
    return orders.filter((order) => order.status !== 'paid');
  }, [orders]);

  return {
    tables,
    orders,
    menu,
    createOrder,
    updateOrderStatus,
    addItemToOrder,
    updateTableStatus,
    getTableOrder,
    getActiveOrders,
  };
}

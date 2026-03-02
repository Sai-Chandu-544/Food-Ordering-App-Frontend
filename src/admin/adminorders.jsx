import React, { useEffect, useState } from 'react';

export const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:5000/orders/admin');
        if (!res.ok) throw new Error('Failed to fetch orders');
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching admin orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>All Orders (Admin View)</h2>
      {orders.map((order, i) => (
        <div key={i}>
          <p>User: {order.userId?.name} ({order.userId?.email})</p>
          <p>Status: {order.status}</p>
          <p>Total: ₹{order.totalAmount}</p>
          <ul>
            {order.items.map((item, j) => (
              <li key={j}>{item.name} × {item.quantity}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};



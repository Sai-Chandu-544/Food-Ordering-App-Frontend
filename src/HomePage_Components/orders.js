
import  { useEffect, useState } from 'react';

export const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => { 
    const fetchOrders = async () => {
      try {
        const res = await fetch(`http://localhost:5000/user/place/orders/${userId}`);
        if (!res.ok) throw new Error('Failed to fetch orders');
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.map((order, i) => (
        <div key={i}>
          <p>Date: {new Date(order.orderDate).toLocaleString()}</p>
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




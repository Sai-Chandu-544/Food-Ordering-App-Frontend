
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("Token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `https://food-delivery-app-euay.onrender.com/user/orders/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();

        if (res.ok && data.orders) {
          setOrders(data.orders);
        } else {
          setError(data.message || "Failed to fetch orders");
        }
      } catch (err) {
        console.error(err);
        setError("Network error");
      }
    };

    fetchOrders();
  }, [userId, token, navigate]);

  const handleRemoveOrder = async (orderId) => {
    try {
      const res = await fetch(
        `https://food-delivery-app-euay.onrender.com/user/orders/${orderId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();

      if (res.ok && data.success) {
        setOrders((prev) => prev.filter((o) => o._id !== orderId));
        alert("Order removed!");
      } else {
        alert(data.message || "Failed to remove order");
      }
    } catch (err) {
      alert("Error removing order");
      console.error(err);
    }
  };

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      {error && <p className="error">{error}</p>}
      {orders.length === 0 ? (
        <p className="empty">No orders found.</p>
      ) : (
        <ul className="orders-list">
          {orders.map((order) => (
            <li key={order._id} className="order-card">
              <div className="order-top">
                <span className="order-id"></span>
                <button
                  onClick={() => handleRemoveOrder(order._id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
              <p className="items">
                {order.items.length} item(s) – ₹{order.totalAmount}
              </p>
              <ul className="item-list">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} × {item.quantity} – ₹{item.price}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserOrders;

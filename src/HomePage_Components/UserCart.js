import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { cartContext } from "./CartContext";

export const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useContext(cartContext);
   const navigate=useNavigate()

const handleBuy = async () => {
    try {
      
      // Make sure we know who is buying
      
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Please log in first.");
        navigate("/login");
        return;
      }

      
     
      const items = cart.map(({ _id, Title, quantity, Price }) => ({
        productId:_id,      // String as required by schema
        name:Title,                        // ← lowercase “name”, not “Title”
        quantity: quantity,
        price: Price,
      }));

      if (items.length === 0) {
        alert("Your cart is empty!");
        return;
      }

    

      const token = localStorage.getItem("Token");
      const response = await fetch(
        "https://food-delivery-app-euay.onrender.com/user/place/orders",
        {
          method: "POST",
          headers: { "Content-Type": "application/json","Authorization": `Bearer ${token}`, },
          body: JSON.stringify({ userId, items, totalAmount }),
        }
      );
    const data = await response.json();
    // console.log(userId)
    // console.log(items)
    // console.log(totalAmount)
    console.log(data)

    if (response.ok) {
  alert("Order placed!");
  navigate("/user/orders");
} else {
  alert(data.message || "Order failed");
}
  

  } catch (error) {
    console.error("Order error:", error);
    alert('Failed to place order');
  }


  };

  // calculate total
  const totalAmount = cart.reduce((acc, item) => acc + item.Price * item.quantity, 0);

  return (
    <div className="cart_container">
      <div className="cart_header">
        <p>Your Cart</p>
      </div>

      {cart.length === 0 ? (
        <p style={{ textAlign: "center" }}>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div key={item._id} className="cart_item">
            <img src={item.Image_Url} alt={item.Title} />
            <div className="cart_item_details">
              <div className="list">
                <div className="item_title">{item.Title}</div>
                <div className="item_price">Price: ₹{item.Price}</div>
               
              </div>
              <div className="quantity_controls">
                <button onClick={() => updateQuantity(item._id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, 1)}>+</button>
              </div>
              <button className="remove_button"onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          </div>
        ))
      )}

      {cart.length > 0 && (
        <div className="total_price_section">
          <p>Total Amount: ₹{totalAmount}</p>
          <button className="remove_button" onClick={handleBuy}>Buy Now</button>
        </div>
      )}
    </div>
  );
};

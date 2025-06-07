import React, { useContext } from "react";
import { cartContext } from "./CartContext";

export const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useContext(cartContext);

  const handleBuy = () => {
    alert("Purchase successful! 🎉");
    clearCart();
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

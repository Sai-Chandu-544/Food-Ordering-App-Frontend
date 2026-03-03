import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { cartContext } from "./CartContext";
import { ShoppingCart, Leaf, Flame, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useContext(cartContext);
  const navigate = useNavigate()

  const handleBuy = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("Token");


      const items = cart.map(({ _id, Title, quantity, Price }) => ({
        productId: _id,
        name: Title,
        quantity,
        price: Price,
      }));

      //  Create Razorpay Order
      const orderRes = await fetch(
        `${import.meta.env.VITE_API_KEY}/razorpay/order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount: totalAmount }),
        }
      );

      const orderData = await orderRes.json();

      //  Open Razorpay popup
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Food App",
        description: "Order Payment",
        order_id: orderData.orderId,

        handler: async function (response) {
          //  Verify payment
          const verifyRes = await fetch(
            `${import.meta.env.VITE_API_KEY}/razorpay/verify`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                cartItems: cart,        // your cart state
                totalAmount: totalAmount,
                userId: userId,
              }),
            }
          );

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            toast.success("Payment successful!");
            clearCart();
            navigate("/user/orders");
          } else {
            toast.error("Payment verification failed");
          }
        },

        theme: { color: "#f97316" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
    }
  };
  // calculate total
  const totalAmount = cart.reduce((acc, item) => acc + item.Price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-orange-50 to-transparent rounded-full blur-3xl opacity-15"></div>
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-gradient-to-br from-amber-50 to-transparent rounded-full blur-2xl opacity-10"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-8">

        {/* Header Section */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200/50">
              <ShoppingCart className="w-6 h-6 text-orange-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900">Your Cart</h1>
          </div>
          <p className="text-gray-600 text-lg font-light">Review and manage your selected items</p>
          <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full mt-4"></div>
        </div>

        {/* Empty Cart State */}
        {cart.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-200/50 mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</p>
            <p className="text-gray-600 text-lg font-light">Start adding delicious items to your cart!</p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-4 mb-8">
              {cart.map((item, index) => (
                <div
                  key={item._id}
                  className="group bg-white/70 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-2xl border border-white/50 transition-all duration-300 hover:scale-[1.02] animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row gap-6">

                    {/* Image Container */}
                    <div className="w-full md:w-40 flex-shrink-0">
                      <div className="relative w-full h-40 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 shadow-md group-hover:shadow-lg transition-all">
                        <img
                          src={item.Image_Url}
                          alt={item.Title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>

                    {/* Item Details */}
                    <div className="flex flex-col justify-between flex-1">

                      {/* Title & Category */}
                      <div className="mb-4">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                          {item.Title}
                        </h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          {item.Category === 'Veg' ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100/50 text-green-700 text-xs font-semibold border border-green-200/50">
                              <Leaf className="w-3 h-3" /> Vegetarian
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100/50 text-red-700 text-xs font-semibold border border-red-200/50">
                              <Flame className="w-3 h-3" /> Non-Veg
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Price & Controls Row */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-gray-100">

                        {/* Price */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 border border-green-100/50">
                          <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">Price</p>
                          <p className="text-2xl font-black text-green-700">₹{item.Price}</p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 bg-gray-100/50 rounded-xl p-2 border border-gray-200/50">
                          <button
                            onClick={() => updateQuantity(item._id, -1)}
                            className="p-2 rounded-lg bg-white hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-all hover:scale-110 active:scale-95"
                          >
                            <Minus className="w-4 h-4" />
                          </button>

                          <span className="w-10 text-center font-bold text-lg text-gray-900">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => updateQuantity(item._id, 1)}
                            className="p-2 rounded-lg bg-white hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-all hover:scale-110 active:scale-95"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Subtotal */}
                        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-3 border border-orange-100/50 min-w-fit">
                          <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-1">Subtotal</p>
                          <p className="text-2xl font-black text-orange-700">₹{(item.Price * item.quantity).toFixed(2)}</p>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="p-3 rounded-lg bg-red-50/50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-all hover:scale-110 active:scale-95 border border-red-100/50"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="bg-gradient-to-br from-white via-orange-50/30 to-white rounded-3xl shadow-2xl border border-white/50 p-6 md:p-8 backdrop-blur-sm">

              {/* Cart Summary Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-8 border-b border-gray-100/50">

                <div className="bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-xl p-5 border border-blue-100/50">
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2">Items</p>
                  <p className="text-3xl font-black text-blue-700">{cart.length}</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100/30 rounded-xl p-5 border border-purple-100/50">
                  <p className="text-xs font-semibold text-purple-600 uppercase tracking-widest mb-2">Total Qty</p>
                  <p className="text-3xl font-black text-purple-700">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-100/30 rounded-xl p-5 border border-green-100/50">
                  <p className="text-xs font-semibold text-green-600 uppercase tracking-widest mb-2">Estimated Savings</p>
                  <p className="text-3xl font-black text-green-700">
                    ₹{(cart.reduce((sum, item) => sum + (item.Price * 0.1 * item.quantity), 0)).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Total Amount & Button */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                <div>
                  <p className="text-gray-600 text-sm font-light mb-2">Total Amount</p>
                  <p className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                    ₹{totalAmount.toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={handleBuy}
                  className="group relative bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:from-orange-600 hover:via-orange-700 hover:to-orange-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                    Buy Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      
    </div>
  );
};

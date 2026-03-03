
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, Package, AlertCircle, ChevronDown } from 'lucide-react';
import toast from "react-hot-toast";


export const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("Token");
  const [expandedOrders, setExpandedOrders] = useState(new Set()); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_KEY}/orders/${userId}`,
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
        `${import.meta.env.VITE_API_KEY}/orders/${orderId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();

      if (res.ok && data.success) {
        setOrders((prev) => prev.filter((o) => o._id !== orderId));
        toast.success("Order removed!");
      } else {
        toast.error(data.message || "Failed to remove order");
      }
    } catch (err) {
      toast.error("Error removing order");
      console.error(err);
    }
  };

  

const toggleOrderExpand = (orderId) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-orange-50 to-transparent rounded-full blur-3xl opacity-15"></div>
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-gradient-to-br from-amber-50 to-transparent rounded-full blur-2xl opacity-10"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-8">
        
        {/* Header Section */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200/50 shadow-lg">
              <ShoppingBag className="w-7 h-7 text-orange-600" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900">Your Orders</h1>
              <p className="text-gray-600 font-light">Manage and track your order history</p>
            </div>
          </div>
          <div className="h-1.5 w-20 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"></div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 animate-fade-in bg-red-50/50 border-2 border-red-200/50 rounded-2xl p-5 flex items-center gap-4 backdrop-blur-sm">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        {/* Empty Orders State */}
        {orders.length === 0 ? (
          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-200/50 mb-8 shadow-lg">
              <ShoppingBag className="w-14 h-14 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">No orders yet</h2>
            <p className="text-gray-600 text-lg font-light max-w-md mx-auto">
              You haven't placed any orders yet. Start exploring our delicious menu and place your first order!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Order Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-white/50 shadow-md">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest mb-2">Total Orders</p>
                <p className="text-3xl font-black text-orange-600">{orders.length}</p>
              </div>
              
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-white/50 shadow-md">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest mb-2">Total Spent</p>
                <p className="text-3xl font-black text-green-600">
                  ₹{orders.reduce((sum, order) => sum + order.totalAmount, 0).toFixed(2)}
                </p>
              </div>

              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-white/50 shadow-md">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest mb-2">Total Items</p>
                <p className="text-3xl font-black text-blue-600">
                  {orders.reduce((sum, order) => sum + order.items.length, 0)}
                </p>
              </div>

              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-white/50 shadow-md">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest mb-2">Avg Order Value</p>
                <p className="text-3xl font-black text-purple-600">
                  ₹{(orders.reduce((sum, order) => sum + order.totalAmount, 0) / orders.length).toFixed(0)}
                </p>
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {orders.map((order, index) => {
               
               
                const isExpanded = expandedOrders.has(order._id);

                return (
                  <div
                    key={order._id}
                    className="group bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Order Header */}
                    <div className="p-5 md:p-6 border-b border-gray-100/50">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        
                        {/* Left Section */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                          
                            <div>
                              <h3 className="font-bold text-gray-900">Order #{order._id?.slice(-8).toUpperCase()}</h3>
                              <p className="text-xs text-gray-600 font-light">
                                {new Date(order.createdAt).toLocaleDateString('en-IN', { 
                                  day: 'numeric', 
                                  month: 'short', 
                                  year: 'numeric' 
                                })}
                              </p>
                            </div>
                          </div>

                          
                         
                        </div>

                        {/* Right Section - Amount & Controls */}
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-4 border border-orange-100/50 min-w-fit">
                            <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-1">Order Total</p>
                            <p className="text-2xl md:text-3xl font-black text-orange-700">₹{order.totalAmount}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleOrderExpand(order._id)}
                              className="p-3 rounded-lg bg-gray-100/50 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition-all hover:scale-110 active:scale-95 border border-gray-200/50"
                            >
                              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                            </button>

                            <button
                              onClick={() => handleRemoveOrder(order._id)}
                              className="p-3 rounded-lg bg-red-50/50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-all hover:scale-110 active:scale-95 border border-red-100/50"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-100/50">
                        <div className="bg-blue-50/50 rounded-lg p-3 border border-blue-100/50">
                          <p className="text-xs font-semibold text-blue-600 mb-1">Items</p>
                          <p className="text-lg font-black text-blue-700">{order.items.length}</p>
                        </div>
                        <div className="bg-purple-50/50 rounded-lg p-3 border border-purple-100/50">
                          <p className="text-xs font-semibold text-purple-600 mb-1">Qty</p>
                          <p className="text-lg font-black text-purple-700">
                            {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                          </p>
                        </div>
                        <div className="bg-green-50/50 rounded-lg p-3 border border-green-100/50">
                          <p className="text-xs font-semibold text-green-600 mb-1">Avg Item Price</p>
                          <p className="text-lg font-black text-green-700">
                            ₹{(order.totalAmount / order.items.length).toFixed(0)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Order Items - Expandable */}
                    {isExpanded && (
                      <div className="bg-gradient-to-br from-gray-50/30 to-white/30 border-t border-gray-100/50 p-5 md:p-6">
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <Package className="w-5 h-5 text-orange-600" />
                          Order Items
                        </h4>
                        
                        <div className="space-y-3">
                          {order.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200/50 hover:shadow-md transition-all"
                            >
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900">{item.name}</p>
                                <p className="text-sm text-gray-600 font-light">
                                  Quantity: <span className="font-semibold text-gray-900">{item.quantity}</span>
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-600 mb-1">Unit Price</p>
                                <p className="text-lg font-black text-orange-600">₹{item.price}</p>
                              </div>
                              <div className="text-right ml-4 min-w-fit">
                                <p className="text-sm text-gray-600 mb-1">Subtotal</p>
                                <p className="text-lg font-black text-green-600">₹{(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Order Total Breakdown */}
                        <div className="mt-6 pt-6 border-t border-gray-200/50">
                          <div className="flex justify-between items-center bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100/50">
                            <span className="font-bold text-gray-900">Total Amount</span>
                            <span className="text-2xl font-black text-orange-700">₹{order.totalAmount}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

     
    </div>
  );
};



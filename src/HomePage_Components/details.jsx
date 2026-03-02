
import {useLocation, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { cartContext } from './CartContext';
import toast from 'react-hot-toast';

export const Details = () => {
    const { state } = useLocation();
     console.log("Received data:", state); 
     const navigate=useNavigate()
    //  console.log(state)

     const { addToCart } = useContext(cartContext);
    
 const handleAddToCart=()=>{
          addToCart(state)  
      navigate("/user/cart",{state:state})
      toast.success("Item Added to Your Cart")
     }

  return (
    <>
   
  {/* Enhanced UI Version - Same Logic */}

<div className="w-full flex flex-col items-center px-4 py-6 min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
  {/* Decorative Background */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full blur-3xl opacity-20"></div>
    <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-orange-50 to-transparent rounded-full blur-3xl opacity-15"></div>
  </div>

  {/* Title */}
  <div className="w-full max-w-4xl mb-8 relative z-10">
    <div className="inline-block mb-4">
      <span className="text-orange-600 text-sm font-bold uppercase tracking-widest">★ Premium Dish</span>
    </div>
    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
      Item Details
    </h1>
    <div className="h-1.5 w-16 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"></div>
  </div>

  {/* Card */}
  <div className="w-full max-w-4xl bg-white/70 backdrop-blur-sm shadow-2xl rounded-3xl p-6 md:p-10 flex flex-col md:flex-row gap-8 border border-white/50 relative z-10 hover:shadow-3xl transition-all duration-500">
    
    {/* Image */}
    <div className="w-full md:w-1/2 flex justify-center group">
  <div className="relative w-full max-w-sm aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">

    {/* IMAGE */}
    <img
      src={state.Image_Url}
      alt="food"
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
    />

    {/* HOVER OVERLAY */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </div>
</div>
    {/* Details */}
    <div className="flex flex-col gap-6 text-sm md:text-base flex-1">
      
      {/* Item Name */}
      <div className="border-b-2 border-gradient-to-r from-orange-100 to-transparent pb-4">
        <p className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-1">Item Name</p>
        <p className="text-2xl font-black text-gray-900">{state.Title}</p>
      </div>

      {/* Description */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-xl p-4 border border-blue-100/50">
        <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Description</p>
        <p className="text-gray-700 leading-relaxed font-light">{state.Description}</p>
      </div>

      {/* Category & Cuisine - Side by Side */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100/30 rounded-xl p-4 border border-green-100/50 hover:shadow-lg transition-all">
          <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">Category</p>
          <p className="text-lg font-bold text-green-900">{state.Category}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100/30 rounded-xl p-4 border border-purple-100/50 hover:shadow-lg transition-all">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-1">Cuisine</p>
          <p className="text-lg font-bold text-purple-900">{state.Cuisine_Type}</p>
        </div>
      </div>

      {/* Price & Discount - Side by Side */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-emerald-100/50 rounded-xl p-5 border border-green-200/50 hover:shadow-lg transition-all">
          <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-2">Price</p>
          <p className="text-3xl font-black text-green-700">₹{state.Price}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-amber-100/50 rounded-xl p-5 border border-orange-200/50 hover:shadow-lg transition-all">
          <p className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-2">Discount</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-black text-orange-600">{state.Discount}%</p>
            <span className="text-xs font-semibold text-orange-700 bg-orange-200/50 px-2 py-1 rounded-full">Save Now</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Add to Cart Button */}
  <div className="mt-10 relative z-10 w-full max-w-4xl flex justify-center">
    <button
      onClick={handleAddToCart}
      className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:from-orange-600 hover:via-orange-700 hover:to-orange-800 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden group"
    >
      <span className="relative z-10 flex items-center gap-2 text-lg">
        Add to Cart
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
    </button>
  </div>
</div>
 </>
  )
}

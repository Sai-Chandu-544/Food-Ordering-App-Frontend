import React, { useState, useEffect } from 'react';
import { Loader2, Search, Leaf, Salad,Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Veg = () => {
  const [veg, setVeg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleItem = (item) => {
    navigate("/user/details", { state: item });
  };

  useEffect(() => {
    const fetchVeg = async () => {
      try {
        setLoading(true);
        const url = `${import.meta.env.VITE_API_KEY}/user/list/Veg`;
        const token = localStorage.getItem("Token");

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok && data.response.length > 0) {
          setVeg(data.response);
        } else {
          alert(data.message || "Something went wrong");
        }
      } catch (error) {
        alert("Internal Server Problem");
      }
      setLoading(false);
    };

    fetchVeg();
  }, []);

  const filteredVeg = veg.filter(item =>
    item.Title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="px-0">
        {/* Search Bar */}
        {veg.length > 0 && (
          <div className="mb-8 max-w-md">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-green-600 transition-colors" />
              <input
                type="text"
                placeholder="Search veg dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-all text-gray-900 placeholder-gray-500 bg-white/50 backdrop-blur-sm"
              />
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-10 h-10 text-green-500 animate-spin" />
            <p className="text-gray-600 font-medium">Loading delicious veg dishes...</p>
          </div>
        ) : veg.length > 0 ? (
          <>
            {/* Grid */}
            {filteredVeg.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {filteredVeg.map((item, id) => (
                  <div
                    key={id}
                    onClick={() => handleItem(item)}
                    className="group cursor-pointer"
                    style={{ animationDelay: `${id * 0.05}s` }}
                  >
                    <div className="relative h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100/50 transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-2">
                      {/* Image */}
                      <img
                        src={item.Image_Url}
                        alt={item.Title}
                        className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Veg Badge */}
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-green-600 px-3 py-1.5 rounded-full text-xs font-bold border border-green-200/50 shadow-lg">
                        ♦ Veg
                      </div>

                      {/* Bottom gradient for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Title */}
                    <div className="mt-4">
                      <p className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-green-600 transition-colors duration-300 leading-snug">
                        {item.Title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-green-100 mx-auto mb-4 flex items-center justify-center">
                  <Search className="w-8 h-8 text-green-400" />
                </div>
                <p className="text-gray-600 font-semibold mb-1">No veg dishes found</p>
                <p className="text-gray-500 text-sm">Try searching with different keywords</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-green-100 mx-auto mb-4 flex items-center justify-center">
              <Salad className="w-8 h-8 text-green-400" />
            </div>
            <p className="text-gray-600 font-semibold mb-1">No veg items available</p>
          </div>
        )}
      </div>
    </>
  );
};

export const NonVeg = () => {
  const [nonVeg, setNonVeg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleItem = (item) => {
    navigate("/user/details", { state: item });
  };

  useEffect(() => {
    const fetchNonVeg = async () => {
      try {
        setLoading(true);
        const url = `${import.meta.env.VITE_API_KEY}/user/list/Non Veg`;
        const token = localStorage.getItem("Token");

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok && data.response.length > 0) {
          setNonVeg(data.response);
        } else {
          alert(data.message || "Something went wrong");
        }
      } catch (error) {
        alert("Internal Server Problem");
      }
      setLoading(false);
    };

    fetchNonVeg();
  }, []);

  const filteredNonVeg = nonVeg.filter(item =>
    item.Title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="px-0">
        {/* Search Bar */}
        {nonVeg.length > 0 && (
          <div className="mb-8 max-w-md">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-red-600 transition-colors" />
              <input
                type="text"
                placeholder="Search non-veg dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition-all text-gray-900 placeholder-gray-500 bg-white/50 backdrop-blur-sm"
              />
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
            <p className="text-gray-600 font-medium">Loading delicious non-veg dishes...</p>
          </div>
        ) : nonVeg.length > 0 ? (
          <>
            {/* Grid */}
            {filteredNonVeg.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {filteredNonVeg.map((item, id) => (
                  <div
                    key={id}
                    onClick={() => handleItem(item)}
                    className="group cursor-pointer"
                    style={{ animationDelay: `${id * 0.05}s` }}
                  >
                    <div className="relative h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-red-50 to-orange-50 border border-red-100/50 transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-2">
                      {/* Image */}
                      <img
                        src={item.Image_Url}
                        alt={item.Title}
                        className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Non-Veg Badge */}
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-red-600 px-3 py-1.5 rounded-full text-xs font-bold border border-red-200/50 shadow-lg">
                        ◆ Non-Veg
                      </div>

                      {/* Bottom gradient for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Title */}
                    <div className="mt-4">
                      <p className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-red-600 transition-colors duration-300 leading-snug">
                        {item.Title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-red-100 mx-auto mb-4 flex items-center justify-center">
                  <Search className="w-8 h-8 text-red-400" />
                </div>
                <p className="text-gray-600 font-semibold mb-1">No non-veg dishes found</p>
                <p className="text-gray-500 text-sm">Try searching with different keywords</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-red-100 mx-auto mb-4 flex items-center justify-center">
              <Flame className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-gray-600 font-semibold mb-1">No non-veg items available</p>
          </div>
        )}
      </div>
    </>
  );
};

// Main Menu Page Component
export const UserMenu = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 -left-32 w-96 h-96 bg-gradient-to-tr from-orange-50 to-transparent rounded-full blur-3xl opacity-20"></div>
        <div className="absolute top-1/3 left-1/2 w-80 h-80 bg-gradient-to-br from-amber-50 to-transparent rounded-full blur-2xl opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Premium Header Section */}
        <div className="text-center mb-20 animate-fade-in" style={{ animationDuration: '0.8s' }}>
          <div className="inline-block mb-6">
            
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">
            Explore Our <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">Menu</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Discover authentic flavors crafted with premium ingredients and culinary expertise. Each dish tells a story.
          </p>

          {/* Decorative Line */}
          {/* <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-1 w-12 bg-gradient-to-r from-transparent to-orange-400"></div>
            <span className="text-gray-400">•••</span>
            <div className="h-1 w-12 bg-gradient-to-l from-transparent to-orange-400"></div>
          </div> */}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 animate-pulse">
            <div className="relative w-16 h-16 mb-8">
              <Loader2 className="w-16 h-16 animate-spin text-orange-500 absolute inset-0" />
              <div className="absolute inset-2 border-4 border-transparent border-t-orange-200 rounded-full animate-spin opacity-50" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
            </div>
            <p className="text-2xl font-semibold text-gray-900 mb-2">Preparing delicious items</p>
            <p className="text-gray-500 text-sm tracking-wider">Selecting the finest dishes for you...</p>
          </div>
        ) : (
          <div className="space-y-24">
            {/* Veg Section */}
            <div 
              className="animate-fade-in" 
              style={{ animationDuration: '0.8s', animationDelay: '0. 2s' }}
            >
              <div className="mb-12">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50">
                    <Salad className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Vegetarian</h2>
                    {/* <p className="text-sm text-gray-500 font-light">Plant-based delights</p> */}
                  </div>
                </div>
                <div className="h-1 w-16 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"></div>
              </div>
              <Veg />
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <span className="text-gray-400 text-sm font-light tracking-widest">✦</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-300 to-transparent"></div>
            </div>

            {/* Non-Veg Section */}
            <div 
              className="animate-fade-in" 
              style={{ animationDuration: '0.8s', animationDelay: '0.4s' }}
            >
              <div className="mb-12">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-red-50 to-orange-50 border border-red-200/50">
                    <Flame className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Non-Vegetarian</h2>
                    {/* <p className="text-sm text-gray-500 font-light">Savory specialties</p> */}
                  </div>
                </div>
                <div className="h-1 w-16 bg-gradient-to-r from-red-500 to-orange-400 rounded-full"></div>
              </div>
              <NonVeg />
            </div>
          </div>
        )}
      </div>

      {/* Floating Footer Element */}
      <div className="fixed bottom-8 right-8 z-50 pointer-events-none">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 shadow-2xl opacity-10 blur-2xl"></div>
      </div>

     
    </div>
  );
};
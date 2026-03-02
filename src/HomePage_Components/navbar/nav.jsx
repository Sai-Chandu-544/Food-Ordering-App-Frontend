import { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth";
import { LogOut } from "lucide-react";


export const Navbar = () => {
  const { auth, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);


  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = () => {
    logout();
    navigate("/user/login");
    setMenuOpen(false);
  };



  if (loading) {
    return (
      <>
        {/* Navbar Skeleton */}
        <div className="fixed top-0 w-full h-[80px] bg-white shadow-sm z-50">
          <div className="max-w-screen mx-auto px-5 lg:px-10 h-full flex items-center justify-between">

            {/* Logo Skeleton */}
            <div className="h-6 w-28 bg-gray-200 animate-pulse rounded"></div>

            {/* Right Side Skeleton Buttons */}
            <div className="flex gap-4">
              {/* Register Skeleton */}
              <div className="h-9 w-24 bg-gray-200 animate-pulse rounded-md"></div>

              {/* Login Skeleton */}
              <div className="h-9 w-20 bg-gray-200 animate-pulse rounded-md"></div>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-[80px]" />
      </>
    );
  }

  return (
    <>




      {/* NAVBAR */}
      <nav
        className={`w-full fixed top-0 z-50 transition-all duration-300 ${scrolled
            ? "bg-white/70 backdrop-blur-md shadow-sm border-b"
            : "bg-transparent"
          }`}
      >
        <div className="max-w-screen mx-auto px-5 lg:px-10">
          <div className="flex items-center justify-between h-[80px]">

            {/* LOGO */}
            <NavLink to="/home" className="flex items-center mt-2">
              <span className="text-2xl md:text-4xl font-bold text-orange-500">
                OrderNow
              </span>
            </NavLink>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-8 mt-2">

              {auth.isAuthenticated ? (
                <>
                  <NavLink to="/home" className="text-xl font-semibold hover:text-orange-500">
                    Home
                  </NavLink>
                  <NavLink to="/user/menu" className="text-xl font-semibold hover:text-orange-500">
                    Menu
                  </NavLink>
                  <NavLink to="/user/cart" className="text-xl font-semibold hover:text-orange-500">
                    Cart
                  </NavLink>
                  <NavLink to="/user/orders" className="text-xl font-semibold hover:text-orange-500">
                    Orders
                  </NavLink>

                  <button onClick={handleLogOut} className="text-red-600">
                    <LogOut size={25} />
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/user/register" className="text-xl font-semibold hover:text-orange-500">
                    Register
                  </NavLink>
                  <NavLink to="/user/login" className="text-xl font-semibold hover:text-orange-500">
                    Login
                  </NavLink>
                </>
              )}
            </div>

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
  <div
    className="lg:hidden fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    onClick={() => setMenuOpen(false)} // close on outside click
  >
    <div
      className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-sm space-y-6 relative"
      onClick={(e) => e.stopPropagation()} // prevent close inside
    >
      {/* Close Button */}
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-black"
        onClick={() => setMenuOpen(false)}
      >
        ✕
      </button>

      {auth.isAuthenticated ? (
        <>
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
            Navigation
          </h3>

          <ul className="flex flex-col gap-3 text-gray-800 font-medium">
            <li>
              <NavLink
                to="/home"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-orange-500"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/menu"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-orange-500"
              >
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/cart"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-orange-500"
              >
                Cart
              </NavLink>
            </li>
          </ul>

          <button
            onClick={handleLogOut}
            className="w-full mt-4 py-2 rounded-lg bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold text-gray-700 pb-2">
          </h3>

          <div className="flex flex-col gap-3">
            <NavLink
              to="/user/register"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center py-2 rounded-lg border border-orange-400 text-orange-500 font-medium hover:bg-orange-50"
            >
              Register
            </NavLink>

            <NavLink
              to="/user/login"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600"
            >
              Login
            </NavLink>
          </div>
        </>
      )}
    </div>
  </div>
)}
      {/* Spacer */}
      <div className="h-[80px]" />
    </>
  );
};

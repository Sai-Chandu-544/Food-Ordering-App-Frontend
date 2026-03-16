import ReactDOM from 'react-dom/client';
import { App } from './App';
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { CartContextProvider } from './HomePage_Components/CartContext';

import { ClerkProvider } from '@clerk/clerk-react';
import { Toaster } from "react-hot-toast";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <BrowserRouter basename="/Food-Ordering-App-Frontend">
    
        <CartContextProvider>
          <Toaster position="top-center" />
          <App />
        </CartContextProvider>
    
    </BrowserRouter>
  </ClerkProvider>
);
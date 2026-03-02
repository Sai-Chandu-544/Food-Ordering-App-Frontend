import ReactDOM from 'react-dom/client';
import {App} from './App';
// import {BrowserRouter} from 'react-router-dom';
import "./index.css"
import { HashRouter } from "react-router-dom";
import {CartContextProvider} from './HomePage_Components/CartContext'
import {AuthProvider} from './HomePage_Components/auth'
import { ClerkProvider } from '@clerk/clerk-react'
import { Toaster } from "react-hot-toast";


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
    <CartContextProvider>
       <HashRouter>
   <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <Toaster position="top-center" />
      <App />
    </ClerkProvider>
</HashRouter>

    </CartContextProvider>
    </AuthProvider>
 
 
);


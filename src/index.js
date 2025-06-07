import ReactDOM from 'react-dom/client';
import {App} from './App';
import {BrowserRouter} from 'react-router-dom';
import {CartContextProvider} from './HomePage_Components/CartContext'
import {AuthProvider} from './HomePage_Components/auth'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
    <CartContextProvider>
        <BrowserRouter>
 
        <App />
         
   
    </BrowserRouter>

    </CartContextProvider>
    </AuthProvider>
 
 
);


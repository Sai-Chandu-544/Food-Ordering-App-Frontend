import {HomePage} from './../src/HomePage_Components/HomePage'
import {AdminHome,} from './admin/Admin_Home'
import {Routes,Route} from 'react-router-dom';
import {UserLogin} from './HomePage_Components/UserLogin'
import {UserRegister} from './HomePage_Components/UserRegister'
import {Cart} from './HomePage_Components/UserCart'
import {Navbar} from './HomePage_Components/navbar/nav'
import { useLocation } from 'react-router-dom';
import {UserMenu,Veg,NonVeg,UserItem}from './HomePage_Components/userFetching';
import {useState} from 'react'
import { Page404 } from './HomePage_Components/Page404';
import {Details} from './HomePage_Components/details';
import {PrivateRoute } from './HomePage_Components/privateRoutes'
import {UserOrders} from './HomePage_Components/orders'




//  "homepage":"https://sai-chandu-544.github.io/food-ordering-app-frontend",




export const App = () => {
 const location = useLocation();
 const noNavbarRoutes = ["/admin", "/user/details"];
  // const isAdminRoute = location.pathname.startsWith("/admin");
  const showNavbar = !noNavbarRoutes.includes(location.pathname);

  const [search,setSearch]=useState({
    value:"",
    b:false
  })

  const handleSearch=(value)=>{
    setSearch({
      value:value,
      b:true
    })
    
  }
  // console.log("clicked",search.value,search.b)

 


 const [store,setStore]=useState("")

 const handleStore=(value)=>{
  setStore(value)

 }
//  console.log("store",store)
 
 
  

 
return (
  <div>
    {showNavbar && <Navbar handleSearch={handleSearch} store={store} />}

    <>
      {search.b ? (
        <PrivateRoute>
          <UserItem dish={search.value} />
         </PrivateRoute>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminHome />} />

          {/* Protected Routes */}
          <Route path="/user/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/register" element={<UserRegister handleStore={handleStore} />} />
          <Route path="/user/menu" element={<PrivateRoute><UserMenu /></PrivateRoute>} />
          <Route path="/user/menu/Veg" element={<PrivateRoute><Veg /></PrivateRoute>} />
          <Route path="/user/menu/Non Veg" element={<PrivateRoute><NonVeg /></PrivateRoute>} />
          <Route path="/user/details" element={<PrivateRoute> <Details /></PrivateRoute>} />
          <Route path="/user/orders" element={<PrivateRoute><UserOrders/></PrivateRoute>}/>
       

          {/* <Route path="*" element={<Page404 />} /> */}
        </Routes>
      )}
    </>
  </div>
);
}
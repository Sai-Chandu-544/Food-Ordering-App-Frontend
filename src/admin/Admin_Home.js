import {useState} from 'react'
import {AdminRegister,AdminNavbar,AdminBody,AdminLogin,AdminAddProducts,AdminAllUsers,AdminAllProducts} from './admin_components'





export const AdminHome = () => {

  const [login,setLogin]=useState(false)
  const [register,setRegister]=useState(false)
  const [AddProducts,setAddProducts]=useState(false)
  const [AllUsers,setAllUsers]=useState(false)
  const [AllProducts,setAllProducts]=useState(false)
  const [icon,setIcon]=useState(false)
  const [loginIcon,setLoginIcon]=useState(false)
  

  const handleRegisterIcon=()=>{
    setIcon(true)
    setRegister(false)
  }
  const handleLoginIcon=()=>{
    setLoginIcon(true)
    setLogin(false)
    setRegister(false)


  }





  const handleLogin=()=>{
    setLogin(true)
    setRegister(false)
    setAddProducts(false)
    setAllUsers(false)
    setAllProducts(false)
  }
  const handleRegister=()=>{
    setRegister(true)
    setLogin(false)
    setAddProducts(false)
       setAllUsers(false)
       setAllProducts(false)
  }

  const handleAddProducts=()=>{
    setAddProducts(true)
    setLogin(false)
    setRegister(false)
     setAllProducts(false)
     setAllUsers(false)

  }
  const handleAllUsers=()=>{
    setAllUsers(true)
     setLogin(false)
    setRegister(false)
    setAddProducts(false)
     setAllProducts(false)

  }
const handleAllProducts=()=>{
  setAllProducts(true)
  setLogin(false)
    setRegister(false)
    setAddProducts(false)
    setAllUsers(false)

}

const handleLogout = () => {
  localStorage.removeItem("Token");  
  setLoginIcon(false);  // Reset login UI
  setLogin(true); 
  setAddProducts(false)
  setAllUsers(false)
  setAllProducts(false)
  
  
  
}

  return (
    <div className="admin_container">

         <AdminNavbar loginFunction={handleLogin} registerFunction={handleRegister} icon={icon} loginIcon={loginIcon}  handleLogout={ handleLogout}/>

           <div className="arranging_components" style={{"display":"flex"}}>
            

        {loginIcon && <AdminBody handleAddProducts={handleAddProducts} handleAllUsers={handleAllUsers} handleAllProducts={handleAllProducts} />} 
        {loginIcon && !AddProducts && ! AllUsers && ! AllProducts && <h1>Welcome to admin Panel</h1>}
         

       
                          

         { register && <AdminRegister handleRegisterIcon={handleRegisterIcon} />}
         
         {login &&<AdminLogin handleLoginIcon={handleLoginIcon}  />}
       
    
         {AddProducts &&  <AdminAddProducts/>}
         {AllUsers && loginIcon && <AdminAllUsers/>}
         {AllProducts && <AdminAllProducts/>}
        
         
         </div>
        

      
       

    </div>
  )
}


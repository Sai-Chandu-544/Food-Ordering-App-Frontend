import {useState} from 'react'
import {  NavLink} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './nav.css'
import { AuthContext } from '../auth'
import { useContext } from 'react'




export const Navbar=({handleSearch})=>{
    const {auth}=useContext(AuthContext)
     const { logout } = useContext(AuthContext);
    const navigate=useNavigate()
    const [input,setInput]=useState("")
    
 



   
    const field=(e)=>{
        setInput(e.target.value)
    }
    const handleLogOut = () => {
    logout(); // clears token + updates context
 

  alert("Logged out successfully");
  navigate('/user/login'); 
};


    return(
       
        <div className="nav-main">
            <div className="nav-logo">
                <p>OrderNow</p>
            </div>
        
            <div className="list-container">
            <ul className="nav-list">
                {auth.isAuthenticated ? (
                    <>
                    <li><NavLink to="/home" className="isActive" >Home</NavLink></li>   
                  <li> <NavLink to="/user/menu" className="isActive" >Menu</NavLink></li>
                   <li><NavLink to="/user/cart" className="isActive" > Cart</NavLink></li>
                    <p onClick={handleLogOut} className="logout">Log Out</p>
                   
                    </>):

                    (
                    <>
                    <li><NavLink to="/user/register">Register</NavLink> </li>
                    <li><NavLink to="/user/login">Login</NavLink></li> 
                    </>
                    )
                    }

                
               
                 
                  
                 
                   
                    
                   
               
                </ul>
                 <div className="search_bar">
                        <input type="text" className="text" placeholder='Enter Food Item' value={input} onChange={field} />
                        <button className="search-btn" onClick={()=>handleSearch(input)}>Search</button>
                        
                    </div>
                    <div>

                   
                    </div>
                   
                
                </div>
               
               
        </div>
       
        
       
       
    )
}
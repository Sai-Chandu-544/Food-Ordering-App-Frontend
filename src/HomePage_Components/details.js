
import {useLocation, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { cartContext } from './CartContext';

export const Details = () => {
    const { state } = useLocation();
     console.log("Received data:", state); 
     const navigate=useNavigate()
    //  console.log(state)

     const { addToCart } = useContext(cartContext);
    
 const handleAddToCart=()=>{
          addToCart(state)  
      navigate("/user/cart",{state:state})
      alert("Item Added to Your Cart")
     }

  return (
    <div className="details_container">
      
      <div className="inner_details_container1">
        <p>Item Details</p>       
      </div>
      <div className="inner_details_container2">
        <div><img src={state.Image_Url} alt="background"/></div>
        <div className="details">
          <div className="title"> <p >Item Name: </p><p className="title_name">{state.Title}</p></div>
          <div className="description"> <p >Description: </p><p className="description_name">{state.Description}</p></div>
          <div className="category"><p >Category: </p><p className="category_name">{state.Category}</p></div>
          <div className="cuisine"><p >Cuisine_Type: </p><p className="cuisine_name">{state.Cuisine_Type}</p></div>
          <div className="price"><p >Price: </p><p className="price_name">{state.Price}</p></div>
          <div className="discount" ><p >Discount: </p><p className="discount_name">{state.Discount}</p></div>
          

        </div>
         

      </div>
      <div className="add_to_cart"><button onClick={handleAddToCart}>Add to Cart</button></div>
      
      
       
        
    </div>
  )
}

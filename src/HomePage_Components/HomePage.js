
import {Body1,Body2} from './body/body.js';
import {MainImages} from  './body/data.js'
import { useLocation } from "react-router-dom";
import { useState,useEffect } from 'react';







export const HomePage=()=>{
  

  

    return(
         <div>
          
      
      <Body1/>
      <Body2 images={MainImages}/>
     
     
     
     
    
      </div>
    )
       

}

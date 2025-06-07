
import {Body1,Body2} from './body/body.js';
import {MainImages,Home} from  './body/data.js'








export const HomePage=()=>{
  // console.log(Home[0].url)

  

  

    return(
         <div>
          
      
      <Body1 Home={Home}/>
      <Body2 images={MainImages}/>
     
     
     
     
    
      </div>
    )
       

}

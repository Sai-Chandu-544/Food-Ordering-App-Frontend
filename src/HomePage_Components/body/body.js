import './body1.css';
import './body2.css';




export const Body1 = ({Home}) => {
  
  // console.log(Home[0].url)

  return (
    <div className="main-body">
      <div className="sub-body">
        <img src={Home[0].url} alt="background" />
       
        <h2>Order Your Favourite Food</h2>
        <p>Get your favorite restaurant food delivered or picked up, with just a few taps.</p>
      </div>s
    </div>
  )
}

export const Body2 = ({images}) => {
  return (

    <div className="body2-main">
      <h2>Explore Our Menu</h2>
      <p>Choose from a diverse menu of dishes.Our mission is to satisfy your cravings and elevate your dining experience,one delicious meal at a time.</p>
      <div className="container">
        {
          images.map((el,i) => {
            // console.log(el)
            return (
            
                <div key={i} className="each-container">
                  <div className="specific-container">
                    <img src={el.url} alt="background" />
                   
                  </div>
                   <div className="title-content">
                    <h4>{el.title}</h4>
                  </div>
                </div>
               


              

            )

          })
        }
      </div>

    </div>
  )
}



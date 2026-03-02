import { AuthContext } from "../auth";
import { useContext} from "react";
export const Body1 = ({ Home }) => {

    const {  loading } = useContext(AuthContext);






   if (loading) {
    return (
      <>
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
    <div className="w-10 h-10 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
    <p className="text-gray-500">Loading...</p>
  </div>

      </>
    );
  }
  return (
    <div className="w-full flex justify-center mt-6 ">
      <div className="relative rounded-xl shadow-[2px_2px_10px_10px_darkgrey] overflow-hidden transform transition duration-500 hover:scale-105 cursor-pointer">
        
        <img
          src={Home[0].url}
          alt="background"
          className="h-[50vh] md:h-[65vh] w-[90vw] object-cover rounded-xl"
        />

        <h2 className="absolute left-4 bottom-20 md:bottom-32 text-red-500 font-extrabold text-lg md:text-3xl">
          Order Your Favourite Food
        </h2>

        <p className="absolute left-4 bottom-10 md:bottom-20 font-bold text-xs md:text-base">
          Get your favorite restaurant food delivered or picked up, with just a few taps.
        </p>
      </div>
    </div>
  );
};

export const Body2 = ({ images }) => {
     const {  loading } = useContext(AuthContext);

  if (loading) {
    return (
      <>
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
    <div className="w-10 h-10 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
    <p className="text-gray-500">Loading...</p>
  </div>

      </>
    );
  }

  return (
    <div className="w-full mt-6 ">
      <h2 className="font-black text-lg md:text-2xl mt-10 ml-3 md:ml-12">
        Explore Our Menu
      </h2>

      <p className="font-semibold text-xs md:text-base mt-2 ml-4 md:ml-12 ">
        Choose from a diverse menu of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
      </p>

      {/* Container */}
      <div className="mt-8 md:mt-12 grid grid-cols-4 md:flex md:justify-around gap-y-6 px-4">
        {images.map((el, i) => (
          <div key={i} className="flex flex-col items-center">
            
            {/* Circle Image */}
            <div className="transition duration-500 hover:scale-110">
              <img
                src={el.url}
                alt={el.title}
                className="h-12 w-12 md:h-24 md:w-24 rounded-full border-2 md:border-4 border-black object-cover cursor-pointer"
              />
            </div>

            {/* Title */}
            <h4 className="text-[10px] md:text-sm text-center mt-1">
              {el.title}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

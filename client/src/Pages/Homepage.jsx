
import { useSelector,useDispatch } from "react-redux"
import { useEffect,useState } from "react";
import { getHotels } from "../redux/hotelSlice";
import { useNavigate } from "react-router-dom";
export default function Homepage(){
    const navigate=useNavigate();
    const hotels=useSelector((state)=>state.hotel.hotels);
    const [imageIndex, setImageIndex] = useState(0);
    const dispatch=useDispatch();
    const userInfo=useSelector((state)=>state.auth.userInfo);
    const handlePayment=(item)=>{
        if(!userInfo){
            navigate('/login');
        }else{
            navigate(`/hotel-page/${item?._id}`);
            // navigate(`/cart-page/${item?._id}`)
        }
    }
    useEffect(()=>{
        dispatch(getHotels());
        
    },[dispatch])
    useEffect(() => {
        const intervalId = setInterval(() => {
          // Increment the image index
          setImageIndex((prevIndex) => (prevIndex + 1) % 3);
        }, 1000); // Change image every second (1000 milliseconds)
    
        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
      }, [imageIndex, 3]);
    return(
        <div className="mx-10">
            {hotels?.map((item)=>(
                <div key={item._id} className="pb-4 bg-blue-gray-300 ">
                    <img
                        className="object-cover mb-2 rounded-md w-full lg:h-72 h-60"
                        src={item?.images[imageIndex]}
                        alt={`Image ${imageIndex + 1}`}
                        />
                        <div className="pl-3 flex flex-col gap-2 ">
                            <h1 className="text-xl">{item?.title}</h1>
                            <h1>{item?.contact}</h1>
                            <p>{item?.location}</p>
                            <h1>{item?.country}</h1>
                            <h1>{item?.region}</h1>
                            <h1>{item?.rooms} available rooms</h1>
                            <h1>${item?.price}</h1>
                        </div>
                        
                        <button onClick={()=>handlePayment(item)} className="border-2 mx-auto block p-2 w-fit border-green-100 shadow-md">Book Now</button>

                </div>
            ))}
        </div>
    )
}
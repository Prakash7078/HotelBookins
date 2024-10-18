import { useDispatch,useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { getBookingById, getHotels } from "../redux/hotelSlice";
import ImageSlider from "../components/ImageSlider";
const Mybookings=()=>{
    const dispatch=useDispatch();
    const bookings=useSelector((state)=>state.hotel.bookings);
    const userInfo=useSelector((state)=>state.auth.userInfo);
    const hotels=useSelector((state)=>state.hotel.hotels);
    const findhotel=(item)=>{
        const hotel=hotels.find((hot)=>hot._id===item.hotel);
        console.log("hote",hotel)
        return hotel;
    }
    useEffect(()=>{
        dispatch(getHotels());
    },[dispatch,hotels?.length]);
    useEffect(()=>{
        dispatch(getBookingById(userInfo?._id));
    },[dispatch,userInfo,bookings?.length]);
    return(
        <div className="mx-10">
            <h1 className="text-xl text-gray-600  underline mb-3">My Bookings</h1>
            <div className="flex flex-wrap flex-col md:flex-row">
            {bookings?.map((item)=>(
                <div className=" shadow-lg md:m-4 m-2 p-4 flex flex-col gap-3">
                    <div>
                        <h2 className="text-heading mb-3.5 text-lg  font-bold md:text-xl lg:text-2xl 2xl:text-3xl">
                        {findhotel(item).title} <span className="text-gray-600">{findhotel(item).region},{findhotel(item).country}</span>
                        </h2>
                    </div>
                    <div className="flex justify-between">
                        <span className="">Price</span>
                        <h1 className="text-green-300">${item?.price}</h1>

                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400">CheckIn date   </span>
                        <h1 className="">{new Date(item?.checkInDate).toLocaleDateString('en-US', {
                            day: 'numeric', 
                            month: 'short',  // "short" for abbreviated month like "May"
                            year: 'numeric'
                        })}</h1>
                    </div>
                   
                    <div className="flex justify-between">
                        <span className="text-gray-400">CheckOut date   </span>
                        <h1 className="">{new Date(item?.checkOutDate).toLocaleDateString('en-US', {
                            day: 'numeric', 
                            month: 'short',  // "short" for abbreviated month like "May"
                            year: 'numeric'
                        })}</h1>
                    </div>
                   <div className="flex justify-between">
                        <span className="text-blue-gray-600 mr-3">Total Stay</span>
                        <h1>{item?.no_of_days} days</h1>
                   </div>
                    <div className="flex gap-2 flex-col mt-5">
                        <span>Payment_id:</span>
                        <h1 className="text-blue-700">{item?.payment_id}</h1>

                    </div>
                </div>
            ))}
            </div>
            
            {!bookings?.length && <h1>No Bookings Found</h1>}
        </div>
    )
}
export default Mybookings;
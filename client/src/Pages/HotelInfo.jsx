import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchHotel } from "../redux/hotelSlice";
import { FaPhone } from "react-icons/fa";
import ImageSlider from "../components/ImageSlider";
import { Button, Rating, Switch } from "@material-tailwind/react";
import { IoBedSharp } from "react-icons/io5";
import jacuzzi from "../Images/jacuzzi.png";
import data from "../components/bedsdata";
import { FaSwimmer } from "react-icons/fa";
import meals from '../Images/meals.png';
function HotelInfo(){
    const {id}=useParams();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const[selectroom,setSelectroom]=useState(false);
    const userInfo=useSelector(state=>state.auth.userInfo);
    const hotel=useSelector(state=>state.hotel.hotel);
    const [price,setPrice]=useState(0);
    const[extracharge,setExtracharge]=useState(0);
    useEffect(()=>{
        if(!userInfo){
            navigate('/login');
            return;
        }
        dispatch(fetchHotel(id));
    },[id,dispatch])
    useEffect(()=>{
        if(hotel){
            setPrice(hotel.price);
        }
    },[hotel])
    const handlePayment=(item)=>{
        navigate(`/cart-page/${item?._id}/${price+extracharge}`);
    }
    const handleBedToggle=(isChecked,typeamount)=>{
        if(isChecked){
            setPrice(typeamount);
        }else{
            setPrice(hotel.price);
        }
    }
    const handleToggle=(isChecked,amount)=>{
        if (isChecked) {
            setExtracharge(extracharge+ amount); // Add item price when toggled on
            console.log("Toggled on", amount,price);
          } else {
            setExtracharge(extracharge - amount); // Subtract item price when toggled off
            console.log("Toggled on", amount,price);

          }
    }
    //handlePayment(hotel)
    return(
        <div className="mx-auto max-w-7xl px-4 md:px-8 2xl:px-16">
            <div className="block grid-cols-9 items-start gap-x-10 pb-10  lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20">
            {hotel.images?.length > 0 && (
            <div className="col-span-5">
                <ImageSlider data={hotel?.images} />
            </div>
            )}


            <div className="col-span-4 pt-3 lg:pt-10">
                <div className="flex justify-end md:justify-start mb-10"><Button className={`${selectroom ? "bg-brown-300":"bg-white border-black border-b-2"} text-black`} onClick={()=>setSelectroom(!selectroom)}>Select Room</Button></div>

                <div className="mb-4 pb-7">
                    <h2 className="text-heading mb-3.5 text-lg text-brown-400 font-bold md:text-xl lg:text-2xl 2xl:text-3xl">
                    {hotel.title} <span className="text-brown-200">{hotel.region},{hotel.country}</span>
                    </h2>
                    <div className="mb-4 flex gap-3"><Rating value={5} /><span className="text-gray-500">604 Reviews</span></div>
                    <p className="text-body text-sm leading-6 lg:text-base lg:leading-8">
                    {hotel.content}
                    </p>
                    <div className="text-heading pr-2 mt-5 text-base font-bold md:pr-0  text-blue-gray-500 ">
                        Luxury bed <span className="text-green-500 ml-3">${hotel.price}</span>
                    </div>
                    <div className="flex items-center text-blue-gray-400 mt-3">
                        <FaPhone/> <span className=" underline ml-2">+1 {hotel.contact}</span>
                    </div>
                
                </div>
            
                <div className="py-3">
                    <ul className="space-y-5 pb-1 text-sm">
                    <li>
                        <span className="text-heading inline-block pr-2 font-semibold">
                        Region:
                        </span>
                        <a
                        className="hover:text-heading transition hover:underline"
                        href="#"
                        >
                        {hotel.region}
                        </a>
                    </li>
                    <li className="productTags">
                        <span className="text-heading inline-block pr-2 font-semibold">
                        Country:
                        </span>
                        <a
                        className="hover:text-heading inline-block pr-1.5 transition last:pr-0 hover:underline"
                        href="#"
                        >
                        {hotel.country}
                        </a>
                    </li>
                    <li className="productTags">
                        <span className="text-heading inline-block pr-2 font-semibold">
                        Available rooms
                        </span>
                        <a
                        className="hover:text-heading inline-block pr-1.5 transition last:pr-0 hover:underline"
                        href="#"
                        >
                        {hotel.rooms>0?hotel.rooms:<h1 className="text-red-400 font-bold">Sold Out</h1>}
                        </a>
                    </li>

                    </ul>
                </div>
                </div>
                
            </div>
            {selectroom && <div className="flex flex-col gap-4">
                    <h1 className="text-heading text-xl text-brown-300 md:mt-10 font-bold md:mb-10">Available Rooms</h1>
                    {data?.map((item,index)=>(
                        <div className="grid grid-cols-2  pb-4">
                            <div className="w-3/4  mx-auto">
                            <img className="  object-cover" src={item.image} alt={item.name} />

                            </div>
                            <div className="w-3/4 mx-auto flex flex-col gap-2">
                                <h1 className="text-red-400 font-sans font-bold">{item.type}</h1>
                                <div className="flex items-center gap-2">
                                    <IoBedSharp/>
                                    <span>{item.type}</span>
                                </div>
                                {item?.smoke ? <span className="text-gray-500">Smoking</span> : <span className="text-gray-500">Non-Smoking</span>}
                                <div className="flex justify-between">
                                    <h1 className="text-green-700">${item.price}</h1>
                                    <Switch onChange={(e) => handleBedToggle(e.target.checked,Number(item.price))} />
                                </div>

                            </div>
                        </div>
                    ))}
                </div>}
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <div className="flex gap-2 items-center">
                    <img src={jacuzzi} alt="jacuzzi"  className="w-6"/>
                    <h1 className="text-brown-700 font-bold">Jacuzzi</h1>
                    </div>
                    <span className="flex gap-2"><span className="text-brown-600">$20</span><Switch onChange={(e) => handleToggle(e.target.checked,20)}/></span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                    <FaSwimmer size={25}/>
                    <h1 className="text-brown-700 font-bold">Swimming</h1>
                    </div>
                    <span className="flex gap-2"><span className="text-brown-600">$30</span><Switch onChange={(e) => handleToggle(e.target.checked,30)}/></span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                    <img src={meals} alt="meals" className="w-6"/>
                    <h1 className="text-brown-700 font-bold">Meals</h1>

                    </div>
                    <span className="flex gap-2"><span className="text-brown-600">$40</span><Switch onChange={(e) => handleToggle(e.target.checked,40)}/></span>
                </div>
                <Button className="text-white my-10 bg-green-300 text-sm font-bold" onClick={()=>handlePayment(hotel)}>Book Now</Button>
            </div>
        </div>
    )
}
export default HotelInfo;
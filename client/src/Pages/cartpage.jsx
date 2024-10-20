import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { useDispatch,useSelector } from 'react-redux';
import { doHotelPayment, fetchHotel, getHotels } from '../redux/hotelSlice';
import { toast } from 'react-toastify';
import { useParams } from'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import data from '../components/bedsdata';
import { Button, Input, Rating } from '@material-tailwind/react';
import { FaPhone } from 'react-icons/fa';
import ImageSlider from '../components/ImageSlider';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import lookup from 'country-code-lookup'
function Cartpage(){
  const stripe = useStripe();
  const elements = useElements();
  const userInfo=useSelector((state)=>state.auth.userInfo);
  const {id,price}=useParams();
  const dispatch=useDispatch();
  const hotel=useSelector((state)=>state.hotel.hotel);
  const [userAddress,setUserAddress]=useState({street:"",city:"",state:"",country:"",zip:""});
  const[checkIn,setCheckIn]=useState(new Date());
  const [checkOut,setCheckOut]=useState(new Date());

  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };


  // const[hotel,setHotel]=useState(null);
  const navigate=useNavigate();
  useEffect(()=>{
    dispatch(fetchHotel(id));
  },[id,dispatch])
  // useEffect(()=>{
  //   dispatch(getHotels());
  //   const item=hotels.find(hotel=>hotel._id===id);
  //   setHotel(item);
  // },[id,dispatch,hotels.length]);
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if (!stripe || !elements || !userAddress?.street || !userAddress?.city || !userAddress?.state || !userAddress?.country || !userAddress?.zip){
      toast.error("Please fill all the required fields");
      return;
    }
    const countryCode=lookup.byCountry(userAddress?.country);
    const data=await dispatch(doHotelPayment({id,price,user_id:userInfo?._id,checkIn,checkOut}));
    const result=await stripe.confirmCardPayment(data?.payload?.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: userInfo?.username,
          email: userInfo?.email,
          phone: userInfo?.mobile,
          address: {
            line1: userAddress?.street, // Your actual address
            city:userAddress?.city,      // Your actual city
            state: userAddress?.state,          // Your actual state
            postal_code: userAddress?.zip, // Your actual postal code
            country: countryCode?.iso2// Use US as your country
          },
  
        },
      },
    })
    console.log("result after payment",result?.paymentIntent);
    if(result.error){
      console.log(result.error);
      toast.error(result.error.message);
    }else{
      toast.success('Payment Successful');
      navigate('/');
    }

  }
  //add the address details and payment information and hotel data also. and types of beds with prices by adding features like swimming  and check in and checkout dates.
  
    return(
        <div>
          
          <div className="md:mb-20 mb-5 pb-7 items-start grid grid-cols-2">
                  <div className='md:w-3/4 md:mx-auto'>
                    {hotel.images?.length > 0 && (
                      <div className="col-span-5">
                          <ImageSlider data={hotel?.images} />
                      </div>
                      )}
                    </div>
                  <div>
                    <h2 className="text-heading mb-3.5 text-lg text-brown-400 font-bold md:text-xl lg:text-2xl 2xl:text-3xl">
                      {hotel.title} <span className="text-brown-200">{hotel.region},{hotel.country}</span>
                      </h2>
                      <div className="mb-4 flex flex-col gap-3"><Rating value={5} /><span className="text-gray-500">604 Reviews</span></div>
                      <p className="text-body text-sm leading-6 lg:text-base lg:leading-8">
                      {hotel.content}
                      </p>
                      <div className="text-heading pr-2 mt-5 text-base font-bold md:pr-0  text-blue-gray-500 ">
                          Luxury bed <span className="text-green-500 ml-3">${hotel.price}</span>
                      </div>
                      <div className="flex items-center text-blue-gray-400 mt-3">
                          <FaPhone/> <span className=" underline ml-2"><a href={`tel:${hotel?.contact}`}>{hotel?.contact}</a></span>
                      </div>
                  </div>
                    
                
          </div>
          <div className='mx-5 '>
            <div className='flex flex-col md:flex-row gap-5 md:justify-evenly my-10 '>
            <div className='flex flex-col gap-5 my-10'>
              <h1 className='text-xl text-brown-400 underline mb-4'>Check In & Check Out details</h1>
              <div className=''>
                <Input
                  label='Check In date'
                  type="datetime-local"
                  id="checkIn"
                  min={getTodayDate()} // Disable past dates
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  required
                />
              </div>

              <div className=''>
                <Input
                  label='Check Out date'
                  type="datetime-local"
                  id="checkOut"
                  min={getTodayDate()} // Disable past dates
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  required
                />
              </div>
              </div>
              <div>
                <h1 className='text-xl text-brown-400 underline mb-4'>Guest Information</h1>
                <div className='flex flex-col gap-5'>
                  <Input type="text" placeholder="Address Line 1" value={userAddress?.street}  required label='Address Line' onChange={(e)=>setUserAddress({...userAddress,["street"]:e.target.value})}/>
                  <span className='text-sm text-red-400'>Country* </span>
                  <CountryDropdown
                    value={userAddress?.country}
                    className=" border-gray-500 border-b-2 rounded-md px-4 py-2 "
                    onChange={(val)=>setUserAddress({...userAddress,["country"]:val})}
                    
                  />
                  <span className='text-sm text-red-400'>State*</span>
                  <RegionDropdown
                      value={userAddress?.state}
                      className=" border-gray-500 border-b-2 rounded-md px-4 py-2 "
                      country={userAddress?.country}
                      onChange={(val)=>setUserAddress({...userAddress,["state"]:val})}

                      />
                  <Input type="text" value={userAddress?.city} placeholder="City" required label='city' onChange={(e)=>setUserAddress({...userAddress,["city"]:e.target.value})}/>
                  <Input type='text' value={userAddress?.zip} placeholder='postal Code' required label='postal Code' onChange={(e)=>setUserAddress({...userAddress,["zip"]:e.target.value})}/>
                  

              </div>
              </div>
            
            </div>
            <div className='mx-auto md:w-3/4 md:mt-14'>
                <h1 className='text-xl text-brown-400 underline mt-10 mb-4'>Card Information</h1>
                <CardElement className='my-10 '/>
              </div>
            
            <Button onClick={handleSubmit} className='bg-green-600 w-full mb-10' >Confirm Booking</Button>
          </div>
        
        </div>
    )
}
export default Cartpage;

import  { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Button, Card, Input, Textarea, Typography } from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import thumps from '../../Images/thumbs-up.png';
import upload from '../../Images/upload.png'
import { useParams } from 'react-router-dom';
import { addHotel, getHotels } from '../../redux/hotelSlice';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

function Hotel() {
    const params=useParams();
    const {hotelname}=params;
    const userInfo=useSelector((state)=>state.auth.userInfo);
    const[hoteldata,setHoteldata]=useState({id:"",user:userInfo,title:"",contact:"",content:"",location:"",country:"",region:"",images:[],price:0,rooms:0});
    // const clubs=useSelector((state)=>state.clubs.clubs);
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchHotels=async()=>{
            dispatch(getHotels());
        }
        fetchHotels();
    },[dispatch])
    // useEffect(()=>{
    //     const updateClub=clubs.filter((item)=>item.name===clubname)[0];
    //     if(updateClub){
    //         setClubdata({"id":updateClub._id,"image":updateClub.image,"name":updateClub.name,"desc":updateClub.desc});
    //     }
    // },[clubs])
    const handleFileChange=(e)=>{
        setHoteldata({...hoteldata,["images"] : e.target.files});
        toast.success("Image uploaded succesfully");
    }
    const handleHotelSubmit=async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", hoteldata.title);
        formData.append("contact", hoteldata.contact);
        formData.append("content", hoteldata.content);
        formData.append("country", hoteldata.country);
        formData.append("region", hoteldata.region);
        formData.append("location", hoteldata.location);
        formData.append("price", hoteldata.price);
        formData.append("rooms", hoteldata.rooms);

        // Append all selected files
        for (let i = 0; i < hoteldata.images.length; i++) {
        formData.append("images", hoteldata.images[i]);
        }
        if(hotelname){
            await dispatch(updateClub(clubdata));
            await dispatch(getClubs());
            
        }else{
            await dispatch(addHotel(formData));
            await dispatch(getHotels());
        }
    }
  return (
    <div >
        <div className='pt-10 lg:flex items-center '>
            <Card shadow={true} className='mx-auto lg:px-10 pb-10'>
                <form className='text-center md:mt-10 flex sm:flex-row flex-col items-center gap-10 px-10 mx-auto' onSubmit={handleHotelSubmit}>
                    <div>
                        <label htmlFor="fileInput"  className="p-2  rounded-md cursor-pointer">
                                <img src={hoteldata.images?.length>0?thumps:upload} alt='clubimage' className='w-40 h-40 object-cover'/>                        </label>
                        <input
                            id="fileInput"
                            name="images"
                            type="file"
                            multiple
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                    
                    
                    
                   <div className='flex flex-col gap-6 '>
                        {hotelname ?  <Typography variant="h4" color="blue-gray">
                            Update Hotel
                        </Typography>: <Typography variant="h4" color="blue-gray">
                            Add Hotel
                        </Typography>}

                        <Input color="brown" className='' label='Hotel Title' type='text' value={hoteldata?.title} onChange={(e)=>setHoteldata({...hoteldata,["title"] : e.target.value.toUpperCase()})}/>
                        <Input color="brown" className='' label='Hotel Contact' type='tel' value={hoteldata?.contact} onChange={(e)=>setHoteldata({...hoteldata,["contact"] : e.target.value})}/>
                        <CountryDropdown
                                className="w-48 border-gray-500 border-b-2 rounded-md px-4 py-2 "
                                value={hoteldata.country}
                                onChange={(val)=>setHoteldata({...hoteldata,["country"] : val})}
                                />
                        <RegionDropdown
                                className="w-48 border-gray-500 border-b-2 rounded-md px-4 py-2 "
                                country={hoteldata.country}
                                value={hoteldata.region}
                                onChange={(val)=>setHoteldata({...hoteldata,["region"] : val})}/>
                        <Textarea color="brown"label="Hotel Content" type='text' value={hoteldata?.content} onChange={(e)=>setHoteldata({...hoteldata,["content"] : e.target.value})} />
                        <Textarea color="brown"label="Hotel Location" type='text' value={hoteldata?.location} onChange={(e)=>setHoteldata({...hoteldata,["location"] : e.target.value})} />
                        <Input color="brown" className='' label='Basic Room Price' type='number' value={hoteldata?.price} onChange={(e)=>setHoteldata({...hoteldata,["price"] : e.target.value})}/>
                        <Input color="brown" className='' label='No of rooms' type='number' value={hoteldata?.bed} onChange={(e)=>setHoteldata({...hoteldata,["rooms"] : e.target.value})}/>

                        <Button color="brown" type='submit'>Submit</Button>
                   </div>
                </form>
            </Card>
        </div>
    </div>
  )
}

export default Hotel;
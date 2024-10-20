import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getHotels } from "../redux/hotelSlice";
import { useNavigate } from "react-router-dom";
import { Button } from '@material-tailwind/react';
import { FaPhone } from "react-icons/fa";

export default function Homepage() {
    const navigate = useNavigate();
    const hotels = useSelector((state) => state.hotel.hotels);
    const [imageIndex, setImageIndex] = useState(0);
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.auth.userInfo);

    const [filter, setFilter] = useState({
        country: "",
        name: "",
        price: "",
        region: ""
    });

    const handlePayment = (item) => {
        if (!userInfo) {
            navigate('/login');
        } else {
            navigate(`/hotel-page/${item?._id}`);
        }
    }

    useEffect(() => {
        dispatch(getHotels());
    }, [dispatch]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setImageIndex((prevIndex) => (prevIndex + 1) % 2);
        }, 1000); 

        return () => clearInterval(intervalId);
    }, [imageIndex]);

    // Filter logic
    const filteredHotels = hotels?.filter((hotel) => {
        return (
            (filter.country === "" || hotel.country.toLowerCase().includes(filter.country.toLowerCase())) &&
            (filter.name === "" || hotel.title.toLowerCase().includes(filter.name.toLowerCase())) &&
            (filter.region === "" || hotel.region.toLowerCase().includes(filter.region.toLowerCase())) &&
            (filter.price === "" || hotel.price <= filter.price)
        );
    });

    return (
        <div className="mx-10 mb-10">
            {/* Filter section */}
            <div className="flex flex-col gap-4 mb-8 bg-gray-100 p-4 rounded-lg">
                <input
                    type="text"
                    placeholder="Filter by name"
                    value={filter.name}
                    onChange={(e) => setFilter({ ...filter, name: e.target.value })}
                    className="border p-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Filter by country"
                    value={filter.country}
                    onChange={(e) => setFilter({ ...filter, country: e.target.value })}
                    className="border p-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Filter by region"
                    value={filter.region}
                    onChange={(e) => setFilter({ ...filter, region: e.target.value })}
                    className="border p-2 rounded-lg"
                />
                <input
                    type="number"
                    placeholder="Filter by maximum price"
                    value={filter.price}
                    onChange={(e) => setFilter({ ...filter, price: e.target.value })}
                    className="border p-2 rounded-lg"
                />
            </div>

            {/* Hotels list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredHotels?.map((item) => (
                    <div key={item._id} className="h-fit">
                        <div className='sm:mx-5 position-relative h-96 flex flex-col gap-10 shadow-lg pb-5 sm:h-96 cursor-pointer group relative'>
                            <div className=''>
                                <img
                                    className="object-cover mb-2 rounded-md w-full lg:h-72 h-72 mx-auto"
                                    src={item?.images[imageIndex]}
                                    alt={`Image ${imageIndex + 1}`}
                                />
                            </div>

                            <div className="bg-black text-white absolute flex flex-col justify-center gap-2 items-center bottom-0 left-0 right-0 h-0 overflow-hidden group-hover:h-full transition-[height_0.5s] duration-500 bg-darkblue rounded-xl">
                                <h3 className='text-2xl font-medium mb-5'>{item.title}</h3>
                                <p className='px-2 text-center text-lg '>{item.content}</p>
                                <div className="flex items-center gap-3">
                                    <FaPhone />
                                    <h1 className="text-blue-700 underline font-bold "><a href={`tel:${item?.contact}`}>{item?.contact}</a></h1>
                                </div>
                                <p>{item?.location}</p>
                                <h1>{item?.country}</h1>
                                <h1>{item?.region}</h1>
                                <div className="flex items-center gap-4">
                                    <span>Available rooms</span>
                                    <h1 className="font-bold underline">{item?.rooms} </h1>
                                </div>
                                <div className="flex justify-between gap-4">
                                    <h1>Luxury Room Price</h1>
                                    <h1 className="underline  font-bold">${item?.price}</h1>
                                </div>
                                <Button onClick={() => handlePayment(item)} className="border-2 bg-white text-black position-absolute mx-auto block p-2 w-fit border-green-100 shadow-md">Book Now</Button>
                            </div>
                            <Button onClick={() => handlePayment(item)} className="border-2 bg-white text-black position-absolute mx-auto block p-2 w-fit border-green-100 shadow-md">Book Now</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

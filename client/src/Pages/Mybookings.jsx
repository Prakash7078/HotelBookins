import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBookingById, getHotels } from "../redux/hotelSlice";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { FaDownload } from "react-icons/fa6";
import { Button } from "@material-tailwind/react";


const Mybookings = () => {
    const dispatch = useDispatch();
    const bookings = useSelector((state) => state.hotel.bookings);
    const userInfo = useSelector((state) => state.auth.userInfo);
    const hotels = useSelector((state) => state.hotel.hotels);

    const findhotel = (item) => {
        const hotel = hotels.find((hot) => hot._id === item.hotel);
        return hotel;
    };

    useEffect(() => {
        dispatch(getHotels());
    }, [dispatch, hotels?.length]);

    useEffect(() => {
        dispatch(getBookingById(userInfo?._id));
    }, [dispatch, userInfo, bookings?.length]);

    const downloadPDF = (booking) => {
        const doc = new jsPDF();
        const hotel = findhotel(booking);

        doc.setFontSize(18);
        doc.text("Booking Details", 10, 10);

        doc.setFontSize(12);
        doc.text(`Hotel: ${hotel?.title}`, 10, 30);
        doc.text(`Location: ${hotel?.region}, ${hotel?.country}`, 10, 40);
        doc.text(`Price: $${booking?.price}`, 10, 50);
        doc.text(`Check-In Date: ${new Date(booking?.checkInDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}`, 10, 60);
        doc.text(`Check-Out Date: ${new Date(booking?.checkOutDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}`, 10, 70);
        doc.text(`Total Stay: ${booking?.no_of_days} days`, 10, 80);
        doc.text(`Room Type: ${booking?.roomtype}`, 10,30);
        doc.text(`Payment ID: ${booking?.payment_id}`, 10, 90);

        doc.save(`Booking_${booking._id}.pdf`);
    };

    return (
        <div className="mx-8">
            <h1 className="text-xl text-gray-600 underline mb-3">My Bookings</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {bookings?.map((item) => (
                    <div className="shadow-lg md:m-4 m-2 p-4 bg-white flex flex-col gap-3" key={item._id}>
                        <div>
                            <h2 className="text-heading mb-3.5 text-lg font-bold md:text-xl lg:text-2xl 2xl:text-3xl">
                                {findhotel(item)?.title} <span className="text-gray-600">{findhotel(item)?.region}, {findhotel(item)?.country}</span>
                            </h2>
                        </div>
                        <div className="flex justify-between">
                            <span>Price</span>
                            <h1 className="text-green-300">${item?.price}</h1>
                        </div>
                        <div className="flex justify-between">
                            <span className="">Check-In Date</span>
                            <h1>{new Date(item?.checkInDate).toLocaleDateString('en-US', {
                                day: 'numeric', 
                                month: 'short', 
                                year: 'numeric'
                            })}</h1>
                        </div>
                        <div className="flex justify-between">
                            <span className="">Check-Out Date</span>
                            <h1>{new Date(item?.checkOutDate).toLocaleDateString('en-US', {
                                day: 'numeric', 
                                month: 'short', 
                                year: 'numeric'
                            })}</h1>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-blue-gray-600 mr-3">Room Type</span>
                            <h1>{item?.roomtype}</h1>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-blue-gray-600 mr-3">Total Stay</span>
                            <h1>{item?.no_of_days} days</h1>
                        </div>
                        <div className="flex gap-2 flex-col mt-5">
                            <span>Payment ID:</span>
                            <h1 className="text-blue-700">{item?.payment_id}</h1>
                        </div>
                        <Button size="sm"
                            
                            className=" flex items-center justify-between mt-4 font-serif rounded "
                        >
                            Download Invoice <span onClick={() => downloadPDF(item)} className="bg-red-400 p-4 rounded-full text-white" ><FaDownload/></span>
                        </Button>
                    </div>
                ))}
            </div>
            {!bookings?.length && <h1>No Bookings Found</h1>}
        </div>
    );
};

export default Mybookings;

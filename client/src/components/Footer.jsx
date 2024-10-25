import { FaPhone } from "react-icons/fa";

const Footer=()=>{
    return(
        <div className="fixed bottom-0 bg-black w-full flex flex-col md:flex-row gap-2 justify-evenly text-white p-10">
            <h1>My Bookings</h1>
            <h1 className="flex items-center gap-2">Fast Booking call <FaPhone/><a className="text-red-400" href="tel:3163725784">+1 3163725784</a></h1>
        </div>
    )
}
export default Footer;
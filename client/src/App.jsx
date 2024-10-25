import { BrowserRouter,Routes,Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Navbar from "./components/Navbar";
import Hotel from "./Pages/admin/Hotel";
import Cartpage from "./Pages/cartpage";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Profile from "./Pages/Profile";
import HotelInfo from "./Pages/HotelInfo";
import Mybookings from "./Pages/Mybookings";


const App=()=>{
  const appearance = {
    theme: 'stripe'
  };
 
  const stripePromise = loadStripe('pk_test_51OL4ddSEiKPvMbBJeUCeuasTsLEAu2RcrXl02IGSYkBoBI0e2I91zeabsoN80lubfAXXI9noVTBmzGZi9735FSUL005wYN5ZAs');

  return(
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path='/addhotel/:id' element={<Hotel/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path='/hotel-page/:id' element={<HotelInfo/>}/>
          <Route path='/cart-page/:id/:price' element={
              <Elements stripe={stripePromise} >
                <Cartpage />
              </Elements>
            }/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/mybookings' element={<Mybookings/>}/>
        </Routes>
      </BrowserRouter>
      <div>
       
        <ToastContainer
          position="bottom-center"
          bodyClassName="font-bold text-blue-900 text-center"
        />
       
      </div>
    </div>
    
    
  
  )
}
export default App;
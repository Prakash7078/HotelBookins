import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config/url";
import { toast } from "react-toastify";
export const getHotels=createAsyncThunk("api/getHotels",async()=>{
    try{
         const res=await axios.get(`${BASE_URL}/api/hotels/allhotels`);
         return res.data;
    }catch(err){
         console.log(err);
    }
 })
 export const fetchHotel=createAsyncThunk("api/fetchHotel",async(id)=>{
    try{
         const res=await axios.get(`${BASE_URL}/api/hotels/hotel/${id}`);
         return res.data;
    }catch(err){
         console.log(err);
    }
 })
 export const addHotel=createAsyncThunk(
    "api/addhotel",
    async(payload)=>{
        try{
            const result=await axios.post(`${BASE_URL}/api/admin/add-hotel`,payload,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
            })
            return result.data;
        }catch(err){
            console.log(err);
        }
    }
 )
 export const getBookingById=createAsyncThunk(
    "/api/getBookingById",
    async(id)=>{
        try{
            const result=await axios.get(`${BASE_URL}/api/hotels/booking/${id}`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
            })
            return result.data;
        }catch(err){
            console.log(err);
        }
    }
)
export const saveBookingById=createAsyncThunk(
    "api/saveBooking",
    async(payload)=>{
        try{
            const result=await axios.post(`${BASE_URL}/api/hotels/savebooking`,payload,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
            })
            return result.data;
        }catch(err){
            console.log(err);
        }
    });
 export const doHotelPayment=createAsyncThunk(
    "api/doHotelPayment",
    async(payload)=>{
        console.log("payload",payload);
        try{
            const result=await axios.post(`${BASE_URL}/api/hotels/payment`,payload,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
            })
            console.log(result.data);
            return result.data;
        }catch(err){
            console.log(err);
        }
    }
 )
 const hotelSlice=createSlice(
    {
        name:'hotels',
        initialState:{
            hotels:[],
            hotel:[],
            bookings:[],
            clientSecret:null,
            load:false,
            error:null,
        },
        reducers:{},
        extraReducers:(builder)=>{
            builder
            .addCase(getHotels.pending, (state) => {
                state.load = true;
            })
            .addCase(getHotels.fulfilled, (state, { payload }) => {
                state.load = false;
                console.log(payload);
                state.hotels = payload;
            })
            .addCase(getHotels.rejected, (state) => {
                state.load = false;
                toast.error("Network error!");
            });
            builder
            .addCase(fetchHotel.pending, (state) => {
                state.load = true;
            })
            .addCase(fetchHotel.fulfilled, (state, { payload }) => {
                state.load = false;
                console.log(payload);
                state.hotel = payload;
            })
            .addCase(fetchHotel.rejected, (state) => {
                state.load = false;
                toast.error("Network error!");
            });
            builder
            .addCase(addHotel.pending, (state) => {
                state.load = true;
            })
            .addCase(addHotel.fulfilled, (state, { payload }) => {
                state.load = false;
                toast.success("Hotel added successfully!");
            })
            .addCase(addHotel.rejected, (state) => {
                state.load = false;
                toast.error("Network error!");
            });
            builder
            .addCase(doHotelPayment.pending, (state) => {
                state.load = true;
            })
            .addCase(doHotelPayment.fulfilled, (state, { payload }) => {
                state.load = false;
                state.clientSecret = payload.clientSecret;
            })
            .addCase(doHotelPayment.rejected, (state) => {
                state.load = false;
                toast.error("Network error!");
            });
            builder
            .addCase(getBookingById.pending, (state) => {
                state.load = true;
            })
            .addCase(getBookingById.fulfilled, (state, { payload }) => {
                state.load = false;
                state.bookings = payload;
            })
            .addCase(getBookingById.rejected, (state) => {
                state.load = false;
                toast.error("Network error!");
            });
        }
    }
)
export default hotelSlice.reducer;
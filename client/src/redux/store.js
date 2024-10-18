import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import hotelReducer from "./hotelSlice";
const store=configureStore({
    reducer:{
        auth:authReducer,
        hotel:hotelReducer,
    }
})
export default store;
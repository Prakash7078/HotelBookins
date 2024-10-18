import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { BASE_URL } from "../config/url";
import { toast } from "react-toastify";
const token=localStorage.getItem("token");
const userInfo=localStorage.getItem("userInfo");
const initialState = {
    userInfo: userInfo ? JSON.parse(userInfo):null,
    token:token,
    loading:false,
    error:null,
};

//login user asyn thunk function this createAsyncThunk is imported from @reduxjs/toolkit
export const loginUser=createAsyncThunk(
    "auth/login",
    async(data,{rejectWithValue})=>{
        try{
            const response=await axios.post(`${BASE_URL}/api/auth/login`,{data});
            return response.data;

        }catch (error) {
            return rejectWithValue(error?.response?.data);
      
        }
    }
)
// Async thunk action to handle user signup
export const signupUser = createAsyncThunk(
    "auth/signup",
    async (payload, { rejectWithValue }) => {
      try {
        console.log("Payload in frontend : ", payload);
        const response = await axios.post(`${BASE_URL}/api/auth/signup`, payload);
        return response.data;
      } catch (error) {
        console.log("error",error);
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );
export const logoutUser=createAsyncThunk(
  "auth/logout",
  async()=>{
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    return null;
  }
)
  

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.
        addCase(loginUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading=false;
            const {user,token}=action.payload;
            localStorage.setItem("token",token);
            localStorage.setItem("userInfo", JSON.stringify(user));
            state.userInfo=user;
            state.token=token;
            toast.success("Login successful");
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.error;
            toast.error(action.payload?.error);
        })
        builder
        .addCase(signupUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(signupUser.fulfilled, (state,action) => {
          state.loading = false;
          const { user, token } = action.payload;
          localStorage.setItem("userInfo", JSON.stringify(user));
          localStorage.setItem("token", token);
          state.userInfo = user;
          state.token = token;
          toast.success("Signup successful!");
        })
        .addCase(signupUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.error;
          toast.error(action.payload.error);
        });
        builder.addCase(logoutUser.fulfilled, (state) => {
          state.userInfo = null;
          state.token = null;
          toast.success("Logout successful!");
        });
    }
})
export default authSlice.reducer;
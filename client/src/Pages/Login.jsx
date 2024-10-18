import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
  } from "@material-tailwind/react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { IoEyeOutline } from "react-icons/io5";
import { loginUser } from "../redux/authSlice";

function Login(props){
    const {value} = props;
    const [data,setData]=useState({email:'',password:''});
    const[showPassword,setShowPassword]=useState(false);
    const userInfo = useSelector((state) => state.auth.userInfo);
    const dispatch = useDispatch();

    const navigate=useNavigate();

    const togglePasswordVisibility=()=>{
        setShowPassword(!showPassword);
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginUser(data));
        value();
        navigate("/");
      };
      const handleSignup = () => {
        navigate("/signup");
        value();
      };
      useEffect(()=>{
        if(userInfo){
            navigate('/');
        }
    },[navigate,userInfo])
    return(
        <div>
            <Card>
                <CardHeader className="p-5 text-center">
                    <Typography className="font-bold">
                        Login
                    </Typography>
                </CardHeader>
                <CardBody>
                    {/* <Input type="text" label="username" value={username} onChange={(e)=>setUsername(e.target.value)} name="username" size="md"/> */}
                    <Input type="email" label="email" value={data.email} onChange={(e)=>setData({...data,[e.target.name]:e.target.value})} size="md" name="email" />
                    <div className="flex justify-between items-center mt-4">
                        <Input
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        size="md"
                        onChange={(e)=>setData({...data,[e.target.name]:e.target.value})}
                        value={data.password}
                        name="password"
                        className="flex-grow border-none "
                        />
                        <IoEyeOutline
                        onClick={togglePasswordVisibility}
                        className="cursor-pointer ml-2"
                        />
                    </div>
                </CardBody>
                <CardFooter className="pt-0">
                <Button
                    color="brown"
                    variant="gradient"
                    onClick={handleLogin}
                    fullWidth
                >
                    Sign In
                </Button>
                <Typography variant="small" className="mt-6 flex justify-center">
                    Don&apos;t have an account?
                    <Typography
                    onClick={handleSignup}
                    variant="small"
                    color="brown"
                    className="ml-1 font-bold cursor-pointer"
                    >
                    Sign up
                    </Typography>
                </Typography>
                </CardFooter>
            </Card>
        </div>
    )
}
export default Login;
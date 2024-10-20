import {useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from "react-redux";
import { signupUser } from "../redux/authSlice";
import { Link } from 'react-router-dom';
import { IoEyeOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
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
  function Signup() {
    const [data,setData]=useState({
        name:'',
        email:'',
        mobile:'',
        password:'',
        confirmPassword:'',
        admin:'false',
    })
    const [error, setError] = useState('');
    const dispatch = useDispatch();
	const navigate = useNavigate();
    const userInfo = useSelector((state) => state.auth.userInfo);
    const[showPassword,setShowPassword]=useState(false);
    const togglePasswordVisibility=()=>{
        setShowPassword(!showPassword);
    }
	const handleChange =async(e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setError(''); // Clear any previous error when the user makes changes
    };
    const handleSignUp=async(e)=>{
        e.preventDefault();
        if(data.password!==data.confirmPassword){
            toast.error('passwords do not match');
        }
        else{
            await dispatch(signupUser(data));
	        navigate('/');
        }
    }
    useEffect(()=>{
        if(userInfo){
            navigate('/login');
        }
    },[navigate,userInfo])
    return (
        <div>
            <Card className='md:w-1/2 mx-auto'>
                <CardHeader className="p-5 text-center">
                    <Typography className="font-bold">
                        Sign Up
                    </Typography>
                </CardHeader>
                <CardBody>
                    <div className='flex flex-col gap-4'>
                        <Input className='' type="text" label="username" value={data.name} onChange={handleChange} name="name" size="md"/>
                        <Input className='' type="email" label="email" value={data.email} onChange={handleChange} size="md" name="email" />
                        <Input type='tel' label='mobile' value={data.mobile} onChange={handleChange} size='md' name='mobile'/>
                    </div>
                   
                    <div className="flex justify-between items-center mt-4">
                        <Input
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        size="md"
                        onChange={handleChange}
                        value={data.password}
                        name="password"
                        className="flex-grow border-none "
                        />
                        <IoEyeOutline
                        onClick={togglePasswordVisibility}
                        className="cursor-pointer ml-2"
                        />
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <Input
                        label="Confirm Password"
                        type={showPassword ? "text" : "password"}
                        size="md"
                        onChange={handleChange}
                        value={data.confirmPassword}
                        name="confirmPassword"
                        className="flex-grow border-none "
                        />
                        <IoEyeOutline
                        onClick={togglePasswordVisibility}
                        className="cursor-pointer ml-2"
                        />
                    </div>
                    {data.password===data.confirmPassword && data.password!='' && <Typography variant="small" className="text-green-500 text-xs">Password match</Typography>}
                    

                </CardBody>
                <CardFooter className="pt-0">
                <Button
                    color="brown"
                    variant="gradient"
                    onClick={handleSignUp}
                    fullWidth
                >
                    Sign Up
                </Button>
                <Typography variant="small" className="mt-6 flex justify-center">
                    Already have an account?
                    <Link to="/login">
                        <Typography
                        variant="small"
                        color="brown"
                        className="ml-1 font-bold cursor-pointer"
                        >
                        Sign In
                        </Typography>
                    </Link>
                    
                </Typography>
                </CardFooter>
            </Card>
        </div>
    )
}
export default Signup;
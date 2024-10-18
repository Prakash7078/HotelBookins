import {
    IconButton,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Alert,
    Input,
    Drawer,
    Card,
    Button,
    Dialog
  } from "@material-tailwind/react";
  import { useState } from "react";
import Login from "../Pages/Login";
import { RxCross2 } from "react-icons/rx";
import { TiThMenu } from "react-icons/ti";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/authSlice";

function Navbar(){
    
    const [open, setOpen] = useState(false);
    const navigate=useNavigate();
    const handleOpen = () => {
        setOpen((cur) => !cur);
    };
    const dispatch = useDispatch();
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const userInfo = useSelector((state) => state.auth.userInfo);
    
    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);
    const handleLogout =async() => {
        await dispatch(logoutUser());
        navigate('/');
        closeDrawer();
    }
   const handleBookings = ()=>{
    closeDrawer();
    navigate('/mybookings');
   }
   const routeHotel = ()=>{
    closeDrawer();
    navigate(`/addhotel/${userInfo?._id}`);
   }

    return (
        <div className="p-8 items-center flex justify-between">
            <div>
            <h1 className="font-serif text-xl"><Link to='/'>Book Me</Link></h1>

            </div>
            <div className="">
            <IconButton variant="text" size="lg" onClick={openDrawer}>
                {!isDrawerOpen ? (
                  <TiThMenu className="h-6 w-6" />
                ) : (
                  <RxCross2 className="h-6 w-6 " />
                )}
            </IconButton>
            <Drawer open={isDrawerOpen} onClose={closeDrawer}>
                <Card
                color="transparent"
                shadow={false}
                className="h-[calc(100vh-2rem)] w-full p-4"
                >
                <div className="mb-2 flex items-center gap-4 p-4">
                    <Typography variant="h5" color="blue-gray">
                    BookMe
                    </Typography>
                </div>
                <div className="p-2">
                    <Input
                    icon={<FaSearch className="h-5 w-5" />}
                    label="Search"
                    />
                </div>
                <List>
                    <ListItem className="underline" onClick={handleBookings}>
                    My Bookings
                    </ListItem>
                    {userInfo?.isAdmin &&<ListItem onClick={routeHotel}>
                        Add Hotel    
                    </ListItem>}
                    
                    {userInfo && <Link to="/profile"><ListItem onClick={closeDrawer}>
                    <ListItemPrefix>
                        <CgProfile className="h-5 w-5" />
                    </ListItemPrefix>
                    Profile
                    </ListItem></Link>}
                    {!userInfo ? (
                        <ListItem onClick={() => {
                            closeDrawer();
                            handleOpen();
                            }}>
                        <ListItemPrefix>
                            <IoMdLogOut className="h-5 w-5" />
                        </ListItemPrefix>
                        Log In
                        </ListItem>
                        
                        ) : (
                            <ListItem onClick={handleLogout}>
                            <ListItemPrefix>
                                <IoMdLogOut className="h-5 w-5" />
                            </ListItemPrefix>
                            Log Out
                            </ListItem>
                        )}
                    
                </List>
               
                </Card>
            </Drawer>
            
            </div>
            
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Login value={handleOpen} />
            </Dialog>

        </div>
    )
}
export default Navbar;
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import thumps from "../Images/thumbs-up.png";
import { updateRegister } from "../redux/authSlice";

function Profile() {
  const [edit, setEdit] = useState(false);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const [profiledata, setProfiledata] = useState({
    id: userInfo._id,
    image: userInfo.image,
    username: userInfo.username,
    email: userInfo.email,
    mobile:userInfo.mobile,
    
  });
  const handleFileChange = (e) => {
    setProfiledata({ ...profiledata, ["image"]: e.target.files[0] });
    toast.success("Image uploaded succesfully");
  };

  const handleUpdate =async () => {
    await dispatch(updateRegister(profiledata));
  };
  return (
    <div className="w-full">
      <form className="md:mx-20  mt-10 flex flex-col gap-12 mb-10">
        <div className="mt-10  hidden md:flex justify-end">
          <Button color="brown" onClick={() => setEdit(!edit)}>
            Edit Profile
          </Button>
        </div>
        <div
          className={`flex justify-center md:items-start items-center gap-10  flex-col`}
        >
          <div
            className={`flex flex-col md:w-full border-b-2 pb-5 border-gray-400 md:items-center ${
              edit ? "gap-10" : "gap-12"
            }`}
          >
            <label htmlFor="fileInput" className=" cursor-pointer">
              <img
                src={profiledata?.image ? profiledata.image : thumps}
                alt="updateImage"
                className={`rounded-full object-cover w-52 h-52 text-center ${
                  edit ? "md:mb-10" : "mb-0"
                }`}
              />
            </label>
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              disabled={edit ? false : true}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 md:gap-0 md:grid-cols-2 md:w-full">
            <div className="flex flex-col gap-3 md:items-center md:gap-5">
              <span
                className={`flex mx-10 w-56  ${
                  edit ? "flex-col gap-2" : "grid grid-cols-2"
                }`}
              >
                <p className="font-bold ">UserName</p>
                <input
                  className={`${
                    edit
                      ? "border-2 p-2 w-60 border-gray-200 rounded-lg"
                      : "border-none"
                  }`}
                  type="text"
                  value={profiledata?.username}
                  disabled={edit ? false : true}
                  onChange={(e) =>
                    setProfiledata({ ...profiledata, ["username"]: e.target.value })
                  }
                />
              </span>
              <span
                className={`flex mx-10 w-56  ${
                  edit ? "flex-col gap-2" : "grid grid-cols-2"
                }`}
              >
                <p className="font-bold ">Email</p>
                <input
                  className={`${
                    edit
                      ? "border-2 p-2 w-60 border-gray-200 rounded-lg"
                      : "border-none "
                  }`}
                  type="email"
                  value={profiledata?.email}
                  disabled={edit ? false : true}
                  onChange={(e) =>
                    setProfiledata({
                      ...profiledata,
                      ["email"]: e.target.value,
                    })
                  }
                />
              </span>
              <span
                className={`flex mx-10 w-56  ${
                  edit ? "flex-col gap-2" : "grid grid-cols-2"
                }`}
              >
                <p className="font-bold ">Mobile</p>
                <input
                  className={`${
                    edit
                      ? "border-2 p-2 w-60 border-gray-200 rounded-lg"
                      : "border-none "
                  }`}
                  type="tel"
                  value={profiledata?.mobile}
                  disabled={edit ? false : true}
                  onChange={(e) =>
                    setProfiledata({
                      ...profiledata,
                      ["mobile"]: e.target.value,
                    })
                  }
                />
              </span>
            </div>
            
          </div>
        </div>
        <div className="md:hidden flex justify-center ">
          {!edit ? (
            <Button color="brown" onClick={() => setEdit(!edit)}>
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-6">
              <Button
                color="white"
                className="border-2 w-28 border-gray-200 rounded-lg"
                onClick={() => setEdit(!edit)}
              >
                Cancel
              </Button>
              <Button
                color="brown"
                className="w-28"
                onClick={() => {
                  setEdit(!edit);
                  handleUpdate();
                }}
              >
                Save
              </Button>
            </div>
          )}
        </div>
        {edit && (
          <div className="hidden md:flex mx-auto justify-evenly w-full">
            <Button
              color="white"
              className="border-2 w-32 border-gray-200 rounded-lg"
              onClick={() => setEdit(!edit)}
            >
              Cancel
            </Button>
            <Button
              color="brown"
              size="md"
              className="w-32"
              onClick={() => {
                setEdit(!edit);
                handleUpdate();
              }}
            >
              Save
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Profile;
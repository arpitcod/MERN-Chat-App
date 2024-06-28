import React, { useEffect, useState } from "react";
import Users from "./Users";
// import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authUser, otherUser, setAuthuser, setOtherUsers, setSelectedUser } from "../redux/userSlice";
import "./css/Sidebar.css"
import { setMessages } from "../redux/messageSlice";
const Sidebar = () => {
  const aUser = useSelector(authUser);
  const oUser = useSelector(otherUser);
  console.log("auth user ",aUser);
  const navigate = useNavigate();
  const disPatch =useDispatch();
  const [users,setUsers] = useState([])
  const logoutHandle = async () => {
    try {
      await axios.get("http://localhost:2914/api/user/logout");
      disPatch(setAuthuser(null));
      disPatch(setOtherUsers(null));
      disPatch(setMessages(null));
      disPatch(setSelectedUser(null));
      
      toast.success("Logout successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(()=>{console.log("users",users)},[oUser])
  useEffect(() => {
    setUsers(oUser);  // Set initial users
  }, [oUser]);

  // filter users .......................................
  const FiterUsers = (e) =>{
    setUsers(oUser?.filter(userFilter => userFilter.username.toLowerCase().includes(e.target.value)));
  }
  
  console.log(users)
  return (
    <div className="main_sidebar_container  p-2 " style={{ height: "100%",width:'30%' }}>
      {/* <div className="container">  */}
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search..."
            aria-label="Search"
            onChange={FiterUsers}
          />
         
        </form>
  

      <div className=" mt-3 "  style={{ height: "60%" }}>
        <Users fUsers={users}/>
            <div className="continer logout_container">
              <button
                type="button"
                className="btn btn-danger mt-2"
                onClick={logoutHandle}
              >
                Logout
              </button>
            </div>
      {/* <div className="border border-2 border-dark"> */}

      {/* user loggin profile ..................................................... */}
         <div
              className={`user_profile_box container d-flex border border-1 border-dark p-1 w-100 ` }
              // className={`d-flex border border-1 border-dark p-1 m-1 w-100 ${sUser?._id === user?._id ? 'bg-dark text-white':''}` }
              // key={}
              // onClick={() => selectedUserHandle(user)}
            >
              <div className="  border-dark rounded-circle rounded-5 w-25 ">
                <img src={aUser?.profilePhoto} className="w-100 " />
              </div>

              <div className="w-100">
                <p className="text-left mx-1">{aUser?.username}</p>
              </div>
            </div>
      {/* </div> */}
      </div>
    </div>
  );
};

export default Sidebar;

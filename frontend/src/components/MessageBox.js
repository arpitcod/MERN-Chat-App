import React from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { useSelector } from "react-redux";
import { authUser, onlineUsers, selectedUser } from "../redux/userSlice";
import "./css/Messagebox.css"
const MessageBox = () => {
  const sUser = useSelector(selectedUser);
  const oUser = useSelector(onlineUsers);
  const aUser = useSelector(authUser);

  const isOnline = oUser?.includes(sUser?._id);
  console.log("isonline",isOnline)
  console.log("online user",oUser)
  // if (!sUser) return <p>Wwelcome to chat app</p>
  return (
    <> 
   
   <div className="main_message_box_container border border-1 border-success w-100 mx-3 p-3"  >
         {
           sUser === null ? (
            <h1 className=" welcome_title border border-1 border-success mx-3 ">Welcome to chat app</h1>
           ) : (
            <>
            <div className="selected_profile_container d-flex container  text-white p" >
              <div className="selected_profile_box p-1  d-flex " style={{width:"100%"}}>
                <div className="  overflow-hidden mx-1 position-relative"style={{width:"50px"}}>
                  <img src={sUser?.profilePhoto} className={`w-100 ${isOnline ? 'rounded-circle rounded-5 border border-5 border-success' :""}`} />
                  {/* <div className="">online</div> */}
                </div>
                <span className=" container selected_profile_name " >
                  <p className="">{sUser?.username}</p>
                  {/* <p className="">{sUser.username}</p> */}
                 
                 
                </span>
              </div>
            </div>
            <Messages />
            <MessageInput />
            </>
           )
         }
          </div>

   
       
    
    </>
  );
};

export default MessageBox;

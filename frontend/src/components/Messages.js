import React, { useEffect, useRef } from "react";

import useGetRealTimeMessages from "../hooks/useGetRealTimeMessages";
import { useSelector } from "react-redux";
import { messages } from "../redux/messageSlice";
import { authUser } from "../redux/userSlice";
import useGetMessages from "../hooks/useGetmessages";
import "./css/Messages.css"
const Messages = () => {
  useGetRealTimeMessages();
  useGetMessages();
  
  const mUser = useSelector(messages);
  const aUser = useSelector(authUser);
  
  const scroll = useRef();
  
  useEffect(() => {
    if (scroll?.current) {
      scroll.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [mUser]);

  
 // Filter messages for the authenticated user
//  const filteredMessages = mUser?.filter(message => message?.receiverId === aUser?._id || message?.senderId === aUser?._id);

  console.log("message user ", mUser);
  console.log("auth user", aUser);

  if (!mUser || mUser.length === 0) return <p className="text-center d-flex justify-content-center align-items-center" style={{ height: "73%" }}>No messages</p>;
  // if (!filteredMessages || filteredMessages?.length === 0) return <p className="text-center d-flex justify-content-center align-items-center" style={{ height: "73%" }}>No messages</p>;
  return (
    <div className="messages_box container d-flex flex-column my-2 overflow-auto border border-1 border-success" style={{ height: "73%" }}>
      
      
      {mUser&&mUser?.map((message) => (
        <div key={message?._id} >
          <span
            className={`col badge text-bg-secondary my-1 p-2 fs-6 ${aUser?._id === message?.senderId ? 'float-end' : 'float-start'}`}
          >
            {message?.message}
          </span>
        </div>
      ))}
      <div ref={scroll} />
    </div>
  );
};

export default Messages;

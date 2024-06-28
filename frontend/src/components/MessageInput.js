import React, { useEffect, useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import axios from "axios";
import { selectedUser, setSelectedUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {  messages, setMessages} from '../redux/messageSlice'
import useGetmessages from "../hooks/useGetmessages";
import useGetRealTimeMessages from "../hooks/useGetRealTimeMessages";

const MessageInput = () => {
  useGetmessages();
  useGetRealTimeMessages();
  const [message, setInputMessages] = useState("");
  const sUser = useSelector(selectedUser);
  const mUser= useSelector(messages);
  const disPatch = useDispatch();

  const submitHandle = async (e) => {
    e.preventDefault();
    // console.log(inputMessage);
    try {
      axios.defaults.withCredentials = true;
      await axios.post(`http://localhost:2914/api/message/send-message/${sUser?._id}`,{message})
        .then(response => {
          if (response?.data?.success) {
            // alert("success")
            disPatch(setMessages([...mUser,response?.data?.newMessage]))
            console.log("send message", response.data.newMessage);
            console.log("send message", response);
            // disPatch(setMessages([...mUser,response?.data?.newMessage]))
            setInputMessages('')
            
          }
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
useEffect(()=>{},[mUser])
  return (
    <>
      <form onSubmit={submitHandle}>
        <div className="container mb-3 d-flex px-3 w-100"style={{ height: "10%" }}>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="send message...."
            value={message}
            onChange={(e) => setInputMessages(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary mx-1 rounded rounded-5 "
          >
            <IoSendSharp />
          </button>
        </div>
      </form>
    </>
  );
};

export default MessageInput;

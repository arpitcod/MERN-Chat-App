import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { messages, setMessages } from '../redux/messageSlice';
import { socketUser } from '../redux/socketSlice';

const useGetRealTimeMessages = () => {
  const mUser = useSelector(messages);
  const socketUsers = useSelector(socketUser);
  const dispatch = useDispatch();

  useEffect(() => {
    // const handleNewMessage = (newMessages) => {
      socketUsers?.on("newMessage",(newMessage) =>{

        dispatch(setMessages([...mUser, newMessage]));
        console.log("usegetrealtimemessages",newMessage)
      });
    // };
      
    return () => socketUsers?.off('newMessage');
    
    
  },[mUser, setMessages]);

}; 

export default useGetRealTimeMessages;

import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectedUser } from '../redux/userSlice'
import { messages, setMessages } from '../redux/messageSlice'

const useGetMessages = () => {
    const sUser= useSelector(selectedUser);
    // const mUser= useSelector(messages);
    // const mUser= useSelector(message);
    const disPatch =useDispatch();
    useEffect(()=>{
        const getMessages = async () =>{
            try {
                axios.defaults.withCredentials = true;
                await axios.get(`http://localhost:2914/api/message/${sUser?._id}`)
                .then(response =>{
                    disPatch(setMessages(response?.data))
                    console.log('get messages',response?.data)
                    // console.log('get messages',response)
                }).catch(err =>{
                    console.log(err)
                })
            } catch (error) {
                console.log(error)
            }
        }
        getMessages();
    },[sUser?._id,setMessages])
    // },[sUser])
}

export default useGetMessages;

import './App.css';
import { Routes,Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { toast } from 'react-toastify';
import HomePage from './components/HomePage';
import Header from './layout/Header';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authUser, setOnlineUsers } from './redux/userSlice';
import io from 'socket.io-client'
import { setSocketUser, socketUser } from './redux/socketSlice';

function App () {
  // const [socket,setSocket] = useState(null);
  const aUser = useSelector(authUser);
  // const socketUsers = useSelector(socketUser);
  
  const disPatch = useDispatch();


  useEffect(()=>{
    if (aUser) {
      const newSocket = io('http://localhost:2914',{
          query:{
            userId:aUser._id
          }
      });
    // setSocket(newSocket);
    disPatch(setSocketUser(newSocket)); 
    console.log('new socket',newSocket)
    // console.log('socket users',socketUsers)
    
    newSocket?.on('getOnlineUsers', (onlineUsers)=>{
      disPatch(setOnlineUsers(onlineUsers))
      console.log('online users',onlineUsers);
    })

    return () => newSocket.close();

    }
    else{
      if (aUser) {
         aUser.close();
         disPatch(setSocketUser(null));
      }
    }
  },[aUser])
  // console.log(aUser)
  // toast.success("hare krishna")
  return (
   <>
       <Header/>
       {/* <HomePage/> */}
       <Routes>
         <Route path='/' element={<HomePage/>}/>
         <Route path='/login' element={<LoginPage/>}/>
         <Route path='/register' element={<RegisterPage/>}/>
       </Routes>
   </>
  );
}

export default App;

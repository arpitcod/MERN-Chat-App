import { createSlice } from "@reduxjs/toolkit";
// import { set } from 'mongoose';

const userSlice = createSlice({
  name: "User",
  initialState: {
    authUser: null,
    otherUser: null,
    selectedUser:null,
    onlineUsers:null
  },

  reducers: {
    setAuthuser: (state, action) => {
      state.authUser = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUser = action.payload;
    },
    setSelectedUser: (state,action) =>{
      state.selectedUser = action.payload
    },
    setOnlineUsers:(state,action) =>{
      state.onlineUsers = action.payload
    }
  },
});
export const  {setAuthuser, setOtherUsers,setSelectedUser,setOnlineUsers } = userSlice.actions;
export default userSlice.reducer;
export const authUser = (state) => state.User.authUser;
export const otherUser = (state) => state.User.otherUser;
export const selectedUser = (state) => state.User.selectedUser;
export const onlineUsers = (state) => state.User.onlineUsers;

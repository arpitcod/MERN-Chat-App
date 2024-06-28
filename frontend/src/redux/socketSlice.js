import { createSlice } from "@reduxjs/toolkit";


const socketSlice = createSlice({
    name:"socket",
    initialState:{

        socketUser:null,
    },
    reducers:{
        setSocketUser:(state,action) =>{
            state.socketUser = action.payload;
        }
    }
})

export const {setSocketUser} = socketSlice.actions;
export const socketUser = (state) => state.socket.socketUser; 
export default socketSlice.reducer;
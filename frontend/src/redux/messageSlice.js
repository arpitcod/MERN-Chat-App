import { createSlice } from "@reduxjs/toolkit";


const messageSlice = createSlice({
    name:"Message",
    initialState:{
        messages:[],
    },
    reducers:{
        setMessages:(state,action) =>{
            state.messages = action.payload;
        }
    }
})

export const {setMessages} = messageSlice.actions;
export const messages = (state) => state.Message.messages;
export default messageSlice.reducer;
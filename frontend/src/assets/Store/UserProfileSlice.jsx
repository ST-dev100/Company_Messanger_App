import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    user: null,
    checked:false,
    showPopup:false,
    count:0,
    deltedMessages:[]
  };
const userProfileSlice = createSlice({
    name:'userProfile',
    initialState,
    reducers:{
        setUser: (state, action) => {
            state.user = action.payload;
          },
          onandoffChecked: (state,action)=>{
            state.checked = true
          },
          increamentCount:(state,action)=>{
            state.count++
          },
          dicreamentCount:(state,action)=>{
            state.count--
          },
          deleteAlert:(state,action)=>
          {
            state.showPopup = true
          },
          cancelAlert:(state,action)=>
          {
            state.showPopup = false
            state.checked = false
            state.deltedMessages = []
          },
          clearCancel: (state,action)=>{
            state.checked = false
            state.showPopup = false
            state.count = 0
            state.deltedMessages = []

          },
          DeleteMessagesList:(state,action)=>{
            state.deltedMessages.push(action.payload)
          },
          removeDeleteMessagesList:(state,action)=>{
            state.deltedMessages = state.deltedMessages.filter(e=>e.id !== action.payload.id) 
          }
    }
})  

export const { setUser,onandoffChecked,deleteAlert,cancelAlert,clearCancel,increamentCount,dicreamentCount,DeleteMessagesList,removeDeleteMessagesList} = userProfileSlice.actions;
export default userProfileSlice.reducer;
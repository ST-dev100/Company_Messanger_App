import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    user: null,
    checked:false,
    showPopup:false
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
          deleteAlert:(state,action)=>
          {
            state.showPopup = true
          },
          cancelAlert:(state,action)=>
          {
            state.showPopup = false
          },
          clearCancel: (state,action)=>{
            state.checked = false
            state.showPopup = false

          }
    }
})  

export const { setUser,onandoffChecked,deleteAlert,cancelAlert,clearCancel} = userProfileSlice.actions;
export default userProfileSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    user: null
  };
const userProfileSlice = createSlice({
    name:'userProfile',
    initialState,
    reducers:{
        setUser: (state, action) => {
            state.user = action.payload;
          },
    }
})  

export const { setUser } = userProfileSlice.actions;
export default userProfileSlice.reducer;
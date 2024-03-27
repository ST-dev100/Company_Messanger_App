import { createSlice } from '@reduxjs/toolkit';

const AlterMessages = createSlice({
    name:'turnonoff',
    initialState: {
        turn:false,
      },
      reducers:{
        switchedOn:(state)=>{
           state.turn = true
        }
      }
})
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { useQuery,useMutation,gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import {client} from '../../App'

const GET_Employee = gql`
  query getEmployee {
    employee {
      userName
      occupation
      id
      data
    }
  }
`;
export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const { data } = await client.query({
    query: GET_Employee,
  });
  
  return data.employee;
});

const initialState = {
    ProfileUser:{
      employee: [], 
      status: false, 
      error: null,
    },
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
    },
    extraReducers: (builder) => {
       builder.addCase(fetchEmployees.pending, (state) => 
                  { 
                    console.log("pending")
                    state.ProfileUser.status = true; 
                  }) 
               .addCase(fetchEmployees.fulfilled, (state, action) => 
                  { 
                    console.log("data")
                    state.ProfileUser.status = false; 
                    state.ProfileUser.employee = action.payload; 
                  }) 
               .addCase(fetchEmployees.rejected, (state, action) => 
                  { 
                    console.log("error")
                    state.ProfileUser.status = false; 
                    state.ProfileUser.error = action.error.message; 
                  }); 
                },
})  

export const { setUser,onandoffChecked,deleteAlert,cancelAlert,clearCancel,increamentCount,dicreamentCount,DeleteMessagesList,removeDeleteMessagesList} = userProfileSlice.actions;
export default userProfileSlice.reducer;
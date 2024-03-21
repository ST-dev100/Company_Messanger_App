import { createSlice } from '@reduxjs/toolkit';

const DisplayMessageSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
  },
  reducers: {
    addPost(state, action) {
      if(Array.isArray(action.payload)){
        state.posts = action.payload
      return
      }
      state.posts.push(action.payload);
    },
  },
});

export const { addPost } = DisplayMessageSlice.actions;
export default DisplayMessageSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './RootReducer';

const store = configureStore({
  reducer: rootReducer,
});

export {store};

// import { configureStore } from '@reduxjs/toolkit';
// import UserProfileReducer from './UserProfileSlice';

// export const store = configureStore({
//   reducer: {
//     user: UserProfileReducer
//   }
// });

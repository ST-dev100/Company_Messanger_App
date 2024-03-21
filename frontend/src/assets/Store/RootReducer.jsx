import { combineReducers } from 'redux';
import DisplayMessageSlice from './DisplayMessageSlice';
import userProfileSlice from './UserProfileSlice';

const RootReducer = combineReducers({
  user: userProfileSlice,
  messages:DisplayMessageSlice,
});

export default RootReducer;

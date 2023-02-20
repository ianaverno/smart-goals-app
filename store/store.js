import { configureStore } from '@reduxjs/toolkit';
import goalsReducer from '../features/Goals/goalsSlice'; 


export default configureStore({
  reducer: {
    goals: goalsReducer,
  }
})
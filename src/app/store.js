import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import errorReducer from '../features/error/errorSlice'

export default configureStore({
  reducer: {
      user: userReducer,
      error: errorReducer,
  },
})
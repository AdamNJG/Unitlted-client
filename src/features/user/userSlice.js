import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: "",
    role: "",
    validated: false,
  },
  reducers: {
    setUser: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.username = action.payload.username
      state.role = action.payload.role
      state.validated = action.payload.validated
    },
    setInvalid: (state) => {
      state.validated= false
    },
    clearUser: (state) => {
      state.username = ""
      state.role = ""
      state.validated = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setInvalid, clearUser} = userSlice.actions

export default userSlice.reducer
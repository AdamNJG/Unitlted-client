import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'errorAlert',
  initialState: {
    message: "",
    variant: "info",
    open: false,
  },
  reducers: {
    toggleAlert: (state) => {

      state.open ? state.open = false : state.open = true;
    },
    newErrorAlert: (state, action) => {
      
      state.message = action.payload.message
      if(action.payload.variant === "")
      {state.variant = "info"}
      else {
      state.variant = action.payload.variant}
      state.open = true;
    },
    clearErrorAlert: (state ) => {
      state.message = ""
      state.variant = "info"
      state.open = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { clearErrorAlert, newErrorAlert } = userSlice.actions

export default userSlice.reducer


// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit"

export const routePathSlice = createSlice({
  name: "routePath",
  initialState: {
    pathName: window?.location?.pathname ?? null
  },
  reducers: {
    routePathHandler: (state, action) => {
      state.pathName = action.payload ?? null
    }
  }
})

export const {
  routePathHandler
} = routePathSlice.actions

export default routePathSlice.reducer

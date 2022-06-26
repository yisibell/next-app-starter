import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type SiteState = {
  accessToken: string
}

const initialState: SiteState = {
  accessToken: '',
}

export const siteSlice = createSlice({
  name: 'site',
  initialState,
  // 普通同步操作
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAccessToken } = siteSlice.actions

export default siteSlice.reducer

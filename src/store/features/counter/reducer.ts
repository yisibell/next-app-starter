import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const mockFetchApi = (data = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 3000)
  })
}

const initialState = {
  value: 0,
}

// 异步 thunk
export const resetCountAsync = createAsyncThunk(
  'counter/reset',
  async (newCount: number) => {
    const res = await mockFetchApi(newCount)
    return res
  }
)

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // 普通同步操作
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
  },
  // 异步操作
  extraReducers: ({ addCase }) => {
    addCase(resetCountAsync.fulfilled, (state, action) => {
      state.value = action.payload as number
    })
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement } = counterSlice.actions

export default counterSlice.reducer

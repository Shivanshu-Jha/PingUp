import { createSlice } from '@reduxjs/toolkit'

const getInitial = () => {
  const stored = typeof window !== 'undefined' && localStorage.getItem('theme')
  if (stored) return stored
  const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: { value: getInitial() },
  reducers: {
    setTheme: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer

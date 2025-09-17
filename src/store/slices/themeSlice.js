import { createSlice } from '@reduxjs/toolkit';

// Get initial theme from localStorage or default to 'light'
const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      return savedTheme;
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

const initialState = {
  mode: getInitialTheme(),
  isTransitioning: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isTransitioning = true;
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('portfolio-theme', state.mode);
        // Apply theme to document
        document.documentElement.classList.toggle('dark', state.mode === 'dark');
      }
      
      // Reset transition state after animation
      setTimeout(() => {
        state.isTransitioning = false;
      }, 300);
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('portfolio-theme', action.payload);
        document.documentElement.classList.toggle('dark', action.payload === 'dark');
      }
    },
    initializeTheme: (state) => {
      if (typeof window !== 'undefined') {
        document.documentElement.classList.toggle('dark', state.mode === 'dark');
      }
    }
  },
});

export const { toggleTheme, setTheme, initializeTheme } = themeSlice.actions;
export default themeSlice.reducer;

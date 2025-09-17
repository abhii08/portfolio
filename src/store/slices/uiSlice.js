import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeSection: 'home',
  isMenuOpen: false,
  isLoading: false,
  scrollDirection: 'up',
  showScrollTop: false,
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveSection: (state, action) => {
      state.activeSection = action.payload;
    },
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setScrollDirection: (state, action) => {
      state.scrollDirection = action.payload;
    },
    setShowScrollTop: (state, action) => {
      state.showScrollTop = action.payload;
    },
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        type: action.payload.type || 'info',
        message: action.payload.message,
        duration: action.payload.duration || 5000,
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  setActiveSection,
  toggleMenu,
  closeMenu,
  setLoading,
  setScrollDirection,
  setShowScrollTop,
  addNotification,
  removeNotification,
  clearNotifications,
} = uiSlice.actions;

export default uiSlice.reducer;

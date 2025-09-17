import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './slices/themeSlice';
import uiSlice from './slices/uiSlice';
import contactSlice from './slices/contactSlice';

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    ui: uiSlice,
    contact: contactSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

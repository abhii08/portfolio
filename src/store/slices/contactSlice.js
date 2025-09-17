import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { submitContactForm } from '../../lib/supabase';

// Async thunk for sending contact form
export const sendContactForm = createAsyncThunk(
  'contact/sendForm',
  async (formData, { rejectWithValue }) => {
    try {
      const result = await submitContactForm(formData);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to send message');
      }

      return result.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  formData: {
    name: '',
    email: '',
    subject: '',
    message: '',
  },
  isSubmitting: false,
  submitStatus: null, // 'success', 'error', null
  submitMessage: '',
  errors: {},
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setFormErrors: (state, action) => {
      state.errors = action.payload;
    },
    clearForm: (state) => {
      state.formData = initialState.formData;
      state.errors = {};
      state.submitStatus = null;
      state.submitMessage = '';
    },
    clearSubmitStatus: (state) => {
      state.submitStatus = null;
      state.submitMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendContactForm.pending, (state) => {
        state.isSubmitting = true;
        state.submitStatus = null;
        state.submitMessage = '';
      })
      .addCase(sendContactForm.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.submitStatus = 'success';
        state.submitMessage = 'Message sent successfully! I\'ll get back to you soon.';
        state.formData = initialState.formData;
        state.errors = {};
      })
      .addCase(sendContactForm.rejected, (state, action) => {
        state.isSubmitting = false;
        state.submitStatus = 'error';
        state.submitMessage = action.payload || 'Failed to send message. Please try again.';
      });
  },
});

export const {
  updateFormData,
  setFormErrors,
  clearForm,
  clearSubmitStatus,
} = contactSlice.actions;

export default contactSlice.reducer;

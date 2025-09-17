// Advanced Resume Service using Supabase Storage
import { supabase } from './supabase';

// Upload resume to Supabase Storage
export const uploadResume = async (file) => {
  try {
    const { data, error } = await supabase.storage
      .from('portfolio-files')
      .upload('resume.pdf', file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error uploading resume:', error);
    return { success: false, error: error.message };
  }
};

// Get resume download URL
export const getResumeUrl = async () => {
  try {
    const { data } = supabase.storage
      .from('portfolio-files')
      .getPublicUrl('resume.pdf');

    return data.publicUrl;
  } catch (error) {
    console.error('Error getting resume URL:', error);
    return null;
  }
};

// Track resume downloads
export const trackResumeDownload = async () => {
  try {
    const { error } = await supabase
      .from('resume_downloads')
      .insert([
        {
          downloaded_at: new Date().toISOString(),
          user_agent: navigator.userAgent,
          ip_address: null,
          referrer: document.referrer || 'direct'
        }
      ]);

    if (error) {
      // Silently fail if table doesn't exist (same as other tracking)
      if (error.code !== 'PGRST205' && error.code !== '42P01') {
        console.error('Error tracking resume download:', error);
      }
    } else {
      console.log('✅ Resume download tracked successfully');
    }
  } catch (error) {
    // Silently fail for tracking - don't break resume download
    console.log('Resume download tracking failed (table may not exist):', error.message);
  }
};

// Enhanced resume download with tracking
export const downloadResumeWithTracking = async () => {
  try {
    // Track the download
    await trackResumeDownload();
    
    // Get the resume URL (use static file for now)
    const resumeUrl = '/resume.pdf';
    
    // Open resume in new tab
    window.open(resumeUrl, '_blank');
    
    return { success: true };
  } catch (error) {
    console.error('Error downloading resume:', error);
    return { success: false, error: error.message };
  }
};

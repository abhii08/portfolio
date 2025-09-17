import { createClient } from '@supabase/supabase-js'
import { sendContactNotificationEmail, sendHireMeNotificationEmail, sendSMSNotification } from './emailService'

const supabaseUrl = 'https://xbfbiegrvbfqksklrtik.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhiZmJpZWdydmJmcWtza2xydGlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxMDg0ODMsImV4cCI6MjA3MzY4NDQ4M30.5DLHzccRaOR-N64govcYkhzMVQ2y5Z8ZtJVe_rrLX14'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Contact form submission
export const submitContactForm = async (formData) => {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          submitted_at: new Date().toISOString(),
          status: 'new',
          notification_sent: false,
          user_agent: navigator.userAgent,
          ip_address: null // Will be populated by Supabase if available
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    // Send actual email notification to abhinavsharma392@gmail.com
    try {
      await sendContactNotificationEmail(formData);
      await sendSMSNotification(`New contact from ${formData.name} (${formData.email}): ${formData.subject}`);
    } catch (emailError) {
      console.error('Failed to send email/SMS notification:', emailError);
      // Don't fail the form submission if email fails
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return { success: false, error: error.message }
  }
}

// Analytics - track page views
export const trackPageView = async (page) => {
  try {
    const { data, error } = await supabase
      .from('analytics')
      .insert([
        {
          page,
          timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent,
          referrer: document.referrer || 'direct'
        }
      ])

    if (error) {
      // Silently fail if table doesn't exist - don't spam console
      if (error.code !== 'PGRST205') {
        console.error('Analytics error:', error)
      }
      return null
    }

    return data
  } catch (error) {
    // Silently fail for analytics - don't break the app
    return null
  }
}

// Track contact form views
export const trackContactFormView = async () => {
  try {
    const { error } = await supabase
      .from('analytics')
      .insert([
        {
          page: 'contact_form_view',
          timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent
        }
      ])
    
    if (error && error.code !== 'PGRST205') {
      console.error('Error tracking contact form view:', error)
    }
  } catch (error) {
    // Silently fail for analytics
  }
}

// Track "Hire Me Now" button clicks
export const trackHireMeClick = async () => {
  try {
    const { data, error } = await supabase
      .from('hire_me_clicks')
      .insert([
        {
          clicked_at: new Date().toISOString(),
          user_agent: navigator.userAgent,
          referrer: document.referrer || 'direct',
          page_url: window.location.href
        }
      ])
      .select()

    if (error) {
      if (error.code !== 'PGRST205') {
        console.error('Error tracking hire me click:', error)
      }
      return null
    }

    // Send actual email and SMS notifications
    try {
      await sendHireMeNotificationEmail();
      await sendSMSNotification('🎉 Great news! Someone clicked "Hire Me Now" on your portfolio!');
    } catch (emailError) {
      console.error('Failed to send hire me notification:', emailError);
      // Don't fail the tracking if email fails
    }

    return data
  } catch (error) {
    // Silently fail for tracking
    return null
  }
}

// Subscribe to real-time notifications
export const subscribeToNotifications = (callback) => {
  const channel = supabase
    .channel('portfolio-notifications')
    .on('postgres_changes', 
      { event: 'INSERT', schema: 'public', table: 'contact_submissions' },
      (payload) => {
        callback('new_contact', payload.new)
      }
    )
    .on('postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'hire_me_clicks' },
      (payload) => {
        callback('hire_me_click', payload.new)
      }
    )
    .subscribe()

  return channel
}

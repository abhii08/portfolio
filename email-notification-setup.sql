-- Email/SMS Notification Setup using Supabase Edge Functions
-- This will send actual emails and SMS to your phone

-- First, let's create a webhook function that will be triggered
-- You'll need to create this as a Supabase Edge Function

-- 1. Create a webhook table to log notification attempts
CREATE TABLE IF NOT EXISTS notification_logs (
  id BIGSERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL, -- 'email' or 'sms'
  recipient VARCHAR(255) NOT NULL,
  subject VARCHAR(500),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'sent', 'failed'
  sent_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create a function to send email notifications
CREATE OR REPLACE FUNCTION send_email_notification(
  p_to_email TEXT,
  p_subject TEXT,
  p_message TEXT
) RETURNS void AS $$
BEGIN
  -- Log the notification attempt
  INSERT INTO notification_logs (type, recipient, subject, message, status)
  VALUES ('email', p_to_email, p_subject, p_message, 'pending');
  
  -- This will be handled by the Edge Function
  -- For now, we'll use pg_notify to trigger the webhook
  PERFORM pg_notify('send_email', json_build_object(
    'to', p_to_email,
    'subject', p_subject,
    'message', p_message
  )::text);
END;
$$ LANGUAGE plpgsql;

-- 3. Create a function to send SMS notifications
CREATE OR REPLACE FUNCTION send_sms_notification(
  p_to_phone TEXT,
  p_message TEXT
) RETURNS void AS $$
BEGIN
  -- Log the notification attempt
  INSERT INTO notification_logs (type, recipient, message, status)
  VALUES ('sms', p_to_phone, p_message, 'pending');
  
  -- This will be handled by the Edge Function
  PERFORM pg_notify('send_sms', json_build_object(
    'to', p_to_phone,
    'message', p_message
  )::text);
END;
$$ LANGUAGE plpgsql;

-- 4. Update the contact notification trigger to send actual emails
CREATE OR REPLACE FUNCTION notify_new_contact()
RETURNS TRIGGER AS $$
DECLARE
  notification_email VARCHAR(255) := 'abhinavsharma392@gmail.com';
  notification_phone VARCHAR(20) := '+919664309440';
  email_subject TEXT;
  email_message TEXT;
  sms_message TEXT;
BEGIN
  -- Prepare email content
  email_subject := 'New Contact Form Submission - ' || NEW.subject;
  email_message := 'You have received a new contact form submission on your portfolio:

Name: ' || NEW.name || '
Email: ' || NEW.email || '
Subject: ' || NEW.subject || '
Message: ' || NEW.message || '

Submitted at: ' || NEW.submitted_at || '

You can reply directly to this email or contact them at: ' || NEW.email;

  -- Prepare SMS content
  sms_message := 'New portfolio contact from ' || NEW.name || ' (' || NEW.email || '). Subject: ' || NEW.subject;

  -- Send email notification
  PERFORM send_email_notification(notification_email, email_subject, email_message);
  
  -- Send SMS notification
  PERFORM send_sms_notification(notification_phone, sms_message);

  -- Send real-time notification via Supabase Realtime (for in-app notifications)
  PERFORM pg_notify(
    'new_contact_submission',
    json_build_object(
      'id', NEW.id,
      'name', NEW.name,
      'email', NEW.email,
      'subject', NEW.subject,
      'message', NEW.message,
      'submitted_at', NEW.submitted_at,
      'notification_email', notification_email,
      'notification_phone', notification_phone
    )::text
  );

  -- Mark notification as sent
  NEW.notification_sent = true;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5. Update the hire me click notification trigger
CREATE OR REPLACE FUNCTION notify_hire_me_click()
RETURNS TRIGGER AS $$
DECLARE
  notification_email VARCHAR(255) := 'abhinavsharma392@gmail.com';
  notification_phone VARCHAR(20) := '+919664309440';
  email_subject TEXT := 'Someone Clicked "Hire Me Now" on Your Portfolio!';
  email_message TEXT;
  sms_message TEXT := 'Great news! Someone clicked "Hire Me Now" on your portfolio. Check your dashboard for details.';
BEGIN
  -- Prepare email content
  email_message := 'Exciting news! Someone clicked the "Hire Me Now" button on your portfolio.

Details:
- Clicked at: ' || NEW.clicked_at || '
- Page URL: ' || COALESCE(NEW.page_url, 'Not available') || '
- Referrer: ' || COALESCE(NEW.referrer, 'Direct visit') || '
- User Agent: ' || COALESCE(NEW.user_agent, 'Not available') || '

This indicates strong interest in your services. You may want to follow up or be prepared for potential contact.

Best regards,
Your Portfolio Notification System';

  -- Send email notification
  PERFORM send_email_notification(notification_email, email_subject, email_message);
  
  -- Send SMS notification
  PERFORM send_sms_notification(notification_phone, sms_message);

  -- Send real-time notification
  PERFORM pg_notify(
    'hire_me_clicked',
    json_build_object(
      'id', NEW.id,
      'clicked_at', NEW.clicked_at,
      'user_agent', NEW.user_agent,
      'ip_address', NEW.ip_address,
      'referrer', NEW.referrer,
      'page_url', NEW.page_url,
      'notification_email', notification_email,
      'notification_phone', notification_phone,
      'message', 'Someone clicked "Hire Me Now" on your portfolio!'
    )::text
  );

  -- Mark notification as sent
  NEW.notification_sent = true;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. Grant permissions on notification_logs
GRANT ALL ON notification_logs TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

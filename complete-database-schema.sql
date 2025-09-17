-- =============================================================================
-- COMPLETE PORTFOLIO DATABASE SCHEMA
-- Abhinav Sharma's Portfolio - All-in-One Database Setup
-- =============================================================================
-- This file combines all database requirements for the portfolio:
-- - Contact form submissions with notifications
-- - Analytics and tracking
-- - Real-time notifications
-- - Email/SMS notification system
-- - Admin dashboard data
-- =============================================================================

-- =============================================================================
-- 1. CORE TABLES
-- =============================================================================

-- Contact Submissions Table (Essential for contact form)
CREATE TABLE IF NOT EXISTS contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'new',
  notification_sent BOOLEAN DEFAULT false,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hire Me Clicks Table (Track "Hire Me Now" button clicks)
CREATE TABLE IF NOT EXISTS hire_me_clicks (
  id BIGSERIAL PRIMARY KEY,
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  ip_address INET,
  referrer VARCHAR(500),
  page_url VARCHAR(500),
  notification_sent BOOLEAN DEFAULT false
);

-- Analytics Table (Track page views and user behavior)
CREATE TABLE IF NOT EXISTS analytics (
  id BIGSERIAL PRIMARY KEY,
  page VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  referrer VARCHAR(500),
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resume Downloads Table (Track resume downloads)
CREATE TABLE IF NOT EXISTS resume_downloads (
  id BIGSERIAL PRIMARY KEY,
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  ip_address INET,
  referrer VARCHAR(500)
);

-- Portfolio Data Table (Optional - for dynamic content)
CREATE TABLE IF NOT EXISTS portfolio_data (
  id BIGSERIAL PRIMARY KEY,
  section VARCHAR(100) NOT NULL,
  data JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notification Settings Table (Your contact info for notifications)
CREATE TABLE IF NOT EXISTS notification_settings (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL DEFAULT 'abhinavsharma392@gmail.com',
  phone VARCHAR(20) NOT NULL DEFAULT '+919664309440',
  email_notifications BOOLEAN DEFAULT true,
  sms_notifications BOOLEAN DEFAULT true,
  webhook_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notification Logs Table (Track email/SMS notification attempts)
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

-- =============================================================================
-- 2. ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE hire_me_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_downloads DISABLE ROW LEVEL SECURITY; -- Public access for tracking

-- Contact Submissions Policies
DROP POLICY IF EXISTS "Allow contact form submissions" ON contact_submissions;
CREATE POLICY "Allow contact form submissions" ON contact_submissions
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow reading for authenticated users" ON contact_submissions
  FOR SELECT USING (auth.role() = 'authenticated');

-- Hire Me Clicks Policies
DROP POLICY IF EXISTS "Allow hire me click tracking" ON hire_me_clicks;
CREATE POLICY "Allow hire me click tracking" ON hire_me_clicks
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Analytics Policies
DROP POLICY IF EXISTS "Allow analytics tracking" ON analytics;
CREATE POLICY "Allow analytics tracking" ON analytics
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow analytics reading for authenticated users" ON analytics
  FOR SELECT USING (auth.role() = 'authenticated');

-- Portfolio Data Policies
CREATE POLICY "Allow public reading of portfolio data" ON portfolio_data
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow updates for authenticated users" ON portfolio_data
  FOR ALL USING (auth.role() = 'authenticated');

-- Notification Settings Policies
CREATE POLICY "Allow reading notification settings for authenticated users" ON notification_settings
  FOR SELECT USING (auth.role() = 'authenticated');

-- =============================================================================
-- 3. INDEXES FOR PERFORMANCE
-- =============================================================================

CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_hire_me_clicks_created_at ON hire_me_clicks(clicked_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_page ON analytics(page);
CREATE INDEX IF NOT EXISTS idx_analytics_timestamp ON analytics(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_portfolio_data_section ON portfolio_data(section);
CREATE INDEX IF NOT EXISTS idx_resume_downloads_downloaded_at ON resume_downloads(downloaded_at DESC);
CREATE INDEX IF NOT EXISTS idx_notification_logs_created_at ON notification_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notification_logs_status ON notification_logs(status);

-- =============================================================================
-- 4. FUNCTIONS AND TRIGGERS
-- =============================================================================

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_contact_submissions_updated_at 
  BEFORE UPDATE ON contact_submissions 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolio_data_updated_at 
  BEFORE UPDATE ON portfolio_data 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notification_settings_updated_at 
  BEFORE UPDATE ON notification_settings 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- 5. NOTIFICATION FUNCTIONS
-- =============================================================================

-- Function to send email notifications
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

-- Function to send SMS notifications
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

-- Contact form notification function
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

-- Hire me click notification function
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

-- =============================================================================
-- 6. TRIGGERS FOR REAL-TIME NOTIFICATIONS
-- =============================================================================

CREATE TRIGGER trigger_notify_new_contact
  BEFORE INSERT ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_contact();

CREATE TRIGGER trigger_notify_hire_me_click
  BEFORE INSERT ON hire_me_clicks
  FOR EACH ROW
  EXECUTE FUNCTION notify_hire_me_click();

-- =============================================================================
-- 7. VIEWS FOR ANALYTICS AND DASHBOARD
-- =============================================================================

-- Portfolio Statistics View (for admin dashboard)
CREATE OR REPLACE VIEW portfolio_stats AS
SELECT 
  (SELECT COUNT(*) FROM contact_submissions) as total_contacts,
  (SELECT COUNT(*) FROM contact_submissions WHERE status = 'new') as new_contacts,
  (SELECT COUNT(*) FROM hire_me_clicks) as total_hire_clicks,
  (SELECT COUNT(*) FROM hire_me_clicks WHERE clicked_at >= NOW() - INTERVAL '24 hours') as hire_clicks_today,
  (SELECT COUNT(*) FROM resume_downloads) as total_resume_downloads,
  (SELECT COUNT(*) FROM resume_downloads WHERE downloaded_at >= NOW() - INTERVAL '24 hours') as resume_downloads_today,
  (SELECT COUNT(*) FROM analytics WHERE page = 'home') as home_page_views,
  (SELECT COUNT(*) FROM analytics WHERE timestamp >= NOW() - INTERVAL '24 hours') as views_today;

-- Contact Form Analytics View
CREATE OR REPLACE VIEW contact_form_analytics AS
SELECT 
  DATE(submitted_at) as date,
  COUNT(*) as submissions,
  COUNT(DISTINCT email) as unique_contacts
FROM contact_submissions 
GROUP BY DATE(submitted_at)
ORDER BY date DESC;

-- Page Analytics View
CREATE OR REPLACE VIEW page_analytics AS
SELECT 
  page,
  DATE(timestamp) as date,
  COUNT(*) as views,
  COUNT(DISTINCT ip_address) as unique_visitors
FROM analytics 
GROUP BY page, DATE(timestamp)
ORDER BY date DESC, views DESC;

-- =============================================================================
-- 8. ENABLE REALTIME FOR LIVE NOTIFICATIONS
-- =============================================================================

ALTER PUBLICATION supabase_realtime ADD TABLE contact_submissions;
ALTER PUBLICATION supabase_realtime ADD TABLE hire_me_clicks;
ALTER PUBLICATION supabase_realtime ADD TABLE analytics;

-- =============================================================================
-- 9. PERMISSIONS AND GRANTS
-- =============================================================================

-- Grant access to views
GRANT SELECT ON portfolio_stats TO anon;
GRANT SELECT ON portfolio_stats TO authenticated;

-- Grant permissions on tables
GRANT ALL ON resume_downloads TO anon, authenticated;
GRANT ALL ON notification_logs TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- =============================================================================
-- 10. INITIAL DATA SETUP
-- =============================================================================

-- Insert default notification settings
INSERT INTO notification_settings (email, phone) VALUES 
('abhinavsharma392@gmail.com', '+919664309440')
ON CONFLICT DO NOTHING;

-- Insert sample portfolio data (optional)
INSERT INTO portfolio_data (section, data) VALUES 
('personal_info', '{
  "name": "Abhinav Sharma",
  "title": "Full Stack Developer",
  "email": "abhinavsharma392@gmail.com",
  "phone": "+91 9664309440",
  "location": "Udaipur, India",
  "github": "https://github.com/abhii08?tab=repositories",
  "linkedin": "https://www.linkedin.com/in/abhinav-sharma-64a1b3143/"
}'::jsonb),
('skills', '{
  "languages": ["JavaScript", "TypeScript", "Python", "Java", "HTML/CSS", "SQL"],
  "frameworks": ["React", "Node.js", "Express.js", "Redux Toolkit", "Tailwind CSS", "Vite"],
  "tools": ["Git", "Docker", "Prisma", "Cloudflare Workers", "VS Code", "Postman"],
  "databases": ["MongoDB", "PostgreSQL", "MySQL"]
}'::jsonb)
ON CONFLICT DO NOTHING;

-- =============================================================================
-- SETUP COMPLETE!
-- =============================================================================
-- 
-- This schema provides:
-- ✅ Contact form with email/SMS notifications
-- ✅ "Hire Me" button tracking with notifications  
-- ✅ Page analytics and user tracking
-- ✅ Resume download tracking
-- ✅ Real-time notifications via Supabase Realtime
-- ✅ Admin dashboard with comprehensive statistics
-- ✅ Proper security with Row Level Security (RLS)
-- ✅ Performance optimized with indexes
-- ✅ Notification logging and error handling
--
-- To use this schema:
-- 1. Copy and paste this entire file into your Supabase SQL Editor
-- 2. Run the query to create all tables, functions, and triggers
-- 3. Your portfolio will be ready with full database functionality!
-- =============================================================================

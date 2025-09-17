-- Portfolio Database Setup with Real-time Notifications
-- Copy and paste this into your Supabase SQL Editor

-- 1. Contact Submissions Table (Essential for contact form)
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
  user_agent TEXT
);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for contact form)
DROP POLICY IF EXISTS "Allow contact form submissions" ON contact_submissions;
CREATE POLICY "Allow contact form submissions" ON contact_submissions
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Allow reading for authenticated users (admin)
CREATE POLICY "Allow reading for authenticated users" ON contact_submissions
  FOR SELECT USING (auth.role() = 'authenticated');

-- 2. Hire Me Clicks Table (Track "Hire Me Now" button clicks)
CREATE TABLE IF NOT EXISTS hire_me_clicks (
  id BIGSERIAL PRIMARY KEY,
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  ip_address INET,
  referrer VARCHAR(500),
  page_url VARCHAR(500),
  notification_sent BOOLEAN DEFAULT false
);

-- Enable RLS
ALTER TABLE hire_me_clicks ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for tracking)
DROP POLICY IF EXISTS "Allow hire me click tracking" ON hire_me_clicks;
CREATE POLICY "Allow hire me click tracking" ON hire_me_clicks
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- 3. Analytics Table (Optional - for tracking)
CREATE TABLE IF NOT EXISTS analytics (
  id BIGSERIAL PRIMARY KEY,
  page VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  referrer VARCHAR(500),
  ip_address INET
);

-- Enable RLS
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for tracking)
DROP POLICY IF EXISTS "Allow analytics tracking" ON analytics;
CREATE POLICY "Allow analytics tracking" ON analytics
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- 4. Notification Settings Table (Your contact info for notifications)
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

-- Insert default notification settings
INSERT INTO notification_settings (email, phone) VALUES 
('abhinavsharma392@gmail.com', '+919664309440')
ON CONFLICT DO NOTHING;

-- Enable RLS
ALTER TABLE notification_settings ENABLE ROW LEVEL SECURITY;

-- Allow reading for authenticated users only
CREATE POLICY "Allow reading notification settings for authenticated users" ON notification_settings
  FOR SELECT USING (auth.role() = 'authenticated');

-- 5. Create Real-time Notification Function
CREATE OR REPLACE FUNCTION notify_new_contact()
RETURNS TRIGGER AS $$
DECLARE
  notification_email VARCHAR(255);
  notification_phone VARCHAR(20);
BEGIN
  -- Get notification settings
  SELECT email, phone INTO notification_email, notification_phone
  FROM notification_settings
  WHERE email_notifications = true
  LIMIT 1;

  -- Send real-time notification via Supabase Realtime
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

-- 6. Create Hire Me Click Notification Function
CREATE OR REPLACE FUNCTION notify_hire_me_click()
RETURNS TRIGGER AS $$
DECLARE
  notification_email VARCHAR(255);
  notification_phone VARCHAR(20);
BEGIN
  -- Get notification settings
  SELECT email, phone INTO notification_email, notification_phone
  FROM notification_settings
  WHERE email_notifications = true
  LIMIT 1;

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

-- 7. Create Triggers for Real-time Notifications
CREATE TRIGGER trigger_notify_new_contact
  BEFORE INSERT ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_contact();

CREATE TRIGGER trigger_notify_hire_me_click
  BEFORE INSERT ON hire_me_clicks
  FOR EACH ROW
  EXECUTE FUNCTION notify_hire_me_click();

-- 8. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_hire_me_clicks_created_at ON hire_me_clicks(clicked_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_timestamp ON analytics(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_page ON analytics(page);

-- 9. Enable Realtime for tables (for live notifications)
ALTER PUBLICATION supabase_realtime ADD TABLE contact_submissions;
ALTER PUBLICATION supabase_realtime ADD TABLE hire_me_clicks;
ALTER PUBLICATION supabase_realtime ADD TABLE analytics;

-- 10. Create a view for dashboard analytics
CREATE OR REPLACE VIEW portfolio_stats AS
SELECT 
  (SELECT COUNT(*) FROM contact_submissions) as total_contacts,
  (SELECT COUNT(*) FROM contact_submissions WHERE status = 'new') as new_contacts,
  (SELECT COUNT(*) FROM hire_me_clicks) as total_hire_clicks,
  (SELECT COUNT(*) FROM hire_me_clicks WHERE clicked_at >= NOW() - INTERVAL '24 hours') as hire_clicks_today,
  (SELECT COUNT(*) FROM analytics WHERE page = 'home') as home_page_views,
  (SELECT COUNT(*) FROM analytics WHERE timestamp >= NOW() - INTERVAL '24 hours') as views_today;

-- Grant access to the view
GRANT SELECT ON portfolio_stats TO anon;
GRANT SELECT ON portfolio_stats TO authenticated;

-- 11. Resume Downloads Table (Track resume downloads)
CREATE TABLE IF NOT EXISTS resume_downloads (
  id BIGSERIAL PRIMARY KEY,
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  ip_address INET,
  referrer VARCHAR(500)
);

-- Enable RLS and permissions for resume downloads
ALTER TABLE resume_downloads DISABLE ROW LEVEL SECURITY;
GRANT ALL ON resume_downloads TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Create index for resume downloads
CREATE INDEX IF NOT EXISTS idx_resume_downloads_downloaded_at ON resume_downloads(downloaded_at DESC);

-- Update portfolio stats view to include resume downloads
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

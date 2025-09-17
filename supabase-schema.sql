-- Supabase Schema for Abhinav's Portfolio
-- Run these commands in your Supabase SQL Editor

-- 1. Contact Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS (Row Level Security)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy to allow inserts from anyone (for contact form)
CREATE POLICY "Allow contact form submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Policy to allow reading only for authenticated users (for admin)
CREATE POLICY "Allow reading for authenticated users" ON contact_submissions
  FOR SELECT USING (auth.role() = 'authenticated');

-- 2. Analytics Table
CREATE TABLE IF NOT EXISTS analytics (
  id BIGSERIAL PRIMARY KEY,
  page VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  referrer VARCHAR(500),
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS for analytics
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Policy to allow inserts from anyone (for tracking)
CREATE POLICY "Allow analytics tracking" ON analytics
  FOR INSERT WITH CHECK (true);

-- Policy to allow reading only for authenticated users
CREATE POLICY "Allow analytics reading for authenticated users" ON analytics
  FOR SELECT USING (auth.role() = 'authenticated');

-- 3. Portfolio Data Table (Optional - for dynamic content)
CREATE TABLE IF NOT EXISTS portfolio_data (
  id BIGSERIAL PRIMARY KEY,
  section VARCHAR(100) NOT NULL,
  data JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS for portfolio data
ALTER TABLE portfolio_data ENABLE ROW LEVEL SECURITY;

-- Policy to allow reading for everyone (public portfolio data)
CREATE POLICY "Allow public reading of portfolio data" ON portfolio_data
  FOR SELECT USING (is_active = true);

-- Policy to allow updates only for authenticated users
CREATE POLICY "Allow updates for authenticated users" ON portfolio_data
  FOR ALL USING (auth.role() = 'authenticated');

-- 4. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_page ON analytics(page);
CREATE INDEX IF NOT EXISTS idx_analytics_timestamp ON analytics(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_portfolio_data_section ON portfolio_data(section);

-- 5. Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 6. Create triggers for updated_at
CREATE TRIGGER update_contact_submissions_updated_at 
  BEFORE UPDATE ON contact_submissions 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolio_data_updated_at 
  BEFORE UPDATE ON portfolio_data 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 7. Insert some sample portfolio data (optional)
INSERT INTO portfolio_data (section, data) VALUES 
('personal_info', '{
  "name": "Abhinav Sharma",
  "title": "Full Stack Developer",
  "email": "abhinavsharma392@gmail.com",
  "phone": "+91 9664309440",
  "location": "Udaipur, India",
  "github": "https://github.com/abhi108/rab-repositories",
  "linkedin": "https://linkedin.com/in/abhinav-sharma"
}'::jsonb),
('skills', '{
  "languages": ["JavaScript", "TypeScript", "Python", "Java"],
  "frameworks": ["React", "Node.js", "Express.js", "Redux Toolkit"],
  "tools": ["Git", "Docker", "VS Code", "Postman"],
  "databases": ["MongoDB", "PostgreSQL", "MySQL"]
}'::jsonb)
ON CONFLICT DO NOTHING;

-- 8. Create a view for contact form analytics
CREATE OR REPLACE VIEW contact_form_analytics AS
SELECT 
  DATE(submitted_at) as date,
  COUNT(*) as submissions,
  COUNT(DISTINCT email) as unique_contacts
FROM contact_submissions 
GROUP BY DATE(submitted_at)
ORDER BY date DESC;

-- 9. Create a view for page analytics
CREATE OR REPLACE VIEW page_analytics AS
SELECT 
  page,
  DATE(timestamp) as date,
  COUNT(*) as views,
  COUNT(DISTINCT ip_address) as unique_visitors
FROM analytics 
GROUP BY page, DATE(timestamp)
ORDER BY date DESC, views DESC;

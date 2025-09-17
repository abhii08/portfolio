# 🗄️ Database Setup Guide

This guide will help you set up the complete database schema for Abhinav Sharma's portfolio website.

## 📋 Overview

The portfolio uses **Supabase** as the backend database with the following features:
- ✅ Contact form submissions with email/SMS notifications
- ✅ "Hire Me" button click tracking
- ✅ Page analytics and user behavior tracking  
- ✅ Resume download tracking
- ✅ Real-time notifications
- ✅ Admin dashboard with comprehensive statistics
- ✅ Secure Row Level Security (RLS) policies

## 🚀 Quick Setup

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the project to be ready

### Step 2: Run Database Schema
1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Copy the entire contents of `complete-database-schema.sql`
4. Paste it into the SQL Editor
5. Click **Run** to execute the schema

### Step 3: Get Your Credentials
1. Go to **Settings** → **API**
2. Copy your:
   - **Project URL** (anon public URL)
   - **Anon Public Key**
3. Update these in your `src/lib/supabase.js` file

### Step 4: Test the Setup
1. Run your portfolio: `npm run dev`
2. Try submitting the contact form
3. Check your Supabase dashboard for the data

## 📊 Database Tables

| Table | Purpose | Features |
|-------|---------|----------|
| `contact_submissions` | Store contact form data | Email/SMS notifications, status tracking |
| `hire_me_clicks` | Track "Hire Me" button clicks | Real-time notifications |
| `analytics` | Page view tracking | User behavior analysis |
| `resume_downloads` | Track resume downloads | Download analytics |
| `portfolio_data` | Dynamic content storage | JSON-based flexible data |
| `notification_settings` | Your contact preferences | Email/SMS settings |
| `notification_logs` | Track notification attempts | Success/failure logging |

## 🔒 Security Features

- **Row Level Security (RLS)** enabled on all sensitive tables
- **Anonymous users** can only insert data (contact forms, analytics)
- **Authenticated users** can read data (for admin dashboard)
- **Public access** only for portfolio data and resume downloads

## 📈 Analytics & Views

The schema includes several pre-built views for analytics:

### `portfolio_stats`
```sql
SELECT * FROM portfolio_stats;
```
Returns: total contacts, new contacts, hire clicks, resume downloads, page views

### `contact_form_analytics`  
```sql
SELECT * FROM contact_form_analytics;
```
Returns: daily contact submissions and unique contacts

### `page_analytics`
```sql
SELECT * FROM page_analytics;  
```
Returns: page views by date and unique visitors

## 🔔 Notification System

The database automatically sends notifications when:
- ✉️ Someone submits the contact form → Email + SMS to you
- 🎯 Someone clicks "Hire Me Now" → Email + SMS to you
- 📱 Real-time notifications in your admin dashboard

### Notification Settings
Your contact information is stored in the `notification_settings` table:
- **Email**: abhinavsharma392@gmail.com
- **Phone**: +919664309440

## 🛠️ Customization

### Update Your Contact Info
```sql
UPDATE notification_settings 
SET email = 'your-email@example.com', 
    phone = '+1234567890'
WHERE id = 1;
```

### Disable SMS Notifications
```sql
UPDATE notification_settings 
SET sms_notifications = false 
WHERE id = 1;
```

### Add Custom Portfolio Data
```sql
INSERT INTO portfolio_data (section, data) VALUES 
('custom_section', '{"key": "value"}'::jsonb);
```

## 🔍 Monitoring

### Check Recent Contact Submissions
```sql
SELECT name, email, subject, submitted_at 
FROM contact_submissions 
ORDER BY submitted_at DESC 
LIMIT 10;
```

### View Notification Logs
```sql
SELECT type, recipient, status, created_at, error_message
FROM notification_logs 
ORDER BY created_at DESC 
LIMIT 20;
```

### Analytics Summary
```sql
SELECT 
  (SELECT COUNT(*) FROM contact_submissions) as total_contacts,
  (SELECT COUNT(*) FROM hire_me_clicks) as hire_clicks,
  (SELECT COUNT(*) FROM resume_downloads) as resume_downloads,
  (SELECT COUNT(*) FROM analytics) as page_views;
```

## 🚨 Troubleshooting

### Issue: Contact form not working
1. Check if `contact_submissions` table exists
2. Verify RLS policies allow anonymous inserts
3. Check browser console for errors

### Issue: Notifications not sending
1. Check `notification_logs` table for error messages
2. Verify your email/phone in `notification_settings`
3. Ensure triggers are properly created

### Issue: Analytics not tracking
1. Check if `analytics` table exists
2. Verify the `trackPageView` function is being called
3. Check browser network tab for failed requests

## 📞 Support

If you need help with the database setup:
1. Check the Supabase documentation
2. Review the SQL schema comments
3. Test individual functions in the SQL Editor

---

**🎉 That's it! Your portfolio database is now fully configured with all the features you need.**

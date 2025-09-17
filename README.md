# 🚀 Abhinav Sharma - Portfolio Website

> **🌐 Live Demo**: [https://portfolio-snowy-beta-24.vercel.app/](https://portfolio-snowy-beta-24.vercel.app/)

A modern, responsive portfolio website built with React 19, Redux Toolkit, and Tailwind CSS, showcasing my skills as a Full Stack Developer. Features real-time contact notifications, analytics tracking, and a comprehensive admin dashboard.

## ✨ Features

### 🎨 Frontend Features
- **Modern Design**: Clean, professional UI with smooth animations
- **🌓 Dark/Light Mode**: Toggle between themes with system preference detection
- **📱 Fully Responsive**: Perfect on all devices from mobile to desktop
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and builds
- **🎭 Smooth Animations**: Framer Motion powered micro-interactions
- **🔍 SEO Optimized**: Meta tags, Open Graph, and Twitter Cards ready

### 🗄️ Backend Features
- **📧 Contact Form**: Functional contact form with real-time email/SMS notifications
- **📊 Analytics Tracking**: Page views, user behavior, and interaction tracking
- **🎯 "Hire Me" Tracking**: Track button clicks with instant notifications
- **📄 Resume Downloads**: Track and analyze resume download statistics
- **🔔 Real-time Notifications**: Live updates via Supabase Realtime
- **🛡️ Secure Database**: Row Level Security (RLS) with Supabase
- **📈 Admin Dashboard**: Comprehensive statistics and analytics (coming soon)

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 with Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS with custom components
- **Animations**: Framer Motion
- **Icons**: React Icons (Feather Icons)
- **Form Handling**: Custom hooks with validation
- **Deployment**: Vercel

### Backend & Database
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime subscriptions
- **Email Service**: Formspree integration
- **Analytics**: Custom tracking with Supabase
- **Security**: Row Level Security (RLS) policies

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/abhii08/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Set up database** (Optional - for contact form and analytics)
   ```bash
   # Copy the database schema
   # Paste complete-database-schema.sql into your Supabase SQL Editor
   # Update your Supabase credentials in src/lib/supabase.js
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🗄️ Database Setup

This portfolio includes a complete database setup with Supabase for enhanced functionality:

1. **Create a Supabase project** at [supabase.com](https://supabase.com)
2. **Run the database schema**: Copy `complete-database-schema.sql` and paste it into your Supabase SQL Editor
3. **Update credentials**: Add your Supabase URL and API key to `src/lib/supabase.js`
4. **Test the setup**: Submit the contact form to verify everything works

**Database Features:**
- Contact form submissions with email notifications
- Page analytics and user tracking
- "Hire Me" button click tracking
- Resume download statistics
- Real-time notifications
- Admin dashboard data

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── admin/           # Admin dashboard components
│   │   ├── common/          # Reusable UI components
│   │   ├── layout/          # Layout components (Header, Footer)
│   │   └── sections/        # Page sections (Hero, About, etc.)
│   ├── store/               # Redux store and slices
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # External service integrations
│   ├── utils/               # Utility functions and animations
│   ├── constants/           # App constants
│   └── data/                # Portfolio data
├── public/                  # Static assets
├── complete-database-schema.sql  # Complete database setup
└── package.json
```

## 🎯 Sections

- **Hero**: Eye-catching introduction with animated typewriter effect
- **About**: Personal story and specialties
- **Experience**: Interactive timeline of work history
- **Projects**: Showcase of featured projects with live demos
- **Skills**: Interactive skill bars and technology cards
- **Contact**: Contact form and social media links

## 🎨 Customization

1. **Update Personal Info**: Edit `src/data/portfolioData.js`
2. **Add Projects**: Update the projects array in the data file
3. **Modify Colors**: Update `tailwind.config.js` and CSS variables
4. **Add Sections**: Create new components in `src/components/sections/`

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Optimized for all screen sizes

## 🌟 Performance Features

- Lazy loading for images
- Debounced scroll events
- Optimized animations
- Code splitting ready
- Efficient state management with Redux Toolkit
- Optimized database queries with indexes

## 🚀 Deployment

This portfolio is deployed on **Vercel** with automatic deployments from the main branch.

### Deploy Your Own

1. **Fork this repository**
2. **Connect to Vercel**: Import your forked repo to Vercel
3. **Set up Supabase**: Create your database using `complete-database-schema.sql`
4. **Update credentials**: Add your Supabase URL and API key
5. **Deploy**: Vercel will automatically build and deploy your portfolio

### Environment Variables

Create a `.env.local` file for local development:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📊 Analytics & Monitoring

The portfolio includes comprehensive analytics:

- **Page Views**: Track visitor behavior and popular sections
- **Contact Form**: Monitor form submissions and response rates
- **Hire Me Clicks**: Track interest in your services
- **Resume Downloads**: Monitor resume download statistics
- **Real-time Notifications**: Get instant alerts for new contacts

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Contact

- **Email**: [abhinavsharma392@gmail.com](mailto:abhinavsharma392@gmail.com)
- **Phone**: [+91 9664309440](tel:+919664309440)
- **GitHub**: [github.com/abhii08](https://github.com/abhii08?tab=repositories)
- **LinkedIn**: [linkedin.com/in/abhinav-sharma-64a1b3143](https://www.linkedin.com/in/abhinav-sharma-64a1b3143/)
- **Portfolio**: [https://portfolio-snowy-beta-24.vercel.app/](https://portfolio-snowy-beta-24.vercel.app/)

## 🌟 Show Your Support

If you like this portfolio, please give it a ⭐ on GitHub!

---

**Made with ❤️ by Abhinav Sharma** | **Full Stack Developer** | **React & Node.js Expert**

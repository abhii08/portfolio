// Portfolio Data for Abhinav Sharma
export const personalInfo = {
  name: "Abhinav Sharma",
  title: "Full Stack Developer",
  subtitle: "Building scalable web applications with modern technologies",
  email: "abhinavsharma392@gmail.com",
  phone: "+91 9664309440",
  location: "Udaipur, India",
  github: "https://github.com/abhii08?tab=repositories",
  linkedin: "https://www.linkedin.com/in/abhinav-sharma-64a1b3143/",
  resume: "/resume.pdf",
  profileImage: "/profile.jpg",
  tagline: "Passionate about creating efficient, scalable solutions that drive business growth",
  description: "Experienced Full Stack Developer with expertise in React, Node.js, and modern web technologies. Proven track record of delivering high-quality applications and collaborating effectively with cross-functional teams."
};

export const experience = [
  {
    id: 1,
    company: "Virtual Binz LLP",
    position: "Associate",
    duration: "Dec 2024 - Present",
    location: "Udaipur, India",
    type: "Full-time",
    description: "Collaborated with clients to gather requirements and delivered high-quality outputs with clear communication through calls and emails.",
    achievements: [
      "Prepared and shared detailed reports on client deliverables with reporting authorities",
      "Proactively addressed escalated concerns to ensure smooth workflow",
      "Analyzed data and identified actionable insights to implement solutions for client goals",
      "Leveraged prior experience in similar domains to achieve optimal results"
    ],
    technologies: ["React", "Node.js", "JavaScript", "MongoDB", "Express.js", "Git"]
  }
];

export const education = [
  {
    id: 1,
    institution: "Rajasthan Technical University",
    degree: "Bachelor of Technology",
    field: "Information Technology",
    duration: "May 2016 - Dec 2020",
    location: "Udaipur, India",
    grade: "First Class",
    description: "Comprehensive study in Information Technology covering theoretical foundations, system design, and practical programming skills essential for modern software development.",
    coursework: `THEORY: Introduction to Algorithms, Discrete Structures
Theory of Computation, Advanced Graph Theory, Cryptography
SYSTEMS: Operating Systems, Computer Organization and Architecture, Compilers, Database Management System, Computer Networks, Introduction to Electronics
OTHER: Programming & Data Structure, Software Engineering, Probability and Statistics, Linear Algebra.`
  }
];

export const projects = [
  {
    id: 1,
    title: "Gmail Clone",
    description: "A full-featured email application with secure authentication and comprehensive email functionality",
    longDescription: "Developed a complete Gmail clone using React frontend and Node.js/Express backend. Implemented JWT authentication with secure cookie-based session management, comprehensive email operations including compose, send, view, and delete functionalities. Designed responsive UI components using Tailwind CSS for seamless user experience across devices.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT", "Git", "Tailwind CSS"],
    features: [
      "JWT authentication with secure cookie-based session management",
      "Comprehensive email functionality (compose, send, view, delete)",
      "Responsive UI design with Tailwind CSS",
      "MongoDB integration with Mongoose ODM",
      "Real-time email updates"
    ],
    github: "https://github.com/abhii08/gmail-clone",
    demo: "",
    image: "/projects/gmail-clone.jpg",
    gif: "/projects/gmail-clone-demo.gif",
    status: "Completed",
    date: "Sept 2025",
    category: "Full Stack"
  },
  {
    id: 2,
    title: "YouTube Clone",
    description: "A responsive YouTube clone with advanced search functionality and video recommendations",
    longDescription: "Built a comprehensive YouTube clone using React and Redux Toolkit for state management. Integrated YouTube API for fetching real video content, channel information, and statistics. Implemented advanced search functionality with infinite scroll pagination and dynamic video player with embedded YouTube iframe.",
    technologies: ["React", "Redux Toolkit", "YouTube API", "Tailwind CSS", "Git"],
    features: [
      "YouTube API integration for real video content",
      "Advanced search functionality with infinite scroll",
      "Dynamic video player with embedded YouTube iframe",
      "Recommended videos sidebar",
      "Responsive design matching YouTube's modern interface",
      "Async thunks for efficient API calls",
      "Video duration parsing utilities"
    ],
    github: "https://github.com/abhii08/youtube-clone-react-redux",
    demo: "",
    image: "/projects/youtube-clone.jpg",
    gif: "/projects/youtube-clone-demo.gif",
    status: "Completed",
    date: "Aug 2025 - Sept 2025",
    category: "Frontend"
  },
  {
    id: 3,
    title: "Blinkit Clone",
    description: "A production-ready grocery delivery application with real-time tracking and dual authentication system",
    longDescription: "Developed a comprehensive grocery delivery application using React 19 frontend and Supabase backend infrastructure. Implemented dual authentication system with tab-based isolation preventing cross-contamination between user and delivery agent roles. Built comprehensive real-time delivery tracking system with Google Maps integration and live agent location updates.",
    technologies: ["React 19", "Redux Toolkit", "Supabase", "Google Maps API", "Tailwind CSS", "PostgreSQL"],
    features: [
      "Production-ready grocery delivery application with React 19",
      "Dual authentication system with tab-based isolation for users and delivery agents",
      "Real-time delivery tracking with Google Maps integration and live location updates",
      "Hybrid cart system supporting guest users (localStorage) and authenticated users (server-side)",
      "Responsive UI with 8+ pages including role selection, product catalog, and delivery dashboard",
      "Redux Toolkit with 7 specialized slices for efficient state management",
      "Automatic delivery agent assignment using Haversine formula for proximity calculations",
      "Advanced location services with Google Maps API for address management and delivery radius validation",
      "Comprehensive PostgreSQL database schema with 15+ tables and Row Level Security policies",
      "Optimistic UI updates, debounced search functionality, and real-time subscriptions"
    ],
    github: "https://github.com/abhii08/blinkit-clone-ai-react-redux",
    demo: "https://blinkitcloneaireactredux.vercel.app/",
    image: "/projects/blinkit-clone.jpg",
    gif: "/projects/blinkit-clone-demo.gif",
    status: "Completed",
    date: "Present",
    category: "Full Stack"
  }
];

export const skills = {
  languages: [
    { name: "JavaScript", level: 95, icon: "SiJavascript" },
    { name: "TypeScript", level: 90, icon: "SiTypescript" },
    { name: "HTML/CSS", level: 95, icon: "SiHtml5" },
    { name: "SQL", level: 85, icon: "SiPostgresql" }
  ],
  frameworks: [
    { name: "React", level: 95, icon: "SiReact" },
    { name: "Node.js", level: 90, icon: "SiNodedotjs" },
    { name: "Express.js", level: 85, icon: "SiExpress" },
    { name: "Hono", level: 80, icon: "SiCloudflare" },
    { name: "Redux Toolkit", level: 90, icon: "SiRedux" },
    { name: "Tailwind CSS", level: 95, icon: "SiTailwindcss" },
    { name: "Vite", level: 85, icon: "SiVite" }
  ],
  tools: [
    { name: "Git", level: 95, icon: "SiGit" },
    { name: "Docker", level: 80, icon: "SiDocker" },
    { name: "Prisma", level: 85, icon: "SiPrisma" },
    { name: "Cloudflare Workers", level: 80, icon: "SiCloudflare" },
    { name: "VS Code", level: 95, icon: "VscCode" },
    { name: "Postman", level: 90, icon: "SiPostman" }
  ],
  databases: [
    { name: "PostgreSQL", level: 85, icon: "SiPostgresql" },
    { name: "MongoDB", level: 85, icon: "SiMongodb" }
  ],
  libraries: [
    { name: "Axios", level: 90, icon: "SiAxios" },
    { name: "React Router", level: 90, icon: "SiReact" },
    { name: "React Icons", level: 85, icon: "SiReact" },
    { name: "JWT", level: 85, icon: "SiJsonwebtokens" },
    { name: "Mongoose", level: 85, icon: "SiMongodb" },
    { name: "Zod", level: 80, icon: "SiTypescript" }
  ]
};

export const achievements = [
  "Built 3+ full-stack applications with modern tech stack",
  "Implemented secure authentication systems with JWT",
  "Deployed applications on cloud platforms (Vercel, Cloudflare)",
  "Created reusable npm packages for shared functionality",
  "Optimized database queries for better performance"
];

export const testimonials = [
  {
    id: 1,
    name: "Client Name",
    position: "Position",
    company: "Company",
    content: "Abhinav delivered exceptional work on our project. His technical skills and attention to detail were impressive.",
    rating: 5,
    image: "/testimonials/client1.jpg"
  }
];

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/abhii08?tab=repositories",
    icon: "FaGithub"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/abhinav-sharma-64a1b3143/",
    icon: "FaLinkedin"
  },
  {
    name: "Email",
    url: "mailto:abhinavsharma392@gmail.com",
    icon: "FaEnvelope"
  },
  {
    name: "Phone",
    url: "tel:+919664309440",
    icon: "FaPhone"
  }
];

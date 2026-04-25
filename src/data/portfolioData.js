import resumeFile from '../assets/Selva_resume.pdf';

export const portfolioData = {
  hero: {
    name: "Selvaganesh",
    role: "Full Stack Developer",
    intro: "I build fast, beautiful, and accessible web applications. Always exploring the intersection of design and engineering.",
    resumeLink: resumeFile
  },
  about: {
    summary: `Junior MERN Stack Developer with hands-on experience in building scalable, secure, and high-performance web applications using React, Node.js, Express.js, and MongoDB. Skilled in developing RESTful APIs, implementing JWT authentication, and designing responsive, user-centric interfaces.

Experienced in delivering end-to-end solutions, including admin dashboards, payment integrations, and real-time features. Strong understanding of modern development practices, performance optimization, and clean code principles.

Focused on creating intuitive, visually appealing, and efficient applications that enhance user experience and meet business objectives. Continuously learning and adapting to new technologies to stay aligned with industry standards.`,
  },
  education: [
    {
      degree: "Value Added Course in MERN Stack Development",
      institution: "KGISL Micro College, Coimbatore",
      period: "Aug 2024 - Mar 2025",
      description: "Comprehensive training in MongoDB, Express.js, React.js, and Node.js for full-stack web development.",
    },
    {
      degree: "B.Sc in Computer Science",
      institution: "Karpagam Academy of Higher Education",
      period: "2020 - 2023",
      description: "Focused on software engineering, web architectures, and algorithms. Graduated with honors.",
    }
  ],
  experience: [
    {
      role: "MERN Stack Developer",
      company: "ATTS Technologies Pvt Ltd",
      period: "Jan,2025 - Dec,2026",
      description: "Developed and maintained scalable MERN stack applications for gold investment and chit management systems. Built secure REST APIs with JWT authentication and role-based access control (RBAC). Designed admin dashboards, real-time transaction modules, and order tracking features. Optimized MongoDB queries to improve performance and response time. Integrated Razorpay and Cashfree payment gateways for secure transactions. Managed end-to-end deployment using AWS EC2, S3, Vercel, and Render.",
    },
    {
      role: "MERN Stack Developer Intern",
      company: "ZIDIO Development",
      period: "Jan,2024-April,2024",
      description: "Developed and optimized React components for MERN-based applications, focusing on responsive design and performance. Integrated REST APIs and handled state management for dynamic data rendering. Improved UI efficiency by reducing re-renders and enhancing component structure. Collaborated in an Agile team environment using Git for version control and feature delivery.",
    },
  ],
  projects: [
    {
      id: "npay",
      title: "N-Pay – Gold & Chit Management Platform",
      problem: "Manual chit and gold investment tracking systems lacked transparency, scalability, and secure access control.",
      solution: "Engineered a scalable MERN-based platform to digitize chit fund and gold investment workflows, enabling customer onboarding, scheme management, payment tracking, and order processing. Implemented JWT-based authentication and role-based access control (RBAC) to enforce secure admin and user operations. Designed modular REST APIs for schemes, payments, gold orders, and shipment tracking with centralized error handling and validation. Optimized MongoDB schemas and queries to ensure high performance and data consistency. Integrated Razorpay for secure transactions and developed a responsive admin dashboard with reusable React components and Tailwind CSS, along with real-time delivery tracking features.",
      tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS", "Razorpay"],
      image: "https://selva-social.s3.us-east-1.amazonaws.com/project/ea78e78e-2a57-4d83-95c0-d948946d88b5.png",
      liveLink: "#",
      demoLink: "#"
    },
    {
      id: "Namma Cart",
      title: "Namma Cart – MERN E-Commerce Platform",
      problem: "E-commerce systems require secure authentication, scalable product handling, and smooth admin-user workflows.",
      solution: "Built a full-stack e-commerce platform supporting complete user and admin workflows, including product browsing, cart management, and checkout processing. Developed secure authentication using JWT and implemented RBAC for protected admin operations such as product, category, and user management. Designed and integrated RESTful APIs with optimized MongoDB schemas for efficient product and order handling. Integrated AWS S3 for scalable product image storage and Razorpay for seamless online payments. Created a responsive UI and dynamic admin dashboard using React and Tailwind CSS to manage inventory, featured products, and user activities efficiently.",
      tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS", "AWS S3", "Razorpay"],
      image: "https://selva-social.s3.us-east-1.amazonaws.com/project/ChatGPT+Image+Apr+24%2C+2026%2C+02_12_20+PM.png",
      liveLink: "https://ecommerce-frontend-kohl-delta.vercel.app/",
      demoLink: "https://ecommerce-frontend-kohl-delta.vercel.app/"
    },
    {
      id: "ainotebook",
      title: "AI Notebook – Full Stack Application",
      problem: "Users lack intelligent tools to enhance, summarize, and organize notes efficiently.",
      solution: "Developed a backend-driven AI-powered notebook application that allows users to generate, summarize, and enhance notes using an integrated LLM API. Built secure JWT-based authentication and protected REST APIs to ensure user data isolation and session security. Designed scalable CRUD operations with structured validation, centralized error handling, and optimized MongoDB schemas for efficient storage and retrieval. Integrated AI APIs to process user input and return context-aware outputs for note enhancement. Deployed frontend and backend independently and documented API workflows to demonstrate end-to-end system architecture and functionality.",
      tech: ["Node.js", "Express.js", "MongoDB", "JWT", "React", "AI API"],
      image: "https://selva-social.s3.us-east-1.amazonaws.com/project/ChatGPT+Image+Apr+24%2C+2026%2C+02_16_12+PM.png",
      liveLink: "https://ai-notebook-frontend-nine.vercel.app/",
      demoLink: "#"
    },
  ],
  contact: {
    email: "imselva1512@gmail.com",
    github: "https://github.com/iamselva3/",
    linkedin: "https://www.linkedin.com/in/selvaganesh3/",
    instagram: "https://www.instagram.com/iamselva3/",
    whatsapp: "919150888318"
  }
};

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
      solution: "Built a scalable MERN platform with JWT authentication, RBAC, payment integration, and real-time order tracking for gold purchases.",
      tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS", "Razorpay"],
      image: "https://selva-social.s3.us-east-1.amazonaws.com/project/ea78e78e-2a57-4d83-95c0-d948946d88b5.png",
      liveLink: "#",
      demoLink: "#"
    },
    {
      id: "Namma Cart",
      title: "Namma Cart – MERN E-Commerce Platform",
      problem: "E-commerce systems require secure authentication, scalable product handling, and smooth admin-user workflows.",
      solution: "Developed a full-stack e-commerce app with admin dashboard, AWS S3 image storage, Razorpay payments, and optimized REST APIs.",
      tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS", "AWS S3", "Razorpay"],
      image: "https://selva-social.s3.us-east-1.amazonaws.com/project/ChatGPT+Image+Apr+24%2C+2026%2C+02_12_20+PM.png",
      liveLink: "https://ecommerce-frontend-kohl-delta.vercel.app/",
      demoLink: "https://ecommerce-frontend-kohl-delta.vercel.app/"
    },
    {
      id: "ainotebook",
      title: "AI Notebook – Full Stack Application",
      problem: "Users lack intelligent tools to enhance, summarize, and organize notes efficiently.",
      solution: "Built a backend-focused AI notebook integrating an Open LLM for note generation and summarization with secure APIs and optimized schemas.",
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

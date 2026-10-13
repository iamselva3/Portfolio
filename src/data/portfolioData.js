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
      role: "Software Engineer",
      company: "United Nexa Tech",
      period: "May,2026 - Present",
      description: "Working as a Software Engineer building a production-grade MERN stack application end to end. Architected scalable REST APIs with Node.js and Express, implementing JWT authentication and role-based access control (RBAC) for secure, multi-role workflows. Designed and optimized MongoDB schemas and queries for performance and data consistency. Built a responsive, component-driven React frontend with reusable UI patterns and clean state management. Collaborated in an Agile team using Git for version control, code reviews, and continuous feature delivery, owning features from design through deployment.",
    },
    {
      role: "MERN Stack Developer",
      company: "ATTS Technologies Pvt Ltd",
      period: "Jan,2026 - Dec,2026",
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
      id: "ai-document-intelligence",
      title: "AI Document Intelligence System",
      category: "AI & Intelligence",
      tagline: "Autonomous document understanding, summarization & insight extraction pipeline",
      featured: true,
      badge: "Flagship AI Project",
      status: "Live App",
      metrics: {
        highlight: "< 1.5s",
        label: "AI Processing Time"
      },
      highlights: [
        "LLM-powered document summarization & deep insight extraction via Gemini & GPT",
        "AWS S3 cloud storage with time-limited signed URLs for zero-trust document security",
        "Reactive Glassmorphic dashboard with real-time analysis streaming and visual stats"
      ],
      stackGroup: {
        frontend: ["React 19", "Tailwind CSS", "Framer Motion", "Glassmorphic UI"],
        backend: ["Node.js", "Express.js", "Automated PDF Pipeline"],
        database: ["MongoDB", "Mongoose"],
        cloud: ["AWS S3 Signed URLs", "Gemini API", "OpenAI GPT", "JWT Security"]
      },
      problem: "Reading and analyzing voluminous PDF documents manually is notoriously slow, error-prone, and inefficient, creating critical bottlenecks when teams need fast, reliable answers from legal, financial, and technical reports.",
      solution: "Engineered an end-to-end AI document intelligence platform that automates PDF text parsing, semantic structuring, and multi-layered LLM summarization. Features secure pre-signed AWS S3 URL pipelines, modular Express micro-routes, role-protected JWT sessions, and a glassmorphic React frontend built for real-time document interaction.",
      tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "AWS S3", "Gemini API", "Framer Motion", "Tailwind CSS"],
      image: "https://i.ibb.co/r2VH0TQh/Chat-GPT-Image-Aug-7-2026-03-18-01-PM.png",
      liveLink: "https://ai-document-intelligence-system-fro.vercel.app/",
      demoLink: "https://ai-document-intelligence-system-fro.vercel.app/"
    },
    {
      id: "npay",
      title: "N-Pay – Gold & Chit Management Platform",
      category: "Fintech & Enterprise",
      tagline: "High-concurrency fintech solution digitizing chit schemes and physical gold investment",
      featured: true,
      badge: "Fintech Scale",
      status: "Production Architecture",
      metrics: {
        highlight: "100%",
        label: "Audit & RBAC Compliance"
      },
      highlights: [
        "Comprehensive RBAC with granular admin, agent, and investor authorization workflows",
        "Integrated Razorpay & Cashfree payment gateways with webhook idempotency",
        "Automated shipment tracking & real-time delivery pipeline for physical gold distribution"
      ],
      stackGroup: {
        frontend: ["React", "Tailwind CSS", "Admin Analytics Dashboard"],
        backend: ["Node.js", "Express.js", "RESTful Core", "Razorpay SDK"],
        database: ["MongoDB", "Schema Indexing", "Transaction Aggregations"],
        cloud: ["AWS EC2", "AWS S3", "Vercel", "Render"]
      },
      problem: "Traditional paper-based chit fund and gold schemes suffer from fragmented records, lack of real-time auditability, and severe security risks during payment collection and physical gold fulfillment.",
      solution: "Architected a full-cycle enterprise platform digitizing chit onboarding, installment schedules, gold purchase mechanics, and doorstep shipment. Engineered atomic MongoDB transactions, JWT authentication with role-based policies, Razorpay checkout hooks, and an executive administration dashboard.",
      tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS", "Razorpay", "AWS S3"],
      image: "https://i.ibb.co/QFtFN6Cx/Chat-GPT-Image-Aug-7-2026-03-09-46-PM.png",
      liveLink: "#",
      demoLink: "#"
    },
    {
      id: "namma-cart",
      title: "Namma Cart – MERN E-Commerce Platform",
      category: "E-Commerce",
      tagline: "Modern digital storefront with dynamic inventory management and instant checkout",
      featured: false,
      badge: "Full Stack Store",
      status: "Live App",
      metrics: {
        highlight: "100%",
        label: "End-to-End Workflow"
      },
      highlights: [
        "Comprehensive product catalog with multi-variant filtering and real-time cart state",
        "Protected admin portal for category management, inventory adjustments, and order audits",
        "Direct Razorpay online payment integration paired with AWS S3 asset hosting"
      ],
      stackGroup: {
        frontend: ["React", "Tailwind CSS", "Responsive UI"],
        backend: ["Node.js", "Express.js", "JWT Auth", "Razorpay"],
        database: ["MongoDB", "Mongoose"],
        cloud: ["AWS S3", "Vercel Deployment"]
      },
      problem: "Growing online retailers need affordable yet resilient e-commerce architectures that avoid bulky monoliths and handle peak traffic, secure payments, and instant inventory sync.",
      solution: "Developed a modular MERN e-commerce application equipped with instant cart synchronization, dynamic filtering, secure JWT-based admin controls, AWS S3 image storage, and seamless Razorpay transactions.",
      tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS", "AWS S3", "Razorpay"],
      image: "https://i.ibb.co/SD02yT6d/Chat-GPT-Image-Aug-7-2026-03-11-55-PM.png",
      liveLink: "https://ecommerce-frontend-kohl-delta.vercel.app/",
      demoLink: "https://ecommerce-frontend-kohl-delta.vercel.app/"
    },
    {
      id: "ainotebook",
      title: "AI Notebook – Smart Note Augmentation",
      category: "AI & Intelligence",
      tagline: "Intelligent note-taking workspace with contextual LLM summarization and synthesis",
      featured: false,
      badge: "AI Powered",
      status: "Live App",
      metrics: {
        highlight: "Real-time",
        label: "AI Synthesis"
      },
      highlights: [
        "LLM API integration for automated note restructuring, bullet summarization, and tone enhancement",
        "Isolated user data sandboxes enforced by JWT token validation on every micro-endpoint",
        "Responsive, markdown-friendly editing experience with instant local and cloud sync"
      ],
      stackGroup: {
        frontend: ["React", "Tailwind CSS", "Context API"],
        backend: ["Node.js", "Express.js", "AI REST Service"],
        database: ["MongoDB", "User Partitioning"],
        cloud: ["Vercel", "AI APIs"]
      },
      problem: "Traditional digital notebooks are static containers that require endless manual curation, synthesis, and reformatting without offering intelligent assistance.",
      solution: "Engineered a reactive AI-assisted notebook enabling users to draft ideas, auto-generate executive summaries, and expand key concepts on demand via prompt-engineered LLM APIs connected to a hardened Node.js backend.",
      tech: ["Node.js", "Express.js", "MongoDB", "JWT", "React", "AI API", "Tailwind CSS"],
      image: "https://i.ibb.co/FbC57RCF/Chat-GPT-Image-Aug-7-2026-03-16-46-PM.png",
      liveLink: "https://ai-notebook-frontend-nine.vercel.app/",
      demoLink: "https://ai-notebook-frontend-nine.vercel.app/"
    },
    {
      id: "schoolmanagement",
      title: "School Management System",
      category: "EdTech & Enterprise",
      tagline: "Unified institutional ERP centralizing student records, attendance, and academics",
      featured: false,
      badge: "Enterprise EdTech",
      status: "Live App",
      metrics: {
        highlight: "3-Tier",
        label: "Role-Based Access"
      },
      highlights: [
        "Three-tier RBAC architecture tailored for Administrators, Teachers, and Students",
        "Daily attendance tracking module with auto-calculated percentage and historical analytics",
        "Centralized academic grade reporting and student dossier management"
      ],
      stackGroup: {
        frontend: ["React", "Tailwind CSS", "Dashboard Views"],
        backend: ["Node.js", "Express.js", "RBAC Policies"],
        database: ["MongoDB", "Relational Schemas via References"],
        cloud: ["Vercel", "Render"]
      },
      problem: "Educational institutions struggle with fragmented spreadsheets and disjointed software for student records, daily attendance, and academic performance.",
      solution: "Delivered a centralized full-stack ERP covering institutional workflows from admissions and course scheduling to daily attendance logs and report cards, safeguarded with multi-level RBAC and efficient MongoDB indexes.",
      tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS"],
      image: "https://i.ibb.co/JwbjZ2y1/Chat-GPT-Image-Aug-7-2026-03-19-35-PM.png",
      liveLink: "https://school-management-frontend-five-omega.vercel.app/",
      demoLink: "https://school-management-frontend-five-omega.vercel.app/"
    }
  ],
  contact: {
    email: "imselva1512@gmail.com",
    github: "https://github.com/iamselva3/",
    linkedin: "https://www.linkedin.com/in/selvaganesh3/",
    instagram: "https://www.instagram.com/iamselva3/",
    whatsapp: "9150888318"
  }
};

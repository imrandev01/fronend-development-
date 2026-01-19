// Sample user data - in real app, this comes from API/database
export const initialProfileData = {
  // From Registration (Non-editable or rare edit)
  userId: 'USR12345',
  email: 'john.doe@example.com',
  registeredDate: '2024-01-15',
  accountType: 'job_seeker',
  
  // Basic Info (Editable)
  firstName: 'John',
  lastName: 'Doe',
  headline: 'Full Stack Developer | React & Node.js Expert',
  profilePicture: 'https://via.placeholder.com/150',
  location: 'Bangalore, Karnataka',
  phone: '+91 9876543210',
  dateOfBirth: '1995-05-15',
  
  // About
  about: 'Passionate Full Stack Developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies. Love solving complex problems and creating user-friendly interfaces.',
  
  // Experience
  experience: [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Solutions',
      companyLogo: 'https://via.placeholder.com/60',
      location: 'Bangalore',
      type: 'Full Time',
      startDate: '2021-06',
      endDate: null,
      current: true,
      description: 'Leading a team of 5 developers in building enterprise-level web applications using React, Node.js, and AWS.',
      skills: ['React', 'Node.js', 'AWS', 'MongoDB', 'TypeScript'],
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'StartupHub Inc',
      companyLogo: 'https://via.placeholder.com/60',
      location: 'Mumbai',
      type: 'Full Time',
      startDate: '2019-03',
      endDate: '2021-05',
      current: false,
      description: 'Developed and maintained multiple client projects using MERN stack.',
      skills: ['React', 'Express', 'MongoDB', 'Redux'],
    },
  ],
  
  // Education
  education: [
    {
      id: 1,
      degree: 'Bachelor of Technology',
      field: 'Computer Science Engineering',
      institution: 'IIT Bombay',
      location: 'Mumbai',
      startYear: '2013',
      endYear: '2017',
      grade: '8.5 CGPA',
      description: 'Focused on software engineering and data structures.',
    },
  ],
  
  // Skills
  skills: {
    technical: [
      { name: 'React', level: 90, endorsed: 12 },
      { name: 'Node.js', level: 85, endorsed: 10 },
      { name: 'JavaScript', level: 95, endorsed: 15 },
      { name: 'TypeScript', level: 80, endorsed: 8 },
      { name: 'Python', level: 75, endorsed: 6 },
      { name: 'MongoDB', level: 85, endorsed: 9 },
      { name: 'AWS', level: 70, endorsed: 5 },
      { name: 'Docker', level: 75, endorsed: 7 },
    ],
    soft: ['Leadership', 'Communication', 'Problem Solving', 'Team Collaboration', 'Time Management'],
  },
  
  // Projects
  projects: [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Built a full-featured e-commerce platform with payment integration, real-time inventory, and admin dashboard.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: 'https://github.com/johndoe/ecommerce',
      image: 'https://via.placeholder.com/300x200',
      startDate: '2023-01',
      endDate: '2023-06',
    },
    {
      id: 2,
      title: 'AI Chatbot',
      description: 'Developed an AI-powered customer support chatbot using NLP and machine learning.',
      technologies: ['Python', 'TensorFlow', 'React', 'FastAPI'],
      link: 'https://github.com/johndoe/ai-chatbot',
      image: 'https://via.placeholder.com/300x200',
      startDate: '2022-08',
      endDate: '2022-12',
    },
  ],
  
  // Certifications
  certifications: [
    {
      id: 1,
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      issueDate: '2023-03',
      expiryDate: '2026-03',
      credentialId: 'AWS-12345',
      credentialUrl: 'https://aws.amazon.com/verification',
    },
    {
      id: 2,
      name: 'React Advanced Concepts',
      issuer: 'Udemy',
      issueDate: '2022-11',
      expiryDate: null,
      credentialId: 'UC-12345',
      credentialUrl: 'https://udemy.com/certificate/UC-12345',
    },
  ],
  
  // Resumes
  resumes: [
    {
      id: 1,
      name: 'John_Doe_Resume_2024.pdf',
      uploadDate: '2024-01-10',
      size: '245 KB',
      default: true,
    },
    {
      id: 2,
      name: 'John_Doe_Resume_Tech.pdf',
      uploadDate: '2023-12-15',
      size: '198 KB',
      default: false,
    },
  ],
  
  // Job Preferences
  preferences: {
    jobTypes: ['Full Time', 'Contract'],
    workMode: ['Remote', 'Hybrid'],
    expectedSalary: { min: 15, max: 25, currency: 'LPA' },
    preferredLocations: ['Bangalore', 'Mumbai', 'Remote'],
    noticePeriod: '30 days',
    openToRelocation: true,
  },
  
  // Social Links
  socialLinks: {
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    portfolio: 'https://johndoe.dev',
    twitter: 'https://twitter.com/johndoe',
  },
  
  // Stats
  stats: {
    profileViews: 342,
    applicationsSubmitted: 23,
    savedJobs: 15,
    profileCompletion: 85,
  },
};

// Profile completion calculation
export const calculateProfileCompletion = (profile) => {
  const sections = {
    basicInfo: profile.firstName && profile.lastName && profile.headline && profile.location ? 10 : 0,
    profilePicture: profile.profilePicture !== 'https://via.placeholder.com/150' ? 5 : 0,
    about: profile.about ? 10 : 0,
    experience: profile.experience.length > 0 ? 15 : 0,
    education: profile.education.length > 0 ? 10 : 0,
    skills: profile.skills.technical.length >= 5 ? 15 : 0,
    projects: profile.projects.length > 0 ? 10 : 0,
    certifications: profile.certifications.length > 0 ? 5 : 0,
    resume: profile.resumes.length > 0 ? 10 : 0,
    preferences: profile.preferences.expectedSalary ? 5 : 0,
    social: Object.values(profile.socialLinks).filter(Boolean).length >= 2 ? 5 : 0,
  };
  
  return Object.values(sections).reduce((sum, val) => sum + val, 0);
};
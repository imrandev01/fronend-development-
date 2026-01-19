// src/components/Navbar/employerNavigationData.js

export const postJobMenuItems = [
  { label: 'How to Post a Job', path: '/employer/guide/post-job' },
  { label: 'Job Posting Best Practices', path: '/employer/guide/best-practices' },
  { label: 'Pricing & Plans', path: '/employer/pricing' },
  { label: 'Post a Job Now', path: '/employer/post-job', highlight: true },
];

export const manageJobsMenuItems = [
  { label: 'All Jobs', path: '/employer/jobs' },
  { label: 'Active Jobs', path: '/employer/jobs/active' },
  { label: 'Draft Jobs', path: '/employer/jobs/drafts' },
  { label: 'Closed Jobs', path: '/employer/jobs/closed' },
  { label: 'Job Performance', path: '/employer/jobs/analytics' },
];

export const applicationsMenuItems = [
  { label: 'All Applications', path: '/employer/applications' },
  { label: 'New Applications', path: '/employer/applications/new' },
  { label: 'Shortlisted', path: '/employer/applications/shortlisted' },
  { label: 'Interviewed', path: '/employer/applications/interviewed' },
  { label: 'Rejected', path: '/employer/applications/rejected' },
];

export const candidatesMenuItems = [
  { label: 'Search Candidates', path: '/employer/candidates/search' },
  { label: 'Saved Candidates', path: '/employer/candidates/saved' },
  { label: 'Candidate Database', path: '/employer/candidates/database' },
  { label: 'Talent Pool', path: '/employer/candidates/pool' },
];

export const companyProfileMenuItems = [
  { label: 'View Company Profile', path: '/employer/company/profile' },
  { label: 'Edit Profile', path: '/employer/company/edit' },
  { label: 'Verification Status', path: '/employer/company/verification' },
  { label: 'Company Reviews', path: '/employer/company/reviews' },
];

export const employerAccountMenuItems = [
  { label: 'Employer Profile', path: '/employer/profile', icon: 'person' },
  { label: 'Company Verification', path: '/employer/verification', icon: 'verified', badge: true },
  { label: 'Billing & Plans', path: '/employer/billing', icon: 'payment' },
  { label: 'Settings', path: '/employer/settings', icon: 'settings' },
  { label: 'Help & Support', path: '/employer/support', icon: 'help' },
  { label: 'Logout', path: '/logout', icon: 'logout', divider: true },
];
// src/pages/EmployerHome.jsx

import React from 'react';
import EmployerBanner from '../components/Employer/EmployerBanner';
import TrustStrip from '../components/Employer/TrustStrip';
import WhyHireWithUs from '../components/Employer/WhyHireWithUs';
import HowItWorks from '../components/Employer/HowItWorks';
import FeaturedRoles from '../components/Employer/FeaturedRoles';

export default function EmployerHome() {
  // This would come from your auth/state management
  const isVerified = false; // Change to true to test verified state

  return (
    <div className="min-h-screen bg-white">
      <EmployerBanner isVerified={isVerified} />
      <TrustStrip />
      <WhyHireWithUs />
      <HowItWorks />
      <FeaturedRoles />
    </div>
  );
}
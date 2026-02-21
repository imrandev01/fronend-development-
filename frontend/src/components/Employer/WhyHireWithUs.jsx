// src/components/Employer/WhyHireWithUs.jsx

import React from 'react';
import {
  VerifiedUser,
  FlashOn,
  TrackChanges,
  Dashboard,
} from '@mui/icons-material';

export default function WhyHireWithUs() {
  const features = [
    {
      icon: <VerifiedUser />,
      title: 'Verified Employers',
      description: 'We verify companies before they can post jobs, ensuring trust and credibility.',
      color: 'violet',
    },
    {
      icon: <FlashOn />,
      title: 'Quick Job Posting',
      description: 'Post a job in under 5 minutes with our intuitive and streamlined interface.',
      color: 'blue',
    },
    {
      icon: <TrackChanges />,
      title: 'Targeted Hiring',
      description: 'Reach qualified candidates by role, skill, experience, and location.',
      color: 'green',
    },
    {
      icon: <Dashboard />,
      title: 'Smart Dashboard',
      description: 'Track applications, manage candidates, and analyze hiring metrics easily.',
      color: 'amber',
    },
  ];

  const colorClasses = {
    violet: {
      bg: 'bg-violet-100',
      text: 'text-violet-600',
      border: 'border-violet-200',
      hover: 'hover:border-violet-400',
    },
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      border: 'border-blue-200',
      hover: 'hover:border-blue-400',
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-600',
      border: 'border-green-200',
      hover: 'hover:border-green-400',
    },
    amber: {
      bg: 'bg-amber-100',
      text: 'text-amber-600',
      border: 'border-amber-200',
      hover: 'hover:border-amber-400',
    },
  };

  return (
    <section className="py-12 md:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 md:mb-4">
            Why Hire With{' '}
            <span className="bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] bg-clip-text text-transparent">
              Us?
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Everything you need to find, attract, and hire the best talent for your company
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const colors = colorClasses[feature.color];
            return (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 border-2 ${colors.border} ${colors.hover} transition-all duration-300 hover:shadow-lg group`}
              >
                <div
                  className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center ${colors.text} mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {React.cloneElement(feature.icon, { sx: { fontSize: 24 } })}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
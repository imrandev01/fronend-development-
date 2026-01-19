// src/components/Employer/HowItWorks.jsx

import React from 'react';
import { PersonAdd, VerifiedUser, Work } from '@mui/icons-material';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: <PersonAdd />,
      title: 'Create Employer Account',
      description: 'Sign up with your company details and basic information in minutes.',
    },
    {
      number: '02',
      icon: <VerifiedUser />,
      title: 'Verify Your Company',
      description: 'Submit your company documents for MCA verification and approval.',
    },
    {
      number: '03',
      icon: <Work />,
      title: 'Post Jobs & Hire',
      description: 'Start posting jobs, receive applications, and hire top talent.',
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 md:mb-4">
            How It{' '}
            <span className="bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Get started in three simple steps and start hiring the best talent
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-16 left-1/2 w-2/3 h-1 bg-gradient-to-r from-violet-200 via-violet-400 to-violet-200 -translate-x-1/2 -translate-y-1/2 rounded-full"></div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-6 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Card */}
                <div className="bg-white rounded-xl p-6 md:p-8 border-2 border-slate-200 hover:border-violet-400 transition-all duration-300 hover:shadow-xl group text-center">
                  {/* Number Badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mt-6 mb-4 flex justify-center">
                    <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 group-hover:scale-110 transition-transform duration-300">
                      {React.cloneElement(step.icon, { sx: { fontSize: 32 } })}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                </div>

                {/* Mobile Arrow */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-4">
                    <svg
                      className="w-6 h-6 text-violet-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
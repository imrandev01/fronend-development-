// src/components/Employer/TrustStrip.jsx

import React from 'react';
import { Verified, Business, People } from '@mui/icons-material';

export default function TrustStrip() {
  const stats = [
    {
      icon: <Business />,
      value: '10,000+',
      label: 'Trusted Employers',
    },
    {
      icon: <Verified />,
      label: 'MCA-Verified Companies',
    },
    {
      icon: <People />,
      value: '50,000+',
      label: 'Active Candidates',
    },
  ];

  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center justify-center gap-3 text-center sm:text-left"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center text-violet-600">
                {React.cloneElement(stat.icon, { sx: { fontSize: 20 } })}
              </div>
              <div>
                {stat.value && (
                  <p className="text-xl sm:text-2xl font-bold text-slate-900">{stat.value}</p>
                )}
                <p className="text-xs sm:text-sm text-slate-600 font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
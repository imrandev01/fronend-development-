import React from 'react';

export default function HeroHeader() {
  return (
    <div className="mb-6">
      {/* Main Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold mb-2 bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] bg-clip-text text-transparent leading-tight">
        Find Your Dream Job
      </h1>

      {/* Subtitle */}
      <p className="text-[0.8125rem] sm:text-[0.875rem] text-slate-600 max-w-2xl mx-auto">
        Browse through hundreds of{' '}
        <span className="font-semibold text-violet-600">technology</span>{' '}
        opportunities and land your next big role.
      </p>
    </div>
  );
}
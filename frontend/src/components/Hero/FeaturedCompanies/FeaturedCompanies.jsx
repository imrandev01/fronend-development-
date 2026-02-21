import React from 'react';
import CompanyLogo from './CompanyLogo';
import { companiesData } from './companiesData';

export default function FeaturedCompanies() {
  // Duplicate companies for seamless infinite scroll
  const duplicatedCompanies = [...companiesData, ...companiesData];

  return (
    <section className="py-10 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header - Smaller */}
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-1.5">
            Featured Companies
          </h2>
          <p className="text-xs text-slate-600">
            Join thousands of professionals at top companies
          </p>
        </div>

        {/* Scrolling Container */}
        <div className="relative">
          {/* Top Row - Right to Left */}
          <div className="mb-4 overflow-hidden">
            <div className="flex animate-scroll-rtl">
              {duplicatedCompanies.map((company, index) => (
                <CompanyLogo key={`rtl-${company.id}-${index}`} company={company} />
              ))}
            </div>
          </div>

          {/* Bottom Row - Left to Right */}
          <div className="overflow-hidden">
            <div className="flex animate-scroll-ltr">
              {duplicatedCompanies.map((company, index) => (
                <CompanyLogo key={`ltr-${company.id}-${index}`} company={company} />
              ))}
            </div>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
}
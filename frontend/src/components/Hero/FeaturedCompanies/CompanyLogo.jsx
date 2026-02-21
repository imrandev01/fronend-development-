import React from 'react';
import PropTypes from 'prop-types';

export default function CompanyLogo({ company }) {
  const handleClick = () => {
    window.open(company.careerUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={handleClick}
      className="flex-shrink-0 w-16 h-10 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md hover:border-violet-300 hover:scale-105 transition-all duration-300 cursor-pointer mx-2 flex items-center justify-center p-2 group"
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`View ${company.name} careers`}
    >
      <img
        src={company.logo}
        alt={`${company.name} logo`}
        className="max-w-full max-h-full object-contain transition-all duration-300 opacity-90 group-hover:opacity-100"
      />
    </div>
  );
}

CompanyLogo.propTypes = {
  company: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    careerUrl: PropTypes.string.isRequired,
  }).isRequired,
};
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function FeatureCard({ title, description, icon, colorConfig }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative bg-white rounded-xl p-5 border border-slate-200 transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.06)] ${colorConfig.hoverBorder}`}
    >
      {/* Top Border on Hover */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 transition-transform duration-300 origin-left ${
          isHovered ? 'scale-x-100' : 'scale-x-0'
        }`}
        style={{
          background: `linear-gradient(90deg, ${colorConfig.gradient.from}, ${colorConfig.gradient.to})`,
        }}
      />

      {/* Icon */}
      <div
        className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-3 transition-transform duration-300 ${colorConfig.iconBg} ${colorConfig.iconText} ${
          isHovered ? 'scale-110 rotate-6' : ''
        }`}
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-slate-900 mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-[0.8125rem] text-slate-600 leading-relaxed mb-2">
        {description}
      </p>

      {/* Learn More Link */}
      <div
        className={`flex items-center gap-1 ${colorConfig.iconText} text-xs font-semibold transition-all duration-300 ${
          isHovered ? 'translate-x-2 opacity-100' : 'opacity-0'
        }`}
      >
        Learn more
        <ArrowForwardIcon sx={{ fontSize: 13 }} />
      </div>
    </div>
  );
}

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  colorConfig: PropTypes.shape({
    iconBg: PropTypes.string.isRequired,
    iconText: PropTypes.string.isRequired,
    hoverBorder: PropTypes.string.isRequired,
    gradient: PropTypes.shape({
      from: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
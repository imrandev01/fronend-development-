import React from 'react';
import PropTypes from 'prop-types';

export default function StatsCard({
  Icon,
  value,
  label,
  colorClass,
  borderClass,
  gradientFrom,
  gradientTo,
}) {
  return (
    <div
      className={`bg-white rounded-xl p-4 border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_6px_12px_rgba(0,0,0,0.06)] ${borderClass}`}
    >
      {/* Icon */}
      <div className={`flex justify-center mb-2 ${colorClass}`}>
        <Icon sx={{ fontSize: 22 }} />
      </div>

      {/* Value */}
      <h3
        className="text-xl font-extrabold mb-0.5 bg-clip-text text-transparent"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
        }}
      >
        {value}
      </h3>

      {/* Label */}
      <p className="text-xs text-slate-500 font-medium">
        {label}
      </p>
    </div>
  );
}

StatsCard.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  colorClass: PropTypes.string.isRequired,
  borderClass: PropTypes.string.isRequired,
  gradientFrom: PropTypes.string.isRequired,
  gradientTo: PropTypes.string.isRequired,
};

import React from 'react';
import StatsCard from './StatsCard';
import { statsData } from './statsData';

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
      {statsData.map((stat, index) => (
        <StatsCard
          key={index}
          Icon={stat.Icon}
          value={stat.value}
          label={stat.label}
          colorClass={stat.colorClass}
          borderClass={stat.borderClass}
          gradientFrom={stat.gradientFrom}
          gradientTo={stat.gradientTo}
        />
      ))}
    </div>
  );
}
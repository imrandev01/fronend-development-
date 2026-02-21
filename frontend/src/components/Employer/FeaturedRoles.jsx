// src/components/Employer/FeaturedRoles.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  LocalShipping,
  Headset,
  Keyboard,
  DirectionsCar,
  MoreHoriz,
} from '@mui/icons-material';

export default function FeaturedRoles() {
  const navigate = useNavigate();

  const roles = [
    {
      icon: <TrendingUp />,
      title: 'Sales',
      count: '12,450',
      color: 'violet',
      path: '/employer/candidates/pool?role=sales',
    },
    {
      icon: <DirectionsCar />,
      title: 'Driver',
      count: '8,320',
      color: 'blue',
      path: '/employer/candidates/pool?role=driver',
    },
    {
      icon: <Headset />,
      title: 'BPO',
      count: '15,680',
      color: 'green',
      path: '/employer/candidates/pool?role=bpo',
    },
    {
      icon: <Keyboard />,
      title: 'Data Entry',
      count: '9,240',
      color: 'amber',
      path: '/employer/candidates/pool?role=data-entry',
    },
    {
      icon: <LocalShipping />,
      title: 'Delivery',
      count: '6,890',
      color: 'red',
      path: '/employer/candidates/pool?role=delivery',
    },
    {
      icon: <MoreHoriz />,
      title: 'More Roles',
      count: '50,000+',
      color: 'slate',
      path: '/employer/candidates/pool',
    },
  ];

  const colorClasses = {
    violet: {
      bg: 'bg-violet-50',
      hoverBg: 'hover:bg-violet-100',
      text: 'text-violet-600',
      border: 'border-violet-200',
    },
    blue: {
      bg: 'bg-blue-50',
      hoverBg: 'hover:bg-blue-100',
      text: 'text-blue-600',
      border: 'border-blue-200',
    },
    green: {
      bg: 'bg-green-50',
      hoverBg: 'hover:bg-green-100',
      text: 'text-green-600',
      border: 'border-green-200',
    },
    amber: {
      bg: 'bg-amber-50',
      hoverBg: 'hover:bg-amber-100',
      text: 'text-amber-600',
      border: 'border-amber-200',
    },
    red: {
      bg: 'bg-red-50',
      hoverBg: 'hover:bg-red-100',
      text: 'text-red-600',
      border: 'border-red-200',
    },
    slate: {
      bg: 'bg-slate-50',
      hoverBg: 'hover:bg-slate-100',
      text: 'text-slate-600',
      border: 'border-slate-200',
    },
  };

  return (
    <section className="py-12 md:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 md:mb-4">
            Find Candidates by{' '}
            <span className="bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] bg-clip-text text-transparent">
              Role
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Browse our talent pool organized by job roles and start hiring immediately
          </p>
        </div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {roles.map((role, index) => {
            const colors = colorClasses[role.color];
            return (
              <button
                key={index}
                onClick={() => navigate(role.path)}
                className={`${colors.bg} ${colors.hoverBg} rounded-xl p-6 border-2 ${colors.border} transition-all duration-300 hover:shadow-lg hover:scale-105 group text-center`}
              >
                <div
                  className={`w-14 h-14 mx-auto mb-4 ${colors.bg} rounded-full flex items-center justify-center ${colors.text} group-hover:scale-110 transition-transform duration-300 border-2 ${colors.border}`}
                >
                  {React.cloneElement(role.icon, { sx: { fontSize: 28 } })}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">{role.title}</h3>
                <p className={`text-xs font-semibold ${colors.text}`}>{role.count} candidates</p>
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <button
            onClick={() => navigate('/employer/candidates/pool')}
            className="px-8 py-3 bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] text-white rounded-lg font-semibold text-sm sm:text-base hover:shadow-lg transition-all duration-300"
          >
            Explore All Candidates
          </button>
        </div>
      </div>
    </section>
  );
}
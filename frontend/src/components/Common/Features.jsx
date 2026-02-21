import React from 'react';
import FeatureCard from './FeatureCard';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BadgeIcon from '@mui/icons-material/Badge';

export default function Features() {
  const items = [
    {
      title: 'Smart Job Search',
      desc: 'Advanced filters for skills, experience level, remote options, and salary ranges to find your perfect match.',
      icon: <WorkOutlineIcon sx={{ fontSize: 24 }} />,
      colorConfig: {
        iconBg: 'bg-violet-50',
        iconText: 'text-violet-600',
        hoverBorder: 'hover:border-violet-600',
        gradient: {
          from: '#667eea',
          to: '#667eeacc',
        },
      },
    },
    {
      title: 'Career Guide',
      desc: 'Curated technology roles across software, data, cloud, security, and more with expert insights.',
      icon: <MenuBookIcon sx={{ fontSize: 24 }} />,
      colorConfig: {
        iconBg: 'bg-purple-50',
        iconText: 'text-purple-700',
        hoverBorder: 'hover:border-purple-700',
        gradient: {
          from: '#764ba2',
          to: '#764ba2cc',
        },
      },
    },
    {
      title: 'AI Resume Builder',
      desc: 'Create your ATS-friendly resume using AI-powered tools and get noticed by top recruiters.',
      icon: <BadgeIcon sx={{ fontSize: 24 }} />,
      colorConfig: {
        iconBg: 'bg-pink-50',
        iconText: 'text-pink-500',
        hoverBorder: 'hover:border-pink-500',
        gradient: {
          from: '#f093fb',
          to: '#f093fbcc',
        },
      },
    },
    {
      title: 'AI Resume Builder',
      desc: 'Create your ATS-friendly resume using AI-powered tools and get noticed by top recruiters.',
      icon: <BadgeIcon sx={{ fontSize: 24 }} />,
      colorConfig: {
        iconBg: 'bg-pink-50',
        iconText: 'text-pink-500',
        hoverBorder: 'hover:border-pink-500',
        gradient: {
          from: '#f093fb',
          to: '#f093fbcc',
        },
      },
    },
    {
      title: 'AI Resume Builder',
      desc: 'Create your ATS-friendly resume using AI-powered tools and get noticed by top recruiters.',
      icon: <BadgeIcon sx={{ fontSize: 24 }} />,
      colorConfig: {
        iconBg: 'bg-pink-50',
        iconText: 'text-pink-500',
        hoverBorder: 'hover:border-pink-500',
        gradient: {
          from: '#f093fb',
          to: '#f093fbcc',
        },
      },
    },
    {
      title: 'AI Resume Builder',
      desc: 'Create your ATS-friendly resume using AI-powered tools and get noticed by top recruiters.',
      icon: <BadgeIcon sx={{ fontSize: 24 }} />,
      colorConfig: {
        iconBg: 'bg-pink-50',
        iconText: 'text-pink-500',
        hoverBorder: 'hover:border-pink-500',
        gradient: {
          from: '#f093fb',
          to: '#f093fbcc',
        },
      },
    },
  ];

  return (
    <section className="py-10 md:py-12 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
            Why Choose Us?
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Discover the features that make finding your dream job easier than ever
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((item) => (
            <FeatureCard
              key={item.title}
              title={item.title}
              description={item.desc}
              icon={item.icon}
              colorConfig={item.colorConfig}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
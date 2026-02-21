import React from 'react';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

export default function ProfileCompletion({ completion, profile }) {
  const suggestions = [];

  if (!profile.about) suggestions.push('Add an "About Me" section');
  if (profile.experience.length === 0) suggestions.push('Add work experience');
  if (profile.skills.technical.length < 5) suggestions.push('Add at least 5 skills');
  if (profile.projects.length === 0) suggestions.push('Showcase your projects');
  if (profile.resumes.length === 0) suggestions.push('Upload your resume');

  const getColor = () => {
    if (completion >= 80) return 'bg-green-500';
    if (completion >= 60) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const getMessage = () => {
    if (completion >= 90) return 'Excellent! Your profile is almost perfect!';
    if (completion >= 70) return 'Great! Just a few more sections to complete.';
    if (completion >= 50) return 'Good start! Keep building your profile.';
    return 'Let\'s complete your profile to get more opportunities!';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-900">Profile Strength</h2>
        <span className="text-2xl font-bold text-violet-600">{completion}%</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden mb-4">
        <div
          className={`h-full ${getColor()} transition-all duration-500`}
          style={{ width: `${completion}%` }}
        />
      </div>

      <p className="text-sm text-slate-600 mb-4">{getMessage()}</p>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <TipsAndUpdatesIcon sx={{ fontSize: 18 }} className="text-amber-500" />
            Quick Tips:
          </div>
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-2 text-sm text-slate-600">
              <CheckCircleIcon sx={{ fontSize: 16 }} className="text-slate-400 mt-0.5" />
              <span>{suggestion}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

ProfileCompletion.propTypes = {
  completion: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired,
};
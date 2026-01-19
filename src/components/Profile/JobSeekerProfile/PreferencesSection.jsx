import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Chip } from '@mui/material';

export default function PreferencesSection({ preferences, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [prefs, setPrefs] = useState(preferences);

  const handleSave = () => {
    onSave(prefs);
    setIsEditing(false);
  };

  const jobTypeOptions = ['Full Time', 'Part Time', 'Contract', 'Internship', 'Freelance'];
  const workModeOptions = ['Office', 'Remote', 'Hybrid'];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-base md:text-lg font-bold text-slate-900">Job Preferences</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="text-violet-600 hover:text-violet-700"
          >
            <EditIcon sx={{ fontSize: 20 }} />
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="flex items-center gap-1 px-3 py-1.5 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-700"
          >
            <SaveIcon sx={{ fontSize: 16 }} />
            Save
          </button>
        )}
      </div>

      <div className="space-y-4 md:space-y-5">
        {/* Job Types */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Job Type</label>
          {isEditing ? (
            <div className="flex flex-wrap gap-2">
              {jobTypeOptions.map((type) => (
                <Chip
                  key={type}
                  label={type}
                  onClick={() => {
                    const newTypes = prefs.jobTypes.includes(type)
                      ? prefs.jobTypes.filter((t) => t !== type)
                      : [...prefs.jobTypes, type];
                    setPrefs({ ...prefs, jobTypes: newTypes });
                  }}
                  size="small"
                  sx={{
                    backgroundColor: prefs.jobTypes.includes(type) ? '#7c3aed' : '#f1f5f9',
                    color: prefs.jobTypes.includes(type) ? 'white' : '#475569',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: { xs: '0.75rem', md: '0.8125rem' },
                    '&:hover': {
                      backgroundColor: prefs.jobTypes.includes(type) ? '#6d28d9' : '#e2e8f0',
                    },
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {prefs.jobTypes.map((type) => (
                <Chip
                  key={type}
                  label={type}
                  size="small"
                  sx={{
                    backgroundColor: '#f5f3ff',
                    color: '#7c3aed',
                    fontWeight: 600,
                    fontSize: { xs: '0.75rem', md: '0.8125rem' },
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Work Mode */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Work Mode</label>
          {isEditing ? (
            <div className="flex flex-wrap gap-2">
              {workModeOptions.map((mode) => (
                <Chip
                  key={mode}
                  label={mode}
                  onClick={() => {
                    const newModes = prefs.workMode.includes(mode)
                      ? prefs.workMode.filter((m) => m !== mode)
                      : [...prefs.workMode, mode];
                    setPrefs({ ...prefs, workMode: newModes });
                  }}
                  size="small"
                  sx={{
                    backgroundColor: prefs.workMode.includes(mode) ? '#7c3aed' : '#f1f5f9',
                    color: prefs.workMode.includes(mode) ? 'white' : '#475569',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: { xs: '0.75rem', md: '0.8125rem' },
                    '&:hover': {
                      backgroundColor: prefs.workMode.includes(mode) ? '#6d28d9' : '#e2e8f0',
                    },
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {prefs.workMode.map((mode) => (
                <Chip
                  key={mode}
                  label={mode}
                  size="small"
                  sx={{
                    backgroundColor: '#eff6ff',
                    color: '#2563eb',
                    fontWeight: 600,
                    fontSize: { xs: '0.75rem', md: '0.8125rem' },
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Expected Salary - Mobile Friendly */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Expected Salary</label>
          {isEditing ? (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">₹</span>
                <input
                  type="number"
                  value={prefs.expectedSalary.min}
                  onChange={(e) => setPrefs({
                    ...prefs,
                    expectedSalary: { ...prefs.expectedSalary, min: parseInt(e.target.value) }
                  })}
                  className="w-20 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-200"
                  placeholder="Min"
                />
              </div>
              <span className="text-sm text-slate-600 text-center sm:text-left">to</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">₹</span>
                <input
                  type="number"
                  value={prefs.expectedSalary.max}
                  onChange={(e) => setPrefs({
                    ...prefs,
                    expectedSalary: { ...prefs.expectedSalary, max: parseInt(e.target.value) }
                  })}
                  className="w-20 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-200"
                  placeholder="Max"
                />
                <span className="text-sm text-slate-600">LPA</span>
              </div>
            </div>
          ) : (
            <p className="text-sm md:text-base text-slate-700">
              ₹ {prefs.expectedSalary.min} - {prefs.expectedSalary.max} {prefs.expectedSalary.currency}
            </p>
          )}
        </div>

        {/* Preferred Locations */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Locations</label>
          <div className="flex flex-wrap gap-2">
            {prefs.preferredLocations.map((location) => (
              <Chip
                key={location}
                label={location}
                size="small"
                sx={{
                  backgroundColor: '#fef3c7',
                  color: '#92400e',
                  fontWeight: 600,
                  fontSize: { xs: '0.75rem', md: '0.8125rem' },
                }}
              />
            ))}
          </div>
        </div>

        {/* Notice Period */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Notice Period</label>
          {isEditing ? (
            <select
              value={prefs.noticePeriod}
              onChange={(e) => setPrefs({ ...prefs, noticePeriod: e.target.value })}
              className="w-full sm:w-auto px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-200"
            >
              <option value="Immediate">Immediate</option>
              <option value="15 days">15 days</option>
              <option value="30 days">30 days</option>
              <option value="60 days">60 days</option>
              <option value="90 days">90 days</option>
            </select>
          ) : (
            <p className="text-sm md:text-base text-slate-700">{prefs.noticePeriod}</p>
          )}
        </div>

        {/* Open to Relocation */}
        <div className="flex items-center justify-between gap-4">
          <label className="text-sm font-semibold text-slate-700">Open to Relocation</label>
          {isEditing ? (
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={prefs.openToRelocation}
                onChange={(e) => setPrefs({ ...prefs, openToRelocation: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
            </label>
          ) : (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              prefs.openToRelocation 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {prefs.openToRelocation ? 'Yes' : 'No'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

PreferencesSection.propTypes = {
  preferences: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};
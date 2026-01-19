import React, { useState } from 'react';
import PropTypes from 'prop-types';
import WorkIcon from '@mui/icons-material/Work';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Chip } from '@mui/material';

export default function ExperienceSection({ experiences, onAdd, onEdit, onDelete }) {
  const [isAdding, setIsAdding] = useState(false);

  const formatDate = (date) => {
    if (!date) return 'Present';
    const [year, month] = date.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years > 0 && remainingMonths > 0) return `${years} yr ${remainingMonths} mos`;
    if (years > 0) return `${years} yr`;
    return `${remainingMonths} mos`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900">Work Experience</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-1 px-3 py-1.5 text-violet-600 hover:bg-violet-50 rounded-lg text-sm font-semibold transition-colors"
        >
          <AddIcon sx={{ fontSize: 18 }} />
          Add Experience
        </button>
      </div>

      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="relative">
            {/* Timeline Dot */}
            {index !== experiences.length - 1 && (
              <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-slate-200 hidden sm:block" />
            )}
            
            <div className="flex gap-4">
              {/* Company Logo */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <img src={exp.companyLogo} alt={exp.company} className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{exp.title}</h3>
                    <p className="text-sm text-slate-600">{exp.company} · {exp.type}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)} · {calculateDuration(exp.startDate, exp.endDate)}
                    </p>
                    <p className="text-xs text-slate-500">{exp.location}</p>
                  </div>

                  <div className="flex gap-1">
                    <button className="text-slate-400 hover:text-violet-600">
                      <EditIcon sx={{ fontSize: 18 }} />
                    </button>
                    <button className="text-slate-400 hover:text-red-600">
                      <DeleteIcon sx={{ fontSize: 18 }} />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-slate-600 mt-3 leading-relaxed">{exp.description}</p>

                {/* Skills */}
                {exp.skills && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {exp.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        sx={{
                          fontSize: '0.75rem',
                          height: '24px',
                          backgroundColor: '#f5f3ff',
                          color: '#7c3aed',
                          fontWeight: 600,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {experiences.length === 0 && (
          <div className="text-center py-8 text-slate-400">
            <WorkIcon sx={{ fontSize: 48 }} className="mb-2" />
            <p className="text-sm">No work experience added yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

ExperienceSection.propTypes = {
  experiences: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

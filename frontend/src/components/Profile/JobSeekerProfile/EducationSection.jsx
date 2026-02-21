import React from 'react';
import PropTypes from 'prop-types';
import SchoolIcon from '@mui/icons-material/School';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function EducationSection({ education, onAdd, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900">Education</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-1 px-3 py-1.5 text-violet-600 hover:bg-violet-50 rounded-lg text-sm font-semibold transition-colors"
        >
          <AddIcon sx={{ fontSize: 18 }} />
          Add Education
        </button>
      </div>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={edu.id} className="relative">
            {index !== education.length - 1 && (
              <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-slate-200" />
            )}
            
            <div className="flex gap-4">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <SchoolIcon className="text-blue-600" sx={{ fontSize: 20 }} />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{edu.institution}</h3>
                    <p className="text-sm text-slate-600">{edu.degree} in {edu.field}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {edu.startYear} - {edu.endYear}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                      <LocationOnIcon sx={{ fontSize: 12 }} />
                      <span>{edu.location}</span>
                    </div>
                    {edu.grade && (
                      <p className="text-xs text-slate-600 mt-2 font-medium">
                        Grade: {edu.grade}
                      </p>
                    )}
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

                {edu.description && (
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">{edu.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}

        {education.length === 0 && (
          <div className="text-center py-8 text-slate-400">
            <SchoolIcon sx={{ fontSize: 48 }} className="mb-2" />
            <p className="text-sm">No education added yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

EducationSection.propTypes = {
  education: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
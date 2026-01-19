import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LinkIcon from '@mui/icons-material/Link';
import { Chip } from '@mui/material';

export default function ProjectsSection({ projects, onAdd, onEdit, onDelete }) {
  const formatDate = (date) => {
    if (!date) return 'Present';
    const [year, month] = date.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900">Projects</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-1 px-3 py-1.5 text-violet-600 hover:bg-violet-50 rounded-lg text-sm font-semibold transition-colors"
        >
          <AddIcon sx={{ fontSize: 18 }} />
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-all"
          >
            {/* Project Image */}
            <div className="relative h-32 bg-slate-100">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <button className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-violet-50 text-violet-600">
                  <EditIcon sx={{ fontSize: 14 }} />
                </button>
                <button className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 text-red-600">
                  <DeleteIcon sx={{ fontSize: 14 }} />
                </button>
              </div>
            </div>

            {/* Project Info */}
            <div className="p-4">
              <h3 className="text-base font-bold text-slate-900 mb-1">{project.title}</h3>
              <p className="text-xs text-slate-500 mb-2">
                {formatDate(project.startDate)} - {formatDate(project.endDate)}
              </p>
              <p className="text-sm text-slate-600 mb-3 line-clamp-2">{project.description}</p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1 mb-3">
                {project.technologies.map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    size="small"
                    sx={{
                      fontSize: '0.625rem',
                      height: '20px',
                      backgroundColor: '#f5f3ff',
                      color: '#7c3aed',
                      fontWeight: 600,
                    }}
                  />
                ))}
              </div>

              {/* Link */}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-violet-600 hover:text-violet-700 font-medium"
                >
                  <LinkIcon sx={{ fontSize: 14 }} />
                  View Project
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <Description sx={{ fontSize: 48 }} className="mb-2" />
          <p className="text-sm">No projects added yet</p>
          <p className="text-xs mt-1">Showcase your work to impress recruiters</p>
        </div>
      )}
    </div>
  );
}

ProjectsSection.propTypes = {
  projects: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
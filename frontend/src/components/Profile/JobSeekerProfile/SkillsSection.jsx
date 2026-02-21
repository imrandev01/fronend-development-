import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Chip, LinearProgress } from '@mui/material';

export default function SkillsSection({ skills, onAdd, onDelete }) {
  const [isAddingTech, setIsAddingTech] = useState(false);
  const [isAddingSoft, setIsAddingSoft] = useState(false);
  const [newTechSkill, setNewTechSkill] = useState({ name: '', level: 50 });
  const [newSoftSkill, setNewSoftSkill] = useState('');

  const handleAddTechSkill = () => {
    if (newTechSkill.name) {
      onAdd('technical', { ...newTechSkill, endorsed: 0 });
      setNewTechSkill({ name: '', level: 50 });
      setIsAddingTech(false);
    }
  };

  const handleAddSoftSkill = () => {
    if (newSoftSkill) {
      onAdd('soft', newSoftSkill);
      setNewSoftSkill('');
      setIsAddingSoft(false);
    }
  };

  const getSkillColor = (level) => {
    if (level >= 80) return 'success';
    if (level >= 60) return 'primary';
    if (level >= 40) return 'warning';
    return 'error';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-lg font-bold text-slate-900 mb-6">Skills</h2>

      {/* Technical Skills */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-700">Technical Skills</h3>
          <button
            onClick={() => setIsAddingTech(true)}
            className="flex items-center gap-1 px-3 py-1.5 text-violet-600 hover:bg-violet-50 rounded-lg text-xs font-semibold transition-colors"
          >
            <AddIcon sx={{ fontSize: 16 }} />
            Add Skill
          </button>
        </div>

        <div className="space-y-4">
          {skills.technical.map((skill, index) => (
            <div key={index} className="group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700">{skill.name}</span>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <ThumbUpIcon sx={{ fontSize: 12 }} />
                    <span>{skill.endorsed}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">{skill.level}%</span>
                  <button
                    onClick={() => onDelete('technical', index)}
                    className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-600 transition-opacity"
                  >
                    <DeleteIcon sx={{ fontSize: 16 }} />
                  </button>
                </div>
              </div>
              <LinearProgress
                variant="determinate"
                value={skill.level}
                color={getSkillColor(skill.level)}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: '#e2e8f0',
                }}
              />
            </div>
          ))}

          {/* Add New Technical Skill */}
          {isAddingTech && (
            <div className="border border-violet-300 rounded-lg p-4 bg-violet-50">
              <input
                type="text"
                placeholder="Skill name (e.g., React, Python)"
                value={newTechSkill.name}
                onChange={(e) => setNewTechSkill({ ...newTechSkill, name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-200 mb-3"
              />
              <div className="mb-3">
                <label className="block text-xs text-slate-600 mb-2">
                  Proficiency Level: {newTechSkill.level}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newTechSkill.level}
                  onChange={(e) => setNewTechSkill({ ...newTechSkill, level: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAddTechSkill}
                  className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-700"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setIsAddingTech(false);
                    setNewTechSkill({ name: '', level: 50 });
                  }}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Soft Skills */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-700">Soft Skills</h3>
          <button
            onClick={() => setIsAddingSoft(true)}
            className="flex items-center gap-1 px-3 py-1.5 text-violet-600 hover:bg-violet-50 rounded-lg text-xs font-semibold transition-colors"
          >
            <AddIcon sx={{ fontSize: 16 }} />
            Add Skill
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.soft.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              onDelete={() => onDelete('soft', index)}
              deleteIcon={<DeleteIcon sx={{ fontSize: 16 }} />}
              sx={{
                fontSize: '0.875rem',
                backgroundColor: '#eff6ff',
                color: '#2563eb',
                fontWeight: 600,
                '& .MuiChip-deleteIcon': {
                  color: '#2563eb',
                  '&:hover': {
                    color: '#1d4ed8',
                  },
                },
              }}
            />
          ))}

          {/* Add New Soft Skill */}
          {isAddingSoft && (
            <div className="w-full mt-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Skill name (e.g., Leadership)"
                  value={newSoftSkill}
                  onChange={(e) => setNewSoftSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSoftSkill()}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-200"
                  autoFocus
                />
                <button
                  onClick={handleAddSoftSkill}
                  className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-700"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setIsAddingSoft(false);
                    setNewSoftSkill('');
                  }}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

SkillsSection.propTypes = {
  skills: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';

export default function AboutSection({ about, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(about || '');

  const handleSave = () => {
    onSave(text);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-900">About Me</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-violet-600 hover:text-violet-700"
          >
            <EditIcon sx={{ fontSize: 20 }} />
          </button>
        )}
      </div>

      {isEditing ? (
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-32 px-4 py-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-200 resize-none"
            placeholder="Tell us about yourself, your experience, and what you're looking for..."
          />
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-700"
            >
              Save
            </button>
            <button
              onClick={() => {
                setText(about);
                setIsEditing(false);
              }}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-slate-600 leading-relaxed">
          {about || (
            <span className="text-slate-400 italic">
              Add a summary about yourself to help recruiters know you better.
            </span>
          )}
        </p>
      )}
    </div>
  );
}

AboutSection.propTypes = {
  about: PropTypes.string,
  onSave: PropTypes.func.isRequired,
};
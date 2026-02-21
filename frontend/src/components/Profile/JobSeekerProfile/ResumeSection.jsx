import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import DescriptionIcon from '@mui/icons-material/Description';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function ResumeSection({ resumes, onUpload, onDelete, onSetDefault }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      onUpload(file);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const formatFileSize = (bytes) => {
    return bytes;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900">Resume</h2>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1 px-3 py-1.5 text-violet-600 hover:bg-violet-50 rounded-lg text-sm font-semibold transition-colors"
        >
          <CloudUploadIcon sx={{ fontSize: 18 }} />
          Upload Resume
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div className="space-y-3">
        {resumes.map((resume) => (
          <div
            key={resume.id}
            className="group flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <DescriptionIcon className="text-red-600" sx={{ fontSize: 24 }} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-slate-900 truncate">{resume.name}</h3>
                  {resume.default && (
                    <span className="px-2 py-0.5 bg-violet-100 text-violet-700 text-xs font-semibold rounded">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Uploaded on {resume.uploadDate} · {formatFileSize(resume.size)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onSetDefault(resume.id)}
                className="text-slate-400 hover:text-yellow-500"
                title={resume.default ? 'Default resume' : 'Set as default'}
              >
                {resume.default ? (
                  <StarIcon sx={{ fontSize: 20 }} className="text-yellow-500" />
                ) : (
                  <StarBorderIcon sx={{ fontSize: 20 }} />
                )}
              </button>
              <button className="text-slate-400 hover:text-violet-600" title="Download">
                <DownloadIcon sx={{ fontSize: 20 }} />
              </button>
              <button
                onClick={() => onDelete(resume.id)}
                className="text-slate-400 hover:text-red-600"
                title="Delete"
              >
                <DeleteIcon sx={{ fontSize: 20 }} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {resumes.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-lg">
          <CloudUploadIcon sx={{ fontSize: 48 }} className="text-slate-400 mb-2" />
          <p className="text-sm text-slate-600 mb-1">No resume uploaded</p>
          <p className="text-xs text-slate-500 mb-4">Upload your resume to apply for jobs</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-700"
          >
            Upload Resume
          </button>
        </div>
      )}

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-800">
          💡 <span className="font-semibold">Tip:</span> Upload multiple versions of your resume tailored for different roles. Set your preferred one as default.
        </p>
      </div>
    </div>
  );
}

ResumeSection.propTypes = {
  resumes: PropTypes.array.isRequired,
  onUpload: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSetDefault: PropTypes.func.isRequired,
};
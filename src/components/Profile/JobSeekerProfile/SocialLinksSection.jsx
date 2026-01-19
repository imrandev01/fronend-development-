import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import TwitterIcon from '@mui/icons-material/Twitter';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddLinkIcon from '@mui/icons-material/AddLink';

export default function SocialLinksSection({ socialLinks, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [links, setLinks] = useState(socialLinks);

  const handleSave = () => {
    onSave(links);
    setIsEditing(false);
  };

  const socialPlatforms = [
    { key: 'linkedin', label: 'LinkedIn', icon: LinkedInIcon, color: '#0077b5', placeholder: 'https://linkedin.com/in/username' },
    { key: 'github', label: 'GitHub', icon: GitHubIcon, color: '#333', placeholder: 'https://github.com/username' },
    { key: 'portfolio', label: 'Portfolio', icon: LanguageIcon, color: '#7c3aed', placeholder: 'https://yourwebsite.com' },
    { key: 'twitter', label: 'Twitter', icon: TwitterIcon, color: '#1DA1F2', placeholder: 'https://twitter.com/username' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-base md:text-lg font-bold text-slate-900">Social Links</h2>
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

      <div className="space-y-4">
        {socialPlatforms.map((platform) => {
          const IconComponent = platform.icon;
          return (
            <div key={platform.key}>
              <div className="flex items-center gap-2 mb-2">
                <IconComponent sx={{ fontSize: 20, color: platform.color }} />
                <label className="text-sm font-semibold text-slate-700">{platform.label}</label>
              </div>
              
              {isEditing ? (
                <input
                  type="url"
                  value={links[platform.key] || ''}
                  onChange={(e) => setLinks({ ...links, [platform.key]: e.target.value })}
                  placeholder={platform.placeholder}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-200"
                />
              ) : (
                <div className="min-w-0">
                  {links[platform.key] ? (
                    <a
                      href={links[platform.key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-violet-600 hover:text-violet-700 hover:underline break-all block truncate"
                      title={links[platform.key]}
                    >
                      {links[platform.key]}
                    </a>
                  ) : (
                    <p className="text-sm text-slate-400 italic">Not added</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!isEditing && Object.values(links).filter(Boolean).length === 0 && (
        <div className="text-center py-6 md:py-8 border-2 border-dashed border-slate-200 rounded-lg mt-6">
          <AddLinkIcon sx={{ fontSize: { xs: 40, md: 48 } }} className="text-slate-400 mb-2" />
          <p className="text-sm text-slate-600 mb-1">No social links added</p>
          <p className="text-xs text-slate-500 mb-4">Add your professional profiles to increase visibility</p>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-700"
          >
            Add Links
          </button>
        </div>
      )}
    </div>
  );
}

SocialLinksSection.propTypes = {
  socialLinks: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};
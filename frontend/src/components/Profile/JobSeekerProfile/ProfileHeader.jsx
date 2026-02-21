import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WorkIcon from '@mui/icons-material/Work';

export default function ProfileHeader({ profile, onEdit }) {
  const [isEditingHeadline, setIsEditingHeadline] = useState(false);
  const [headline, setHeadline] = useState(profile.headline);

  const handleSaveHeadline = () => {
    onEdit('headline', headline);
    setIsEditingHeadline(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Cover Image */}
      <div className="h-24 md:h-32 bg-gradient-to-r from-violet-600 to-purple-600 relative">
        <button className="absolute top-2 md:top-4 right-2 md:right-4 px-2 md:px-3 py-1 md:py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-lg text-xs font-semibold hover:bg-white/30 transition-colors flex items-center gap-1">
          <CameraAltIcon sx={{ fontSize: 14 }} />
          <span className="hidden sm:inline">Change Cover</span>
        </button>
      </div>

      <div className="px-4 md:px-6 pb-4 md:pb-6">
        {/* Profile Picture */}
        <div className="relative -mt-12 md:-mt-16 mb-3 md:mb-4">
          <div className="relative inline-block">
            <img
              src={profile.profilePicture}
              alt={`${profile.firstName} ${profile.lastName}`}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <button className="absolute bottom-1 md:bottom-2 right-1 md:right-2 w-7 h-7 md:w-8 md:h-8 bg-violet-600 text-white rounded-full flex items-center justify-center hover:bg-violet-700 transition-colors shadow-lg">
              <CameraAltIcon sx={{ fontSize: { xs: 14, md: 16 } }} />
            </button>
          </div>
        </div>

        {/* Name, Headline and Stats Container */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          {/* Left: Name and Info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
              {profile.firstName} {profile.lastName}
            </h1>

            {isEditingHeadline ? (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-2">
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="flex-1 px-3 py-2 border border-violet-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-200"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveHeadline}
                    className="flex-1 sm:flex-none px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setHeadline(profile.headline);
                      setIsEditingHeadline(false);
                    }}
                    className="flex-1 sm:flex-none px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2">
                <p className="text-sm md:text-base text-slate-600 flex-1">{profile.headline}</p>
                <button
                  onClick={() => setIsEditingHeadline(true)}
                  className="text-violet-600 hover:text-violet-700 flex-shrink-0"
                >
                  <EditIcon sx={{ fontSize: 16 }} />
                </button>
              </div>
            )}

            {/* Contact Info - Stacks on mobile */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 mt-3 text-xs md:text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <LocationOnIcon sx={{ fontSize: 16 }} />
                <span className="truncate">{profile.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <EmailIcon sx={{ fontSize: 16 }} />
                <span className="truncate">{profile.email}</span>
              </div>
              <div className="flex items-center gap-1">
                <PhoneIcon sx={{ fontSize: 16 }} />
                <span>{profile.phone}</span>
              </div>
            </div>
          </div>

          {/* Right: Quick Stats - Stacks on mobile */}
          <div className="flex sm:flex-row gap-4 sm:gap-6 lg:flex-col lg:gap-4">
            <div className="text-center flex-1 sm:flex-none">
              <div className="flex items-center justify-center gap-1 text-violet-600">
                <VisibilityIcon sx={{ fontSize: 18 }} />
                <span className="text-lg md:text-xl font-bold">{profile.stats.profileViews}</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Profile Views</p>
            </div>
            <div className="text-center flex-1 sm:flex-none">
              <div className="flex items-center justify-center gap-1 text-blue-600">
                <WorkIcon sx={{ fontSize: 18 }} />
                <span className="text-lg md:text-xl font-bold">{profile.stats.applicationsSubmitted}</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Applications</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
};
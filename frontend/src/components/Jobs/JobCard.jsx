import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PeopleIcon from '@mui/icons-material/People';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export default function JobCard({ job }) {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  const handleCardClick = (e) => {
    // Don't navigate if Apply button or Save button was clicked
    if (e.target.closest('.apply-button') || e.target.closest('.save-button')) {
      return;
    }
    navigate(`/jobs/${job.id}`);
  };

  const handleApply = (e) => {
    e.stopPropagation();
    console.log('Apply to job:', job.id);
    // Implement apply logic
  };

  const handleSave = (e) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
    console.log(isSaved ? 'Unsaved job:' : 'Saved job:', job.id);
    // Implement save/unsave logic
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white border border-slate-200 rounded-lg md:rounded-xl p-3 md:p-5 hover:shadow-lg hover:border-violet-300 transition-all duration-300 cursor-pointer group"
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleCardClick(e)}
    >
      {/* Header: Logo and Company */}
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="flex items-start gap-2 md:gap-3 flex-1">
          {/* Company Logo - Smaller on mobile */}
          <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-100 rounded-md md:rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
            <img
              src={job.companyLogo}
              alt={`${job.company} logo`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Job Title and Company */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm md:text-base font-bold text-slate-900 mb-0.5 md:mb-1 group-hover:text-violet-600 transition-colors line-clamp-2">
              {job.title}
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/company/${job.company}`);
              }}
              className="text-xs md:text-sm text-slate-600 hover:text-violet-600 font-medium hover:underline"
            >
              {job.company}
            </button>
          </div>
        </div>

        {/* Posted Badge - Smaller on mobile */}
        <span className="text-[0.625rem] md:text-xs text-slate-500 bg-slate-100 px-1.5 md:px-2 py-0.5 md:py-1 rounded whitespace-nowrap">
          {job.postedDate}
        </span>
      </div>

      {/* Job Meta Information - Compact on mobile */}
      <div className="flex flex-wrap gap-2 md:gap-4 mb-3 md:mb-4">
        <div className="flex items-center gap-1 md:gap-1.5 text-[0.625rem] md:text-xs text-slate-600">
          <WorkIcon sx={{ fontSize: { xs: 12, md: 14 } }} className="text-slate-400" />
          <span>{job.experience}</span>
        </div>
        <div className="flex items-center gap-1 md:gap-1.5 text-[0.625rem] md:text-xs text-slate-600">
          <AccountBalanceWalletIcon sx={{ fontSize: { xs: 12, md: 14 } }} className="text-slate-400" />
          <span>₹ {job.salary}</span>
        </div>
        <div className="flex items-center gap-1 md:gap-1.5 text-[0.625rem] md:text-xs text-slate-600">
          <LocationOnIcon sx={{ fontSize: { xs: 12, md: 14 } }} className="text-slate-400" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1 md:gap-1.5 text-[0.625rem] md:text-xs text-slate-600">
          <PeopleIcon sx={{ fontSize: { xs: 12, md: 14 } }} className="text-slate-400" />
          <span>{job.applicants} applicants</span>
        </div>
      </div>

      {/* Job Tags - Smaller on mobile */}
      <div className="mb-3 md:mb-4">
        <p className="text-[0.625rem] md:text-xs text-slate-500 line-clamp-2">
          {job.tags.join(' · ')}
        </p>
      </div>

      {/* Action Buttons - Save (Left) and Apply (Right) */}
      <div className="flex items-center justify-between gap-2">
        {/* Save Button */}
        <button
          onClick={handleSave}
          className="save-button flex items-center justify-center w-8 h-8 md:w-9 md:h-9 border border-slate-300 hover:border-violet-400 rounded-lg text-slate-600 hover:text-violet-600 transition-all duration-300"
          aria-label={isSaved ? 'Unsave job' : 'Save job'}
        >
          {isSaved ? (
            <BookmarkIcon sx={{ fontSize: { xs: 16, md: 18 } }} className="text-violet-600" />
          ) : (
            <BookmarkBorderIcon sx={{ fontSize: { xs: 16, md: 18 } }} />
          )}
        </button>

        {/* Apply Button - Smaller and right-aligned */}
        <button
          onClick={handleApply}
          className="apply-button px-4 md:px-6 py-1.5 md:py-2 bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] text-white rounded-md md:rounded-lg text-xs md:text-sm font-semibold hover:shadow-md transition-all duration-300"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}

JobCard.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    companyLogo: PropTypes.string.isRequired,
    experience: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    postedDate: PropTypes.string.isRequired,
    applicants: PropTypes.number.isRequired,
  }).isRequired,
};
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import JobSeekerSignupModal from './JobSeekerSignupModal';
import EmployerSignupModal from './EmployerSignup/EmployerSignupModal';
import Button from '../Common/Button';

export default function SignupModal({ isOpen, onClose, onSwitchToLogin }) {
  const [selectedType, setSelectedType] = useState(null);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    onClose();
    setSelectedType(null);
  };

  // Show Job Seeker Signup Modal
  if (selectedType === 'jobseeker') {
    return (
      <JobSeekerSignupModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        onSwitchToLogin={onSwitchToLogin}
      />
    );
  }

  // Show Employer Signup Modal
  if (selectedType === 'employer') {
    return (
      <EmployerSignupModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        onSwitchToLogin={onSwitchToLogin}
      />
    );
  }

  // Show user type selection
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"></div>

      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md animate-slide-up">
        {/* Close Button */}
        <Button
          onClick={handleCloseModal}
          variant="default"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors z-10"
          aria-label="Close modal"
        >
          <CloseIcon sx={{ fontSize: 24 }} />
        </Button>

        {/* Modal Content */}
        <div className="p-8">
          {/* Logo & Title */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] rounded-xl mb-3">
              <WorkIcon className="text-white" sx={{ fontSize: 24 }} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">
              Join SUMPRO
            </h2>
            <p className="text-sm text-slate-500">
              Choose your account type to get started
            </p>
          </div>

          {/* User Type Selection Cards */}
          <div className="space-y-3">
            {/* Job Seeker Card */}
            <Button
              onClick={() => setSelectedType('jobseeker')}
              variant="default"
              className="w-full p-5 border-2 border-slate-200 rounded-xl hover:border-violet-400 hover:bg-violet-50 transition-all duration-200 text-left group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center group-hover:bg-violet-200 transition-colors">
                  <PersonIcon className="text-violet-600" sx={{ fontSize: 24 }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    Job Seeker
                  </h3>
                  <p className="text-sm text-slate-600">
                    Search and apply for jobs, build your resume, and track applications
                  </p>
                </div>
              </div>
            </Button>

            {/* Employer Card */}
            <Button
              onClick={() => setSelectedType('employer')}
              variant="default"
              className="w-full p-5 border-2 border-slate-200 rounded-xl hover:border-violet-400 hover:bg-violet-50 transition-all duration-200 text-left group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                  <BusinessIcon className="text-indigo-600" sx={{ fontSize: 24 }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    Employer
                  </h3>
                  <p className="text-sm text-slate-600">
                    Post jobs, find candidates, and manage your hiring process
                  </p>
                </div>
              </div>
            </Button>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{' '}
              <Button
                onClick={onSwitchToLogin}
                variant="default"
                className="text-violet-600 hover:text-violet-700 font-semibold"
              >
                Sign in
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

SignupModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSwitchToLogin: PropTypes.func,
};

SignupModal.defaultProps = {
  onSwitchToLogin: () => console.log('Switch to login'),
};
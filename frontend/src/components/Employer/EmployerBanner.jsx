// src/components/Employer/EmployerBanner.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkOutline, Login, PostAdd, Lock } from '@mui/icons-material';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import PropTypes from 'prop-types';

// Import your existing modals
import EmployerSignupModal from '../Auth/EmployerSignup/EmployerSignupModal';
import LoginModal from '../Auth/LoginModal';

export default function EmployerBanner({ isVerified = false }) {
  const navigate = useNavigate();
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  
  // Modal states
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handlePostJobClick = () => {
    if (!isVerified) {
      setShowVerificationDialog(true);
    } else {
      navigate('/employer/post-job');
    }
  };

  // Handle switching from signup to login
  const handleSwitchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  // Handle switching from login to signup
  const handleSwitchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  // ✅ Navigate to Company Verification Form
  const handleCompleteVerification = () => {
    setShowVerificationDialog(false);
    navigate('/employer/verify-company');
  };

  return (
    <>
      <section className="relative bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Content */}
            <div className="text-white">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 md:mb-6">
                Connecting Verified Employers with the{' '}
                <span className="text-amber-300">Right Talent</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-violet-100 mb-6 md:mb-8 max-w-xl">
                From startups to enterprises — hire confidently with verified companies and real
                candidates.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => setShowSignupModal(true)}
                  className="group px-6 py-3 bg-white text-violet-700 rounded-lg font-semibold text-sm sm:text-base hover:bg-violet-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <WorkOutline sx={{ fontSize: 20 }} />
                  Register as Employer
                </button>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg font-semibold text-sm sm:text-base hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Login sx={{ fontSize: 20 }} />
                  Sign In
                </button>
              </div>

              {/* Post Job Button */}
              <div className="mt-6">
                <button
                  onClick={handlePostJobClick}
                  className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                    isVerified
                      ? 'bg-amber-400 text-violet-900 hover:bg-amber-300 shadow-lg hover:shadow-xl'
                      : 'bg-white/20 backdrop-blur-sm text-white border-2 border-white/40 hover:bg-white/30'
                  }`}
                >
                  {isVerified ? (
                    <>
                      <PostAdd sx={{ fontSize: 20 }} />
                      Post a Job Now
                    </>
                  ) : (
                    <>
                      <Lock sx={{ fontSize: 20 }} />
                      Post a Job (Verification Required)
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-full max-w-md">
                <div className="aspect-square bg-white/10 backdrop-blur-md rounded-3xl p-8 flex items-center justify-center border border-white/20">
                  <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-2xl flex items-center justify-center">
                    <svg
                      className="w-3/4 h-3/4 text-white/80"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-amber-300 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-violet-300 rounded-full blur-xl opacity-50 animate-pulse delay-75"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verification Required Dialog */}
      <Dialog
        open={showVerificationDialog}
        onClose={() => setShowVerificationDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxWidth: 400,
          },
        }}
      >
        <DialogTitle className="flex items-center gap-2 text-amber-600">
          <Lock />
          <span className="font-bold">Verification Required</span>
        </DialogTitle>
        <DialogContent>
          <p className="text-slate-700 mb-3">
            You need to complete company verification before you can post jobs.
          </p>
          <p className="text-sm text-slate-600">
            Verification helps us maintain trust and ensures quality job postings on our platform.
          </p>
        </DialogContent>
        <DialogActions className="p-4 pt-0">
          <Button
            onClick={() => setShowVerificationDialog(false)}
            sx={{
              color: '#64748b',
              '&:hover': {
                backgroundColor: '#f1f5f9',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCompleteVerification} // ✅ Updated handler
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5568d3 0%, #6941a0 100%)',
              },
            }}
          >
            Complete Verification
          </Button>
        </DialogActions>
      </Dialog>

      {/* Employer Signup Modal */}
      <EmployerSignupModal 
        isOpen={showSignupModal} 
        onClose={() => setShowSignupModal(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onSwitchToSignup={handleSwitchToSignup}
      />
    </>
  );
}

EmployerBanner.propTypes = {
  isVerified: PropTypes.bool,
};
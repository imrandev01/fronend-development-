import React from 'react';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VerifiedIcon from '@mui/icons-material/Verified';

export default function RegistrationSuccess({ onGoToDashboard }) {
  return (
    <div className="text-center py-8">
      {/* Success Icon */}
      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
        <CheckCircleIcon className="text-green-600" sx={{ fontSize: 48 }} />
      </div>

      {/* Success Message */}
      <h2 className="text-2xl font-bold text-slate-900 mb-2">
        Account Created Successfully!
      </h2>
      <p className="text-sm text-slate-600 mb-8 max-w-sm mx-auto">
        Welcome aboard! Your employer account has been created.
      </p>

      {/* Important Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-8 text-left max-w-md mx-auto">
        <div className="flex gap-3">
          <VerifiedIcon className="text-amber-600 flex-shrink-0" sx={{ fontSize: 24 }} />
          <div>
            <h3 className="text-sm font-semibold text-amber-900 mb-2">
              Complete Company Verification
            </h3>
            <p className="text-xs text-amber-800 leading-relaxed">
              To post jobs and access our candidate database, please complete your company
              verification from your dashboard. This helps us maintain quality and trust on our
              platform.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={onGoToDashboard}
        className="inline-flex items-center gap-2 px-8 py-3 bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
      >
        <DashboardIcon sx={{ fontSize: 20 }} />
        Welcome to Home
      </button>

      {/* Additional Info */}
      <p className="text-xs text-slate-500 mt-6">
        You can setup your company profile, explore features, and prepare job postings while
        verification is in progress.
      </p>
    </div>
  );
}

RegistrationSuccess.propTypes = {
  onGoToDashboard: PropTypes.func.isRequired,
};
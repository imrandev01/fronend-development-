import React from 'react';
import WorkIcon from '@mui/icons-material/Work';

export default function FooterLogo() {
  return (
    <div className="mb-6">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] rounded-lg flex items-center justify-center">
          <WorkIcon className="text-white" sx={{ fontSize: 18 }} />
        </div>
        <span className="text-lg font-bold bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] bg-clip-text text-transparent">
          JobPortal
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-600 max-w-xs leading-relaxed">
        Your trusted partner in finding the perfect career opportunity. 
        Connect with top companies and land your dream job.
      </p>
    </div>
  );
}
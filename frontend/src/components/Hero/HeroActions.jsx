import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginModal from '../Auth/LoginModal';
import SignupModal from '../Auth/SignupModal';
import Button from '../Common/Button';

export default function HeroActions() {
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const actionButtons = [
    {
      label: 'Start as Guest',
      icon: <PersonOutlineIcon sx={{ fontSize: 16 }} />,
      action: () => navigate('/jobs'), // ✅ CHANGED FROM '/guest' TO '/jobs'
      variant: 'outlined',
    },
    {
      label: 'Sign In',
      icon: <LoginIcon sx={{ fontSize: 16 }} />,
      action: () => setIsLoginModalOpen(true),
      variant: 'outlined',
    },
    {
      label: 'Register Now',
      icon: <HowToRegIcon sx={{ fontSize: 16 }} />,
      action: () => setIsSignupModalOpen(true),
      variant: 'gradient',
    },
  ];

  const getButtonClasses = (variant) => {
    const baseClasses = "flex items-center gap-1.5 px-4 py-1.5 rounded-3xl text-[0.8125rem] font-semibold transition-all duration-300";
    
    if (variant === 'gradient') {
      return `${baseClasses} bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] text-white shadow-[0_2px_8px_rgba(102,126,234,0.25)] hover:shadow-[0_3px_12px_rgba(102,126,234,0.4)] hover:bg-[linear-gradient(135deg,#5568d3_0%,#6a3f92_100%)]`;
    }
    
    return `${baseClasses} border border-slate-300 text-slate-700 hover:border-violet-600 hover:bg-violet-50 hover:text-violet-600`;
  };

  const handleSwitchToSignup = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsSignupModalOpen(false);
    setIsLoginModalOpen(true);
  };

  return (
    <>
      <div className="flex justify-center gap-2 flex-wrap mb-8">
        {actionButtons.map((button) => (
          <Button
            key={button.label}
            onClick={button.action}
            variant="default"
            className={getButtonClasses(button.variant)}
          >
            {button.icon}
            {button.label}
          </Button>
        ))}
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToSignup={handleSwitchToSignup}
      />

      {/* Signup Modal (Router - shows user type selection) */}
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  );
}
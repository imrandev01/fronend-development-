// src/components/Auth/EmployerSignup/EmployerSignupModal.jsx

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailOTPVerification from './EmailOTPVerification';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import RegistrationSuccess from './RegistrationSuccess';
import { isFreeEmail, countryCodes, validatePassword } from './utils';
import Button from '../../Common/Button';

export default function EmployerSignupModal({ isOpen, onClose, onSwitchToLogin }) {
  const [currentStep, setCurrentStep] = useState(1); // 1: Form, 2: Email OTP, 3: Success
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    countryCode: '+91',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.workEmail) {
      newErrors.workEmail = 'Work email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.workEmail)) {
      newErrors.workEmail = 'Email is invalid';
    } else if (isFreeEmail(formData.workEmail)) {
      newErrors.workEmail = 'Please use your official company email address';
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit mobile number';
    }

    const passwordReqs = validatePassword(formData.password);
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordReqs.minLength || !passwordReqs.hasUppercase || !passwordReqs.hasLowercase || !passwordReqs.hasNumber) {
      newErrors.password = 'Password does not meet requirements';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must accept the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Send email OTP
      console.log('Sending email OTP to:', formData.workEmail);
      setCurrentStep(2);
    }
  };

  const handleEmailVerify = (otp) => {
    console.log('Email verified with OTP:', otp);
    // Complete registration - skip phone OTP
    console.log('Registration complete:', formData);
    setCurrentStep(3); // Go directly to success
  };

  const handleResendEmailOTP = () => {
    console.log('Resending email OTP');
  };

  const handleGoToDashboard = () => {
    console.log('Navigating to dashboard');
    // Navigate to employer dashboard
    handleCloseModal();
  };

  const handleCloseModal = () => {
    onClose();
    setCurrentStep(1);
    setFormData({
      fullName: '',
      workEmail: '',
      countryCode: '+91',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    });
    setErrors({});
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"></div>

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-slide-up">
        <Button
          onClick={handleCloseModal}
          variant="default"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors z-10"
          aria-label="Close modal"
        >
          <CloseIcon sx={{ fontSize: 24 }} />
        </Button>

        <div className="p-8">
          {/* Step 1: Registration Form */}
          {currentStep === 1 && (
            <>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] rounded-xl mb-3">
                  <BusinessIcon className="text-white" sx={{ fontSize: 24 }} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">
                  Employer Registration
                </h2>
                <p className="text-sm text-slate-500">
                  Find the perfect candidates for your company
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PersonIcon className="text-slate-400" sx={{ fontSize: 18 }} />
                    </div>
                    <input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.fullName
                          ? 'border-red-300 focus:ring-red-200'
                          : 'border-slate-200 focus:ring-violet-200 focus:border-violet-400'
                      }`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
                  )}
                </div>

                {/* Work Email */}
                <div>
                  <label htmlFor="workEmail" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Work Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <EmailIcon className="text-slate-400" sx={{ fontSize: 18 }} />
                    </div>
                    <input
                      id="workEmail"
                      type="email"
                      value={formData.workEmail}
                      onChange={(e) => handleChange('workEmail', e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.workEmail
                          ? 'border-red-300 focus:ring-red-200'
                          : 'border-slate-200 focus:ring-violet-200 focus:border-violet-400'
                      }`}
                      placeholder="john@company.com"
                    />
                  </div>
                  {errors.workEmail && (
                    <p className="mt-1 text-xs text-red-600">{errors.workEmail}</p>
                  )}
                  <p className="mt-1 text-xs text-slate-500">
                    Please use your official company email address.
                  </p>
                </div>

                {/* Mobile Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Mobile Number
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={formData.countryCode}
                      onChange={(e) => handleChange('countryCode', e.target.value)}
                      className="w-28 px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400"
                    >
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.code}
                        </option>
                      ))}
                    </select>
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <PhoneIcon className="text-slate-400" sx={{ fontSize: 18 }} />
                      </div>
                      <input
                        id="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => handleChange('phoneNumber', e.target.value.replace(/\D/g, ''))}
                        maxLength={10}
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.phoneNumber
                            ? 'border-red-300 focus:ring-red-200'
                            : 'border-slate-200 focus:ring-violet-200 focus:border-violet-400'
                        }`}
                        placeholder="9876543210"
                      />
                    </div>
                  </div>
                  {errors.phoneNumber && (
                    <p className="mt-1 text-xs text-red-600">{errors.phoneNumber}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockIcon className="text-slate-400" sx={{ fontSize: 18 }} />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      className={`w-full pl-10 pr-10 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.password
                          ? 'border-red-300 focus:ring-red-200'
                          : 'border-slate-200 focus:ring-violet-200 focus:border-violet-400'
                      }`}
                      placeholder="Create a strong password"
                    />
                    <Button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      variant="default"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon sx={{ fontSize: 18 }} />
                      ) : (
                        <VisibilityIcon sx={{ fontSize: 18 }} />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                  )}
                  <PasswordStrengthIndicator password={formData.password} />
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockIcon className="text-slate-400" sx={{ fontSize: 18 }} />
                    </div>
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                      className={`w-full pl-10 pr-10 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.confirmPassword
                          ? 'border-red-300 focus:ring-red-200'
                          : 'border-slate-200 focus:ring-violet-200 focus:border-violet-400'
                      }`}
                      placeholder="Re-enter password"
                    />
                    <Button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      variant="default"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? (
                        <VisibilityOffIcon sx={{ fontSize: 18 }} />
                      ) : (
                        <VisibilityIcon sx={{ fontSize: 18 }} />
                      )}
                    </Button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Terms */}
                <div>
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={(e) => handleChange('agreeToTerms', e.target.checked)}
                      className={`w-4 h-4 mt-0.5 text-violet-600 border-slate-300 rounded focus:ring-violet-500 focus:ring-2 cursor-pointer ${
                        errors.agreeToTerms ? 'border-red-300' : ''
                      }`}
                    />
                    <span className="ml-2 text-xs text-slate-600">
                      I agree to the{' '}
                      <Button type="button" variant="default" className="text-violet-600 hover:text-violet-700 font-medium underline">
                        Terms of Service
                      </Button>{' '}
                      and{' '}
                      <Button type="button" variant="default" className="text-violet-600 hover:text-violet-700 font-medium underline">
                        Privacy Policy
                      </Button>
                    </span>
                  </label>
                  {errors.agreeToTerms && (
                    <p className="mt-1 text-xs text-red-600">{errors.agreeToTerms}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-2.5 text-sm"
                >
                  Create Employer Account
                </Button>
              </form>

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
            </>
          )}

          {/* Step 2: Email OTP Verification */}
          {currentStep === 2 && (
            <EmailOTPVerification
              email={formData.workEmail}
              onVerify={handleEmailVerify}
              onResend={handleResendEmailOTP}
            />
          )}

          {/* Step 3: Success Screen */}
          {currentStep === 3 && (
            <RegistrationSuccess onGoToDashboard={handleGoToDashboard} />
          )}
        </div>
      </div>
    </div>
  );
}

EmployerSignupModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSwitchToLogin: PropTypes.func,
};
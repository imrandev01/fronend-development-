import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import EmailIcon from '@mui/icons-material/Email';
import RefreshIcon from '@mui/icons-material/Refresh';
import Button from '../../Common/Button';

export default function EmailOTPVerification({ email, onVerify, onResend }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all filled
    if (newOtp.every((digit) => digit !== '') && index === 5) {
      handleVerify(newOtp.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
    setOtp(newOtp);

    if (newOtp.every((digit) => digit !== '')) {
      handleVerify(newOtp.join(''));
    }
  };

  const handleVerify = (otpCode) => {
    // Simulate API call
    console.log('Verifying OTP:', otpCode);
    onVerify(otpCode);
  };

  const handleResend = () => {
    if (!canResend) return;
    setTimer(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    onResend();
  };

  return (
    <div className="p-6 bg-violet-50 border border-violet-200 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <EmailIcon className="text-violet-600" sx={{ fontSize: 20 }} />
        <h3 className="text-sm font-semibold text-slate-900">Verify Your Email</h3>
      </div>

      <p className="text-xs text-slate-600 mb-4">
        We've sent a 6-digit code to <span className="font-semibold">{email}</span>
      </p>

      <div className="flex gap-2 mb-4" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-10 h-10 text-center text-lg font-semibold border-2 border-slate-300 rounded-lg focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all"
            autoFocus={index === 0}
          />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <Button
          type="button"
          onClick={handleResend}
          disabled={!canResend}
          variant="default"
          className={`flex items-center gap-1 text-xs font-semibold ${
            canResend
              ? 'text-violet-600 hover:text-violet-700'
              : 'text-slate-400 cursor-not-allowed'
          }`}
        >
          <RefreshIcon sx={{ fontSize: 14 }} />
          Resend Code
        </Button>
        {!canResend && (
          <span className="text-xs text-slate-500">Resend in {timer}s</span>
        )}
      </div>
    </div>
  );
}

EmailOTPVerification.propTypes = {
  email: PropTypes.string.isRequired,
  onVerify: PropTypes.func.isRequired,
  onResend: PropTypes.func.isRequired,
};
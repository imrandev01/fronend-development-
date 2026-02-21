import React from 'react';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { calculatePasswordStrength, getPasswordStrengthInfo, validatePassword } from './utils';

export default function PasswordStrengthIndicator({ password }) {
  const strength = calculatePasswordStrength(password);
  const { label, color, textColor } = getPasswordStrengthInfo(strength);
  const requirements = validatePassword(password);

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      {/* Strength Bar */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-slate-600">Password Strength:</span>
          <span className={`text-xs font-semibold ${textColor}`}>{label}</span>
        </div>
        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${color} transition-all duration-300`}
            style={{ width: `${strength}%` }}
          />
        </div>
      </div>

      {/* Requirements Checklist */}
      <div className="grid grid-cols-2 gap-1">
        <div className="flex items-center gap-1">
          {requirements.minLength ? (
            <CheckCircleIcon sx={{ fontSize: 14 }} className="text-green-600" />
          ) : (
            <CancelIcon sx={{ fontSize: 14 }} className="text-slate-300" />
          )}
          <span className={`text-xs ${requirements.minLength ? 'text-green-600' : 'text-slate-500'}`}>
            8+ characters
          </span>
        </div>
        <div className="flex items-center gap-1">
          {requirements.hasUppercase ? (
            <CheckCircleIcon sx={{ fontSize: 14 }} className="text-green-600" />
          ) : (
            <CancelIcon sx={{ fontSize: 14 }} className="text-slate-300" />
          )}
          <span className={`text-xs ${requirements.hasUppercase ? 'text-green-600' : 'text-slate-500'}`}>
            Uppercase
          </span>
        </div>
        <div className="flex items-center gap-1">
          {requirements.hasLowercase ? (
            <CheckCircleIcon sx={{ fontSize: 14 }} className="text-green-600" />
          ) : (
            <CancelIcon sx={{ fontSize: 14 }} className="text-slate-300" />
          )}
          <span className={`text-xs ${requirements.hasLowercase ? 'text-green-600' : 'text-slate-500'}`}>
            Lowercase
          </span>
        </div>
        <div className="flex items-center gap-1">
          {requirements.hasNumber ? (
            <CheckCircleIcon sx={{ fontSize: 14 }} className="text-green-600" />
          ) : (
            <CancelIcon sx={{ fontSize: 14 }} className="text-slate-300" />
          )}
          <span className={`text-xs ${requirements.hasNumber ? 'text-green-600' : 'text-slate-500'}`}>
            Number
          </span>
        </div>
      </div>
    </div>
  );
}

PasswordStrengthIndicator.propTypes = {
  password: PropTypes.string.isRequired,
};
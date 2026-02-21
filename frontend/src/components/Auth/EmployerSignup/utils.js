// Free email providers to block
export const freeEmailProviders = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'live.com',
  'aol.com',
  'icloud.com',
  'mail.com',
  'protonmail.com',
  'zoho.com',
  'yandex.com',
];

// Check if email is from free provider
export const isFreeEmail = (email) => {
  const domain = email.split('@')[1]?.toLowerCase();
  return freeEmailProviders.includes(domain);
};

// Password strength calculation
export const calculatePasswordStrength = (password) => {
  let strength = 0;
  
  if (password.length >= 8) strength += 25;
  if (password.length >= 12) strength += 10;
  if (/[a-z]/.test(password)) strength += 20;
  if (/[A-Z]/.test(password)) strength += 20;
  if (/[0-9]/.test(password)) strength += 20;
  if (/[^a-zA-Z0-9]/.test(password)) strength += 15;
  
  return Math.min(strength, 100);
};

// Get strength label and color
export const getPasswordStrengthInfo = (strength) => {
  if (strength < 30) {
    return { label: 'Weak', color: 'bg-red-500', textColor: 'text-red-600' };
  } else if (strength < 60) {
    return { label: 'Fair', color: 'bg-orange-500', textColor: 'text-orange-600' };
  } else if (strength < 80) {
    return { label: 'Good', color: 'bg-yellow-500', textColor: 'text-yellow-600' };
  } else {
    return { label: 'Strong', color: 'bg-green-500', textColor: 'text-green-600' };
  }
};

// Country codes for phone
export const countryCodes = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'USA', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
];

// Validate password requirements
export const validatePassword = (password) => {
  return {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
  };
};
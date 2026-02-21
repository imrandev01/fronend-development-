import React from 'react';
import PropTypes from 'prop-types';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { socialLoginProviders } from './authData';
import Button from '../Common/Button';

const iconMap = {
  google: GoogleIcon,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
};

export default function SocialLogin({ type = 'login' }) {
  const handleSocialLogin = (provider) => {
    console.log(`${type} with ${provider}`);
    // Implement social authentication logic here
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-2 bg-white text-slate-500">
            Or {type === 'login' ? 'continue' : 'sign up'} with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {socialLoginProviders.map((provider) => {
          const Icon = iconMap[provider.icon];
          return (
            <Button
              key={provider.name}
              onClick={() => handleSocialLogin(provider.name)}
              variant="default"
              className={`flex items-center justify-center px-3 py-2 border border-slate-200 rounded-lg text-slate-600 transition-all duration-200 ${provider.color}`}
              aria-label={`${type === 'login' ? 'Login' : 'Sign up'} with ${provider.name}`}
            >
              <Icon sx={{ fontSize: 18 }} />
            </Button>
          );
        })}
      </div>
    </div>
  );
}

SocialLogin.propTypes = {
  type: PropTypes.oneOf(['login', 'signup']),
};
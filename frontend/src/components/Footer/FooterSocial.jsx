import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { socialLinks } from './footerData';

const iconMap = {
  linkedin: LinkedInIcon,
  twitter: TwitterIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YouTubeIcon,
};

export default function FooterSocial() {
  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex items-center gap-3">
      {socialLinks.map((social) => {
        const Icon = iconMap[social.icon];
        return (
          <button
            key={social.name}
            onClick={() => handleSocialClick(social.url)}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-violet-100 flex items-center justify-center text-slate-600 hover:text-violet-600 transition-all duration-300 hover:scale-110"
            aria-label={social.name}
          >
            <Icon sx={{ fontSize: 18 }} />
          </button>
        );
      })}
    </div>
  );
}
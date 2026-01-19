import React from 'react';
import FooterLogo from './FooterLogo';
import FooterLinks from './FooterLinks';
import FooterNewsletter from './FooterNewsletter';
import FooterSocial from './FooterSocial';
import FooterBottom from './FooterBottom';
import { footerLinks } from './footerData';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo & Description - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <FooterLogo />
            <div className="mt-2">
              <FooterSocial />
            </div>
          </div>

          {/* For Job Seekers */}
          <FooterLinks
            title={footerLinks.jobSeekers.title}
            links={footerLinks.jobSeekers.links}
          />

          {/* For Employers */}
          <FooterLinks
            title={footerLinks.employers.title}
            links={footerLinks.employers.links}
          />

          {/* Company */}
          <FooterLinks
            title={footerLinks.company.title}
            links={footerLinks.company.links}
          />

          {/* Newsletter - Takes 1 column */}
          <div>
            <FooterNewsletter />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <FooterBottom />
    </footer>
  );
}
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { legalLinks } from './footerData';

export default function FooterBottom() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t border-slate-200 mt-10 pt-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-xs text-slate-500 text-center md:text-left">
            © {currentYear} JobPortal. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {legalLinks.map((link, index) => (
              <React.Fragment key={link.path}>
                <button
                  onClick={() => navigate(link.path)}
                  className="text-xs text-slate-500 hover:text-violet-600 transition-colors duration-200"
                >
                  {link.label}
                </button>
                {index < legalLinks.length - 1 && (
                  <span className="text-slate-300">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
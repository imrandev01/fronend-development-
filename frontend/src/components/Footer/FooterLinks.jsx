import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function FooterLinks({ title, links }) {
  const navigate = useNavigate();

  return (
    <div>
      <h3 className="text-sm font-bold text-slate-900 mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.path}>
            <button
              onClick={() => navigate(link.path)}
              className="text-sm text-slate-600 hover:text-violet-600 transition-colors duration-200 text-left"
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

FooterLinks.propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};
import PropTypes from 'prop-types';
import { Button as MuiButton } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';

const Button = ({ 
  variant = 'primary',
  onClick, 
  children, 
  className = '',
  fullWidth = false,
  showDropdownIcon = false,
  isDropdownOpen = false,
  type = 'button',
  disabled = false
}) => {
  
  // ==========================================
  // VARIANT: PRIMARY GRADIENT BUTTON
  // ==========================================
  if (variant === 'primary') {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`
          px-4 py-1.5 
          bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] 
          text-white 
          rounded-lg 
          text-sm 
          font-semibold 
          hover:shadow-md 
          transition-all 
          duration-300
          disabled:opacity-50 
          disabled:cursor-not-allowed
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `.trim()}
      >
        {children}
      </button>
    );
  }

  // ==========================================
  // VARIANT: MOBILE MENU BUTTON
  // ==========================================
  if (variant === 'mobile-menu') {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`
          px-3 py-1.5 
          text-left 
          rounded-lg 
          hover:bg-violet-50 
          text-sm 
          font-medium 
          text-slate-700 
          hover:text-violet-600 
          transition-colors
          disabled:opacity-50 
          disabled:cursor-not-allowed
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `.trim()}
      >
        {children}
      </button>
    );
  }

  // ==========================================
  // VARIANT: MOBILE DROPDOWN BUTTON
  // ==========================================
  if (variant === 'mobile-dropdown') {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`
          w-full 
          px-3 py-1.5 
          text-left 
          rounded-lg 
          hover:bg-violet-50 
          text-sm 
          font-medium 
          text-slate-700 
          hover:text-violet-600 
          flex items-center justify-between 
          transition-colors
          disabled:opacity-50 
          disabled:cursor-not-allowed
          ${className}
        `.trim()}
      >
        {children}
        {showDropdownIcon && (
          <KeyboardArrowDown 
            sx={{ fontSize: 18 }}
            className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
          />
        )}
      </button>
    );
  }

  // ==========================================
  // VARIANT: MOBILE SUBMENU BUTTON
  // ==========================================
  if (variant === 'mobile-submenu') {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`
          w-full 
          px-3 py-1.5 
          text-left 
          text-xs 
          text-slate-600 
          hover:bg-violet-50 
          hover:text-violet-600 
          rounded-lg 
          transition-colors
          disabled:opacity-50 
          disabled:cursor-not-allowed
          ${className}
        `.trim()}
      >
        {children}
      </button>
    );
  }

  // ==========================================
  // DEFAULT: BASIC BUTTON
  // ==========================================
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 
        rounded-lg 
        transition-colors
        disabled:opacity-50 
        disabled:cursor-not-allowed
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `.trim()}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf([
    'primary', 
    'mobile-menu', 
    'mobile-dropdown', 
    'mobile-submenu',
    'default'
  ]),
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  showDropdownIcon: PropTypes.bool,
  isDropdownOpen: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool
};

export default Button;
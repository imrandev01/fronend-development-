// src/components/Employer/EmployerNavbar.jsx

import { useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem, Avatar, IconButton, Badge } from '@mui/material';
import {
  Work,
  Menu as MenuIcon,
  Close,
  KeyboardArrowDown,
  WarningAmber,
  Person,
  Verified,
  Payment,
  Settings,
  Help,
  Logout,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {
  manageJobsMenuItems,
  applicationsMenuItems,
  candidatesMenuItems,
  companyProfileMenuItems,
  employerAccountMenuItems,
} from './employerNavigationData';

const EmployerNavbar = ({ isVerified = false, hasNewApplications = true }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [manageJobsAnchor, setManageJobsAnchor] = useState(null);
  const [applicationsAnchor, setApplicationsAnchor] = useState(null);
  const [candidatesAnchor, setCandidatesAnchor] = useState(null);
  const [companyAnchor, setCompanyAnchor] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleClose();
    setMobileMenuOpen(false);

    setManageJobsAnchor(null);
    setApplicationsAnchor(null);
    setCandidatesAnchor(null);
    setCompanyAnchor(null);
  };

  // ✅ Navigate to Company Verification Form
  const handleCompleteVerification = () => {
    navigate('/employer/verify-company');
  };

  const getIcon = (iconName) => {
    const icons = {
      person: <Person sx={{ fontSize: 18 }} />,
      verified: <Verified sx={{ fontSize: 18 }} />,
      payment: <Payment sx={{ fontSize: 18 }} />,
      settings: <Settings sx={{ fontSize: 18 }} />,
      help: <Help sx={{ fontSize: 18 }} />,
      logout: <Logout sx={{ fontSize: 18 }} />,
    };
    return icons[iconName];
  };

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Left - Logo and Company Name */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate('/employer')}
            >
              <div className="w-8 h-8 bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] rounded-lg flex items-center justify-center">
                <Work className="text-white" sx={{ fontSize: 18 }} />
              </div>
              <span className="text-base font-bold bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] bg-clip-text text-transparent">
                SUMPRO
              </span>
              <span className="hidden sm:inline text-xs font-semibold text-slate-500 ml-1 px-2 py-0.5 bg-violet-50 rounded-full">
                Employer
              </span>
            </div>

            {/* Middle - Navigation Links (Desktop) */}
            <div className="hidden lg:flex items-center gap-1">
              
              {/* Manage Jobs Dropdown */}
              <div>
                <button
                  onClick={(e) => setManageJobsAnchor(e.currentTarget)}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-violet-50 hover:text-violet-600 transition-colors flex items-center gap-1"
                >
                  Manage Jobs
                  <KeyboardArrowDown sx={{ fontSize: 16 }} />
                </button>
                <Menu
                  anchorEl={manageJobsAnchor}
                  open={Boolean(manageJobsAnchor)}
                  onClose={() => setManageJobsAnchor(null)}
                  PaperProps={{
                    sx: { mt: 0.5, minWidth: 200, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' },
                  }}
                >
                  {manageJobsMenuItems.map((item) => (
                    <MenuItem
                      key={item.path}
                      onClick={() => handleMenuItemClick(item.path)}
                      sx={{
                        fontSize: '0.875rem',
                        py: 1.5,
                        '&:hover': {
                          backgroundColor: '#f5f3ff',
                          color: '#7c3aed',
                        },
                      }}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </Menu>
              </div>

              {/* Applications Dropdown */}
              <div>
                <button
                  onClick={(e) => setApplicationsAnchor(e.currentTarget)}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-violet-50 hover:text-violet-600 transition-colors flex items-center gap-1"
                >
                  Applications
                  {hasNewApplications && (
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                  <KeyboardArrowDown sx={{ fontSize: 16 }} />
                </button>
                <Menu
                  anchorEl={applicationsAnchor}
                  open={Boolean(applicationsAnchor)}
                  onClose={() => setApplicationsAnchor(null)}
                  PaperProps={{
                    sx: { mt: 0.5, minWidth: 200, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' },
                  }}
                >
                  {applicationsMenuItems.map((item) => (
                    <MenuItem
                      key={item.path}
                      onClick={() => handleMenuItemClick(item.path)}
                      sx={{
                        fontSize: '0.875rem',
                        py: 1.5,
                        '&:hover': {
                          backgroundColor: '#f5f3ff',
                          color: '#7c3aed',
                        },
                      }}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </Menu>
              </div>

              {/* Candidates Dropdown */}
              <div>
                <button
                  onClick={(e) => setCandidatesAnchor(e.currentTarget)}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-violet-50 hover:text-violet-600 transition-colors flex items-center gap-1"
                >
                  Candidates
                  <KeyboardArrowDown sx={{ fontSize: 16 }} />
                </button>
                <Menu
                  anchorEl={candidatesAnchor}
                  open={Boolean(candidatesAnchor)}
                  onClose={() => setCandidatesAnchor(null)}
                  PaperProps={{
                    sx: { mt: 0.5, minWidth: 200, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' },
                  }}
                >
                  {candidatesMenuItems.map((item) => (
                    <MenuItem
                      key={item.path}
                      onClick={() => handleMenuItemClick(item.path)}
                      sx={{
                        fontSize: '0.875rem',
                        py: 1.5,
                        '&:hover': {
                          backgroundColor: '#f5f3ff',
                          color: '#7c3aed',
                        },
                      }}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </Menu>
              </div>

              {/* Company Profile Dropdown */}
              <div>
                <button
                  onClick={(e) => setCompanyAnchor(e.currentTarget)}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-violet-50 hover:text-violet-600 transition-colors flex items-center gap-1"
                >
                  Company Profile
                  <KeyboardArrowDown sx={{ fontSize: 16 }} />
                </button>
                <Menu
                  anchorEl={companyAnchor}
                  open={Boolean(companyAnchor)}
                  onClose={() => setCompanyAnchor(null)}
                  PaperProps={{
                    sx: { mt: 0.5, minWidth: 220, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' },
                  }}
                >
                  {companyProfileMenuItems.map((item) => (
                    <MenuItem
                      key={item.path}
                      onClick={() => handleMenuItemClick(item.path)}
                      sx={{
                        fontSize: '0.875rem',
                        py: 1.5,
                        '&:hover': {
                          backgroundColor: '#f5f3ff',
                          color: '#7c3aed',
                        },
                      }}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </div>

            {/* Right - Dashboard Button and Profile Menu (Desktop) */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => navigate('/')}
                className="px-4 py-1.5 bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] text-white rounded-lg text-sm font-semibold hover:shadow-md transition-all duration-300"
              >
                Go to JobSeeker
              </button>

              {/* Profile Avatar Menu */}
              <IconButton onClick={handleClick} size="small">
                <Badge
                  color="error"
                  variant="dot"
                  invisible={isVerified}
                  overlap="circular"
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    }}
                  >
                    E
                  </Avatar>
                </Badge>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 240,
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  },
                }}
              >
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="text-sm font-semibold text-slate-800">TechCorp Solutions</p>
                  <p className="text-xs text-slate-500">employer@techcorp.com</p>
                  {!isVerified && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                      <WarningAmber sx={{ fontSize: 14 }} />
                      Verification Pending
                    </div>
                  )}
                </div>
                {employerAccountMenuItems.map((item) => (
                  <div key={item.path}>
                    {item.divider && <div className="border-t border-slate-100 my-1"></div>}
                    <MenuItem
                      onClick={() => handleMenuItemClick(item.path)}
                      sx={{
                        fontSize: '0.875rem',
                        py: 1.5,
                        display: 'flex',
                        gap: 1.5,
                        '&:hover': {
                          backgroundColor: '#f5f3ff',
                          color: '#7c3aed',
                        },
                      }}
                    >
                      {getIcon(item.icon)}
                      <span className="flex-1">{item.label}</span>
                      {item.badge && !isVerified && (
                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                      )}
                    </MenuItem>
                  </div>
                ))}
              </Menu>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-1.5">
              <IconButton onClick={handleClick} size="small">
                <Badge color="error" variant="dot" invisible={isVerified}>
                  <Avatar sx={{ width: 28, height: 28 }}>E</Avatar>
                </Badge>
              </IconButton>
              <IconButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)} size="small">
                {mobileMenuOpen ? (
                  <Close sx={{ fontSize: 22 }} />
                ) : (
                  <MenuIcon sx={{ fontSize: 22 }} />
                )}
              </IconButton>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-3 border-t border-slate-100">
              <div className="flex flex-col gap-1 mt-3">
                
                <MobileDropdown
                  title="Manage Jobs"
                  items={manageJobsMenuItems}
                  onItemClick={handleMenuItemClick}
                />
                <MobileDropdown
                  title="Applications"
                  items={applicationsMenuItems}
                  onItemClick={handleMenuItemClick}
                  badge={hasNewApplications}
                />
                <MobileDropdown
                  title="Candidates"
                  items={candidatesMenuItems}
                  onItemClick={handleMenuItemClick}
                />
                <MobileDropdown
                  title="Company Profile"
                  items={companyProfileMenuItems}
                  onItemClick={handleMenuItemClick}
                />

                <button
                  onClick={() => handleMenuItemClick('/')}
                  className="mx-3 mt-2 px-4 py-1.5 bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] text-white rounded-lg text-sm font-semibold"
                >
                  For Employee
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Verification Warning Banner */}
      {!isVerified && (
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-amber-800">
              <WarningAmber sx={{ fontSize: 18 }} />
              <span className="font-medium">Company verification pending.</span>
              <span className="hidden sm:inline text-amber-700">
                Complete verification to post jobs.
              </span>
            </div>
            <button
              onClick={handleCompleteVerification} // ✅ Updated handler
              className="text-sm font-semibold text-amber-900 hover:text-amber-950 underline"
            >
              Complete Now
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// Mobile Dropdown Component
const MobileDropdown = ({ title, items, onItemClick, disabled = false, badge = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full px-3 py-1.5 text-left rounded-lg text-sm font-medium flex items-center justify-between transition-colors ${
          disabled
            ? 'text-slate-400 cursor-not-allowed'
            : 'text-slate-700 hover:bg-violet-50 hover:text-violet-600'
        }`}
      >
        <span className="flex items-center gap-2">
          {title}
          {badge && <span className="w-2 h-2 bg-red-500 rounded-full"></span>}
        </span>
        {!disabled && (
          <KeyboardArrowDown
            sx={{ fontSize: 18 }}
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        )}
      </button>
      {isOpen && (
        <div className="ml-3 mt-0.5 space-y-0.5">
          {items.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                onItemClick(item.path);
                setIsOpen(false);
              }}
              className={`w-full px-3 py-1.5 text-left text-xs rounded-lg transition-colors ${
                item.highlight
                  ? 'text-violet-700 font-semibold hover:bg-violet-100'
                  : 'text-slate-600 hover:bg-violet-50 hover:text-violet-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

MobileDropdown.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  badge: PropTypes.bool,
};

EmployerNavbar.propTypes = {
  isVerified: PropTypes.bool,
  hasNewApplications: PropTypes.bool,
};

export default EmployerNavbar;
import { useState } from 'react';
import { Menu, MenuItem, Avatar, IconButton } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import NavigationLinks from './EmployerNavbarDropdown/NavigationLinks';
import Button from '../Common/Button';
import { 
  companiesMenuItems, 
  servicesMenuItems, 
  resumeMenuItems, 
  profileMenuItems 
} from './navigationData';

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          
          {/* Left - Logo and Company Name */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] rounded-lg flex items-center justify-center">
              <WorkIcon className="text-white" sx={{ fontSize: 18 }} />
            </div>
            <span className="text-base font-bold bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] bg-clip-text text-transparent">
              SUMPRO
            </span>
          </div>

          {/* Middle - Navigation Links (Desktop) */}
          <NavigationLinks />

          {/* Right - Employers Button and Profile Menu (Desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="primary"
              onClick={() => navigate('/employer')}
            >
              Go to Recruiter
            </Button>

            {/* Profile Avatar Menu */}
            <IconButton
              onClick={handleClick}
              size="small"
            >
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              >
                U
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                sx: { 
                  mt: 1, 
                  minWidth: 180,
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }
              }}
            >
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-sm font-semibold text-slate-800">John Doe</p>
                <p className="text-xs text-slate-500">john@example.com</p>
              </div>
              {profileMenuItems.map((item) => (
                <MenuItem 
                  key={item.path}
                  onClick={() => handleMenuItemClick(item.path)}
                  sx={{
                    fontSize: '0.875rem',
                    py: 1,
                    '&:hover': {
                      backgroundColor: '#f5f3ff',
                      color: '#7c3aed'
                    }
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-1.5">
            <IconButton
              onClick={handleClick}
              size="small"
            >
              <Avatar sx={{ width: 28, height: 28 }}>U</Avatar>
            </IconButton>
            <IconButton
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              size="small"
            >
              {mobileMenuOpen ? <CloseIcon sx={{ fontSize: 22 }} /> : <MenuIcon sx={{ fontSize: 22 }} />}
            </IconButton>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-3 border-t border-slate-100">
            <div className="flex flex-col gap-1 mt-3">
              <Button
                variant="mobile-menu"
                onClick={() => handleMenuItemClick('/jobs')}
              >
                Jobs
              </Button>
              
              <MobileDropdown 
                title="Companies" 
                items={companiesMenuItems} 
                onItemClick={handleMenuItemClick} 
              />
              <MobileDropdown 
                title="Services" 
                items={servicesMenuItems} 
                onItemClick={handleMenuItemClick} 
              />
              <MobileDropdown 
                title="Resume" 
                items={resumeMenuItems} 
                onItemClick={handleMenuItemClick} 
              />
              
              <Button
                variant="primary"
                onClick={() => handleMenuItemClick('/employer')}
                className="mx-3 mt-2"
              >
                For Employers
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Mobile Dropdown Component
const MobileDropdown = ({ title, items, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button
        variant="mobile-dropdown"
        onClick={() => setIsOpen(!isOpen)}
        showDropdownIcon={true}
        isDropdownOpen={isOpen}
      >
        {title}
      </Button>
      {isOpen && (
        <div className="ml-3 mt-0.5 space-y-0.5">
          {items.map((item) => (
            <Button
              key={item.path}
              variant="mobile-submenu"
              onClick={() => {
                onItemClick(item.path);
                setIsOpen(false);
              }}
            >
              {item.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
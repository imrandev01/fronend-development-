import { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const DropdownMenu = ({ title, items }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="px-3 py-1.5 rounded-lg hover:bg-violet-50 transition-colors text-sm font-medium text-slate-700 hover:text-violet-600 flex items-center gap-0.5"
      >
        {title}
        <KeyboardArrowDown 
          sx={{ fontSize: 16 }}
          className={`transition-transform duration-200 ${anchorEl ? 'rotate-180' : ''}`}
        />
      </button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: { 
            mt: 0.5, 
            minWidth: 180,
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          }
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        {items.map((item) => (
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
  );
};

export default DropdownMenu;
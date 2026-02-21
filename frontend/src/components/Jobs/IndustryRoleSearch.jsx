import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import CloseIcon from '@mui/icons-material/Close';
import { industries, rolesByIndustry } from './jobsData';
import { useNavigate } from 'react-router-dom';

export default function IndustryRoleSearch() {
  const navigate = useNavigate();
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [availableRoles, setAvailableRoles] = useState([]);

  // Update available roles when industries change
  useEffect(() => {
    if (selectedIndustries.length > 0) {
      const roles = new Set();
      selectedIndustries.forEach((industry) => {
        const industryRoles = rolesByIndustry[industry] || [];
        industryRoles.forEach((role) => roles.add(role));
      });
      setAvailableRoles(Array.from(roles).sort());
    } else {
      // Show all roles if no industry selected
      const allRoles = new Set();
      Object.values(rolesByIndustry).forEach((roles) => {
        roles.forEach((role) => allRoles.add(role));
      });
      setAvailableRoles(Array.from(allRoles).sort());
    }
  }, [selectedIndustries]);

  const handleIndustryChange = (event, newValue) => {
    if (newValue.length <= 3) {
      setSelectedIndustries(newValue);
      // Filter out roles that are not in the new industry selection
      if (selectedRoles.length > 0 && newValue.length > 0) {
        const validRoles = selectedRoles.filter((role) =>
          newValue.some((industry) =>
            rolesByIndustry[industry]?.includes(role)
          )
        );
        setSelectedRoles(validRoles);
      }
    }
  };

  const handleRoleChange = (event, newValue) => {
    if (newValue.length <= 8) {
      setSelectedRoles(newValue);
    }
  };

  const handleRemoveIndustry = (industryToRemove) => {
    setSelectedIndustries(
      selectedIndustries.filter((industry) => industry !== industryToRemove)
    );
  };

  const handleRemoveRole = (roleToRemove) => {
    setSelectedRoles(
      selectedRoles.filter((role) => role !== roleToRemove)
    );
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedIndustries.length > 0) {
      params.append('industries', selectedIndustries.join(','));
    }
    if (selectedRoles.length > 0) {
      params.append('roles', selectedRoles.join(','));
    }
    navigate(`/jobs/search?${params.toString()}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Inputs */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Industry/Department Autocomplete */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Industry / Department
              <span className="text-xs text-slate-500 ml-1">(Max 3)</span>
            </label>
            <Autocomplete
              multiple
              options={industries}
              value={selectedIndustries}
              onChange={handleIndustryChange}
              disableCloseOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={
                    selectedIndustries.length === 0
                      ? 'Select up to 3 industries'
                      : ''
                  }
                  variant="outlined"
                  onKeyPress={handleKeyPress}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <BusinessIcon
                          className="text-slate-400 ml-2"
                          sx={{ fontSize: 20 }}
                        />
                        {params.InputProps.startAdornment}
                      </>
                    ),
                  }}
                />
              )}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  '& fieldset': {
                    borderColor: '#e2e8f0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#cbd5e1',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#7c3aed',
                    borderWidth: '2px',
                  },
                },
              }}
            />
            {selectedIndustries.length === 3 && (
              <p className="text-xs text-amber-600 mt-1">
                Maximum 3 industries selected
              </p>
            )}
          </div>

          {/* Job Role Autocomplete */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Job Role
              <span className="text-xs text-slate-500 ml-1">(Max 8)</span>
            </label>
            <Autocomplete
              multiple
              options={availableRoles}
              value={selectedRoles}
              onChange={handleRoleChange}
              disableCloseOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={
                    selectedRoles.length === 0
                      ? 'Select up to 8 roles'
                      : ''
                  }
                  variant="outlined"
                  onKeyPress={handleKeyPress}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <WorkIcon
                          className="text-slate-400 ml-2"
                          sx={{ fontSize: 20 }}
                        />
                        {params.InputProps.startAdornment}
                      </>
                    ),
                  }}
                />
              )}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  '& fieldset': {
                    borderColor: '#e2e8f0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#cbd5e1',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#7c3aed',
                    borderWidth: '2px',
                  },
                },
              }}
            />
            {selectedRoles.length === 8 && (
              <p className="text-xs text-amber-600 mt-1">
                Maximum 8 roles selected
              </p>
            )}
          </div>
        </div>

        {/* Selected Industries as Chips */}
        {selectedIndustries.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-medium text-slate-600 mb-2">
              Selected Industries:
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedIndustries.map((industry) => (
                <Chip
                  key={industry}
                  label={industry}
                  onDelete={() => handleRemoveIndustry(industry)}
                  deleteIcon={<CloseIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    bgcolor: '#f5f3ff',
                    color: '#7c3aed',
                    fontWeight: 600,
                    fontSize: '0.8125rem',
                    '& .MuiChip-deleteIcon': {
                      color: '#7c3aed',
                      '&:hover': {
                        color: '#6d28d9',
                      },
                    },
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Selected Roles as Chips */}
        {selectedRoles.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-medium text-slate-600 mb-2">
              Selected Roles:
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedRoles.map((role) => (
                <Chip
                  key={role}
                  label={role}
                  onDelete={() => handleRemoveRole(role)}
                  deleteIcon={<CloseIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    bgcolor: '#eff6ff',
                    color: '#2563eb',
                    fontWeight: 600,
                    fontSize: '0.8125rem',
                    '& .MuiChip-deleteIcon': {
                      color: '#2563eb',
                      '&:hover': {
                        color: '#1d4ed8',
                      },
                    },
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={selectedIndustries.length === 0 && selectedRoles.length === 0}
          className="w-full md:w-auto px-8 py-3 bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SearchIcon sx={{ fontSize: 20 }} />
          Search Jobs
        </button>
      </div>

      {/* Helper Text */}
      <p className="text-xs text-slate-500 mt-3 text-center">
        {selectedIndustries.length > 0 || selectedRoles.length > 0 ? (
          <>
            {selectedIndustries.length > 0 && (
              <span>Filtering by {selectedIndustries.length} {selectedIndustries.length === 1 ? 'industry' : 'industries'}</span>
            )}
            {selectedIndustries.length > 0 && selectedRoles.length > 0 && <span> and </span>}
            {selectedRoles.length > 0 && (
              <span>{selectedRoles.length} {selectedRoles.length === 1 ? 'role' : 'roles'}</span>
            )}
          </>
        ) : (
          'Select industries and roles to find relevant jobs'
        )}
      </p>
    </div>
  );
}
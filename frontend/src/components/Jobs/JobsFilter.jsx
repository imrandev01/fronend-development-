import React, { useState } from 'react';
import { Autocomplete, TextField, Chip } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import BadgeIcon from '@mui/icons-material/Badge';
import SchoolIcon from '@mui/icons-material/School';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BusinessIcon from '@mui/icons-material/Business';
import { filterOptions } from './jobsListingData';

export default function JobsFilter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    roles: [],
    locations: [],
    experience: [],
    qualifications: [],
    salaryRanges: [],
    employerTypes: [],
  });

  const handleFilterChange = (filterName, newValue) => {
    const updatedFilters = { ...filters, [filterName]: newValue };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const filterConfig = [
    {
      name: 'roles',
      label: 'Role',
      icon: <WorkIcon sx={{ fontSize: { xs: 14, md: 16 } }} />,
      options: filterOptions.roles,
    },
    {
      name: 'locations',
      label: 'Location',
      icon: <LocationOnIcon sx={{ fontSize: { xs: 14, md: 16 } }} />,
      options: filterOptions.locations,
    },
    {
      name: 'experience',
      label: 'Experience',
      icon: <BadgeIcon sx={{ fontSize: { xs: 14, md: 16 } }} />,
      options: filterOptions.experience,
    },
    {
      name: 'qualifications',
      label: 'Qualification',
      icon: <SchoolIcon sx={{ fontSize: { xs: 14, md: 16 } }} />,
      options: filterOptions.qualifications,
    },
    {
      name: 'salaryRanges',
      label: 'Salary',
      icon: <AttachMoneyIcon sx={{ fontSize: { xs: 14, md: 16 } }} />,
      options: filterOptions.salaryRanges,
    },
    {
      name: 'employerTypes',
      label: 'Employer Type',
      icon: <BusinessIcon sx={{ fontSize: { xs: 14, md: 16 } }} />,
      options: filterOptions.employerTypes,
    },
  ];

  const getTotalSelectedFilters = () => {
    return Object.values(filters).reduce((sum, arr) => sum + arr.length, 0);
  };

  return (
    <div className="bg-white border-b border-slate-200 sticky top-14 z-40">
      <div className="max-w-6xl mx-auto px-3 md:px-4">
        <div className="flex items-center justify-between gap-2 md:gap-4 mb-2">
          {/* Section Title */}
          <div className="flex items-center gap-1.5 md:gap-2">
            <FilterListIcon className="text-slate-600" sx={{ fontSize: { xs: 16, md: 20 } }} />
            <h2 className="text-sm md:text-lg font-bold text-slate-900">Filter Jobs</h2>
            {getTotalSelectedFilters() > 0 && (
              <span className="text-[0.625rem] md:text-xs font-semibold text-violet-600 bg-violet-100 px-1.5 md:px-2 py-0.5 rounded-full">
                {getTotalSelectedFilters()}
              </span>
            )}
          </div>

          {/* Clear All Filters */}
          {getTotalSelectedFilters() > 0 && (
            <button
              onClick={() => {
                const clearedFilters = {
                  roles: [],
                  locations: [],
                  experience: [],
                  qualifications: [],
                  salaryRanges: [],
                  employerTypes: [],
                };
                setFilters(clearedFilters);
                onFilterChange(clearedFilters);
              }}
              className="text-[0.625rem] md:text-xs font-semibold text-red-600 hover:text-red-700"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Controls */}
        <div className="flex gap-1.5 md:gap-2 overflow-x-auto pb-1 md:pb-2 scrollbar-hide">
          {filterConfig.map((filter) => (
            <div key={filter.name} className="flex-shrink-0">
              <Autocomplete
                multiple
                options={filter.options}
                value={filters[filter.name]}
                onChange={(event, newValue) =>
                  handleFilterChange(filter.name, newValue)
                }
                disableCloseOnSelect
                size="small"
                sx={{ 
                  minWidth: { xs: 140, md: 180 }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={filter.label}
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <>
                          <div className="ml-1 md:ml-2">{filter.icon}</div>
                          {params.InputProps.startAdornment}
                        </>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '20px',
                        fontSize: { xs: '0.75rem', md: '0.8125rem' },
                        padding: { xs: '4px 8px', md: '6px 10px' },
                        backgroundColor: filters[filter.name].length > 0 ? '#f5f3ff' : 'white',
                        '& fieldset': {
                          borderColor: filters[filter.name].length > 0 ? '#7c3aed' : '#e2e8f0',
                        },
                        '&:hover fieldset': {
                          borderColor: '#cbd5e1',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#7c3aed',
                        },
                      },
                      '& .MuiAutocomplete-input': {
                        padding: { xs: '2px 4px !important', md: '4px 6px !important' },
                      },
                    }}
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.slice(0, 1).map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={option}
                      label={value.length > 1 ? `${value.length}` : option.length > 8 ? `${option.substring(0, 8)}...` : option}
                      size="small"
                      sx={{
                        fontSize: { xs: '0.625rem', md: '0.75rem' },
                        height: { xs: '18px', md: '20px' },
                        backgroundColor: '#7c3aed',
                        color: 'white',
                        '& .MuiChip-deleteIcon': {
                          color: 'white',
                          fontSize: { xs: '12px', md: '14px' },
                        },
                      }}
                    />
                  ))
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Custom scrollbar hide */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
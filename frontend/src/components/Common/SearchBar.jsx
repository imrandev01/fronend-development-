// src/components/SearchBar.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Autocomplete, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import BadgeIcon from '@mui/icons-material/Badge';

const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 
  'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur', 
  'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Patna',
  'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad',
  'Meerut', 'Rajkot', 'Varanasi', 'Srinagar', 'Aurangabad', 'Dhanbad',
  'Amritsar', 'Navi Mumbai', 'Allahabad', 'Ranchi', 'Howrah', 
  'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada', 'Jodhpur',
  'Madurai', 'Raipur', 'Kota', 'Remote', 'Work From Home',
];

const experienceLevels = [
  'Fresher (0-1 years)',
  '1-3 years',
  '3-5 years',
  '5-7 years',
  '7-10 years',
  '10+ years',
];

export default function SearchBar() {
  const navigate = useNavigate();
  
  // Changed to searchKeyword for free text input
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const handleSearch = () => {
    // Build query parameters
    const params = new URLSearchParams();
    
    if (searchKeyword.trim()) {
      params.append('keyword', searchKeyword.trim());
    }
    if (selectedExperience) {
      params.append('experience', selectedExperience);
    }
    if (selectedCity) {
      params.append('location', selectedCity);
    }

    // Navigate to jobs page with search params
    const queryString = params.toString();
    navigate(`/jobs${queryString ? `?${queryString}` : ''}`);
    
    console.log('Search:', { 
      keyword: searchKeyword, 
      experience: selectedExperience,
      city: selectedCity 
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-1 sm:gap-2 bg-white rounded-3xl p-2 sm:p-3 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-slate-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-shadow duration-300">
      
      {/* Free Text Search Input (Job Title/Company/Keyword) */}
      <div className="flex items-center flex-1 w-full md:w-auto px-2">
        <WorkIcon className="text-slate-400 mr-1" sx={{ fontSize: 16 }} />
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Job title, company, or keyword"
          className="flex-1 text-[0.8125rem] outline-none border-none bg-transparent placeholder:text-slate-400 text-slate-700"
        />
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px h-7 bg-slate-200" />

      {/* Experience Autocomplete */}
      <div className="flex items-center flex-1 w-full md:w-36 px-2">
        <BadgeIcon className="text-slate-400 mr-1" sx={{ fontSize: 16 }} />
        <Autocomplete
          options={experienceLevels}
          value={selectedExperience}
          onChange={(event, newValue) => setSelectedExperience(newValue)}
          className="flex-1"
          sx={{
            '& .MuiOutlinedInput-root': {
              padding: '0 !important',
              border: 'none',
              '& fieldset': { border: 'none' },
            },
            '& .MuiInputBase-input': {
              fontSize: '0.8125rem',
              padding: '4px 0 !important',
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Experience"
              variant="outlined"
              onKeyPress={handleKeyPress}
            />
          )}
        />
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px h-7 bg-slate-200" />

      {/* City Autocomplete */}
      <div className="flex items-center flex-1 w-full md:w-36 px-2">
        <LocationOnIcon className="text-slate-400 mr-1" sx={{ fontSize: 16 }} />
        <Autocomplete
          options={cities}
          value={selectedCity}
          onChange={(event, newValue) => setSelectedCity(newValue)}
          className="flex-1"
          sx={{
            '& .MuiOutlinedInput-root': {
              padding: '0 !important',
              border: 'none',
              '& fieldset': { border: 'none' },
            },
            '& .MuiInputBase-input': {
              fontSize: '0.8125rem',
              padding: '4px 0 !important',
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Location"
              variant="outlined"
              onKeyPress={handleKeyPress}
            />
          )}
        />
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="w-full md:w-auto flex items-center justify-center gap-1.5 px-4 py-1.5 bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] text-white rounded-3xl text-[0.8125rem] font-semibold shadow-[0_2px_8px_rgba(102,126,234,0.25)] hover:shadow-[0_3px_12px_rgba(102,126,234,0.4)] hover:bg-[linear-gradient(135deg,#5568d3_0%,#6a3f92_100%)] transition-all duration-300"
      >
        <SearchIcon sx={{ fontSize: 16 }} />
        Search
      </button>
    </div>
  );
}
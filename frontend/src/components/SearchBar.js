import React, { useState } from 'react';
import { TextField, InputAdornment, Box, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);

  const filters = [
    { label: 'Under Rs.50', value: 'cheap' },
    { label: 'Vegetarian', value: 'veg' },
    { label: 'Spicy', value: 'spicy' },
    { label: 'Popular', value: 'popular' }
  ];

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const toggleFilter = (filter) => {
    const newFilters = activeFilters.includes(filter)
      ? activeFilters.filter(f => f !== filter)
      : [...activeFilters, filter];
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <Box sx={{ mb: 6, maxWidth: '800px', mx: 'auto' }}>
      <TextField
        fullWidth
        placeholder="🔍 Search for Rice & Curry, Kottu, Pens, Books..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#29bf12', fontSize: '1.5rem' }} />
            </InputAdornment>
          ),
        }}
        sx={{ 
          mb: 3,
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
            border: '2px solid #abff4f',
            fontSize: '1.1rem',
            py: 1,
            bgcolor: '#ffffff',
            '&:hover': {
              borderColor: '#29bf12'
            },
            '&.Mui-focused': {
              borderColor: '#29bf12',
              boxShadow: '0 4px 12px rgba(41,191,18,0.2)'
            }
          },
          '& .MuiInputBase-input': {
            fontSize: '1.1rem',
            fontWeight: 500
          }
        }}
      />
      
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        flexWrap: 'wrap',
        justifyContent: 'center',
        p: 3,
        bgcolor: '#f8fafc',
        borderRadius: 3,
        border: '1px solid #abff4f'
      }}>
        {filters.map((filter) => (
          <Chip
            key={filter.value}
            label={filter.label}
            onClick={() => toggleFilter(filter.value)}
            sx={{
              px: 2,
              py: 1,
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: 3,
              ...(activeFilters.includes(filter.value) ? {
                bgcolor: '#29bf12',
                color: '#ffffff',
                '&:hover': { bgcolor: '#abff4f', color: '#454955' }
              } : {
                bgcolor: '#ffffff',
                color: '#454955',
                border: '2px solid #abff4f',
                '&:hover': { bgcolor: '#abff4f' }
              })
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SearchBar;
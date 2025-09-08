import React from 'react';

const Filters = ({ filters, onFilterChange }) => {
  const categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Home',
    'Sports',
    'Beauty',
    'Toys'
  ];

  const sortOptions = [
    { value: 'createdAt', label: 'Newest First' },
    { value: 'price', label: 'Price: Low to High' },
    { value: '-price', label: 'Price: High to Low' },
    { value: 'name', label: 'Name: A to Z' },
    { value: '-name', label: 'Name: Z to A' }
  ];

  const handleChange = (field, value) => {
    onFilterChange({ [field]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      category: '',
      minPrice: '',
      maxPrice: '',
      search: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
  };

  return (
    <div className="filters">
      <h3>Filter Products</h3>
      <div className="grid grid-2">
        <div className="filter-group">
          <label>Search</label>
          <input
            type="text"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Category</label>
          <select
            value={filters.category}
            onChange={(e) => handleChange('category', e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Min Price</label>
          <input
            type="number"
            placeholder="Min price"
            value={filters.minPrice}
            onChange={(e) => handleChange('minPrice', e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Max Price</label>
          <input
            type="number"
            placeholder="Max price"
            value={filters.maxPrice}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleChange('sortBy', e.target.value)}
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>&nbsp;</label>
          <button onClick={clearFilters} className="btn btn-secondary">
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from '../components/ItemCard';
import Filters from '../components/Filters';

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        Object.keys(filters).forEach(key => {
          if (filters[key]) {
            params.append(key, filters[key]);
          }
        });

        const response = await axios.get(`/api/items?${params}`);
        setItems(response.data.items);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div>
      <div className="hero">
        <div className="container">
          <h1>Welcome to Our Store</h1>
          <p>Discover amazing products at great prices</p>
        </div>
      </div>

      <div className="container">
        <Filters filters={filters} onFilterChange={handleFilterChange} />
        
        {loading ? (
          <div className="loading">Loading products...</div>
        ) : (
          <div className="grid grid-3">
            {items.map(item => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        )}
        
        {!loading && items.length === 0 && (
          <div className="text-center">
            <h3>No products found</h3>
            <p>Try adjusting your filters to see more results.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;


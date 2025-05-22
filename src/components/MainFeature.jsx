import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from './ApperIcon';

const initialProperties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    price: 320000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    address: "123 Urban St, Downtown, City",
    type: "apartment",
    status: "for sale",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    favorite: false
  },
  {
    id: 2,
    title: "Suburban Family Home",
    price: 450000,
    bedrooms: 4,
    bathrooms: 3,
    area: 2400,
    address: "456 Family Dr, Suburbia, County",
    type: "house",
    status: "for sale",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    favorite: false
  },
  {
    id: 3,
    title: "Luxury Beachfront Condo",
    price: 780000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    address: "789 Shore Blvd, Beachside, State",
    type: "condo",
    status: "for sale",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    favorite: false
  },
  {
    id: 4,
    title: "City Center Studio",
    price: 1500,
    bedrooms: 0,
    bathrooms: 1,
    area: 600,
    address: "101 Center Ave, Downtown, City",
    type: "apartment",
    status: "for rent",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    favorite: false
  },
  {
    id: 5,
    title: "Countryside Cottage",
    price: 320000,
    bedrooms: 2,
    bathrooms: 1,
    area: 1100,
    address: "202 Rural Route, Countryside, Region",
    type: "house",
    status: "for sale",
    image: "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    favorite: false
  },
  {
    id: 6,
    title: "Spacious Townhouse",
    price: 2200,
    bedrooms: 3,
    bathrooms: 2.5,
    area: 1600,
    address: "303 Town Lane, Neighborhood, City",
    type: "townhouse",
    status: "for rent",
    image: "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    favorite: false
  }
];

const MainFeature = () => {
  const [properties, setProperties] = useState(initialProperties);
  const [filters, setFilters] = useState({
    priceMin: "",
    priceMax: "",
    bedrooms: "",
    type: "",
    status: ""
  });
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [showFilters, setShowFilters] = useState(false);

  // Apply filters when filter state changes
  useEffect(() => {
    let results = [...properties];
    
    if (filters.priceMin) {
      results = results.filter(prop => 
        prop.price >= parseInt(filters.priceMin)
      );
    }
    
    if (filters.priceMax) {
      results = results.filter(prop => 
        prop.price <= parseInt(filters.priceMax)
      );
    }
    
    if (filters.bedrooms) {
      results = results.filter(prop => 
        prop.bedrooms >= parseInt(filters.bedrooms)
      );
    }
    
    if (filters.type) {
      results = results.filter(prop => 
        prop.type === filters.type
      );
    }
    
    if (filters.status) {
      results = results.filter(prop => 
        prop.status === filters.status
      );
    }
    
    setFilteredProperties(results);
  }, [filters, properties]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      priceMin: "",
      priceMax: "",
      bedrooms: "",
      type: "",
      status: ""
    });
    toast.info("Filters have been reset");
  };

  // Toggle favorite status
  const toggleFavorite = (id) => {
    setProperties(prev => 
      prev.map(prop => 
        prop.id === id 
          ? { ...prop, favorite: !prop.favorite } 
          : prop
      )
    );
    
    const property = properties.find(p => p.id === id);
    const action = !property.favorite ? "added to" : "removed from";
    toast.success(`Property ${action} favorites`);
  };

  return (
    <div className="my-8">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Featured Properties</h2>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="btn btn-outline flex items-center gap-2"
        >
          <ApperIcon name="SlidersHorizontal" size={18} />
          <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
        </button>
      </div>

      {/* Filters */}
      <motion.div 
        className="bg-surface-100 dark:bg-surface-800 rounded-xl p-6 mb-8"
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: showFilters ? "auto" : 0,
          opacity: showFilters ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Min Price</label>
              <input
                type="number"
                name="priceMin"
                value={filters.priceMin}
                onChange={handleFilterChange}
                className="input-field w-full"
                placeholder="Min Price"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Max Price</label>
              <input
                type="number"
                name="priceMax"
                value={filters.priceMax}
                onChange={handleFilterChange}
                className="input-field w-full"
                placeholder="Max Price"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Bedrooms</label>
              <select
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleFilterChange}
                className="input-field w-full"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Property Type</label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="input-field w-full"
              >
                <option value="">Any</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
                <option value="townhouse">Townhouse</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="input-field w-full"
              >
                <option value="">Any</option>
                <option value="for sale">For Sale</option>
                <option value="for rent">For Rent</option>
              </select>
            </div>
            <div className="md:col-span-2 lg:col-span-3 xl:col-span-5 flex justify-end">
              <button 
                onClick={resetFilters}
                className="btn btn-outline flex items-center gap-2"
              >
                <ApperIcon name="RotateCcw" size={16} />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.length > 0 ? (
          filteredProperties.map(property => (
            <motion.div
              key={property.id}
              className="property-card card-hover group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="property-card-image"
                />
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => toggleFavorite(property.id)}
                    className="p-2 rounded-full bg-white/80 dark:bg-surface-800/80 hover:bg-white dark:hover:bg-surface-700 transition-colors"
                    aria-label={property.favorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <ApperIcon 
                      name={property.favorite ? "Heart" : "HeartOutline"} 
                      className={`h-5 w-5 ${property.favorite ? 'text-red-500 fill-red-500' : 'text-surface-600'}`}
                    />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white">
                  <span className="px-2 py-1 rounded-md text-xs font-semibold bg-primary uppercase">
                    {property.status}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {property.title}
                </h3>
                
                <p className="text-xl font-bold text-primary mb-3">
                  {property.status === "for sale" 
                    ? `$${property.price.toLocaleString()}` 
                    : `$${property.price.toLocaleString()}/month`}
                </p>
                
                <p className="text-surface-600 dark:text-surface-400 text-sm mb-4">
                  {property.address}
                </p>
                
                <div className="flex flex-wrap gap-3 text-sm">
                  <div className="flex items-center gap-1 text-surface-600 dark:text-surface-300">
                    <ApperIcon name="Bed" size={16} />
                    <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
                  </div>
                  <div className="flex items-center gap-1 text-surface-600 dark:text-surface-300">
                    <ApperIcon name="Bath" size={16} />
                    <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                  </div>
                  <div className="flex items-center gap-1 text-surface-600 dark:text-surface-300">
                    <ApperIcon name="SquareRoot" size={16} />
                    <span>{property.area} sq ft</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-surface-200 dark:border-surface-700 flex justify-between">
                  <button className="btn btn-outline px-3 py-1.5 text-sm">
                    <ApperIcon name="Info" size={16} className="mr-1" />
                    Details
                  </button>
                  <button className="btn btn-primary px-3 py-1.5 text-sm">
                    <ApperIcon name="Calendar" size={16} className="mr-1" />
                    Schedule Visit
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center p-12 bg-surface-100 dark:bg-surface-800 rounded-xl">
            <ApperIcon name="SearchX" className="h-16 w-16 text-surface-400 mb-4" />
            <h3 className="text-xl font-medium mb-2">No properties found</h3>
            <p className="text-surface-500 dark:text-surface-400 text-center mb-6">
              We couldn't find any properties matching your search criteria.
            </p>
            <button 
              onClick={resetFilters}
              className="btn btn-primary"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainFeature;
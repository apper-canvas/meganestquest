import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import MainFeature from '../components/MainFeature';
import ApperIcon from '../components/ApperIcon';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.info(`Searching for "${searchQuery}"...`);
      // In a real app, this would trigger a search API call
    } else {
      toast.warning("Please enter a search term");
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.warning("Please enter your email address");
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubscribed(true);
    toast.success("Thank you for subscribing to property alerts!");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
          alt="Beautiful home exterior" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="relative z-20 py-16 px-6 md:py-24 md:px-12 max-w-5xl mx-auto text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
            Find Your Perfect Property With NestQuest
          </h1>
          <p className="text-lg md:text-xl mb-8 md:max-w-2xl">
            Discover thousands of properties for sale and rent across the country. Your dream home is just a search away.
          </p>
          
          <form onSubmit={handleSearch} className="relative max-w-2xl">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ApperIcon name="Search" className="h-5 w-5 text-surface-500" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter location, property type, or keyword"
                  className="pl-10 w-full py-3 px-4 rounded-lg text-surface-800 focus:ring-2 focus:ring-white/50 focus:outline-none"
                />
              </div>
              <button 
                type="submit"
                className="py-3 px-6 bg-white text-primary font-medium rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-surface-800 rounded-xl p-6 text-center shadow-card">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary-light/30 dark:bg-primary-dark/30 flex items-center justify-center">
              <ApperIcon name="Home" size={32} className="text-primary" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2">10,000+</h3>
          <p className="text-surface-600 dark:text-surface-300">Properties Listed</p>
        </div>
        
        <div className="bg-white dark:bg-surface-800 rounded-xl p-6 text-center shadow-card">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-secondary-light/30 dark:bg-secondary-dark/30 flex items-center justify-center">
              <ApperIcon name="Users" size={32} className="text-secondary" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2">5,000+</h3>
          <p className="text-surface-600 dark:text-surface-300">Happy Customers</p>
        </div>
        
        <div className="bg-white dark:bg-surface-800 rounded-xl p-6 text-center shadow-card">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-accent/30 flex items-center justify-center">
              <ApperIcon name="MapPin" size={32} className="text-accent" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2">200+</h3>
          <p className="text-surface-600 dark:text-surface-300">Cities Covered</p>
        </div>
      </section>
      
      {/* Main Feature (Property Listings) */}
      <MainFeature />
      
      {/* CTA Section */}
      <section className="bg-surface-100 dark:bg-surface-800 rounded-2xl p-8 md:p-12 mt-16">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Stay Updated on New Properties
          </h2>
          <p className="text-surface-600 dark:text-surface-400 mb-6">
            Subscribe to our newsletter and be the first to know about new listings, price drops, and market trends in your area.
          </p>
          
          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="input-field flex-grow"
                required
              />
              <button 
                type="submit"
                className="btn btn-primary whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <div className="bg-green-100 dark:bg-green-800/30 text-green-800 dark:text-green-200 p-4 rounded-lg flex items-center justify-center gap-2">
              <ApperIcon name="CheckCircle" className="h-5 w-5" />
              <span>Thank you for subscribing!</span>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
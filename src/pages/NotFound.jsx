import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '../components/ApperIcon';

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4"
    >
      <div className="mb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-32 h-32 mx-auto rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center"
        >
          <ApperIcon name="HomeOff" size={64} className="text-surface-400" />
        </motion.div>
      </div>
      
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold mb-4"
      >
        404
      </motion.h1>
      
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-2xl md:text-3xl font-semibold mb-4"
      >
        Page Not Found
      </motion.h2>
      
      <motion.p
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-surface-600 dark:text-surface-400 text-lg max-w-md mx-auto mb-8"
      >
        The property you're looking for seems to be off the market. Let's get you back to browsing available listings.
      </motion.p>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Link 
          to="/" 
          className="btn btn-primary flex items-center gap-2 text-lg"
        >
          <ApperIcon name="Home" size={20} />
          <span>Return Home</span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;
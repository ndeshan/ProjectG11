import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = true,
  padding = 'md',
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-xl border border-gray-100 transition-all duration-300';
  const hoverClasses = hover ? 'shadow-soft hover:shadow-medium hover:-translate-y-1' : 'shadow-soft';
  
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${baseClasses} ${hoverClasses} ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
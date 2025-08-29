import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Typewriter = ({ 
  text, 
  speed = 50, 
  delay = 0,
  className = '',
  onComplete
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ 
          duration: 0.8, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{ marginLeft: '2px' }}
      >
        |
      </motion.span>
    </motion.span>
  );
};

export default Typewriter;

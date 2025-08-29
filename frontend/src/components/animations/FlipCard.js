import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FlipCard = ({ 
  frontContent, 
  backContent, 
  className = '',
  flipOnHover = true,
  flipOnClick = false
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    if (flipOnClick) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleHover = () => {
    if (flipOnHover) {
      setIsFlipped(true);
    }
  };

  const handleHoverEnd = () => {
    if (flipOnHover) {
      setIsFlipped(false);
    }
  };

  return (
    <motion.div
      className={`flip-card ${className}`}
      style={{ perspective: '1000px' }}
      onClick={handleFlip}
      onHoverStart={handleHover}
      onHoverEnd={handleHoverEnd}
    >
      <motion.div
        className="flip-card-inner"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Front of the card */}
        <motion.div
          className="flip-card-front"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: isFlipped ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {frontContent}
        </motion.div>

        {/* Back of the card */}
        <motion.div
          className="flip-card-back"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isFlipped ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {backContent}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FlipCard;

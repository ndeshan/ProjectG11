import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Scale = ({ children, delay = 0, duration = 0.5, scaleFrom = 0.8, className = '' }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    hidden: { 
      opacity: 0, 
      scale: scaleFrom,
      transition: { duration, ease: "easeOut" }
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Scale;

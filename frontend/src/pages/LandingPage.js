import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button, Card } from '../components/ui';

const LandingPage = () => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Pre-Order System',
      description: 'Browse authentic Sri Lankan foods from both canteens and place orders in advance to skip queues.',
      details: ['Rice & Curry varieties', 'Rotti & Dhal specialties', 'Kottu & Biriyani', 'Fresh daily preparations']
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Real-time Queue Status',
      description: 'Live updates on queue lengths and waiting times to help you choose the best time to visit.',
      details: ['Current queue length', 'Estimated wait times', 'Peak hour alerts', 'Best time recommendations']
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Digital Payments',
      description: 'Pay online while ordering to save time. Multiple payment options available.',
      details: ['UPI payments', 'Card payments', 'Campus meal cards', 'Instant confirmations']
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
      ),
      title: 'Smart Notifications',
      description: 'Get notified when your order is ready and receive alerts about special offers.',
      details: ['Order ready alerts', 'Special offers', 'Menu updates', 'Queue status changes']
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
        </svg>
      ),
      title: 'School Supplies',
      description: 'Order essential stationery and books alongside your meals for convenience.',
      details: ['Pens & pencils', 'Notebooks & books', 'Calculators', 'Study materials']
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Bilingual Support',
      description: 'Available in English and Tamil for better accessibility.',
      details: ['English interface', 'Tamil translations', 'Local food names', 'Cultural context']
    }
  ];

  const stats = [
    { number: '2000+', label: 'Happy Students', color: 'primary', icon: '🎓' },
    { number: '200+', label: 'Delicious Items', color: 'secondary', icon: '🍛' },
    { number: '4.8/5', label: 'Student Rating', color: 'success', icon: '⭐' },
    { number: '24/7', label: 'Always Available', color: 'info', icon: '🚀' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-hero-pattern opacity-10" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-20 w-32 h-32 bg-primary-500/10 rounded-full blur-xl"
          />
          <motion.div
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 right-20 w-40 h-40 bg-primary-400/10 rounded-full blur-xl"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Campus Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex justify-center mb-8"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20 backdrop-blur-sm overflow-hidden">
              <img 
                src="/images/logo.png" 
                alt="University of Ruhuna Logo" 
                className="w-16 h-16 md:w-24 md:h-24 object-contain"
              />
            </div>
          </motion.div>
          
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight"
          >
            University of Ruhuna
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-2 font-medium"
          >
            Faculty of Technology
          </motion.h2>
          
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl lg:text-2xl text-white/80 mb-8 font-medium"
          >
            Digital Canteen Management System
          </motion.h3>
          
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Streamline your campus dining experience with our advanced pre-ordering system, 
            real-time queue management, and comprehensive academic supply services.
          </motion.p>
          
          {/* Stats Chips */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            {[
              { label: '200+ Items Available', bg: 'bg-black/30' },
              { label: '4.8/5 Student Rating', bg: 'bg-white/20' },
              { label: '2000+ Active Users', bg: 'bg-primary-500/30' }
            ].map((chip, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`${chip.bg} backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm md:text-base font-medium border border-white/20`}
              >
                {chip.label}
              </motion.div>
            ))}
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/menu">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
                Browse Menu & Order
              </Button>
            </Link>
            <Link to="/queue-status">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-secondary-900">
                View Queue Status
              </Button>
            </Link>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '2000+', label: 'Happy Students', icon: '🎓' },
              { number: '200+', label: 'Delicious Items', icon: '🍛' },
              { number: '4.8/5', label: 'Student Rating', icon: '⭐' },
              { number: '24/7', label: 'Always Available', icon: '🚀' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="text-center p-6 border-2 border-primary-200 hover:border-primary-400 transition-all duration-300">
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-3xl font-bold text-primary-600 mb-2">{stat.number}</div>
                  <div className="text-secondary-600 font-semibold">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              System Features & Benefits
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
              Our comprehensive digital platform is designed specifically for the University of Ruhuna community, 
              offering seamless integration of dining services and academic supply management.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <Card className="h-full p-8 text-center border-2 border-primary-200 hover:border-primary-400 transition-all duration-300 hover:shadow-large">
                  <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-medium">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-800 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-secondary-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {feature.details.map((detail, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full border border-primary-200 font-medium"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              How It Works
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto leading-relaxed">
              Simple steps to streamline your campus dining experience
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Browse Menu', desc: 'Select your canteen and browse authentic Sri Lankan foods or school supplies' },
              { step: '2', title: 'Place Order', desc: 'Add items to cart, select pickup time, and pay digitally' },
              { step: '3', title: 'Get Notified', desc: 'Receive notification when your order is ready for pickup' },
              { step: '4', title: 'Skip Queue', desc: 'Walk straight to pickup counter and collect your order' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <Card className="h-full text-center p-6 border-2 border-primary-200 hover:border-primary-400 transition-all duration-300 hover:shadow-large">
                  <div className="w-20 h-20 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-medium border-4 border-primary-200">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-secondary-800 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-secondary-600 leading-relaxed">
                    {item.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Popular Canteen Items
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto leading-relaxed">
              Discover the most loved dishes from our university canteens
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Rice & Curry', tamil: 'சாதம் கறி', price: 'Rs. 120', rating: 4.8, emoji: '🍛' },
              { name: 'Kottu Rotti', tamil: 'கொட்டு ரொட்டி', price: 'Rs. 150', rating: 4.9, emoji: '🍜' },
              { name: 'Rotti & Dhal', tamil: 'ரொட்டி பருப்பு', price: 'Rs. 80', rating: 4.6, emoji: '🥖' },
              { name: 'String Hoppers', tamil: 'இடியாப்பம்', price: 'Rs. 90', rating: 4.7, emoji: '🍝' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="h-full text-center p-6 border-2 border-primary-200 hover:border-primary-400 transition-all duration-300 hover:shadow-large">
                  <div className="text-6xl mb-4 filter drop-shadow-lg">
                    {item.emoji}
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-800 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-secondary-500 text-sm italic mb-3">
                    {item.tamil}
                  </p>
                  <div className="text-2xl font-bold text-primary-600 mb-3">
                    {item.price}
                  </div>
                  <div className="flex items-center justify-center text-primary-600 font-semibold">
                    ⭐ {item.rating}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-500 to-primary-600 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Transform Your Campus Experience
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Join over 2,000 University of Ruhuna students and faculty members who save time daily 
            with our smart canteen management system.
          </motion.p>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {[
              { number: '2000+', label: 'Active Users' },
              { number: '30min', label: 'Time Saved Daily' },
              { number: '24/7', label: 'System Available' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-lg text-white/80">{stat.label}</div>
              </div>
            ))}
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link to="/menu">
              <Button size="xl" className="bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-2xl border-2 border-white">
                Start Ordering Now
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="xl" className="border-white text-white hover:bg-white/10 border-2">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
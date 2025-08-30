import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Card, TextField as Input } from '@mui/material';

// Contact icon mapping
const getContactIcon = (title) => {
  const icons = {
    'Phone Numbers': '📞',
    'Email Addresses': '📧',
    'WhatsApp Support': '📱'
  };
  return icons[title] || '📞';
};

const EnhancedContact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', category: 'general' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Save to localStorage for persistence
      const existingMessages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
      const newMessage = {
        ...formData,
        id: Date.now(),
        timestamp: new Date().toISOString(),
        status: 'received'
      };
      existingMessages.push(newMessage);
      localStorage.setItem('contact_messages', JSON.stringify(existingMessages));
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', category: 'general' });
      
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      title: 'Phone Numbers',
      details: [
        'Main Office: +94 91 2245765',
        'Canteen Direct: +94 77 1234567',
        'Emergency: +94 91 2245700'
      ]
    },
    {
      title: 'Email Addresses',
      details: [
        'General: canteen@tech.ruh.ac.lk',
        'Feedback: feedback@tech.ruh.ac.lk',
        'Orders: orders@tech.ruh.ac.lk'
      ]
    },
    {
      title: 'WhatsApp Support',
      details: [
        'Quick Orders: +94 77 1234567',
        'Complaints: +94 77 1234568',
        'Available: 7:00 AM - 8:00 PM'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            Contact University of Ruhuna Canteen
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
            We're here to serve you better. Get in touch with us for any inquiries, feedback, or support!
          </p>
        </motion.div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <Card className="h-full text-center p-8 border-2 border-primary-300 hover:border-primary-500 transition-all duration-300 hover:shadow-large">
                <div className="text-5xl mb-6 text-primary-500">
                  {getContactIcon(method.title)}
                </div>
                <h3 className="text-xl font-bold text-primary-600 mb-4">
                  {method.title}
                </h3>
                <div className="space-y-2">
                  {method.details.map((detail, idx) => (
                    <p key={idx} className="text-secondary-700 font-medium">
                      {detail}
                    </p>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact Form and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 border-2 border-primary-300 hover:border-primary-500 transition-all duration-300">
              <h2 className="text-2xl font-bold text-primary-600 text-center mb-2">
                Send us a Message
              </h2>
              <p className="text-secondary-600 text-center mb-8">
                Have a question, suggestion, or complaint? We'd love to hear from you!
              </p>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  🎉 Message sent successfully! We'll respond within 24 hours.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  ⚠️ Failed to send message. Please try again.
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Your Name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter your full name"
                />
                
                <Input
                  label="Email Address"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="your.email@example.com"
                />
                
                <Input
                  label="Subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  placeholder="Brief subject of your message"
                />
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="input-field"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="food">Food Quality</option>
                    <option value="service">Service Issue</option>
                    <option value="suggestion">Suggestion</option>
                    <option value="complaint">Complaint</option>
                    <option value="catering">Catering Request</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Please describe your inquiry in detail..."
                    className="input-field"
                  />
                </div>
                
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Location & Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 border-2 border-secondary-300 hover:border-secondary-500 transition-all duration-300">
              <h2 className="text-2xl font-bold text-secondary-600 text-center mb-6">
                Visit Our Location
              </h2>
              
              {/* Map Embed */}
              <div className="h-64 mb-6 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  title="University of Ruhuna Canteen Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src="https://www.google.com/maps?q=Faculty%20of%20Technology%20University%20of%20Ruhuna%20Hapugala%20Galle&output=embed"
                />
              </div>

              {/* Address Details */}
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl text-primary-500">📍</div>
                  <div>
                    <h3 className="text-lg font-bold text-primary-600 mb-2">Address</h3>
                    <p className="text-secondary-700 leading-relaxed">
                      <strong>Faculty of Technology</strong><br/>
                      University of Ruhuna<br/>
                      Hapugala, Galle 80000<br/>
                      Southern Province, Sri Lanka
                    </p>
                  </div>
                </div>

                <div className="border-t-2 border-primary-200 pt-6">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl text-secondary-500">🕒</div>
                    <div>
                      <h3 className="text-lg font-bold text-secondary-600 mb-2">Operating Hours</h3>
                      <div className="text-secondary-700 leading-relaxed space-y-1">
                        <p><strong className="text-green-600">Monday - Friday:</strong></p>
                        <p>🍳 Breakfast: 7:00 AM - 9:00 AM</p>
                        <p>🍛 Lunch: 12:00 PM - 2:00 PM</p>
                        <p>🍽️ Dinner: 6:00 PM - 8:00 PM</p>
                        <p>📝 Stationery: 8:00 AM - 5:00 PM</p>
                        <p><strong className="text-orange-600">Saturday:</strong> 8:00 AM - 6:00 PM</p>
                        <p><strong className="text-red-600">Sunday:</strong> Closed</p>
                        <p><strong className="text-blue-600">Public Holidays:</strong> 9:00 AM - 2:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="border-t-2 border-primary-200 pt-6 text-center">
                  <h3 className="text-lg font-bold text-green-600 mb-4">Follow Us</h3>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                      📘 Facebook
                    </button>
                    <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-colors">
                      📷 Instagram
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                      📱 WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Emergency Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="p-8 bg-red-50 border-2 border-red-500">
            <h2 className="text-3xl font-bold text-center mb-8 text-red-700">
              🚨 Emergency Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-red-100 rounded-lg border border-red-300">
                <h3 className="text-xl font-bold mb-2 text-red-800">🏥 Food Poisoning Emergency</h3>
                <p className="text-lg mb-1 text-red-700">
                  Call immediately: <strong>+94 91 2245700</strong>
                </p>
                <p className="font-medium text-red-600">
                  Available 24/7 - Immediate Response
                </p>
              </div>
              <div className="text-center p-6 bg-red-100 rounded-lg border border-red-300">
                <h3 className="text-xl font-bold mb-2 text-red-800">🔍 Lost & Found</h3>
                <p className="text-lg mb-1 text-red-700">
                  Security Office: <strong>+94 91 2245701</strong>
                </p>
                <p className="font-medium text-red-600">
                  Mon-Fri: 8:00 AM - 6:00 PM
                </p>
              </div>
              <div className="text-center p-6 bg-red-100 rounded-lg border border-red-300">
                <h3 className="text-xl font-bold mb-2 text-red-800">⚡ Urgent Complaints</h3>
                <p className="text-lg mb-1 text-red-700">
                  WhatsApp: <strong>+94 77 1234568</strong>
                </p>
                <p className="font-medium text-red-600">
                  Response within 30 minutes
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="border border-gray-200 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer">🍽️ Can I cancel my order?</summary>
                <p className="mt-2 text-secondary-700">
                  Yes, you can cancel orders up to 15 minutes before pickup time through the app or by calling us.
                </p>
              </details>
              <details className="border border-gray-200 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer">💳 What payment methods do you accept?</summary>
                <p className="mt-2 text-secondary-700">
                  We accept cash, digital payments, university meal cards, and online banking transfers.
                </p>
              </details>
              <details className="border border-gray-200 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer">🕒 Can I order outside operating hours?</summary>
                <p className="mt-2 text-secondary-700">
                  You can place advance orders through the app 24/7, but pickup is only during operating hours.
                </p>
              </details>
              <details className="border border-gray-200 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer">🌶️ Do you cater to dietary restrictions?</summary>
                <p className="mt-2 text-secondary-700">
                  Yes! We offer vegetarian, vegan, and halal options. Please mention your requirements when ordering.
                </p>
              </details>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedContact;
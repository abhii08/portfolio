import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useSelector, useDispatch } from 'react-redux';
import { FiMail, FiPhone, FiMapPin, FiSend, FiGithub, FiLinkedin } from 'react-icons/fi';
import { updateFormData, sendContactForm, clearForm } from '../../store/slices/contactSlice';
import { personalInfo, socialLinks } from '../../data/portfolioData';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '../../utils/animations';
import { trackContactFormView } from '../../lib/supabase';
import Button from '../common/Button';

const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Track contact form view when component comes into view
  React.useEffect(() => {
    if (inView) {
      trackContactFormView();
    }
  }, [inView]);

  const dispatch = useDispatch();
  const { formData, isSubmitting, submitStatus, submitMessage, errors } = useSelector(
    (state) => state.contact
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors = {};
    if (!formData.name?.trim()) newErrors.name = 'Name is required';
    if (!formData.email?.trim()) newErrors.email = 'Email is required';
    if (!formData.subject?.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message?.trim()) newErrors.message = 'Message is required';
    
    if (Object.keys(newErrors).length > 0) {
      console.log('Validation errors:', newErrors);
      return;
    }

    try {
      await dispatch(sendContactForm(formData)).unwrap();
      // Form will be cleared automatically on success
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const contactMethods = [
    {
      icon: <FiMail size={24} />,
      title: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      description: 'Send me an email anytime!'
    },
    {
      icon: <FiPhone size={24} />,
      title: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      description: 'Call me for urgent matters'
    },
    {
      icon: <FiMapPin size={24} />,
      title: 'Location',
      value: personalInfo.location,
      href: '#',
      description: 'Based in India'
    }
  ];

  return (
    <section
      id="contact"
      className="section-padding bg-gray-50 dark:bg-gray-800"
      ref={ref}
    >
      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? "animate" : "initial"}
        >
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="heading-2 text-gray-900 dark:text-white mb-4">
              Get In <span className="text-gradient">Touch</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Ready to start your next project? Let's collaborate to bring your ideas to life 
              with cutting-edge technology and innovative solutions.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Contact Info */}
            <motion.div
              variants={fadeInLeft}
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Let's Start a Conversation
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  I'm always interested in new opportunities and exciting projects. 
                  Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6 mb-8">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={index}
                    href={method.href}
                    className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-900 rounded-lg hover:shadow-lg transition-all duration-200 group"
                    variants={fadeInUp}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                  >
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                      {method.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {method.title}
                      </h4>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">
                        {method.value}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {method.description}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social Links */}
              <motion.div
                variants={fadeInUp}
              >
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Follow Me
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {social.name === 'GitHub' && <FiGithub size={20} />}
                      {social.name === 'LinkedIn' && <FiLinkedin size={20} />}
                      {social.name === 'Email' && <FiMail size={20} />}
                      {social.name === 'Phone' && <FiPhone size={20} />}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              variants={fadeInRight}
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Send Message
                </h3>

                {submitStatus && (
                  <motion.div
                    className={`p-4 rounded-lg mb-6 ${
                      submitStatus === 'success'
                        ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
                    }`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {submitMessage}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="What is this about?"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="input-field resize-none"
                      placeholder="Tell me about your project or inquiry..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={isSubmitting}
                    icon={<FiSend size={16} />}
                    className="w-full"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16"
            variants={fadeInUp}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Build Something Amazing?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Let's turn your vision into reality. I'm here to help you create exceptional 
                digital experiences that drive results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  onClick={() => window.open('/resume.pdf', '_blank')}
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Download Resume
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open(`mailto:${personalInfo.email}`, '_blank')}
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Email Me Directly
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

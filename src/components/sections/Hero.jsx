import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiDownload, FiArrowDown } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';
import { personalInfo, socialLinks } from '../../data/portfolioData';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '../../utils/animations';
import { scrollToElement } from '../../utils/helpers';
import { trackHireMeClick } from '../../lib/supabase';
import { downloadResumeWithTracking } from '../../lib/resumeService';
import Button from '../common/Button';

const Hero = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [typewriterText, setTypewriterText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  
  const roles = [
    'Full Stack Developer',
    'React Specialist',
    'Node.js Expert',
    'Problem Solver'
  ];

  useEffect(() => {
    let timeout;
    const currentText = roles[currentRole];
    
    if (typewriterText.length < currentText.length) {
      timeout = setTimeout(() => {
        setTypewriterText(currentText.slice(0, typewriterText.length + 1));
      }, 100);
    } else {
      timeout = setTimeout(() => {
        setTypewriterText('');
        setCurrentRole((prev) => (prev + 1) % roles.length);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [typewriterText, currentRole, roles]);

  const handleContactClick = async () => {
    // Track the "Hire Me Now" click
    await trackHireMeClick();
    scrollToElement('contact', 80);
  };

  const handleProjectsClick = () => {
    scrollToElement('projects', 80);
  };

  const handleResumeDownload = async () => {
    await downloadResumeWithTracking();
  };

  const socialIcons = {
    github: <FiGithub size={24} />,
    linkedin: <FiLinkedin size={24} />,
    email: <FiMail size={24} />,
    phone: <FiPhone size={24} />
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900"
      ref={ref}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container-custom section-padding relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={staggerContainer}
          initial="initial"
          animate={inView ? "animate" : "initial"}
        >
          {/* Left Content */}
          <motion.div
            className="text-center lg:text-left"
            variants={fadeInLeft}
          >
            {/* Greeting */}
            <motion.div
              className="inline-block mb-4 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium"
              variants={fadeInUp}
            >
              👋 Hello, I'm
            </motion.div>

            {/* Name */}
            <motion.h1
              className="heading-1 mb-4 text-gray-900 dark:text-white"
              variants={fadeInUp}
            >
              {personalInfo.name}
            </motion.h1>

            {/* Dynamic Title */}
            <motion.div
              className="mb-6"
              variants={fadeInUp}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                I'm a{' '}
                <span className="text-gradient min-h-[1.2em] inline-block">
                  {typewriterText}
                  <span className="animate-pulse">|</span>
                </span>
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl"
              variants={fadeInUp}
            >
              {personalInfo.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8"
              variants={fadeInUp}
            >
              <Button
                variant="primary"
                size="lg"
                onClick={handleContactClick}
                className="group"
              >
                Hire Me Now
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={handleProjectsClick}
              >
                View My Work
              </Button>
              
              <Button
                variant="ghost"
                size="lg"
                onClick={handleResumeDownload}
                icon={<FiDownload size={20} />}
              >
                Resume
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex justify-center lg:justify-start space-x-6"
              variants={fadeInUp}
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.name}
                >
                  {socialIcons[social.name.toLowerCase()]}
                </motion.a>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
              variants={fadeInUp}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">3+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">1+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">10+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div
            className="flex justify-center lg:justify-end"
            variants={fadeInRight}
          >
            <div className="relative">
              {/* Profile Image Container */}
              <motion.div
                className="relative w-80 h-80 lg:w-96 lg:h-96"
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-3xl opacity-30"></div>
                
                {/* Profile Image */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
                  {/* Robot and Man Image */}
                  <img
                    src="/images/robot-man.jpg"
                    alt="Developer working with AI - Abhinav Sharma"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                >
                  <FiGithub size={24} />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white shadow-lg"
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                >
                  ⚛️
                </motion.div>

                <motion.div
                  className="absolute top-1/2 -left-8 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                  💻
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <motion.div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => scrollToElement('about', 80)}
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll Down</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <FiArrowDown className="text-gray-400 dark:text-gray-500" size={20} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

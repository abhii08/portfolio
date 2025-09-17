import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiHeart, FiArrowUp } from 'react-icons/fi';
import { personalInfo, socialLinks } from '../../data/portfolioData';
import { fadeInUp } from '../../utils/animations';
import { scrollToElement } from '../../utils/helpers';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialIcons = {
    github: <FiGithub size={20} />,
    linkedin: <FiLinkedin size={20} />,
    email: <FiMail size={20} />,
    phone: <FiPhone size={20} />
  };

  return (
    <footer className="bg-gray-900 dark:bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom section-padding relative z-10">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* About Section */}
            <div className="lg:col-span-2">
              <motion.div
                className="mb-6"
                variants={fadeInUp}
              >
                <h3 className="text-2xl font-bold text-gradient mb-4">
                  {personalInfo.name}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {personalInfo.tagline}
                </p>
                <p className="text-gray-400 text-sm">
                  Building the future, one line of code at a time. Let's create something amazing together.
                </p>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="flex space-x-4"
                variants={fadeInUp}
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 dark:bg-gray-900 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-200"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.name}
                  >
                    {socialIcons[social.name.toLowerCase()]}
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Quick Links */}
            <div>
              <motion.div variants={fadeInUp}>
                <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
                <ul className="space-y-3">
                  {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
                    <li key={item}>
                      <button
                        onClick={() => scrollToElement(item.toLowerCase(), 80)}
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Contact Info */}
            <div>
              <motion.div variants={fadeInUp}>
                <h4 className="text-lg font-semibold mb-6">Get In Touch</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-400">
                    <FiMail size={16} />
                    <a 
                      href={`mailto:${personalInfo.email}`}
                      className="hover:text-white transition-colors duration-200"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-400">
                    <FiPhone size={16} />
                    <a 
                      href={`tel:${personalInfo.phone}`}
                      className="hover:text-white transition-colors duration-200"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                  <div className="flex items-start space-x-3 text-gray-400">
                    <svg className="w-4 h-4 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>{personalInfo.location}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            className="border-t border-gray-800 dark:border-gray-700 pt-8"
            variants={fadeInUp}
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 text-gray-400 mb-4 md:mb-0">
                <span>© {currentYear} {personalInfo.name}. Made with</span>
                <FiHeart className="text-red-500 animate-pulse" size={16} />
                <span>using React & Tailwind CSS</span>
              </div>

              {/* Scroll to Top Button */}
              <motion.button
                onClick={handleScrollToTop}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <span className="text-sm">Back to Top</span>
                <FiArrowUp size={16} />
              </motion.button>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            className="text-center mt-8 pt-6 border-t border-gray-800 dark:border-gray-700"
            variants={fadeInUp}
          >
            <p className="text-gray-500 text-sm">
              This portfolio is open source and available on{' '}
              <a 
                href="https://github.com/abhii08?tab=repositories" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                GitHub
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

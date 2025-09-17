import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { FiMenu, FiX, FiSun, FiMoon, FiDownload } from 'react-icons/fi';
import { toggleTheme } from '../../store/slices/themeSlice';
import { toggleMenu, closeMenu, setActiveSection } from '../../store/slices/uiSlice';
import { NAVIGATION_ITEMS, SOCIAL_LINKS } from '../../constants';
import { scrollToElement } from '../../utils/helpers';
import useScrollDirection from '../../hooks/useScrollDirection';
import useScrollSpy from '../../hooks/useScrollSpy';
import Button from '../common/Button';

const Header = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);
  const { isMenuOpen, activeSection } = useSelector((state) => state.ui);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const scrollDirection = useScrollDirection();
  const sectionIds = NAVIGATION_ITEMS.map(item => item.id);
  useScrollSpy(sectionIds);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    scrollToElement(sectionId, 80);
    dispatch(setActiveSection(sectionId));
    dispatch(closeMenu());
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleMenuToggle = () => {
    dispatch(toggleMenu());
  };

  const handleResumeDownload = () => {
    // This will be implemented when we add the resume file
    window.open(SOCIAL_LINKS.RESUME, '_blank');
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      } ${scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="container-custom section-padding py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="text-2xl font-bold text-gradient cursor-pointer"
            onClick={() => handleNavClick('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            AS
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAVIGATION_ITEMS.map((item) => (
              <motion.button
                key={item.id}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              onClick={handleThemeToggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              {mode === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
            </motion.button>

            {/* Resume Download */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleResumeDownload}
              icon={<FiDownload size={16} />}
            >
              Resume
            </Button>

            {/* Contact CTA */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleNavClick('contact')}
            >
              Hire Me
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            onClick={handleMenuToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container-custom py-6">
                <div className="flex flex-col space-y-4">
                  {NAVIGATION_ITEMS.map((item) => (
                    <motion.button
                      key={item.id}
                      className={`text-left py-2 px-4 rounded-lg transition-colors ${
                        activeSection === item.id
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => handleNavClick(item.id)}
                      whileHover={{ x: 10 }}
                      whileTap={{ x: 0 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <motion.button
                      className="flex items-center space-x-2 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      onClick={handleThemeToggle}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {mode === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
                      <span className="text-sm">
                        {mode === 'dark' ? 'Light' : 'Dark'} Mode
                      </span>
                    </motion.button>
                  </div>
                  
                  <div className="flex flex-col space-y-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={handleResumeDownload}
                      icon={<FiDownload size={16} />}
                      className="w-full"
                    >
                      Download Resume
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleNavClick('contact')}
                      className="w-full"
                    >
                      Hire Me
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
